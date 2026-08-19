# Informe: Cálculos del Cotizador Funnel (Backoffice)

**Ruta**: `/cotizador-funnel`
**Archivo principal**: `ema-backofficev2/src/pages/private/CotizadorFunnel/index.tsx` (735 líneas)
**Capa de datos**: `ema-backofficev2/src/stores/CotizadorFunnel/services.ts`

---

## 1. Arquitectura del Flujo

```
UI (index.tsx)
  └── load() → Promise.all de 5 queries paralelas
        ├── getEventCountByName(step_1_loaded, from, to)   → StepResult
        ├── getEventCountByName(step_2_loaded, from, to)   → StepResult
        ├── getEventCountByName(step_3_loaded, from, to)   → StepResult
        ├── getEventCountByName(cotizacion_generada, ...)   → StepResult
        ├── getAllEventsBySource('ENERGICA', from, to)      → eventos recientes
        ├── getEventCountByName('enviar_cotizacion_clicked') → KPI emails
        ├── getEventCountByName('email_captured')           → enriquecimiento
        └── getEventCountByName('email_sent')               → enriquecimiento
```

Cada query llama a AppSync/DynamoDB con el GSI `event + createdAt` (between `from` y `to`).

---

## 2. Cálculo de Sesiones Únicas por Paso

**Código** (`index.tsx:286`):
```ts
const uniqueSessions = new Set(r.items.map(i => i.sessionId)).size
```

Cada paso consulta DynamoDB **de forma completamente independiente**. Los items se deduplicaron por `sessionId` dentro de los resultados de esa query específica.

**Problema**: Cada paso tiene su propio universo de sesiones. No hay relación de contención entre pasos. Una sesión puede aparecer en Paso 2 sin haber aparecido en Paso 1 (si el evento Paso 1 cayó fuera del rango de fechas).

---

## 3. Cálculo de Porcentajes

**Denominador** (`index.tsx:308`):
```ts
const top1 = steps[0]?.uniqueSessions || 1
```
El denominador es **siempre las sesiones únicas del Paso 1**.

**Porcentaje por paso** (`index.tsx:417`):
```ts
const pct = Math.min(Math.round((step.uniqueSessions / top1) * 100), 100)
```
El `Math.min(..., 100)` **topa el porcentaje en 100%**, pero no impide que los números absolutos sean inconsistentes (Paso 2 puede mostrar más sesiones que Paso 1).

---

## 4. KPIs Derivados

```ts
// index.tsx:228-231
convRate:  Math.round((paid   / total) * 100)   // pagados / step1
quoteRate: Math.round((quotes / total) * 100)   // step3   / step1
mobilePct: Math.round((mobile / sessions.length) * 100)
emailRate: Math.round((emailRequests / total) * 100)
```

Donde `total = steps[0]?.uniqueSessions`.

---

## 5. Tabla "Por Sesión" (unión de todas las sesiones)

**Código** (`index.tsx:150-188`, useMemo):
```ts
const map = new Map<string, SessionData>()
steps.forEach(step => {
  step.items.forEach(item => {
    if (!map.has(item.sessionId)) map.set(item.sessionId, { ... })
    const s = map.get(item.sessionId)!
    s.events.add(step.event)   // acumula qué pasos tocó esta sesión
  })
})
```
El total en "Por Sesión" es la **unión** de sessionIds en todos los pasos — puede ser mayor que las sesiones del Paso 1.

---

## 6. Bugs Identificados

### BUG 1 (CRÍTICO): Paso 2 puede superar el 100% respecto al Paso 1

**Causa raíz**: Cada paso hace una query independiente a DynamoDB filtrando por `event + rango de fechas`. Si una sesión disparó `step_2_loaded` dentro del rango pero su `step_1_loaded` fue en una sesión previa fuera del rango, esa sesión cuenta en Paso 2 pero no en Paso 1.

**Ejemplo concreto con datos del 29 de junio**:
- Un usuario visitó el cotizador el 28 de junio (step_1_loaded) y regresó el 29 de junio (step_2_loaded).
- Con rango "29 jun → 29 jun": Paso 1 = 0 sesiones de ese usuario, Paso 2 = 1 sesión.
- Esto explica las **3 sesiones "extra"** en Paso 2 que generan el 110%.

**Código afectado**: `index.tsx:286`
```ts
// Actual — independiente por paso:
const uniqueSessions = new Set(r.items.map(i => i.sessionId)).size

// Corrección — filtrar cada paso por las sesiones del Paso 1:
// (ver sección 7)
```

### BUG 2 (CRÍTICO): Sin paginación — datos truncados silenciosamente

**Causa raíz**: AppSync tiene límite duro de 1000 ítems por respuesta. El código pide `limit: 100000` pero recibe máximo 1000 + un `nextToken` que **nunca se usa**.

**Código afectado**: `services.ts:114-120`
```ts
// nextToken se selecciona en el GraphQL pero nunca se pagina
const result = await client.graphql({ query: EVENTS_BY_NAME, variables: { ..., limit } })
const items = result.data?.CotizadorEventsByEvent?.items ?? []
return { count: items.length, items }   // ← max 1000, silencioso
```

**Impacto**: Con >1000 eventos en el rango, todos los números son incorrectos.

### BUG 3 (MODERADO): Sin filtro por `sourceUrl`

Los eventos de todas las fuentes se mezclan. La query no filtra por `sourceUrl = 'ENERGICA'`, aunque la UI muestra "Sesiones únicas · ENERGICA".

### BUG 4 (MENOR): Fallback `top1 = 0 || 1` engañoso

Si Paso 1 tiene 0 sesiones, `top1 = 1` hace que pasos con sesiones muestren 100%.

---

## 7. Fix Propuesto para Bug 1 (prioridad inmediata)

**Estrategia**: Post-fetch, filtrar los items de cada paso para solo incluir sesiones que también aparecen en el Paso 1. Así el funnel es acumulativo (retención real).

**Ubicación**: `index.tsx` función `load()`, después del `Promise.all`.

```ts
// Paso 1: obtener todos los rawResults independientes
const rawResults = await Promise.all(
  FUNNEL_STEPS.map(async (s) => {
    const r = await getEventCountByName(s.event, from, to)
    return { ...s, rawItems: r.items }
  })
)

// Paso 2: construir el set de sesiones del Paso 1
const step1SessionIds = new Set(rawResults[0]?.rawItems.map(i => i.sessionId) ?? [])

// Paso 3: filtrar cada paso posterior para solo contar sesiones que pasaron por Paso 1
const stepResults = rawResults.map((step, idx) => {
  if (idx === 0) {
    return { ...step, items: step.rawItems, uniqueSessions: step1SessionIds.size }
  }
  const filteredItems = step.rawItems.filter(i => step1SessionIds.has(i.sessionId))
  const uniqueSessions = new Set(filteredItems.map(i => i.sessionId)).size
  return { ...step, items: filteredItems, uniqueSessions }
})

setSteps(stepResults)
```

**Resultado esperado**:
- Paso 1: 30 sesiones (100%)
- Paso 2: máximo 30 sesiones (≤ 100%)
- Paso 3: máximo las que pasaron por Paso 2 relativo a Paso 1

---

## 8. Fix Propuesto para Bug 2 (paginación)

**Ubicación**: `services.ts`, función `getEventCountByName`

```ts
export async function getEventCountByName(eventName, startDate?, endDate?, limit = 1000) {
  const createdAt = startDate && endDate ? { between: [startDate, endDate] } : undefined
  const allItems: CotizadorEventItem[] = []
  let nextToken: string | null = null

  do {
    const result = await client.graphql({
      query: EVENTS_BY_NAME,
      variables: { event: eventName, createdAt, limit, nextToken },
    })
    const page = (result as any).data?.CotizadorEventsByEvent ?? {}
    allItems.push(...(page.items ?? []))
    nextToken = page.nextToken ?? null
  } while (nextToken)

  return { count: allItems.length, items: allItems }
}
```

---

## 9. Causa Específica del Caso "30 sesiones, Paso 2 = 110%"

Con rango **29 junio 00:00 → 29 junio 23:59**:

| Paso | Sesiones únicas (raw) | Relación con Paso 1 |
|------|----------------------|---------------------|
| Paso 1 (step_1_loaded) | 30 | — (denominador) |
| Paso 2 (step_2_loaded) | 33 | 3 sesiones llegaron a Paso 2 con su Paso 1 en otra fecha |

**Las 3 sesiones "extra"**: usuarios que iniciaron el cotizador el 28 de junio (su step_1_loaded cae fuera del rango "29 jun") pero continuaron el 29 de junio (su step_2_loaded cae dentro del rango). El denominador no los cuenta pero el numerador sí.

**Con el fix propuesto**: Solo se contarían las sesiones del Paso 2 cuyo `sessionId` también aparece en los resultados del Paso 1 del mismo rango. Las 3 sesiones "extra" serían excluidas, y Paso 2 quedaría en máximo 30 sesiones (≤ 100%).

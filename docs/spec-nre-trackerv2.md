# Spec: Tracker v2 — Idempotencia y Persistencia de Sesión

**Estado**: Aprobado para implementación  
**Versión**: 2.0  
**Fecha**: Junio 2026  
**Refs**: `plan-mejoraimiento-trackerv2.md`, `espec-trackerv2.md`

---

## 1. Diagnóstico del Sistema Actual

### 1.1 Implementación actual (`src/lib/tracker.ts`)

| Componente | Estado actual | Problema |
|-----------|--------------|---------|
| `sessionId` | Variable de módulo JS (`const sessionId = crypto.randomUUID()`) | Efímero: muere en cada recarga, redirect externo (Webpay) o apertura de nueva pestaña |
| `anonymousId` | `localStorage['ec_uid']` | Correcto — persiste entre sesiones |
| Deduplicación | **No existe** | Todo usa `track()` genérico — sin control de unicidad |
| Transporte | `sendBeacon` → fallback `fetch(keepalive)` | Correcto |
| Identity | `setTrackerIdentity({ customerId, formId })` — módulo en memoria | Se pierde al retornar de Webpay |

### 1.2 Síntomas detectados en dashboard

1. **Conversión > 100%** — 116 eventos `step_1_loaded` vs 118 `step_2_loaded`: el usuario navega atrás/adelante y `useEffect` dispara eventos repetidos.
2. **Fragmentación de sesión post-Webpay** — al retornar de Transbank, `sessionId` se regenera → el usuario aparece como visitante nuevo.
3. **Desbalance `webpay_initiated` vs `payment_confirmed`** — 3 iniciados vs 1 confirmado: probablemente reintentos que generan sesiones distintas.

### 1.3 Schema DynamoDB — `CotizadorEvent` (sin cambios en v2)

```typescript
CotizadorEvent: a.model({
  eventId:     a.id().required(),       // PK — UUID único por evento
  event:       a.string().required(),   // Nombre del evento
  sessionId:   a.string().required(),   // GSI-1 PK
  anonymousId: a.string().required(),
  customerId:  a.string(),
  formId:      a.id(),                  // GSI-3 PK
  props:       a.string(),              // JSON serializado
  url:         a.string(),
  referrer:    a.string(),
  device:      a.string(),
  step:        a.integer(),
  createdAt:   a.datetime(),            // Sort key en GSI-1, GSI-2, GSI-4
  sourceUrl:   a.string(),              // GSI-4 PK
})
```

**GSIs activos:**

| Nombre | PK | SK | Query field |
|--------|----|----|-------------|
| GSI-1 | `sessionId` | `createdAt` | `CotizadorEventsBySessionId` |
| GSI-2 | `event` | `createdAt` | `CotizadorEventsByEvent` |
| GSI-3 | `formId` | — | `CotizadorEventsByFormId` |
| GSI-4 | `sourceUrl` | `createdAt` | `CotizadorEventsBySourceAndDate` |

> **Decisión**: No se requieren cambios de schema en DynamoDB ni en AppSync. Los nuevos eventos y props adicionales caben en los campos existentes.

---

## 2. Cambios Requeridos

### 2.1 `src/lib/tracker.ts` — Refactor completo

**Tres cambios estructurales:**

#### A. `sessionId` → `sessionStorage`

```
ANTES:  const sessionId = crypto.randomUUID()   // módulo JS, muere al salir
DESPUÉS: sessionStorage['ec_sid']               // sobrevive recarga + Webpay redirect
```

- Al inicializar una nueva sesión: vaciar `sessionStorage['ec_fired_events']`
- Fallback SSR: retornar `'ssr-env'` sin tocar storage

#### B. Nueva función `trackUnique()` — deduplicación por sesión

```
ec_fired_events (sessionStorage) = ["step_1_loaded", "step_2_loaded", ...]
```

- Antes de enviar: verificar si el event ya está en el array
- Si ya existe: abortar silenciosamente
- Si es nuevo: agregar al array + llamar `track()`
- Fallback si sessionStorage falla: ejecutar `track()` directamente (no bloquear UX)

#### C. `anonymousId` — sin cambios

Sigue en `localStorage['ec_uid']`. Correcto.

---

### 2.2 Taxonomía de eventos — clasificación definitiva

#### Eventos Hito (usar `trackUnique`)

Son marcadores de progreso lineal en el funnel. Se registran **máximo una vez por sesión**.

| Evento | Trigger | Props |
|--------|---------|-------|
| `step_1_loaded` | Mount del Wizard | `{ step: 1 }` |
| `step_2_loaded` | `state.step === 1` | `{ step: 2 }` |
| `step_3_loaded` | `state.step === 2 && apiResult` | `{ step: 3, total, charger, distance, tipo }` |
| `step_3_abandoned` | `beforeunload` con `step === 2 && !paid` | `{ step: 3, total, timeOnStepMs }` |
| `section_viewed` | IntersectionObserver (threshold 0.5) | `{ section, step: 3 }` |
| `cta_reservar_clicked` | Click botón reservar | `{ step: 3, total }` |
| `payment_option_selected` | Junto a reservar | `{ step: 3, option, tipo, hasCharger, total }` |
| `webpay_initiated` | Redirect a Transbank | `{ step: 3, total, hasCharger, selectedPaymentOption, tipo }` |
| `payment_confirmed` | Load de `/recibo-pago` con token_ws válido | `{ total, buyOrder, paymentType }` |
| `booking_confirmed` | Confirmación en Google Calendar | `{ date }` |

#### Eventos Micro-interacción (usar `track` estándar)

Miden comportamiento granular y fricción de UI. Pueden repetirse.

| Evento | Trigger | Props |
|--------|---------|-------|
| `tipo_selected` | Click en "casa" / "edificio" | `{ tipo, step: 1 }` |
| `address_entered` | Confirmar dirección | `{ comuna, step: 1 }` |
| `charger_selected` | Selección de cargador | `{ charger, type, step: 2 }` |
| `distance_changed` | Movimiento del slider | `{ distance, step: 2 }` |
| `distance_final` | `onChangeCommitted` del slider | `{ distance, step: 2 }` |
| `date_selected` | Selección de slot en calendario | `{ date, daysFromNow }` |
| `cta_email_clicked` | Abrir panel de email | `{ step: 3 }` |
| `email_sent` | Email de cotización enviado | `{ step: 3 }` |

> **Nota:** `electrolinera_submitted` se mantiene como `track()` estándar (fuera del funnel principal).

---

### 2.3 Archivos a modificar

#### `src/lib/tracker.ts`
Reemplazar completamente. Cambios:
- `getSessionId()`: leer/escribir `sessionStorage['ec_sid']`
- `getAnonymousId()`: sin cambios (`localStorage['ec_uid']`)
- `setTrackerIdentity()`: sin cambios
- `track()`: sin cambios
- **Agregar** `trackUnique()`: deduplicación vía `sessionStorage['ec_fired_events']`
- Exportar `TrackPayload` interface (mantener compatibilidad)

#### `src/app/cotizador/CotizadorWizard.tsx`
Cambios de instrumentación:
- `step_1_loaded`: `track()` → `trackUnique()`
- `step_2_loaded`: `track()` → `trackUnique()`
- `step_3_loaded`: `track()` → `trackUnique()`
- `step_3_abandoned`: `track()` → `trackUnique()`
- `cta_reservar_clicked`: `track()` → `trackUnique()`
- `webpay_initiated`: `track()` → `trackUnique()`
- **Agregar** `payment_option_selected` con `trackUnique()` al iniciar pago
- **Agregar** `distance_changed` con `track()` en `onSliderChange`
- **Agregar** `distance_final` con `track()` en `onSliderChangeCommitted`
- **Agregar** IntersectionObserver para `section_viewed` en step 3
- `charger_selected`: ya existe — cambiar props a `{ charger, type, step: 2 }`
- `tipo_selected`: mantener `track()` — micro-interacción

#### `src/app/cotizador/recibo-pago/ReciboPagoClient.tsx`
- `payment_confirmed`: `track()` → `trackUnique()`
- Llamar `setTrackerIdentity({ customerId, formId })` antes del evento

#### `src/app/cotizador/agenda/AgendaClient.tsx`
- `booking_confirmed`: `track()` → `trackUnique()`
- `date_selected`: mantener `track()` — micro-interacción

#### `src/app/api/track/route.ts`
- Sin cambios. La ruta recibe y persiste correctamente.

---

### 2.4 IntersectionObserver — secciones paso 3

Agregar `data-track` a los contenedores de sección en CotizadorWizard paso 3:

```tsx
<div data-track="desglose">...</div>
<div data-track="timeline">...</div>
<div data-track="social_proof">...</div>
```

Observer: threshold 0.5, ejecutar `trackUnique('section_viewed', { section, step: 3 })`, luego `observer.unobserve(el)`.

---

## 3. Cambios de Schema — Ninguno

El schema DynamoDB actual soporta todos los nuevos eventos:
- Nuevos nombres de eventos → campo `event: string`
- Nuevas props → campo `props: string` (JSON)
- No se necesitan nuevos GSIs para las consultas del backoffice actuales

**No deployar cambios en `ema-back`.**

---

## 4. Performance

| Aspecto | Impacto | Notas |
|---------|---------|-------|
| `sessionStorage` read/write | ~0ms | Síncrono, local |
| `trackUnique` overhead vs `track` | +1 JSON.parse + array.includes | Negligible |
| `sendBeacon` | Sin bloqueo UI | Fire-and-forget |
| IntersectionObserver | Sin impacto en render | Native browser API |
| DynamoDB writes | Sin cambios | Async, detrás de /api/track |

---

## 5. Criterios de Aceptación

### 5.1 Sesión persistente
- Abrir Cotizador → `sessionStorage['ec_sid']` contiene UUID
- Recargar (F5) → mismo `ec_sid`
- Navegar a Webpay y volver → mismo `ec_sid`

### 5.2 Deduplicación
- Navegar paso1 → paso2 → paso1 → paso2
- `sessionStorage['ec_fired_events']` contiene exactamente 1x `step_1_loaded` y 1x `step_2_loaded`
- En Network tab: no hay requests duplicados a `/api/track` para eventos hito

### 5.3 Funnel en DynamoDB
Consulta de validación post-smoke-test:
```graphql
query VerifyIdempotencyFunnel($sessionId: String!) {
  CotizadorEventsBySessionId(sessionId: $sessionId, sortDirection: ASC) {
    items { event step anonymousId formId customerId createdAt }
  }
}
```
**Criterio**: eventos hito aparecen exactamente 1 vez por sesión.

### 5.4 Métricas del dashboard
- Paso 1 ≥ Paso 2 ≥ Paso 3 (embudo descendente sin exceder 100%)

---

## 6. Orden de implementación

1. `src/lib/tracker.ts` — refactor completo (base de todo)
2. `src/app/cotizador/CotizadorWizard.tsx` — instrumentación
3. `src/app/cotizador/recibo-pago/ReciboPagoClient.tsx`
4. `src/app/cotizador/agenda/AgendaClient.tsx`
5. QA manual con Chrome DevTools (Application → Session Storage)
6. Smoke test end-to-end en staging

---

## 7. Versión 2.1.0 — Mejoras 24 Junio 2026

### 7.1 Diagnóstico gap v2.0 → v2.1

Auditoria sobre `CotizadorWizard.tsx` reveló los siguientes eventos **no instrumentados**
que son prioritarios para medir intención de pago y abandono en Paso 3:

| Evento faltante | Botón / acción | Prioridad |
|----------------|----------------|-----------|
| `pagar_visita_clicked` | "Pagar visita $9.990 →" (ALTERNATIVA 1) | CRÍTICA |
| `pagar_hoy_clicked` | "Pagar hoy $X →" (ALTERNATIVA 2) | CRÍTICA |
| `enviar_cotizacion_clicked` | "Enviar mi cotización por email" | ALTA |
| `whatsapp_clicked` | "¿Tienes dudas? Habla con nosotros" | ALTA |
| `nueva_simulacion_clicked` | "← Nueva simulación" | ALTA |
| `scroll_depth` | Scroll del usuario en /cotizador | MEDIA |
| `customer_identified` | Al ingresar email en formulario de pago | CRÍTICA |

Adicionalmente, `customerId` **no se persiste** en el momento en que el usuario ingresa
su email en los formularios de pago (emailPago / emailSolo). Solo se registra después
de `email_sent` o `payment_confirmed`, perdiendo la asociación en todos los eventos
intermedios del Paso 3.

---

### 7.2 Nuevos eventos — Especificación

Todos los eventos nuevos usan `track()` (no `trackUnique`) ya que representan
intenciones explícitas del usuario que pueden repetirse. Todo dato de contexto
va en `props` serializado como JSON.

#### `pagar_visita_clicked`
Disparado al presionar "Pagar visita $9.990 →" en ALTERNATIVA 1 del Paso 3,
**antes** de llamar a `payVisit()`.

```typescript
track('pagar_visita_clicked', {
  step: 3,
  amount: 9990,
  option: 'visita',
  tipoC: state.tipoC,        // 'wallbox' | 'portable'
  chargerId: state.chargerId, // 'own' | id del cargador
})
```

#### `pagar_hoy_clicked`
Disparado al presionar "Pagar hoy $X →" en ALTERNATIVA 2 del Paso 3,
**antes** de llamar a `payDirect()`.

```typescript
track('pagar_hoy_clicked', {
  step: 3,
  amount: discountedInstall,  // installGross * 0.9 redondeado
  amountGross: installGross,
  discount: discountSavings,
  option: 'chargerInstallation',
  tipoC: state.tipoC,
  chargerId: state.chargerId,
})
```

#### `enviar_cotizacion_clicked`
Disparado al presionar "Enviar mi cotización por email".
El evento existente `cta_email_clicked` (línea 2673) se **reemplaza** por este
nombre más descriptivo para alinearse con nomenclatura v2.1.

```typescript
track('enviar_cotizacion_clicked', {
  step: 3,
  hasEmail: Boolean(state.emailSolo),
})
```

#### `whatsapp_clicked`
Disparado al presionar "¿Tienes dudas? Habla con nosotros".

```typescript
track('whatsapp_clicked', {
  step: 3,
  source: 'cotizador_paso3',
})
```

#### `nueva_simulacion_clicked`
Disparado al presionar "← Nueva simulación".

```typescript
track('nueva_simulacion_clicked', {
  step: 3,
  formId: state.formId ?? null,
  tipoC: state.tipoC,
})
```

#### `scroll_depth`
Evento de engagement: se dispara una sola vez por umbral (25 %, 50 %, 75 %, 100 %)
usando `trackUnique` con key compuesta `scroll_depth_N`.
Implementado con `IntersectionObserver` sobre sentinel `<div>`s colocados al
25 / 50 / 75 / 100 % de la altura del contenedor del cotizador.

```typescript
trackUnique(`scroll_depth_${depth}`, {
  step: currentStep,       // paso activo al momento del scroll
  depth,                   // 25 | 50 | 75 | 100
})
```

---

### 7.3 Vinculación de `customerId` en tiempo real

**Problema:** `setTrackerIdentity({ customerId })` solo se llama tras `email_sent`
o `payment_confirmed`. Todos los eventos del Paso 3 que ocurren mientras el usuario
llena el formulario (clicks en alternativas, scroll) quedan sin `customerId`.

**Solución:** llamar `setTrackerIdentity({ customerId: email })` en el handler
`onChange` del campo email (con el valor ya convertido a minúsculas), tanto en
`emailPago` como en `emailSolo`. No esperar al submit.

```typescript
// En el input emailPago y emailSolo:
onChange={e => {
  const email = e.target.value.toLowerCase()
  update({ emailPago: email })           // o emailSolo
  if (email.includes('@')) {
    setTrackerIdentity({ customerId: email })
  }
}}
```

La condición `email.includes('@')` evita llamadas con strings parciales
que no son emails válidos.

Adicionalmente, cuando el formulario se abre (panel de pago visible) y
`state.emailPago` ya tiene valor (e.g. regreso desde Webpay), debe llamarse
`setTrackerIdentity` en un `useEffect` reactivo al cambio de `activePanel`.

---

### 7.4 Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/app/cotizador/CotizadorWizard.tsx` | Todos los cambios (ver §7.2 y §7.3) |

No se requieren cambios en schema, API route ni tracker.ts.

---

### 7.5 Tabla completa de eventos post-v2.1

| Evento | Función | Paso | Props clave |
|--------|---------|------|------------|
| `step_1_loaded` | trackUnique | 1 | `{ step: 1 }` |
| `tipo_selected` | track | 1 | `{ tipo }` |
| `step_2_loaded` | trackUnique | 2 | `{ step: 2 }` |
| `charger_selected` | track | 2 | `{ charger, type, step: 2 }` |
| `distance_changed` | track | 2 | `{ distance, step: 2 }` |
| `distance_final` | track | 2 | `{ distance, step: 2 }` |
| `step_3_loaded` | trackUnique | 3 | `{ formId, total }` |
| `step_3_abandoned` | trackUnique | 3 | `{ step: 2 }` |
| `cta_reservar_clicked` | trackUnique | 3 | `{ step: 3 }` |
| `pagar_visita_clicked` | track | 3 | `{ step, amount, option, tipoC, chargerId }` ★ nuevo |
| `pagar_hoy_clicked` | track | 3 | `{ step, amount, amountGross, discount, option, tipoC, chargerId }` ★ nuevo |
| `enviar_cotizacion_clicked` | track | 3 | `{ step, hasEmail }` ★ renombrado |
| `whatsapp_clicked` | track | 3 | `{ step, source }` ★ nuevo |
| `nueva_simulacion_clicked` | track | 3 | `{ step, formId, tipoC }` ★ nuevo |
| `scroll_depth` | trackUnique | 1-3 | `{ step, depth }` ★ nuevo |
| `payment_option_selected` | trackUnique | 3 | `{ step, option, tipo, hasCharger, total }` |
| `webpay_initiated` | trackUnique | 3 | `{ total, selectedPaymentOption }` |
| `email_sent` | track | 3 | `{}` |
| `payment_confirmed` | trackUnique | post | `{ total }` |
| `date_selected` | track | post | `{ date }` |
| `booking_confirmed` | trackUnique | post | `{ date }` |

---

### 7.6 Orden de implementación v2.1

1. **`CotizadorWizard.tsx`** — únicamente este archivo:
   - Agregar `track('pagar_visita_clicked', …)` antes de `payVisit()`
   - Agregar `track('pagar_hoy_clicked', …)` antes de `payDirect()`
   - Renombrar `cta_email_clicked` → `enviar_cotizacion_clicked` con `hasEmail` en props
   - Agregar `track('whatsapp_clicked', …)` en el botón de WhatsApp
   - Agregar `track('nueva_simulacion_clicked', …)` en el botón "Nueva simulación"
   - Agregar `IntersectionObserver` para `scroll_depth` (25/50/75/100%)
   - Agregar `setTrackerIdentity` en `onChange` de `emailPago` y `emailSolo`
2. **Build** `npm run build` — sin errores
3. **Push** a git remote

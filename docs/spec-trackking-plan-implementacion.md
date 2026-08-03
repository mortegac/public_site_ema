# Especificación Técnica e Implementación: Tracking del Cotizador Solar

> Sistema de analítica propio para el funnel del cotizador de Enérgica City.
> Reutiliza la infraestructura existente (AppSync + DynamoDB) — sin Kinesis, S3 ni Athena.

## 1. Resumen del approach

El cotizador necesita tracking granular del funnel (pasos 1 → 2 → 3 → reserva → booking)
sin dependencias externas (Mixpanel, Segment) y sin levantar infra nueva.

**Decisión clave:** el `spec-trackking.md` original proponía
`API Gateway → Kinesis Firehose → S3 → Athena`. Eso es infra adicional. Ya tenemos
AppSync + DynamoDB en producción vía Amplify Gen 2, así que adaptamos el stack existente:

```
React track()  →  Next.js /api/track  →  AppSync mutation  →  DynamoDB (CotizadorEvent)
   sendBeacon         responde 202            createCotizadorEvent       3 GSIs para queries
   (no bloquea)       ANTES de AppSync        (fire-and-forget)          de funnel
```

**Principios:**
- **No-blocking en el cliente:** `navigator.sendBeacon` — no bloquea la UI, sobrevive al cierre de pestaña. Fallback a `fetch({ keepalive: true })`.
- **No-blocking en el servidor:** la API route responde `202` ANTES de llamar AppSync. La mutation corre en background (fire-and-forget).
- **Un solo modelo, una sola mutation:** `CotizadorEvent` + `createCotizadorEvent`.
- **Costo:** entra prácticamente en free tier de DynamoDB para ~1.000 sesiones/mes.

**Proyectos afectados:**

| Proyecto | Path | Cambios |
|----------|------|---------|
| Backend | `ema-back` | Modelo `CotizadorEvent` en `main.schema.ts` + deploy |
| Web | `public_site_ema` | `/api/track`, `src/lib/tracker.ts`, instrumentación del wizard |
| Backoffice | `ema-backofficev2` | Queries de funnel |

---

## 2. Funnel completo del cotizador

El cotizador tiene **5 flujos** determinados por `tipo` (casa/edificio) y `selectedPaymentOption`. Cada uno tiene una secuencia de pasos distinta y requiere tracking diferenciado.

### Pasos del wizard (mapping interno → spec tracking)

| `state.step` | Nombre real | Evento de entrada |
|-------------|-------------|-------------------|
| 0 | **Ubicación y tipo** | `step_1_loaded` |
| 1 | **Selección de cargador** | `step_2_loaded` |
| 2 | **Cotización** | `step_3_loaded` |
| — | **Retorno Webpay** | `payment_confirmed` |
| — | **Agenda** | `date_selected` / `booking_confirmed` |

### Flujos por tipo y opción de pago

```
Paso 1 (tipo + dirección)
├── tipo = "casa"
│   └── Paso 2 (cargador + distancia)
│       ├── hasCharger = true  (chargerId === 'own' — cliente trae su cargador)
│       └── hasCharger = false (cliente compra del catálogo)
│           └── Paso 3 (cotización)
│               ├── selectedPaymentOption = "reserva-70-porc"
│               │     → webpay_initiated (70% del total)
│               │     → payment_confirmed → recibo-pago → agenda → booking_confirmed
│               │
│               ├── selectedPaymentOption = "reserva-30-porc"  ← la más elegida
│               │     → webpay_initiated (30% del total)
│               │     → payment_confirmed → recibo-pago → agenda → booking_confirmed
│               │
│               └── selectedPaymentOption = "visita-tecnica"
│                     → webpay_initiated ($10.000)
│                     → payment_confirmed → recibo-pago → agenda → booking_confirmed
│
└── tipo = "edificio"
    └── Paso 2 (kit comunidad + distancia)
        └── Paso 3 (cotización)
            ├── selectedPaymentOption = "paga-visita-mas-kit-comunidad"
            │     → webpay_initiated ($29.000)
            │     → payment_confirmed → recibo-pago → agenda → booking_confirmed
            │
            └── selectedPaymentOption = "postula-electrolinera-comunitaria"
                  → electrolinera_submitted (SIN webpay — formulario)
                  → email de confirmación (SIN agenda)
```

### Eventos específicos por flujo

**Paso 3 — variantes de conversión según `selectedPaymentOption`:**

```ts
// Casa — usuario elige opción de pago
track('payment_option_selected', {
  option: 'reserva-30-porc',   // | 'reserva-70-porc' | 'visita-tecnica'
  tipo: 'casa',
  hasCharger: state.chargerId === 'own',
  total: displayResult.total,
})

// Edificio — flujo con pago
track('payment_option_selected', {
  option: 'paga-visita-mas-kit-comunidad',
  tipo: 'edificio',
  total: 29000,
})

// Edificio — flujo sin pago (electrolinera)
track('electrolinera_submitted', {
  tipo: 'edificio',
  hasCharger: state.chargerId === 'own',
})
// → NO hay webpay_initiated ni payment_confirmed en este flujo
```

**Post-pago — agenda (aplica a todos los flujos con pago):**

```ts
// En src/app/cotizador/agenda/AgendaClient.tsx
track('date_selected', {
  date: selectedDate,          // 'YYYY-MM-DD'
  daysFromNow: daysFromToday,
  selectedPaymentOption,       // proveniente del JWT o sessionStorage.paymentData
})

track('booking_confirmed', {
  date: selectedDate,
  selectedPaymentOption,
})
```

### `hasCharger` y `selectedPaymentOption` en el evento de conversión

Estos dos campos del spec (GAP-10 de `espec-cotizador-propuesta.md`) son críticos para
el análisis de conversión. Deben incluirse en el evento `webpay_initiated` para cruzar
con los datos de `ClientForm`:

```ts
// En initiatePayment() / payDirect(), antes de fetch('/api/payment'):
track('webpay_initiated', {
  total: displayResult.total,
  hasCharger: state.chargerId === 'own',
  selectedPaymentOption: mapToSelectedPaymentOption(state),
  tipo: state.tipo,
})
```

Donde `mapToSelectedPaymentOption` es el mismo helper de `CotizadorWizard.tsx`:
```ts
// ya implementado en CotizadorWizard.tsx
function mapToSelectedPaymentOption(selectedReserveOption, typeOfCart, tipo) {
  if (typeOfCart === 'visit' && tipo === 'edificio') return 'paga-visita-mas-kit-comunidad'
  if (typeOfCart === 'visit' && tipo === 'casa') return 'visita-tecnica'
  if (selectedReserveOption === 'r70') return 'reserva-70-porc'
  if (selectedReserveOption === 'r30') return 'reserva-30-porc'
  return undefined
}
```

### `currentStep` de `ClientForm` — relación con el tracking

El campo `currentStep` en `ClientForm` (DynamoDB) complementa los eventos de tracking:

| `currentStep` | Significado | Evento de tracking equivalente |
|--------------|-------------|-------------------------------|
| `'0'` | Formulario creado | `step_1_loaded` |
| `'1'` | Cargador seleccionado | `step_2_loaded` |
| `'2'` | Cotización vista | `step_3_loaded` |
| `'3'` | Pago iniciado | `webpay_initiated` |
| `'4'` | Pago confirmado | `payment_confirmed` |
| `'5'` | Visita agendada | `booking_confirmed` |

El tracking de eventos captura los estados intermedios (qué secciones vio, cuánto tiempo tardó, si abandonó) que `currentStep` no puede capturar.

---

## 3. Modelo de datos — Backend (`ema-back`)

Archivo: `amplify/data/main.schema.ts`

Agregar dentro del `a.schema({ ... })`, siguiendo el mismo patrón que `ClientForm`.

### Reglas Amplify Gen 2 aplicadas

- `a.id()` y `a.string()` son **nullable por defecto** — no existe `.optional()`. Solo `eventId`, `event`, `sessionId` y `anonymousId` llevan `.required()`.
- `formId` es un **FK plano** (`a.id()`), sin `belongsTo` — evita la restricción bidireccional que exigiría un `hasMany` inverso en `ClientForm`.
- `props` se guarda como `a.string()` (JSON serializado) para mantener la query simple.
- Auth: `allow.publicApiKey()` para escritura anónima, `allow.authenticated()` para que el backoffice lea con Cognito.

### Snippet para pegar en `main.schema.ts`

```ts
    CotizadorEvent: a.model({
      eventId: a.id().required(),            // PK auto-generado
      event: a.string().required(),          // nombre del evento (step_1_loaded, ...)
      sessionId: a.string().required(),      // UUID por sesión de browser
      anonymousId: a.string().required(),    // UUID persistido en localStorage (ec_uid)
      customerId: a.string(),                // email del cliente, si lo conocemos
      formId: a.id(),                        // FK plano a ClientForm, si existe
      props: a.string(),                     // JSON.stringify de las props del evento
      url: a.string(),                       // pathname al momento del evento
      referrer: a.string(),
      device: a.string(),                    // "mobile" | "desktop"
      step: a.integer(),                     // 1 | 2 | 3, o null si es post-pago
      createdAt: a.datetime(),               // seteado por el cliente; Amplify también lo gestiona
    })
      .identifier(["eventId"])
      .secondaryIndexes(index => [
        // Ver una sesión completa, ordenada cronológicamente
        index("sessionId").sortKeys(["createdAt"]).queryField("CotizadorEventsBySessionId"),
        // Contar/agrupar por tipo de evento en una ventana de tiempo
        index("event").sortKeys(["createdAt"]).queryField("CotizadorEventsByEvent"),
        // Vincular todos los eventos a un ClientForm
        index("formId").queryField("CotizadorEventsByFormId"),
      ])
      .authorization(allow => [
        allow.publicApiKey(),        // crear desde el cliente (anónimo)
        allow.authenticated(),       // leer desde el backoffice (Cognito)
      ]),
```

> **Nota sobre `createdAt`:** se declara explícito para usarlo como `sortKey` en los GSIs.
> El cliente envía `new Date().toISOString()`. Amplify Gen 2 también mantiene su propio
> `createdAt`/`updatedAt` a nivel de sistema; declararlo explícito da control sobre el
> orden cronológico de los eventos del funnel.

---

## 4. Mutation GraphQL

Tras el deploy, Amplify genera `createCotizadorEvent` automáticamente. La API route la invoca con:

```ts
const CREATE_COTIZADOR_EVENT = /* GraphQL */ `
  mutation CreateCotizadorEvent($input: CreateCotizadorEventInput!) {
    createCotizadorEvent(input: $input) {
      eventId
    }
  }
`
```

`CreateCotizadorEventInput` acepta: `event`, `sessionId`, `anonymousId`, `customerId`,
`formId`, `props`, `url`, `referrer`, `device`, `step`, `createdAt`. El campo `eventId` se
omite — DynamoDB/Amplify lo autogenera.

---

## 5. Next.js API route — `/api/track`

Archivo: `src/app/api/track/route.ts`

Sigue el patrón de `src/app/api/quote/route.ts` para `getAppSyncConfig` y `callAppSync`.
**Diferencia clave:** responde `202` ANTES de llamar AppSync (fire-and-forget).

```ts
import { NextResponse } from 'next/server'
import { after } from 'next/server'
import amplifyOutputsProd from '../../../../amplify_outputs.json'
import amplifyOutputsDev from '../../../../amplify_outputs_dev.json'

export const runtime = 'nodejs'

// ─── AppSync config (mismo patrón que /api/quote) ─────────────────────────────
function getAppSyncConfig() {
  const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEV'
  const outputs = isProd ? amplifyOutputsProd : amplifyOutputsDev
  const data = (outputs as any).data
  return { url: data.url as string, apiKey: data.api_key as string }
}

const CREATE_COTIZADOR_EVENT = /* GraphQL */ `
  mutation CreateCotizadorEvent($input: CreateCotizadorEventInput!) {
    createCotizadorEvent(input: $input) { eventId }
  }
`

// ─── Helpers de sanitización ───────────────────────────────────────────────────
function safeProps(raw: unknown): string | null {
  if (raw == null) return null
  try { return JSON.stringify(JSON.parse(JSON.stringify(raw))) }
  catch { return null }
}

function str(v: unknown): string | null {
  return typeof v === 'string' && v.trim() !== '' ? v.trim() : null
}

function intOrNull(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? Math.trunc(v) : null
}

// ─── AppSync call (background) ─────────────────────────────────────────────────
async function sendEvent(input: Record<string, unknown>) {
  const { url, apiKey } = getAppSyncConfig()
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({ query: CREATE_COTIZADOR_EVENT, variables: { input } }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`AppSync HTTP ${res.status}: ${await res.text()}`)
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors.map((e: any) => e.message).join('; '))
}

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  let body: any
  try {
    body = await req.json()
  } catch {
    // sendBeacon puede enviar text/plain
    try { body = JSON.parse(await req.text()) } catch { body = null }
  }

  const event = str(body?.event)
  // Sin nombre de evento: descartamos silenciosamente (202 igual).
  if (!event) return NextResponse.json({}, { status: 202 })

  const input: Record<string, unknown> = {
    event,
    sessionId: str(body?.sessionId) ?? 'unknown',
    anonymousId: str(body?.anonymousId) ?? 'unknown',
    customerId: str(body?.customerId),
    formId: str(body?.formId),
    props: safeProps(body?.props),
    url: str(body?.url),
    referrer: str(body?.referrer),
    device: str(body?.device),
    step: intOrNull(body?.step),
    createdAt: str(body?.timestamp) ?? new Date().toISOString(),
  }

  // Fire-and-forget: after() corre tras enviar la respuesta (Next.js 15 / Vercel).
  // Fallback: void + .catch para runtimes sin after().
  if (typeof after === 'function') {
    after(() => sendEvent(input).catch(err => console.error('[/api/track]', err)))
  } else {
    void sendEvent(input).catch(err => console.error('[/api/track]', err))
  }

  return NextResponse.json({}, { status: 202 })
}
```

> **`after` en Next.js 15:** API estable para trabajo post-respuesta en Vercel.
> Garantiza que `sendEvent` se completa aunque la respuesta HTTP ya salió.
> El fallback `void ... .catch()` cubre otros entornos.

---

## 6. Frontend — `src/lib/tracker.ts`

```ts
// Tracker del cotizador. Estado de sesión a nivel de módulo (no exportado).

const ENDPOINT = '/api/track'
const UID_KEY = 'ec_uid'

export interface TrackPayload {
  event: string
  props: Record<string, unknown>
  sessionId: string
  anonymousId: string
  customerId?: string | null
  formId?: string | null
  url: string
  referrer: string
  device: 'mobile' | 'desktop'
  step?: number | null
  timestamp: string
}

// Un sessionId por carga de módulo (≈ por pestaña/recarga).
const sessionId =
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)

// anonymousId persistente en localStorage. Lazy-init.
let cachedAnonymousId: string | null = null
function getAnonymousId(): string {
  if (cachedAnonymousId) return cachedAnonymousId
  try {
    const existing = localStorage.getItem(UID_KEY)
    if (existing) {
      cachedAnonymousId = existing
    } else {
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2)
      localStorage.setItem(UID_KEY, id)
      cachedAnonymousId = id
    }
  } catch {
    // localStorage bloqueado (modo privado): id efímero por sesión.
    cachedAnonymousId = sessionId
  }
  return cachedAnonymousId
}

function getDevice(): 'mobile' | 'desktop' {
  return /Mobi/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
}

// Identidad enriquecida (formId/customerId) — se setea cuando están disponibles.
let identity: { customerId?: string | null; formId?: string | null } = {}

export function setTrackerIdentity(
  next: { customerId?: string | null; formId?: string | null }
): void {
  identity = { ...identity, ...next }
}

export function track(event: string, props: Record<string, unknown> = {}): void {
  // Guard SSR / server components: no-op.
  if (typeof window === 'undefined') return
  if (!event) return

  const payload: TrackPayload = {
    event,
    props,
    sessionId,
    anonymousId: getAnonymousId(),
    customerId: identity.customerId ?? null,
    formId: identity.formId ?? null,
    url: window.location.pathname,
    referrer: document.referrer,
    device: getDevice(),
    step: typeof props.step === 'number' ? (props.step as number) : null,
    timestamp: new Date().toISOString(),
  }

  const data = JSON.stringify(payload)

  // Primario: sendBeacon (no bloquea, sobrevive a beforeunload).
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([data], { type: 'application/json' })
      if (navigator.sendBeacon(ENDPOINT, blob)) return
    }
  } catch { /* cae al fetch */ }

  // Fallback: fetch keepalive.
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    keepalive: true,
  }).catch(() => { /* tracking nunca rompe la UX */ })
}
```

---

## 7. Integración en `CotizadorWizard.tsx`

Archivo: `src/app/cotizador/CotizadorWizard.tsx`

El wizard mantiene todo en `useState<WizardState>` local:
- `state.step` → 0-indexado (0 = ubicación/tipo, 1 = cargador, 2 = cotización)
- `state.formId` → se setea tras `/api/cotizar`
- `state.apiResult` → resultado del cotizador con `total`, `chargerName`, etc.

Import:
```ts
import { track, setTrackerIdentity } from '@/lib/tracker'
```

### Paso 1 — `state.step === 0` (tipo + dirección)

```ts
// Al montar el wizard:
useEffect(() => { track('step_1_loaded') }, [])

// Al seleccionar casa/edificio:
onClick={() => { update({ tipo: 'casa' }); track('tipo_selected', { tipo: 'casa' }) }}
onClick={() => { update({ tipo: 'edificio' }); track('tipo_selected', { tipo: 'edificio' }) }}

// Al confirmar dirección — solo la comuna, nunca la dirección completa:
track('address_entered', { comuna: extractComuna(addressCity, addressState) })
```

### Paso 2 — `state.step === 1` (cargador + distancia)

```ts
// Al entrar al paso:
useEffect(() => {
  if (state.step === 1) track('step_2_loaded')
}, [state.step])

// Al seleccionar cargador:
function onChargerSelected(id: string) {
  update({ chargerId: id })
  const charger = chargerList.find(c => c.id === id)
  track('charger_selected', {
    charger: charger?.name ?? id,
    type: state.tipoC, // 'portable' | 'wallbox'
  })
}

// Slider de distancia — onChangeCommitted es el evento al soltar el slider (MUI):
<Slider
  value={state.dist}
  onChange={(_, v) => {
    update({ dist: v as number })
    track('distance_changed', { distance: v as number })
  }}
  onChangeCommitted={(_, v) => track('distance_final', { distance: v as number })}
/>
```

### Paso 3 — `state.step === 2` (resultado + conversión)

```ts
// Al montar con resultado disponible:
useEffect(() => {
  if (state.step === 2 && state.apiResult) {
    track('step_3_loaded', {
      total: state.apiResult.total,
      charger: state.apiResult.chargerName,
      distance: state.dist,
    })
  }
}, [state.step, state.apiResult])

// IntersectionObserver para engagement pasivo.
// Marcar secciones en JSX con data-track:
//   <Box data-track="desglose">     → desglose_viewed
//   <Box data-track="timeline">     → timeline_viewed
//   <Box data-track="social_proof"> → social_proof_viewed
const EVENT_BY_SECTION: Record<string, string> = {
  desglose: 'desglose_viewed',
  timeline: 'timeline_viewed',
  social_proof: 'social_proof_viewed',
}
useEffect(() => {
  if (state.step !== 2) return
  const observer = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const key = (e.target as HTMLElement).dataset.track
        if (key && EVENT_BY_SECTION[key]) {
          track('section_viewed', { section: key })
          track(EVENT_BY_SECTION[key])
        }
        observer.unobserve(e.target) // una sola vez por sección
      }
    },
    { threshold: 0.5 },
  )
  document.querySelectorAll('[data-track]').forEach(el => observer.observe(el))
  return () => observer.disconnect()
}, [state.step])

// Botón "Reservar":
onClick={() => { track('cta_reservar_clicked'); initiatePayment() }}

// Dentro de initiatePayment(), antes del fetch('/api/payment'):
track('webpay_initiated', { total: displayResult.total })

// Selección de opción de pago (ANTES de webpay_initiated):
track('payment_option_selected', {
  option: mapToSelectedPaymentOption(state.selectedReserveOption, typeOfCart, state.tipo),
  tipo: state.tipo,
  hasCharger: state.chargerId === 'own',
  total: displayResult.total,
})

// Canales alternativos:
track('cta_email_clicked')         // al abrir el panel de email
track('email_sent')                // al enviar exitosamente (NO incluir el email en props)
track('cta_whatsapp_clicked')      // al abrir WhatsApp
track('volver_simular_clicked')    // al resetear/volver desde paso 3

// Flujo electrolinera (edificio sin pago) — al enviar el formulario:
track('electrolinera_submitted', {
  tipo: 'edificio',
  hasCharger: state.chargerId === 'own',
})
```

### Drop-off del paso 3 (`beforeunload`)

```ts
// Usar refs para leer estado fresco en el handler de beforeunload:
const paidRef = useRef(state.paid)
const stepRef = useRef(state.step)
useEffect(() => {
  paidRef.current = state.paid
  stepRef.current = state.step
}, [state.paid, state.step])

useEffect(() => {
  const stepStart = Date.now()
  function onBeforeUnload() {
    if (stepRef.current === 2 && !paidRef.current) {
      track('step_3_abandoned', {
        total: state.apiResult?.total ?? null,
        timeOnStep: Date.now() - stepStart,
      })
    }
  }
  window.addEventListener('beforeunload', onBeforeUnload)
  return () => window.removeEventListener('beforeunload', onBeforeUnload)
}, [state.step, state.apiResult])
```

### Timer por paso

```ts
const stepStartRef = useRef(Date.now())
useEffect(() => {
  const prevStep = state.step
  return () => {
    // step 1-indexado para coincidir con el spec
    track('step_time', { step: prevStep + 1, duration_ms: Date.now() - stepStartRef.current })
    stepStartRef.current = Date.now()
  }
}, [state.step])
```

### Post-pago

Estos eventos viven fuera del wizard:

| Evento | Archivo | Flujos |
|--------|---------|--------|
| `payment_confirmed` | `src/app/cotizador/recibo-pago/ReciboPagoClient.tsx` | todos con pago |
| `date_selected` | `src/app/cotizador/agenda/AgendaClient.tsx` | todos con pago |
| `booking_confirmed` | `src/app/cotizador/agenda/AgendaClient.tsx` | todos con pago |
| `whatsapp_share_clicked`, `email_share_clicked` | Botones de compartir en pantalla de éxito | todos |
| `electrolinera_submitted` | `src/app/cotizador/CotizadorWizard.tsx` | solo edificio-electrolinera |

Todos con `step: null` (son post-funnel).

> **Flujo electrolinera:** no pasa por Webpay ni por `/cotizador/agenda`. El tracking termina en `electrolinera_submitted`. No habrá `payment_confirmed`, `date_selected` ni `booking_confirmed` para estas sesiones.

---

## 8. Identidad: `formId` y `customerId`

Enriquecer el tracker en cuanto tengamos los datos para que todos los eventos posteriores los lleven automáticamente:

```ts
// Al recibir formId desde /api/cotizar (en goNext()):
update({ formId, /* ... */ })
setTrackerIdentity({ formId })

// Al obtener el email del usuario (en handleSendEmail / initiatePayment):
setTrackerIdentity({ customerId: email.trim().toLowerCase() })
```

> El `formId` real está en `state.formId` del wizard. En el Redux store, la referencia
> es `state.clientForms.currentForm.formId` (NO `currentFormId`).
> Usar `state.formId` local como fuente de verdad durante el flujo del cotizador.

---

## 9. Fases de implementación

| Fase | Tarea | Proyecto | Prioridad |
|------|-------|----------|-----------|
| 1 | Agregar `CotizadorEvent` al schema Amplify Gen 2 | ema-back | Alta |
| 1 | Deploy del schema (pipeline CI/CD) | ema-back | Alta |
| 2 | Crear `src/app/api/track/route.ts` | public_site_ema | Alta |
| 2 | Crear `src/lib/tracker.ts` | public_site_ema | Alta |
| 3 | Instrumentar paso 1, 2, 3 en `CotizadorWizard.tsx` | public_site_ema | Alta |
| 3 | `setTrackerIdentity(formId/customerId)` | public_site_ema | Alta |
| 3 | `data-track` + IntersectionObserver para secciones | public_site_ema | Media |
| 3 | `beforeunload` drop-off del paso 3 | public_site_ema | Alta |
| 3 | Eventos post-pago (recibo-pago, agenda) | public_site_ema | Media |
| 4 | Backoffice: queries de funnel | ema-backofficev2 | Media |
| 4 | TTL 90 días en tabla DynamoDB de `CotizadorEvent` | ema-back | Baja |

**Verificación por fase:**
- Fase 1 → `CotizadorEventsBySessionId` aparece en el schema AppSync (consola / introspección).
- Fase 2 → `POST /api/track` con `{"event":"test"}` responde `202` y aparece 1 item en DynamoDB.
- Fase 3 → Recorrer el cotizador y ver la secuencia completa filtrando por `sessionId` en `CotizadorEventsBySessionId`.

---

## 10. Queries de análisis para el backoffice

Usan los `queryField` de los GSIs. Requieren auth Cognito (`allow.authenticated()`).

```graphql
# Timeline completo de una sesión (funnel individual)
query SessionTimeline($sessionId: String!) {
  CotizadorEventsBySessionId(sessionId: $sessionId, sortDirection: ASC) {
    items { event step props url device createdAt }
  }
}

# Conteo por tipo de evento en una ventana de tiempo
query EventsByType($event: String!, $from: String!, $to: String!) {
  CotizadorEventsByEvent(
    event: $event
    createdAt: { between: [$from, $to] }
    sortDirection: DESC
    limit: 1000
  ) {
    items { sessionId props device createdAt }
  }
}

# Todos los eventos de un ClientForm
query EventsByForm($formId: ID!) {
  CotizadorEventsByFormId(formId: $formId) {
    items { event step props createdAt }
  }
}
```

**Mapeo métrica → query:**

| Métrica | Cómo calcularla |
|---------|-----------------|
| Funnel paso 1 → 2 → 3 → reserva → booking | `EventsByType` para cada evento clave, comparar counts |
| Conversión paso 3 → reserva | `count(cta_reservar_clicked) / count(step_3_loaded)` |
| Drop-off (punto exacto) | `EventsByType("step_3_abandoned")` → leer `props.timeOnStep` |
| ¿Ven social proof antes de reservar? | `SessionTimeline`: `section_viewed{social_proof}` con `createdAt` < `cta_reservar_clicked` en misma sesión |
| ¿WhatsApp convierte después? | Sesiones con `cta_whatsapp_clicked` que luego tienen `webpay_initiated` (cruce por `sessionId`) |
| Tiempo de decisión paso 3 | `EventsByType("step_time")` → promedio `props.duration_ms` donde `props.step === 3` |
| Email vs reserva directa | `count(cta_email_clicked) / count(cta_reservar_clicked)` |
| Dispositivo que más convierte | `EventsByType("payment_confirmed")` agrupado por `device` |

---

## 11. Consideraciones de privacidad

- **`anonymousId` es anónimo** hasta que el usuario introduce su email. Solo ahí `setTrackerIdentity({ customerId: email })` vincula la sesión.
- **No almacenar datos sensibles en `props`:**
  - `address_entered` → solo la **comuna**, nunca la dirección exacta.
  - `email_sent` → NO incluir el email en `props`; la vinculación va por `customerId` a nivel de evento.
  - Nunca incluir RUT, teléfono ni dirección exacta.
- **`customerId`** guarda el email en lowercase. Acceso de lectura restringido a Cognito.
- **TTL de datos:** configurar atributo TTL (`expiresAt` = `createdAt` + 90 días) en la tabla DynamoDB. Habilitar TTL en consola DynamoDB o override CDK en `amplify/backend.ts`.

---

## Resumen de archivos

| Archivo | Acción |
|---------|--------|
| `ema-back/amplify/data/main.schema.ts` | Agregar modelo `CotizadorEvent` |
| `public_site_ema/src/app/api/track/route.ts` | **Nuevo** — route handler 202 fire-and-forget |
| `public_site_ema/src/lib/tracker.ts` | **Nuevo** — `track()` + `setTrackerIdentity()` |
| `public_site_ema/src/app/cotizador/CotizadorWizard.tsx` | Instrumentar eventos de pasos 1, 2, 3 |
| `public_site_ema/src/app/cotizador/recibo-pago/ReciboPagoClient.tsx` | `payment_confirmed` |
| `public_site_ema/src/app/cotizador/agenda/AgendaClient.tsx` | `date_selected`, `booking_confirmed` |

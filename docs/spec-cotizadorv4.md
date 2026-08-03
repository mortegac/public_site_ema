# Especificación — Cotizador v4

**Fecha:** 31-jul-2026  
**Branch:** `feat/cotizadorv4`  
**Archivo principal:** `src/app/cotizador/CotizadorWizard.tsx` (3310 líneas)  
**Spec de referencia v3 (producción):** `/Users/manu/_CODE/ENERGICA/Cotizadorv4/v3-especificacion-flujos-cotizador-produccion.md`  
**Spec de referencia v4 (nuevos caminos):** `/Users/manu/_CODE/ENERGICA/Cotizadorv4/v4-especificacion-flujos-cotizador-ema.md`

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2026-08-03 | Eliminación de Google Maps Places API — reemplazada por selector región/comuna + campo libre de dirección (aplica a v3 y v4) |
| 2026-07-31 | Versión inicial v4 — step opcional de agenda pre-pago |

---

## Objetivo

La versión 4 del cotizador mantiene **todos los flujos de v3 en producción** e incorpora el camino de **agendamiento previo al pago** descrito en el prototipo v4 (cotizador-ema-v2). El cambio principal es añadir un step opcional de calendario entre Tipo y Cargador.

---

## Arquitectura actual (v3)

```
Step 0: Tipo (Casa / Edificio)
Step 1: Cargador (tipo, modelo, distancia, pisos edificio)
Step 2: Cotización (precio con pago — Casa) / (rango + kit + electrolinera — Edificio)
→ post-pago: /cotizador/agenda (página separada)
```

Stepper labels: `['Ubicación', 'Cargador', 'Cotización']`

---

## Arquitectura nueva (v4)

```
Step 0: Tipo (Casa / Edificio) — DOS CTAs
  ├─ path='agendar' → Step 1 (Agenda) → Step 2 (Cargador) → Step 3 (Cotización)
  └─ path='cotizar' → Step 2 (Cargador, salta step 1) → Step 3 (Cotización)

Step 1 [NUEVO]: Agenda — calendario con fechas reales del backend
Step 2: Cargador (igual a v3 step 1)
Step 3: Cotización (igual a v3 step 2, con banner verde si hay fecha pre-agendada)
  └─ ALT Visita Técnica sin fecha → loop tardío a Step 1 (Agenda) → vuelta a Step 3
→ post-pago: /cotizador/agenda (sin cambios)
```

Stepper labels:
- `path='agendar'`: `['Tipo', 'Agenda', 'Cargador', 'Cotización']`
- `path='cotizar'`: `['Tipo', 'Agenda (omitido)', 'Cargador', 'Cotización']`

---

## Cambios detallados

### 1. Estado — nuevos campos en `WizardState`

```typescript
path: 'agendar' | 'cotizar' | null          // camino elegido en step 0
preBookedDate: string | null                 // dateKey ISO e.g. '2026-08-05'
preBookedLabel: string | null                // label human e.g. 'mié. 5 ago.'
preBookedCalendarId: string | null           // slot.calendarId del backend
```

### 2. Step 0 — Tipo (cambio: dos CTAs)

**Antes (v3):** Una sola tarjeta de selección + botón "Siguiente →"

**Ahora (v4):** Dos tarjetas (Casa/Edificio) + **DOS CTAs**:
- CTA primario (magenta): `📅 Agenda visita y cotizar` → `path='agendar'`, `step=1`
- CTA secundario (outline): `Solo quiero la cotización →` → `path='cotizar'`, `step=2`

Validación: ambos CTAs deshabilitados si `tipo === null`.

Texto bajo botones:
> "Puedes ver la disponibilidad y reservar tu horario ahora, o revisar tu precio primero y agendar después."

El enlace "No quiero instalación, solo comprar un cargador" se mantiene.

### 3. Step 1 [NUEVO] — Agenda

**Solo accesible con `path='agendar'`.**

UI:
- Banner teal con `type` (casa/edificio) + "Agenda tu visita técnica"
- Lista de fechas (16 días corridos desde +2 días, sin domingos)
- Datos: desde `/api/schedules?startDate=...&endDate=...` (mismo endpoint que `AgendaClient.tsx`)
- Cada fila: fecha label + chip "Disponible"/"No disponible"/"Seleccionado"
- Banda horaria: al seleccionar fecha se muestra "Horario hábil 09:00 a 18:00 · se confirma posterior"
- Estado de carga: spinner "Cargando fechas disponibles..."
- Sin fechas disponibles: "No hay fechas disponibles. Continúa sin fecha y agenda después."

Acciones:
- **"Atrás"** → step 0
- **"Confirmar fecha · {label} →"** (deshabilitado si no hay selección) → guarda `preBookedDate`, `preBookedLabel`, `preBookedCalendarId`; avanza a step 2
- **"Prefiero elegir la fecha después →"** (texto secundario, siempre visible) → step 2 sin fecha (equivalente a path='cotizar' pero conserva path='agendar' para el stepper)

No se llama a `/api/confirm-charger-visit` en este punto — la fecha se pre-selecciona solo en state. El bloqueo real ocurre post-pago.

### 4. Step 2 — Cargador

Sin cambios funcionales respecto a v3 step 1. Solo los event handlers de tracking actualizan el número de step (+1).

Acciones:
- **"Atrás"** → step 1 (si path='agendar') o step 0 (si path='cotizar')
- **"Ver mi cotización"** → llama a `/api/cotizar`, avanza a step 3

### 5. Step 3 — Cotización

**Variante Casa — cambios:**

1. **Banner verde** (solo si `preBookedLabel !== null`):
   ```
   📅 Horario elegido: {preBookedLabel} · horario hábil 09:00 a 18:00 — se bloquea al pagar
   ```

2. **ALT 1 — Visita Técnica $9.990**: CTA cambia según si hay fecha:
   - Con fecha: `"Confirmar y pagar visita $9.990 →"` → abre formulario Webpay directamente
   - Sin fecha: `"Agendar y pagar visita $9.990 →"` → navega a step 1 (loop tardío)

3. El loop tardío: al navegar a step 1 desde cotización, el usuario selecciona fecha, vuelve a step 3 con el banner verde activado. El formulario de pago continúa igual (payDirect con typeOfCart='visit').

**Variante Edificio:** sin cambios. El loop tardío de visita técnica aplica igual si se agrega esa funcionalidad, pero no está en el scope de v4.

### 6. Stepper — 4 labels con "omitido"

```typescript
// 4 labels always shown
const LABELS = ['Tipo', 'Agenda', 'Cargador', 'Cotización']

// Active index:
// path='agendar': step maps 0→0, 1→1, 2→2, 3→3
// path='cotizar': step maps 0→0, (skip 1), 2→2 displayed as 3→3 (step 2 = "Cargador" idx 2)
// Agenda shown as omitido when path='cotizar' and step >= 2
```

Label especial para Agenda cuando omitido:
```tsx
{label === 'Agenda' && path === 'cotizar' && step >= 2 && (
  <Typography sx={{ fontSize: '0.55rem', color: '#94A3B8' }}>omitido</Typography>
)}
```

### 7. `resetAll()` — reset parcial (cambio de comportamiento)

**Antes:** borra todo el estado, vuelve a step 0 limpio.

**Ahora:** conserva `tipo`, `dist`, `edificioFloor`, `edificioParkingFloor`, `edificioVisitorParking`. Limpia `path`, fechas, precio, pago, chargerId, emails.

```typescript
// ponytail: partial reset — conserva ubicación/distancia/pisos (UX spec v4)
function resetAll() {
  setState(prev => ({
    ...INITIAL_STATE,      // spread estado vacío
    tipo: prev.tipo,       // conservar
    dist: prev.dist,
    edificioFloor: prev.edificioFloor,
    edificioParkingFloor: prev.edificioParkingFloor,
    edificioVisitorParking: prev.edificioVisitorParking,
  }))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

### 8. `goNext()` — routing actualizado

```typescript
async function goNext() {
  if (state.step === 1 && state.path === 'agendar') {
    // Agenda step: just advance to cargador
    update({ step: 2 })
    trackUnique('step_2_loaded', { step: 2, typeOfResidence })
    return
  }
  if (state.step === 2 || (state.step === 1 && state.path === 'cotizar')) {
    // Cargador step: call API (existing logic, step → 3)
    // ... existing API call code, but sets step: 3 instead of 2
    return
  }
  if (state.step < 3) {
    update({ step: state.step + 1 })
  }
}
```

### 9. `goBack()` — routing actualizado

```typescript
function goBack() {
  if (state.step === 2 && state.path === 'agendar') {
    update({ step: 1, activePanel: null })  // back to agenda
  } else if (state.step > 0) {
    update({ step: state.step - 1, activePanel: null })
  }
}
```

### 10. STEP_TITLES / STEP_SUBTITLES

Añadir entrada para step 1 (Agenda):
```typescript
const STEP_TITLES = [
  'Cotiza tu instalación',       // step 0
  'Agenda tu visita técnica',    // step 1 [NUEVO]
  'Elige tu cargador eléctrico', // step 2
  'Tu cotización al instante',   // step 3
  'Agenda tu visita técnica',    // step 4 (post-pago existente)
  '¡Todo listo!',                // step 5
]
```

### 11. Tracking — eventos nuevos

- `agenda_path_selected`: cuando usuario elige "Agenda visita y cotizar" en step 0
- `direct_path_selected`: cuando usuario elige "Solo quiero la cotización" en step 0
- `pre_booking_date_selected`: cuando selecciona fecha en step 1
- `pre_booking_skipped`: cuando hace clic en "Prefiero elegir la fecha después"
- `late_booking_loop`: cuando navega desde cotización a step 1 para elegir fecha

---

## Flujos end-to-end v4

**F1 — Casa · agenda primero · paga visita:** Tipo → "Agenda visita y cotizar" → Calendario → fecha → Cargador → "Ver mi cotización" → Cotización con banner verde → "Confirmar y pagar visita $9.990" → Webpay → /cotizador/agenda

**F2 — Casa · directo · paga visita:** Tipo → "Solo quiero la cotización" → Cargador → Cotización → "Agendar y pagar visita $9.990" → (loop tardío) Calendario → fecha → Cotización con banner verde → "Confirmar y pagar visita $9.990" → Webpay

**F3 — Casa · directo · paga hoy:** Tipo → "Solo quiero la cotización" → Cargador → Cotización → "Pagar hoy $X" → Webpay (sin fecha pre-agendada, agenda post-pago normal)

**F4 — Edificio · agenda primero:** Tipo (Edificio) → "Agenda visita y cotizar" → Calendario → fecha → Cargador + pisos → Cotización edificio → "Pagar visita y recibir mi kit" → Webpay

**F5 — Edificio · directo:** Mismo que v3. Sin cambios funcionales en edificio.

**F6 — Reset parcial:** Desde "← Nueva simulación" → conserva tipo/distancia/pisos, vuelve a step 0 con CTAs de path.

---

## Archivos modificados

### Cotizador v4 (agendamiento pre-pago)

| Archivo | Cambio |
|---------|--------|
| `src/app/cotizador/CotizadorWizard.tsx` | Todos los cambios v4 |

### Dirección — eliminación Google Maps (2026-08-03)

| Archivo | Cambio |
|---------|--------|
| `src/app/components/AddressInput2.tsx` | Reescrito: Google Maps → selector región/comuna + campo libre |
| `src/data/chile-regions.ts` | Nuevo: 16 regiones y ~346 comunas de Chile |
| `src/app/cotizador/CotizadorWizard.tsx` | Eliminado GMAPS_KEY, RM_KEYWORDS, isRegionMetropolitana; nuevo isServiceable(regionCode) |

**Sin cambios (heredan nuevo AddressInput2 automáticamente):**
- `src/slices/ContactForm/variants/PostulacionElectrolineras.tsx`
- `src/slices/StepWizard/components/Step02.tsx`
- `src/app/forms/ficha-tecnica-cargadores/FichaTecnicaClient.tsx`
- `src/app/components/shared/CalendarSteps/FormStep01.tsx`
- `src/app/components/shared/QuoterSteps/FormStep01.tsx`
- `src/app/cotizador/pago/PagoClient.tsx`

**Sin cambios — APIs:**
- `src/app/cotizador/page.tsx`
- `src/app/cotizador/agenda/AgendaClient.tsx`
- `src/app/api/schedules/route.ts`
- `src/app/api/cotizar/route.ts`
- `src/app/api/payment/route.ts`
- `src/app/api/customer/route.ts` — estructura de datos conservada

### Estructura de datos hacia la API — sin cambios

Antes y después de la migración, `/api/customer` recibe el mismo payload:

```json
{
  "address": "Av. Providencia 1234, Las Condes, RM",
  "city": "Las Condes",
  "state": "RM",
  "zipCode": "",
  "lat": "",
  "lng": ""
}
```

La diferencia: `city` ahora es la comuna seleccionada explícitamente (antes venía de Google Maps), `zipCode`/`lat`/`lng` se envían como strings vacíos (antes venían de geocodificación). La BD acepta strings vacíos en esos campos optativos.

---

## Reglas de negocio conservadas de v3

- Visita técnica $9.990, acreditable al presupuesto final
- 10% descuento si paga hoy (casa)
- Precio backend real vía `/api/cotizar`
- Edificio: rango fijo $1.350.000–$3.110.000 + kit + electrolinera
- Webpay para todos los pagos
- Formulario de datos inline antes del pago

---

## Lo que NO cambia

- Flujo de pago Webpay (inline expandible)
- `/cotizador/agenda` post-pago (sin tocar)
- Lógica de precios y cálculos
- Panel edificio (electrolinera, kit, formulario lead)
- Envío de cotización por email
- Enlace WhatsApp
- Tienda de cargadores (`/cargadores-vehiculos-electricos-sin-instalacion`)
- Tracking existente (solo se añaden nuevos eventos)

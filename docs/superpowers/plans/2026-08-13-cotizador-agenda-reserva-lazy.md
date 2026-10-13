# Cotizador — Reserva Lazy de Agenda Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Persistir la selección de agenda (día + rango horario) en Redux store y crear la reserva real en el calendario sólo cuando el usuario ingresa sus datos de contacto y presiona "Pagar con Webpay".

**Architecture:** La selección de agenda se guarda en el slice `clientForms` (ya persistido en localStorage). Cuando el usuario confirma sus datos en el formulario de Visita Técnica en paso 3, se llama `makeReservation(email, calendarId)` → obtiene `cartId` → llama `fetchWebpayStart(cartId)` → redirige a Webpay con el cart que ya tiene la reserva asociada. Esto reemplaza el `payDirect()` en la ruta de visita con preBookedCalendarId.

**Tech Stack:** Next.js 15, Redux Toolkit, redux-persist, AWS AppSync GraphQL, Webpay Transbank

---

## Contexto de arquitectura

### Flujo ACTUAL (incorrecto)
1. Usuario selecciona fecha → se guarda en estado local del componente (NO persiste)
2. Clic "Pagar" → `payDirect()` → llama `/api/payment` → crea nuevo cart → redirige a Webpay
3. Después del pago (Lambda WebpayConfirm) → crea reserva en calendario

### Flujo NUEVO (correcto)
1. Usuario selecciona fecha → se guarda en `clientForms` Redux slice (PERSISTE en localStorage)
2. Usuario llena formulario en paso 3 (email, dirección, nombre, teléfono)
3. Clic "Pagar con Webpay" → llama `makeReservation(email, calendarId)` → obtiene `cartId`
4. Llama `fetchWebpayStart({ shoppingCartId: cartId, glosa: "Visita técnica" })` → obtiene `{ token, url }`
5. Redirige a Webpay vía form POST

### Archivos clave
- `src/store/CalendarVisits/services.ts:makeReservation(objFilter)` — llama mutation `MakeReservationAndCart(customerId, calendarId)` → `{ message, cartId }`
- `src/store/Webpay/services.ts:fetchWebpayStart(objFilter)` — llama mutation `webpayStart(shoppingCartId, glosa)` → `{ token, url }`
- `src/store/CalendarVisits/services.ts:normalizeCustomerIdKey(email)` — normaliza el email como customerId
- `src/store/ClientForms/slice.ts` — slice persistido (está en `whitelist: ['clientForms']`)
- `src/app/cotizador/CotizadorWizard.tsx` — wizard principal, ~2900 líneas
  - `state.preBookedCalendarId` — calendarId seleccionado (actualmente sólo en estado local)
  - `state.preBookedLabel` — label legible "lun, 11 ago · 12:00 a 15:00"
  - `state.preBookedDate` — fecha ISO
  - `goNext()` — captura preBookedOverride y avanza al paso 3
  - `payDirect()` — función actual de pago (usada en rutas casa/edificio cotizar)

---

## File Structure

| Archivo | Cambio |
|---------|--------|
| `src/store/ClientForms/slice.ts` | Agregar campos `cotizadorCalendarId`, `cotizadorDateLabel`, `cotizadorDateKey` + action `setAgendaSelection` |
| `src/app/cotizador/CotizadorWizard.tsx` | (1) Dispatch `setAgendaSelection` cuando se captura preBookedOverride. (2) Reemplazar `payDirect()` en Visita Técnica con la nueva función `payWithReservation()` |

No se crean archivos nuevos. No se modifica backend.

---

## Task 1: Agregar selección de agenda al slice clientForms (persistido)

**Files:**
- Modify: `src/store/ClientForms/slice.ts`

- [ ] **Step 1: Agregar campos al interface y initialState**

En `src/store/ClientForms/slice.ts`, agregar al `interface ClientFormsState`:

```typescript
interface ClientFormsState {
  currentStep: number,
  status: "idle" | "loading" | "failed";
  currentForm: ClientForm;
  loading: boolean;
  error: string | null;
  isWallbox: boolean | null;
  // Agenda selection — persisted so page refresh doesn't lose the slot
  cotizadorCalendarId: string | null;
  cotizadorDateLabel: string | null;
  cotizadorDateKey: string | null;
}
```

Y en `initialState`:

```typescript
const initialState: ClientFormsState = {
  currentStep: 0,
  status: "idle",
  currentForm: emptyClientForm,
  loading: false,
  error: null,
  isWallbox: false,
  cotizadorCalendarId: null,
  cotizadorDateLabel: null,
  cotizadorDateKey: null,
};
```

- [ ] **Step 2: Agregar action `setAgendaSelection`**

En `reducers` del slice, agregar:

```typescript
setAgendaSelection: (state, action: PayloadAction<{
  calendarId: string | null;
  dateLabel: string | null;
  dateKey: string | null;
}>) => {
  state.cotizadorCalendarId = action.payload.calendarId;
  state.cotizadorDateLabel = action.payload.dateLabel;
  state.cotizadorDateKey = action.payload.dateKey;
},
```

- [ ] **Step 3: Exportar la action**

En la sección de exports del slice (donde se exportan las otras actions), agregar `setAgendaSelection`:

```typescript
export const { setAgendaSelection, /* ... existing exports ... */ } = clientFormsSlice.actions;
```

- [ ] **Step 4: Verificar build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add src/store/ClientForms/slice.ts
git commit -m "feat(store): agregar selección de agenda persistida en clientForms slice"
```

---

## Task 2: Sincronizar selección de agenda al Redux store desde el wizard

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx`

**Context:** El wizard usa `useReducer` local. Cuando `goNext()` captura `preBookedOverride` (fecha+slot seleccionados), debe también despachar `setAgendaSelection` al Redux store. También debe limpiar al hacer reset.

- [ ] **Step 1: Agregar imports Redux en CotizadorWizard.tsx**

En la sección de imports del archivo (cerca de `track, trackUnique`), agregar:

```typescript
import { useDispatch } from 'react-redux'
import { setAgendaSelection } from '@/store/ClientForms/slice'
import type { AppDispatch } from '@/store/store'
```

- [ ] **Step 2: Instanciar dispatch dentro del componente**

Dentro de la función `CotizadorWizard()`, después de las declaraciones de estado (`const [state, update] = ...`), agregar:

```typescript
const dispatch = useDispatch<AppDispatch>()
```

- [ ] **Step 3: Despachar al capturar preBookedOverride en goNext()**

En `goNext()`, justo después del bloque que asigna `preBookedOverride` (después del `track('pre_booking_confirmed', ...)`) y antes de `skipPreBookRef.current = false`, agregar:

```typescript
if (preBookedOverride) {
  dispatch(setAgendaSelection({
    calendarId: preBookedOverride.preBookedCalendarId,
    dateLabel: preBookedOverride.preBookedLabel,
    dateKey: preBookedOverride.preBookedDate,
  }))
}
```

El bloque completo queda así (sólo se añaden las 7 líneas del if):

```typescript
// (existing) capture pre-booking
if (state.step === 1 && state.path === 'agendar' && !skipPreBookRef.current && state.agendaSelectedIndex !== null && state.agendaSelectedSlot !== null) {
  const selDate = (state.agendaDates ?? [])[state.agendaSelectedIndex]
  const selSlot = selDate?.slots.find(s => s.key === state.agendaSelectedSlot)
  if (selDate && selSlot) {
    preBookedOverride = {
      preBookedDate: selDate.dateKey,
      preBookedLabel: `${selDate.label} · ${selSlot.label}`,
      preBookedCalendarId: selSlot.calendarId,
    }
    track('pre_booking_confirmed', { date: selDate.dateKey, slot: selSlot.key })
  }
}
// NEW: persist to Redux
if (preBookedOverride) {
  dispatch(setAgendaSelection({
    calendarId: preBookedOverride.preBookedCalendarId,
    dateLabel: preBookedOverride.preBookedLabel,
    dateKey: preBookedOverride.preBookedDate,
  }))
}
skipPreBookRef.current = false
```

- [ ] **Step 4: Limpiar Redux al hacer resetAll()**

En la función `resetAll()`, añadir el dispatch después de `update({ ...initialWizardState })`:

```typescript
function resetAll() {
  update({ ...initialWizardState })
  dispatch(setAgendaSelection({ calendarId: null, dateLabel: null, dateKey: null }))
}
```

(Nota: `initialWizardState` es el objeto con los valores por defecto del estado local. Busca el `update({` dentro de `resetAll` y añade la línea después.)

- [ ] **Step 5: Verificar build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizador): sincronizar selección de agenda al Redux store persistido"
```

---

## Task 3: Crear reserva en calendario al confirmar datos del customer

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx`

**Context:** En el formulario de Visita Técnica (paso 3, panel Visita), cuando el usuario tiene `preBookedLabel` y presiona "Pagar $9.990 con Webpay →", actualmente llama `payDirect(visitaAmount, ...)`. Debe reemplazarse por una nueva función `payWithReservation()` que:
1. Guarda datos del customer vía `/api/customer`
2. Llama `makeReservation({ customerId: email, calendarId })` → obtiene `cartId`
3. Llama `fetchWebpayStart({ shoppingCartId: cartId, glosa: 'Visita técnica' })` → obtiene `{ token, url }`
4. Hace form POST a `url` con `token_ws = token`

- [ ] **Step 1: Agregar imports de services de CalendarVisits y Webpay**

En la sección de imports de `CotizadorWizard.tsx`, agregar:

```typescript
import { makeReservation } from '@/store/CalendarVisits/services'
import { fetchWebpayStart } from '@/store/Webpay/services'
import { normalizeCustomerIdKey } from '@/store/Customer/services'
```

(Nota: `normalizeCustomerIdKey` ya existe en `src/store/Customer/services.ts` — normaliza el email como customerId para AppSync)

- [ ] **Step 2: Implementar `payWithReservation()`**

Dentro de la función `CotizadorWizard()`, añadir esta función junto a `payDirect()`:

```typescript
async function payWithReservation(amount: number, calendarId: string) {
  update({ webpayLoading: true, webpayError: '' })
  const email = state.emailPago?.trim().toLowerCase()
  if (!email || !calendarId) {
    update({ webpayLoading: false, webpayError: 'Faltan datos requeridos' })
    return
  }

  // 1. Save customer data (non-blocking)
  fetch('/api/customer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      name: state.nombreEmail || email,
      phone: state.visitaTelefono || '',
      address: state.address || '',
      city: state.addressCity || '',
      state: state.addressState || '',
      typeOfResidence: state.tipo === 'casa' ? 'house' : 'appartment',
      formId: state.formId ?? null,
    }),
  }).catch(() => null)

  try {
    // 2. Create reservation → get cartId
    const reservation = await makeReservation({
      customerId: normalizeCustomerIdKey(email),
      calendarId,
    })
    if (!reservation?.cartId) throw new Error('No se pudo crear la reserva')

    // 3. Start Webpay with the reservation's cart
    const webpay = await fetchWebpayStart({
      shoppingCartId: reservation.cartId,
      glosa: 'Visita técnica',
    })
    if (!webpay?.token || !webpay?.url) throw new Error('Error al iniciar el pago')

    // 4. Store payment data for return page
    sessionStorage.setItem('paymentData', JSON.stringify({
      tipo: state.tipo ?? '',
      email,
      nombre: state.nombreEmail ?? '',
      telefono: state.visitaTelefono ?? '',
      total: amount,
      formId: state.formId ?? '',
      paymentType: 'visitaTecnica',
    }))

    trackUnique('webpay_initiated', { total: amount, selectedPaymentOption: 'visit' })

    // 5. Redirect to Webpay
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = webpay.url
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = 'token_ws'
    input.value = webpay.token
    form.appendChild(input)
    document.body.appendChild(form)
    form.submit()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al procesar el pago'
    update({ webpayLoading: false, webpayError: message })
  }
}
```

- [ ] **Step 3: Verificar type de `fetchWebpayStart` input**

Abrir `src/store/Webpay/type.ts` y verificar que `webpayInput` incluye `shoppingCartId` y `glosa`. Basado en `services.ts` línea 49, ya los incluye. Si `glosa` no está en el type, agregarlo:

```typescript
// En src/store/Webpay/type.ts — si hace falta:
export interface webpayInput {
  shoppingCartId: string;
  glosa?: string;
  token?: string;
}
```

- [ ] **Step 4: Reemplazar onClick del botón "Pagar con Webpay" en el formulario de Visita**

En el JSX del bloque `{state.preBookedLabel ? ( ... )}` dentro del panel Visita Técnica, encontrar el Button de pago y cambiar el `onClick`:

**Buscar:**
```typescript
onClick={() => payDirect(visitaAmount, 'Visita técnica · Instalación cargador', 'visit')}
```

**Reemplazar:**
```typescript
onClick={() => {
  const calId = state.preBookedCalendarId
  if (calId) {
    payWithReservation(visitaAmount, calId)
  } else {
    payDirect(visitaAmount, 'Visita técnica · Instalación cargador', 'visit')
  }
}}
```

Esto mantiene `payDirect` como fallback si por alguna razón no hay `calendarId` (ej. flujo edge-case sin agenda seleccionada).

- [ ] **Step 5: Verificar build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

- [ ] **Step 6: Test manual del flujo**

1. Ir a `/cotizador`, seleccionar Casa
2. En paso agenda, seleccionar día + rango horario
3. Clic "Confirmar visita · [fecha]"
4. En paso 3, abrir panel Visita Técnica (debe mostrar formulario con fecha)
5. Llenar Región, Comuna, Dirección, Email
6. Clic "Pagar $9.990 con Webpay →"
7. Verificar en la red (DevTools): se ve mutation `MakeReservationAndCart` seguida de `webpayStart`
8. Verificar redirect a Webpay

- [ ] **Step 7: Verificar persistencia en localStorage**

1. Seleccionar fecha en agenda
2. Refresh de página  
3. Ir a paso 3 → el panel Visita debe seguir mostrando la fecha seleccionada (leída de Redux persist)

Para verificar la persistencia: abrir DevTools → Application → localStorage → buscar key `persist:root` → parsear JSON → verificar que `clientForms.cotizadorCalendarId` tiene valor.

- [ ] **Step 8: Commit**

```bash
git add src/app/cotizador/CotizadorWizard.tsx src/store/Webpay/type.ts
git commit -m "feat(cotizador): crear reserva en calendario al confirmar datos del customer"
```

---

## Task 4: Leer calendarId desde Redux si el estado local no lo tiene (resilencia)

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx`

**Context:** Si el usuario refresca la página en paso 3, el estado local `preBookedCalendarId` se pierde (sólo vive en `useReducer`), pero el Redux store tiene el valor. Debemos leerlo desde Redux como fallback.

- [ ] **Step 1: Leer calendarId desde Redux en el componente**

Dentro de `CotizadorWizard()`, agregar selector:

```typescript
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

// Dentro del componente:
const persistedCalendarId = useSelector((s: RootState) => s.clientForms.cotizadorCalendarId)
const persistedDateLabel = useSelector((s: RootState) => s.clientForms.cotizadorDateLabel)
```

- [ ] **Step 2: Usar el calendarId persistido como fallback**

En la función `payWithReservation` y en el JSX del formulario de visita, usar:

```typescript
// Fuente de verdad: estado local si existe, sino Redux persist
const effectiveCalendarId = state.preBookedCalendarId ?? persistedCalendarId
const effectiveLabel = state.preBookedLabel ?? persistedDateLabel
```

Actualizar el botón de pago para usar `effectiveCalendarId`:

```typescript
onClick={() => {
  if (effectiveCalendarId) {
    payWithReservation(visitaAmount, effectiveCalendarId)
  } else {
    payDirect(visitaAmount, 'Visita técnica · Instalación cargador', 'visit')
  }
}}
```

Y en el display de la fecha seleccionada (la pill teal que muestra "📅 [label]"):

```typescript
// Buscar el bloque que muestra state.preBookedLabel y agregar fallback:
{(state.preBookedLabel ?? persistedDateLabel) && (
  <Box sx={{ p: 1.5, ... }}>
    <Typography>📅 {state.preBookedLabel ?? persistedDateLabel}</Typography>
  </Box>
)}
```

- [ ] **Step 3: Actualizar condición del panel para abrir con fecha persistida**

En el panel Visita Técnica, la condición que elige entre "info" o "form" es `state.preBookedLabel`. Agregar fallback:

```typescript
// Buscar: {state.preBookedLabel ? (
// Reemplazar:
{(state.preBookedLabel ?? persistedDateLabel) ? (
```

- [ ] **Step 4: Verificar build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

- [ ] **Step 5: Test de resilencia tras refresh**

1. Completar el flujo hasta tener fecha seleccionada y llegar al paso 3
2. Refresh de página (F5)
3. Verificar que el panel Visita muestra el formulario con la fecha (leída de Redux persist)
4. Verificar que al presionar "Pagar" se crea la reserva correctamente

- [ ] **Step 6: Commit final + push**

```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizador): leer calendarId desde Redux persist como fallback tras refresh"
git push origin feat/cotizadorv4
```

---

## Self-Review

### Spec coverage
- [x] Selección de agenda almacenada en store (Task 1 + 2)
- [x] Reserva creada al ingresar datos del customer (Task 3, Step 4)
- [x] Resilencia tras refresh de página (Task 4)
- [x] Build limpio en cada task

### Gaps identificados
- La limpieza del `cotizadorCalendarId` en Redux cuando el usuario completa el pago y llega a la página de éxito (`/cotizador/recibo-pago`) no está cubierta. Se puede agregar como mejora: en `/cotizador/recibo-pago/page.tsx`, dispatch `setAgendaSelection({ calendarId: null, ... })` al montar.
- Si `makeReservation` falla porque el slot ya fue tomado por otro usuario (race condition), el error message de AppSync debería propagarse al `webpayError`. El bloque try/catch en Task 3 Step 2 ya lo maneja.

### Type consistency
- `cotizadorCalendarId` / `cotizadorDateLabel` / `cotizadorDateKey` — consistent across Task 1, 2, 4
- `setAgendaSelection({ calendarId, dateLabel, dateKey })` — consistent
- `makeReservation({ customerId, calendarId })` — matches `calendarVisitInput` in services
- `fetchWebpayStart({ shoppingCartId, glosa })` — matches usage in Webpay/services.ts line 75

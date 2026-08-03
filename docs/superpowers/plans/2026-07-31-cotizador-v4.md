# Cotizador v4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Añadir camino de agendamiento previo al pago en el cotizador, con step opcional de calendario entre Tipo y Cargador, manteniendo todos los flujos de v3 intactos.

**Architecture:** Un único archivo modificado (`CotizadorWizard.tsx`, ~3310 líneas). Se añade estado `path` (agendar|cotizar|null), `preBookedDate/Label/CalendarId`, un nuevo renderStep1() para el calendario, y se renumeran los steps existentes de 0/1/2 a 0/1/2/3. Se reutiliza `/api/schedules` que ya existe.

**Tech Stack:** Next.js 15, React 19, MUI v7, TypeScript — sin nuevas dependencias.

---

## Spec de referencia

`docs/spec-cotizadorv4.md` — leer antes de empezar.

**Archivo a modificar:** `src/app/cotizador/CotizadorWizard.tsx`

---

### Task 1: Añadir nuevos campos al tipo `WizardState` y valor inicial

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx:113-174` (WizardState interface)
- Modify: `src/app/cotizador/CotizadorWizard.tsx:390-438` (useState initial value)

- [ ] **Step 1: Localizar la interface `WizardState`** (línea ~113)

Buscar: `interface WizardState {`

- [ ] **Step 2: Añadir los nuevos campos al final de la interface**

Dentro de `WizardState`, después de `removedChargerId: string | null`, añadir:
```typescript
  path: 'agendar' | 'cotizar' | null
  preBookedDate: string | null      // dateKey ISO '2026-08-05'
  preBookedLabel: string | null     // 'mié. 5 ago.'
  preBookedCalendarId: string | null
```

- [ ] **Step 3: Añadir los valores iniciales en el useState (línea ~390)**

En el objeto pasado a `useState<WizardState>({...})`, después de `removedChargerId: null,`, añadir:
```typescript
    path: null,
    preBookedDate: null,
    preBookedLabel: null,
    preBookedCalendarId: null,
```

- [ ] **Step 4: Verificar TypeScript**
```bash
cd /Users/manu/_CODE/ENERGICA/_CODE/EMA/public_site_ema && npx tsc --noEmit 2>&1 | head -30
```
Expected: sin errores nuevos relacionados con `WizardState`.

- [ ] **Step 5: Commit**
```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizadorv4): add path + preBooked fields to WizardState"
```

---

### Task 2: Actualizar `resetAll()` — reset parcial

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx:1078-1129` (función resetAll)

- [ ] **Step 1: Localizar `function resetAll()`** (línea ~1078)

- [ ] **Step 2: Reemplazar el cuerpo de resetAll con reset parcial**

```typescript
function resetAll() {
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  // ponytail: partial reset — conserva ubicación/distancia/pisos (UX spec v4)
  setState(prev => ({
    step: 0,
    tipo: prev.tipo,
    address: '',
    addressValidated: false,
    addressCity: '',
    addressState: '',
    addressZipCode: '',
    addressLat: '',
    addressLng: '',
    editingAddr: true,
    regionWarn: false,
    tipoC: null,
    chargerId: null,
    dist: prev.dist,
    activePanel: null,
    visitaTelefono: '',
    depto: '',
    emailPago: '',
    nombreEmail: '',
    emailSolo: '',
    emailSent: false,
    electrolineraSubmitted: false,
    emailSending: false,
    emailError: '',
    paid: false,
    selectedDate: null,
    booked: false,
    estimateLoading: false,
    apiResult: null,
    formId: null,
    nextVisitDate: null,
    webpayLoading: false,
    webpayError: '',
    webpayData: null,
    customerSaving: false,
    customerSaved: false,
    selectedReserveOption: null,
    reservePendingAmount: null,
    reservePendingGlosa: '',
    showEdificioData: false,
    edificioFloor: prev.edificioFloor,
    edificioParkingFloor: prev.edificioParkingFloor,
    edificioVisitorParking: prev.edificioVisitorParking,
    edificioRol: '',
    edificioUsersEV: '',
    edificioOption: null,
    removedChargerId: null,
    path: null,
    preBookedDate: null,
    preBookedLabel: null,
    preBookedCalendarId: null,
  }))
}
```

- [ ] **Step 3: Build check**
```bash
cd /Users/manu/_CODE/ENERGICA/_CODE/EMA/public_site_ema && npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 4: Commit**
```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizadorv4): partial reset — preserves tipo, dist, edificio floors"
```

---

### Task 3: Actualizar `STEP_TITLES`, `STEP_SUBTITLES` y `WizardStepper` para 4 pasos

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx:372-386` (STEP_TITLES/SUBTITLES)
- Modify: `src/app/cotizador/CotizadorWizard.tsx:217-268` (WizardStepper)

- [ ] **Step 1: Actualizar `STEP_TITLES` y `STEP_SUBTITLES`**

Localizar `const STEP_TITLES = [` (~línea 372). Reemplazar con:

```typescript
const STEP_TITLES = [
  'Cotiza tu instalación',        // step 0: Tipo
  'Agenda tu visita técnica',     // step 1: Agenda [NUEVO]
  'Elige tu cargador eléctrico',  // step 2: Cargador
  'Tu cotización al instante',    // step 3: Cotización
  'Agenda tu visita técnica',     // step 4: post-pago
  '¡Todo listo!',                 // step 5: booked
]

const STEP_SUBTITLES = [
  'Instalación certificada SEC · Precios claros · Sin sorpresas',
  'Elige una fecha disponible para la visita técnica',
  'Selecciona el equipo que mejor se adapta a tus necesidades',
  'Precio real basado en tu perfil',
  'Coordina la visita técnica a tu domicilio',
  'Nuestro equipo coordinará contigo los detalles finales',
]
```

- [ ] **Step 2: Actualizar `WizardStepper` — 4 labels con "omitido"**

Localizar `function WizardStepper` (~línea 217). Reemplazar la función completa:

```typescript
interface StepperProps {
  step: number
  paid: boolean
  booked: boolean
  path: 'agendar' | 'cotizar' | null
}

function WizardStepper({ step, paid, booked, path }: StepperProps) {
  const preLabels = ['Tipo', 'Agenda', 'Cargador', 'Cotización']
  const postLabels = ['Pago', 'Agendar', '¡Listo!']

  const labels = paid ? postLabels : preLabels
  // path='cotizar' skips step 1: 0→2→3 — show index as if step 1 exists
  const displayStep = paid
    ? booked ? 2 : step - 4
    : path === 'cotizar' && step >= 2
      ? step     // step 2 = Cargador (idx 2), step 3 = Cotización (idx 3)
      : step

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, mt: 1 }}>
      {labels.map((label, idx) => {
        const isSkipped = !paid && label === 'Agenda' && path === 'cotizar' && step >= 2
        const isCompleted = idx < displayStep && !isSkipped
        const isActive = idx === displayStep && !isSkipped
        return (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
            {idx > 0 && (
              <Box sx={{
                width: { xs: 16, sm: 28 },
                height: 2,
                bgcolor: isCompleted ? TEAL : 'rgba(0,0,0,0.2)',
                transition: 'background-color 0.3s',
              }} />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25 }}>
              <Box sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isSkipped ? 'transparent' : isCompleted ? 'transparent' : isActive ? PINK : 'transparent',
                border: isSkipped ? '1px solid #e2e8f0' : isCompleted ? '1px solid #cccccc' : isActive ? 'none' : '2px solid rgba(0,0,0,0.3)',
                transition: 'all 0.3s',
                opacity: isSkipped ? 0.45 : 1,
              }}>
                {isCompleted ? (
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>✓</Typography>
                ) : (
                  <Typography sx={{ color: isActive ? '#fff' : 'rgba(0,0,0,0.5)', fontSize: '0.7rem', fontWeight: 700 }}>
                    {idx + 1}
                  </Typography>
                )}
              </Box>
              <Typography sx={{ fontSize: '0.58rem', fontWeight: isActive ? 700 : 400, color: isSkipped ? '#cbd5e1' : isActive ? '#000' : 'rgba(0,0,0,0.55)', whiteSpace: 'nowrap' }}>
                {label}
              </Typography>
              {isSkipped && (
                <Typography sx={{ fontSize: '0.5rem', color: '#94A3B8', lineHeight: 1 }}>
                  omitido
                </Typography>
              )}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
```

- [ ] **Step 3: Actualizar la llamada a WizardStepper para pasar `path`**

Buscar `<WizardStepper step={state.step}` en el JSX y añadir `path={state.path}`:
```tsx
<WizardStepper step={state.step} paid={state.paid} booked={state.booked} path={state.path} />
```

- [ ] **Step 4: Actualizar `heroTitle` y `heroSubtitle`**

Los arrays ya tienen el índice correcto (ahora con 6 entradas), verificar que las expresiones `STEP_TITLES[state.step]` funcionen para steps 0-3:
```typescript
const heroTitle = state.booked
  ? '¡Visita agendada!'
  : state.paid
  ? STEP_TITLES[state.step] ?? '¡Todo confirmado!'
  : STEP_TITLES[state.step] ?? 'Cotiza tu instalación'
```
Sin cambios — funciona con el nuevo array.

- [ ] **Step 5: Build check**
```bash
cd /Users/manu/_CODE/ENERGICA/_CODE/EMA/public_site_ema && npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 6: Commit**
```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizadorv4): 4-step stepper with agenda label + omitido state"
```

---

### Task 4: Actualizar `canNext`, `canNextTooltip` y `goNext()` para nuevo routing

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx:488-613` (canNext, canNextTooltip, goNext)

- [ ] **Step 1: Actualizar `canNext`**

Localizar `const canNext = (() => {` (~línea 489). Reemplazar:

```typescript
const canNext = (() => {
  if (state.step === 0) return state.tipo !== null
  if (state.step === 1 && state.path === 'agendar') return true // agenda step: date optional (can skip)
  if (state.step === 2 || (state.step === 1 && state.path === 'cotizar')) {
    // cargador step
    if (!state.tipoC) return false
    if (state.tipo === 'edificio') return state.edificioFloor.trim() !== '' && state.edificioParkingFloor !== ''
    return true
  }
  return true
})()
```

- [ ] **Step 2: Actualizar `canNextTooltip`**

Localizar `const canNextTooltip = (() => {` (~línea 499). Reemplazar:

```typescript
const canNextTooltip = (() => {
  const isCargadorStep = state.step === 2 || (state.step === 1 && state.path === 'cotizar')
  if (!isCargadorStep || canNext) return ''
  if (state.tipo === 'edificio') {
    const missing = []
    if (!state.edificioFloor.trim()) missing.push('piso del departamento')
    if (!state.edificioParkingFloor) missing.push('piso del estacionamiento')
    return `Completa: ${missing.join(' y ')}`
  }
  return 'Selecciona el tipo de cargador para continuar'
})()
```

- [ ] **Step 3: Actualizar `goNext()` — nuevo routing**

Localizar `async function goNext()` (~línea 527). Reemplazar la función completa:

```typescript
async function goNext() {
  const isCargadorStep = state.step === 2 || (state.step === 1 && state.path === 'cotizar')
  
  // Agenda step → Cargador (step 2)
  if (state.step === 1 && state.path === 'agendar') {
    trackUnique('step_2_loaded', { step: 2, typeOfResidence })
    update({ step: 2 })
    return
  }

  // Cargador step → call API → Cotización (step 3)
  if (isCargadorStep) {
    update({ estimateLoading: true })
    try {
      const isWallbox = state.tipoC === 'wallbox'
      const isPortable = state.tipoC === 'portable'
      const isHouse = state.tipo === 'casa'
      const charger = state.chargerId !== 'own' ? chargerList.find(c => c.id === state.chargerId) : null

      const res = await fetch('/api/cotizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isHouse,
          isPortable,
          isWallbox,
          distance: state.dist,
          numberOfChargers: 1,
          ...(state.formId ? { existingFormId: state.formId } : {}),
          ...(state.tipo === 'edificio' ? {
            apartmentFloor: state.edificioFloor || undefined,
            parkingLevel: mapParkingLevel(state.edificioParkingFloor),
            hasVisitorParking: state.edificioVisitorParking ?? undefined,
          } : {}),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const { formId, estimates } = data as { formId: string; estimates: any[] }

        const targetPotence = isWallbox ? 7 : 2.2
        const est = estimates.find((e: any) => Number(e.chargerPotence) === targetPotence) ?? estimates[0]

        if (est) {
          const chargerPrice = charger ? Math.round(charger.precio / 1.19) : 0
          const chargerGrossPrice = charger ? charger.precio : 0
          const chargerName = state.chargerId === 'own' ? 'Ya tiene cargador' : (charger?.name ?? '')
          const secTramite = Number(est.SECCost ?? (isHouse ? INSTALL_BASE.casa.sec : INSTALL_BASE.edificio.sec))
          const installNeto = Number(est.netPrice ?? 0)
          const totalNeto = installNeto + chargerPrice
          const totalIva = Math.round(totalNeto * 0.19)
          const apiMat = Number(est.materialsCost ?? 0)
          const apiInst = Number(est.installationCost ?? 0)
          const installGross = Math.round((apiMat + apiInst) * 1.19)
          setTrackerIdentity({ formId })
          trackUnique('step_3_loaded', { formId, total: totalNeto + totalIva, typeOfResidence })
          update({
            estimateLoading: false,
            step: 3,
            formId,
            nextVisitDate: (data as any).nextAvailableDate ?? null,
            apiResult: {
              mat: apiMat,
              inst: apiInst,
              sec: secTramite,
              chargerPrice,
              chargerName,
              neto: totalNeto,
              iva: totalIva,
              total: totalNeto + totalIva,
              isOwn: state.chargerId === 'own',
              chargerGrossPrice,
              installGross,
            },
          })
          return
        }
      } else {
        const err = await res.json().catch(() => ({}))
        console.error('[cotizador] /api/cotizar error:', err)
      }
    } catch (err) {
      console.error('[cotizador] fetch /api/cotizar failed, falling back to local calc:', err)
    }
    trackUnique('step_3_loaded', { formId: state.formId, total: result?.total, typeOfResidence })
    update({ estimateLoading: false, step: 3 })
    return
  }

  // Default: advance
  if (state.step < 3) {
    trackUnique('step_2_loaded', { step: state.step + 2, typeOfResidence })
    update({ step: state.step + 1 })
  }
}
```

- [ ] **Step 4: Actualizar `goBack()`**

Localizar `function goBack()` (~línea 615). Reemplazar:

```typescript
function goBack() {
  if (state.step > 0) {
    // When on cargador step (step 2 with path='agendar' → go back to agenda step 1)
    // When on cargador step (step 1 with path='cotizar' → go back to tipo step 0)
    update({ step: state.step - 1, activePanel: null })
  }
}
```
(Sin cambio lógico real — el step decrement funciona igual ya que path='cotizar' empieza en step 2 para cargador, y goBack va a step 1, pero step 1 con path='cotizar' no se renderiza. Necesitamos saltar a step 0 en ese caso.)

Reemplazar con:

```typescript
function goBack() {
  if (state.step === 0) return
  if (state.step === 2 && state.path === 'cotizar') {
    // Cargador step with direct path → back to tipo (skip agenda step 1)
    update({ step: 0, activePanel: null })
    return
  }
  update({ step: state.step - 1, activePanel: null })
}
```

- [ ] **Step 5: Build check**
```bash
cd /Users/manu/_CODE/ENERGICA/_CODE/EMA/public_site_ema && npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 6: Commit**
```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizadorv4): update canNext, goNext, goBack for 4-step routing"
```

---

### Task 5: Actualizar `renderStep0()` — dos CTAs

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx:1132-1166` (renderStep0)

- [ ] **Step 1: Localizar `function renderStep0()`** (~línea 1132)

- [ ] **Step 2: Reemplazar la función con los dos CTAs**

La función actualmente termina justo antes de los botones "Siguiente" (los botones están en el JSX principal, no dentro de renderStep0). Los CTAs de step 0 están en el cuerpo principal del wizard.

Buscar en el JSX principal (alrededor de línea 3100+) donde se renderiza el botón "Siguiente →" para step 0. Añadir los dos CTAs:

En el JSX principal, encontrar el bloque que renderiza los navigation buttons. Para step 0 específicamente, reemplazar el botón único "Siguiente →" con:

```tsx
{state.step === 0 && (
  <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
    <Tooltip title={!state.tipo ? 'Selecciona dónde instalarás tu cargador' : ''} arrow>
      <span style={{ width: '100%' }}>
        <Button
          fullWidth
          variant="contained"
          disabled={!state.tipo}
          onClick={() => {
            track('agenda_path_selected', { tipo: state.tipo })
            update({ path: 'agendar', step: 1 })
          }}
          sx={{
            bgcolor: PINK, '&:hover': { bgcolor: PINK_DARK },
            '&:disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
            fontWeight: 700, py: 1.5, fontSize: '0.95rem',
            boxShadow: 'none', borderRadius: 2,
          }}
        >
          📅 Agenda visita y cotizar
        </Button>
      </span>
    </Tooltip>
    <Tooltip title={!state.tipo ? 'Selecciona dónde instalarás tu cargador' : ''} arrow>
      <span style={{ width: '100%' }}>
        <Button
          fullWidth
          variant="outlined"
          disabled={!state.tipo}
          onClick={() => {
            track('direct_path_selected', { tipo: state.tipo })
            update({ path: 'cotizar', step: 2 })
          }}
          sx={{
            borderColor: TEAL, color: TEAL,
            '&:hover': { borderColor: TEAL, bgcolor: 'rgba(8,152,185,0.04)' },
            '&:disabled': { borderColor: '#e0e0e0', color: '#aaa' },
            fontWeight: 600, py: 1.25, fontSize: '0.9rem',
            boxShadow: 'none', borderRadius: 2,
          }}
        >
          Solo quiero la cotización →
        </Button>
      </span>
    </Tooltip>
    {state.tipo && (
      <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, textAlign: 'center', mt: 0.5 }}>
        Puedes ver la disponibilidad y reservar tu horario ahora, o revisar tu precio primero y agendar después.
      </Typography>
    )}
  </Box>
)}
```

Nota: El botón único "Siguiente →" que existía para step 0 debe ser ELIMINADO del JSX principal para ese step específico, y reemplazado por estos dos botones.

- [ ] **Step 3: Build check y prueba visual**
```bash
cd /Users/manu/_CODE/ENERGICA/_CODE/EMA/public_site_ema && npm run dev
```
Verificar en http://localhost:3000/cotizador: aparecen los dos CTAs en step 0.

- [ ] **Step 4: Commit**
```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizadorv4): dual CTAs on step 0 — agenda vs direct path"
```

---

### Task 6: Añadir `renderStep1Agenda()` — el nuevo step de calendario

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx` (añadir nueva función antes de renderStep1)

Esta es la pieza central de v4. El calendario usa `/api/schedules` igual que `AgendaClient.tsx`.

- [ ] **Step 1: Añadir estado local para el calendario dentro del wizard**

El estado de fechas del calendario de agenda debe vivir en el state global (para preservarse si el usuario navega atrás). Añadir a `WizardState`:
```typescript
agendaDates: Array<{ dateKey: string; label: string; available: boolean; calendarId: string | null }> | null
agendaDatesLoading: boolean
agendaSelectedIndex: number | null
```

Y en el `useState` inicial:
```typescript
agendaDates: null,
agendaDatesLoading: false,
agendaSelectedIndex: null,
```

- [ ] **Step 2: Añadir `useEffect` para cargar fechas cuando step=1 y path='agendar'**

Dentro del componente `CotizadorWizard`, después de los efectos existentes, añadir:

```typescript
// Load agenda dates when entering step 1 (agenda path)
useEffect(() => {
  if (state.step !== 1 || state.path !== 'agendar') return
  if (state.agendaDates !== null) return // already loaded
  update({ agendaDatesLoading: true })
  
  const startDate = new Date()
  startDate.setDate(startDate.getDate() + 2)
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 16)
  endDate.setHours(23, 59, 59, 999)
  
  fetch(`/api/schedules?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
    .then(r => r.json())
    .then(({ items }) => {
      const slotsByDay = new Map<string, string>()
      for (const slot of (items ?? []) as Array<{ startDate: string; calendarId: string }>) {
        const key = slot.startDate.slice(0, 10)
        if (!slotsByDay.has(key)) slotsByDay.set(key, slot.calendarId)
      }
      const dates: Array<{ dateKey: string; label: string; available: boolean; calendarId: string | null }> = []
      const cursor = new Date(startDate)
      while (cursor <= endDate) {
        if (cursor.getDay() !== 0) {
          const key = cursor.toISOString().slice(0, 10)
          const calId = slotsByDay.get(key) ?? null
          dates.push({
            dateKey: key,
            label: cursor.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' }),
            available: calId !== null,
            calendarId: calId,
          })
        }
        cursor.setDate(cursor.getDate() + 1)
      }
      update({ agendaDates: dates, agendaDatesLoading: false })
    })
    .catch(() => update({ agendaDates: [], agendaDatesLoading: false }))
}, [state.step, state.path])
```

- [ ] **Step 3: Escribir `function renderStep1Agenda()`**

Añadir esta función antes de `renderStep1()` (cargador):

```typescript
function renderStep1Agenda() {
  const dates = state.agendaDates ?? []
  const selectedIdx = state.agendaSelectedIndex
  
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#2A3547' }}>
        Elige una fecha disponible
      </Typography>
      <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, mb: 3, lineHeight: 1.6 }}>
        Horario hábil 09:00 a 18:00 hrs · se confirma tras reservar.
      </Typography>

      {state.agendaDatesLoading ? (
        <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, textAlign: 'center', py: 4 }}>
          Cargando fechas disponibles…
        </Typography>
      ) : dates.length === 0 ? (
        <Box sx={{ p: 2, bgcolor: SURFACE, borderRadius: 2, mb: 3, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>
            No hay fechas disponibles en este momento.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 3 }}>
          {dates.map((d, i) => (
            <Box
              key={d.dateKey}
              onClick={d.available ? () => {
                track('pre_booking_date_selected', { date: d.dateKey })
                update({ agendaSelectedIndex: i })
              } : undefined}
              sx={{
                p: '10px 14px', borderRadius: 2,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: `1.5px solid ${selectedIdx === i ? PINK : d.available ? BORDER : 'transparent'}`,
                bgcolor: selectedIdx === i ? 'rgba(232,26,104,0.04)' : d.available ? '#fff' : SURFACE,
                cursor: d.available ? 'pointer' : 'default',
                opacity: d.available ? 1 : 0.45,
                transition: 'all 0.15s',
              }}
            >
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: '#2A3547', textTransform: 'capitalize' }}>
                {d.label}
              </Typography>
              {d.available ? (
                <Chip
                  label={selectedIdx === i ? 'Seleccionado' : 'Disponible'}
                  size="small"
                  sx={{
                    fontSize: '0.65rem', fontWeight: 600, height: 20,
                    bgcolor: selectedIdx === i ? 'rgba(232,26,104,0.08)' : '#EBF7F9',
                    color: selectedIdx === i ? PINK : TEAL,
                  }}
                />
              ) : (
                <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED }}>No disponible</Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Skip option */}
      <Button
        fullWidth
        variant="text"
        onClick={() => {
          track('pre_booking_skipped')
          update({ agendaSelectedIndex: null, step: 2 })
        }}
        sx={{ color: TEXT_MUTED, fontSize: '0.82rem', mt: 1, '&:hover': { color: '#2A3547' } }}
      >
        Prefiero elegir la fecha después →
      </Button>
    </Box>
  )
}
```

- [ ] **Step 4: Añadir la confirmación de fecha al botón "Siguiente" del step 1**

El botón "Siguiente" para step 1 (agenda) debe:
- Estar deshabilitado si `agendaSelectedIndex === null && !agendaDatesLoading` (permite avanzar incluso sin fecha usando el botón skip de abajo)
- Al hacer clic, guardar `preBookedDate`, `preBookedLabel`, `preBookedCalendarId` del slot seleccionado

En el JSX principal donde se muestran los botones de navegación para step 1 con path='agendar':

```tsx
{state.step === 1 && state.path === 'agendar' && (
  <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
    <Tooltip
      title={state.agendaSelectedIndex === null ? 'Selecciona una fecha para continuar' : ''}
      arrow
    >
      <span style={{ width: '100%' }}>
        <Button
          fullWidth
          variant="contained"
          disabled={state.agendaSelectedIndex === null || state.agendaDatesLoading}
          onClick={() => {
            const selected = (state.agendaDates ?? [])[state.agendaSelectedIndex!]
            if (!selected) return
            track('pre_booking_confirmed', { date: selected.dateKey })
            update({
              preBookedDate: selected.dateKey,
              preBookedLabel: selected.label,
              preBookedCalendarId: selected.calendarId,
              step: 2,
            })
          }}
          sx={{
            bgcolor: PINK, '&:hover': { bgcolor: PINK_DARK },
            '&:disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
            fontWeight: 700, py: 1.5, fontSize: '0.95rem',
            boxShadow: 'none', borderRadius: 2,
          }}
        >
          {state.agendaSelectedIndex !== null
            ? `Confirmar fecha · ${(state.agendaDates ?? [])[state.agendaSelectedIndex]?.label}`
            : 'Confirmar fecha →'}
        </Button>
      </span>
    </Tooltip>
  </Box>
)}
```

- [ ] **Step 5: Conectar `renderStep1Agenda()` al render principal**

En el JSX principal (switch de steps), añadir la condición:
```tsx
{state.step === 1 && state.path === 'agendar' && renderStep1Agenda()}
{(state.step === 2 || (state.step === 1 && state.path === 'cotizar')) && renderStep1()}
```
(Nota: `renderStep1()` es el Cargador — no cambia su nombre, solo se accede desde step 1 o step 2 según el path.)

- [ ] **Step 6: Build check y prueba**
```bash
cd /Users/manu/_CODE/ENERGICA/_CODE/EMA/public_site_ema && npx tsc --noEmit 2>&1 | head -30
```
```bash
npm run dev
```
Verificar: Tipo → "Agenda visita y cotizar" → aparece calendario con fechas.

- [ ] **Step 7: Commit**
```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizadorv4): add agenda calendar step 1 with /api/schedules"
```

---

### Task 7: Añadir banner verde y loop tardío en Cotización (step 3)

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx` — funciones `renderStep2()` (casa) y el bloque ALT Visita Técnica

- [ ] **Step 1: Añadir banner verde en cotización casa**

En `renderStep2()` (la función que renderiza la cotización para Casa — actualmente renderiza el hero de precio), buscar el bloque de encabezado "Tu cotización personalizada" y añadir el banner verde ANTES del hero de precio:

```tsx
{/* Banner verde — solo si hay fecha pre-agendada */}
{state.preBookedLabel && (
  <Box sx={{
    bgcolor: '#f0fdf4', border: '1px solid #bbf7d0',
    borderRadius: 2, p: 1.5, mb: 2,
    display: 'flex', alignItems: 'center', gap: 1,
  }}>
    <Typography sx={{ fontSize: '0.9rem' }}>📅</Typography>
    <Typography sx={{ fontSize: '0.82rem', color: '#166534', fontWeight: 600 }}>
      Horario elegido: {state.preBookedLabel} · horario hábil 09:00 a 18:00 — se bloquea al pagar
    </Typography>
  </Box>
)}
```

- [ ] **Step 2: Actualizar CTA del ALT Visita Técnica según si hay fecha**

Buscar el botón `"Pagar visita $9.990 →"` en la sección de ALT Visita Técnica de renderStep2 Casa. Añadir condición:

**Sin fecha (`preBookedLabel === null`):**
```tsx
<Button
  fullWidth
  variant="contained"
  onClick={() => {
    if (state.activePanel !== 'visitaPago') {
      // Late booking loop: go to agenda step
      if (!state.preBookedLabel) {
        track('late_booking_loop', { step: 3 })
        update({ path: 'agendar', step: 1, agendaDates: null })
        return
      }
      trackUnique('cta_visita_casa', { step: 3, typeOfResidence })
    }
    update({ activePanel: state.activePanel === 'visitaPago' ? null : 'visitaPago' })
  }}
  ...
>
  {state.preBookedLabel ? 'Confirmar y pagar visita $9.990 →' : 'Agendar y pagar visita $9.990 →'}
</Button>
```

La lógica: si no hay fecha → al hacer clic, navega a step 1 (agenda) en lugar de abrir el panel de pago. Si ya hay fecha → abre el panel de pago directamente.

- [ ] **Step 3: Build check**
```bash
cd /Users/manu/_CODE/ENERGICA/_CODE/EMA/public_site_ema && npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 4: Prueba del loop tardío**

Con `npm run dev` en http://localhost:3000/cotizador:
1. Elegir Casa → "Solo quiero la cotización" → Cargador → Ver mi cotización
2. En Cotización, hacer clic en "Agendar y pagar visita $9.990 →"
3. Verificar que vuelve a step 1 (calendario)
4. Seleccionar fecha → "Confirmar fecha"
5. Verificar que vuelve a step 3 con banner verde

- [ ] **Step 5: Commit**
```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizadorv4): green banner + late booking loop in cotización step"
```

---

### Task 8: Actualizar tracking events y fix step numbers en eventos existentes

**Files:**
- Modify: `src/app/cotizador/CotizadorWizard.tsx` — llamadas a `track` y `trackUnique`

- [ ] **Step 1: Revisar y actualizar números de step en tracking existente**

Buscar todos los `trackUnique('step_2_loaded'` y `trackUnique('step_3_loaded'` y verificar que los números son correctos con el nuevo schema (step 2 = Cargador, step 3 = Cotización).

Los eventos de tracking usan números semánticos (1/2/3 = Tipo/Cargador/Cotización), no los step internos del wizard. Verificar que en `goNext()` los eventos usen:
- step_1_loaded: al montar (useEffect inicial) — sin cambio
- step_2_loaded: al entrar a Cargador — verificar que se dispara desde path='cotizar' step 2 y path='agendar' step 2
- step_3_loaded: al entrar a Cotización — step 3 en ambos paths

- [ ] **Step 2: Añadir nuevos eventos de tracking**

Verificar que estos eventos ya están en el código (fueron añadidos en tasks anteriores):
- `agenda_path_selected` ✓ (Task 5)
- `direct_path_selected` ✓ (Task 5)
- `pre_booking_date_selected` ✓ (Task 6)
- `pre_booking_skipped` ✓ (Task 6)
- `pre_booking_confirmed` ✓ (Task 6)
- `late_booking_loop` ✓ (Task 7)

- [ ] **Step 3: Build check final**
```bash
cd /Users/manu/_CODE/ENERGICA/_CODE/EMA/public_site_ema && npx tsc --noEmit 2>&1 | head -30
```
Expected: 0 errors.

- [ ] **Step 4: Production build**
```bash
npm run build 2>&1 | tail -20
```
Expected: build exitoso, 0 errores.

- [ ] **Step 5: Commit**
```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizadorv4): fix step tracking numbers + new path analytics events"
```

---

### Task 9: QA end-to-end — verificar los 6 flujos

**Con `npm run dev` en http://localhost:3000/cotizador:**

- [ ] **F1 — Casa · agenda primero · paga visita:**
  1. Tipo: Casa
  2. CTA: "📅 Agenda visita y cotizar"
  3. Stepper muestra: `Tipo ✓ | Agenda (activo) | Cargador | Cotización`
  4. Seleccionar fecha disponible → "Confirmar fecha · {label}"
  5. Cargador: Wallbox + modelo + distancia 10m → "Ver mi cotización"
  6. Cotización: banner verde visible con fecha
  7. ALT Visita: botón dice "Confirmar y pagar visita $9.990 →" (no "Agendar")
  8. Formulario de pago se abre al clic

- [ ] **F2 — Casa · directo · loop tardío:**
  1. Tipo: Casa
  2. CTA: "Solo quiero la cotización →"
  3. Stepper muestra: `Tipo ✓ | Agenda (omitido) | Cargador (activo) | Cotización`
  4. Cargador → cotización
  5. ALT Visita: "Agendar y pagar visita $9.990 →" → navega a step 1 (Agenda)
  6. Seleccionar fecha → confirmar → vuelve a Cotización con banner verde
  7. Botón ahora dice "Confirmar y pagar visita $9.990 →"

- [ ] **F3 — Casa · directo · paga hoy (sin agenda):**
  1. Tipo: Casa → "Solo quiero la cotización"
  2. Cargador → Cotización
  3. ALT Pagar hoy: funciona igual que v3

- [ ] **F4 — Edificio · agenda primero:**
  1. Tipo: Edificio → "Agenda visita y cotizar"
  2. Calendario → fecha → "Confirmar fecha"
  3. Cargador (con pisos) → Cotización edificio
  4. Sin cambios en edificio (rango + kit + electrolinera)

- [ ] **F5 — Reset parcial:**
  1. Completar hasta cotización
  2. Hacer clic "← Nueva simulación"
  3. Verificar: step 0 activo, tipo conservado, distancia conservada, path=null (dos CTAs de nuevo)
  4. Verificar: email, nombre, formId, apiResult limpiados

- [ ] **F6 — "Atrás" en step Cargador:**
  1. Path='agendar': desde Cargador (step 2) → atrás → Agenda (step 1)
  2. Path='cotizar': desde Cargador (step 1/2) → atrás → Tipo (step 0)

- [ ] **Commit si todo pasa:**
```bash
git add src/app/cotizador/CotizadorWizard.tsx
git commit -m "feat(cotizadorv4): QA verification pass — all 6 flows working"
```

---

### Task 10: Build de producción y preparación del PR

- [ ] **Step 1: Lint**
```bash
cd /Users/manu/_CODE/ENERGICA/_CODE/EMA/public_site_ema && npm run lint 2>&1 | tail -20
```

- [ ] **Step 2: Build de producción**
```bash
npm run build 2>&1 | tail -30
```
Expected: Build exitoso. Si falla, revisar el error y corregirlo antes de continuar.

- [ ] **Step 3: Resumen de cambios**
```bash
git log --oneline feat/cotizadorv4 ^main
```
Debería mostrar los commits de todas las tasks anteriores.

- [ ] **Step 4: Listo para PR (el usuario decide cuándo push)**

Comunicar al usuario: "Build exitoso. La branch `feat/cotizadorv4` tiene todos los cambios listos. Cuando quieras hacer push y abrir el PR, dímelo."

---

## Resumen de archivos modificados

| Archivo | Líneas aprox. | Tipo de cambio |
|---------|--------------|----------------|
| `src/app/cotizador/CotizadorWizard.tsx` | ~3310 → ~3500 | Único archivo modificado |

**Sin tocar:**
- `src/app/cotizador/page.tsx`
- `src/app/cotizador/agenda/AgendaClient.tsx`
- `src/app/api/schedules/route.ts`
- `src/app/api/cotizar/route.ts`
- Cualquier otro archivo

## Invariantes de v3 que se conservan

- Precios reales vía `/api/cotizar`
- Flujo Webpay inline (mismo código)
- Panel edificio (rango, kit, electrolinera) sin cambios
- `/cotizador/agenda` post-pago sin cambios
- Todos los tracking events existentes
- Tienda de cargadores separada sin cambios

# Wizards (Flujos Multi-Paso)

El sitio tiene dos flujos principales de wizard que guían al usuario paso a paso.

## Cotizador Solar (`/cotizador`)

**Componentes**: `src/app/components/CotizadorWizard/`
**Store**: `src/store/ClientForms/` (persistido) + `src/store/Estimate/`

### Flujo

```
Paso 0: Tipo de cargador / edificio
Paso 1: Distancia / características del inmueble
Paso 2: Datos de contacto del cliente
Paso 3: Resultado — estimado de instalación
```

El paso 3 usa una ruta separada: `/cotizador/simulacion`

### Control de Estado

```typescript
const { currentStep, currentForm } = useAppSelector(selectClientForms);
dispatch(increment());   // avanzar
dispatch(decrement());   // retroceder
dispatch(setStep(0));    // ir a paso específico
dispatch(setDataForm(data)); // guardar datos del formulario
```

Los datos del formulario se persisten en localStorage para sobrevivir recargas.

---

## Agendamiento de Visita Técnica (`/agenda`)

**Componentes**: `src/app/components/AgendaWizard/`
**Store**: `src/store/CalendarVisits/` + `src/store/ShoppingCart/` (persistido)

### Flujo

```
Paso 0: Selección de fecha y hora disponible (BookingCalendar)
Paso 1: Datos del cliente
Paso 2: Resumen y pago (→ redirect a WebPay)
Paso 3: Confirmación (después del retorno de WebPay)
```

### Control de Estado

```typescript
const { currentStep } = useAppSelector(selectCalendarVisits);
```

### Integración con Google Calendar

Las visitas confirmadas se sincronizan con Google Calendar mediante Lambda resolvers en el backend de Amplify.

---

## Wizard Genérico (`src/store/Wizard/slice.ts`)

Slice minimalista para wizards secundarios:

```typescript
export const { setStep, setCurrentStep } = wizardSlice.actions;
export const selectWizard = (state: RootState) => state.wizard;
```

Persistido en localStorage.

---

## Patrón Compartido

Todos los wizards comparten el mismo patrón visual con el componente `Steps` que muestra la barra de progreso:
- `<QuoterSteps />` — pasos del cotizador
- `<CalendarSteps />` — pasos del agendamiento

El header del paso 3 se oculta (`currentStep !== 3`) para dar una experiencia de pantalla completa en la pantalla de resultado/confirmación.

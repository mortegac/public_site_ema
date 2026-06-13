# Propuesta Técnica: Gaps y Cambios Necesarios — Módulo Cotizador

**Versión**: 1.0  
**Fecha**: 2026-06-12  
**Relacionado con**: `espec-cotizador.md`

---

## Resumen Ejecutivo

Este documento identifica las brechas (gaps) entre la especificación funcional del módulo cotizador y el estado actual del código, y propone los cambios necesarios en backend y frontend para cumplir con todos los flujos requeridos.

---

## 1. Gaps Identificados

### GAP-01: `ClientForm` no registra `estimateId`, `paymentTransactionId`, `shoppingCartId` ni `calendarVisitId`

**Severidad**: ALTA  
**Descripción**: La especificación exige que al finalizar el flujo, el `ClientForm` tenga registrados los IDs de todas las entidades relacionadas. Actualmente:

| Campo | Estado actual |
|-------|---------------|
| `customerId` | ✅ Se registra (via `/api/customer`) |
| `estimateId` | ❌ **FALTANTE** — no se vincula al `ClientForm` |
| `shoppingCartId` | ⚠️ Parcial — `ShoppingCart.formId` se actualiza, pero no `ClientForm.shoppingCartId` |
| `paymentTransactionId` | ❌ **FALTANTE** — no se vincula al `ClientForm` |
| `calendarVisitId` | ⚠️ Parcial — `CalendarVisit.formId` se actualiza, pero no `ClientForm.calendarVisitId` |

### GAP-02: El `estimateId` que debe quedar en `ClientForm` no se determina automáticamente

**Severidad**: ALTA  
**Descripción**: La especificación indica que el `estimateId` registrado en `ClientForm` siempre debe corresponder al Estimate con `chargerPotence: 7` (Wallbox 7 kW). Actualmente `ProcessEstimate` puede crear 2 estimates (7 kW y 3.5 kW para Wallbox), pero ninguno se vincula al `ClientForm`.

### GAP-03: JWT del email de comprobante no incluye `formid` de forma confiable

**Severidad**: ALTA  
**Descripción**: La generación del JWT para el botón "Reservar instalación" en el email de comprobante lee `formId` de `sessionStorage`. Si el sessionStorage está vacío o expiró, el JWT se genera sin `formid`, rompiendo la reconstrucción de contexto en `/cotizador/agenda`.

**Estado actual**: Parcialmente corregido (commit reciente agrega `cart.formId` como fallback desde el ShoppingCart). Pendiente verificar cobertura completa en ambas funciones de email.

### GAP-04: `/api/quote` no incluye `shoppingCartId` ni `paymentTransactionId` en la respuesta

**Severidad**: MEDIA  
**Descripción**: El endpoint `/api/quote` reconstruye datos de instalación pero no retorna el `shoppingCartId` ni el `paymentTransactionId`, que son necesarios para mostrar el "Total pagado" real (no el de la cotización, sino el monto efectivamente cobrado).

### GAP-05: `CalendarVisit` en el flujo `chargerInstallation` no pasa por `reserved` → pago directo

**Severidad**: MEDIA  
**Descripción**: En el flujo estándar (edificio con visita), el `CalendarVisit` pasa por `reserved → waiting → payed → payedAndAgended`. En el flujo de cargador (`chargerInstallation`), el usuario paga primero y agenda después, por lo que el `CalendarVisit` va directamente de `available → payed → payedAndAgended` al confirmar via `ConfirmChargerVisit`. Este flujo es correcto pero no está documentado en el backend y puede generar confusión operacional.

### GAP-06: El segundo `ShoppingCart` (saldo pendiente) no queda vinculado al `ClientForm`

**Severidad**: MEDIA  
**Descripción**: Cuando el usuario elige "Reserva 70%" o "Reserva 30%", se crea un segundo `ShoppingCart` con el saldo pendiente. Este segundo carrito no se vincula al `ClientForm` ni tiene `formId`, lo que dificulta rastrear el cobro pendiente.

### GAP-07: No existe validación backend de que el JWT del email sea válido (firma no verificada)

**Severidad**: BAJA (riesgo controlado)  
**Descripción**: En `/cotizador/agenda`, el JWT se decodifica sin verificar la firma HMAC. Cualquier persona que conozca el formato puede construir un JWT arbitrario. La validación real ocurre en el backend al buscar el `formId` y `customerId` en DynamoDB.

### GAP-08: `currentStep` no se actualiza a `'5'` al finalizar la agenda

**Severidad**: BAJA  
**Descripción**: Al confirmar la visita técnica, se actualiza `CalendarVisit.state` a `payedAndAgended`, pero `ClientForm.currentStep` no se actualiza a `'5'` (flujo completado).

### GAP-09: No existe reconstrucción del contexto cuando el usuario llega desde `/cotizador/pago?{JWT}` (link de cotización)

**Severidad**: MEDIA  
**Descripción**: La ruta `/cotizador/pago?{JWT}` (link de cotización enviado por email) carga datos del JWT (que incluye montos y datos de instalación). Si el cliente llega por esta ruta pero ya pagó, no hay verificación de pago previo ni redirección a la agenda.

### GAP-10: `ClientForm` no registra si el cliente seleccionó cargador propio ni qué opción de pago eligió

**Severidad**: ALTA  
**Descripción**: El modelo `ClientForm` no tiene campos para registrar:
1. **`hasCharger`** (`Boolean`) — si el cliente trajo su propio cargador (`chargerId = 'own'`) o compró uno del catálogo. Actualmente esta información solo existe en `sessionStorage` y se pierde si el cliente cambia de dispositivo o la sesión expira.
2. **`selectedPaymentOption`** (`String`) — la opción de pago elegida por el cliente. Sin este campo, es imposible saber a posteriori qué contrató el cliente (si fue reserva 70%, 30%, solo visita técnica, kit de edificio o postulación de electrolinera) sin inferirlo del `ShoppingCart.typeOfCart` y el monto, lo cual es ambiguo.

**Valores esperados de `selectedPaymentOption`**:
- `reserva-70-porc` — CASA, paga 70% hoy
- `reserva-30-porc` — CASA, paga 30% hoy _(la más elegida)_
- `visita-tecnica` — CASA, solo paga la visita ($10.000)
- `paga-visita-mas-kit-comunidad` — EDIFICIO, paga $29.000
- `postula-electrolinera-comunitaria` — EDIFICIO, postulación sin pago

---

## 2. Cambios en el Backend (ema-back)

### BACK-01: Agregar campos a `ClientForm` — FKs de entidades relacionadas + nuevos campos de negocio

**Archivo**: `amplify/data/main.schema.ts`

**Cambio**: Agregar campos opcionales al modelo `ClientForm`:

```typescript
// En el modelo ClientForm, agregar:

// FKs de entidades relacionadas
estimateId: a.id().optional(),
Estimate: a.belongsTo('Estimate', 'estimateId'),

shoppingCartId: a.id().optional(),
ShoppingCart: a.belongsTo('ShoppingCart', 'shoppingCartId'),

paymentTransactionId: a.id().optional(),
PaymentTransaction: a.belongsTo('PaymentTransaction', 'paymentTransactionId'),

calendarVisitId: a.id().optional(),
CalendarVisit_primary: a.belongsTo('CalendarVisit', 'calendarVisitId'),

// Nuevos campos de negocio (GAP-10)
hasCharger: a.boolean().optional(),
// true  = el cliente trae su propio cargador (chargerId = 'own')
// false = el cliente compra un cargador del catálogo
// null  = no aplica o no se registró

selectedPaymentOption: a.enum([
  'reserva-70-porc',
  'reserva-30-porc',
  'visita-tecnica',
  'paga-visita-mas-kit-comunidad',
  'postula-electrolinera-comunitaria',
]).optional(),
// Opción de pago elegida por el cliente en el paso 2 del wizard
```

**Impacto**: Requiere migración de DynamoDB (nuevos atributos opcionales, no breaking change).

---

### BACK-02: Actualizar `ConfirmChargerVisit` para registrar `calendarVisitId` y `shoppingCartId` en `ClientForm`

**Archivo**: `amplify/resolvers/ConfirmChargerVisit/handler.ts`

**Cambio**: Al finalizar exitosamente, actualizar `ClientForm` con los IDs:

```typescript
// Después de reserveCalendarVisit exitoso:
if (clientFormId) {
  await client.graphql({
    query: updateClientForm,
    variables: {
      input: {
        clientFormId,
        calendarVisitId: calendarId,           // NUEVO
        shoppingCartId: shoppingCartId ?? null, // NUEVO
      }
    }
  })
}
```

---

### BACK-03: Actualizar `ProcessEstimate` para vincular el Estimate 7kW al `ClientForm`

**Archivo**: `amplify/resolvers/ProcessEstimate/handler.ts`

**Cambio**: Al crear los estimates, identificar el de `chargerPotence: 7` y actualizar `ClientForm.estimateId`:

```typescript
// Al finalizar createEstimate():
const estimate7kw = estimates.find(e => e.chargerPotence === 7)
if (estimate7kw && formId) {
  await client.graphql({
    query: updateClientForm,
    variables: {
      input: {
        clientFormId: formId,
        estimateId: estimate7kw.estimateId  // NUEVO
      }
    }
  })
}
```

---

### BACK-04: Actualizar `WebpayCommit` para vincular `paymentTransactionId` al `ClientForm`

**Archivo**: `amplify/resolvers/WebpayCommit/handler.ts` (o donde se procesa el commit)

**Cambio**: Al confirmar pago `AUTHORIZED`, buscar el `ClientForm` via `ShoppingCart.formId` y actualizar:

```typescript
// Si pago AUTHORIZED y cart tiene formId:
if (cart.formId && paymentTransaction.paymentTransactionId) {
  await client.graphql({
    query: updateClientForm,
    variables: {
      input: {
        clientFormId: cart.formId,
        paymentTransactionId: paymentTransaction.paymentTransactionId  // NUEVO
      }
    }
  })
}
```

---

### BACK-05: Agregar `formId` al segundo ShoppingCart (saldo pendiente)

**Archivo**: `amplify/resolvers/WebpayStart/handler.ts` o lógica de carrito pendiente

**Cambio**: Al crear el ShoppingCart de saldo pendiente, incluir el mismo `formId` del carrito principal para trazabilidad completa.

---

### BACK-06: Agregar GSI `ClientFormsByEstimateId` y `ClientFormsByShoppingCartId`

**Archivo**: `amplify/data/main.schema.ts`

**Cambio**: Agregar índices secundarios para poder buscar un `ClientForm` por sus entidades relacionadas:

```typescript
// En ClientForm:
.secondaryIndexes((index) => [
  index('estimateId').sortKeys(['createdAt']),
  index('shoppingCartId').sortKeys(['createdAt']),
  index('paymentTransactionId').sortKeys(['createdAt']),
])
```

---

### BACK-07: Agregar mutación `updateClientFormLinks` (opcional, para uso interno)

**Propósito**: Centralizar las actualizaciones de FKs en `ClientForm` desde un único punto, evitando que cada Lambda haga su propio update.

**Input**:
```typescript
{
  clientFormId: string
  estimateId?: string
  shoppingCartId?: string
  paymentTransactionId?: string
  calendarVisitId?: string
  currentStep?: string
  hasCharger?: boolean               // NUEVO
  selectedPaymentOption?: string     // NUEVO
}
```

---

### BACK-08: Registrar `hasCharger` y `selectedPaymentOption` en `ClientForm` desde las Lambdas

**`hasCharger`** se conoce en el momento en que el usuario avanza del paso 1 al 2 (cuando se llama `/api/cotizar`). El frontend ya sabe si `chargerId === 'own'` (tiene cargador propio) o si seleccionó un cargador del catálogo.

**`selectedPaymentOption`** se conoce en el momento exacto en que el usuario hace clic en la opción de pago (antes de redirigir a Webpay). El frontend debe enviarla al backend en ese momento.

**Opción A — vía `/api/cotizar`** (solo `hasCharger`):
```typescript
// En el body del POST /api/cotizar, agregar:
hasCharger: boolean   // true si chargerId === 'own', false si seleccionó cargador del catálogo

// En la mutation updateClientForm dentro de /api/cotizar:
input: {
  clientFormId: formId,
  hasCharger: hasCharger,
}
```

**Opción B — vía `/api/payment`** (tanto `hasCharger` como `selectedPaymentOption`):
```typescript
// En el body del POST /api/payment, agregar:
hasCharger?: boolean
selectedPaymentOption?: string  // uno de los 5 valores del enum

// Antes de llamar WebpayStart, actualizar ClientForm:
if (formId && selectedPaymentOption) {
  await callAppSync(url, apiKey, UPDATE_CLIENT_FORM, {
    input: {
      clientFormId: formId,
      hasCharger: hasCharger,
      selectedPaymentOption: selectedPaymentOption,
    }
  }, 'updateClientFormPaymentOption')
}
```

> **Recomendación**: Usar Opción B para registrar ambos campos en un solo punto (el momento del pago), que es cuando el dato es definitivo. El `hasCharger` podría cambiar si el usuario retrocede y cambia su selección antes de pagar.

---

## 3. Cambios en el Frontend (public_site_ema)

### FRONT-01: Verificar que `formId` siempre se incluya en el JWT del email de comprobante

**Archivos afectados**: `src/app/return/ReturnClient.tsx`

**Estado**: PARCIALMENTE RESUELTO en commit reciente (GAP-03).

**Acción pendiente**: Verificar que las funciones `sendReceiptEmail` y `sendEdificioVisitReceiptEmail` usen `cart.formId` como fallback cuando `sessionStorage.paymentData.formId` está vacío. Confirmar con una prueba de pago que el JWT generado contenga `formid`.

**Validación**: Decodificar el JWT del botón "Reservar instalación" en el email y verificar que `formid` está presente.

---

### FRONT-02: Actualizar `/api/quote` para incluir `shoppingCartId` y `paymentTransactionId`

**Archivo**: `src/app/api/quote/route.ts`

**Cambio**: Ampliar la query `GET_CLIENT_FORM_WITH_ESTIMATES` para incluir `ShoppingCart` activo y `PaymentTransaction`:

```typescript
// En la query GraphQL:
ShoppingCarts(filter: { status: { eq: "completed" } }, limit: 1, sortDirection: DESC) {
  items {
    shoppingCartId
    total
    paymentTransactionId
    PaymentTransactions(limit: 1) {
      items {
        paymentTransactionId
        amount
        authorization_code
        buy_order
      }
    }
  }
}
```

**Cambio en la respuesta**:
```typescript
interface QuoteResponse {
  // ... campos existentes ...
  shoppingCartId?: string        // NUEVO
  paymentTransactionId?: string  // NUEVO
  paidAmount?: number           // NUEVO — monto real cobrado
  authorizationCode?: string    // NUEVO
}
```

---

### FRONT-03: Actualizar `ActiveVisitCard` para mostrar `paidAmount` real

**Archivo**: `src/app/cotizador/agenda/AgendaClient.tsx`

**Cambio**: En la sección "Resumen de tu instalación", mostrar el monto real pagado (de `ShoppingCart.total`) en lugar del total de la cotización:

```tsx
// Actualmente muestra paymentData.total (de la cotización)
// Debe mostrar el monto real del ShoppingCart si está disponible

['Total pagado', paymentData.paidAmount 
  ? ('$' + Math.round(paymentData.paidAmount).toLocaleString('es-CL'))
  : paymentData.total 
    ? ('$' + Math.round(Number(paymentData.total)).toLocaleString('es-CL')) 
    : null
]
```

---

### FRONT-04: Actualizar `ClientForm.currentStep` a `'5'` al confirmar visita

**Archivo**: `src/app/cotizador/agenda/AgendaClient.tsx`

**Cambio**: Después de un `POST /api/confirm-charger-visit` exitoso, llamar a `/api/update-step` con `step: '5'`:

```typescript
// Después de setBooked(true):
if (formId) {
  fetch('/api/update-step', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formId, step: '5' }),
  }).catch(() => null)
}
```

---

### FRONT-05: Agregar validación de pago previo en `/cotizador/pago?{JWT}`

**Archivo**: A determinar (ruta `/cotizador/pago` o un nuevo componente)

**Descripción**: Cuando el usuario llega via el link de cotización (email de estimado sin pago), verificar si ya existe un pago completado para ese `formId`. Si existe → redirigir a `/cotizador/agenda?{JWT}`.

```typescript
// Al cargar /cotizador/pago?JWT:
const jwtPayload = decodeJwtPayload(token)
if (jwtPayload?.formid) {
  const res = await fetch(`/api/active-visit?formId=${jwtPayload.formid}`)
  const { visit } = await res.json()
  if (visit) {
    // Ya tiene visita activa → redirigir a agenda
    router.push(`/cotizador/agenda?${token}`)
    return
  }
}
```

---

### FRONT-06: Mejorar robustez del fallback de `formId` en `/api/active-visit`

**Archivo**: `src/app/api/active-visit/route.ts`

**Cambio actual**: El endpoint acepta `formId` o `customerId`. Cuando se usa `customerId`, retorna la visita activa más reciente del cliente (no necesariamente la vinculada al `formId` correcto).

**Mejora propuesta**: Cuando se tiene `formId`, hacer también query por `CalendarVisitsByFormId` (GSI del backend) en paralelo con `listCalendarVisitsByCustomerId`, y priorizar el resultado de `formId`:

```typescript
// En /api/active-visit:
const [visitByForm, visitByCustomer] = await Promise.all([
  formId ? fetchVisitByFormId(formId) : null,
  customerId ? fetchVisitsByCustomer(customerId) : null,
])

const visit = visitByForm ?? visitByCustomer
```

---

### FRONT-07: Agregar pantalla de resumen de pago en `/cotizador/recibo-pago`

**Archivo**: `src/app/cotizador/recibo-pago/` (nueva página o modificación de existente)

**Descripción**: La pantalla post-pago para flujos `chargerInstallation` debe mostrar:

| Elemento | Fuente |
|----------|--------|
| Monto pagado | `sessionStorage.paymentData.total` |
| Desglose (mat, inst, sec, cargador) | `sessionStorage.paymentData` |
| Saldo pendiente (si aplica) | `sessionStorage.paymentData.pendingAmount` |
| Datos de la transacción | De retorno de Webpay (`buy_order`, `card`, `authCode`) |
| Resumen de instalación | `sessionStorage.paymentData` |
| Botón "Reservar instalación" | Link a `/cotizador/agenda?{JWT}` |

**Nota**: El JWT debe estar disponible en esta página. Actualmente el JWT solo se genera en el email. Propuesta: que `/return` también lo guarde en `sessionStorage` para usar en `/recibo-pago`.

---

### FRONT-08: Guardar JWT en sessionStorage para usarlo en `/cotizador/recibo-pago`

**Archivo**: `src/app/return/ReturnClient.tsx`

**Cambio**: Después de generar el `agendaUrl` con el JWT, guardarlo en `sessionStorage` para que la página de recibo pueda construir el botón "Reservar instalación" sin necesidad de regenerar el JWT:

```typescript
// En sendReceiptEmail o sendEdificioVisitReceiptEmail, después de generar agendaUrl:
if (agendaUrl !== 'https://www.energica.city/cotizador/agenda') {
  sessionStorage.setItem('agendaUrl', agendaUrl)
}
```

---

### FRONT-09: Enviar `hasCharger` y `selectedPaymentOption` al backend en el momento del pago

**Archivo**: `src/app/cotizador/CotizadorWizard.tsx` + `src/app/api/payment/route.ts`

**Descripción**: Cuando el usuario hace clic en una opción de pago (Reserva 70%, Reserva 30%, etc.), el wizard conoce dos datos que deben persistirse en `ClientForm`:

1. **`hasCharger`**: `state.chargerId === 'own'` → el cliente ya tiene cargador (`true`); en caso contrario eligió uno del catálogo (`false`).
2. **`selectedPaymentOption`**: el valor del enum correspondiente a la opción clickeada.

**Mapeo en `CotizadorWizard.tsx`**:
```typescript
// En la función payDirect(), antes de llamar /api/payment:
const hasCharger = state.chargerId === 'own'

// Según el tipo de pago elegido:
let selectedPaymentOption: string
if (state.tipo === 'casa') {
  if (typeOfCart === 'visit') {
    selectedPaymentOption = 'visita-tecnica'
  } else if (state.selectedReserveOption === 'r70') {
    selectedPaymentOption = 'reserva-70-porc'
  } else {
    selectedPaymentOption = 'reserva-30-porc'
  }
} else { // edificio
  selectedPaymentOption = 'paga-visita-mas-kit-comunidad'
}

// Para la postulación de electrolinera (no pasa por payDirect):
// selectedPaymentOption = 'postula-electrolinera-comunitaria'
// → Registrar via POST /api/update-client-form (nueva ruta) o agregar al body de /api/cotizar
```

**Cambio en el body de `/api/payment`**:
```typescript
// Agregar al body enviado:
{
  ...existingFields,
  hasCharger: boolean,
  selectedPaymentOption: string,
}
```

**Cambio en `src/app/api/payment/route.ts`**:
```typescript
// Leer del body:
const { hasCharger, selectedPaymentOption, ...rest } = body

// Antes de WebpayStart, si existe formId, actualizar ClientForm:
if (formId && selectedPaymentOption !== undefined) {
  await callAppSync(appsyncUrl, apiKey, UPDATE_CLIENT_FORM, {
    input: {
      clientFormId: formId,
      hasCharger: hasCharger ?? null,
      selectedPaymentOption: selectedPaymentOption,
    }
  }, 'updateClientFormPaymentOption')
}
```

**Caso especial — Electrolinera** (no pasa por `/api/payment`):
```typescript
// En CotizadorWizard.tsx, al enviar el formulario de electrolinera exitosamente:
if (state.formId) {
  fetch('/api/update-client-form', {   // nueva ruta o agregar a /api/update-step
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formId: state.formId,
      hasCharger: state.chargerId === 'own',
      selectedPaymentOption: 'postula-electrolinera-comunitaria',
    }),
  }).catch(() => null)
}
```

---

## 4. Cambios en APIs de Next.js

### API-01: Actualizar `GET /api/quote` para retornar datos del ShoppingCart y PaymentTransaction

**Archivo**: `src/app/api/quote/route.ts`

Ver FRONT-02 para detalles del cambio GraphQL y la nueva respuesta.

---

### API-02: Agregar `GET /api/quote` soporte para `shoppingCartId` como parámetro alternativo

**Descripción**: Actualmente solo acepta `formId`. Agregar soporte para consultar por `shoppingCartId` (útil cuando se llega desde el retorno de Webpay antes de tener el JWT):

```typescript
// GET /api/quote?shoppingCartId=uuid
// Si se proporciona shoppingCartId sin formId:
// 1. Fetch ShoppingCart → obtener formId
// 2. Continuar con el flujo normal de formId
```

---

### API-03: Actualizar `/api/confirm-charger-visit` para llamar `/api/update-step` con step `'5'`

**Archivo**: `src/app/api/confirm-charger-visit/route.ts`

**Cambio**: Después de confirmar la visita exitosamente, actualizar el step:

```typescript
// Después de la respuesta exitosa de ConfirmChargerVisit:
if (formId) {
  await fetch(`${baseUrl}/api/update-step`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formId, step: '5' }),
  })
}
```

---

## 5. Plan de Implementación Priorizado

### Prioridad ALTA (bloquea trazabilidad completa)

| ID | Cambio | Esfuerzo estimado |
|----|--------|-------------------|
| BACK-01 | Agregar campos a `ClientForm` en schema (FKs + `hasCharger` + `selectedPaymentOption`) | 2h |
| BACK-02 | `ConfirmChargerVisit` registra `calendarVisitId` y `shoppingCartId` | 2h |
| BACK-03 | `ProcessEstimate` vincula `estimateId` (7kW) a `ClientForm` | 2h |
| BACK-04 | `WebpayCommit` vincula `paymentTransactionId` a `ClientForm` | 3h |
| BACK-08 | Registrar `hasCharger` y `selectedPaymentOption` desde `/api/payment` | 2h |
| FRONT-01 | Verificar y consolidar `formId` en JWT del email | 1h |
| FRONT-09 | Enviar `hasCharger` y `selectedPaymentOption` al backend al pagar | 2h |

### Prioridad MEDIA (mejora experiencia de usuario)

| ID | Cambio | Esfuerzo estimado |
|----|--------|-------------------|
| FRONT-02 | `/api/quote` retorna `shoppingCartId` y `paymentTransactionId` | 2h |
| FRONT-03 | `ActiveVisitCard` muestra monto real pagado | 1h |
| FRONT-04 | Actualizar `currentStep` a `'5'` al confirmar visita | 0.5h |
| FRONT-06 | Mejorar robustez de `/api/active-visit` con GSI `formId` | 2h |
| FRONT-07 | Mejorar pantalla `/cotizador/recibo-pago` | 3h |
| FRONT-08 | Guardar JWT en sessionStorage para recibo | 1h |

### Prioridad BAJA (nice-to-have)

| ID | Cambio | Esfuerzo estimado |
|----|--------|-------------------|
| BACK-05 | Saldo pendiente vinculado a `ClientForm` | 1h |
| BACK-06 | GSIs adicionales en `ClientForm` | 1h |
| BACK-07 | Mutación centralizada `updateClientFormLinks` | 3h |
| FRONT-05 | Validar pago previo en `/cotizador/pago?JWT` | 2h |
| API-02 | `/api/quote` por `shoppingCartId` | 2h |
| API-03 | `confirm-charger-visit` actualiza step `'5'` | 0.5h |

---

## 6. Diagrama de Relaciones Objetivo

```
Customer (customerId = email)
│
├──► ClientForm
│    ├── customerId (FK)          ← Cliente
│    ├── estimateId (FK) ★ NUEVO  ← Estimate 7kW
│    ├── shoppingCartId (FK) ★    ← ShoppingCart del pago principal
│    ├── paymentTransactionId ★   ← Transacción Transbank
│    ├── calendarVisitId (FK) ★   ← Visita técnica agendada
│    └── currentStep              ← '0'→'1'→'2'→'3'→'4'→'5'
│
├──► Estimate (chargerPotence: 7)
│    ├── formId (FK)              ← ClientForm
│    └── EstimateDetails[]
│
├──► ShoppingCart (principal)
│    ├── formId (FK)
│    ├── customerId (FK)
│    ├── estimateId (FK)
│    ├── status: completed
│    ├── total: monto pagado
│    └── PaymentTransaction[]
│
├──► ShoppingCart (saldo pendiente) ★ MEJORAR
│    ├── formId (FK) ★            ← Actualmente sin formId
│    ├── customerId (FK)
│    └── status: pending
│
├──► PaymentTransaction
│    ├── shoppingCartId (FK)
│    ├── customerId (FK)
│    └── status: AUTHORIZED
│
└──► CalendarVisit
     ├── formId (FK)
     ├── customerId (FK)
     └── state: payedAndAgended

★ = Campo nuevo o mejora propuesta
```

---

## 7. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Migración DynamoDB falla para campos nuevos | Baja | Alto | Campos opcionales; deploy incremental con prueba en DEV primero |
| Lambda `ConfirmChargerVisit` falla al actualizar `ClientForm` (timeout) | Media | Medio | Implementar rollback o retry; el update del `ClientForm` es best-effort (no afecta la reserva) |
| JWT sin `formid` en email (sesión expirada) | Media | Alto | Fallback desde `ShoppingCart.formId` (ya implementado); agregar log de alerta |
| `WebpayCommit` actualiza `ClientForm` con `paymentTransactionId` incorrecto (re-intentos) | Baja | Medio | Usar `condition` de DynamoDB para solo actualizar si `paymentTransactionId` está vacío |
| El segundo ShoppingCart (saldo pendiente) no tiene `formId` | Alta | Medio | Fix en BACK-05; el saldo pendiente es visible en `ShoppingCart` pero no trazable por `ClientForm` |

---

## 8. Dependencias entre Cambios

```
BACK-01 (schema ClientForm) 
   → BACK-02 (ConfirmChargerVisit usa calendarVisitId)
   → BACK-03 (ProcessEstimate usa estimateId)
   → BACK-04 (WebpayCommit usa paymentTransactionId)
   → BACK-06 (GSIs sobre campos nuevos)

FRONT-02 (api/quote retorna shoppingCartId/paymentTransactionId)
   → FRONT-03 (ActiveVisitCard muestra paidAmount real)

FRONT-08 (JWT en sessionStorage)
   → FRONT-07 (recibo-pago usa JWT guardado)

Todos los cambios BACK-* requieren:
   1. Deploy del backend en DEV
   2. Verificación de schema Amplify
   3. Deploy en PROD
```

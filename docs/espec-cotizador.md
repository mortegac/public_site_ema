# Especificación Funcional: Módulo Cotizador — Enérgica City

**Versión**: 1.0  
**Fecha**: 2026-06-12  
**Estado**: Borrador para revisión

---

## 1. Descripción General

El módulo cotizador es el flujo principal de conversión de la plataforma. Permite a un usuario estimar el costo de instalación de un cargador eléctrico domiciliario o de edificio, elegir una opción de pago y agendar la visita técnica de confirmación.

El flujo cubre desde el primer ingreso hasta la confirmación de la visita, y debe permitir reconstruir completamente el contexto de la cotización en cualquier punto del proceso (incluso si el usuario llega desde un email días después de haber pagado).

---

## 2. Tablas de Datos Involucradas

| Tabla | Propósito |
|-------|-----------|
| `ClientForm` | Registro principal de la cotización del cliente |
| `Estimate` | Presupuesto calculado por la API |
| `EstimateDetail` | Ítems desglosados del presupuesto |
| `ShoppingCart` | Carrito de compra asociado al pago |
| `ShoppingCartDetail` | Ítems del carrito |
| `PaymentTransaction` | Registro de la transacción Transbank |
| `CalendarVisit` | Slot de visita técnica reservado |
| `Customer` | Datos del cliente |

### Campos críticos que deben quedar registrados en `ClientForm`

Al finalizar el flujo completo, el `ClientForm` DEBE tener registrados:

| Campo | Tipo | Cuándo se registra |
|-------|------|--------------------|
| `customerId` | `String` | Al guardar datos del cliente (paso contacto) |
| `estimateId` | `ID` | Al confirmar pago (Estimate con `chargerPotence: 7`) |
| `shoppingCartId` | `ID` | Al crear el ShoppingCart en /api/payment |
| `paymentTransactionId` | `ID` | Al completar el pago en Transbank (WebpayCommit) |
| `calendarVisitId` | `ID` | Al confirmar la visita técnica (ConfirmChargerVisit) |
| `currentStep` | `String` | Se actualiza en cada transición de paso |
| `hasCharger` | `Boolean` | Al avanzar del paso 1 al paso 2 — indica si el cliente trae su propio cargador (`true`) o compra uno con la instalación (`false`) |
| `selectedPaymentOption` | `String (Enum)` | Al iniciar el pago — registra la opción de pago elegida por el cliente |

> **Nota importante**: El EstimateId que se registra en el ClientForm siempre corresponde al Estimate con `chargerPotence: 7` (Wallbox 7 kW), ya que es el estándar de instalación de referencia.

### Valores posibles de `selectedPaymentOption`

| Valor | Tipo de propiedad | Descripción |
|-------|-------------------|-------------|
| `reserva-70-porc` | CASA | El cliente paga el 70% de la instalación hoy; el 30% se cobra post-visita |
| `reserva-30-porc` | CASA | El cliente paga el 30% de la instalación hoy; el 70% se cobra post-visita |
| `visita-tecnica` | CASA | El cliente paga solo la visita técnica ($10.000); sin compromiso de instalación |
| `paga-visita-mas-kit-comunidad` | EDIFICIO | El cliente paga $29.000 por visita técnica + kit para aprobación de comunidad |
| `postula-electrolinera-comunitaria` | EDIFICIO | El cliente postula a electrolinera financiada por Enérgica; no genera pago |

> El campo `selectedPaymentOption` se debe registrar en el `ClientForm` **antes** de redirigir a Webpay (o al enviar la postulación de electrolinera). En el caso de la electrolinera, el campo se registra aunque no exista `ShoppingCart` ni `PaymentTransaction`.

---

## 3. Flujo General del Módulo

```
[ENTRADA] Usuario accede a /cotizador
     │
     ▼
[PASO 0] Tipo de propiedad
     │   ¿Casa o Departamento?
     │
     ├──► CASA  ──► [PASO 1 CASA]
     │
     └──► EDIFICIO ──► [PASO 1 EDIFICIO]
     
[PASO 1] Datos del cargador y distancia
     │   Selección de tipo (portable/wallbox) y distancia al tablero
     │   POST /api/cotizar → crea ClientForm + calcula Estimate
     │
     ▼
[PASO 2] Cotización y opciones de pago
     │   Se muestran las opciones diferenciadas (ver sección 4)
     │   Usuario elige opción → inicia pago Webpay
     │
     ▼
[PAGO WEBPAY]
     │   Usuario completa pago en plataforma Transbank
     │
     ▼
[RETURN /return?token_ws=...]
     │   ReturnClient valida el pago (WebpayCommit + WebpayStatus)
     │   Envía email de comprobante con link JWT a /cotizador/agenda
     │   Redirige según tipo de carrito (chargerInstallation → recibo-pago, visit → agenda)
     │
     ▼
[RECIBO PAGO /cotizador/recibo-pago]
     │   Muestra resumen del pago y botón "Reservar instalación"
     │
     ▼
[AGENDA /cotizador/agenda?{JWT}]
     │   Verifica si ya existe visita activa para este FormID + CustomerID
     │   Si existe → muestra detalles de la visita
     │   Si no existe → muestra selector de fechas
     │
     ▼
[CONFIRMACIÓN]
     │   Visita técnica agendada
     │   CalendarVisit.state = "payedAndAgended"
     │   Evento creado en Google Calendar
     └──► FIN DEL FLUJO
```

---

## 4. Opciones de Pago por Tipo de Propiedad

### 4.1 CASA

El sistema genera un presupuesto de instalación y ofrece 3 opciones:

| Opción | Descripción | Monto | `typeOfCart` |
|--------|-------------|-------|-------------|
| **Reserva 70%** | Paga el 70% hoy. El 30% se cobra tras la visita técnica. | 70% del costo de instalación | `chargerInstallation` |
| **Reserva 30%** ⭐ _Más elegida_ | Paga el 30% hoy. El 70% se cobra tras la visita técnica. | 30% del costo de instalación | `chargerInstallation` |
| **Solo visita técnica** | Paga solo la visita. Sin compromiso de instalación. | $10.000 CLP | `visit` |

**Comportamiento del saldo pendiente (Reserva 70% y 30%)**:
- Se crea un segundo `ShoppingCart` con el saldo pendiente (`pendingAmount`)
- El saldo pendiente se cobra en una transacción posterior (fuera del scope de este flujo)
- El `pendingGlosa` identifica la deuda: `"Saldo 70% · Instalación cargador eléctrico"` o `"Saldo 30% · ..."`

### 4.2 EDIFICIO

El sistema ofrece 2 opciones distintas sin presupuesto de instalación directa:

| Opción | Descripción | Monto | `typeOfCart` |
|--------|-------------|-------|-------------|
| **Kit Aprobación Comunidad** | Incluye visita técnica + materiales para presentar ante la comunidad del edificio. | $29.000 CLP | `visit` |
| **Electrolinera Compartida** | Postulación para instalación financiada por Enérgica. El cliente paga por kWh cargado. | $0 (postulación) | N/A (envío de email) |

**Opción Electrolinera**: No genera pago. Se envía un email de postulación vía EmailJS con los datos del cliente y edificio. No crea ShoppingCart ni PaymentTransaction.

---

## 5. Paso a Paso Detallado por Flujo

### 5.1 Flujo CASA — Cualquier opción de pago

#### Paso 0: Tipo de propiedad
1. Usuario selecciona **"Casa"**
2. Estado: `tipo = 'casa'`
3. Se habilita botón "Siguiente"

#### Paso 1: Datos del cargador
1. Usuario selecciona tipo de cargador:
   - **Portátil**: 2.2 kW, `tipoC = 'portable'`
   - **Wallbox**: 7 kW (por defecto), `tipoC = 'wallbox'`
   - Por defecto se pre-selecciona **"Ya tengo mi cargador"** (`chargerId = 'own'`)
   - El usuario puede seleccionar un cargador del catálogo para comprarlo junto con la instalación
2. Usuario ajusta la distancia al tablero eléctrico (slider, 1–60m)
3. Al presionar "Siguiente":
   - Se llama `POST /api/cotizar` con los datos del formulario
   - La API crea el `ClientForm` en DynamoDB
   - La API calcula el `Estimate` vía `ProcessEstimate`
   - Se guarda `formId` en el estado del wizard

#### Paso 2: Cotización y pago (CASA)
1. Se muestran el desglose de costos y las 3 opciones de pago
2. Usuario selecciona una opción (Reserva 70%, Reserva 30%, Solo visita)
3. Se despliega panel de contacto: nombre, email, teléfono, dirección
4. Usuario completa datos y presiona "Pagar con Webpay":
   - Se llama `POST /api/customer` (no bloqueante) para guardar datos del cliente
   - Se llama `POST /api/payment` para crear `ShoppingCart` + `ShoppingCartDetail`
   - La API inicia transacción Webpay (`WebpayStart`)
   - Se guarda contexto en `sessionStorage.paymentData`
   - El navegador hace POST silencioso al formulario de Webpay

#### Pago en Transbank
1. Usuario paga con tarjeta de débito/crédito en el formulario de Transbank
2. Transbank redirige al return URL: `https://www.energica.city/return?token_ws=...`

#### Retorno (ReturnClient)
1. `ReturnClient` detecta `token_ws` en la URL
2. Llama `WebpayCommit` → confirma el pago
3. Llama `WebpayStatus` → obtiene detalles (monto, tarjeta, buy_order, email)
4. Envía email de comprobante al cliente:
   - Incluye datos de la transacción
   - Incluye resumen de la instalación
   - Incluye botón **"Reservar instalación"** con URL: `https://www.energica.city/cotizador/agenda?{JWT}`
   - El JWT contiene: `email`, `formid`, `name`
5. Redirige a `/cotizador/recibo-pago` (para `chargerInstallation`) o `/cotizador/agenda` (para `visit`)

#### Agenda (AgendaClient)
Ver sección 6.

---

### 5.2 Flujo EDIFICIO — Kit Aprobación ($29.000)

#### Pasos 0 y 1: (idénticos al flujo Casa, con campos adicionales)
- En paso 1: Usuario ingresa piso del departamento, piso del estacionamiento, y si hay estacionamiento de visitas
- Al llamar `/api/cotizar` se incluyen: `apartmentFloor`, `parkingLevel`, `hasVisitorParking`
- Se genera `ClientForm` con `isHouse = false`

#### Paso 2: Cotización edificio
1. Se muestran 2 opciones (Kit Aprobación y Electrolinera)
2. Usuario selecciona **Kit Aprobación ($29.000)**
3. Se despliega panel de contacto
4. Usuario completa datos y presiona "Pagar":
   - `typeOfCart = 'visit'`
   - `sessionStorage.paymentData.paymentType = 'edificioVisita'`
5. Flujo de Webpay idéntico al de casa

#### Retorno
- `ReturnClient` detecta `paymentType === 'edificioVisita'`
- Envía email **diferenciado** de edificio (`sendEdificioVisitReceiptEmail`)
- Redirige a `/cotizador/agenda`

---

### 5.3 Flujo EDIFICIO — Electrolinera Compartida ($0)

1. Usuario selecciona **"Electrolinera compartida"**
2. Se despliega formulario de postulación (sin pago)
3. Al enviar, se manda email vía EmailJS con datos del edificio y postulante
4. Estado `electrolineraSubmitted = true`
5. **No se crea ShoppingCart, no hay Webpay, no hay agenda**

---

## 6. Flujo de Agenda Detallado

### 6.1 Entrada por email (JWT)

El usuario llega a `/cotizador/agenda?{JWT}` desde el botón del email.

**Datos del JWT**:
```json
{
  "sub":    "email@cliente.com",
  "email":  "email@cliente.com",
  "name":   "Nombre del cliente",
  "formid": "uuid-del-client-form",
  "iat":    1781291718
}
```

### 6.2 Verificación de reserva existente

Al cargar la página:

1. **Actualizar step** (fire-and-forget):
   - `POST /api/update-step` con `{ formId, step: '4' }` (PAID_PENDING_SCHEDULE)

2. **Cargar datos de instalación** (no bloqueante):
   - `GET /api/quote?formId={formid}` → obtiene tipo, cargador, distancia, total, etc.
   - Actualiza el "Resumen de instalación" en pantalla

3. **Verificar visita activa** (bloqueante, determina qué mostrar):
   - `GET /api/active-visit?formId={formid}&customerId={email}`
   - Busca `CalendarVisit` con `state IN ['reserved', 'payed', 'payedAndAgended', 'waiting']`

### 6.3 Rama A: Ya tiene visita agendada

Si se encuentra una visita activa → mostrar `ActiveVisitCard`:

| Campo visible | Fuente |
|--------------|--------|
| Fecha y hora | `CalendarVisit.startDate` |
| Dirección | `CalendarVisit.location` |
| Servicio | `CalendarVisit.summary` |
| Estado | `CalendarVisit.state` (etiqueta amigable) |
| Email | Del JWT |
| Resumen instalación | De `/api/quote` (tipo, cargador, dist, total) |

**Estado de la visita → etiqueta**:
- `payed` / `payedAndAgended` → "Confirmada y pagada" (verde)
- `reserved` → "Reservada — pendiente de pago" (amarillo)
- `waiting` → "Procesando pago" (azul)

**Opción "Modificar fecha"** (visible si estado ∈ `{payed, payedAndAgended, reserved}`):
- El usuario puede solicitar un cambio de fecha
- Se muestra el selector de fechas nuevamente
- Al confirmar: `POST /api/reschedule-visit`

### 6.4 Rama B: Sin visita agendada

Si no hay visita activa → mostrar selector de fechas:

1. `GET /api/schedules?startDate=...&endDate=...` → obtiene slots disponibles (próximos 16 días, lunes a sábado)
2. Usuario selecciona una fecha
3. Usuario presiona "Confirmar visita":
   - `POST /api/confirm-charger-visit` con `{ calendarId, customerId, address, chargerName, formId }`
   - La Lambda `ConfirmChargerVisit` crea la reserva en Google Calendar
   - `CalendarVisit.state` pasa a `"payedAndAgended"`
4. Se muestra `ActiveVisitCard` con la visita confirmada

### 6.5 Pantalla de resumen

Después de confirmar (o si ya tenía visita), se muestra siempre:

| Sección | Contenido |
|---------|-----------|
| Detalles de la visita | Fecha, hora, dirección, email, estado |
| Resumen de instalación | Tipo de propiedad, cargador, distancia, dirección, total pagado |
| Próximos pasos | Descripción de qué esperar de la visita técnica |
| Contacto | Botón WhatsApp + email de soporte |

---

## 7. Emails del Sistema

### 7.1 Email de Comprobante — Instalación Casa/Edificio (`typeOfCart = 'chargerInstallation'`)

**Cuándo**: Al confirmar pago exitoso (`AUTHORIZED`) en ReturnClient  
**Destinatario**: Email del cliente  
**Contenido**:
- Saludo con nombre del cliente
- Monto total pagado
- Datos de la transacción (N° orden, cód. autorización, método de pago, fecha)
- Detalle de la compra (materiales, instalación, SEC, cargador, neto, IVA)
- Cuadro de instalación (tipo cargador, domicilio, distancia)
- Bloque "Tu reserva protegida" (garantías)
- **Botón "Reservar instalación"** → `https://www.energica.city/cotizador/agenda?{JWT}`
- El JWT incluye siempre: `email`, `name`, `formid`

### 7.2 Email de Comprobante — Edificio Visita (`paymentType = 'edificioVisita'`)

**Cuándo**: Al confirmar pago exitoso en ReturnClient, cuando `paymentType === 'edificioVisita'`  
**Diferencias respecto al email estándar**:
- Título diferente: "Visita técnica de confirmación"
- No muestra desglose de instalación (solo el total de la visita)
- Botón también apunta a `/cotizador/agenda?{JWT}`

### 7.3 Email de Cotización (sin pago)

**Cuándo**: Cuando el usuario solicita recibir la cotización por email desde el paso 2  
**Contenido**: Desglose completo de la cotización con link de pago (`/cotizador/pago?{JWT}`)

### 7.4 Email de Postulación Electrolinera

**Cuándo**: Al completar el formulario de electrolinera  
**Contenido**: Datos del edificio y del postulante para evaluación interna

---

## 8. Reconstrucción del Contexto del Cliente

El sistema debe poder reconstruir el contexto completo de la cotización del cliente a partir del `formId` y/o `customerId`. Esto es necesario cuando:

- El cliente llega desde el email días después del pago
- El cliente entra directamente a `/cotizador/agenda?{JWT}`
- Se necesita mostrar el resumen de instalación en la página de agenda

### Fuentes de datos para reconstrucción

| Dato | Fuente primaria | Fuente fallback |
|------|-----------------|-----------------|
| Email cliente | JWT (`email`) | `sessionStorage.paymentData.email` |
| FormID | JWT (`formid`) | `activeVisit.formId` |
| Tipo de propiedad | `/api/quote` → `ClientForm.isHouse` | `sessionStorage.paymentData.tipo` |
| Nombre del cargador | `/api/quote` → `Estimate.chargerModel` | `sessionStorage.paymentData.chargerName` |
| Distancia | `/api/quote` → `ClientForm.distance` | `sessionStorage.paymentData.dist` |
| Dirección | `/api/quote` → `Customer.address` | `sessionStorage.paymentData.address` |
| Total pagado | `/api/quote` → `ShoppingCart.total` | `sessionStorage.paymentData.total` |
| Depto/referencia | `/api/quote` → `ClientForm.apartmentFloor` | `sessionStorage.paymentData.depto` |

### Endpoint `/api/quote`

Este endpoint es el responsable de reconstruir la información. Recibe `formId` y retorna:

```json
{
  "formId": "...",
  "tipo": "casa|edificio",
  "chargerName": "EFFITEC 7 kW",
  "dist": 15,
  "mat": 202488,
  "inst": 236396,
  "sec": 25000,
  "chargerPrice": 503948,
  "neto": 967832,
  "iva": 183789,
  "total": 1151621,
  "isOwn": false,
  "address": "Av. Libertador 123, Santiago",
  "depto": "Piso 5, Depto 501",
  "nextVisitDate": "2026-06-20T10:00:00Z"
}
```

---

## 9. Estados del Sistema

### 9.1 `ClientForm.currentStep`

| Valor | Significado |
|-------|-------------|
| `'0'` | Inicio del formulario |
| `'1'` | Tipo de propiedad y cargador seleccionados |
| `'2'` | Cotización enviada por email (sin pago) |
| `'3'` | Pago iniciado (Webpay abierto) |
| `'4'` | Pago completado — pendiente de agendar visita (PAID_PENDING_SCHEDULE) |
| `'5'` | Visita agendada — proceso completado |

### 9.2 `CalendarVisit.state`

| Estado | Descripción |
|--------|-------------|
| `available` | Slot libre para reservar |
| `reserved` | En carrito, pendiente de pago (TTL ~15 min) |
| `waiting` | Transacción Webpay iniciada |
| `payed` | Pago confirmado por Transbank |
| `payedAndAgended` | Evento creado en Google Calendar (estado final exitoso) |
| `error` | Error en algún punto del proceso |
| `timedOut` | Reserva expiró sin pago |
| `occupied` | Bloqueado manualmente por instalador |
| `stale` | Pasó la fecha sin completarse |

### 9.3 `ShoppingCart.status`

| Estado | Descripción |
|--------|-------------|
| `pending` | Creado, pendiente de pago |
| `completed` | Pago confirmado |
| `cancelled` | Cancelado por el usuario |
| `timed_out` | Expiró (visita liberada) |

---

## 10. Validaciones de Negocio

| Regla | Dónde se valida |
|-------|----------------|
| No se puede agendar si ya hay visita activa para el mismo `formId` | Lambda `ConfirmChargerVisit` → `assertNoActiveVisitForForm` |
| El slot de calendario debe estar en estado `available` para ser reservado | Lambda `MakeReservationAndCart` y `ConfirmChargerVisit` |
| El `ShoppingCart` debe pertenecer al mismo `customerId` para ser vinculado | Lambda `ConfirmChargerVisit` |
| Solo se muestra "Modificar fecha" si el estado de la visita es `payed`, `payedAndAgended` o `reserved` | Frontend `ActiveVisitCard` |
| El email del JWT debe coincidir con el `customerId` del `ClientForm` | Lambda `ConfirmChargerVisit` |
| La cobertura es solo Región Metropolitana y Valparaíso | Frontend (aviso, debe bloquear cualquier otra ciudad o región) |
| Distancia mínima 1m, máxima 60m | Frontend slider |

---

## 11. Consideraciones de UX

- El usuario **no necesita crear cuenta** para cotizar y pagar
- El flujo funciona completamente via `email` como identificador del cliente (`customerId`)
- La información de la cotización se reconstruye desde la base de datos vía `formId`; el `sessionStorage` es solo un caché temporal
- Si el usuario pierde la sesión del navegador (cierra la pestaña, cambia de dispositivo), puede recuperar el contexto desde el link del email
- El JWT del email tiene vigencia indefinida (sin `exp`), lo que permite a los clientes usarlo días después

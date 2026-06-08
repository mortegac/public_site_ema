# ClientForm — Estados del Flujo del Cotizador

El campo `currentStep` en el modelo `ClientForm` registra el estado actual del proceso de instalación de un cargador EV. Se actualiza automáticamente en puntos clave del flujo.

## Estados disponibles

| Código | Nombre | Descripción |
|--------|--------|-------------|
| `1` | `DRAFT` | Borrador — cliente ingresando datos en el cotizador |
| `2` | `QUOTE_SENT` | Cotización enviada al email del cliente |
| `3` | `PENDING_PAYMENT` | Cliente ingresó a la pantalla de pago |
| `4` | `PAID_PENDING_SCHEDULE` | Pago confirmado — pendiente de agendar visita técnica |
| `5` | `SCHEDULED` | Visita técnica agendada |
| `6` | `OT_ISSUED` | Orden de trabajo emitida |
| `7` | `TECH_ASSIGNED` | Técnico asignado |
| `8` | `MATERIALS_READY` | Materiales listos |
| `9` | `IN_PROGRESS` | Instalación en curso |
| `10` | `INSTALLED` | Instalación completada |
| `11` | `PENDING_TE6` | Trámite SEC iniciado |
| `12` | `COMPLETED_TE6_OK` | TE6 aprobada — proceso finalizado |
| `13` | `ON_HOLD` | Pausado / En espera |
| `14` | `CANCELLED` | Cancelado |

## Transiciones automáticas (implementadas en el frontend)

```
[Creación del formulario]
    └─► 1 DRAFT
        └─► /api/cotizar — al crear o actualizar ClientForm

[Panel email — "Enviar cotización"]
    └─► 2 QUOTE_SENT
        └─► CotizadorWizard.handleSendEmail — al enviar el email exitosamente

[Botón "Reservar instalación"]
    └─► 3 PENDING_PAYMENT
        └─► CotizadorWizard.initiatePayment — al iniciar el pago Webpay

[Página /cotizador/pago?JWT]
    └─► 3 PENDING_PAYMENT
        └─► PagoClient — al hidratar la página desde JWT

[Regreso de Webpay — pago aprobado]
    └─► 4 PAID_PENDING_SCHEDULE
        └─► ReturnClient — al redirigir a /cotizador/recibo-pago

[Página /cotizador/agenda?JWT]
    └─► 4 PAID_PENDING_SCHEDULE
        └─► AgendaClient — al montar la página

[Confirmación de fecha en /cotizador/recibo-pago]
    └─► 5 SCHEDULED
        └─► ReciboPagoClient — después de confirmar la reserva exitosamente
```

## Transiciones manuales (backoffice)

Los estados del `6` al `14` se actualizan manualmente desde el backoffice (`ema-backofficev2`) por el equipo de operaciones.

## Endpoint de actualización

```
POST /api/update-step
Body: { "formId": "uuid", "step": "1" }
Response: { "success": true, "formId": "uuid", "step": "1" }
```

El endpoint exporta `CLIENT_FORM_STEPS` con todos los valores:
```typescript
import { CLIENT_FORM_STEPS } from '@/app/api/update-step/route'
// CLIENT_FORM_STEPS.DRAFT === '1'
// CLIENT_FORM_STEPS.QUOTE_SENT === '2'
// ... etc
```

## Archivos clave

| Archivo | Rol en el flujo |
|---------|----------------|
| `src/app/api/cotizar/route.ts` | Crea ClientForm con `currentStep: '1'` |
| `src/app/api/update-step/route.ts` | Endpoint genérico de actualización de step |
| `src/app/cotizador/CotizadorWizard.tsx` | Transiciones 2 (email) y 3 (pago) |
| `src/app/cotizador/pago/PagoClient.tsx` | Transición 3 (visita a /cotizador/pago) |
| `src/app/return/ReturnClient.tsx` | Transición 4 (pago aprobado) |
| `src/app/cotizador/agenda/AgendaClient.tsx` | Transición 4 (visita a /cotizador/agenda) |
| `src/app/cotizador/recibo-pago/ReciboPagoClient.tsx` | Transición 5 (fecha confirmada) |

---
Plan de Implementación: Cotizador — espec-cotizador-propuesta.md

Estado Actual (auditoría)

✅ Ya implementado (no tocar)

┌──────────────────────────────────────────────────┬──────────────────────────────────────────────┐
│                       Item                       │                    Estado                    │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ FRONT-01: JWT email siempre incluye formId       │ ✅ Completo (cart.formId fallback ya existe) │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ FRONT-04: currentStep='5' al confirmar visita    │ ✅ Completo (ReciboPagoClient.tsx:290)       │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ FRONT-05: Ruta /cotizador/pago?JWT existe        │ ✅ Completo                                  │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ FRONT-06: /api/active-visit prioriza formId      │ ✅ Completo                                  │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ FRONT-07: /cotizador/recibo-pago muestra resumen │ ✅ Completo                                  │
└──────────────────────────────────────────────────┴──────────────────────────────────────────────┘

❌ Falta completamente

┌───────────────────────────────────────────────────────────────────────────┬────────────────────────────────┐
│                                   Item                                    │            Impacto             │
├───────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
│ BACK-01: Campos nuevos en ClientForm schema                               │ 🔴 BLOQUEADOR de todo lo demás │
├───────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
│ BACK-03: ProcessEstimate vincula estimateId                               │ 🔴 HIGH                        │
├───────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
│ BACK-04: WebpayCommit vincula paymentTransactionId                        │ 🔴 HIGH                        │
├───────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
│ BACK-06: GSIs en ClientForm                                               │ 🔴 Depende de BACK-01          │
├───────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
│ BACK-07: Mutación updateClientFormLinks                                   │ 🟡 MEDIUM                      │
├───────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
│ BACK-08: Registrar hasCharger + selectedPaymentOption                     │ 🔴 HIGH                        │
├───────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
│ FRONT-02/API-01: /api/quote retorna shoppingCartId y paymentTransactionId │ 🔴 HIGH                        │
├───────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
│ FRONT-09: CotizadorWizard envía hasCharger + selectedPaymentOption        │ 🔴 HIGH                        │
├───────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
│ API-02: /api/quote acepta shoppingCartId como parámetro                   │ 🟡 MEDIUM                      │
└───────────────────────────────────────────────────────────────────────────┴────────────────────────────────┘

⚠️ Parcialmente implementado

┌───────────────────────────────────┬────────────────────────────────────────────────────────────────────────────┐
│               Item                │                                 Qué falta                                  │
├───────────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ BACK-02: ConfirmChargerVisit      │ Actualiza ShoppingCart.formId y CalendarVisit.formId, pero NO actualiza    │
│                                   │ ClientForm.calendarVisitId ni .shoppingCartId                              │
├───────────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ BACK-05: Saldo pendiente (2°      │ No existe distinción entre pago inicial y saldo                            │
│ ShoppingCart)                     │                                                                            │
├───────────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ FRONT-03: ActiveVisitCard         │ Muestra monto estimado, no monto real del ShoppingCart                     │
│ paidAmount                        │                                                                            │
├───────────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ FRONT-08: JWT en sessionStorage   │ Guarda paymentData pero no el JWT para reutilizar en /cotizador/pago       │
├───────────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ API-03: confirm-charger-visit     │ El cliente llama update-step separado (funciona pero es 2 requests)        │
│ actualiza step                    │                                                                            │
└───────────────────────────────────┴────────────────────────────────────────────────────────────────────────────┘

---
Plan por Fases

FASE 1 — Backend Schema (ema-back) 🔴 BLOQUEADOR

BACK-01 + BACK-06: amplify/data/main.schema.ts

Agregar al modelo ClientForm (antes de .secondaryIndexes):
estimateId: a.id().optional(),
shoppingCartId: a.id().optional(),
paymentTransactionId: a.id().optional(),
calendarVisitId: a.id().optional(),
hasCharger: a.boolean().optional(),
selectedPaymentOption: a.string().optional(),
// Relaciones inversa belongsTo:
Estimate: a.belongsTo("Estimate", "estimateId"),
ShoppingCart: a.belongsTo("ShoppingCart", "shoppingCartId"),
PaymentTransaction: a.belongsTo("PaymentTransaction", "paymentTransactionId"),
CalendarVisit: a.belongsTo("CalendarVisit", "calendarVisitId"),

Ampliar .secondaryIndexes con 4 GSIs adicionales sobre los 4 nuevos ID fields.

▎ Nota sobre selectedPaymentOption: Se usa a.string() en lugar de a.enum() porque los enums en Amplify Gen 2 requieren un tipo global separado y el string permite las 5 opciones sin overhead.

Archivos: 1 archivo modificado (main.schema.ts)
Deploy requerido: Sí — ampx sandbox o deploy en Amplify

---
FASE 2 — Backend Resolvers (ema-back) 🔴 HIGH

BACK-02: amplify/resolvers/ConfirmChargerVisit/handler.ts

Después de las actualizaciones inversas existentes (línea ~104), agregar:
// Actualizar ClientForm con los IDs vinculados
if (clientFormId) {
  await ClientForm.update({ input: { formId: clientFormId, calendarVisitId: calendarId, shoppingCartId } });
}

BACK-03: amplify/resolvers/ProcessEstimate/handler.ts

Después del Promise.all que crea los estimates (línea ~68), identificar el de 7kW y actualizar ClientForm:
const estimate7kw = estimates.find(e => e.chargerPotence === 7);
if (estimate7kw?.estimateId) {
  await ClientForm.update({ input: { formId: event.arguments.formId, estimateId: estimate7kw.estimateId } });
}

BACK-04: amplify/resolvers/webpayCommit/handler.ts

Después de que el cart se actualiza exitosamente (~línea 123), si isAuthorized && cart?.formId:
await ClientForm.update({ input: { formId: cart.formId, paymentTransactionId: paymentTransaction.paymentTransactionId } });

BACK-08: En ConfirmChargerVisit, recibir hasCharger?: boolean como parámetro y persistirlo en ClientForm. En FASE 4 el frontend lo enviará.

Archivos: 3 resolvers modificados
Deploy requerido: Sí

---
FASE 3 — Backend Opcionales 🟡 MEDIUM

BACK-07: Crear Lambda UpdateClientFormLinks — mutación centralizada para actualizar cualquier combinación de campos FK + hasCharger + selectedPaymentOption + currentStep. Útil para el frontend pero no es bloqueador inmediato.

BACK-05: Agregar campo isBalancePayment: a.boolean() al ShoppingCart para distinguir pago inicial del saldo pendiente. Requiere lógica en el wizard para crear ambos carritos.

▎ Recomendación: BACK-07 y BACK-05 son deseables pero pueden diferirse hasta que las fases 1-2 y 4 estén estables.

---
FASE 4 — Frontend/API (public_site_ema) 🔴 HIGH

FRONT-09: src/app/cotizador/CotizadorWizard.tsx + src/app/api/payment/route.ts

1. En CotizadorWizard, antes de llamar payDirect(), mapear a enum:
  - r70 → 'reserva-70-porc'
  - r30 → 'reserva-30-porc'
  - visita casa → 'visita-tecnica'
  - visita edificio → 'paga-visita-mas-kit-comunidad'
  - electrolinera → 'postula-electrolinera-comunitaria'
  - hasCharger: true si el chargerId seleccionado es del catálogo (no propio)
2. En payDirect(), incluir hasCharger y selectedPaymentOption en el body de /api/payment.
3. En /api/payment/route.ts, recibir ambos campos y pasarlos al createClientForm o updateClientForm AppSync call.

FRONT-02/API-01: src/app/api/quote/route.ts

Ampliar la GraphQL query GET_CLIENT_FORM_WITH_ESTIMATES para incluir:
ShoppingCarts(filter: {status: {eq: "completed"}}, limit: 1) {
  items { shoppingCartId total status }
}
Retornar shoppingCartId en la respuesta.

FRONT-03: src/app/cotizador/agenda/AgendaClient.tsx

Si /api/quote retorna shoppingCartId, hacer fetch adicional a /api/shopping-cart?shoppingCartId= y usar ese total como monto real pagado en ActiveVisitCard.

API-02: src/app/api/quote/route.ts — aceptar ?shoppingCartId= como parámetro alternativo a ?formId=, hacer lookup inverso para obtener el formId.

Archivos: 3-4 archivos modificados en frontend

---
Resumen de Archivos a Modificar

ema-back

┌────────────────────────────────────────────────────┬───────────────────────────────────────────────────────────┐
│                      Archivo                       │                          Cambios                          │
├────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤
│ amplify/data/main.schema.ts                        │ +10 líneas: campos + GSIs en ClientForm                   │
├────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤
│ amplify/resolvers/ConfirmChargerVisit/handler.ts   │ +8 líneas: update                                         │
│                                                    │ ClientForm.calendarVisitId/.shoppingCartId                │
├────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤
│ amplify/resolvers/ProcessEstimate/handler.ts       │ +6 líneas: update ClientForm.estimateId                   │
├────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤
│ amplify/resolvers/webpayCommit/handler.ts          │ +8 líneas: update ClientForm.paymentTransactionId         │
├────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤
│ (Opcional)                                         │ Nuevo resolver (~70 líneas)                               │
│ amplify/resolvers/UpdateClientFormLinks/           │                                                           │
└────────────────────────────────────────────────────┴───────────────────────────────────────────────────────────┘

public_site_ema

┌───────────────────────────────────────────┬────────────────────────────────────────────────────────┐
│                  Archivo                  │                        Cambios                         │
├───────────────────────────────────────────┼────────────────────────────────────────────────────────┤
│ src/app/cotizador/CotizadorWizard.tsx     │ Mapeo de opciones + hasCharger en payDirect()          │
├───────────────────────────────────────────┼────────────────────────────────────────────────────────┤
│ src/app/api/payment/route.ts              │ Recibir + persistir hasCharger y selectedPaymentOption │
├───────────────────────────────────────────┼────────────────────────────────────────────────────────┤
│ src/app/api/quote/route.ts                │ Ampliar query GraphQL + retornar shoppingCartId        │
├───────────────────────────────────────────┼────────────────────────────────────────────────────────┤
│ src/app/cotizador/agenda/AgendaClient.tsx │ Mostrar monto real del ShoppingCart                    │
└───────────────────────────────────────────┴────────────────────────────────────────────────────────┘

---
Orden de Implementación

FASE 1 (ema-back) → deploy sandbox → FASE 2 (ema-back) → deploy sandbox → FASE 4 (web) → verificar flujo completo
FASE 3 puede hacerse después.

---
¿Confirmas este plan para proceder con la implementación? Si quieres modificar el alcance (p.ej. diferir BACK-07/BACK-05 completamente, o cambiar el orden de fases), dímelo antes de empezar.

Plan: Validación de Agenda y Reschedule en /cotizador/agenda

Requerimientos

1. Al cargar /cotizador/agenda (con o sin JWT): verificar si el formId o el customerId ya tiene una visita activa en BD
2. Si existe → mostrar la información de la agenda y una opción "Modificar fecha"
3. Al modificar: mostrar el date-picker con slots disponibles (/api/schedules), confirmar → liberar el slot anterior y reservar el nuevo

---
Análisis del estado actual

Lo que ya existe y funciona ✅

- /api/active-visit ya detecta visitas activas filtrando por estados reserved | payed | payedAndAgended | waiting, buscando primero por formId luego por customerId
- ActiveVisitCard ya renderiza la información de la visita (fecha, dirección, servicio, estado)
- El date-picker ya existe en el paso 1 del flujo normal
- /api/confirm-charger-visit ya reserva un nuevo slot (update CalendarVisit + link formId + link shoppingCartId)

Lo que falta ❌

┌───────────────────────┬────────────────────────────────────────────────────────────────┐
│          Gap          │                            Detalle                             │
├───────────────────────┼────────────────────────────────────────────────────────────────┤
│ "Modificar fecha"     │ ActiveVisitCard no tiene botón ni flujo de reschedule          │
├───────────────────────┼────────────────────────────────────────────────────────────────┤
│ Liberar slot anterior │ No existe API para pasar un slot de reserved/payed → available │
├───────────────────────┼────────────────────────────────────────────────────────────────┤
│ Estado de reschedule  │ AgendaClient no tiene estado isRescheduling                    │
└───────────────────────┴────────────────────────────────────────────────────────────────┘

---
Fases de implementación

Fase 1 — Nueva ruta API /api/reschedule-visit (Next.js)

Archivo: src/app/api/reschedule-visit/route.ts

Responsabilidades:
1. Recibe: { oldCalendarId, newCalendarId, customerId, address?, chargerName?, formId? }
2. AppSync mutation → actualiza oldCalendarId a state: 'available' (libera el slot)
3. Reutiliza la lógica de confirm-charger-visit:
  - Llama ConfirmChargerVisit Lambda con newCalendarId
  - Actualiza formId en el nuevo CalendarVisit
4. Retorna { ok: true, calendarId: newCalendarId }

Queries/Mutations necesarias:
# Liberar slot anterior
mutation ReleaseCalendarVisit($input: UpdateCalendarVisitInput!) {
  updateCalendarVisit(input: $input) {  # state: 'available', customerId: null
    calendarId state
  }
}

---
Fase 2 — Modificar ActiveVisitCard en AgendaClient.tsx

Agregar:
- Botón "Modificar fecha" al final del card (solo si el estado es payed | payedAndAgended | reserved)
- isRescheduling: boolean state
- Cuando isRescheduling === true: ocultar ActiveVisitCard, mostrar date-picker (reutilizar exactamente el mismo componente del paso 1)
- Al confirmar nueva fecha: llamar /api/reschedule-visit en lugar de /api/confirm-charger-visit
- Al completar: refetch /api/active-visit para mostrar el nuevo booking actualizado

Estado añadido en AgendaClient:
const [isRescheduling, setIsRescheduling] = useState(false)

Flujo de pantallas:
Carga → /api/active-visit
  ├─ Sin visita activa → Paso 1: date-picker (flujo normal)
  └─ Con visita activa → ActiveVisitCard
                          └─ Click "Modificar fecha"
                              → isRescheduling = true
                              → /api/schedules (cargar slots)
                              → date-picker (mismo del paso 1)
                              → Confirmar → /api/reschedule-visit
                              → refetch /api/active-visit
                              → Mostrar ActiveVisitCard actualizado

---
Fase 3 — Verificar paso de parámetros en /api/active-visit

En AgendaClient.tsx, la llamada actual a /api/active-visit debe pasar ambos formId Y customerId:

// Verificar que se pasa:
`/api/active-visit?formId=${formId}&customerId=${email}`
// No solo uno de los dos

Si actualmente solo pasa uno, la detección puede fallar en casos donde el link formId-CalendarVisit no fue grabado correctamente (el update es "best-effort" en confirm-charger-visit).

---
Resumen de archivos a modificar/crear

┌───────────────────────────────────────────┬───────────┬─────────────────────────────────────────────────────────┐
│                  Archivo                  │  Acción   │                         Detalle                         │
├───────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────┤
│ src/app/api/reschedule-visit/route.ts     │ CREAR     │ Libera slot viejo + reserva slot nuevo                  │
├───────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────┤
│ src/app/cotizador/agenda/AgendaClient.tsx │ MODIFICAR │ Estado isRescheduling, botón "Modificar fecha", lógica  │
│                                           │           │ de reschedule                                           │
└───────────────────────────────────────────┴───────────┴─────────────────────────────────────────────────────────┘

Sin cambios en:
- Backend (ema-back) — se reutiliza el Lambda ConfirmChargerVisit existente
- /api/active-visit — solo verificar que recibe ambos parámetros
- /api/schedules — se reutiliza sin cambios
- ActiveVisitCard — se modifica como parte del AgendaClient (es inline)

---
Riesgos

┌──────────────────────────────────────────────────┬──────────────┬──────────────────────────────────────────────┐
│                      Riesgo                      │ Probabilidad │                  Mitigación                  │
├──────────────────────────────────────────────────┼──────────────┼──────────────────────────────────────────────┤
│ Lambda ConfirmChargerVisit falla si slot ya está │ Baja         │ Liberar primero, luego reservar; si falla el │
│  reservado (concurrencia)                        │              │  confirm, intentar re-liberar                │
├──────────────────────────────────────────────────┼──────────────┼──────────────────────────────────────────────┤
│ formId no grabado en CalendarVisit (best-effort  │ Media        │ Siempre pasar también customerId en la query │
│ en confirm)                                      │              │  de active-visit                             │
├──────────────────────────────────────────────────┼──────────────┼──────────────────────────────────────────────┤
│ El slot liberado es tomado por otro usuario      │ Muy baja     │ Aceptable; el usuario verá un error y puede  │
│ entre los dos calls                              │              │ elegir otro slot                             │
└──────────────────────────────────────────────────┴──────────────┴──────────────────────────────────────────────┘

---
¿Procedo con esta implementación? (sí / modificar / diferente enfoque)

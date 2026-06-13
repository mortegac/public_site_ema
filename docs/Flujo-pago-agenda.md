Informe: Flujo de Pago y Agenda

Flujo /return?token_ws=... → /cotizador/agenda

┌─────┬──────────────────────┬─────────────────────────────────────┬─────────────────────────────────────────────┐
│  #  │         Paso         │               Acción                │              Query / Mutation               │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 1   │ /return carga        │ Parsea token_ws del URL             │ —                                           │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 2   │ Confirma pago        │ Llama a Transbank                   │ WebpayCommit (mutation AppSync)             │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 3   │ Obtiene detalles     │ Recupera monto, email,              │ WebpayStatus (mutation AppSync)             │
│     │                      │ shoppingCartId, typeOfCart          │                                             │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 4   │ Envía recibo         │ Email al cliente                    │ EmailJS (client-side)                       │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 5   │ Persiste datos       │ Guarda paymentData en               │ —                                           │
│     │                      │ sessionStorage                      │                                             │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 6   │ Redirige (3 seg)     │ Si typeOfCart === 'visit' →         │ GET /api/generate-agenda-link               │
│     │                      │ /cotizador/agenda con JWT           │                                             │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 7   │ /cotizador/agenda    │ Decodifica JWT → extrae formId,     │ —                                           │
│     │ carga                │ email                               │                                             │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 8   │ Actualiza step       │ Marca el form como pagado           │ POST /api/update-step (step='4')            │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 9   │ Carga datos          │ Obtiene Tipo, Cargador, Dist.,      │ GET /api/quote?formId=... → AppSync         │
│     │                      │ Dirección, Total                    │ getClientForm + Estimates                   │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 10  │ Paso 1               │ Usuario elige fecha                 │ GET /api/schedules → listCalendarVisits     │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 11  │ Confirma visita      │ Reserva el slot seleccionado        │ POST /api/confirm-charger-visit →           │
│     │                      │                                     │ updateCalendarVisit                         │
├─────┼──────────────────────┼─────────────────────────────────────┼─────────────────────────────────────────────┤
│ 12  │ Paso 3               │ Muestra confirmación con resumen    │ Datos de paymentData (ya cargados en paso   │
│     │                      │                                     │ 9)                                          │
└─────┴──────────────────────┴─────────────────────────────────────┴─────────────────────────────────────────────┘


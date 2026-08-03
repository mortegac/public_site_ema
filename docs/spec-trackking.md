# Spec: Tracking de Eventos del Cotizador

## Objetivo

Tracking granular del funnel del cotizador solar sin dependencias externas (sin Mixpanel, sin Segment). Arquitectura propia en AWS, barata y controlada.

---

## Arquitectura

```
React (track()) → API Gateway → Kinesis Firehose → S3 (archivo histórico)
                                      ↓
                                  Lambda → DynamoDB (contadores en tiempo real)
                                      ↓
                              Backoffice (consulta DynamoDB + Athena)
```

- **API Gateway**: recibe eventos del frontend
- **Kinesis Firehose**: buffer y entrega a S3 como JSON particionado por fecha
- **S3**: almacenamiento histórico, queryable con Athena
- **Athena**: SQL directo sobre S3, se paga por query
- **Lambda**: procesa el stream de Firehose y actualiza DynamoDB en tiempo real
- **DynamoDB**: contadores y últimos eventos para el dashboard en tiempo real

**Costo estimado AWS**: ~$2–5 USD/mes con 1.000 sesiones/mes (Firehose + S3 + Athena). DynamoDB entra en free tier.

---

## Frontend: función `track()`

Archivo: `lib/tracker.js`

Usa `navigator.sendBeacon` — no bloquea la UI, no se pierde si el usuario cierra la pestaña.

```js
const ENDPOINT = "https://api.energica.city/track";

const sessionId = crypto.randomUUID();
const userId = localStorage.getItem("ec_uid") || (() => {
  const id = crypto.randomUUID();
  localStorage.setItem("ec_uid", id);
  return id;
})();

export function track(event, props = {}) {
  const payload = {
    event,
    props,
    sessionId,
    userId,
    timestamp: Date.now(),
    url: location.pathname,
    referrer: document.referrer,
    device: /Mobi/.test(navigator.userAgent) ? "mobile" : "desktop",
  };
  navigator.sendBeacon(ENDPOINT, JSON.stringify(payload));
}
```

---

## Eventos a trackear

### Paso 1 — Tipo y dirección

```js
track("step_1_loaded")
track("tipo_selected", { tipo: "casa" })       // "casa" | "edificio"
track("address_entered", { comuna: "ñuñoa" })
```

### Paso 2 — Selección de cargador

```js
track("step_2_loaded")
track("charger_selected", { charger: "EFFITEC 7kW", type: "wallbox" })
track("distance_changed", { distance: 13 })    // mientras mueve el slider
track("distance_final", { distance: 13 })      // al soltar el slider
```

### Paso 3 — Resultado y conversión (más importante)

```js
track("step_3_loaded", { total: 1110270, charger: "EFFITEC", distance: 13 })

// Engagement pasivo
track("desglose_viewed")       // si expandieron/scrollearon el desglose
track("timeline_viewed")       // si scrolleó hasta el timeline
track("social_proof_viewed")   // via Intersection Observer

// Acciones de conversión
track("cta_reservar_clicked")                          // CLAVE: pinchó el botón reservar
track("cta_reservar_abandoned")                        // abrió el form y lo cerró sin pagar
track("form_field_filled", { field: "email" })
track("form_field_filled", { field: "direccion_edited" })
track("webpay_initiated", { total: 1110270 })          // envió a Webpay

// Canales alternativos
track("cta_email_clicked")                             // pidió cotización por email
track("email_sent", { email: "x@y.com" })
track("cta_whatsapp_clicked")                          // abrió WhatsApp de dudas

// Abandono
track("volver_simular_clicked")                        // volvió sin convertir
```

### Post-pago

```js
track("payment_confirmed", { total: 1110270 })
track("date_selected", { date: "2026-06-02", daysFromNow: 5 })
track("booking_confirmed", { date: "2026-06-02" })
track("whatsapp_share_clicked")
track("email_share_clicked")
```

---

## Engagement pasivo: Intersection Observer

Detectar qué secciones vio el usuario sin necesidad de clicks.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      track("section_viewed", { section: e.target.dataset.track });
      observer.unobserve(e.target); // solo se trackea una vez
    }
  });
}, { threshold: 0.5 });

// En JSX:
// <div data-track="social_proof" ref={el => el && observer.observe(el)}>
```

---

## Tiempo por paso

```js
// Al salir de cada paso
track("step_time", { step: 2, duration_ms: Date.now() - stepStartTime })
```

---

## Drop-off: evento más importante (sin click)

Si el usuario carga el paso 3 pero nunca pincha "Reservar", "Email" ni "WhatsApp", es un abandono. Se captura con `beforeunload`.

```js
window.addEventListener("beforeunload", () => {
  if (step === 2 && !paid) {
    track("step_3_abandoned", {
      total: result.total,
      timeOnStep: Date.now() - stepStartTime,
      scrolledTo: maxScrollPercent,
      ctaVisible: ctaWasInViewport,
    });
  }
});
```

---

## Métricas en el backoffice

| Métrica | Query / lógica |
|---------|---------------|
| Funnel: paso 1 → 2 → 3 → reserva → booking | Count por evento agrupado por `sessionId` |
| Tasa de conversión paso 3 → reserva | `cta_reservar_clicked / step_3_loaded` |
| Drop-off punto exacto | `step_3_abandoned` con `scrolledTo` y `timeOnStep` |
| ¿Ven el social proof antes de reservar? | `section_viewed{section=social_proof}` antes de `cta_reservar_clicked` en misma sesión |
| ¿WhatsApp de dudas convierte después? | Sesiones con `cta_whatsapp_clicked` que luego tienen `webpay_initiated` |
| Tiempo promedio de decisión en paso 3 | `step_time{step=2}` — promedio de `duration_ms` |
| Email vs reserva directa | Ratio `cta_email_clicked / cta_reservar_clicked` |
| Dispositivo que más convierte | `payment_confirmed` agrupado por `device` |

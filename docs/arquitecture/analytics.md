# Analytics

## Stack

- **Google Tag Manager (GTM)** — contenedor de tags, disparo de eventos
- **Google Analytics 4 (GA4)** — métricas de sesiones y conversiones
- **Hook `useAnalytics`** — abstracción para tracking de eventos, solo activo en PROD

## Variables de Entorno

```bash
NEXT_PUBLIC_GTM_ID=GTM-5C8WKS5R      # ID del contenedor GTM
NEXT_PUBLIC_GA_ID=G-M0V5GMK6FL       # ID de propiedad GA4
```

## Implementación

### GTM (`src/components/analytics/GoogleTagManager.tsx`)

- Script cargado con estrategia `beforeInteractive` (en `<head>` antes de cualquier interacción)
- DataLayer inicializado antes del script GTM
- Noscript fallback en `GoogleTagManagerNoScript.tsx`

### GA4 (`src/components/analytics/GoogleAnalytics.tsx`)

- Script de configuración de GA4
- Se carga desde el layout root

Ambos scripts se inyectan en `src/app/layout.tsx`.

## Hook de Analytics (`src/hooks/useAnalytics.ts`)

```typescript
const { trackEvent, trackConversion } = useAnalytics();

// Trackear evento
trackEvent(action, category, label?, value?);

// Trackear conversión
trackConversion(conversionId, conversionLabel, value?);
```

**Solo activo en entorno PROD** (`isProduction()` debe ser `true`). En DEV los eventos no se envían.

## Eventos Rastreados

Ver documentación completa en `EVENTOS-GTAG.md` (raíz del proyecto).

Eventos principales:

| Evento | Categoría | Descripción |
|--------|-----------|-------------|
| `page_view` | — | Navegación entre páginas |
| `page_view` | `AGENDA_EMA` | Entrada a la página de agenda |
| `exito_pago` | — | Pago procesado exitosamente |
| `rechazo_pago` | — | Pago rechazado o cancelado |
| `continuar_carro_compra` | — | Avance en el carrito de compras |
| eventos cotizador | `cotizador` | Pasos del wizard de cotización |

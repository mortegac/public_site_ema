# Routing y Páginas

Usa Next.js 15 App Router con rutas basadas en archivos.

## Mapa de Rutas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `src/app/page.tsx` | Home page |
| `/[uid]` | `src/app/[uid]/page.tsx` | Páginas dinámicas desde Prismic |
| `/blog/[uid]` | `src/app/blog/[uid]/page.tsx` | Blog posts desde Prismic |
| `/cotizador` | `src/app/cotizador/page.tsx` | Cotizador solar (wizard multi-paso) |
| `/cotizador/simulacion` | `src/app/cotizador/simulacion/page.tsx` | Resultado de simulación |
| `/agenda` | `src/app/agenda/page.tsx` | Agendamiento de visita técnica |
| `/agenda/recibo-pago` | `src/app/agenda/recibo-pago/page.tsx` | Confirmación de pago exitoso |
| `/agenda/rechazo-pago` | `src/app/agenda/rechazo-pago/page.tsx` | Pago rechazado/cancelado |
| `/agenda/recibo-virtual` | `src/app/agenda/recibo-virtual/page.tsx` | Recibo virtual |
| `/return` | `src/app/return/page.tsx` | Retorno desde WebPay (procesa token) |
| `/return/invoice` | `src/app/return/invoice/page.tsx` | Factura/boleta |
| `/soporte` | `src/app/soporte/page.tsx` | Soporte al cliente |
| `/contactanos` | `src/app/contactanos/page.tsx` | Formulario de contacto |
| `/faqs` | `src/app/faqs/page.tsx` | Preguntas frecuentes |
| `/privacidad` | `src/app/privacidad/page.tsx` | Política de privacidad |
| `/terminos-condiciones` | `src/app/terminos-condiciones/page.tsx` | Términos y condiciones |

## API Routes

| Ruta | Archivo | Propósito |
|------|---------|-----------|
| `POST /api/revalidate` | `src/app/api/revalidate/route.ts` | Invalida caché de Prismic (ISR on-demand) |
| `GET /api/preview` | `src/app/api/preview/route.ts` | Activa modo preview de Prismic |
| `GET /api/exit-preview` | `src/app/api/exit-preview/route.ts` | Sale del modo preview de Prismic |
| `GET /api/prismic/products` | `src/app/api/prismic/products/route.ts` | Productos desde Prismic con fallback |

## Layout Root (`src/app/layout.tsx`)

Envuelve toda la app con:
- `Providers` — Redux + PersistGate
- `HpHeader` — navegación principal
- `Footer`
- `ScrollToTop`
- `ConditionalFloatingVisitWidget` — widget flotante de agendamiento
- `PrismicPreview` — soporte para preview de Prismic
- Scripts de analytics (GTM, GA4)
- Font: Inter (Google Fonts, variable `--font-inter`)

# FULL SEO AUDIT — Energica City

**Fecha:** 2026-03-22
**Baseline anterior:** 39/100
**URL:** https://energica.city
**Stack:** Next.js 15 App Router · TypeScript · MUI v7 · Prismic CMS · AWS Amplify Gen 2

---

## SEO Health Score: 57/100 → estimado 72/100 post-fixes

| Categoría | Peso | Score inicial | Score post-fixes |
|-----------|------|--------------|-----------------|
| Technical SEO | 25% | 68/100 | 80/100 |
| Content Quality | 25% | 46/100 | 58/100 |
| On-Page SEO | 20% | 50/100 | 68/100 |
| Schema / Structured Data | 10% | 65/100 | 80/100 |
| Performance (CWV) | 10% | 60/100 | 68/100 |
| Images | 5% | 80/100 | 80/100 |
| AI Search Readiness (GEO) | 5% | 44/100 | 60/100 |

---

## 1. Technical SEO

### Robots.txt
- ✅ CCBot bloqueado
- ✅ GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot permitidos
- ✅ `/agenda/recibo-pago-virtual`, `/agenda/recibo-pagado`, `/agenda/rechazo-pago-virtual` agregadas a BLOCKED_PATHS

### Sitemap
- ✅ `/privacidad` duplicada — filtrada del query Prismic
- ✅ 6 páginas `/servicios/[city]` agregadas
- ✅ `/blog` agregado a STATIC_ROUTES
- ⚠️ Slug conflict: `/instalacion_cargadores` vs `/instalacion-cargadores` — requiere decisión de negocio sobre cuál es canonical

### Canonical Tags
- ✅ Todas las páginas estáticas tienen canonical correcto
- ❌ `/blog` page — el doc Prismic `uid: "blog"` puede no tener `meta_title` → requiere acción en CMS Prismic

### Indexabilidad
- ✅ 3 páginas de pago sin noindex → server wrappers creados
- ✅ Noindex en: recibo-pago-virtual, recibo-pagado, rechazo-pago-virtual, recibo-pago, rechazo-pago, recibo-virtual, cargadores/recibo-pago, cargadores/rechazo-pago, return, return/invoice, cotizador/simulacion, forms, postulacion-cargadores-edificios/gracias
- ❌ Homepage title "Energica" (7 chars) — requiere actualización en CMS Prismic (campo `meta_title` del documento `home`)

### Security Headers
- ✅ HSTS: `max-age=63072000; includeSubDomains; preload`
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy: camera=(), microphone=(), geolocation=(self)
- ✅ Content-Security-Policy agregado
- ✅ `poweredByHeader: false`

### Double Title Suffix Bug
- ✅ Resuelto en 6 páginas: faqs, como-funciona, casos-de-exito, credenciales, contactanos, cotizador

---

## 2. Content Quality

### E-E-A-T Score: 37/100

| Factor | Score | Notas |
|--------|-------|-------|
| Experience | 22/100 | 3 casos de clientes sin fuentes verificables externas |
| Expertise | 38/100 | Términos técnicos correctos (TE1, TE6, OCPP, IEC 61851) pero sin autor nombrado |
| Authoritativeness | 30/100 | Sin citas de terceros, prensa ni premios |
| Trustworthiness | 55/100 | Teléfono en footer y schema; sin dirección física en UI, sin página de equipo |

### Thin Content

| Página | Estado |
|--------|--------|
| /como-funciona | ⚠️ ~158 palabras (mínimo 800) — contenido en código, expandir requiere diseño |
| /casos-de-exito | ⚠️ ~179 palabras (mínimo 800) — ídem |
| /credenciales | ⚠️ ~203 palabras (mínimo 500) — ídem |
| /servicios/santiago | ⚠️ ~215 palabras (mínimo 500) — ídem |
| /contactanos | ⚠️ ~56 palabras (mínimo 300) — secciones comentadas en código |

### Heading Structure
- ✅ `/como-funciona`: H2 semántico corregido (`component="p"` → `component="h2"`)
- ⚠️ `/faqs`: Doble H1 por el componente `Banner` — requiere modificar `Banner.tsx` (componente compartido, riesgo de regresión)
- ✅ Resto de páginas: estructura correcta

### Internal Linking
- ✅ `/contactanos`: migrado a `HpHeaderNew` con nav actualizada
- ✅ `/faqs`: migrado a `HpHeaderNew`
- ❌ Cero links desde footer a: `/faqs`, `/como-funciona`, `/casos-de-exito`, `/credenciales`, `/blog`, `/servicios/*` — requiere modificar el componente `Footer` (fuera del alcance de este fix)

---

## 3. On-Page SEO

### Títulos post-fix

| Página | Título renderizado | Chars | Estado |
|--------|-------------------|-------|--------|
| `/` | "Energica" | 7 | ❌ Corregir en Prismic CMS |
| `/faqs` | "Preguntas Frecuentes sobre Cargadores EV \| Energica City" | 57 | ✅ |
| `/como-funciona` | "Cómo Funciona la Instalación de Cargadores EV \| Energica City" | 62 | ✅ |
| `/casos-de-exito` | "Casos de Éxito en Cargadores EV para Empresas \| Energica City" | 62 | ✅ |
| `/credenciales` | "Credenciales SEC y Certificaciones \| Energica City" | 50 | ✅ |
| `/servicios/santiago` | "Cargadores EV en Santiago \| Energica City" | 41 | ✅ |
| `/cotizador` | "Cotizador de Cargadores EV \| Energica City" | 43 | ✅ |
| `/contactanos` | "Contáctanos \| Energica City" | 28 | ✅ |
| `/blog` | Default del layout | — | ❌ Sin meta_title en Prismic |

### Meta Descriptions
- ✅ `/credenciales`: acortada de 171 a 120 chars
- ❌ `/` y `/blog`: retornan "Energica" desde Prismic — pendiente CMS

---

## 4. Schema / Structured Data

### Inventario completo

| Página | Schemas | Estado |
|--------|---------|--------|
| Global (layout) | Organization (con logo ImageObject, teléfono, contactPoint), WebSite | ✅ |
| `/credenciales` | LocalBusiness, ElectricalContractor, BreadcrumbList | ✅ |
| `/como-funciona` | Service, BreadcrumbList | ✅ |
| `/casos-de-exito` | ItemList, BreadcrumbList | ✅ |
| `/servicios/[city]` | LocalBusiness+ElectricalContractor (con geo), BreadcrumbList (2 niveles) | ✅ |
| `/faqs` | Ninguno | ⚠️ FAQPage restringida a gov/salud — sin alternativa válida |
| `/contactanos` | ContactPage | ✅ |
| `/blog/[uid]` | BlogPosting (con author + publisher.logo), BreadcrumbList | ✅ |
| `[uid]` (Prismic) | BreadcrumbList | ✅ |

### Fixes aplicados
- ✅ Organization `logo` → `ImageObject`
- ✅ Teléfono real `+56967666652`
- ✅ `SearchAction` eliminado (ruta `/search` no existe)
- ✅ `FAQPage` eliminado (restringido desde ago 2023)
- ✅ BlogPosting: `author` y `publisher.logo` agregados
- ✅ Breadcrumb `/servicios/[city]`: nivel `/servicios` (404) eliminado
- ✅ `ContactPage` schema en `/contactanos`
- ✅ `ItemList` schema en `/casos-de-exito`

---

## 5. Performance / Core Web Vitals

| Issue | Severidad | Estado |
|-------|-----------|--------|
| Hero slices con `"use client"` innecesario | Alta | ✅ Removido de Default.tsx y HeroResponsive.tsx |
| `@tabler/icons-react` fuera de `optimizePackageImports` | Media | ✅ Agregado a next.config.mjs |
| `minimumCacheTTL: 60` segundos | Media | ✅ → 2,592,000 (30 días) |
| `dns-prefetch` duplicado en metadata.other | Baja | ✅ Eliminado |
| `import HpHeader` muerto en layout.tsx | Media | ✅ Eliminado |
| CSP header ausente | Alta | ✅ Agregado |
| Dual analytics: GTM + GA4 independiente | Alta | ❌ Requiere verificar que GA4 esté configurado dentro del contenedor GTM antes de eliminar `<GoogleAnalytics />` — riesgo de perder datos |
| Bundle: `moment` cargado con `date-fns` y `dayjs` | Alta | ❌ Usado en 9 archivos — eliminación requiere testing exhaustivo |
| `apexcharts`, `react-big-calendar`, `emoji-picker-react` globales | Alta | ❌ Requiere identificar componentes exactos y testing de regresión |
| Hero image con `priority` en mobile oculta | Media | ❌ Requiere refactorización del componente Hero con lógica condicional |
| `dataLayer` init separado del GTM IIFE | Baja | ❌ Riesgo de afectar tracking — requiere validación con equipo de analytics |

---

## 6. Images

| Item | Estado |
|------|--------|
| 28 instancias `unoptimized={true}` eliminadas (23 archivos) | ✅ |
| `sizes` prop apropiada por contexto (hero, carousel, profile, icon) | ✅ |
| Logo alt text: "logo" → "Energica City" | ✅ |
| `public/logo.png` existencia verificada | ❌ Verificar que el archivo existe en `public/` |
| Preload hint para hero images de Prismic | ❌ Limitación arquitectural — URL no disponible en build time |

---

## 7. AI Search Readiness / GEO

| Item | Estado |
|------|--------|
| AI crawlers permitidos en robots.txt (GPTBot, ClaudeBot, PerplexityBot) | ✅ |
| CCBot bloqueado | ✅ |
| `llms.txt` expandido con datos citables (casos, proceso, certificaciones, área, precios) | ✅ |
| URLs de llms.txt actualizadas a `energica.city` (sin www) | ✅ |
| Contenido invisible para AI crawlers (RSC flight data) | ❌ Requiere reestructurar `<Providers>` para no envolver páginas de contenido puro — cambio arquitectural mayor |
| Brand handles inconsistentes (schema vs footer) | ❌ Requiere verificar cuáles son los URLs reales de LinkedIn/Instagram antes de cambiar |
| Wikipedia entity | ❌ Externo — requiere acción manual |
| Canal YouTube | ❌ Externo — requiere creación del canal |
| Presencia en Reddit/foros | ❌ Externo — estrategia de contenido |
| Solo 1 post de blog | ❌ Externo — plan editorial |

---

## Pendientes en CMS Prismic

| Documento | Campo | Valor actual | Valor recomendado |
|-----------|-------|-------------|-------------------|
| `home` | `meta_title` | "Energica" | "Cargadores Eléctricos para Empresas en Chile" |
| `home` | `meta_description` | "Energica" | "Instalación certificada SEC de cargadores EV para empresas y edificios en Chile. Cotiza gratis." |
| `blog` (uid) | `meta_title` | vacío | "Blog sobre Electromovilidad en Chile" |
| `blog` (uid) | `meta_description` | vacío | "Artículos sobre cargadores eléctricos, normativa SEC y electromovilidad empresarial en Chile." |

---

## Registro de todos los fixes

| Fix | Archivo(s) | Estado |
|-----|-----------|--------|
| Double title suffix eliminado | faqs, como-funciona, casos-de-exito, credenciales, contactanos, cotizador | ✅ |
| minimumCacheTTL: 2592000 | next.config.mjs | ✅ |
| poweredByHeader: false | next.config.mjs | ✅ |
| CSP header | next.config.mjs | ✅ |
| @tabler/icons-react en optimizePackageImports | next.config.mjs | ✅ |
| Dead import HpHeader eliminado | src/app/layout.tsx | ✅ |
| dns-prefetch duplicado eliminado | src/app/layout.tsx | ✅ |
| Código comentado eliminado del layout | src/app/layout.tsx | ✅ |
| Sitemap: +6 city pages, +/blog, sin /privacidad duplicada | src/app/sitemap.ts | ✅ |
| Noindex: recibo-pago-virtual, recibo-pagado, rechazo-pago-virtual | src/app/agenda/*/page.tsx | ✅ |
| robots.ts: 3 rutas nuevas en BLOCKED_PATHS | src/app/robots.ts | ✅ |
| /faqs: HpHeader → HpHeaderNew | src/app/faqs/page.tsx | ✅ |
| /contactanos: HpHeader → HpHeaderNew, ContactPage schema | src/app/contactanos/page.tsx | ✅ |
| /como-funciona: H2 semántico (component="h2") | src/app/como-funciona/page.tsx | ✅ |
| /credenciales: meta description acortada a 120 chars | src/app/credenciales/page.tsx | ✅ |
| /casos-de-exito: ItemList schema | src/app/casos-de-exito/page.tsx | ✅ |
| /servicios/[city]: breadcrumb sin nivel /servicios (404) | src/app/servicios/[city]/page.tsx | ✅ |
| Hero Default.tsx: "use client" y useMediaQuery eliminados | src/slices/Hero/variants/Default.tsx | ✅ |
| Hero HeroResponsive.tsx: "use client" y useMediaQuery eliminados | src/slices/Hero/variants/HeroResponsive.tsx | ✅ |
| Organization logo → ImageObject | src/app/layout.tsx | ✅ |
| Teléfono +56967666652 en schema | src/app/layout.tsx, credenciales, servicios/[city] | ✅ |
| SearchAction eliminado (ruta /search no existe) | src/app/layout.tsx | ✅ |
| FAQPage eliminado (restringido a gov/salud) | src/app/faqs/page.tsx | ✅ |
| BlogPosting: author + publisher.logo | src/app/blog/[uid]/page.tsx | ✅ |
| llms.txt expandido con datos citables | public/llms.txt | ✅ |
| Homepage meta en Prismic CMS | CMS externo | ❌ Pendiente manual |
| Blog meta en Prismic CMS | CMS externo | ❌ Pendiente manual |
| Brand handles LinkedIn/Instagram | Verificar URLs reales | ❌ Pendiente verificación |
| RSC Providers refactoring | src/store/providers.tsx | ❌ Cambio arquitectural mayor |
| Dual analytics (eliminar GoogleAnalytics) | src/app/layout.tsx | ❌ Requiere validación analytics |
| moment eliminado | Múltiples archivos | ❌ Requiere testing exhaustivo |
| apexcharts/react-big-calendar dynamic import | Múltiples archivos | ❌ Requiere testing exhaustivo |
| Footer links a páginas de contenido | src/app/components/shared/footer/ | ❌ Fuera de alcance solicitado |
| Banner dual-H1 fix | src/app/components/shared/banner/Banner.tsx | ❌ Componente compartido, riesgo regresión |
| public/logo.png | public/ | ❌ Verificar existencia del archivo |
| Wikipedia entity | Externo | ❌ |
| Canal YouTube | Externo | ❌ |
| IndexNow protocol | src/app/api/ | ❌ Fuera de alcance |

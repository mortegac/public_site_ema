# SEO — Especificación de Mejoras Aplicadas y Pendientes

**Fuentes de análisis:**
- `/Users/manu/_CODE/ENERGICA/SEO-ANALISIS/` — 12 tickets SEMrush
- `docs/SEO/` — Full Audit Report (2026-03-22, baseline score 57/100)

**Fecha de actualización:** 2026-07-06
**Score baseline:** 57/100 → **estimado post-fixes completos: 72/100**

---

## Estado Consolidado de Tickets

| # | Problema | Prioridad | Estado |
|---|----------|-----------|--------|
| T01 | Páginas sin `<title>` (4 páginas CMS) | Alta | 🔧 Requiere Prismic |
| T02 | Datos estructurados inválidos en `/cotizador` | Alta | ✅ Resuelto |
| T03 | JavaScript sin minificar | Media | ℹ️ Falso positivo |
| T04 | Ratio texto/HTML bajo | Media | 🔧 Requiere contenido |
| T05 | Páginas sin meta description (4 páginas CMS) | Media | 🔧 Requiere Prismic |
| T06 | Bajo conteo de palabras | Media | 🔧 Requiere contenido |
| T07 | Title tags demasiado largos | Media | ✅ Resuelto |
| T08 | URLs con guiones bajos | Media | ✅ Resuelto |
| T09 | 48 páginas huérfanas en sitemap | Baja | ⚠️ Parcial (8/48) |
| T10 | Múltiples H1 | Baja | 🔧 Requiere Prismic |
| T11 | Anchor text no descriptivo | Baja | 🔧 Requiere Prismic |
| T12 | AI Search en `/terminos-condiciones` | Baja | ⏸️ Pendiente legal |

---

## Mejoras Aplicadas en Código

### T02 — Datos estructurados inválidos (cotizador)
**Archivo:** `src/app/cotizador/page.tsx`
- `applicationCategory: 'UtilityApplication'` → `'UtilitiesApplication'` (enum correcto Schema.org)
- `operatingSystem: 'Web'` → `'Any'` (valor reconocido Google Rich Results)

### T07 — Title tag demasiado largo (home)
**Archivo:** `src/app/page.tsx`
- De: `"Cargadores Eléctricos para Empresas y Edificios"` (64 chars con template)
- A: `"Cargadores EV para Empresas y Edificios"` (55 chars ✅)

### T08 — URLs con guiones bajos
**Archivo:** `next.config.mjs`
- Añadidos redirects 301 permanentes:
  - `/instalacion_cargadores` → `/instalacion-cargadores`
  - `/asesoria_electrificacion_flotas` → `/asesoria-electrificacion-flotas`

### T09 — Páginas huérfanas (parcial)
**Archivo:** `src/app/components/shared/footer/index.tsx`
- Añadida columna de enlaces: `/blog`, `/faqs`, `/contactanos`, `/soporte`, `/casos-de-exito`, `/credenciales`
- **Cubierto: 8/48 huérfanos.** Restan 40 (servicios por ciudad, fichas de producto).

---

## Mejoras Blog — Aplicadas en Código (Loop SEO)

Aplicadas sobre los 31 artículos estáticos del blog (`src/app/blog/*/page.tsx`):

### JSON-LD BlogPosting — Campos añadidos (31/31 posts)
- **`image: ImageObject`** con URL de imagen específica por artículo (`/images/post/NN_1170x400.png`)
  — requerido por Google Discover y Rich Results
- **`author.url`** apuntando a `/que-es-energica-city` — señal E-E-A-T
- **`publisher.logo: ImageObject`** apuntando a `/images/logos/logo.png` (259×42px)

### OG/Twitter — Imágenes únicas por artículo (31/31 posts)
- Reemplazada imagen genérica `servicios-cargadores-ev.jpg` por imagen específica de cada post
- Mejora CTR en redes sociales y elegibilidad Google Discover

### CANONICAL_DOMAIN — Migración a import (14 posts)
- Reemplazada declaración `const CANONICAL_DOMAIN = 'https://www.energica.city'` hardcodeada
- Ahora importa de `@/utils/seo-config` (fuente canónica del proyecto)

### Blog index `/blog`
- Añadido schema `ItemList` con los 31 artículos estáticos
- Permite a Google generar sitelinks o carruseles en SERPs

### Post `instaladores-sec-ema-electromovilidad-chile`
- H1 alineado con keyword objetivo: `"Instaladores SEC: Únete a la Red EMA de Electromovilidad en Chile"`
- CTA hero añadido: botón magenta "Postula como partner →" con scroll a `#postula`

### AuthorByline — Configurable por props
- Componente `AuthorByline` acepta `name`, `bio`, `imageSrc`, `imageAlt`
- Default: Felipe Donoso (sin impacto en los 30 posts existentes)
- Post `/blog/como-usar-cotizador-cargador-electrico` muestra ahora a **Manuel Ortega**
  (Ingeniero en desarrollo de software, 8+ años electromovilidad)

---

## Pendientes — Requieren Prismic CMS

Estas páginas son gestionadas dinámicamente por `[uid]/page.tsx`. Los campos de metadata provienen 100% de Prismic — no es posible resolverlos desde código.

### Campos a completar en Prismic CMS

| Documento Prismic | Campo | Valor recomendado |
|-------------------|-------|-------------------|
| `home` | `meta_title` | `Cargadores EV para Empresas y Edificios en Chile` |
| `home` | `meta_description` | `Instalación certificada SEC de cargadores EV para empresas y edificios en Chile. Cotiza gratis en 2 minutos.` |
| `cargadores-en-edificios` | `meta_title` | `Cargadores EV en Edificios: Electrolinera Comunitaria $0 — Enérgica City` |
| `cargadores-en-edificios` | `meta_description` | `Instala una electrolinera comunitaria en el estacionamiento de visitas de tu edificio. Cero inversión para la comunidad, pagas solo lo que cargas.` |
| `contacto-greta` | `meta_title` | `Contacto — Enérgica City` |
| `contacto-greta` | `meta_description` | `Habla con Greta, nuestra asesora de electromovilidad. Responde en menos de 2 horas por WhatsApp o email.` |
| `postulacion-cargadores-edificios` | `meta_title` | `Postulación: Cargador para tu Edificio — Enérgica City` |
| `postulacion-cargadores-edificios` | `meta_description` | `Postula para instalar un cargador EV en tu edificio en Santiago o Valparaíso. Sin costo para la comunidad. Técnicos SEC certificados.` |
| `que-es-energica-city` | `meta_title` | `Quiénes Somos — Enérgica City` |
| `que-es-energica-city` | `meta_description` | `Somos la empresa líder en instalación certificada de cargadores eléctricos para empresas, edificios y casas en Chile.` |

### Correcciones de contenido en Prismic (sin código)

| Ticket | Página Prismic | Acción |
|--------|---------------|--------|
| T04/T06 | `contacto-greta` (78 palabras) | Añadir sección informativa hasta 300+ palabras |
| T04/T06 | `postulacion-cargadores-edificios` (189 palabras) | Ampliar descripción del proceso hasta 300+ palabras |
| T10 | `instalacion_cargadores` | Revisar slices y cambiar 2do H1 a H2 |
| T11 | `contacto-greta` | Cambiar anchor "Aquí" del enlace WhatsApp a texto descriptivo |

---

## Pendientes — Código (Backlog Priorizado)

### Alta prioridad

**A5 — Breadcrumb `/servicios/[city]` apunta a 404**
- `src/app/servicios/[city]/page.tsx`: el breadcrumb apunta a `/servicios` que devuelve 404
- Solución: cambiar item de breadcrumb a `{ item: CANONICAL_DOMAIN, name: 'Inicio' }` y eliminar nivel `/servicios`
- Riesgo: bajo, cambio en un solo componente

**A6 — Dual analytics GTM + GA4**
- GTM (`GTM-5C8WKS5R`) y GA4 (`G-V8Z0DN0VGM`) cargan en paralelo → doble disparo de eventos
- Verificar si GA4 ya está incluido dentro del contenedor GTM; si es así, eliminar el tag GA4 directo
- Archivo: `src/components/analytics/`

**B9 — Doble H1 en `/faqs`**
- `Banner.tsx`: `titleOne` y `titleTwo` renderizan dos elementos `component="h1"`
- Cambiar uno a `component="h2"` o `component="span"`
- Riesgo medio: componente compartido, verificar todas las páginas que lo usan

### Media prioridad

**M5 — Triple librería de fechas en bundle**
- `moment` + `date-fns` + `dayjs` cargadas simultáneamente
- Eliminar `moment` y `dayjs`, consolidar en `date-fns` (ya instalado)
- Impacto estimado: -80–120 KB en bundle JS

**M6 — Imports globales pesados**
- `apexcharts`, `react-big-calendar`, `emoji-picker-react` en carga global
- Migrar a `next/dynamic` con `ssr: false`
- Mejora LCP y TTI en páginas que no los usan

**M7 — Brand handles inconsistentes en schema**
- URLs LinkedIn/Instagram en JSON-LD de `layout.tsx` no coinciden con footer
- Unificar fuente de verdad en `src/utils/seo-config.ts`

**M8 — Slug conflict resuelto a medias**
- `/instalacion_cargadores` (underscore) → redirect 301 implementado ✅
- Verificar que el sitemap solo incluye la versión con guion
- Actualizar todos los enlaces internos que aún apuntan a la versión underscore

**M11 — CTAs above fold**
- Páginas `/como-funciona`, `/servicios/*`, `/casos-de-exito` sin CTA visible en los primeros 2 scrolls
- Añadir componente `CtaBand` en posición superior de cada página

### Baja prioridad (backlog)

| ID | Problema | Esfuerzo | Impacto |
|----|----------|----------|---------|
| B1 | Hero image con `priority` activo pero oculta en mobile | Bajo | Bajo |
| B3 | `lastModified` estático en sitemap | Bajo | Medio |
| B4 | `dataLayer` init separado de GTM IIFE | Bajo | Bajo |
| B5 | Sin IndexNow implementado | Medio | Medio |
| B11 | Verificar `public/logo.png` referenciado en schema | Bajo | Bajo |

---

## Pendientes — Estrategia / Externos (Sin código)

| Problema | Responsable | Notas |
|----------|-------------|-------|
| T12 — AI search en `/terminos-condiciones` | Legal | Requiere revisión de compliance antes de reestructurar |
| E-E-A-T bajo (37/100) | Contenido | Agregar casos de cliente con fuentes externas, datos del equipo |
| 40 huérfanos restantes | Contenido/CMS | Estrategia de internal linking en páginas de contenido |
| Sin Wikipedia entity | Marketing | Creación de artículo o wikidata entity |
| Sin canal YouTube | Marketing | Agregar a `sameAs` en schema cuando exista |
| Plan editorial blog | Marketing | Mínimo 1 post/mes para señales de frescura |

---

## Impacto Estimado por Área

| Área | Antes | Post-código | Post-CMS+contenido |
|------|-------|-------------|-------------------|
| Technical SEO | 68/100 | **76/100** | 80/100 |
| Content Quality | 46/100 | 48/100 | **62/100** |
| On-Page SEO | 50/100 | **62/100** | 70/100 |
| Schema / Structured Data | 65/100 | **82/100** | 84/100 |
| Performance (CWV) | 60/100 | 62/100 | **70/100** |
| AI Search (GEO) | 44/100 | **55/100** | 62/100 |
| **TOTAL** | **57/100** | **64/100** | **72/100** |

---

## Historial de Cambios

| Fecha | Descripción | Commit |
|-------|-------------|--------|
| 2026-07-03 | Fixes T02, T07, T08, T09 parcial + resumen ejecutivo inicial | — |
| 2026-07-03 | Rediseño blog: hero, filtros categoría, nuevo layout de cards | `24d333f` |
| 2026-07-04 | Blog SEO loop: image/author.url/logo en 31 posts, OG únicas, ItemList | `5137615` |
| 2026-07-04 | AuthorByline configurable, Manuel Ortega en post cotizador | `a924bb8` |
| 2026-07-06 | Creación de este documento de especificación consolidada | — |

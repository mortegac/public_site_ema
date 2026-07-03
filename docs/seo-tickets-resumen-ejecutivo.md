# Resumen Ejecutivo — Tickets SEO

**Fuente:** `/Users/manu/_CODE/ENERGICA/SEO-ANALISIS/` (12 tickets)
**Fecha:** 2026-07-03
**Build:** ✅ sin errores tras todos los cambios

---

## Tickets resueltos en código

### Ticket 02 — Datos estructurados inválidos (Alta prioridad)
**Archivo:** `src/app/cotizador/page.tsx`

Dos campos incorrectos en el schema JSON-LD tipo `WebApplication`:
- `applicationCategory: 'UtilityApplication'` → **`'UtilitiesApplication'`** (enum correcto de Schema.org)
- `operatingSystem: 'Web'` → **`'Any'`** (valor reconocido por Google Rich Results)

### Ticket 07 — Title tag demasiado largo (Media prioridad)
**Archivo:** `src/app/page.tsx`

El root layout aplica el template `'%s | Energica City'` (+16 chars). El título anterior `"Cargadores Eléctricos para Empresas y Edificios"` (48 chars) resultaba en 64 chars totales.

Nuevo título: **`"Cargadores EV para Empresas y Edificios"`** → 39 + 16 = **55 chars** (dentro del límite de 60).

### Ticket 08 — URLs con guiones bajos (Media prioridad)
**Archivo:** `next.config.mjs`

Añadida función `async redirects()` con dos reglas 301 permanentes:
- `/instalacion_cargadores` → `/instalacion-cargadores`
- `/asesoria_electrificacion_flotas` → `/asesoria-electrificacion-flotas`

### Ticket 09 — Páginas huérfanas (Baja prioridad, parcial)
**Archivos:** `src/app/components/shared/footer/index.tsx`

Se añadió una segunda columna en el footer con 6 páginas que estaban huérfanas en el sitemap:
- `/blog`, `/faqs`, `/contactanos`, `/soporte`, `/casos-de-exito`, `/credenciales`

Además se corrigieron los links del footer existentes para usar URLs con guiones (en lugar de guiones bajos), beneficiando también el Ticket 08.

**Páginas huérfanas resueltas: ~8 de 48.** Las restantes (páginas de servicio por ciudad `/servicios/*` y fichas de producto `/ficha-*`) requieren una estrategia de internal linking más profunda en las páginas de contenido, idealmente gestionada desde Prismic CMS.

---

## Tickets que requieren acción en Prismic CMS

Estas páginas son gestionadas por `[uid]/page.tsx` que delega title, description y contenido 100% a Prismic CMS. No es posible resolverlos desde código.

| Ticket | Prioridad | Acción en Prismic |
|--------|-----------|-------------------|
| **01** — Páginas sin `<title>` | Alta | Completar campo `meta_title` en: `cargadores-en-edificios`, `contacto-greta`, `postulacion-cargadores-edificios`, `que-es-energica-city` |
| **05** — Páginas sin meta description | Media | Completar campo `meta_description` en las mismas 4 páginas (120–160 chars) |
| **04** — Ratio texto/HTML bajo | Media | Añadir contenido textual visible en las páginas afectadas (en slices de Prismic) |
| **06** — Bajo conteo de palabras | Media | Expandir contenido de `contacto-greta` (78 palabras), `cotizador` (73), `instalacion_cargadores` (131), `postulacion-cargadores-edificios` (189) a 300+ palabras |
| **10** — Múltiples H1 | Baja | Revisar slices de la página `instalacion_cargadores` en Prismic y cambiar el segundo H1 a H2 |
| **11** — Anchor text no descriptivo | Baja | El link de WhatsApp con anchor "Aquí" en `/contacto-greta` está en el contenido rich text de Prismic. Actualizar texto a "Contáctanos por WhatsApp" |

---

## Tickets informativos / fuera del alcance del código

| Ticket | Resolución |
|--------|------------|
| **03** — JS/CSS sin minificar | Next.js minifica automáticamente en producción (`npm run build`). Si persiste el warning en SEMrush, es un falso positivo por análisis del HTML pre-compresión. No requiere cambios en código. |
| **09** — 48 páginas huérfanas (resto) | Las 40 páginas restantes (servicios por ciudad, fichas de producto) necesitan internal links desde páginas de contenido. Estrategia recomendada: agregar sección "Servicios en tu ciudad" en el cotizador o en la home (Prismic). |
| **12** — Optimización AI search en `/terminos-condiciones` | Contenido legal. Requiere revisión de Compliance antes de reestructurar. No se realizaron cambios. |

---

## Resumen de impacto

| # | Ticket | Estado |
|---|--------|--------|
| 02 | Datos estructurados inválidos | ✅ Resuelto en código |
| 07 | Title tag largo en home | ✅ Resuelto en código |
| 08 | URLs con guiones bajos | ✅ Resuelto en código (redirects 301) |
| 09 | Páginas huérfanas | ⚠️ Parcialmente resuelto (8/48 en footer) |
| 01 | Páginas sin title | 🔧 Requiere Prismic CMS |
| 04 | Ratio texto/HTML bajo | 🔧 Requiere Prismic CMS / contenido |
| 05 | Páginas sin meta description | 🔧 Requiere Prismic CMS |
| 06 | Bajo conteo de palabras | 🔧 Requiere Prismic CMS / contenido |
| 10 | Múltiples H1 | 🔧 Requiere Prismic CMS |
| 11 | Anchor text no descriptivo | 🔧 Requiere Prismic CMS |
| 03 | JS/CSS sin minificar | ℹ️ No aplica (falso positivo) |
| 12 | AI search en T&C | ⏸️ Pendiente revisión legal |

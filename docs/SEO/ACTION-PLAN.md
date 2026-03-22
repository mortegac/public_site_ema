# ACTION PLAN — SEO Energica City

**Generado:** 2026-03-22
**Score actual:** 57/100 (baseline: 39/100)

---

## CRÍTICOS — Acción inmediata

| # | Issue | Archivo / Acción | Estado |
|---|-------|-----------------|--------|
| C1 | Double title suffix `\| Energica City \| Energica City` en 6 páginas | Quitado `\| Energica City` de faqs, como-funciona, casos-de-exito, credenciales, contactanos, cotizador | ✅ RESUELTO |
| C2 | Homepage `<title>Energica</title>` — 7 chars desde Prismic CMS | **Actualizar en Prismic** → doc `home` → campo `meta_title` y `meta_description` | ⏳ PENDIENTE CMS |
| C3 | 3 páginas de pago indexables sin noindex | Server wrappers creados con `robots: { index: false }` | ✅ RESUELTO |
| C4 | Contenido invisible para AI crawlers (RSC flight data) | Reestructurar `<Providers>` para no envolver páginas de contenido puro | ⏳ PENDIENTE |

---

## ALTOS — Esta semana

| # | Issue | Archivo | Estado |
|---|-------|---------|--------|
| A1 | `/faqs` usaba `HpHeader` antiguo (nav diferente) | `src/app/faqs/page.tsx` | ✅ RESUELTO |
| A2 | `/servicios/[city]` no estaban en sitemap | `src/app/sitemap.ts` | ✅ RESUELTO |
| A3 | `/privacidad` duplicada en sitemap | `src/app/sitemap.ts` | ✅ RESUELTO |
| A4 | `/blog` sin canonical emitido | Verificar doc Prismic `uid: "blog"` tiene meta_title | ⏳ PENDIENTE CMS |
| A5 | Breadcrumb de ciudades apunta a `/servicios` (404) | Crear `src/app/servicios/page.tsx` o quitar nivel del breadcrumb | ⏳ PENDIENTE |
| A6 | Dual analytics: GTM + GA4 independiente | Eliminar `<GoogleAnalytics />` de `src/app/layout.tsx` | ⏳ PENDIENTE |
| A7 | `minimumCacheTTL: 60` segundos | `next.config.mjs` | ✅ RESUELTO |
| A8 | `/credenciales` sin CTA de conversión | Agregar link a `/cotizador` al final de la página | ⏳ PENDIENTE |

---

## MEDIOS — Este mes

| # | Issue | Archivo | Estado |
|---|-------|---------|--------|
| M1 | Zero internal links a páginas nuevas | Agregar a footer: /faqs, /blog, /casos-de-exito, /credenciales, /como-funciona | ⏳ PENDIENTE |
| M2 | Hero slices con `"use client"` innecesario | `src/slices/Hero/variants/Default.tsx` y `HeroResponsive.tsx` | ⏳ PENDIENTE |
| M3 | `import HpHeader` muerto en `layout.tsx` línea 8 | `src/app/layout.tsx` | ⏳ PENDIENTE |
| M4 | `@tabler/icons-react` no en `optimizePackageImports` | `next.config.mjs` | ⏳ PENDIENTE |
| M5 | `moment` cargado junto a `date-fns` y `dayjs` | `package.json` — eliminar `moment` | ⏳ PENDIENTE |
| M6 | `apexcharts`, `react-big-calendar`, `emoji-picker-react` globales | `next/dynamic` con `ssr: false` donde se usen | ⏳ PENDIENTE |
| M7 | Brand handles inconsistentes (schema vs footer) | `src/app/layout.tsx` línea 95-96 + `src/app/components/shared/footer/index.tsx` | ⏳ PENDIENTE |
| M8 | `/instalacion_cargadores` vs `/instalacion-cargadores` (slug conflict) | Redirigir uno, 301, eliminar del sitemap | ⏳ PENDIENTE |
| M9 | `X-Powered-By: Next.js` visible | `next.config.mjs` | ✅ RESUELTO |
| M10 | `llms.txt` sin datos citables | `public/llms.txt` — agregar casos, proceso, certificaciones, geo | ⏳ PENDIENTE |
| M11 | CTAs below fold en todas las páginas de contenido | Agregar CTA en la intro de como-funciona, servicios/*, casos-de-exito | ⏳ PENDIENTE |
| M12 | `/como-funciona` H2 semántico faltante (línea 55) | Cambiar `component="p"` → `component="h2"` | ⏳ PENDIENTE |

---

## BAJOS — Backlog

| # | Issue | Acción |
|---|-------|--------|
| B1 | Hero image con `priority` activo pero oculta en mobile | Condicionar `priority` o ajustar `sizes` |
| B2 | `dns-prefetch` duplicado en metadata.other y `<head>` | Eliminar de `metadata.other` en layout.tsx |
| B3 | `lastModified` estático en todas las rutas del sitemap | Actualizar fecha en cada cambio de contenido |
| B4 | `dataLayer` init separado del GTM IIFE | Fusionar en un solo script |
| B5 | No hay IndexNow implementado | Key file en `/public/` + ping en webhook de Prismic |
| B6 | Sin Wikipedia entity | Crear artículo de empresa |
| B7 | Sin canal YouTube | Crear canal y agregar a `sameAs` |
| B8 | Solo 1 post de blog | Plan editorial: 1 post/mes mínimo |
| B9 | Banner dual-H1 (titleOne + titleTwo) en `/faqs` | `Banner.tsx` — cambiar inner Typography a `component="span"` |
| B10 | `/credenciales` meta description 171 chars (>160) | Acortar a < 155 chars |
| B11 | `logo.png` en `public/` — verificar que existe | `public/logo.png` |
| B12 | No hay Content-Security-Policy | Agregar CSP a headers en `next.config.mjs` |

---

## Pendientes en CMS Prismic (no código)

| Página | Campo | Valor actual | Valor recomendado |
|--------|-------|-------------|-------------------|
| `home` | `meta_title` | "Energica" | "Cargadores Eléctricos para Empresas en Chile" |
| `home` | `meta_description` | "Energica" | "Instalación certificada SEC de cargadores EV para empresas y edificios en Chile. Cotiza gratis." |
| `blog` (uid) | `meta_title` | vacío | "Blog sobre Electromovilidad en Chile" |
| `blog` (uid) | `meta_description` | vacío | "Artículos sobre cargadores eléctricos, normativa SEC y electromovilidad empresarial en Chile." |

---

## Progresión de score estimada

| Fase | Fixes | Score estimado |
|------|-------|---------------|
| Baseline (original) | — | 39/100 |
| Implementación inicial SEO | Fases 1-6 del plan | 57/100 |
| Quick wins (2026-03-22) | 7 fixes | 62/100 |
| Fix CMS Prismic + RSC providers | C2, C4 | 68/100 |
| Fixes medios completados | M1-M12 | 75/100 |
| Backlog completado | B1-B12 | 82/100 |

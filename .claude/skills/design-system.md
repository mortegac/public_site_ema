---
name: design-system
description: >
  Enforces the Enérgica City design system when building or modifying UI components.
  Use when creating new pages, components, sections, or modifying existing interfaces.
  Reads DESIGN.md as the source of truth for colors, typography, spacing, and component patterns.
---

# Enérgica City Design System Skill

This skill ensures all UI work follows the design system defined in `DESIGN.md` at the project root.

## Mandatory First Step

Before writing any UI code, read `DESIGN.md`:

```bash
cat DESIGN.md
```

Use its YAML tokens and component examples as the authoritative reference.

## Core Rules

### Colors — use exact hex values from DESIGN.md
- **CTA buttons**: `bgcolor: '#e81a68'`, hover `'#c01556'` — always magenta, never teal.
- **Hero gradient**: `background: 'linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)'`
- **Hero text**: `color: '#000000'` — black on teal gradient, not white.
- **Stats values**: `color: '#0898b9'` (teal).
- **Dark sections**: `bgcolor: '#0F172A'`, text `color: '#fff'`.
- **Surface alternation**: sections alternate `#ffffff` / `#F8FAFC`.
- **Text muted**: `'#64748B'`.

### Typography — Plus Jakarta Sans
- h1: `fontWeight: 800` on heroes, `fontWeight: 700` on articles.
- h2/h3: `fontWeight: 700` / `fontWeight: 600`.
- Body in articles: `fontSize: '1.05rem', lineHeight: 1.8`.

### MUI v7 Grid — critical
Always use `size={{ xs: N, sm: N, md: N }}`. NEVER use `item xs={N}`.

```tsx
// ✅ CORRECT
<Grid size={{ xs: 12, sm: 6, md: 4 }}>

// ❌ WRONG — breaks build
<Grid item xs={12} sm={6} md={4}>
```

### Spacing — MUI sx scale (1 = 8px)
- Section padding: `py: { xs: 7, md: 10 }` (56px / 80px).
- Card padding: `p: 3` (24px).
- Gap between cards: `gap: 4` (32px).

### Border radius
- Cards: `borderRadius: 2` (16px).
- Buttons primary: `borderRadius: 2`.
- Buttons secondary/small: `borderRadius: 1.5`.
- Card accent bar top: `borderRadius: "8px 8px 0 0"`.

## Standard Page Structure for Articles/Landing Pages

```tsx
<>
  {/* JSON-LD schemas */}
  <HpHeaderNew />
  <Box component="main">
    {/* 1. Hero — teal gradient, black text, magenta CTA */}
    {/* 2. Stats bar — #F8FAFC bg, 3 teal metrics */}
    {/* 3. Content H2 sections — alternate white/#F8FAFC */}
    {/* 4. Comparison table (if applicable) */}
    {/* 5. FAQ section */}
    {/* 6. Author byline — left teal border */}
    {/* 7. Dark CTA band — #0F172A, two white cards */}
  </Box>
</>
```

## Required Schemas for SEO/GEO

All new pages must include:

```tsx
// BlogPosting (articles)
const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  author: { '@type': 'Person', name: 'Felipe Donoso', jobTitle: 'Ingeniero Eléctrico, Enérgica City' },
  publisher: { '@type': 'Organization', name: 'Enérgica City', url: 'https://www.energica.city' },
}

// FAQPage (GEO — always 3+ Q&A)
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...] }

// BreadcrumbList (navigation)
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', ... }
```

## CTAs — always link to these routes
- Primary conversion: `/cotizador` ("Cotizar instalación →")
- Secondary conversion: `/agenda` ("Agendar visita gratuita")
- Supporting: `/instalacion-cargadores`, `/asesoria-electrificacion-flotas`

## Validation Checklist

Before marking UI work complete:
- [ ] Read `DESIGN.md` before starting
- [ ] All colors match DESIGN.md palette
- [ ] Hero uses teal gradient + black text + magenta CTA
- [ ] Grid uses `size={{ xs, sm }}` not `item xs=`
- [ ] Dark CTA band at end of page
- [ ] JSON-LD schemas included (BlogPosting/FAQPage/BreadcrumbList)
- [ ] Sections alternate `#ffffff` / `#F8FAFC`
- [ ] Stats use `color: '#0898b9'`, `fontWeight: 800`
- [ ] No `textTransform: uppercase` on buttons

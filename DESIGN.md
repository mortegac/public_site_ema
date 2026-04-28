---
version: alpha
name: Enérgica City
description: Sistema de diseño para la plataforma web de Enérgica City, empresa chilena líder en electromovilidad. El estilo combina energía técnica con confianza profesional — teal eléctrico como acento de autoridad, magenta como llamada a la acción.

colors:
  primary: "#e81a68"
  primary-dark: "#c01556"
  secondary: "#0898b9"
  secondary-dark: "#0777a0"
  secondary-light: "#4dbfd9"
  dark: "#0F172A"
  surface: "#F8FAFC"
  surface-alt: "#ffffff"
  muted: "#64748B"
  border: "#E2E8F0"
  success: "#00C47C"
  success-light: "#EAFAF4"
  error: "#FA896B"
  warning: "#FFAE1F"
  info: "#539BFF"
  text-primary: "#2A3547"
  text-secondary: "#64748B"
  text-inverse: "#ffffff"
  overlay-dark: "rgba(0,0,0,0.08)"

typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 1.25
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.4
  h4:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.3125rem
    fontWeight: 600
    lineHeight: 1.6
  h5:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.6
  h6:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.2
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.05rem
    fontWeight: 400
    lineHeight: 1.8
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.334rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1rem
  label:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1rem
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: 700
    lineHeight: 1

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  section-y-mobile: 56px
  section-y-desktop: 80px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
    hoverBackgroundColor: "{colors.primary-dark}"
    typography: "{typography.button}"
    borderRadius: "{rounded.md}"
    paddingX: 32px
    paddingY: 12px
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    borderColor: "{colors.primary}"
    hoverBackgroundColor: "{colors.primary}"
    hoverTextColor: "{colors.text-inverse}"
    typography: "{typography.button}"
    borderRadius: "{rounded.md}"
  hero-gradient:
    background: "linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)"
    textColor: "#000000"
  card:
    backgroundColor: "{colors.surface-alt}"
    borderRadius: "{rounded.lg}"
    shadow: "0 2px 8px rgba(0,0,0,0.08)"
    hoverShadow: "0 4px 20px rgba(0,0,0,0.14)"
    padding: 24px
    accentBar: "linear-gradient(90deg, #0898b9 0%, #4dbfd9 100%)"
  stat-highlight:
    valueColor: "{colors.secondary}"
    valueFontSize: 3rem
    valueFontWeight: 800
    labelColor: "{colors.muted}"
  section-dark:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.text-inverse}"
  section-surface:
    backgroundColor: "{colors.surface}"
  chip-category:
    backgroundColor: "#e0f4fa"
    textColor: "#0777a0"
    fontWeight: 600
    fontSize: 0.7rem
---

# Enérgica City — Design System

## Overview

**Energía técnica. Confianza industrial. Claridad chilena.**

Enérgica City es una empresa B2B/B2C de electromovilidad. El diseño debe transmitir:

- **Autoridad técnica**: los usuarios confían en nosotros para instalar infraestructura eléctrica certificada SEC.
- **Accesibilidad**: el contenido técnico debe ser claro para propietarios residenciales, administradores de edificios y gerentes de flota.
- **Energía y movimiento**: el teal/cyan evoca electricidad y modernidad; el magenta señala acción.
- **Confianza local**: contexto chileno explícito — precios en CLP, normativa SEC, MTT, trámites TE6.

El tono visual es **serio pero dinámico**, nunca clínico ni genérico.

## Colors

La paleta tiene dos ejes: **teal para identidad/autoridad** y **magenta para conversión**.

- **Primary `#e81a68` (Magenta Enérgica):** Color exclusivo para CTAs, botones de acción y elementos que requieren clic. Nunca decorativo — siempre funcional. Hover: `#c01556`.
- **Secondary `#0898b9` (Teal Eléctrico):** Color de identidad de marca. Se usa en gradientes de hero, barras de acento superior en cards, iconos de proceso, y estadísticas de impacto. Gradiente hero: `linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)`.
- **Dark `#0F172A`:** Fondo para secciones de CTA finales y footers. Texto blanco sobre este fondo.
- **Surface `#F8FAFC`:** Fondo alternado en secciones de contenido. Alterna con `#ffffff` para crear ritmo visual sin bordes.
- **Muted `#64748B`:** Texto secundario, captions, metadata. Nunca para títulos.
- **Success `#00C47C`:** Indicadores positivos, ahorros, métricas verdes en el Comparador.
- **Text Primary `#2A3547`:** Color base para todo el cuerpo de texto.

**Regla de contraste**: El texto negro `#000000` se usa sobre el gradiente teal del hero (no blanco) para máxima legibilidad. El blanco se usa sobre `#0F172A` (dark sections).

## Typography

**Fuente principal**: Plus Jakarta Sans (Google Fonts, pesos 300–700).
**Fuente fallback**: Inter → Helvetica → Arial → sans-serif.

El sistema tipográfico usa jerarquía de peso más que de tamaño para crear densidad visual controlada:

- **H1** (2.25rem, 700): Solo una vez por página. Hero title o artículo. En hero, texto negro sobre gradiente teal.
- **H2** (1.875rem, 700): Títulos de sección. Definen bloques de contenido.
- **H3** (1.5rem, 600): Subsecciones, títulos de cards, features dentro de secciones.
- **Body-lg** (1.05rem, 400, lh 1.8): Párrafos de artículos y contenido educativo extenso.
- **Body-md** (0.875rem, 400): Texto UI estándar, descripciones de cards.
- **Label** (0.75rem, 600): Chips de categoría, captions, metadata de fecha.

Los botones usan `fontWeight: 700` y `textTransform: none` (no uppercase).

## Layout & Spacing

El layout usa el sistema de espaciado de MUI v7 con base 8px:

- **Secciones verticales**: `py: { xs: 7, md: 10 }` = 56px / 80px.
- **Container**: `maxWidth="lg"` (1200px) para contenido principal, `maxWidth="md"` (900px) para contenido centrado (hero, artículo).
- **Grid**: Sistema de 12 columnas MUI. Breakpoints: xs 0px / sm 600px / md 900px / lg 1200px / xl 1536px.
- **Alternancia de fondos**: Las secciones alternan entre `#ffffff` y `#F8FAFC` sin separadores visuales.
- **Gap entre cards**: `gap: 4` (32px).

**Patrón de sección estándar**:
```tsx
<Box sx={{ bgcolor: '#F8FAFC', py: { xs: 7, md: 10 } }}>
  <Container maxWidth="lg">
    <Typography variant="h2" sx={{ fontWeight: 700, mb: 5 }}>...</Typography>
    {/* contenido */}
  </Container>
</Box>
```

## Elevation & Depth

Las sombras son sutiles y funcionales, nunca decorativas:

- **Card en reposo**: `0 2px 8px rgba(0,0,0,0.08)` — leve elevación.
- **Card en hover**: `0 4px 20px rgba(0,0,0,0.14)` — transición suave `0.2s`.
- **Sin sombras en secciones**: Los bloques de contenido no tienen sombra — el contraste de fondo crea la separación.

## Shapes

- **Cards**: `borderRadius: 2` (16px en escala MUI) con sombra suave.
- **Botones**: `borderRadius: 2` (16px) para botones principales, `borderRadius: 1.5` (12px) para secundarios.
- **Chips**: `borderRadius: full` (9999px).
- **Barras de acento en cards**: banda de 4px arriba con gradiente teal, `borderRadius: "8px 8px 0 0"`.

## Components

### Hero Section

```tsx
<Box sx={{
  background: 'linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)',
  color: '#fff',
  py: { xs: 8, md: 12 },
  textAlign: 'center',
}}>
  <Container maxWidth="md">
    <Typography variant="h1" sx={{ color: '#000000', fontWeight: 800, mb: 3 }}>
      {/* H1 en negro, no blanco */}
    </Typography>
    <Typography variant="body1" sx={{ color: '#000000', mb: 5 }}>
      {/* Subtítulo en negro */}
    </Typography>
    <Box component={Link} href="/cotizador" sx={{
      bgcolor: '#e81a68', color: '#fff',
      px: 4, py: 1.5, borderRadius: 2,
      fontWeight: 700, textDecoration: 'none',
      '&:hover': { bgcolor: '#c01556' },
    }}>
      CTA Principal →
    </Box>
  </Container>
</Box>
```

### Stats Bar

Siempre sobre fondo `#F8FAFC` o `#0F172A`. Tres métricas clave.

```tsx
<Box sx={{ bgcolor: '#F8FAFC', py: 5 }}>
  <Container maxWidth="lg">
    <Grid container spacing={4} justifyContent="center">
      {stats.map(s => (
        <Grid size={{ xs: 12, sm: 4 }} key={s.label}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '3rem', fontWeight: 800, color: '#0898b9' }}>
              {s.value}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>{s.label}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>
```

### Content Card

```tsx
<Card sx={{
  borderRadius: 2,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  transition: 'box-shadow 0.2s',
  '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.14)' },
}}>
  <Box sx={{ height: 4, background: 'linear-gradient(90deg, #0898b9 0%, #4dbfd9 100%)', borderRadius: '8px 8px 0 0' }} />
  <CardContent sx={{ p: 3 }}>
    <Chip label="Categoría" size="small" sx={{ bgcolor: '#e0f4fa', color: '#0777a0', fontWeight: 600 }} />
    <Typography variant="h3" sx={{ fontWeight: 700, mt: 1.5 }}>Título</Typography>
    <Typography variant="body2" color="text.secondary">Descripción...</Typography>
  </CardContent>
</Card>
```

### Dark CTA Band

Siempre al final de páginas de artículo. Dos tarjetas blancas con acción.

```tsx
<Box sx={{ bgcolor: '#0F172A', py: { xs: 7, md: 10 } }}>
  <Container maxWidth="lg">
    <Typography variant="h2" sx={{ color: '#fff', textAlign: 'center', mb: 6 }}>
      Título de cierre
    </Typography>
    <Grid container spacing={3} justifyContent="center">
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 4 }}>
          <Typography variant="h3">Acción 1</Typography>
          <Box component={Link} href="/agenda" sx={{
            bgcolor: '#e81a68', color: '#fff', display: 'inline-block',
            px: 3, py: 1.25, borderRadius: 1.5, fontWeight: 700, textDecoration: 'none',
          }}>
            Agendar visita gratuita
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 4 }}>
          <Typography variant="h3">Acción 2</Typography>
          <Box component={Link} href="/cotizador" sx={{
            bgcolor: '#e81a68', color: '#fff', display: 'inline-block',
            px: 3, py: 1.25, borderRadius: 1.5, fontWeight: 700, textDecoration: 'none',
          }}>
            Ver cotización online
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Container>
</Box>
```

### Comparison Table

```tsx
<Box component="table" sx={{
  width: '100%', borderCollapse: 'collapse',
  '& th, & td': { p: { xs: 1.5, md: 2 }, borderBottom: '1px solid #E2E8F0', fontSize: '0.95rem' },
  '& th': { bgcolor: '#0F172A', color: '#fff', fontWeight: 700 },
  '& tr:nth-of-type(even) td': { bgcolor: '#F8FAFC' },
}}>
```

### Author Byline

```tsx
<Box sx={{ bgcolor: '#F8FAFC', borderLeft: '4px solid #0898b9', p: 3, borderRadius: '0 8px 8px 0', my: 6 }}>
  <Typography variant="body2" sx={{ fontWeight: 600, color: '#2A3547' }}>
    Escrito por Felipe Donoso, Ingeniero Eléctrico, Enérgica City.
    Revisor técnico: Gilberto Escalona.
  </Typography>
</Box>
```

## Do's and Don'ts

**DO:**
- Usar `Grid size={{ xs: N, sm: N }}` (MUI v7) — nunca `item xs={N}`.
- Texto del hero en `#000000` sobre gradiente teal.
- Botones siempre en `#e81a68` con hover `#c01556`.
- Alternar secciones entre `#ffffff` y `#F8FAFC` sin bordes.
- CTA final siempre en dark band `#0F172A`.
- Incluir `borderRadius: "8px 8px 0 0"` en la barra de acento superior de cards.
- Usar `fontWeight: 800` en números de stats.
- Estadísticas en color `#0898b9` (teal).

**DON'T:**
- Nunca usar `item xs={N}` en Grid (rompe MUI v7).
- No usar texto blanco en el hero sobre gradiente teal (usar negro).
- No usar más de un color de acento por sección.
- No agregar sombras a secciones de fondo (solo a cards individuales).
- No usar `textTransform: uppercase` en botones.
- No centrar texto de cuerpo de artículo (solo el hero).
- No usar valores de color fuera de la paleta definida.

import type { Metadata } from 'next'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

export const metadata: Metadata = {
  title: 'Casos de Éxito en Cargadores EV para Empresas',
  description: 'Conoce cómo Chilexpress, CMP y CMPC confiaron en Energica City para instalar cargadores eléctricos para sus flotas en Chile.',
  alternates: { canonical: 'https://www.energica.city/casos-de-exito' },
}

const reviews = [
  {
    author: 'Nicole Rivera',
    date: 'Hace un mes',
    text: 'Excelente servicio. Los recomiendo 100%. Me compré hace poco un auto Eléctrico y no entendía muy bien qué cargador necesitaba, me orientaron muy bien y la instalación quedó perfecta.',
  },
  {
    author: 'Yerman Silva',
    date: 'Hace 8 meses',
    text: 'Servicio rápido y bien realizado, empresa super recomendada. Saludos.',
  },
]

const cases = [
  {
    company: 'Chilexpress',
    stats: '100 furgones eléctricos',
    description: 'Chilexpress electrificó su flota de reparto con 100 furgones eléctricos y 120 cargadores AC de 7.4 kW instalados en sus centros de distribución a lo largo de Chile. La solución redujo los costos operacionales en un 65% comparado con combustible.',
    outcome: 'Reducción del 65% en costos de combustible',
    year: '2024',
  },
  {
    company: 'CMP (Compañía Minera del Pacífico)',
    stats: '45 buses eléctricos',
    description: 'CMP modernizó su transporte de personal con 45 buses eléctricos en sus operaciones mineras. Instalamos cargadores de alta potencia (150 kW DC) con sistemas de gestión energética inteligente.',
    outcome: 'Cero emisiones en transporte de personal',
    year: '2024',
  },
  {
    company: 'CMPC',
    stats: '130 vehículos eléctricos',
    description: 'CMPC desplegó la mayor flota corporativa eléctrica de Chile con 130 vehículos y una infraestructura de 200 puntos de carga en sus plantas y oficinas. El proyecto incluye monitoreo en tiempo real y gestión de energía.',
    outcome: '200 puntos de carga instalados',
    year: '2023',
  },
]

export default function CasosDeExitoPage() {
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Energica City",
    "url": "https://www.energica.city",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "2",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map((r) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.author },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": r.text,
      "datePublished": "2025"
    }))
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Casos de Éxito — Energica City",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Chilexpress — 100 furgones eléctricos",
        "description": "Chilexpress electrificó su flota con 100 furgones y 120 cargadores AC de 7.4 kW. Reducción del 65% en costos operacionales.",
        "url": "https://www.energica.city/casos-de-exito"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "CMP — 45 buses eléctricos",
        "description": "CMP modernizó su transporte de personal con 45 buses eléctricos y cargadores DC de 150 kW.",
        "url": "https://www.energica.city/casos-de-exito"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "CMPC — 130 vehículos eléctricos",
        "description": "CMPC desplegó la mayor flota corporativa eléctrica de Chile con 200 puntos de carga.",
        "url": "https://www.energica.city/casos-de-exito"
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.energica.city" },
      { "@type": "ListItem", "position": 2, "name": "Casos de Éxito", "item": "https://www.energica.city/casos-de-exito" }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 2 }}>
            Casos de Éxito
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.25rem', color: 'text.secondary', mb: 6, maxWidth: 700 }}>
            Empresas líderes en Chile confían en Energica City para electrificar sus flotas con infraestructura de carga profesional y certificada.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {cases.map((c) => (
              <Box key={c.company} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                  <Typography variant="h2" component="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>{c.company}</Typography>
                  <Typography variant="body2" sx={{ bgcolor: 'primary.main', color: 'white', px: 2, py: 0.5, borderRadius: 1 }}>{c.year}</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontSize: '1.1rem', fontWeight: 600, color: 'primary.main', mb: 2 }}>{c.stats}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{c.description}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Resultado: {c.outcome}</Typography>
              </Box>
            ))}
          </Box>
          {/* Google Reviews Section */}
          <Box sx={{ mt: 10 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700 }}>
                Lo que dicen nuestros clientes
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
              <Box sx={{ color: '#FBBF24', fontSize: 18, letterSpacing: '2px' }}>★★★★★</Box>
              <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
                Reseñas verificadas en Google
              </Typography>
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{ width: 20, height: 20, flexShrink: 0 }}
                aria-label="Google"
              >
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </Box>
            </Box>
            <Grid container spacing={3}>
              {reviews.map((r) => (
                <Grid key={r.author} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    sx={{
                      bgcolor: '#fff',
                      border: '1px solid #E2E8F0',
                      borderRadius: 3,
                      p: 3.5,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      transition: 'box-shadow 0.2s',
                      '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.10)' },
                    }}
                  >
                    <Box sx={{ color: '#FBBF24', fontSize: 20, letterSpacing: '3px' }}>★★★★★</Box>
                    <Typography
                      variant="body1"
                      sx={{ color: '#334155', lineHeight: 1.7, flexGrow: 1, fontStyle: 'italic' }}
                    >
                      &ldquo;{r.text}&rdquo;
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pt: 1, borderTop: '1px solid #F1F5F9' }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: '#e81a68',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: 16,
                          flexShrink: 0,
                        }}
                      >
                        {r.author.charAt(0)}
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B' }}>{r.author}</Typography>
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>{r.date}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>¿Tu empresa quiere ser el próximo caso de éxito?</Typography>
            <Box component="a" href="/cotizador" sx={{ display: 'inline-block', bgcolor: 'primary.main', color: 'white', px: 4, py: 1.5, borderRadius: 1, fontWeight: 600, textDecoration: 'none' }}>
              Cotizar cargadores
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

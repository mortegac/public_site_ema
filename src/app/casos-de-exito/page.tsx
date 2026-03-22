import type { Metadata } from 'next'
import { Container, Box, Typography } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

export const metadata: Metadata = {
  title: 'Casos de Éxito en Cargadores EV para Empresas',
  description: 'Conoce cómo Chilexpress, CMP y CMPC confiaron en Energica City para instalar cargadores eléctricos para sus flotas en Chile.',
  alternates: { canonical: 'https://energica.city/casos-de-exito' },
}

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
        "url": "https://energica.city/casos-de-exito"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "CMP — 45 buses eléctricos",
        "description": "CMP modernizó su transporte de personal con 45 buses eléctricos y cargadores DC de 150 kW.",
        "url": "https://energica.city/casos-de-exito"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "CMPC — 130 vehículos eléctricos",
        "description": "CMPC desplegó la mayor flota corporativa eléctrica de Chile con 200 puntos de carga.",
        "url": "https://energica.city/casos-de-exito"
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://energica.city" },
      { "@type": "ListItem", "position": 2, "name": "Casos de Éxito", "item": "https://energica.city/casos-de-exito" }
    ]
  }

  return (
    <>
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

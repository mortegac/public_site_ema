import type { Metadata } from 'next'
import Link from 'next/link'
import { Box, Container, Typography, Grid, Button } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import { CANONICAL_DOMAIN } from '@/utils/seo-config'

export const metadata: Metadata = {
  title: 'Servicios de Instalación de Cargadores EV en Chile',
  description: 'Instalamos cargadores eléctricos en más de 20 ciudades de Chile. Técnicos certificados SEC, certificado TE6 incluido. Selecciona tu ciudad.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/servicios` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/servicios`,
    title: 'Instalación de Cargadores EV en Chile — Por Ciudad',
    description: 'Cobertura en más de 20 ciudades. Técnicos SEC certificados, TE6 incluido.',
    images: [{ url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`, width: 1200, height: 630, alt: 'Instalación cargadores EV Chile por ciudad' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cargadores EV Chile — Servicio por Ciudad',
    description: 'Instalación en +20 ciudades. Técnicos SEC certificados, TE6 incluido.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const cities = [
  { slug: 'santiago', name: 'Santiago' },
  { slug: 'las-condes', name: 'Las Condes' },
  { slug: 'providencia', name: 'Providencia' },
  { slug: 'vitacura', name: 'Vitacura' },
  { slug: 'nunoa', name: 'Ñuñoa' },
  { slug: 'la-florida', name: 'La Florida' },
  { slug: 'lo-barnechea', name: 'Lo Barnechea' },
  { slug: 'san-miguel', name: 'San Miguel' },
  { slug: 'estacion-central', name: 'Estación Central' },
  { slug: 'huechuraba', name: 'Huechuraba' },
  { slug: 'colina', name: 'Colina' },
  { slug: 'lampa', name: 'Lampa' },
  { slug: 'chicureo', name: 'Chicureo' },
  { slug: 'maipu', name: 'Maipú' },
  { slug: 'la-cisterna', name: 'La Cisterna' },
  { slug: 'penalolen', name: 'Peñalolén' },
  { slug: 'villa-alemana', name: 'Villa Alemana' },
  { slug: 'algarrobo', name: 'Algarrobo' },
  { slug: 'con-con', name: 'Con Con' },
  { slug: 'maitencillo', name: 'Maitencillo' },
]

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Servicios de Instalación de Cargadores EV — Enérgica City',
  description: 'Directorio de ciudades con servicio de instalación de cargadores eléctricos en Chile.',
  url: `${CANONICAL_DOMAIN}/servicios`,
  inLanguage: 'es-CL',
  publisher: { '@type': 'Organization', name: 'Energica City', url: CANONICAL_DOMAIN },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Ciudades con servicio de instalación de cargadores EV',
  numberOfItems: cities.length,
  itemListElement: cities.map((city, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `Instalación cargadores EV en ${city.name}`,
    url: `${CANONICAL_DOMAIN}/servicios/${city.slug}`,
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: CANONICAL_DOMAIN },
    { '@type': 'ListItem', position: 2, name: 'Servicios por Ciudad', item: `${CANONICAL_DOMAIN}/servicios` },
  ],
}

export default function ServiciosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />

      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)', py: { xs: 7, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 800, color: '#000', mb: 2 }}>
            Instalación de Cargadores EV en Chile
          </Typography>
          <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: '#0F172A', maxWidth: 600, mx: 'auto' }}>
            Técnicos certificados SEC con cobertura en más de 20 ciudades.
            Certificado TE6 incluido en todos los proyectos.
          </Typography>
        </Container>
      </Box>

      {/* City grid */}
      <Box sx={{ bgcolor: '#F8FAFC', py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700, color: '#0F172A', mb: 1, textAlign: 'center' }}>
            Selecciona tu ciudad
          </Typography>
          <Typography sx={{ color: '#64748b', textAlign: 'center', mb: 6 }}>
            Cobertura en Región Metropolitana y Región de Valparaíso
          </Typography>
          <Grid container spacing={2}>
            {cities.map((city) => (
              <Grid key={city.slug} size={{ xs: 6, sm: 4, md: 3 }}>
                <Box
                  component={Link}
                  href={`/servicios/${city.slug}`}
                  sx={{
                    display: 'block',
                    p: 2.5,
                    bgcolor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 2,
                    textDecoration: 'none',
                    color: '#0F172A',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: '#0898b9', color: '#0898b9', boxShadow: '0 2px 8px rgba(8,152,185,0.15)' },
                  }}
                >
                  {city.name}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ bgcolor: '#0F172A', py: { xs: 7, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, color: '#fff', mb: 2 }}>
            ¿Tu ciudad no está en la lista?
          </Typography>
          <Typography sx={{ color: '#94a3b8', mb: 4 }}>
            También atendemos comunas y sectores aledaños. Contáctanos para verificar cobertura.
          </Typography>
          <Button
            component={Link}
            href="/contactanos"
            variant="contained"
            size="large"
            sx={{ bgcolor: '#e81a68', '&:hover': { bgcolor: '#c01556' }, fontWeight: 700, px: 4, textTransform: 'none' }}
          >
            Consultar cobertura
          </Button>
        </Container>
      </Box>
    </>
  )
}

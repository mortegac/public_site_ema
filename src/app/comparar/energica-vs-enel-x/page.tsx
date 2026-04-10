import type { Metadata } from 'next'
import { Container, Box, Typography } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

export const metadata: Metadata = {
  title: 'Energica City vs Enel X: ¿Quién instala mejor cargadores EV en Chile?',
  description:
    'Comparamos Energica City y Enel X para instalación de cargadores eléctricos en empresas y edificios en Chile. Certificación SEC, TE6, precios y tiempos.',
  alternates: { canonical: 'https://www.energica.city/comparar/energica-vs-enel-x' },
  openGraph: {
    url: 'https://www.energica.city/comparar/energica-vs-enel-x',
    title: 'Energica City vs Enel X: ¿Quién instala mejor cargadores EV en Chile?',
    description:
      'Comparamos Energica City y Enel X para instalación de cargadores eléctricos en empresas y edificios en Chile. Certificación SEC, TE6, precios y tiempos.',
    images: [
      {
        url: 'https://www.energica.city/images/og/servicios-cargadores-ev.jpg',
        width: 1200,
        height: 630,
        alt: 'Energica City vs Enel X instalación cargadores EV Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Energica City vs Enel X: ¿Quién instala mejor cargadores EV en Chile?',
    description:
      'Comparamos Energica City y Enel X para instalación de cargadores eléctricos en empresas y edificios en Chile. Certificación SEC, TE6, precios y tiempos.',
    images: ['https://www.energica.city/images/og/servicios-cargadores-ev.jpg'],
  },
}

const comparisonRows: Array<{
  feature: string
  energica: string
  competitor: string
  energicaPositive: boolean
}> = [
  { feature: 'Especialización', energica: 'Empresas, edificios y condominios', competitor: 'Red pública + grandes proyectos', energicaPositive: true },
  { feature: 'Certificación SEC', energica: '✅ Incluida', competitor: '✅ Incluida', energicaPositive: true },
  { feature: 'Gestión TE6', energica: '✅ Máximo 5 días hábiles', competitor: '✅ Variable', energicaPositive: true },
  { feature: 'Cotización online', energica: '✅ En 24 horas', competitor: '❌ Solo por formulario', energicaPositive: true },
  { feature: 'Visita técnica', energica: '✅ Sin costo adicional', competitor: '⚠️ Según proyecto', energicaPositive: true },
  { feature: 'Integración solar', energica: '✅ Especialidad única', competitor: '❌ No disponible', energicaPositive: true },
  { feature: 'Instalación en condominios', energica: '✅ Especialidad', competitor: '⚠️ Disponibilidad limitada', energicaPositive: true },
  { feature: 'Monitoreo remoto', energica: '✅ Incluido', competitor: '✅ Disponible', energicaPositive: true },
  { feature: 'Flotas empresariales', energica: '✅ Disponible', competitor: '✅ Disponible', energicaPositive: true },
  { feature: 'Red pública de carga', energica: '❌ Solo instalación privada', competitor: '✅ ElectroRuta (1.200+ puntos)', energicaPositive: false },
]

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Comparativa Energica City vs Enel X',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Energica City',
      url: 'https://www.energica.city',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Enel X Chile',
      url: 'https://www.enelx.com/cl',
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.energica.city' },
    { '@type': 'ListItem', position: 2, name: 'Comparar', item: 'https://www.energica.city/comparar' },
    { '@type': 'ListItem', position: 3, name: 'Energica vs Enel X', item: 'https://www.energica.city/comparar/energica-vs-enel-x' },
  ],
}

export default async function EnergicaVsEnelXPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="lg">

          {/* H1 + intro */}
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 700, mb: 2 }}>
            Energica City vs Enel X: Comparativa de instalación de cargadores EV en Chile
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.15rem', color: 'text.secondary', mb: 6, maxWidth: 820 }}>
            Si buscas instalar cargadores eléctricos para tu empresa o edificio en Chile, probablemente hayas considerado tanto a Energica City como a Enel X. Ambas empresas ofrecen instalación certificada SEC, pero su enfoque, tiempos y propuesta de valor son muy distintos. En esta comparativa objetiva te ayudamos a elegir la mejor opción para tu proyecto.
          </Typography>

          {/* Comparison table */}
          <Typography variant="h2" sx={{ fontSize: '1.75rem', fontWeight: 700, mb: 3 }}>
            Comparativa: Energica City vs Enel X
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Información válida a partir de abril 2026. Sujeta a cambios por parte de cada empresa.
          </Typography>

          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', mb: 8 }}>
            {/* Table header */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr', bgcolor: 'grey.900' }}>
              <Box sx={{ p: { xs: 1.5, md: 2 }, borderRight: '1px solid', borderColor: 'grey.700' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'grey.300', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Característica
                </Typography>
              </Box>
              <Box sx={{ p: { xs: 1.5, md: 2 }, borderRight: '1px solid', borderColor: 'grey.700', textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.light', fontSize: '0.9rem' }}>
                  Energica City
                </Typography>
              </Box>
              <Box sx={{ p: { xs: 1.5, md: 2 }, textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'grey.300', fontSize: '0.9rem' }}>
                  Enel X Chile
                </Typography>
              </Box>
            </Box>

            {/* Table rows */}
            {comparisonRows.map((row, index) => (
              <Box
                key={row.feature}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 2fr',
                  bgcolor: index % 2 === 0 ? 'grey.50' : 'white',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ p: { xs: 1.5, md: 2 }, borderRight: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {row.feature}
                  </Typography>
                </Box>
                <Box sx={{ p: { xs: 1.5, md: 2 }, borderRight: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{ color: row.energicaPositive && row.energica.startsWith('✅') ? 'primary.main' : 'text.primary', fontWeight: row.energicaPositive ? 500 : 400 }}
                  >
                    {row.energica}
                  </Typography>
                </Box>
                <Box sx={{ p: { xs: 1.5, md: 2 }, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {row.competitor}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* When to choose Energica */}
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
            ¿Cuándo elegir Energica City?
          </Typography>
          <Box sx={{ mb: 6 }}>
            {[
              'Necesitas instalación rápida con cotización en 24 horas y TE6 en 5 días hábiles.',
              'Tu proyecto es en un edificio, condominio o flota empresarial mediana.',
              'Quieres integrar carga eléctrica con paneles solares.',
            ].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, mt: '5px' }} />
                <Typography variant="body1">{item}</Typography>
              </Box>
            ))}
          </Box>

          {/* When to choose Enel X */}
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
            ¿Cuándo elegir Enel X?
          </Typography>
          <Box sx={{ mb: 6 }}>
            {[
              'Tu empresa necesita conectarse a la red pública ElectroRuta.',
              'Tienes un proyecto de infraestructura de gran escala a nivel nacional.',
            ].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'grey.400', flexShrink: 0, mt: '5px' }} />
                <Typography variant="body1">{item}</Typography>
              </Box>
            ))}
          </Box>

          {/* Verdict */}
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
            Veredicto: ¿Cuál es mejor para tu empresa?
          </Typography>
          <Typography variant="body1" sx={{ mb: 8, maxWidth: 820, lineHeight: 1.8 }}>
            Para la mayoría de empresas, edificios y condominios en Chile, Energica City ofrece un servicio más especializado, ágil y con integración solar que Enel X no provee. Enel X es la mejor opción cuando el proyecto requiere conexión a red pública o tiene una escala nacional. Si tu necesidad es instalar cargadores en tu estacionamiento corporativo, edificio o flota, Energica City entrega tiempos de respuesta superiores y gestión TE6 incluida.
          </Typography>

          {/* CTA */}
          <Box
            component="a"
            href="/cotizador"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              p: { xs: 3, md: 4 },
              bgcolor: 'grey.900',
              borderRadius: 2,
              textDecoration: 'none',
              '&:hover': { bgcolor: 'grey.800' },
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', mb: 0.5 }}>
                Cotiza tu instalación en 24 horas
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Visita técnica gratuita — Gestión TE6 incluida — Integración solar disponible
              </Typography>
            </Box>
            <Box
              sx={{
                px: 3,
                py: 1.5,
                bgcolor: 'primary.main',
                borderRadius: 1,
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
              }}
            >
              Cotizar ahora →
            </Box>
          </Box>

        </Container>
      </Box>
    </>
  )
}

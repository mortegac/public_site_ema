import type { Metadata } from 'next'
import { Container, Box, Typography } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

export const metadata: Metadata = {
  title: 'Energica City vs Copec Voltex: Instalación de cargadores EV en Chile',
  description:
    '¿Copec Voltex o Energica City para instalar tu cargador eléctrico? Comparamos certificación SEC, gestión TE6, precios y especialización en edificios y empresas.',
  alternates: { canonical: 'https://www.energica.city/comparar/energica-vs-copec-voltex' },
  openGraph: {
    url: 'https://www.energica.city/comparar/energica-vs-copec-voltex',
    title: 'Energica City vs Copec Voltex: Instalación de cargadores EV en Chile',
    description:
      '¿Copec Voltex o Energica City para instalar tu cargador eléctrico? Comparamos certificación SEC, gestión TE6, precios y especialización en edificios y empresas.',
    images: [
      {
        url: 'https://www.energica.city/images/og/servicios-cargadores-ev.jpg',
        width: 1200,
        height: 630,
        alt: 'Energica City vs Copec Voltex instalación cargadores EV Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Energica City vs Copec Voltex: Instalación de cargadores EV en Chile',
    description:
      '¿Copec Voltex o Energica City para instalar tu cargador eléctrico? Comparamos certificación SEC, gestión TE6, precios y especialización en edificios y empresas.',
    images: ['https://www.energica.city/images/og/servicios-cargadores-ev.jpg'],
  },
}

const comparisonRows: Array<{
  feature: string
  energica: string
  competitor: string
  energicaPositive: boolean
}> = [
  { feature: 'Especialización', energica: 'Empresas, edificios y condominios', competitor: 'Residencial + empresas vía Sodimac', energicaPositive: true },
  { feature: 'Certificación SEC', energica: '✅ Incluida', competitor: '✅ Incluida', energicaPositive: true },
  { feature: 'Gestión TE6', energica: '✅ Máximo 5 días hábiles', competitor: '✅ Incluida', energicaPositive: true },
  { feature: 'Cotización online', energica: '✅ En 24 horas', competitor: '⚠️ Solo vía Sodimac o formulario', energicaPositive: true },
  { feature: 'Visita técnica gratuita', energica: '✅ Sin costo', competitor: '⚠️ Con costo en algunos proyectos', energicaPositive: true },
  { feature: 'Integración solar', energica: '✅ Especialidad única', competitor: '❌ No disponible', energicaPositive: true },
  { feature: 'Canal de venta', energica: '✅ Directo, sin intermediarios', competitor: '⚠️ Principalmente vía Sodimac', energicaPositive: true },
  { feature: 'Carga inteligente', energica: '✅ Monitoreo incluido', competitor: '✅ Voltex Smart (hasta 22 kW)', energicaPositive: true },
  { feature: 'Instalación en condominios', energica: '✅ Especialidad', competitor: '✅ Disponible', energicaPositive: true },
  { feature: 'Flotas empresariales', energica: '✅ Disponible', competitor: '✅ Disponible', energicaPositive: true },
]

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Comparativa Energica City vs Copec Voltex',
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
      name: 'Copec Voltex',
      url: 'https://www.copec.cl',
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.energica.city' },
    { '@type': 'ListItem', position: 2, name: 'Comparar', item: 'https://www.energica.city/comparar' },
    { '@type': 'ListItem', position: 3, name: 'Energica vs Copec Voltex', item: 'https://www.energica.city/comparar/energica-vs-copec-voltex' },
  ],
}

export default async function EnergicaVsCopecVoltexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="lg">

          {/* H1 + intro */}
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 700, mb: 2 }}>
            Energica City vs Copec Voltex: ¿Quién ofrece mejor instalación de cargadores EV?
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.15rem', color: 'text.secondary', mb: 6, maxWidth: 820 }}>
            Si estás evaluando a Energica City o Copec Voltex para instalar cargadores eléctricos en tu empresa, edificio o condominio en Chile, esta comparativa te ayuda a decidir. Analizamos certificación SEC, gestión TE6, canal de venta, integración solar y especialización en cada tipo de proyecto.
          </Typography>

          {/* Comparison table */}
          <Typography variant="h2" sx={{ fontSize: '1.75rem', fontWeight: 700, mb: 3 }}>
            Comparativa: Energica City vs Copec Voltex
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
                  Copec Voltex
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
              'Necesitas cotización directa sin intermediarios y respuesta en 24 horas.',
              'Tu proyecto requiere integración con paneles solares.',
              'Instalas en un condominio, flota empresarial o edificio corporativo y quieres gestión TE6 en máximo 5 días hábiles.',
            ].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, mt: '5px' }} />
                <Typography variant="body1">{item}</Typography>
              </Box>
            ))}
          </Box>

          {/* When to choose Copec Voltex */}
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
            ¿Cuándo elegir Copec Voltex?
          </Typography>
          <Box sx={{ mb: 6 }}>
            {[
              'Ya tienes una relación comercial con Sodimac y prefieres gestionar el proyecto por ese canal.',
              'Tu proyecto es residencial simple y no requiere integración solar.',
              'Quieres carga inteligente hasta 22 kW con el sistema Voltex Smart.',
            ].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'grey.400', flexShrink: 0, mt: '5px' }} />
                <Typography variant="body1">{item}</Typography>
              </Box>
            ))}
          </Box>

          {/* Verdict */}
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
            Veredicto: ¿Cuál es mejor para tu empresa o edificio?
          </Typography>
          <Typography variant="body1" sx={{ mb: 8, maxWidth: 820, lineHeight: 1.8 }}>
            Para empresas y condominios que buscan atención directa, integración solar y especialización en proyectos de mediana escala, Energica City ofrece claras ventajas: trato directo sin intermediarios, cotización en 24 horas y gestión TE6 en 5 días hábiles. Copec Voltex es una alternativa válida para proyectos residenciales simples o clientes que ya operan a través del canal Sodimac y quieren aprovechar la tecnología Voltex Smart hasta 22 kW.
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
                Visita técnica gratuita — Sin intermediarios — Integración solar disponible
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

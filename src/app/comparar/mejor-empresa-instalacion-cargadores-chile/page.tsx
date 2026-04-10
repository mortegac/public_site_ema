import type { Metadata } from 'next'
import { Container, Box, Typography } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

export const metadata: Metadata = {
  title: 'Las 5 mejores empresas de instalación de cargadores eléctricos en Chile (2026)',
  description:
    'Comparamos las 5 principales empresas que instalan cargadores EV en Chile: Energica City, Enel X, Copec Voltex, Thunder Chile y eHive. Cuál elegir según tu caso.',
  alternates: { canonical: 'https://www.energica.city/comparar/mejor-empresa-instalacion-cargadores-chile' },
  openGraph: {
    url: 'https://www.energica.city/comparar/mejor-empresa-instalacion-cargadores-chile',
    title: 'Las 5 mejores empresas de instalación de cargadores eléctricos en Chile (2026)',
    description:
      'Comparamos las 5 principales empresas que instalan cargadores EV en Chile: Energica City, Enel X, Copec Voltex, Thunder Chile y eHive. Cuál elegir según tu caso.',
    images: [
      {
        url: 'https://www.energica.city/images/og/servicios-cargadores-ev.jpg',
        width: 1200,
        height: 630,
        alt: 'Las 5 mejores empresas de instalación de cargadores EV en Chile 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las 5 mejores empresas de instalación de cargadores eléctricos en Chile (2026)',
    description:
      'Comparamos las 5 principales empresas que instalan cargadores EV en Chile: Energica City, Enel X, Copec Voltex, Thunder Chile y eHive. Cuál elegir según tu caso.',
    images: ['https://www.energica.city/images/og/servicios-cargadores-ev.jpg'],
  },
}

type SummaryRow = {
  company: string
  sec: string
  te6: string
  cotizacion: string
  solar: string
  condominios: string
  redPublica: string
}

const summaryRows: SummaryRow[] = [
  { company: 'Energica City', sec: '✅', te6: '✅ 5 días', cotizacion: '✅ 24h', solar: '✅', condominios: '✅', redPublica: '❌' },
  { company: 'Enel X Chile', sec: '✅', te6: '✅ Variable', cotizacion: '❌', solar: '❌', condominios: '⚠️', redPublica: '✅' },
  { company: 'Copec Voltex', sec: '✅', te6: '✅', cotizacion: '⚠️', solar: '❌', condominios: '✅', redPublica: '❌' },
  { company: 'Thunder Chile', sec: '✅', te6: '✅', cotizacion: '⚠️', solar: '⚠️', condominios: '⚠️', redPublica: '❌' },
  { company: 'eHive', sec: '✅', te6: '✅', cotizacion: '⚠️', solar: '❌', condominios: '✅', redPublica: '❌' },
]

const summaryColumns: Array<{ key: keyof SummaryRow; label: string }> = [
  { key: 'company', label: 'Empresa' },
  { key: 'sec', label: 'SEC' },
  { key: 'te6', label: 'TE6' },
  { key: 'cotizacion', label: 'Cotiz. online' },
  { key: 'solar', label: 'Solar' },
  { key: 'condominios', label: 'Condominios' },
  { key: 'redPublica', label: 'Red pública' },
]

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Las 5 mejores empresas de instalación de cargadores eléctricos en Chile 2026',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Energica City', url: 'https://www.energica.city' },
    { '@type': 'ListItem', position: 2, name: 'Enel X Chile', url: 'https://www.enelx.com/cl' },
    { '@type': 'ListItem', position: 3, name: 'Copec Voltex', url: 'https://www.copec.cl' },
    { '@type': 'ListItem', position: 4, name: 'Thunder Chile', url: 'https://www.thunder.cl' },
    { '@type': 'ListItem', position: 5, name: 'eHive', url: 'https://www.ehive.cl' },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.energica.city' },
    { '@type': 'ListItem', position: 2, name: 'Comparar', item: 'https://www.energica.city/comparar' },
    { '@type': 'ListItem', position: 3, name: 'Mejor empresa instalación cargadores Chile', item: 'https://www.energica.city/comparar/mejor-empresa-instalacion-cargadores-chile' },
  ],
}

export default async function MejorEmpresaInstalaciónPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="lg">

          {/* H1 + intro */}
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 700, mb: 2 }}>
            Las 5 mejores empresas de instalación de cargadores eléctricos en Chile en 2026
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.15rem', color: 'text.secondary', mb: 6, maxWidth: 820 }}>
            El mercado de cargadores eléctricos en Chile creció más del 60% en 2025. Si buscas instalar cargadores para tu empresa, edificio o flota, elegir bien a tu instalador puede marcar la diferencia entre un proyecto rápido y certificado o meses de trámites. Evaluamos las 5 principales empresas según: certificación SEC, tiempo de respuesta, especialización y servicio postventa.
          </Typography>

          {/* #1 Energica City */}
          <Box sx={{ mb: 6, p: { xs: 3, md: 4 }, border: '2px solid', borderColor: 'primary.main', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 1, px: 1.5, py: 0.5, fontWeight: 700, fontSize: '0.85rem' }}>
                #1
              </Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Energica City — Mejor para empresas, edificios y condominios
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Energica City es la opción más especializada del mercado para proyectos de mediana escala: edificios de oficinas, condominios residenciales y flotas empresariales. Con técnicos certificados SEC, cotización en línea en 24 horas y gestión TE6 en un máximo de 5 días hábiles, es la empresa con los tiempos de respuesta más competitivos de Chile. Su diferenciador único es la integración de carga eléctrica con paneles solares, algo que ninguna otra empresa del ranking ofrece.
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Ventajas
            </Typography>
            <Box sx={{ mb: 2 }}>
              {[
                'Cotización en 24 horas y TE6 en 5 días hábiles',
                'Integración de carga eléctrica con paneles solares',
                'Atención directa sin intermediarios',
                'Especialización en edificios, condominios y flotas',
                'Visita técnica gratuita',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, mt: '6px' }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Limitaciones
            </Typography>
            <Box sx={{ mb: 3 }}>
              {[
                'No opera red pública de carga',
                'Cobertura principalmente Región Metropolitana y Valparaíso',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.400', flexShrink: 0, mt: '6px' }} />
                  <Typography variant="body2" color="text.secondary">{item}</Typography>
                </Box>
              ))}
            </Box>
            <Box
              component="a"
              href="/cotizador"
              sx={{
                display: 'inline-block',
                px: 3,
                py: 1.25,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 1,
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              Cotizar con Energica City →
            </Box>
          </Box>

          {/* #2 Enel X */}
          <Box sx={{ mb: 6, p: { xs: 3, md: 4 }, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ bgcolor: 'grey.700', color: 'white', borderRadius: 1, px: 1.5, py: 0.5, fontWeight: 700, fontSize: '0.85rem' }}>
                #2
              </Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Enel X Chile — Mejor para proyectos de gran escala y red pública
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Enel X es el operador de carga pública más grande de Chile con su red ElectroRuta (más de 1.200 puntos). Para empresas que necesitan infraestructura privada, también ofrece soluciones certificadas SEC, aunque con menor agilidad que los especialistas en proyectos medianos.
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Ventajas
            </Typography>
            <Box sx={{ mb: 2 }}>
              {[
                'Mayor red pública en Chile (ElectroRuta)',
                'Presencia nacional y reconocimiento de marca',
                'Soluciones para flotas de gran escala',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.500', flexShrink: 0, mt: '6px' }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Limitaciones
            </Typography>
            <Box>
              {[
                'Sin cotización online inmediata',
                'Menor agilidad para PYMEs y condominios',
                'Sin integración solar',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.300', flexShrink: 0, mt: '6px' }} />
                  <Typography variant="body2" color="text.secondary">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* #3 Copec Voltex */}
          <Box sx={{ mb: 6, p: { xs: 3, md: 4 }, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ bgcolor: 'grey.700', color: 'white', borderRadius: 1, px: 1.5, py: 0.5, fontWeight: 700, fontSize: '0.85rem' }}>
                #3
              </Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Copec Voltex — Mejor para residencial y proyectos vía Sodimac
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Copec Voltex combina la confianza de la marca Copec con la tecnología de carga inteligente Voltex Smart (hasta 22 kW). Su canal principal de distribución es Sodimac, lo que facilita el acceso para proyectos residenciales, aunque puede ser un paso adicional para empresas que prefieren trato directo.
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Ventajas
            </Typography>
            <Box sx={{ mb: 2 }}>
              {[
                'Marca Copec (alta confianza en Chile)',
                'Carga inteligente Voltex Smart hasta 22 kW',
                'Amplia red de puntos de venta',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.500', flexShrink: 0, mt: '6px' }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Limitaciones
            </Typography>
            <Box>
              {[
                'Canal principalmente Sodimac (intermediario)',
                'Sin integración solar',
                'Costo de visita técnica en algunos proyectos',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.300', flexShrink: 0, mt: '6px' }} />
                  <Typography variant="body2" color="text.secondary">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* #4 Thunder Chile */}
          <Box sx={{ mb: 6, p: { xs: 3, md: 4 }, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ bgcolor: 'grey.700', color: 'white', borderRadius: 1, px: 1.5, py: 0.5, fontWeight: 700, fontSize: '0.85rem' }}>
                #4
              </Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Thunder Chile — Mejor para soluciones portátiles y personalizadas
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Thunder Chile es una empresa pionera en el mercado chileno (fundada en 2019) con alta capacidad de personalización técnica. Destaca por sus cargadores portátiles y móviles, una propuesta diferenciada para proyectos que requieren flexibilidad de instalación.
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Ventajas
            </Typography>
            <Box sx={{ mb: 2 }}>
              {[
                'Empresa pionera con trayectoria desde 2019',
                'Cargadores portátiles y móviles',
                'Alta personalización técnica',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.500', flexShrink: 0, mt: '6px' }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Limitaciones
            </Typography>
            <Box>
              {[
                'Menor escala que Enel X o Copec',
                'Menor reconocimiento de marca a nivel nacional',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.300', flexShrink: 0, mt: '6px' }} />
                  <Typography variant="body2" color="text.secondary">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* #5 eHive */}
          <Box sx={{ mb: 8, p: { xs: 3, md: 4 }, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ bgcolor: 'grey.700', color: 'white', borderRadius: 1, px: 1.5, py: 0.5, fontWeight: 700, fontSize: '0.85rem' }}>
                #5
              </Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                eHive — Mejor para condominios con facturación por app
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              eHive tiene un modelo de negocio diferenciado: su plataforma app permite la gestión de carga compartida en edificios con facturación por uso entre copropietarios. Es una solución orientada a la administración de condominios que quieren simplificar el cobro de electricidad para cargadores compartidos.
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Ventajas
            </Typography>
            <Box sx={{ mb: 2 }}>
              {[
                'Plataforma app para gestión de carga compartida en edificios',
                'Modelo de negocio por uso (facturación por carga)',
                'Simplifica administración para copropietarios',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.500', flexShrink: 0, mt: '6px' }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Limitaciones
            </Typography>
            <Box>
              {[
                'Más orientado a facturación que a instalación integral',
                'Sin gestión de integración solar',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.300', flexShrink: 0, mt: '6px' }} />
                  <Typography variant="body2" color="text.secondary">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* How to choose */}
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
            ¿Cómo elegir la empresa correcta?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: 820 }}>
            Antes de contratar, evalúa estos criterios según tu proyecto:
          </Typography>
          <Box sx={{ mb: 6 }}>
            {[
              'Tipo de proyecto: ¿residencial, empresarial, condominio o flota?',
              'Presupuesto y necesidad de cotización rápida sin intermediarios.',
              'Integración solar: solo Energica City ofrece esta especialidad en Chile.',
              'Escala: para proyectos nacionales o de red pública, Enel X es la referencia.',
              'Canal de compra: ¿prefieres trato directo o a través de una tienda?',
            ].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.25 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, mt: '6px' }} />
                <Typography variant="body1">{item}</Typography>
              </Box>
            ))}
          </Box>

          {/* Summary table */}
          <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 3 }}>
            Tabla comparativa resumida
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Información válida a partir de abril 2026. Sujeta a cambios por parte de cada empresa.
          </Typography>

          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', mb: 8, overflowX: 'auto' }}>
            {/* Header row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1.2fr 1.2fr 0.8fr 1.2fr 1.2fr', bgcolor: 'grey.900', minWidth: 640 }}>
              {summaryColumns.map((col, i) => (
                <Box
                  key={col.key}
                  sx={{
                    p: { xs: 1, md: 1.5 },
                    borderRight: i < summaryColumns.length - 1 ? '1px solid' : 'none',
                    borderColor: 'grey.700',
                    textAlign: i === 0 ? 'left' : 'center',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'grey.300', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {col.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Data rows */}
            {summaryRows.map((row, rowIndex) => (
              <Box
                key={row.company}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1.6fr 1fr 1.2fr 1.2fr 0.8fr 1.2fr 1.2fr',
                  bgcolor: rowIndex % 2 === 0 ? 'grey.50' : 'white',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  minWidth: 640,
                }}
              >
                {summaryColumns.map((col, colIndex) => (
                  <Box
                    key={col.key}
                    sx={{
                      p: { xs: 1, md: 1.5 },
                      borderRight: colIndex < summaryColumns.length - 1 ? '1px solid' : 'none',
                      borderColor: 'divider',
                      textAlign: colIndex === 0 ? 'left' : 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: colIndex === 0 ? 600 : 400,
                        color: rowIndex === 0 && colIndex > 0 && row[col.key].startsWith('✅') ? 'primary.main' : 'text.primary',
                      }}
                    >
                      {row[col.key]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>

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
                Instala con la empresa especialista en empresas y edificios
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Cotización en 24 horas — Visita técnica gratuita — TE6 en 5 días hábiles
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

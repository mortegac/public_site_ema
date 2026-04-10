import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

export const metadata: Metadata = {
  title: 'Auto Eléctrico vs Gasolina en Chile: ¿Cuál conviene en 2025?',
  description:
    'Descubre si te conviene pasarte a eléctrico con nuestra calculadora TCO gratuita. Compara costos reales en Chile: combustible, mantenimiento y ahorro a 5 años.',
  alternates: { canonical: 'https://www.energica.city/auto-electrico-vs-gasolina-chile' },
  openGraph: {
    url: 'https://www.energica.city/auto-electrico-vs-gasolina-chile',
    title: 'Auto Eléctrico vs Gasolina en Chile — Calculadora TCO Gratuita',
    description:
      'Compara costos reales y descubre cuánto ahorrarías cambiando a eléctrico en Chile. Calculadora personalizada con 20+ modelos.',
    images: [
      {
        url: 'https://www.energica.city/images/og/servicios-cargadores-ev.jpg',
        width: 1200,
        height: 630,
        alt: 'Comparador auto eléctrico vs gasolina Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Eléctrico vs Gasolina en Chile — ¿Cuál conviene?',
    description: 'Calculadora gratuita TCO para Chile. Compara 20+ modelos eléctricos con tu auto actual.',
    images: ['https://www.energica.city/images/og/servicios-cargadores-ev.jpg'],
  },
}

const DARK = '#0F172A'
const BLUE = '#1E40AF'
const BLUE_DARK = '#1E3A8A'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Comparador Eléctrico Energica City',
  description:
    'Calculadora gratuita TCO que compara tu auto actual con más de 20 modelos eléctricos disponibles en Chile. Calcula ahorro real a 5 años.',
  url: 'https://www.energica.city/comparador-electrico',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'CLP' },
  provider: { '@type': 'Organization', name: 'Energica City', url: 'https://www.energica.city' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.energica.city' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Auto Eléctrico vs Gasolina Chile',
      item: 'https://www.energica.city/auto-electrico-vs-gasolina-chile',
    },
  ],
}

const comparisonRows: Array<{ aspecto: string; gasolina: string; electrico: string }> = [
  { aspecto: 'Costo de combustible mensual', gasolina: '~$150.000 CLP', electrico: '~$15.000–$30.000 CLP (carga en casa)' },
  { aspecto: 'Mantenimiento anual', gasolina: 'Alto (aceite, filtros, bujías)', electrico: 'Mínimo (sin motor de combustión)' },
  { aspecto: 'Precio de entrada (2025)', gasolina: 'Desde $8M CLP', electrico: 'Desde $15M CLP' },
  { aspecto: 'Permiso de circulación (primeros 2 años)', gasolina: 'Valor normal', electrico: '$0 (exento)' },
  { aspecto: 'Impuesto verde', gasolina: 'Aplica en diésel', electrico: 'No aplica' },
  { aspecto: 'Autonomía promedio', gasolina: '500–700 km', electrico: '300–500 km' },
  { aspecto: 'Tiempo de "carga"', gasolina: '3–5 min en bomba', electrico: '6–8 h en casa (modo lento)' },
]

const steps: Array<{ number: string; title: string; description: string }> = [
  {
    number: '1',
    title: 'Tu vehículo actual',
    description: 'Ingresa marca, modelo, año, tipo de combustible y valor de mercado.',
  },
  {
    number: '2',
    title: 'Tu perfil de uso',
    description: 'Indica tus kilómetros mensuales y consumo de combustible actual.',
  },
  {
    number: '3',
    title: 'Comparación TCO',
    description: 'Recibe un análisis a 5 años contra 20+ modelos eléctricos disponibles en Chile.',
  },
  {
    number: '4',
    title: 'Próximos pasos',
    description: 'Agenda una visita técnica o cotiza tu instalación de carga en casa u oficina.',
  },
]

const convenienceCards: Array<{ indicator: string; label: string; color: string; description: string }> = [
  {
    indicator: '🟢',
    label: 'Alta conveniencia',
    color: '#16A34A',
    description:
      'Conductores que recorren más de 1.500 km/mes, empresas con flota, usuarios que cargan en casa o en la oficina.',
  },
  {
    indicator: '🟡',
    label: 'Conveniencia moderada',
    color: '#CA8A04',
    description:
      'Conductores de 500–1.500 km/mes con acceso a carga nocturna en edificio o garage propio.',
  },
  {
    indicator: '🟠',
    label: 'Evalúa primero',
    color: '#EA580C',
    description:
      'Conductores de menos de 500 km/mes, quienes viven en departamento sin instalación de carga, zonas sin red de carga cercana.',
  },
]

export default async function AutoElectricoVsGasolinaChilePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />

      <Box component="main">

        {/* Section 1 — Hero */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${DARK} 0%, ${BLUE_DARK} 100%)`,
            color: '#fff',
            py: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h1"
              component="h1"
              sx={{ fontSize: { xs: '1.875rem', md: '2.75rem' }, fontWeight: 800, mb: 3, lineHeight: 1.2 }}
            >
              Auto Eléctrico vs Gasolina en Chile: ¿Cuál conviene en 2025?
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.85)', mb: 5, maxWidth: 520, mx: 'auto' }}
            >
              La respuesta depende de TU situación. Nuestro comparador analiza tus kilómetros reales, tu consumo
              actual y los modelos disponibles en Chile para darte un resultado personalizado.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box
                component={Link}
                href="/comparador-electrico"
                sx={{
                  display: 'inline-block',
                  bgcolor: BLUE,
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  '&:hover': { bgcolor: BLUE_DARK },
                }}
              >
                Calcular mi ahorro gratis →
              </Box>
              <Box
                component={Link}
                href="/agenda"
                sx={{
                  display: 'inline-block',
                  color: 'rgba(255,255,255,0.85)',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: 'underline',
                  '&:hover': { color: '#fff' },
                }}
              >
                Solicitar visita técnica
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Section 2 — Stats bar */}
        <Box sx={{ bgcolor: GRAY_BG, py: 5 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center">
              {[
                { stat: '100%', label: 'Creció la venta de EV en Chile en 2024', source: 'Fuente: U. de Chile' },
                { stat: '$100.000', label: 'Ahorro mensual promedio en combustible', source: '' },
                { stat: '20+', label: 'Modelos eléctricos disponibles en el comparador', source: '' },
              ].map((item) => (
                <Grid key={item.stat} size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: { xs: '2.5rem', md: '3rem' }, fontWeight: 800, color: BLUE, lineHeight: 1 }}>
                      {item.stat}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: TEXT_MUTED, fontWeight: 500 }}>
                      {item.label}
                    </Typography>
                    {item.source && (
                      <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                        {item.source}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Section 3 — Por qué necesitas una calculadora personalizada */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 4, maxWidth: 780 }}>
              Por qué necesitas una calculadora personalizada, no un artículo genérico
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 820 }}>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#1E293B' }}>
                La mayoría de artículos sobre autos eléctricos concluye que "te ahorras dinero a largo plazo". Pero
                eso no basta para tomar una decisión de $15 millones. El ahorro real depende de cuántos kilómetros
                recorres tú, no un promedio estadístico.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#1E293B' }}>
                Un taxista que recorre 60.000 km al año recupera la inversión en menos de 3 años. Una persona que
                maneja 10.000 km anuales puede tardar 8 años o más. Son dos mundos completamente distintos, y los
                artículos genéricos no hacen esa diferencia.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#1E293B' }}>
                El Comparador Eléctrico de Energica utiliza tu consumo real de combustible, el año de tu vehículo y
                las tarifas eléctricas chilenas vigentes (~$5.000 CLP por cada 15 kWh) para entregarte un TCO a 5
                años honesto y personalizado. Información válida a abril 2025.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Section 4 — Cómo funciona el comparador */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 2 }}>
              Cómo funciona el Comparador Eléctrico de Energica
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_MUTED, mb: 5 }}>
              4 pasos, menos de 3 minutos, sin registro.
            </Typography>
            <Grid container spacing={3} sx={{ mb: 5 }}>
              {steps.map((step) => (
                <Grid key={step.number} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box
                    sx={{
                      bgcolor: '#fff',
                      borderRadius: 2,
                      p: 3,
                      height: '100%',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: BLUE,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 18,
                        mb: 2,
                      }}
                    >
                      {step.number}
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.7 }}>
                      {step.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component={Link}
                href="/comparador-electrico"
                sx={{
                  display: 'inline-block',
                  bgcolor: BLUE,
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  '&:hover': { bgcolor: BLUE_DARK },
                }}
              >
                Iniciar comparación gratuita →
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Section 5 — Tabla de expertos */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 5 }}>
              Lo que dicen los expertos sobre el cambio a eléctrico en Chile
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <Box
                component="table"
                sx={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  '& th, & td': {
                    p: { xs: 1.5, md: 2 },
                    textAlign: 'left',
                    borderBottom: '1px solid #E2E8F0',
                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                  },
                  '& th': {
                    bgcolor: DARK,
                    color: '#fff',
                    fontWeight: 700,
                  },
                  '& tr:nth-of-type(even) td': {
                    bgcolor: GRAY_BG,
                  },
                }}
              >
                <Box component="thead">
                  <Box component="tr">
                    <Box component="th">Aspecto</Box>
                    <Box component="th">Auto a Gasolina</Box>
                    <Box component="th">Auto Eléctrico</Box>
                  </Box>
                </Box>
                <Box component="tbody">
                  {comparisonRows.map((row) => (
                    <Box component="tr" key={row.aspecto}>
                      <Box component="td" sx={{ fontWeight: 600, color: '#1E293B' }}>
                        {row.aspecto}
                      </Box>
                      <Box component="td" sx={{ color: TEXT_MUTED }}>
                        {row.gasolina}
                      </Box>
                      <Box component="td" sx={{ color: '#16A34A', fontWeight: 500 }}>
                        {row.electrico}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: TEXT_MUTED }}>
              Datos orientativos basados en el mercado chileno a abril 2025. Usa nuestro comparador para valores
              exactos según tu perfil.
            </Typography>
          </Container>
        </Box>

        {/* Section 6 — ¿Para quién conviene el cambio? */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 5 }}>
              ¿Para quién conviene realmente pasarse a eléctrico?
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {convenienceCards.map((card) => (
                <Grid key={card.label} size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      bgcolor: '#fff',
                      borderRadius: 2,
                      p: 3,
                      height: '100%',
                      border: `2px solid ${card.color}20`,
                      borderTop: `4px solid ${card.color}`,
                    }}
                  >
                    <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>{card.indicator}</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: card.color }}>
                      {card.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.7 }}>
                      {card.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body1" sx={{ color: '#1E293B', mb: 3 }}>
              ¿No sabes en cuál categoría estás? El comparador calcula exactamente tu punto de equilibrio.
            </Typography>
            <Box
              component={Link}
              href="/comparador-electrico"
              sx={{
                display: 'inline-block',
                bgcolor: BLUE,
                color: '#fff',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
                '&:hover': { bgcolor: BLUE_DARK },
              }}
            >
              Descubrir mi categoría →
            </Box>
          </Container>
        </Box>

        {/* Section 7 — Servicios Energica CTA band */}
        <Box sx={{ bgcolor: DARK, py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, color: '#fff', mb: 2, textAlign: 'center' }}
            >
              Si el cambio te conviene, Energica te acompaña en todo el proceso
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}
            >
              Instalación certificada SEC con gestión TE6. Más de 500 proyectos completados en Chile.
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                <Box
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography sx={{ fontSize: '2rem', mb: 2 }}>⚡</Typography>
                  <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mb: 1.5, color: DARK }}>
                    Agenda una visita técnica
                  </Typography>
                  <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.7, mb: 3, flexGrow: 1 }}>
                    Un especialista evalúa tu hogar, edificio o empresa sin costo y te recomienda la solución ideal.
                  </Typography>
                  <Box
                    component={Link}
                    href="/agenda"
                    sx={{
                      display: 'inline-block',
                      bgcolor: BLUE,
                      color: '#fff',
                      px: 3,
                      py: 1.25,
                      borderRadius: 1.5,
                      fontWeight: 700,
                      fontSize: 15,
                      textDecoration: 'none',
                      textAlign: 'center',
                      '&:hover': { bgcolor: BLUE_DARK },
                    }}
                  >
                    Agendar visita gratuita
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                <Box
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography sx={{ fontSize: '2rem', mb: 2 }}>📋</Typography>
                  <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mb: 1.5, color: DARK }}>
                    Cotiza tu instalación
                  </Typography>
                  <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.7, mb: 3, flexGrow: 1 }}>
                    Instalación certificada SEC con gestión TE6 incluida. Recibe tu cotización en 24 horas.
                  </Typography>
                  <Box
                    component={Link}
                    href="/cotizador"
                    sx={{
                      display: 'inline-block',
                      bgcolor: BLUE,
                      color: '#fff',
                      px: 3,
                      py: 1.25,
                      borderRadius: 1.5,
                      fontWeight: 700,
                      fontSize: 15,
                      textDecoration: 'none',
                      textAlign: 'center',
                      '&:hover': { bgcolor: BLUE_DARK },
                    }}
                  >
                    Ver cotización online
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Section 8 — Trust / closing */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 7, md: 10 }, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3 }}>
              Toma la decisión correcta con datos reales
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.05rem', color: TEXT_MUTED, mb: 5, lineHeight: 1.8, maxWidth: 640, mx: 'auto' }}>
              El comparador eléctrico de Energica City es gratuito, sin registro y tarda menos de 3 minutos.
              Basado en modelos disponibles en Chile con precios actualizados a 2025.
            </Typography>
            <Box
              component={Link}
              href="/comparador-electrico"
              sx={{
                display: 'inline-block',
                bgcolor: BLUE,
                color: '#fff',
                px: 5,
                py: 2,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 17,
                textDecoration: 'none',
                '&:hover': { bgcolor: BLUE_DARK },
              }}
            >
              Usar el comparador ahora →
            </Box>
          </Container>
        </Box>

      </Box>
    </>
  )
}

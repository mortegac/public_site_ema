import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

export const metadata: Metadata = {
  title: 'Energica City vs Copec Voltex: Instalación cargadores EV en Chile (2026)',
  description:
    '¿Copec Voltex o Energica City para instalar tu cargador eléctrico? Comparamos servicios, certificación SEC, gestión TE6, precios e integración solar para empresas y edificios.',
  alternates: { canonical: 'https://www.energica.city/comparar/energica-vs-copec-voltex' },
  openGraph: {
    url: 'https://www.energica.city/comparar/energica-vs-copec-voltex',
    title: 'Energica City vs Copec Voltex: ¿Cuál instala mejor en Chile?',
    description:
      '¿Copec Voltex o Energica City para instalar tu cargador eléctrico? Comparamos servicios, certificación SEC, gestión TE6, precios e integración solar.',
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
    title: 'Energica City vs Copec Voltex: instalación cargadores Chile',
    description:
      'Comparativa honesta de certificación SEC, TE6, precios e integración solar para empresas y edificios.',
    images: ['https://www.energica.city/images/og/servicios-cargadores-ev.jpg'],
  },
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const DARK = '#0F172A'
const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'
const GREEN = '#16A34A'
const AMBER = '#D97706'

// ─── Comparison data ─────────────────────────────────────────────────────────
const comparisonRows: Array<{
  feature: string
  energica: string
  voltex: string
  winner: 'energica' | 'voltex' | 'tie'
}> = [
  {
    feature: 'Especialización principal',
    energica: 'Empresas, edificios y condominios',
    voltex: 'Residencial + soluciones empresariales',
    winner: 'energica',
  },
  {
    feature: 'Certificación SEC',
    energica: '✅ Incluida en el servicio',
    voltex: '✅ Incluida en el servicio',
    winner: 'tie',
  },
  {
    feature: 'Gestión TE6',
    energica: '✅ Máximo 5 días hábiles garantizados',
    voltex: '⚠️ No especificado públicamente',
    winner: 'energica',
  },
  {
    feature: 'Cotización online',
    energica: '✅ Respuesta en 24 horas',
    voltex: '⚠️ Redirige a plataforma externa (copecflux.cl)',
    winner: 'energica',
  },
  {
    feature: 'Visita técnica',
    energica: '✅ Gratuita, sin costo adicional',
    voltex: '✅ Incluida en el proceso',
    winner: 'tie',
  },
  {
    feature: 'Integración solar',
    energica: '✅ Carga EV + paneles solares combinados',
    voltex: '❌ No disponible',
    winner: 'energica',
  },
  {
    feature: 'Venta de hardware',
    energica: '⚠️ Solo gestiona la instalación',
    voltex: '✅ Venden cargadores Pulsar Plus 7 kW y Copper SB 22 kW',
    winner: 'voltex',
  },
  {
    feature: 'Red pública de carga rápida',
    energica: '❌ Solo instalación privada',
    voltex: '✅ +150 puntos rápidos, 2.200 km norte-sur',
    winner: 'voltex',
  },
  {
    feature: 'Canal de atención',
    energica: '✅ Directo, sin intermediarios',
    voltex: '⚠️ Teléfono 800 y formularios externos',
    winner: 'energica',
  },
  {
    feature: 'Instalación en condominios',
    energica: '✅ Especialidad declarada',
    voltex: '✅ Mencionado dentro de soluciones empresa',
    winner: 'tie',
  },
  {
    feature: 'Flotas corporativas',
    energica: '✅ Disponible',
    voltex: '✅ Disponible',
    winner: 'tie',
  },
  {
    feature: 'Precios de instalación publicados',
    energica: '⚠️ Cotización a medida',
    voltex: '❌ No publicados (solo hardware: desde $699.990)',
    winner: 'energica',
  },
]

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: '¿Cuál empresa tramita el TE6 más rápido?',
    a: 'Energica City garantiza la gestión del formulario TE6 en un máximo de 5 días hábiles. Copec Voltex no especifica tiempos de tramitación TE6 en su sitio web, lo que dificulta la comparación directa.',
  },
  {
    q: '¿Copec Voltex vende e instala cargadores, o solo uno de los dos?',
    a: 'Copec Voltex comercializa cargadores (Pulsar Plus 7 kW desde $699.990 CLP, Copper SB 22 kW a $879.990 CLP) y también ofrece instalación certificada SEC. Energica City en cambio se enfoca en el servicio integral de instalación, incluyendo la recomendación y provisión del equipo adecuado para cada proyecto.',
  },
  {
    q: '¿Puedo conectar mi cargador a paneles solares con alguna de estas empresas?',
    a: 'Solo Energica City ofrece integración de carga eléctrica con paneles solares como parte de su propuesta. Copec Voltex no menciona esta capacidad en su oferta pública.',
  },
  {
    q: '¿Qué empresa conviene para un edificio de departamentos?',
    a: 'Energica City es la opción más especializada para instalaciones en edificios residenciales, condominios y oficinas, con experiencia específica en ese segmento. Copec Voltex también atiende este mercado dentro de sus soluciones inmobiliarias, pero la especialización de Energica es más profunda.',
  },
  {
    q: '¿Copec Voltex tiene cobertura fuera de Santiago?',
    a: 'Sí. La red de carga pública de Copec Voltex cubre más de 2.200 km desde Coquimbo hasta Castro. Para instalaciones privadas, es recomendable verificar cobertura con su equipo comercial al 800 200 354.',
  },
]

// ─── Schema ──────────────────────────────────────────────────────────────────
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Comparativa Energica City vs Copec Voltex — Instalación cargadores EV Chile 2026',
  description:
    'Comparación detallada de Energica City y Copec Voltex en instalación de cargadores eléctricos para empresas, edificios y condominios en Chile.',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Energica City', url: 'https://www.energica.city' },
    { '@type': 'ListItem', position: 2, name: 'Copec Voltex', url: 'https://copecvoltex.cl' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.energica.city' },
    { '@type': 'ListItem', position: 2, name: 'Comparar', item: 'https://www.energica.city/comparar' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Energica City vs Copec Voltex',
      item: 'https://www.energica.city/comparar/energica-vs-copec-voltex',
    },
  ],
}

// ─── Component ───────────────────────────────────────────────────────────────
export default async function EnergicaVsCopecVoltexPage() {
  const energicaWins = comparisonRows.filter((r) => r.winner === 'energica').length
  const voltexWins = comparisonRows.filter((r) => r.winner === 'voltex').length
  const ties = comparisonRows.filter((r) => r.winner === 'tie').length

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />

      <Box component="main">

        {/* ── Hero ── */}
        <Box
          sx={{
            background: 'linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)',
            py: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            {/* Breadcrumb */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4, flexWrap: 'wrap' }}>
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Energica vs Copec Voltex', href: null },
              ].map((item, i) => (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {i > 0 && <Typography sx={{ color: 'rgba(0,0,0,0.4)', fontSize: '0.8rem' }}>›</Typography>}
                  {item.href ? (
                    <Box component={Link} href={item.href} sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.8rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      {item.label}
                    </Box>
                  ) : (
                    <Typography sx={{ color: '#000', fontSize: '0.8rem', fontWeight: 600 }}>{item.label}</Typography>
                  )}
                </Box>
              ))}
            </Box>

            <Typography
              variant="h1"
              component="h1"
              sx={{ fontSize: { xs: '1.75rem', md: '2.75rem' }, fontWeight: 800, mb: 3, lineHeight: 1.2, color: '#000' }}
            >
              Energica City vs Copec Voltex: ¿Cuál instala mejor cargadores EV en Chile?
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: '#000', mb: 5, maxWidth: 580, mx: 'auto', lineHeight: 1.7 }}
            >
              Dos empresas distintas con propuestas diferentes. Una comparativa honesta para empresas, edificios y condominios que necesitan instalación certificada SEC en Chile.
            </Typography>

            {/* Score badges */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 5 }}>
              {[
                { label: 'Energica City', score: `${energicaWins} ventajas`, color: PINK },
                { label: 'Empates', score: `${ties} criterios`, color: '#475569' },
                { label: 'Copec Voltex', score: `${voltexWins} ventajas`, color: '#DC2626' },
              ].map((b) => (
                <Box key={b.label} sx={{ bgcolor: 'white', borderRadius: 2, px: 3, py: 1.5, textAlign: 'center', minWidth: 130 }}>
                  <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: b.color }}>{b.score}</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, fontWeight: 600 }}>{b.label}</Typography>
                </Box>
              ))}
            </Box>

            <Box
              component={Link}
              href="/cotizador"
              sx={{
                display: 'inline-block',
                bgcolor: PINK,
                color: '#fff',
                px: 4,
                py: 1.75,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
                '&:hover': { bgcolor: PINK_DARK },
              }}
            >
              Cotizar con Energica City →
            </Box>
          </Container>
        </Box>

        {/* ── Stats bar ── */}
        <Box sx={{ bgcolor: DARK, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { stat: '5 días', label: 'Gestión TE6 máxima garantizada por Energica' },
                { stat: '24 h', label: 'Cotización online de Energica City' },
                { stat: '+150', label: 'Puntos de carga pública de Copec Voltex' },
              ].map((item) => (
                <Grid key={item.stat} size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, color: PINK, lineHeight: 1 }}>
                      {item.stat}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.75, color: 'rgba(255,255,255,0.65)', fontWeight: 500, fontSize: '0.85rem' }}>
                      {item.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── Tabla comparativa ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 1 }}>
              Comparativa completa: Energica City vs Copec Voltex
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_MUTED, mb: 5 }}>
              Información verificada desde los sitios públicos de ambas empresas. Última actualización: abril 2026.{' '}
              <Box component="a" href="https://copecvoltex.cl" target="_blank" rel="noopener noreferrer" sx={{ color: TEXT_MUTED }}>
                Fuente: copecvoltex.cl
              </Box>
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
                    verticalAlign: 'top',
                  },
                  '& th': { fontWeight: 700 },
                  '& tr:nth-of-type(even) td': { bgcolor: GRAY_BG },
                }}
              >
                <Box component="thead">
                  <Box component="tr" sx={{ bgcolor: DARK }}>
                    <Box component="th" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5, width: '28%' }}>
                      Criterio
                    </Box>
                    <Box component="th" sx={{ color: PINK, fontSize: '0.95rem', width: '36%' }}>
                      Energica City
                    </Box>
                    <Box component="th" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', width: '36%' }}>
                      Copec Voltex
                    </Box>
                  </Box>
                </Box>
                <Box component="tbody">
                  {comparisonRows.map((row) => (
                    <Box component="tr" key={row.feature}>
                      <Box component="td" sx={{ fontWeight: 600, color: '#1E293B' }}>
                        {row.feature}
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          color: row.winner === 'energica' ? GREEN : row.winner === 'tie' ? '#1E293B' : TEXT_MUTED,
                          fontWeight: row.winner === 'energica' ? 600 : 400,
                        }}
                      >
                        {row.energica}
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          color: row.winner === 'voltex' ? GREEN : row.winner === 'tie' ? '#1E293B' : TEXT_MUTED,
                          fontWeight: row.winner === 'voltex' ? 600 : 400,
                        }}
                      >
                        {row.voltex}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Leyenda */}
            <Box sx={{ display: 'flex', gap: 3, mt: 2, flexWrap: 'wrap' }}>
              {[
                { color: GREEN, label: 'Ventaja en este criterio' },
                { color: AMBER, label: 'Información parcial o condicionada' },
                { color: TEXT_MUTED, label: 'Sin ventaja o no disponible' },
              ].map((item) => (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color, flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{item.label}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── CTA tras tabla ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: 5 }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 3,
                p: { xs: 3, md: 4 },
                bgcolor: DARK,
                borderRadius: 2,
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                  ¿Listo para instalar con Energica City?
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Cotización en 24 h · TE6 en 5 días · Visita técnica gratuita
                </Typography>
              </Box>
              <Box
                component={Link}
                href="/cotizador"
                sx={{
                  display: 'inline-block',
                  bgcolor: PINK,
                  color: '#fff',
                  px: 3,
                  py: 1.5,
                  borderRadius: 1.5,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: PINK_DARK },
                }}
              >
                Cotizar ahora →
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── Cuándo elegir cada uno ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 6 }}>
              ¿Cuándo elegir cada empresa?
            </Typography>
            <Grid container spacing={4}>
              {/* Energica */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ border: `2px solid ${PINK}`, borderRadius: 2, p: { xs: 3, md: 4 }, height: '100%' }}>
                  <Typography variant="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, color: PINK, mb: 3 }}>
                    Elige Energica City si…
                  </Typography>
                  {[
                    'Tu proyecto es en un edificio, condominio o flota empresarial mediana.',
                    'Necesitas el TE6 tramitado en un plazo máximo garantizado (5 días hábiles).',
                    'Quieres integrar carga eléctrica con paneles solares existentes o nuevos.',
                    'Valoras la cotización online en 24 horas sin intermediarios.',
                    'Buscas atención directa y seguimiento del proyecto de principio a fin.',
                  ].map((item) => (
                    <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: PINK, flexShrink: 0, mt: '6px' }} />
                      <Typography variant="body2" sx={{ lineHeight: 1.65 }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Copec Voltex */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ border: '2px solid #E2E8F0', borderRadius: 2, p: { xs: 3, md: 4 }, height: '100%' }}>
                  <Typography variant="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', mb: 3 }}>
                    Elige Copec Voltex si…
                  </Typography>
                  {[
                    'Necesitas comprar el hardware del cargador (Pulsar Plus 7 kW o Copper SB 22 kW) junto con la instalación.',
                    'Tu empresa necesita conectarse a la red de carga pública ElectroRuta para conductores.',
                    'Tienes un proyecto residencial simple en casa propia.',
                    'Valoras el respaldo de marca Copec en el contrato con tu empresa.',
                  ].map((item) => (
                    <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#94A3B8', flexShrink: 0, mt: '6px' }} />
                      <Typography variant="body2" sx={{ lineHeight: 1.65, color: TEXT_MUTED }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ── Veredicto ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 4 }}>
              Veredicto: ¿Cuál es mejor para tu empresa o edificio?
            </Typography>
            <Box sx={{ maxWidth: 840 }}>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#1E293B', mb: 3 }}>
                Para la mayoría de empresas, edificios residenciales y condominios en Chile, <strong>Energica City entrega una propuesta más especializada y ágil</strong>: TE6 garantizado en 5 días, cotización en 24 horas, visita técnica gratuita e integración solar — características que Copec Voltex no ofrece públicamente.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#1E293B', mb: 3 }}>
                Copec Voltex tiene ventajas claras en dos áreas: <strong>venta directa de hardware</strong> (puedes comprar el cargador en su tienda online) y su <strong>red pública ElectroRuta</strong>, ideal si tu empresa necesita acceso a puntos de carga pública para conductores o flotas.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#1E293B' }}>
                Si tu prioridad es instalar cargadores en estacionamientos corporativos, edificios de departamentos o flotas empresariales medianas con plazo garantizado, Energica City es la opción más eficiente del mercado en 2026.
              </Typography>
            </Box>

            {/* Resultado visual */}
            <Box sx={{ display: 'flex', gap: 3, mt: 5, flexWrap: 'wrap' }}>
              <Box sx={{ bgcolor: PINK, borderRadius: 2, p: 3, flex: 1, minWidth: 200, textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', mb: 0.5 }}>Energica City</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>Mejor para instalación B2B, edificios y proyectos con integración solar</Typography>
              </Box>
              <Box sx={{ bgcolor: '#E2E8F0', borderRadius: 2, p: 3, flex: 1, minWidth: 200, textAlign: 'center' }}>
                <Typography sx={{ color: '#475569', fontWeight: 800, fontSize: '1.1rem', mb: 0.5 }}>Copec Voltex</Typography>
                <Typography sx={{ color: TEXT_MUTED, fontSize: '0.85rem' }}>Mejor para compra de hardware + red pública de carga rápida</Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── FAQ ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 6 }}>
              Preguntas frecuentes
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 840 }}>
              {faqItems.map((item) => (
                <Box key={item.q} sx={{ borderBottom: '1px solid #E2E8F0', pb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: '#1E293B' }}>
                    {item.q}
                  </Typography>
                  <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.75 }}>
                    {item.a}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── CTA final ── */}
        <Box sx={{ bgcolor: DARK, py: { xs: 7, md: 10 }, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, color: '#fff', mb: 2 }}>
              Cotiza tu instalación con Energica City
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.65)', mb: 5, maxWidth: 520, mx: 'auto', lineHeight: 1.75 }}>
              Instalación certificada SEC · Gestión TE6 en 5 días hábiles · Integración solar disponible · Visita técnica gratuita
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box
                component={Link}
                href="/cotizador"
                sx={{
                  display: 'inline-block',
                  bgcolor: PINK,
                  color: '#fff',
                  px: 4,
                  py: 1.75,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  '&:hover': { bgcolor: PINK_DARK },
                }}
              >
                Cotizar ahora →
              </Box>
              <Box
                component={Link}
                href="/agenda"
                sx={{
                  display: 'inline-block',
                  color: 'rgba(255,255,255,0.7)',
                  px: 4,
                  py: 1.75,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: 'underline',
                  '&:hover': { color: '#fff' },
                }}
              >
                Agendar visita técnica
              </Box>
            </Box>

            {/* Trust signals */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, md: 4 }, mt: 5, flexWrap: 'wrap' }}>
              {['✅ +500 proyectos completados', '⚡ Respuesta en 24 h', '🔒 Certificación SEC incluida'].map((item) => (
                <Typography key={item} variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── Links relacionados ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: 5 }}>
          <Container maxWidth="lg">
            <Typography variant="subtitle2" sx={{ color: TEXT_MUTED, mb: 2, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              También te puede interesar
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {[
                { label: 'Cómo funciona la instalación', href: '/como-funciona' },
                { label: 'Casos de éxito', href: '/casos-de-exito' },
                { label: 'Credenciales y certificaciones', href: '/credenciales' },
                { label: 'Servicios por ciudad', href: '/servicios/santiago' },
              ].map((link) => (
                <Box
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: PINK,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    px: 2,
                    py: 1,
                    border: `1px solid ${PINK}30`,
                    borderRadius: 1.5,
                    '&:hover': { bgcolor: `${PINK}08` },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

      </Box>
    </>
  )
}

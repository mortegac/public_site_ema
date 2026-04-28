import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

const DARK = '#0F172A'
const TEAL = '#0898b9'
const TEAL_DARK = '#0777a0'
const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'
const CANONICAL_DOMAIN = 'https://www.energica.city'

export const metadata: Metadata = {
  title: 'Hyundai Ioniq 5 y 6: Tiempos de carga y cargadores ideales',
  description:
    'Cuánto tarda cargar el Hyundai Ioniq 5 e Ioniq 6 en Chile. Tecnología 800V, cargadores AC y DC. Instalación certificada desde $159.000.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/cuanto-tiempo-tarda-cargar-hyundai-ioniq-5-chile` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/cuanto-tiempo-tarda-cargar-hyundai-ioniq-5-chile`,
    title: 'Hyundai Ioniq 5 y 6: Tiempos de carga y cargadores ideales en Chile',
    description:
      'Cuánto tarda cargar el Hyundai Ioniq 5 e Ioniq 6 en Chile. Tecnología 800V, cargadores AC y DC. Instalación desde $159.000.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tiempos de carga Hyundai Ioniq 5 e Ioniq 6 en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyundai Ioniq 5 y 6: Tiempos de carga en Chile',
    description: 'Tecnología 800V, cargadores AC 11kW y DC 350kW. Costo de carga en casa vs gasolina.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Hyundai Ioniq 5 y 6: Tiempos de Carga y Cargadores Ideales',
  description:
    'Cuánto tarda cargar el Hyundai Ioniq 5 e Ioniq 6 en Chile. Tecnología 800V, cargadores AC y DC. Instalación certificada desde $159.000.',
  author: { '@type': 'Person', name: 'Gilberto Escalona', jobTitle: 'Gerente Técnico, Enérgica City' },
  publisher: { '@type': 'Organization', name: 'Enérgica City', url: CANONICAL_DOMAIN },
  datePublished: '2025-06-01',
  dateModified: '2025-06-01',
  url: `${CANONICAL_DOMAIN}/blog/cuanto-tiempo-tarda-cargar-hyundai-ioniq-5-chile`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${CANONICAL_DOMAIN}/blog/cuanto-tiempo-tarda-cargar-hyundai-ioniq-5-chile`,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Necesito un Wallbox de 11kW para el Hyundai Ioniq 5 o me alcanza con 7kW?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El Ioniq 5 tiene un cargador de a bordo (OBC) de 11 kW AC, lo que significa que puede aprovechar un Wallbox de 11 kW para cargar en aproximadamente 7 horas. Con un Wallbox de 7kW tardarías unas 11 horas. Si cargas de noche y tienes 8-11 horas disponibles, un Wallbox de 7kW es perfectamente válido. Si necesitas cargar en ventanas más cortas (por ejemplo, durante el día mientras trabajas), vale la pena el Wallbox de 11kW.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta cargar el Ioniq 5 completamente en casa en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con la tarifa eléctrica residencial promedio en Chile de aproximadamente $145 CLP/kWh (tarifa BT1 Enel 2025), cargar la batería de 77,4 kWh del Ioniq 5 de 0% a 100% cuesta alrededor de $11.200 CLP. Si se considera una eficiencia de carga del 90%, el costo real es de aproximadamente $12.500 CLP por carga completa. Comparado con un sedán a gasolina equivalente que requiere unos $35.000-$45.000 para 480 km de autonomía, el ahorro es de más de 70% por kilómetro recorrido.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El Ioniq 5 puede usar cargadores de 350kW en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Técnicamente sí: el Ioniq 5 acepta hasta 350 kW DC en la especificación del fabricante. Sin embargo, en Chile la potencia máxima disponible en la mayoría de las estaciones de carga rápida es de 50-150 kW (Copec Voltex, Shell Recharge, Enel X). La tecnología 800V del Ioniq 5 le permite cargar al 80% en solo 18 minutos en cargadores de 350kW, pero en la práctica en Chile ese tiempo será mayor (30-40 min) por la potencia disponible en las estaciones.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: CANONICAL_DOMAIN },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_DOMAIN}/blog` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Ioniq 5 y 6: Tiempos de Carga',
      item: `${CANONICAL_DOMAIN}/blog/cuanto-tiempo-tarda-cargar-hyundai-ioniq-5-chile`,
    },
  ],
}

const chargingOptions = [
  {
    option: 'Enchufe doméstico (Modo 1)',
    power: '~2,3 kW',
    ioniq5Time: '~34 h',
    ioniq6Time: '~34 h',
    cost: '$3.500 CLP',
    recommended: false,
  },
  {
    option: 'Cable portátil 16A (Modo 2)',
    power: '~3,7 kW',
    ioniq5Time: '~21 h',
    ioniq6Time: '~21 h',
    cost: '$3.500 CLP',
    recommended: false,
  },
  {
    option: 'Wallbox 7,4 kW (Modo 3)',
    power: '7,4 kW',
    ioniq5Time: '~10,5 h',
    ioniq6Time: '~10,5 h',
    cost: '$3.500 CLP',
    recommended: true,
  },
  {
    option: 'Wallbox 11 kW (Modo 3)',
    power: '11 kW',
    ioniq5Time: '~7 h',
    ioniq6Time: '~7 h',
    cost: '$3.500 CLP',
    recommended: true,
  },
  {
    option: 'Cargador DC 50 kW',
    power: '50 kW',
    ioniq5Time: '~1,5 h',
    ioniq6Time: '~1,5 h',
    cost: '~$9.000 CLP',
    recommended: false,
  },
  {
    option: 'Cargador DC 350 kW',
    power: 'hasta 350 kW',
    ioniq5Time: '~18 min (0–80%)',
    ioniq6Time: '~18 min (0–80%)',
    cost: 'Variable',
    recommended: false,
  },
]

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
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
                { label: 'Blog', href: '/blog' },
                { label: 'Ioniq 5 y 6: Carga en Chile', href: null },
              ].map((item, i) => (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {i > 0 && (
                    <Typography sx={{ color: 'rgba(0,0,0,0.4)', fontSize: '0.8rem' }}>›</Typography>
                  )}
                  {item.href ? (
                    <Box
                      component={Link}
                      href={item.href}
                      sx={{
                        color: 'rgba(0,0,0,0.6)',
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {item.label}
                    </Box>
                  ) : (
                    <Typography sx={{ color: '#000', fontSize: '0.8rem', fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.75rem' },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.2,
                color: '#000',
              }}
            >
              Hyundai Ioniq 5 y 6: Tiempos de Carga y Cargadores Ideales
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                color: '#000',
                mb: 5,
                maxWidth: 620,
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Todo lo que necesitas saber para cargar tu Ioniq 5 o Ioniq 6 en Chile. Desde el Wallbox ideal para casa
              hasta los cargadores DC públicos, con costos en CLP y tiempos reales.
            </Typography>

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
              Instalar Wallbox para Ioniq →
            </Box>
          </Container>
        </Box>

        {/* ── Stats bar ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: 5, borderBottom: '1px solid #E2E8F0' }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} justifyContent="center">
              {[
                { value: '77,4 kWh', label: 'batería Ioniq 5 y 6 (pack estándar)' },
                { value: '~7 horas', label: 'carga 0–100% con Wallbox 11kW en casa' },
                { value: '$12.500 CLP', label: 'costo de una carga completa en casa' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: TEAL }}>{stat.value}</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: TEXT_MUTED, mt: 0.5 }}>{stat.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── Section 1: Specs técnicos ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Especificaciones de carga: Ioniq 5 e Ioniq 6 en detalle
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              El Hyundai Ioniq 5 y el Ioniq 6 comparten la plataforma E-GMP (Electric-Global Modular Platform) de
              Hyundai Motor Group. Una de sus características más destacadas es la arquitectura de batería a 800 V,
              única en su categoría de precio. Esta arquitectura permite velocidades de carga DC muy superiores a
              las de los vehículos de 400 V: mientras un Volkswagen ID.4 acepta hasta 135 kW DC, el Ioniq 5 puede
              cargar a hasta 350 kW DC, pasando del 10% al 80% en apenas 18 minutos en cargadores compatibles.
            </Typography>

            <Grid container spacing={4} sx={{ mt: 2, mb: 4 }}>
              {[
                {
                  model: 'Ioniq 5',
                  battery: '77,4 kWh (Long Range)',
                  range: '481 km WLTP (AWD) / 507 km (RWD)',
                  acMax: '11 kW (Tipo 2)',
                  dcMax: 'hasta 350 kW (CCS2)',
                  connector: 'Tipo 2 (AC) + CCS2 (DC)',
                },
                {
                  model: 'Ioniq 6',
                  battery: '77,4 kWh (Long Range)',
                  range: '614 km WLTP (RWD) / 583 km (AWD)',
                  acMax: '11 kW (Tipo 2)',
                  dcMax: 'hasta 350 kW (CCS2)',
                  connector: 'Tipo 2 (AC) + CCS2 (DC)',
                },
              ].map((spec) => (
                <Grid size={{ xs: 12, sm: 6 }} key={spec.model}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: GRAY_BG,
                      borderRadius: 2,
                      border: '1px solid #E2E8F0',
                      height: '100%',
                    }}
                  >
                    <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: TEAL, mb: 2 }}>
                      {spec.model}
                    </Typography>
                    {[
                      { label: 'Batería', value: spec.battery },
                      { label: 'Autonomía WLTP', value: spec.range },
                      { label: 'OBC máximo (AC)', value: spec.acMax },
                      { label: 'Carga DC máxima', value: spec.dcMax },
                      { label: 'Conector', value: spec.connector },
                    ].map((row) => (
                      <Box
                        key={row.label}
                        sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E2E8F0' }}
                      >
                        <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, fontWeight: 600 }}>
                          {row.label}
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', color: DARK, fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>
                          {row.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 5, mb: 2, color: DARK }}>
              ¿Qué significa la arquitectura 800 V para el propietario chileno?
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              En la carga AC doméstica, la arquitectura 800 V no cambia nada: el Ioniq 5 sigue necesitando un
              Wallbox AC Tipo 2 de hasta 11 kW, igual que cualquier otro EV con OBC de 11 kW. La ventaja del 800 V
              se manifiesta exclusivamente en carga DC rápida. Cuando el Ioniq 5 se conecta a un cargador CCS2 de
              alta potencia (150-350 kW), el proceso de rectificación interna es más eficiente y genera menos calor,
              permitiendo ciclos de carga rápida más frecuentes sin degradación acelerada de la batería.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155' }}>
              Para viajes de larga distancia por Chile (por ejemplo, Santiago a Talca o Santiago a La Serena), la
              capacidad del Ioniq 5 de cargar al 80% en 30-40 minutos en las estaciones disponibles lo convierte
              en uno de los autos más prácticos del mercado para uso mixto urbano y de carretera.
            </Typography>
          </Container>
        </Box>

        {/* ── Section 2: Tabla de opciones de carga ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Tabla de opciones de carga para Ioniq 5 e Ioniq 6 en Chile
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 4 }}>
              La siguiente tabla compara todas las opciones de carga disponibles, desde el enchufe doméstico hasta los
              cargadores DC de alta potencia, con tiempos estimados y costos referenciales en CLP para una carga
              completa (0–100%).
            </Typography>

            <Box sx={{ overflowX: 'auto' }}>
              <Box
                component="table"
                sx={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.875rem',
                  '& th': {
                    bgcolor: DARK,
                    color: '#fff',
                    py: 1.5,
                    px: 2,
                    textAlign: 'left',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  },
                  '& td': { py: 1.25, px: 2, borderBottom: '1px solid #E2E8F0', color: '#334155' },
                  '& tr:nth-of-type(even) td': { bgcolor: '#fff' },
                }}
              >
                <thead>
                  <tr>
                    <th>Opción</th>
                    <th>Potencia</th>
                    <th>Ioniq 5 (0–100%)</th>
                    <th>Ioniq 6 (0–100%)</th>
                    <th>Costo aprox.</th>
                    <th>Recomendado</th>
                  </tr>
                </thead>
                <tbody>
                  {chargingOptions.map((row) => (
                    <tr key={row.option}>
                      <td style={{ fontWeight: 600 }}>{row.option}</td>
                      <td>{row.power}</td>
                      <td>{row.ioniq5Time}</td>
                      <td>{row.ioniq6Time}</td>
                      <td>{row.cost}</td>
                      <td>
                        {row.recommended ? (
                          <Box
                            sx={{
                              display: 'inline-block',
                              bgcolor: '#DCFCE7',
                              color: '#16A34A',
                              px: 1.5,
                              py: 0.25,
                              borderRadius: 1,
                              fontSize: '0.75rem',
                              fontWeight: 700,
                            }}
                          >
                            Sí
                          </Box>
                        ) : (
                          <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>—</Typography>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mt: 1.5, fontStyle: 'italic' }}>
                Costo basado en tarifa BT1 Enel ~$145 CLP/kWh. Tiempos estimados con batería saludable. Carga DC a
                precio de estaciones Copec Voltex/Shell Recharge en Santiago.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* ── Section 3: Costo vs gasolina ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Costo de carga en casa vs gasolina: el ahorro real en Chile
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              El argumento económico para el Ioniq 5 en Chile es contundente. Partiendo de datos reales de 2025:
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                {
                  title: 'Carga completa Ioniq 5 en casa',
                  value: '~$12.500 CLP',
                  detail: '77,4 kWh × $145/kWh × 1,12 (pérd. carga)',
                  color: TEAL,
                },
                {
                  title: 'Equiv. gasolina para 481 km',
                  value: '~$42.000 CLP',
                  detail: '35 L (consumo mixto sedan equiv.) × $1.200 CLP/L',
                  color: '#DC2626',
                },
                {
                  title: 'Ahorro por carga completa',
                  value: '~$29.500 CLP',
                  detail: '70% de ahorro por cada recorrido de ~480 km',
                  color: '#16A34A',
                },
              ].map((item) => (
                <Grid size={{ xs: 12, sm: 4 }} key={item.title}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: GRAY_BG,
                      borderRadius: 2,
                      border: `1px solid ${item.color}30`,
                      textAlign: 'center',
                    }}
                  >
                    <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, color: item.color }}>{item.value}</Typography>
                    <Typography sx={{ fontWeight: 700, color: DARK, mt: 1, mb: 1, fontSize: '0.9rem' }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED }}>{item.detail}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Si el propietario recorre 15.000 km al año (promedio nacional según el INE), el ahorro anual en
              combustible supera los $900.000 CLP, descontando el costo de electricidad. En 5 años, el ahorro
              acumulado supera los $4.500.000 CLP, lo que más que compensa el costo de la instalación del Wallbox.
            </Typography>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 5, mb: 2, color: DARK }}>
              Tip: aprovecha la tarifa nocturna de Enel para cargar más barato
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155' }}>
              Enel distribución ofrece la tarifa BT1 con discriminación horaria (Horo-estacional), donde el kWh
              nocturno (22:00–07:00) puede costar hasta un 30% menos que la tarifa plana. Conectar el Ioniq 5 a
              las 22:00 con un timer en el Wallbox o directamente desde la app del vehículo reduce el costo de
              carga a aproximadamente $8.750 CLP por carga completa, maximizando el ahorro.
            </Typography>
          </Container>
        </Box>

        {/* ── Section 4: Qué Wallbox instalar ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              ¿Qué Wallbox instalar para el Ioniq 5 o Ioniq 6 en Chile?
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Dado que ambos vehículos tienen un OBC de 11 kW, la recomendación de Enérgica City es instalar un
              Wallbox de 11 kW Tipo 2, siempre que el empalme eléctrico lo permita. Un Wallbox de 11 kW requiere
              un circuito de 48 A y un empalme con capacidad suficiente para esta demanda.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              En casas unifamiliares con empalme monofásico de buena capacidad (≥ 63 A), es posible instalar un
              Wallbox de 11 kW monofásico. En departamentos o en empalmes más limitados, un Wallbox de 7,4 kW es la
              elección correcta: la diferencia en tiempo de carga entre 7,4 kW y 11 kW es de solo 3-4 horas en una
              carga nocturna, lo que raramente es crítico.
            </Typography>

            {[
              {
                scenario: 'Casa con empalme monofásico ≥ 63 A',
                recommendation: 'Wallbox 11 kW monofásico Tipo 2',
                chargeTime: '~7 horas (0–100%)',
                note: 'Requiere circuito dedicado 48 A + diferencial Tipo A.',
              },
              {
                scenario: 'Casa con empalme monofásico < 63 A o limitado',
                recommendation: 'Wallbox 7,4 kW monofásico Tipo 2',
                chargeTime: '~10,5 horas (0–100%)',
                note: 'Perfecto para carga nocturna. Circuito 32 A.',
              },
              {
                scenario: 'Departamento o estacionamiento privado en edificio',
                recommendation: 'Wallbox 7,4 kW con gestión de carga inteligente',
                chargeTime: '~10,5 horas (0–100%)',
                note: 'Compatible con sistema de balanceo de cargas EVE del edificio.',
              },
              {
                scenario: 'Empresa o flota con múltiples Ioniq',
                recommendation: 'Wallbox 11 kW con OCPP + gestión de energía',
                chargeTime: 'Variable según programación',
                note: 'Monitoreo remoto, reportes de carga, integración con SAP/ERP.',
              },
            ].map((s, i) => (
              <Box
                key={i}
                sx={{
                  mb: 3,
                  p: 3,
                  bgcolor: '#fff',
                  borderRadius: 2,
                  border: '1px solid #E2E8F0',
                  borderLeft: `4px solid ${TEAL}`,
                }}
              >
                <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>{s.scenario}</Typography>
                <Typography sx={{ fontSize: '0.95rem', color: TEAL, fontWeight: 600, mb: 0.75 }}>
                  Recomendación: {s.recommendation}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: '#475569', mb: 0.5 }}>
                  Tiempo de carga: {s.chargeTime}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>{s.note}</Typography>
              </Box>
            ))}
          </Container>
        </Box>

        {/* ── FAQ Section ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 5, color: DARK }}>
              Preguntas frecuentes
            </Typography>
            {faqSchema.mainEntity.map((item, i) => (
              <Box
                key={i}
                sx={{
                  mb: 3,
                  p: 3,
                  bgcolor: GRAY_BG,
                  borderRadius: 2,
                  borderLeft: `4px solid ${TEAL}`,
                }}
              >
                <Typography sx={{ fontWeight: 700, mb: 1.5, color: DARK, fontSize: '1rem' }}>{item.name}</Typography>
                <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
                  {item.acceptedAnswer.text}
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>

        {/* ── Author byline ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: 5, borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
          <Container maxWidth="md">
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: TEAL,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}
              >
                GE
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, color: DARK }}>Gilberto Escalona</Typography>
                <Typography sx={{ fontSize: '0.9rem', color: TEXT_MUTED, mb: 1 }}>
                  Gerente Técnico, Enérgica City
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  Escrito por Gilberto Escalona, Gerente Técnico con más de 10 años en proyectos de electromovilidad
                  industrial. Revisor: Felipe Donoso, Ingeniero Eléctrico.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── Dark CTA band ── */}
        <Box sx={{ bgcolor: DARK, py: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2.25rem' }, fontWeight: 800, color: '#fff', mb: 2 }}
            >
              Instala el Wallbox ideal para tu Ioniq 5 o Ioniq 6
            </Typography>
            <Typography sx={{ color: '#94A3B8', mb: 5, fontSize: '1.05rem', maxWidth: 520, mx: 'auto' }}>
              Visita técnica gratuita, certificación SEC incluida y TE6 gestionado en máximo 5 días hábiles. Desde
              $159.000 en casas y $369.000 en edificios y condominios.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box
                component={Link}
                href="/cotizador"
                sx={{
                  display: 'inline-block',
                  bgcolor: TEAL,
                  color: '#fff',
                  px: 4,
                  py: 1.75,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  '&:hover': { bgcolor: TEAL_DARK },
                }}
              >
                Cotizar mi Wallbox →
              </Box>
              <Box
                component={Link}
                href="/agenda"
                sx={{
                  display: 'inline-block',
                  bgcolor: 'transparent',
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.4)',
                  px: 4,
                  py: 1.75,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  '&:hover': { borderColor: '#fff' },
                }}
              >
                Agendar visita técnica
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

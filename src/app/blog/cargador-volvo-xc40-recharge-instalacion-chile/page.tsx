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

const SLUG = 'cargador-volvo-xc40-recharge-instalacion-chile'

export const metadata: Metadata = {
  title: 'Cargador Volvo XC40 y C40: Guía de Instalación en Chile',
  description:
    'Instalación certificada de cargadores para Volvo XC40 y C40 Recharge desde $159.000. Técnicos SEC autorizados en Chile. Optimiza la carga AC para tarifa nocturna.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Cargador Volvo XC40 y C40 Recharge: Guía de Instalación en Chile',
    description:
      'Todo lo que necesitas saber para instalar un cargador Wallbox para tu Volvo XC40 o C40 Recharge en Chile. Proceso, costos y normativa SEC.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Instalación de cargador Wallbox para Volvo XC40 Recharge en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargador Volvo XC40 y C40: Guía de Instalación en Chile',
    description:
      'Instala tu cargador para Volvo XC40 o C40 Recharge desde $159.000 con técnicos SEC en Chile.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Cargador Volvo XC40 y C40 Recharge: Guía de Instalación en Chile',
  description:
    'Guía completa para instalar un cargador domiciliario para Volvo XC40 y C40 Recharge en Chile: especificaciones técnicas, proceso, costos y normativa SEC.',
  author: {
    '@type': 'Person',
    name: 'Felipe Donoso',
    jobTitle: 'Ingeniero Eléctrico, Enérgica City',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Enérgica City',
    url: CANONICAL_DOMAIN,
  },
  datePublished: '2025-05-01',
  dateModified: '2025-05-01',
  url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${CANONICAL_DOMAIN}/blog/${SLUG}`,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda en cargar el Volvo XC40 Recharge con un Wallbox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con un Wallbox de 11 kW (trifásico), la batería de 78 kWh del Volvo XC40 Recharge se carga completamente en aproximadamente 8 horas desde vacío. Si usas tarifa nocturna y cargas durante la noche, amaneces con el 100% de carga a un costo de aproximadamente $2.000–$3.000 CLP por carga completa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito reforzar mi instalación eléctrica para cargar el XC40 Recharge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En la mayoría de las casas chilenas sí se requiere ampliar el circuito eléctrico. El Wallbox de 11 kW necesita un circuito dedicado de 16 A trifásico o un circuito monofásico de 32 A. Un instalador SEC evalúa el tablero general, el calibre del cableado y la capacidad del medidor antes de instalar. El certificado TE6 documenta todo el trabajo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué conector usa el Volvo XC40 y C40 Recharge para carga AC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ambos modelos usan el conector Tipo 2 (IEC 62196-2) estándar europeo para carga AC en corriente alterna. Este es el mismo estándar de la mayoría de los Wallbox disponibles en Chile. Para carga rápida DC (hasta 150 kW), usan el conector CCS2 (Combined Charging System). El Wallbox domiciliario se conecta siempre al puerto Tipo 2.',
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
      name: 'Cargador Volvo XC40 y C40 Recharge: Guía de Instalación en Chile',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const chargingModes = [
  {
    mode: 'Enchufe doméstico (Schuko)',
    potencia: '2,3 kW (10 A)',
    tiempo: '~34 h',
    seguridad: 'Baja',
    costo: '$0 instalación',
    recomendado: 'Solo emergencias',
  },
  {
    mode: 'Wallbox 7,4 kW (monofásico)',
    potencia: '7,4 kW (32 A)',
    tiempo: '~11 h',
    seguridad: 'Alta',
    costo: 'Desde $159.000',
    recomendado: 'Carga nocturna',
  },
  {
    mode: 'Wallbox 11 kW (trifásico)',
    potencia: '11 kW (16 A x3)',
    tiempo: '~8 h',
    seguridad: 'Alta',
    costo: 'Desde $249.000',
    recomendado: 'Optimo para XC40',
  },
  {
    mode: 'Cargador público DC (CCS2)',
    potencia: 'Hasta 150 kW',
    tiempo: '~35 min (10–80%)',
    seguridad: 'Alta',
    costo: 'Por uso (~$3.000/h)',
    recomendado: 'Viajes largos',
  },
]

export default function ArticlePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HpHeaderNew />
      <Box component="main">
        {/* Hero */}
        <Box
          sx={{
            background: 'linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)',
            color: '#fff',
            py: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '1.875rem', md: '2.75rem' },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.2,
                color: '#000000',
              }}
            >
              Cargador Volvo XC40 y C40 Recharge: Guía de Instalación en Chile
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                color: '#000000',
                mb: 5,
                maxWidth: 560,
                mx: 'auto',
              }}
            >
              El XC40 Recharge tiene un cargador de 11 kW integrado. Para aprovecharlo al máximo
              necesitas un Wallbox trifásico instalado por un técnico SEC certificado. Aquí te
              explicamos todo el proceso.
            </Typography>
            <Box
              component={Link}
              href="/cotizador"
              sx={{
                display: 'inline-block',
                bgcolor: PINK,
                color: '#fff',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
                '&:hover': { bgcolor: PINK_DARK },
              }}
            >
              Cotizar instalación →
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ bgcolor: DARK, color: '#fff', py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" textAlign="center">
              {[
                { value: '78 kWh', label: 'Batería XC40 Recharge' },
                { value: '11 kW', label: 'Carga AC máxima' },
                { value: '~8 h', label: 'Carga completa con Wallbox 11 kW' },
              ].map((stat) => (
                <Grid item xs={12} sm={4} key={stat.label}>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 800, color: TEAL }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#CBD5E1', mt: 0.5 }}>
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Section 1 */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Especificaciones de Carga del Volvo XC40 y C40 Recharge
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Volvo XC40 Recharge y el C40 Recharge comparten la misma arquitectura eléctrica.
              Ambos modelos utilizan la plataforma CMA de Volvo con batería de 78 kWh (neta) y
              ofrecen hasta 418 km de autonomía WLTP en la versión de motor doble (Twin Motor). La
              autonomía real en ciudad chilena, con paradas y aires acondicionados, se aproxima a
              350 km.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Para la carga en corriente alterna (AC), el cargador integrado a bordo (OBC) acepta
              hasta 11 kW en trifásico. Esto es clave: si conectas el XC40 Recharge a un Wallbox
              monofásico de 7,4 kW, el cargador se adapta y entrega solo 7,4 kW, alargando el tiempo
              de carga. Para aprovechar los 11 kW completos, necesitas un circuito trifásico.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Conector Tipo 2: El Estándar Europeo en Chile
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El XC40 y C40 Recharge vienen equipados con el conector Tipo 2 (IEC 62196-2) para
              carga AC. Este es el estándar europeo que está consolidándose en Chile. La gran mayoría
              de los Wallbox disponibles en el mercado nacional —Zaptech, Enervip, Schneider Electric,
              ABB, Wallbox Pulsar— son compatibles con este conector. No necesitas adaptadores
              especiales.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Para la carga rápida en DC, el vehículo usa el conector CCS2 (Combined Charging
              System), que permite cargas de hasta 150 kW en estaciones de carga rápida. Sin embargo,
              la carga rápida en DC se usa principalmente en viajes largos, no en la carga cotidiana
              en casa.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              ¿Por Qué No Cargar con Enchufe Schuko?
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Técnicamente es posible usar un cable de modo 2 para cargar el XC40 Recharge en un
              enchufe doméstico de 220V. Sin embargo, esto entrega solo 2,3 kW (10 A limitado), lo
              que implica más de 34 horas para una carga completa desde vacío. Además, los enchufes
              domésticos no están diseñados para cargas eléctricas continuas de alta demanda: el
              calor acumulado en el tomacorriente puede dañar el cableado existente. Los ingenieros
              de Volvo recomiendan explícitamente instalar un Wallbox dedicado como solución
              principal de carga.
            </Typography>
          </Container>
        </Box>

        {/* Comparison Table */}
        <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: GRAY_BG }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                mb: 2,
                color: DARK,
                textAlign: 'center',
              }}
            >
              Tabla Comparativa: Modos de Carga para el Volvo XC40 Recharge
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: TEXT_MUTED, mb: 5, textAlign: 'center' }}
            >
              Batería de referencia: 78 kWh desde 0% a 100%
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <Box
                component="table"
                sx={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  '& th': {
                    bgcolor: DARK,
                    color: '#fff',
                    px: 2,
                    py: 1.5,
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  },
                  '& td': {
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid #E2E8F0',
                    fontSize: '0.875rem',
                    color: DARK,
                  },
                  '& tr:nth-of-type(even) td': { bgcolor: '#F1F5F9' },
                  '& tr:hover td': { bgcolor: '#E0F2FE' },
                }}
              >
                <thead>
                  <tr>
                    <th>Modo de carga</th>
                    <th>Potencia</th>
                    <th>Tiempo (0–100%)</th>
                    <th>Seguridad</th>
                    <th>Costo instalación</th>
                    <th>Recomendado para</th>
                  </tr>
                </thead>
                <tbody>
                  {chargingModes.map((row) => (
                    <tr key={row.mode}>
                      <td style={{ fontWeight: 600 }}>{row.mode}</td>
                      <td>{row.potencia}</td>
                      <td>{row.tiempo}</td>
                      <td>{row.seguridad}</td>
                      <td>{row.costo}</td>
                      <td>{row.recomendado}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Section 2 */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Proceso de Instalación en Chile: Paso a Paso
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Instalar un Wallbox para el Volvo XC40 Recharge en Chile requiere cumplir con la
              normativa eléctrica NCh Elec. 4/2003 y obtener el certificado TE6 emitido por un
              instalador autorizado por la Superintendencia de Electricidad y Combustibles (SEC). Este
              documento es obligatorio y protege legalmente al propietario.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              1. Visita Técnica y Evaluación del Tablero
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El proceso comienza con una visita técnica gratuita. El instalador evalúa el tablero
              eléctrico general: capacidad actual, espacio para nuevos interruptores, tipo de
              cableado existente y distancia desde el tablero hasta el estacionamiento. En casas con
              tableros antiguos o de baja capacidad (63 A o menos), puede ser necesario ampliar
              primero el servicio con la distribuidora eléctrica local (CGE, Enel, etc.).
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              2. Diseño del Circuito Dedicado
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Para un Wallbox de 11 kW trifásico se diseña un circuito dedicado con cable de cobre
              calibre 4 mm² o 6 mm² según la distancia, protegido con un interruptor diferencial de
              30 mA y un interruptor termomagnético de 16 A. Todo el trazado se canaliza en tubo
              conduit para protección mecánica. Si la distancia desde el tablero supera los 20
              metros, se requiere un cable de mayor sección para compensar la caída de tensión.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              3. Instalación del Wallbox y Certificado TE6
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Una vez aprobado el diseño, el instalador SEC ejecuta la obra: tiende el cableado,
              instala las protecciones en el tablero y monta el Wallbox en la pared del
              estacionamiento. El trabajo se realiza normalmente en medio día hábil. Al finalizar, el
              instalador emite el certificado TE6 que debe presentarse a la distribuidora eléctrica.
              En Enérgica City, la emisión del TE6 está incluida en el precio de instalación desde
              $159.000 en casas y desde $369.000 en edificios.
            </Typography>
          </Container>
        </Box>

        {/* Section 3 - Tarifa nocturna */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Tarifa Nocturna y Carga Programada: Ahorra hasta un 40%
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Chile tiene tarifas eléctricas residenciales con banda horaria (BT1 con medidor
              inteligente). La electricidad en horario nocturno (23:00 – 07:00) puede costar hasta un
              40% menos que en horario pico. Con una batería de 78 kWh, la diferencia de costo entre
              cargar de día versus de noche es de aproximadamente $800–$1.200 CLP por sesión.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Volvo XC40 Recharge permite programar la hora de inicio de carga directamente desde
              la aplicación Volvo Cars. También los Wallbox inteligentes (Wallbox Pulsar Plus, ABB
              Terra AC) permiten programar horarios directamente desde su app. La combinación de un
              Wallbox inteligente con la tarifa nocturna de tu distribuidora puede reducir el costo de
              carga a aproximadamente $1.500–$2.500 CLP por carga completa (equivalente a unos 300 km
              de autonomía).
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              ¿Cuánto Cuesta Cargar el XC40 Recharge Cada Mes?
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Un conductor chileno promedio recorre 1.200–1.500 km mensuales. El XC40 Recharge
              consume aproximadamente 20–22 kWh/100 km en uso real. Esto equivale a 240–330 kWh al
              mes. Pagando la tarifa nocturna vigente (~$80–$90 CLP/kWh), el costo mensual de
              electricidad para el vehículo es de $19.000–$30.000 CLP. Comparado con un vehículo
              naftero de consumo equivalente que podría gastar $80.000–$100.000 CLP en combustible al
              mes, el ahorro anual supera los $600.000 CLP.
            </Typography>
          </Container>
        </Box>

        {/* Section 4 - Edificios */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Instalación en Edificios y Condominios
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Si el Volvo XC40 Recharge se estaciona en un edificio de departamentos, el proceso es
              más complejo pero completamente viable. La instalación desde $369.000 en edificios
              incluye la acometida desde el medidor individual del propietario hasta el estacionamiento
              en subterráneo, el tendido en ductos comunes del edificio (con autorización de la
              administración), y el Wallbox.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La Ley de Electromovilidad chilena (Ley 21.226) establece que ninguna administración de
              condominio puede impedir al propietario instalar un cargador en su estacionamiento
              privado. El propietario debe contratar al instalador, gestionar los permisos ante la SEC
              y notificar a la administración, pero no necesita su aprobación para proceder.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              En Enérgica City hemos realizado más de 200 instalaciones en edificios de Santiago y
              otras regiones. Nuestro equipo maneja la coordinación completa con la administración,
              el diseño eléctrico que no interfiere con los sistemas del edificio, y la emisión del
              certificado TE6 al finalizar.
            </Typography>
          </Container>
        </Box>

        {/* FAQ */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                mb: 5,
                color: DARK,
                textAlign: 'center',
              }}
            >
              Preguntas Frecuentes
            </Typography>
            {faqSchema.mainEntity.map((item, i) => (
              <Box
                key={i}
                sx={{
                  mb: 3,
                  p: 3,
                  bgcolor: '#fff',
                  borderRadius: 2,
                  borderLeft: `4px solid ${TEAL}`,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <Typography variant="h3" sx={{ fontSize: '1rem', fontWeight: 700, mb: 1, color: DARK }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.7 }}>
                  {item.acceptedAnswer.text}
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>

        {/* Author */}
        <Box sx={{ py: 5, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: GRAY_BG,
                borderLeft: `4px solid ${TEAL}`,
              }}
            >
              <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.7 }}>
                <strong style={{ color: DARK }}>Escrito por Felipe Donoso</strong>, Ingeniero
                Eléctrico con 10+ años de experiencia en electromovilidad. Revisor técnico:{' '}
                <strong style={{ color: DARK }}>Gilberto Escalona</strong>.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* CTA dark band */}
        <Box sx={{ bgcolor: DARK, py: { xs: 7, md: 10 }, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 800,
                color: '#fff',
                mb: 2,
              }}
            >
              Instala tu Cargador para Volvo XC40 Recharge Hoy
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 480, mx: 'auto' }}>
              Técnicos SEC certificados. Certificado TE6 incluido. Instalación desde{' '}
              <strong style={{ color: '#fff' }}>$159.000</strong> en casas y{' '}
              <strong style={{ color: '#fff' }}>$369.000</strong> en edificios.
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
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  '&:hover': { bgcolor: TEAL_DARK },
                }}
              >
                Cotizar instalación
              </Box>
              <Box
                component={Link}
                href="/agenda"
                sx={{
                  display: 'inline-block',
                  bgcolor: 'transparent',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  border: '2px solid #fff',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
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

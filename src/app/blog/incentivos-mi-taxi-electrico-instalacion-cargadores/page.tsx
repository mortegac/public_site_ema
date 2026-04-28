import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import { CANONICAL_DOMAIN } from '@/utils/seo-config'

const DARK = '#0F172A'
const TEAL = '#0898b9'
const TEAL_DARK = '#0777a0'
const PINK = '#e81a68'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'

const SLUG = 'incentivos-mi-taxi-electrico-instalacion-cargadores'

export const metadata: Metadata = {
  title: 'Programa Mi Taxi Eléctrico: Carga domiciliaria para conductores',
  description:
    'Apoya del programa Mi Taxi Eléctrico para instalar cargadores en casa. Subsidio del Ministerio de Energía para taxistas y colectiveros en Chile 2025.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Programa Mi Taxi Eléctrico: Carga domiciliaria para conductores',
    description:
      'Cómo acceder al subsidio del programa Mi Taxi Eléctrico para instalar cargadores en casa. Requisitos, montos y plazos para taxistas y colectiveros en Chile.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Taxista con vehículo eléctrico cargando en casa con instalador SEC certificado Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mi Taxi Eléctrico: Subsidio para cargadores en casa — Chile 2025',
    description:
      'Programa Mi Taxi Eléctrico del Ministerio de Energía: cómo instalar tu cargador domiciliario con subsidio y con instalador SEC autorizado.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Programa Mi Taxi Eléctrico: Carga Domiciliaria para Conductores',
  description:
    'Guía completa sobre el programa Mi Taxi Eléctrico del Ministerio de Energía de Chile para 2025: subsidios para instalación de cargadores domiciliarios, requisitos de postulación y participación de Enérgica City como instalador autorizado.',
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
  datePublished: '2025-05-15',
  dateModified: '2025-05-15',
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
      name: '¿Quiénes pueden postular al programa Mi Taxi Eléctrico en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Pueden postular al programa Mi Taxi Eléctrico los conductores que posean una licencia de taxi básico o taxi colectivo vigente emitida por el MTT, tengan domicilio registrado en el Servicio de Impuestos Internos (SII) con actividad secundaria de transporte de pasajeros remunerado, y estén al día en sus obligaciones tributarias y previsionales. El programa también incluye a conductores de aplicaciones de movilidad (Uber, Cabify, inDriver) que cuenten con permiso de operación vigente. No es requisito ya tener el vehículo eléctrico al momento de postular; algunos llamados permiten postular como parte del proceso de recambio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué cubre el subsidio de Mi Taxi Eléctrico para la instalación del cargador?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'El subsidio del programa Mi Taxi Eléctrico cubre hasta el 80 % del costo de instalación del cargador domiciliario, con un tope máximo de $280.000 por beneficiario. Esto incluye el cargador de nivel 2 (modo 3, 7,4 kW), la mano de obra de instalación por un instalador SEC certificado, los materiales eléctricos (cable, conduit, breaker dedicado) y la certificación TE6 ante la SEC. El 20 % restante lo aporta el conductor, aunque en algunos llamados la cobertura llega al 100 % para conductores de zonas de menor desarrollo. Enérgica City gestiona todo el proceso, incluyendo la documentación para el subsidio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué es crítica la carga domiciliaria para los taxistas eléctricos en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Un taxista o colectivero en Chile recorre entre 60.000 y 80.000 km anuales, lo que equivale a un consumo eléctrico de 12.000 a 16.000 kWh por año. Cargar exclusivamente en estaciones públicas DC rápidas tiene un costo de $350 a $500/kWh, mientras que la carga domiciliaria nocturna cuesta entre $80 y $120/kWh. Para un conductor que recorre 250 km diarios con un consumo de 20 kWh/100 km, cargar en casa en vez de en cargadores públicos significa un ahorro de entre $375.000 y $500.000 mensuales. La carga domiciliaria es la diferencia entre que el taxi eléctrico sea rentable o no.',
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
      name: 'Programa Mi Taxi Eléctrico: Carga domiciliaria para conductores',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

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
            background: `linear-gradient(135deg, #0F172A 0%, #1B3A2F 100%)`,
            color: '#fff',
            py: { xs: 8, md: 12 },
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {['Mi Taxi Eléctrico', 'Ministerio de Energía', 'Subsidio 2025', 'Chile'].map(
                (tag) => (
                  <Box
                    key={tag}
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: '999px',
                      background: 'rgba(8,152,185,0.25)',
                      border: `1px solid ${TEAL}`,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#7DD3FC',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {tag}
                  </Box>
                )
              )}
            </Box>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 3,
                maxWidth: 820,
              }}
            >
              Programa Mi Taxi Eléctrico: Carga Domiciliaria para Conductores
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 660,
                lineHeight: 1.7,
              }}
            >
              El programa Mi Taxi Eléctrico del Ministerio de Energía subsidia hasta el 80 % de la
              instalación de cargadores en casa para taxistas y colectiveros. Enérgica City es
              instalador autorizado.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '27.000+', label: 'Taxis potencialmente beneficiarios en Chile' },
                { value: '80%', label: 'Subsidio sobre costo de instalación' },
                { value: '$500.000', label: 'Ahorro mensual estimado vs. carga pública' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Box sx={{ textAlign: 'center', color: '#fff' }}>
                    <Typography
                      sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', opacity: 0.85 }}>{stat.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Main content */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">

            {/* Section 1 */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 2 }}
            >
              ¿Qué es el programa Mi Taxi Eléctrico?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Mi Taxi Eléctrico es un programa impulsado por el Ministerio de Energía de Chile en
              el marco de la Estrategia Nacional de Electromovilidad, cuyo objetivo es acelerar el
              recambio del parque de taxis y colectivos a tracción eléctrica. Chile tiene más de
              27.000 taxis básicos y más de 30.000 colectivos registrados en el MTT, los cuales
              representan una oportunidad significativa de reducción de emisiones urbanas dado que
              cada unidad recorre entre 60.000 y 80.000 km anuales.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El programa opera a través de llamados anuales en que los conductores postulantes
              reciben un subsidio directo para la adquisición del vehículo eléctrico y, en algunos
              llamados, para la instalación del cargador domiciliario. Enérgica City participa como
              instalador autorizado del programa, realizando las instalaciones de carga residencial
              certificadas que requieren los beneficiarios.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Por qué la carga domiciliaria es el corazón del negocio del taxi eléctrico
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Un taxista que depende de estaciones de carga pública DC rápida para su operación
              diaria enfrenta tres problemas: el alto costo por kWh (~$400/kWh en cargadores
              DC rápidos de 50 kW), el tiempo perdido esperando turno en los cargadores (15-30
              minutos por sesión) y la incertidumbre de disponibilidad. Por el contrario, un
              taxista que carga en casa durante la noche paga entre $80 y $120/kWh, no pierde
              tiempo y parte cada mañana con la batería al 100 %.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Para un conductor que recorre 250 km diarios y tiene un vehículo con consumo de
              18 kWh/100 km, la carga nocturna domiciliaria representa un gasto mensual de
              aproximadamente $135.000 (45 kWh/día × $100/kWh × 30 días). El mismo consumo en
              cargadores DC públicos costaría $540.000/mes. El diferencial de $405.000 mensuales
              es lo que hace que el taxi eléctrico sea económicamente superior al taxi a gasolina.
            </Typography>

            {/* Section 2 */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 2,
                mt: 6,
              }}
            >
              Otros incentivos para el taxi eléctrico en Chile 2025
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Más allá del subsidio a la carga domiciliaria, los taxistas y colectiveros que
              se acogen al programa Mi Taxi Eléctrico acceden a un conjunto de incentivos
              complementarios vigentes en 2025:
            </Typography>

            {[
              {
                icon: '🚗',
                title: 'Exención del permiso de circulación por 2 años',
                desc:
                  'Los vehículos eléctricos nuevos están exentos del pago del permiso de circulación durante los primeros 2 años. Para un taxi con patente de trabajo, el permiso puede superar los $400.000/año, lo que representa un ahorro significativo en los primeros años de operación.',
              },
              {
                icon: '🌿',
                title: 'Sin impuesto verde',
                desc:
                  'Los vehículos eléctricos no están afectos al impuesto verde (Ley 20.936), que grava a los automóviles con emisiones superiores a 110 g CO2/km con tasas de hasta el 4,1 % del valor CIF. Este impuesto encarece los vehículos convencionales entre $500.000 y $2.000.000 en promedio.',
              },
              {
                icon: '📊',
                title: 'Reducción de IVA en algunos modelos',
                desc:
                  'Ciertos modelos de vehículos eléctricos importados para uso comercial calificado (taxi, colectivo) pueden acogerse a mecanismos de recuperación de IVA de importación, dependiendo de la categoría arancelaria y del destino de uso declarado ante el SII.',
              },
              {
                icon: '🔋',
                title: 'Garantía ampliada en baterías',
                desc:
                  'Los principales fabricantes de EV (BYD, CHERY, MG, Renault) ofrecen garantías de batería de 8 años o 160.000 km para vehículos adquiridos dentro del programa Mi Taxi Eléctrico, superior a la garantía estándar del mercado.',
              },
            ].map((item) => (
              <Box
                key={item.title}
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 3,
                  background: GRAY_BG,
                  borderRadius: 2,
                  mb: 2.5,
                  borderLeft: `4px solid ${TEAL}`,
                }}
              >
                <Typography sx={{ fontSize: '1.4rem', lineHeight: 1 }}>{item.icon}</Typography>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>{item.title}</Typography>
                  <Typography sx={{ color: '#475569', fontSize: '0.93rem', lineHeight: 1.7 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* Section 3 */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 2,
                mt: 6,
              }}
            >
              ¿Cómo postular al subsidio para el cargador domiciliario?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El proceso de postulación varía según el llamado activo del programa. El procedimiento
              estándar para la parte de instalación de cargador domiciliario dentro de Mi Taxi
              Eléctrico sigue estos pasos:
            </Typography>

            {[
              {
                n: '01',
                title: 'Verificar elegibilidad',
                body:
                  'Confirmar que tienes licencia de taxi o colectivo vigente en el MTT y RUT activo en el SII con actividad de transporte. Puedes verificar tu elegibilidad en el portal del Ministerio de Energía o consultando directamente a Enérgica City.',
              },
              {
                n: '02',
                title: 'Postular en el portal del Ministerio de Energía',
                body:
                  'Completar el formulario de postulación en linea en energía.gob.cl con tus datos de conductor, datos del vehículo (o del vehículo que planeas adquirir) y domicilio donde se realizará la instalación del cargador.',
              },
              {
                n: '03',
                title: 'Selección de instalador autorizado',
                body:
                  'Una vez aprobada la postulación, debes seleccionar un instalador autorizado por el programa. Enérgica City aparece en el listado de instaladores certificados. Nos contactas, coordinamos la visita técnica y evaluamos si la instalación eléctrica de tu domicilio cumple los requisitos.',
              },
              {
                n: '04',
                title: 'Visita técnica y presupuesto',
                body:
                  'Un ingeniero de Enérgica City visita tu domicilio, evalúa el tablero eléctrico, el espacio disponible para el cargador y el trayecto del cableado. Se elabora un presupuesto detallado que se presenta al Ministerio para la aprobación del monto del subsidio.',
              },
              {
                n: '05',
                title: 'Instalación y certificación',
                body:
                  'Una vez aprobado el subsidio, Enérgica City realiza la instalación completa: circuito dedicado, cargador de nivel 2 de 7,4 kW y presentación del formulario TE6 ante la SEC. El proceso completo toma entre 1 y 2 días hábiles.',
              },
              {
                n: '06',
                title: 'Entrega de documentación al Ministerio',
                body:
                  'Enérgica City entrega al Ministerio de Energía el informe de instalación, el número de declaración TE6 y las fotos del estado final, como respaldo para la liquidación del subsidio.',
              },
            ].map((step) => (
              <Box
                key={step.n}
                sx={{
                  display: 'flex',
                  gap: 3,
                  mb: 3,
                  p: 3,
                  background: GRAY_BG,
                  borderRadius: 2,
                  borderLeft: `4px solid ${TEAL}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: TEAL,
                    minWidth: 40,
                    lineHeight: 1,
                  }}
                >
                  {step.n}
                </Typography>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>{step.title}</Typography>
                  <Typography sx={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {step.body}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* Section 4 */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 2,
                mt: 6,
              }}
            >
              Comparativa: taxi eléctrico vs. taxi gasolina en Chile (2025)
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Para un conductor que recorre 250 km diarios durante 300 días al año (75.000 km/año),
              la diferencia económica entre operar un taxi eléctrico con carga domiciliaria y un
              taxi a gasolina es significativa:
            </Typography>
            <Box
              sx={{ border: `1px solid #E2E8F0`, borderRadius: 2, overflow: 'hidden', mb: 4 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.5fr 1.5fr',
                  background: DARK,
                  color: '#fff',
                  px: 2,
                  py: 1.5,
                }}
              >
                {['Concepto', 'Taxi eléctrico', 'Taxi gasolina'].map((h) => (
                  <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                    {h}
                  </Typography>
                ))}
              </Box>
              {[
                ['Combustible/energía mensual', '~$135.000 (carga nocturna)', '~$540.000 (bencina 95)'],
                ['Mantención mensual estimada', '~$25.000 (EV: sin aceite, frenos regenerativos)', '~$90.000'],
                ['Permiso circulación (año 1–2)', '$0 (exento)', '~$420.000/año'],
                ['Impuesto verde', '$0', 'Incluido en precio del vehículo'],
                ['Ahorro mensual total vs. gasolina', '~$470.000', '—'],
                ['Ahorro anual', '~$5.640.000', '—'],
              ].map(([concepto, ev, gas], i) => (
                <Box
                  key={concepto}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.5fr 1.5fr',
                    px: 2,
                    py: 1.5,
                    background: i % 2 === 0 ? GRAY_BG : '#fff',
                    borderTop: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: DARK }}>
                    {concepto}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: ev.startsWith('~$') || ev === '$0' ? '#059669' : DARK,
                      fontWeight: ev.startsWith('~$5') ? 700 : 400,
                    }}
                  >
                    {ev}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#DC2626' }}>{gas}</Typography>
                </Box>
              ))}
            </Box>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El ahorro anual de $5.640.000 representa el retorno completo del costo de un
              vehículo eléctrico de gama media ($10.000.000 a $14.000.000) en menos de 3 años,
              sin considerar el subsidio del programa Mi Taxi Eléctrico ni los beneficios
              tributarios adicionales.
            </Typography>
          </Container>
        </Box>

        {/* FAQ */}
        <Box sx={{ py: { xs: 6, md: 8 }, background: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.9rem' },
                fontWeight: 700,
                color: DARK,
                mb: 5,
                textAlign: 'center',
              }}
            >
              Preguntas frecuentes — Programa Mi Taxi Eléctrico
            </Typography>
            {faqSchema.mainEntity.map((item) => (
              <Box
                key={item.name}
                sx={{
                  mb: 3,
                  p: 3,
                  background: '#fff',
                  borderRadius: 2,
                  boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                }}
              >
                <Typography sx={{ fontWeight: 700, color: DARK, mb: 1 }}>{item.name}</Typography>
                <Typography sx={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {item.acceptedAnswer.text}
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>

        {/* Author byline */}
        <Box sx={{ py: 4, background: '#fff', borderTop: '1px solid #E2E8F0' }}>
          <Container maxWidth="md">
            <Typography sx={{ fontSize: '0.9rem', color: TEXT_MUTED, lineHeight: 1.7 }}>
              Escrito por <strong>Felipe Donoso</strong>, Ingeniero Eléctrico con 10+ años de
              experiencia en electromovilidad. Revisor técnico:{' '}
              <strong>Gilberto Escalona</strong>.
            </Typography>
          </Container>
        </Box>

        {/* Dark CTA band */}
        <Box sx={{ background: DARK, py: { xs: 8, md: 10 } }}>
          <Container maxWidth="md">
            <Typography
              sx={{
                fontSize: { xs: '1.7rem', md: '2.4rem' },
                fontWeight: 800,
                color: '#fff',
                textAlign: 'center',
                mb: 2,
              }}
            >
              ¿Eres taxista y quieres instalar tu cargador en casa?
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 5,
                fontSize: '1.05rem',
              }}
            >
              Somos instaladores autorizados del programa Mi Taxi Eléctrico. Te ayudamos con
              toda la documentación y gestión del subsidio, sin costo adicional.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/cotizador" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    px: 4,
                    py: 1.75,
                    borderRadius: 2,
                    background: TEAL,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { background: TEAL_DARK },
                    cursor: 'pointer',
                  }}
                >
                  Cotizar cargador domiciliario
                </Box>
              </Link>
              <Link href="/agenda" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    px: 4,
                    py: 1.75,
                    borderRadius: 2,
                    border: `2px solid ${PINK}`,
                    color: PINK,
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { background: PINK, color: '#fff' },
                    cursor: 'pointer',
                  }}
                >
                  Agendar visita técnica
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

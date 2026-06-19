import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import BlogBreadcrumb from '@/app/components/shared/BlogBreadcrumb'
import AuthorByline from '@/app/components/shared/AuthorByline'
import { CANONICAL_DOMAIN } from '@/utils/seo-config'
import BlogRelatedArticles from '@/app/components/shared/BlogRelatedArticles'

const DARK = '#0F172A'
const TEAL = '#0898b9'
const TEAL_DARK = '#0777a0'
const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'

const SLUG = 'instalar-cargador-electrico-casa-wallbox'

export const metadata: Metadata = {
  title: 'Cómo Instalar un Cargador Eléctrico (Wallbox) en Casa: Guía Completa Chile',
  description:
    'Guía completa para instalar un cargador Wallbox en casa en Chile: evaluación técnica, protecciones eléctricas, Nivel 1 vs Nivel 2, certificado TE6 y costo desde $159.000.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Cómo Instalar un Cargador Eléctrico (Wallbox) en Casa: Guía Completa Chile',
    description:
      'Todo el proceso para instalar un Wallbox en tu hogar: qué evalúa el técnico, qué protecciones son obligatorias, cuánto cuesta y cómo obtener el certificado TE6 de la SEC.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Instalación cargador Wallbox en casa Chile guía completa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cómo instalar un Wallbox en casa en Chile',
    description:
      'Guía completa: evaluación técnica, cableado dedicado, protecciones tipo A, certificado TE6 y costo desde $159.000.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Cómo Instalar un Cargador Eléctrico (Wallbox) en Casa: Guía Completa para Chile',
  description:
    'Proceso completo para instalar un cargador Wallbox en vivienda en Chile: evaluación técnica del empalme, cableado dedicado, protecciones obligatorias y certificado TE6 ante la SEC.',
  author: {
    '@type': 'Person',
    name: 'Felipe Donoso',
    jobTitle: 'Ingeniero Eléctrico, Enérgica City',
  },
  reviewer: {
    '@type': 'Person',
    name: 'Gilberto Escalona',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Enérgica City',
    url: CANONICAL_DOMAIN,
  },
  datePublished: '2026-06-19',
  dateModified: '2026-06-19',
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
      name: '¿Qué es un circuito dedicado para el cargador de auto eléctrico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un circuito dedicado es un ramal eléctrico que parte desde el tablero general y llega exclusivamente al cargador, sin conectar ningún otro artefacto. Esto es obligatorio porque los cargadores EV de Nivel 2 trabajan durante horas a plena carga: si ese circuito compartiera carga con otros equipos, la corriente acumulada podría superar la capacidad del cableado, generando sobrecalentamiento o disparando el diferencial general. El circuito dedicado tiene su propio interruptor termomagnético y su propio diferencial en el tablero.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué necesito un diferencial tipo A y no uno estándar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los cargadores de vehículos eléctricos (Nivel 2 / AC) generan corrientes de fuga que tienen componente continua pulsante (DC ripple), además de la componente sinusoidal. Los diferenciales tipo AC solo detectan corrientes senoidales; el tipo A detecta ambas. La normativa chilena NCh Elec. 4/2003 y las guías de la SEC exigen explícitamente el uso de diferencial tipo A (o tipo F) para instalaciones de carga EV. Usar un diferencial incorrecto es un incumplimiento que invalida el certificado TE6 y puede dejar la instalación sin protección real ante una falla del cargador.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda la instalación de un Wallbox en casa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una instalación residencial estándar —casa con tablero moderno y estacionamiento a menos de 20 metros del tablero— tarda entre 4 y 8 horas de trabajo en el domicilio. En casas con tableros antiguos, distancias largas o muros de hormigón, puede requerir 2 días. El proceso completo, incluyendo la visita técnica previa, el trabajo de instalación y la emisión del certificado TE6, se completa en 1 a 3 días hábiles. El cotizador en línea de Enérgica City entrega precio referencial en menos de 2 minutos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre un cargador Nivel 1 y un cargador Nivel 2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El cargador de Nivel 1 usa el enchufe tradicional de 230 V y 10 A (tomacorriente doméstico). Entrega aproximadamente 2,3 kW y tarda 24 a 40 horas en cargar una batería de 60 kWh. No requiere instalación especial pero es muy lento para uso diario. El cargador de Nivel 2 (Wallbox) requiere un circuito dedicado y opera entre 3,7 kW y 22 kW, cargando la misma batería en 3 a 16 horas según el modelo. Para cualquier conductor que use el auto diariamente, el Nivel 2 es la opción práctica. La instalación del Nivel 2 es la que requiere el técnico SEC y el certificado TE6.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta instalar un cargador Wallbox en casa en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La instalación base en casa parte desde $159.000 CLP e incluye circuito dedicado, protecciones (diferencial tipo A + termomagnético), cable de cobre, canalización, montaje del Wallbox y certificado TE6. El precio aumenta con la distancia al tablero (más de 20 metros), tableros eléctricos antiguos o muros de hormigón. El Wallbox puede incluirse o cotizarse por separado. El cotizador en línea de Enérgica City calcula el precio según la distancia de tu estacionamiento al tablero en menos de 2 minutos.',
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
      name: 'Cómo Instalar un Cargador Eléctrico (Wallbox) en Casa: Guía Completa Chile',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const processSteps = [
  {
    num: '1',
    title: 'Evaluación técnica inicial',
    body: 'Un instalador autorizado visita tu domicilio para revisar: el estado de la instalación eléctrica, la capacidad del empalme (kW disponibles), la distancia desde el tablero eléctrico principal hasta el estacionamiento y si la red soporta la potencia extra que demandará el vehículo durante la carga nocturna. En viviendas con empalmes menores de 5 kW puede ser necesario solicitar un aumento de potencia a la distribuidora antes de instalar el cargador.',
    color: TEAL,
  },
  {
    num: '2',
    title: 'Cableado dedicado y equipamiento',
    body: 'La instalación exige un circuito independiente con cableado exclusivo para el cargador. Se usa cable de cobre AWG 6 (16 mm²) para cargadores de 32 A o AWG 8 (10 mm²) para 16 A, instalado en tubería conduit de protección. En el tablero principal se instalan: (1) interruptor diferencial tipo A de 30 mA y (2) interruptor termomagnético calibrado al amperaje del cargador. Estas protecciones son obligatorias por normativa NCh Elec. 4/2003 y son el elemento de seguridad más crítico de la instalación.',
    color: TEAL,
  },
  {
    num: '3',
    title: 'El cargador (Wallbox): Nivel 1 vs Nivel 2',
    body: 'Los cargadores de Nivel 1 usan el enchufe doméstico de 230 V / 10 A y entregan ~2,3 kW: suficientes para recargar de emergencia pero demasiado lentos para uso diario. Los cargadores de Nivel 2 (Wallbox) requieren instalación dedicada y operan entre 3,7 kW (16 A monofásico) y 22 kW (32 A trifásico), con conector Tipo 2 (estándar IEC 62196), compatible con todos los autos eléctricos vendidos en Chile. Los modelos más populares incluyen conectividad WiFi para programar la carga en horario nocturno de tarifa baja.',
    color: PINK,
  },
  {
    num: '4',
    title: 'Ejecución: canalización y montaje',
    body: 'El técnico realiza la canalización del cableado desde el tablero hasta el muro donde irá montado el Wallbox, respetando el trazado acordado en la visita técnica. El Wallbox se monta a entre 90 y 120 cm del suelo, en muro sólido, con las conexiones de tierra y fase verificadas con instrumento de medición. Antes del montaje final se realizan pruebas de aislamiento del cable para confirmar que no hay daño en la cubierta durante la instalación.',
    color: DARK,
  },
  {
    num: '5',
    title: 'Certificación: TE6 ante la SEC',
    body: 'Una vez terminada la instalación, el técnico emite el certificado TE6 ante la Superintendencia de Electricidad y Combustibles (SEC). Este documento certifica que el trabajo fue ejecutado por un instalador con credencial vigente y que cumple la normativa eléctrica chilena. El TE6 es obligatorio para mantener vigente el seguro de hogar y para regularizar la instalación ante la distribuidora. Enérgica City lo incluye en el precio de todas sus instalaciones, sin cobro adicional.',
    color: DARK,
  },
]

const levelComparison = [
  ['Tipo de toma', 'Tomacorriente estándar 230V/10A', 'Wallbox (circuito dedicado)'],
  ['Potencia entregada', '~2,3 kW', '3,7 kW – 22 kW'],
  ['Tiempo de carga (60 kWh)', '26 – 40 horas', '3 – 16 horas'],
  ['Instalación', 'Sin obras', 'Circuito dedicado + protecciones'],
  ['Certificado TE6', 'No aplica', 'Obligatorio'],
  ['Costo instalación', '$0 (ya instalado)', 'Desde $159.000'],
  ['Recomendado para', 'Emergencias / carga lenta', 'Uso diario — cualquier conductor'],
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
      <BlogBreadcrumb title="Cómo Instalar un Cargador Eléctrico (Wallbox) en Casa: Guía Completa Chile" />
      <Box component="main">
        {/* Featured image */}
        <Box sx={{ width: '100%', lineHeight: 0 }}>
          <Image
            src="/images/post/33_1170x400.png"
            alt="Cómo instalar un cargador eléctrico Wallbox en casa guía completa Chile"
            width={1170}
            height={400}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </Box>
        {/* Hero */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${DARK} 0%, #1E3A5F 100%)`,
            color: '#fff',
            py: { xs: 8, md: 12 },
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {['Wallbox', 'Guía Completa', 'Instalación', 'Chile 2026'].map((tag) => (
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
              ))}
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
              Cómo Instalar un Cargador Eléctrico (Wallbox) en Casa: Guía Completa
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 640,
                lineHeight: 1.7,
              }}
            >
              Desde la evaluación técnica del empalme hasta el certificado TE6: todo el proceso para
              instalar un cargador de auto eléctrico en tu casa de forma segura, correcta y
              certificada.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '$159.000', label: 'Instalación base en casa (TE6 incluido)' },
                { value: '5 pasos', label: 'Proceso completo certificado' },
                { value: '7,4 kW', label: 'Cargador estándar recomendado (32A)' },
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
            {/* GEO definition block */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}
            >
              ¿Qué se necesita para instalar un cargador eléctrico en casa?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              Instalar un cargador Wallbox en casa requiere una visita técnica previa para evaluar la
              capacidad eléctrica del empalme y un instalador con credencial SEC vigente. El proyecto
              incluye adecuar el tablero eléctrico con protecciones dedicadas —interruptor diferencial
              tipo A y termomagnético—, tender un cableado exclusivo de cobre calibrado al amperaje
              del cargador y configurar el equipo. Al finalizar, el técnico emite el certificado TE6
              ante la SEC. En Chile, el precio base parte desde{' '}
              <Link href="/blog/presupuesto-instalacion-cargador-electrico-desglose" style={{ color: TEAL, fontWeight: 600 }}>
                $159.000 en casas con distancias estándar
              </Link>{' '}
              al tablero. Para edificios y departamentos, Enérgica City ofrece{' '}
              <Link href="/blog/instalar-cargador-ev-departamento-edificio" style={{ color: TEAL, fontWeight: 600 }}>
                3 opciones según tu situación
              </Link>
              .
            </Typography>

            {/* Process steps */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 4, mt: 2 }}
            >
              El proceso completo: 5 pasos clave
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
              {processSteps.map((step) => (
                <Box
                  key={step.num}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid #E2E8F0',
                    borderLeft: `4px solid ${step.color}`,
                    background: GRAY_BG,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: step.color,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1rem',
                        flexShrink: 0,
                      }}
                    >
                      {step.num}
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: DARK }}>
                      {step.title}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75 }}>
                    {step.body}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Level comparison table */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}
            >
              Cargador Nivel 1 vs Nivel 2 (Wallbox)
            </Typography>
            <Box sx={{ overflowX: 'auto', mb: 6 }}>
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
                  },
                  '& td': {
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid #E2E8F0',
                    fontSize: '0.875rem',
                    color: DARK,
                  },
                  '& tr:nth-of-type(even) td': { bgcolor: '#F1F5F9' },
                }}
              >
                <thead>
                  <tr>
                    <th>Característica</th>
                    <th>Nivel 1</th>
                    <th>Nivel 2 (Wallbox)</th>
                  </tr>
                </thead>
                <tbody>
                  {levelComparison.map(([feature, n1, n2]) => (
                    <tr key={feature}>
                      <td style={{ fontWeight: 600 }}>{feature}</td>
                      <td style={{ color: TEXT_MUTED }}>{n1}</td>
                      <td style={{ color: TEAL, fontWeight: 600 }}>{n2}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>

            {/* Providers section */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 2, mt: 2 }}
            >
              Gestores y proveedores de instalación en Chile
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              En Chile existen varios proveedores que ofrecen instalación llave en mano para
              cargadores domiciliarios. La diferencia clave está en la certificación SEC y la
              emisión del TE6. Las principales opciones en el mercado son:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
              {[
                {
                  name: 'Enérgica City',
                  desc: 'Empresa especializada en electromovilidad con técnicos SEC, alianza con Abastibletec y cotizador online. Emisión de TE6 incluida. Proyectos residenciales, edificios y flota corporativa. Instalación desde $159.000 en casas.',
                  highlight: true,
                },
                {
                  name: 'Copec Voltex',
                  desc: 'División de electromovilidad de Copec. Ofrece cargadores residenciales y comerciales con instalación a domicilio.',
                  highlight: false,
                },
                {
                  name: 'Enel X',
                  desc: 'Servicio de instalación de cargadores residenciales con foco en clientes residenciales de Enel.',
                  highlight: false,
                },
                {
                  name: 'Ayvens Chile',
                  desc: 'Gestión de movilidad eléctrica para flotas corporativas, con soluciones de carga domiciliaria para conductores de flota.',
                  highlight: false,
                },
              ].map((provider) => (
                <Box
                  key={provider.name}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    border: `1px solid ${provider.highlight ? TEAL : '#E2E8F0'}`,
                    borderLeft: `4px solid ${provider.highlight ? TEAL : '#CBD5E1'}`,
                    background: provider.highlight ? '#EFF9FC' : GRAY_BG,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: provider.highlight ? TEAL : DARK,
                      fontSize: '0.95rem',
                      mb: 0.5,
                    }}
                  >
                    {provider.name}
                    {provider.highlight && (
                      <Box
                        component="span"
                        sx={{
                          ml: 1.5,
                          px: 1.5,
                          py: 0.3,
                          borderRadius: '999px',
                          background: TEAL,
                          color: '#fff',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}
                      >
                        ESPECIALIZADO EV
                      </Box>
                    )}
                  </Typography>
                  <Typography sx={{ color: TEXT_MUTED, fontSize: '0.88rem', lineHeight: 1.7 }}>
                    {provider.desc}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Topic cluster internal links */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}
            >
              Profundiza en el cluster temático
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              {[
                {
                  href: '/blog/que-tan-confiable-es-energica-city-cargador-electrico',
                  label: '¿Enérgica City es confiable? Sus credenciales y garantías',
                  desc: 'Respaldo SEC, alianza Abastibletec, proyectos Chilexpress y MOP.',
                },
                {
                  href: '/blog/instalacion-cargador-electrico-vivienda',
                  label: 'Guía técnica: cableado, protecciones y normativa',
                  desc: 'AWG 6 vs AWG 8, diferencial tipo A, cargadores 16A vs 32A.',
                },
                {
                  href: '/blog/presupuesto-instalacion-cargador-electrico-desglose',
                  label: 'Desglose de costos: $159.000 a $369.000',
                  desc: 'Qué incluye cada ítem y qué factores pueden encarecer la instalación.',
                },
                {
                  href: '/blog/tramite-sec-te6-electromovilidad-plazos-requisitos',
                  label: 'Trámite TE6 ante la SEC: plazos y requisitos',
                  desc: 'Por qué el TE6 protege tu seguro de hogar y cómo funciona el proceso.',
                },
                {
                  href: '/blog/seguridad-electrica-cargadores-ev-protecciones-necesarias',
                  label: 'Protecciones eléctricas críticas para cargadores EV',
                  desc: 'Diferencial tipo A, termomagnético y puesta a tierra: qué exige la normativa.',
                },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      border: '1px solid #E2E8F0',
                      background: GRAY_BG,
                      '&:hover': { borderColor: TEAL, background: '#EFF9FC' },
                      transition: 'all 0.15s',
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, color: TEAL, fontSize: '0.95rem', mb: 0.5 }}>
                      {link.label}
                    </Typography>
                    <Typography sx={{ color: TEXT_MUTED, fontSize: '0.88rem' }}>{link.desc}</Typography>
                  </Box>
                </Link>
              ))}
            </Box>
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
              Preguntas frecuentes sobre instalación de Wallbox en casa
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

        {/* Related articles */}
        <BlogRelatedArticles currentUid={SLUG} />

        {/* Author byline */}
        <AuthorByline />

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
              Obtén tu precio exacto en 2 minutos
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 5,
                fontSize: '1.05rem',
              }}
            >
              Instalación desde{' '}
              <strong style={{ color: '#fff' }}>$159.000 en casas</strong> y{' '}
              <strong style={{ color: '#fff' }}>$369.000 en edificios</strong> — TE6 incluido.
              Técnicos SEC certificados a domicilio.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/cotizador" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    px: 4,
                    py: 1.75,
                    background: TEAL,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { background: TEAL_DARK },
                    cursor: 'pointer',
                  }}
                >
                  Cotizar ahora (2 min)
                </Box>
              </Link>
              <Link href="/agenda" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    px: 4,
                    py: 1.75,
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

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

const SLUG = 'guia-cargar-auto-electrico-casa-normativa-sec-te6'

export const metadata: Metadata = {
  title: 'Guía para Cargar tu Auto Eléctrico en Casa: Normativa SEC, TE6 y RIC N°15 Chile',
  description:
    'Guía definitiva sobre carga domiciliaria de autos eléctricos en Chile: enchufe vs Wallbox, normativa SEC RIC N°15, certificado TE6 obligatorio, gestión de carga y costos. Cotiza en 2 minutos.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Guía para Cargar tu Auto Eléctrico en Casa: Normativa SEC, TE6 y RIC N°15 Chile',
    description:
      'Todo sobre carga domiciliaria EV en Chile: Wallbox vs enchufe, certificado TE6, RIC N°15, gestión dinámica de carga y costos de instalación.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/post/32_1170x400.png`,
        width: 1170,
        height: 400,
        alt: 'Guía carga auto eléctrico en casa normativa SEC TE6 Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargar tu Auto Eléctrico en Casa: Normativa SEC y TE6',
    description:
      'Wallbox vs enchufe, certificado TE6, RIC N°15 y gestión de carga. La guía definitiva para Chile.',
    images: [`${CANONICAL_DOMAIN}/images/post/32_1170x400.png`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  image: {
    '@type': 'ImageObject',
    url: `${CANONICAL_DOMAIN}/images/post/32_1170x400.png`,
    width: 1170,
    height: 400,
  },
  headline: 'Guía para Cargar tu Auto Eléctrico en Casa en Chile: Normativa SEC, TE6 y RIC N°15',
  description:
    'Guía completa sobre carga domiciliaria de vehículos eléctricos en Chile: opciones de carga, normativa SEC RIC N°15, certificado TE6, gestión dinámica de carga y situaciones habitacionales.',
  author: {
    '@type': 'Person',
    name: 'Felipe Donoso',
    '@id': 'https://www.energica.city/#author-felipe-donoso',
    jobTitle: 'Ingeniero Eléctrico, Enérgica City',
  url: `${CANONICAL_DOMAIN}/que-es-energica-city`,
  },
  contributor: {
    '@type': 'Person',
    name: 'Gilberto Escalona',
    '@id': 'https://www.energica.city/#author-gilberto-escalona',
    jobTitle: 'Gerente Técnico, Enérgica City',
    url: `${CANONICAL_DOMAIN}/que-es-energica-city`,
    sameAs: 'https://www.linkedin.com/in/gilbertoescalona/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Enérgica City',
    '@id': 'https://www.energica.city/#organization',
    url: CANONICAL_DOMAIN,
    logo: { '@type': 'ImageObject', url: `${CANONICAL_DOMAIN}/images/logos/logo.png`, width: 259, height: 42 },
  },
  inLanguage: 'es-CL',
  articleSection: 'Normativa',
  datePublished: '2026-06-19',
  dateModified: '2026-07-07',
  url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${CANONICAL_DOMAIN}/blog/${SLUG}`,
  },
  keywords:
    'cargar auto eléctrico casa, carga domiciliaria vehículo eléctrico Chile, normativa SEC cargador, TE6 cargador eléctrico, RIC 15 SEC, Wallbox 7.4 kW Chile, instalación cargador SEC certificado',
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo instalar un cargador eléctrico en casa cumpliendo la normativa SEC en Chile',
  description: 'Pasos para instalar un Wallbox en vivienda o edificio con certificado TE6, cumpliendo la normativa RIC N°15 de la SEC.',
  totalTime: 'P3D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Evalúa tu situación habitacional',
      text: 'Determina si tienes casa propia, arriendo o departamento, ya que cada caso tiene un proceso distinto de autorización para la instalación.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Contrata un instalador certificado SEC',
      text: 'Solo un instalador con credencial SEC vigente puede emitir el certificado TE6 obligatorio. Verifica la credencial en sec.cl antes de contratar.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Evalúa el empalme y capacidad eléctrica',
      text: 'El instalador mide la capacidad disponible del empalme. Si tienes 25 A (5,5 kW) y el Wallbox requiere 7,4 kW, puede necesitarse un aumento de empalme o gestión dinámica de carga.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Instala el circuito dedicado y protecciones',
      text: 'Se instala cableado exclusivo desde el tablero hasta el cargador, con diferencial tipo A y termomagnético según la normativa RIC N°15.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Declara el TE6 en la plataforma e-Declarador de la SEC',
      text: 'El instalador ingresa todos los datos técnicos del cargador y el empalme en el e-Declarador de la SEC. Sin este paso, el cargador no puede energizarse legalmente.',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Puedo cargar mi auto eléctrico en el enchufe normal de mi casa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, pero no es recomendable para uso diario. El enchufe convencional de 230 V / 10 A entrega apenas 2,3 kW, lo que significa que cargar una batería de 40 kWh tomaría casi 17 horas. Además, los enchufes domésticos no están diseñados para soportar corriente sostenida durante tantas horas, lo que puede generar sobrecalentamiento. La solución correcta para uso diario es un Wallbox de 7,4 kW instalado con circuito dedicado y certificado TE6, que carga la misma batería en menos de 6 horas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el certificado TE6 y por qué es obligatorio para cargadores EV?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El TE6 es la declaración electrónica de instalación eléctrica interior que se registra ante la SEC (Superintendencia de Electricidad y Combustibles). Certifica que el cargador fue instalado por un técnico con credencial vigente y que cumple la normativa eléctrica vigente, incluyendo el Pliego Técnico RIC N°15 específico para infraestructura de recarga de vehículos eléctricos (IRVE). Sin TE6, la instalación no está regularizada: el seguro de hogar puede rechazar siniestros relacionados y la garantía del vehículo puede verse afectada. Enérgica City incluye el trámite TE6 en el precio de cada instalación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el RIC N°15 de la SEC y cómo afecta mi instalación?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El RIC N°15 (Pliego Técnico Normativo) es el reglamento específico de la SEC para instalaciones de recarga de vehículos eléctricos (IRVE). Establece las condiciones mínimas de seguridad: circuito dedicado exclusivo para el cargador, protecciones diferenciales tipo A o B (que detectan corrientes continuas pulsantes), protecciones termomagnéticas calibradas al amperaje del cargador, correcta puesta a tierra y evaluación de la capacidad del empalme. El instalador SEC es responsable de cumplir todos estos requisitos antes de declarar el TE6.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa si mi empalme no tiene capacidad para el Wallbox de 7,4 kW?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si tu empalme domiciliario es de 25 A (aproximadamente 5,5 kW) y el Wallbox requiere 7,4 kW, hay dos soluciones. La primera es solicitar un aumento de empalme a tu distribuidora (Enel, CGE, Chilquinta), proceso que puede tomar varias semanas. La segunda —y más rápida— es configurar la gestión dinámica de carga del Wallbox: el cargador reduce automáticamente su potencia cuando otros electrodomésticos del hogar están en uso, evitando superar el límite del empalme. Los Wallbox inteligentes con conectividad WiFi generalmente incluyen esta función. El instalador SEC evalúa cuál opción es apropiada para tu caso durante la visita técnica.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo instalar un cargador si vivo en un departamento en edificio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, pero el proceso es más complejo que en una casa. Si el estacionamiento es de uso común, en muchos casos basta con el permiso del administrador del edificio para instalar una electrolinera comunitaria (Enérgica City la financia con inversión $0 para la comunidad). Si quieres un cargador privado en tu estacionamiento, necesitarás la autorización de la asamblea de propietarios según la Ley de Copropiedad 21.442. Enérgica City ofrece un kit de documentos por $29.000 (acreditable al presupuesto) con memoria técnica y carta tipo para presentar a la administración.',
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
      name: 'Guía para Cargar tu Auto Eléctrico en Casa: Normativa SEC, TE6 y RIC N°15',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const chargingOptions = [
  {
    title: 'Enchufe tradicional (Nivel 1)',
    badge: 'EMERGENCIA',
    badgeBg: TEXT_MUTED,
    power: '~2,3 kW',
    time: '~17 h para 40 kWh',
    install: 'Sin obras',
    cost: '$0',
    verdict: 'Solo para respaldo',
    borderColor: '#CBD5E1',
  },
  {
    title: 'Wallbox 7,4 kW (Nivel 2)',
    badge: 'RECOMENDADO',
    badgeBg: TEAL,
    power: '7,4 kW',
    time: '~6 h para 40 kWh',
    install: 'Circuito dedicado + TE6',
    cost: 'Desde $159.000',
    verdict: 'Solución ideal para uso diario',
    borderColor: TEAL,
  },
]

const ricRequirements = [
  {
    title: 'Circuito dedicado exclusivo',
    body: 'El cargador no puede compartir el circuito con luces, enchufes u otros artefactos del hogar. Requiere cableado de cobre propio desde el tablero principal hasta el punto de instalación, dimensionado al amperaje del Wallbox.',
  },
  {
    title: 'Protecciones diferenciales tipo A o B',
    body: 'El RIC N°15 exige diferencial tipo A (mínimo) o tipo B. Los diferenciales tipo AC estándar no son válidos para cargadores EV, ya que no detectan las corrientes de fuga con componente continua pulsante que generan los cargadores de Nivel 2.',
  },
  {
    title: 'Protección termomagnética calibrada',
    body: 'Se instala un interruptor termomagnético en el tablero, calibrado al amperaje del Wallbox (típicamente 16 A para 3,7 kW o 32 A para 7,4 kW). Protege el cableado en caso de sobrecarga sostenida o cortocircuito.',
  },
  {
    title: 'Puesta a tierra correcta',
    body: 'El sistema de puesta a tierra de toda la instalación debe estar en correcto estado antes de instalar el cargador. El instalador verifica la continuidad y resistencia de la tierra durante la visita técnica.',
  },
  {
    title: 'Evaluación del empalme y gestión de carga',
    body: 'El técnico mide la capacidad real del empalme y determina si puede soportar la carga del Wallbox. Si no, evalúa aumento de empalme a la distribuidora o configuración de gestión dinámica de carga en el Wallbox.',
  },
]

const housingCases = [
  {
    case: 'Casa propia con estacionamiento',
    process: 'Escenario ideal. Instalación directa con técnico SEC. TE6 incluido. Sin autorizaciones externas.',
    color: TEAL,
  },
  {
    case: 'Arriendo casa',
    process: 'Necesitas autorización del propietario. La instalación es una mejora a la propiedad — en muchos casos acordable económicamente.',
    color: TEAL,
  },
  {
    case: 'Departamento en edificio',
    process: 'Requiere gestión según la Ley de Copropiedad 21.442. Enérgica City ofrece electrolinera $0 (solo permiso del admin) o kit de documentos $29.000 para instalación privada.',
    color: PINK,
  },
  {
    case: 'Sin estacionamiento privado',
    process: 'No puedes instalar cargador domiciliario. Dependerás de la red de carga pública (Copec Voltex, Enel X Way) o electrolineras municipales.',
    color: '#64748B',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
      <BlogBreadcrumb title="Guía para Cargar tu Auto Eléctrico en Casa: Normativa SEC, TE6 y RIC N°15" />
      <Box component="main">
        {/* Featured image */}
        <Box sx={{ width: '100%', lineHeight: 0 }}>
          <Image
            src="/images/post/32_1170x400.png"
            alt="Guía para cargar tu auto eléctrico en casa normativa SEC TE6 Chile"
            width={1170}
            height={400}
            sizes="(max-width: 768px) 100vw, 1170px"
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
              {['Carga Domiciliaria', 'Normativa SEC', 'TE6', 'RIC N°15', 'Chile 2026'].map((tag) => (
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
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, lineHeight: 1.15, mb: 3, maxWidth: 820 }}
            >
              Guía Definitiva para Cargar tu Auto Eléctrico en Casa: Normativa SEC, TE6 y RIC N°15
            </Typography>
          <Box
            component="time"
            dateTime="2026-06-19"
            sx={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', mt: 1.5, letterSpacing: '0.02em' }}
          >
            19 de junio, 2026
          </Box>
          <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
            Por <strong>Felipe Donoso</strong> · Ingeniero Eléctrico, Enérgica City
          </Typography>
            <Typography
              sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.75)', maxWidth: 640, lineHeight: 1.7, mb: 5 }}
            >
              Tu hogar puede ser tu estación de servicio principal. Aquí está todo lo que necesitas
              saber: opciones de carga, qué exige la SEC, cómo funciona el TE6 y qué pasa si tu
              empalme no tiene capacidad suficiente.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  '&:hover': { bgcolor: PINK_DARK },
                }}
              >
                Cotizar instalación →
              </Box>
              <Box
                component={Link}
                href="/cargadores-vehiculos-electricos-sin-instalacion"
                sx={{
                  display: 'inline-block',
                  bgcolor: 'transparent',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.4)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                Ver cargadores →
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '7,4 kW', label: 'Wallbox estándar más instalado en Chile' },
                { value: 'RIC N°15', label: 'Normativa SEC para IRVE' },
                { value: 'TE6', label: 'Certificado obligatorio en toda instalación' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Box sx={{ textAlign: 'center', color: '#fff' }}>
                    <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800 }}>
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
            <Typography component="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}>
              ¿Cómo cargar un auto eléctrico en casa en Chile?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              Cargar un auto eléctrico en casa en Chile se hace de dos formas: conectándolo a un
              enchufe convencional de 230 V (Nivel 1, ~2,3 kW, muy lento) o instalando un Wallbox
              de Nivel 2 con circuito dedicado (7,4 kW en la mayoría de los hogares chilenos).
              Toda instalación de Wallbox está regulada por el Pliego Técnico RIC N°15 de{' '}
              <a href="https://www.sec.cl/" target="_blank" rel="noopener noreferrer">la SEC</a>{' '}
              y debe certificarse mediante el trámite TE6, emitido únicamente por instaladores con
              credencial SEC vigente. El costo de instalación parte desde $159.000 en casas y desde
              $369.000 en edificios. Puedes obtener un{' '}
              <Link href="/cotizador" style={{ color: TEAL, fontWeight: 600 }}>
                precio exacto en el cotizador online de Enérgica City
              </Link>{' '}
              en menos de 2 minutos.
            </Typography>

            {/* Options comparison */}
            <Typography component="h2" sx={{ lineHeight: 1.4, fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 4, mt: 2 }}>
              ¿Enchufe o Wallbox? Las dos opciones para cargar tu auto en casa
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 6 }}>
              {chargingOptions.map((opt) => (
                <Box
                  key={opt.title}
                  sx={{ p: 3, borderRadius: 2, border: `2px solid ${opt.borderColor}`, background: GRAY_BG }}
                >
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1.5,
                      py: 0.4,
                      borderRadius: '999px',
                      background: opt.badgeBg,
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      mb: 1.5,
                    }}
                  >
                    {opt.badge}
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: DARK, mb: 2 }}>
                    {opt.title}
                  </Typography>
                  {[
                    ['Potencia', opt.power],
                    ['Tiempo de carga (40 kWh)', opt.time],
                    ['Instalación', opt.install],
                    ['Costo', opt.cost],
                  ].map(([label, value]) => (
                    <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E2E8F0' }}>
                      <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>{label}</Typography>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: DARK }}>{value}</Typography>
                    </Box>
                  ))}
                  <Typography sx={{ mt: 1.5, fontSize: '0.88rem', fontWeight: 700, color: opt.borderColor }}>
                    {opt.verdict}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Wallbox recommendation */}
            <Box sx={{ p: 3, mb: 6, background: '#EFF9FC', borderRadius: 2, borderLeft: `4px solid ${TEAL}` }}>
              <Typography sx={{ fontWeight: 700, color: DARK, mb: 1 }}>
                Dato Enérgica City
              </Typography>
              <Typography sx={{ color: '#334155', lineHeight: 1.8, fontSize: '0.95rem' }}>
                La mayoría de los hogares en Chile opta por instalar un Wallbox de{' '}
                <strong>7,4 kW monofásico</strong>: el equilibrio perfecto entre velocidad de carga
                y la capacidad de los empalmes residenciales estándar de 25–40 A. Simplemente
                conectas el auto al llegar, programas la carga para las horas nocturnas y por la
                mañana tienes la batería al 100%.{' '}
                <Link href="/blog/comparativa-cargadores-vehiculos-electricos-chile-2026" style={{ color: TEAL, fontWeight: 600 }}>
                  Ver comparativa de Wallbox disponibles →
                </Link>
              </Typography>
            </Box>

            {/* Housing cases */}
            <Typography component="h2" sx={{ lineHeight: 1.4, fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}>
              ¿Puedo instalar un cargador según mi tipo de vivienda?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 6 }}>
              {housingCases.map((item) => (
                <Box
                  key={item.case}
                  sx={{ p: 3, borderRadius: 2, border: '1px solid #E2E8F0', borderLeft: `4px solid ${item.color}`, background: GRAY_BG }}
                >
                  <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.75, fontSize: '1rem' }}>
                    {item.case}
                  </Typography>
                  <Typography sx={{ color: TEXT_MUTED, lineHeight: 1.7, fontSize: '0.93rem' }}>
                    {item.process}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Factor costo */}
            <Typography component="h2" sx={{ lineHeight: 1.4, fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 2, mt: 2 }}>
              ¿Cuánto cuesta instalar un cargador en casa?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El costo de instalación depende del tipo de propiedad y la distancia desde el tablero
              hasta el punto de carga. Para instalaciones particulares, el costo del equipo y la
              instalación corren por cuenta del propietario. Para autos adquiridos mediante leasing
              operativo empresarial, el cargador domiciliario puede incluirse en la cuota mensual.
            </Typography>
            <Box sx={{ overflowX: 'auto', mb: 6 }}>
              <Box
                component="table"
                sx={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  '& th': { bgcolor: DARK, color: '#fff', px: 2, py: 1.5, textAlign: 'left', fontSize: '0.85rem', fontWeight: 700 },
                  '& td': { px: 2, py: 1.5, borderBottom: '1px solid #E2E8F0', fontSize: '0.875rem', color: DARK },
                  '& tr:nth-of-type(even) td': { bgcolor: '#F1F5F9' },
                }}
              >
                <thead>
                  <tr>
                    <th>Tipo de instalación</th>
                    <th>Precio base</th>
                    <th>Incluye</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Casa — hasta 10 m al tablero', 'Desde $159.000', 'Circuito + protecciones + TE6'],
                    ['Casa — 20–40 m al tablero', 'Desde $215.000', 'Circuito + protecciones + TE6'],
                    ['Edificio — instalación dedicada', 'Desde $369.000', 'Proyecto completo + TE6'],
                    ['Edificio — visita técnica + kit docs', '$29.000', 'Acreditable al presupuesto final'],
                    ['Edificio — electrolinera comunitaria', '$0', '$330/kWh consumido'],
                  ].map(([tipo, precio, incluye]) => (
                    <tr key={tipo}>
                      <td style={{ fontWeight: 600 }}>{tipo}</td>
                      <td style={{ color: TEAL, fontWeight: 700 }}>{precio}</td>
                      <td style={{ color: TEXT_MUTED }}>{incluye}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Normativa SEC — RIC N°15 */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography component="h2" sx={{ lineHeight: 1.4, fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 2 }}>
              ¿Qué exige la SEC para instalar un cargador EV en casa?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 2 }}>
              En Chile, instalar un punto de carga domiciliario no equivale a "poner un enchufe más
              potente". Toda infraestructura de recarga de vehículos eléctricos (IRVE) está regulada
              por el <strong>Pliego Técnico RIC N°15</strong> de la SEC y debe certificarse mediante
              el <strong>trámite TE6</strong> (declaración electrónica de energización). Ningún
              cargador eléctrico puede energizarse legalmente en Chile sin este registro formal.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 5 }}>
              El TE6 garantiza que el trabajo fue ejecutado por un instalador con credencial SEC
              vigente, que el equipo cuenta con la resolución de aprobación SEC para operar en Chile
              y que se resguarda la responsabilidad civil ante incidentes eléctricos, incluyendo la
              vigencia del seguro de hogar.
            </Typography>

            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, color: DARK, mb: 3 }}>
              Exigencias técnicas del RIC N°15
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
              {ricRequirements.map((req, i) => (
                <Box key={req.title} sx={{ display: 'flex', gap: 2.5, p: 2.5, background: '#fff', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: TEAL,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: DARK, fontSize: '0.95rem', mb: 0.5 }}>
                      {req.title}
                    </Typography>
                    <Typography sx={{ color: TEXT_MUTED, fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {req.body}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* TE6 checklist */}
            <Typography component="h3" sx={{ fontSize: '1.3rem', fontWeight: 700, color: DARK, mb: 3 }}>
              Buenas prácticas para no tener problemas con el TE6
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
              {[
                'Exige equipos con resolución SEC vigente antes de comprar a ciegas. Verifica en sec.cl.',
                'Pide al instalador un diagnóstico del tablero y la capacidad disponible antes de la instalación.',
                'En edificios, la declaración TE6 debe indicar si las instalaciones afectarán áreas comunes.',
                'Verifica que todos los datos técnicos del cargador estén correctos en el e-Declarador antes de declarar.',
                'Guarda copia del TE6 junto a los documentos de la propiedad — lo necesitarás si vendes o refinancias.',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Typography sx={{ color: TEAL, fontWeight: 700, fontSize: '1rem', mt: 0.1, flexShrink: 0 }}>✓</Typography>
                  <Typography sx={{ color: '#334155', fontSize: '0.92rem', lineHeight: 1.7 }}>{item}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Topic cluster links */}
        <Box sx={{ py: { xs: 6, md: 8 }, background: '#fff' }}>
          <Container maxWidth="md">
            <Typography component="h2" sx={{ lineHeight: 1.4, fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3 }}>
              Profundiza en el cluster temático
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                {
                  href: '/blog/comparativa-cargadores-vehiculos-electricos-chile-2026',
                  label: 'Comparativa de Wallbox en Chile 2026: 8 modelos con precios',
                  desc: 'ZEERO, EFFITEC, LIVOLTEK, KPN, BESTE y BENY comparados ítem a ítem.',
                },
                {
                  href: '/blog/instalar-cargador-electrico-casa-wallbox',
                  label: 'Cómo instalar un Wallbox en casa: guía completa paso a paso',
                  desc: 'Evaluación técnica, cableado, protecciones y certificado TE6.',
                },
                {
                  href: '/blog/tramite-sec-te6-electromovilidad-plazos-requisitos',
                  label: 'Trámite TE6 ante la SEC: plazos y requisitos detallados',
                  desc: 'Cómo funciona el e-Declarador y por qué el TE6 protege tu seguro.',
                },
                {
                  href: '/blog/seguridad-electrica-cargadores-ev-protecciones-necesarias',
                  label: 'Protecciones eléctricas críticas para cargadores EV',
                  desc: 'Diferencial tipo A, termomagnético y puesta a tierra: normativa y práctica.',
                },
                {
                  href: '/blog/cargador-portatil-vs-wallbox-cual-conviene',
                  label: 'Cargador portátil vs Wallbox: ¿cuál conviene?',
                  desc: 'Comparativa de potencia, seguridad y costo para elegir correctamente.',
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
            <Typography component="h2" sx={{ lineHeight: 1.4, fontSize: { xs: '1.5rem', md: '1.9rem' }, fontWeight: 700, color: DARK, mb: 5, textAlign: 'center' }}>
              Preguntas frecuentes sobre carga domiciliaria y normativa SEC
            </Typography>
            {faqSchema.mainEntity.map((item) => (
              <Box
                key={item.name}
                sx={{ mb: 3, p: 3, background: '#fff', borderRadius: 2, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
              >
                <Typography sx={{ fontWeight: 700, color: DARK, mb: 1 }}>{item.name}</Typography>
                <Typography sx={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {item.acceptedAnswer.text}
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>

        <BlogRelatedArticles currentUid={SLUG} />
        <AuthorByline dateModified="2026-07-07" />

        {/* Dark CTA band */}
        <Box sx={{ background: DARK, py: { xs: 8, md: 10 } }}>
          <Container maxWidth="md">
            <Typography sx={{ fontSize: { xs: '1.7rem', md: '2.4rem' }, fontWeight: 800, color: '#fff', textAlign: 'center', mb: 2 }}>
              Cotiza tu instalación o compra tu Wallbox hoy
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: 5, fontSize: '1.05rem' }}>
              Técnicos SEC certificados en RM y Valparaíso. Instalación desde $159.000 con TE6 incluido.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/cotizador" style={{ textDecoration: 'none' }}>
                <Box sx={{ px: 4, py: 1.75, background: TEAL, color: '#fff', fontWeight: 700, fontSize: '1rem', '&:hover': { background: TEAL_DARK }, cursor: 'pointer' }}>
                  Cotizar instalación →
                </Box>
              </Link>
              <Link href="/cargadores-vehiculos-electricos-sin-instalacion" style={{ textDecoration: 'none' }}>
                <Box sx={{ px: 4, py: 1.75, border: `2px solid ${PINK}`, color: PINK, fontWeight: 700, fontSize: '1rem', '&:hover': { background: PINK, color: '#fff' }, cursor: 'pointer' }}>
                  Ver cargadores →
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

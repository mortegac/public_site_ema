import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import BlogBreadcrumb from '@/app/components/shared/BlogBreadcrumb'
import AuthorByline from '@/app/components/shared/AuthorByline'
import StepsList from '@/app/components/shared/StepsList'
import BlogRelatedArticles from '@/app/components/shared/BlogRelatedArticles'
import { CANONICAL_DOMAIN } from '@/utils/seo-config'

const DARK = '#0F172A'
const TEAL = '#0898b9'
const TEAL_DARK = '#0777a0'
const PINK = '#e81a68'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'

const SLUG = 'como-usar-cotizador-cargador-electrico'

export const metadata: Metadata = {
  title: 'Cómo Usar el Cotizador de Cargadores EV — Guía Paso a Paso',
  description:
    'Guía paso a paso para usar el cotizador online de cargadores eléctricos de Enérgica City. Casa o edificio, portátil o Wallbox, electrolinera comunitaria $0. Presupuesto exacto en 2 minutos.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Cómo Usar el Cotizador de Cargadores EV — Guía Paso a Paso',
    description:
      'Guía paso a paso para usar el cotizador online de cargadores eléctricos de Enérgica City. Casa o edificio, portátil o Wallbox, electrolinera comunitaria $0. Presupuesto exacto en 2 minutos.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/post/27_1170x400.png`,
        width: 1170,
        height: 400,
        alt: 'Cotizador online cargadores eléctricos Enérgica City',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cómo Usar el Cotizador de Cargadores Eléctricos: Paso a Paso',
    description:
      'Obtén el precio exacto de tu instalación en menos de 2 minutos. Sin registro, sin llamadas. Casa o edificio en RM y Valparaíso.',
    images: [`${CANONICAL_DOMAIN}/images/post/27_1170x400.png`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Cómo Usar el Cotizador de Cargadores Eléctricos de Enérgica City: Paso a Paso',
  description:
    'Guía paso a paso para usar el cotizador online de cargadores eléctricos de Enérgica City. Casa o edificio, portátil o Wallbox, electrolinera comunitaria $0. Presupuesto exacto en 2 minutos.',
  image: {
    '@type': 'ImageObject',
    url: `${CANONICAL_DOMAIN}/images/post/27_1170x400.png`,
    width: 1170,
    height: 400,
  },
  author: {
    '@type': 'Person',
    name: 'Felipe Donoso',
    '@id': 'https://www.energica.city/#author-felipe-donoso',
    jobTitle: 'Ingeniero Eléctrico, Enérgica City',
    url: `${CANONICAL_DOMAIN}/que-es-energica-city`,
    sameAs: 'https://www.linkedin.com/in/felipedonosovergara/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Enérgica City',
    '@id': 'https://www.energica.city/#organization',
    url: CANONICAL_DOMAIN,
    logo: { '@type': 'ImageObject', url: `${CANONICAL_DOMAIN}/images/logos/logo.png`, width: 259, height: 42 },
  },
  inLanguage: 'es-CL',
  articleSection: 'Guías',
  keywords: 'cotizador cargador eléctrico, presupuesto instalación cargador EV, cargador Wallbox precio Chile, cotizar instalación cargador Chile, cargador portátil vehículo eléctrico precio, instalación cargador casa departamento, cotizador online electromovilidad',
  datePublished: '2026-06-11',
  dateModified: '2026-07-08',
  url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${CANONICAL_DOMAIN}/blog/${SLUG}`,
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo cotizar la instalación de un cargador eléctrico en Chile',
  description:
    'Guía para obtener un presupuesto exacto de instalación de cargador EV usando el cotizador online de Enérgica City.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Cotizador online Enérgica City' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Elige Casa o Edificio',
      text: 'Selecciona el tipo de propiedad donde instalarás el cargador. Casa activa la instalación estándar desde $159.000. Edificio activa opciones adicionales incluyendo electrolinera $0.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Selecciona tu cargador',
      text: 'Elige entre cargador portátil (2.2–7 kW) o Wallbox fijo (7–7.3 kW). Ajusta el slider de distancia al tablero eléctrico: afecta el precio entre 0.85× (descuento hasta 5 m) y 1.55× (40+ m).',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Revisa la cotización',
      text: 'El cotizador muestra el desglose completo: materiales, mano de obra, trámite SEC (TE6) y precio del cargador. Todos los valores incluyen IVA.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Elige tu opción (edificios)',
      text: 'Si elegiste Edificio, selecciona entre tres opciones: Electrolinera comunitaria ($0, en estacionamiento de visitas), Visita técnica + kit de documentos ($29.000, acreditable), o Instalación dedicada en tu estacionamiento privado.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Ingresa tu dirección y datos de contacto',
      text: 'Escribe tu dirección completa (RM o Valparaíso). El sistema valida que el servicio llegue a tu zona. Luego ingresa nombre, email y teléfono para recibir el presupuesto formal.',
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Paga y agenda',
      text: 'Paga en línea con Webpay (Visa, Mastercard, Redcompra). Recibes confirmación por email con el desglose completo y el link para coordinar la visita técnica.',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es el cotizador de cargadores eléctricos de Enérgica City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El cotizador de cargadores eléctricos de Enérgica City es una herramienta online que permite obtener el precio exacto de instalación de un cargador EV en casa o departamento en Chile, sin necesidad de registro ni llamada telefónica. El proceso toma menos de 2 minutos y cubre todos los costos reales: materiales (ductos, breaker, cable calibre 6 AWG), mano de obra de instaladores certificados SEC, trámite de declaración TE6 ante la Superintendencia de Electricidad y Combustibles, y el precio del cargador seleccionado. El cotizador diferencia entre instalaciones en casas (desde $159.000) y edificios (tres opciones desde $0 con la electrolinera comunitaria hasta $369.000 con instalación dedicada en subterráneos). También incluye un factor de distancia dinámica al tablero eléctrico, que ajusta el precio según si el recorrido es de 5 metros o de más de 40 metros. El servicio cubre la Región Metropolitana y la Región de Valparaíso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta instalar un cargador eléctrico según el cotizador en 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El precio de instalación según el cotizador parte desde $159.000 en casas con distancia estándar hasta 10 m. El factor de distancia ajusta ese valor: hasta 5 m aplica un descuento de 0,85× (precio mínimo aproximado $130.000), de 5 a 10 m es 1,0×, de 10 a 20 m es 1,18×, de 20 a 40 m es 1,35× y sobre 40 m es 1,55×. Para edificios el cotizador ofrece tres opciones: la electrolinera comunitaria ($0 de inversión), la visita técnica con kit de documentos ($29.000, acreditable al presupuesto final), y la instalación dedicada en estacionamiento privado (entre $159.000 y $369.000 según el cargador y la distancia). Todos los precios incluyen IVA y el certificado TE6 de la SEC.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El cotizador funciona para edificios y departamentos en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El cotizador tiene una sección específica para edificios y departamentos con tres opciones adaptadas a distintas situaciones. La electrolinera comunitaria instala el cargador sin inversión en el estacionamiento de visitas, y los usuarios pagan solo $330/kWh consumido. La visita técnica con kit de documentos ($29.000) incluye ingeniería in situ, presupuesto definitivo en 48 horas, carta de autorización, memoria técnica y presentación lista para el comité de administración; el monto se acredita al precio final. La instalación dedicada permite instalar tu propio cargador en tu estacionamiento privado, previo proceso de aprobación del edificio. El cotizador solicita el piso del departamento y el piso del estacionamiento para estimar la distancia de cableado. El servicio está disponible en la Región Metropolitana y la Región de Valparaíso.',
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
      name: 'Cómo Usar el Cotizador de Cargadores Eléctricos: Paso a Paso',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const COTIZADOR_STEPS = [
  {
    title: 'Elige tu tipo de propiedad',
    body: 'En la primera pantalla del cotizador verás dos opciones: Casa o Edificio. Si vives en casa unifamiliar o en una propiedad individual, selecciona Casa. Si vives en un departamento dentro de un edificio con estacionamiento, selecciona Edificio. Esta elección activa flujos distintos: para casas el precio parte desde $159.000; para edificios aparecerán tres opciones de instalación, incluyendo la electrolinera comunitaria sin costo.',
  },
  {
    title: 'Selecciona tu cargador eléctrico (optativo)',
    body: 'El cotizador muestra el catálogo actual de cargadores con stock en tiempo real. Puedes elegir entre cargadores portátiles (2,2–7 kW), ideales si necesitas flexibilidad, o Wallbox fijos (7–7,3 kW), la opción más segura y rápida para uso diario. También puedes indicar que ya tienes tu cargador y continuar solo con la instalación. Debajo del catálogo encontrarás un slider para ajustar la distancia estimada entre tu tablero eléctrico y el punto de instalación: este factor afecta el precio entre un 0,85× (descuento a menos de 5 metros) y un 1,55× (más de 40 metros).',
  },
  {
    title: 'Revisa tu cotización detallada',
    body: 'La tercera pantalla muestra el desglose completo del precio: materiales (ductos, breaker dedicado, cable), mano de obra, trámite SEC (certificado TE6) y el costo del cargador seleccionado. Verás el subtotal neto, el IVA (19%) y el total final. El precio del cotizador es el precio definitivo para instalaciones estándar en casas; en edificios se confirma tras la visita técnica.',
  },
  {
    title: 'Elige tu opción de instalación (solo Edificio)',
    body: 'Si seleccionaste Edificio, aparece una cuarta pantalla con tres opciones. La electrolinera comunitaria ($0 de inversión) instala el cargador en el estacionamiento de visitas financiado por Enérgica, pagando solo $330/kWh consumido. La visita técnica con kit de documentos ($29.000, acreditable al presupuesto final) incluye ingeniería in situ, presupuesto definitivo en 48 horas y documentos listos para tu comité. La instalación dedicada (desde $159.000) es tu propio cargador en tu estacionamiento privado.',
  },
  {
    title: 'Ingresa tu dirección y datos de contacto',
    body: 'El paso siguiente solicita tu dirección completa. El cotizador valida que la dirección esté dentro de la cobertura del servicio: Región Metropolitana (39 comunas) y Región de Valparaíso. Si ingresas una dirección fuera del área, el sistema lo indica de inmediato. Luego completas nombre, correo electrónico y teléfono para recibir el presupuesto formal por email.',
  },
  {
    title: 'Paga en línea y recibe confirmación',
    body: 'Seleccionas el método de pago (Webpay acepta Visa, Mastercard, Redcompra y tarjeta de débito) y pagas en línea de forma segura a través de Transbank. Inmediatamente después recibes un correo de confirmación con el detalle completo de tu instalación y el link para agendar la visita técnica con un profesional certificado SEC.',
  },
  {
    title: 'Agenda tu Visita técnica para confirmar distancia y tipo de canalización',
    body: 'Con el pago confirmado, agendas la visita técnica directamente desde el enlace que recibes por email. Durante la visita, un instalador certificado SEC evalúa in situ la distancia exacta entre el tablero eléctrico y el punto de carga, y el tipo de canalización necesaria (ducto superficial, empotrado o bajo piso). Si la distancia o las condiciones del lugar difieren de lo estimado en el cotizador, el técnico ajusta el presupuesto antes de iniciar el trabajo.',
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
      <BlogBreadcrumb title="Cómo Usar el Cotizador de Cargadores Eléctricos: Paso a Paso — Enérgica City" />
      <Box component="main">
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
              {['Cotizador Online', 'Paso a Paso', 'Casa y Edificio'].map((tag) => (
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
              Cómo Usar el Cotizador de Cargadores Eléctricos de Enérgica City: Paso a Paso
            </Typography>
          <Box
            component="time"
            dateTime="2026-06-11"
            sx={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', mt: 1.5, letterSpacing: '0.02em' }}
          >
            11 de junio, 2026
          </Box>
          <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
            Por <strong>Felipe Donoso</strong> · Ingeniero Eléctrico, Enérgica City
          </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 640,
                lineHeight: 1.7,
              }}
            >
              Obtén el precio exacto de tu instalación en menos de 2 minutos. Sin registro, sin
              llamadas. El cotizador cubre casas y edificios en la Región Metropolitana y Valparaíso.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Link href="/cotizador" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 4,
                    py: 1.75,
                    borderRadius: 2,
                    background: PINK,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    '&:hover': { background: '#c01556' },
                  }}
                >
                  Cotizar ahora
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '2 min', label: 'Para obtener precio exacto' },
                { value: '3 opciones', label: 'Para edificios (incluyendo $0)' },
                { value: 'RM + V Región', label: 'Cobertura de servicio' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Box sx={{ textAlign: 'center', color: '#fff' }}>
                    <Typography
                      sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', opacity: 0.85, pt: 2 }}>{stat.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Section 1 — Definition */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}
            >
              ¿Qué es el cotizador de cargadores eléctricos de Enérgica City?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8 }}>
              El cotizador de cargadores eléctricos de Enérgica City es una herramienta online que
              permite obtener el precio exacto de instalación de un cargador EV en casa o
              departamento en Chile, sin necesidad de registro ni llamada telefónica. El proceso toma
              menos de 2 minutos y cubre todos los costos reales: materiales (ductos, breaker, cable
              calibre 6 AWG), mano de obra de instaladores certificados SEC, trámite de declaración
              TE6 ante la <a href="https://www.sec.cl/" target="_blank" rel="noopener noreferrer">Superintendencia de Electricidad y Combustibles</a>, y el precio del cargador
              seleccionado. El cotizador diferencia entre instalaciones en casas (desde $159.000) y
              edificios (tres opciones desde $0 con la electrolinera comunitaria hasta $369.000 con
              instalación dedicada en subterráneos). También incluye un factor de distancia dinámica
              al tablero eléctrico, que ajusta el precio según si el recorrido es de 5 metros o de
              más de 40 metros. El servicio cubre la Región Metropolitana y la Región de Valparaíso.
            </Typography>
          </Container>
        </Box>

        {/* Section 2 — Steps intro */}
        <Box sx={{ py: { xs: 5, md: 7 }, background: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}
            >
              ¿Cómo usar el cotizador de cargadores para obtener tu precio exacto?
            </Typography>
            <Typography sx={{ color: TEXT_MUTED, lineHeight: 1.8 }}>
              El cotizador de Enérgica City guía al usuario a través de un flujo simple en pantallas
              secuenciales. A continuación detallamos cada paso para que llegues al precio final sin
              dudas.
            </Typography>
          </Container>
        </Box>

        {/* Steps component */}
        <StepsList
          heading="El proceso es fácil y rápido"
          steps={COTIZADOR_STEPS}
        />

        {/* Section 3 — EV compatibility */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}
            >
              ¿El cotizador funciona para cualquier marca de auto eléctrico?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8 }}>
              Sí. El cotizador y las instalaciones de Enérgica City son compatibles con todos los
              vehículos eléctricos que utilizan el conector Tipo 2 (IEC 62196), que es el estándar
              vigente en Chile. Esto incluye los modelos más vendidos del mercado nacional: BYD Seal,
              Dolphin y Atto 3; Tesla Model 3 y Model Y (con adaptador Tipo 2 homologado por el
              MTT); Hyundai Ioniq 5 e Ioniq 6; Kia EV6; Volvo XC40 Recharge; Renault Kwid E-Tech;
              MG ZS EV; y Maxus EUNIQ 5 y 6. Todas las instalaciones incluyen la declaración TE6
              ante la SEC, que es obligatoria para cualquier instalación eléctrica en baja tensión en
              Chile independiente del vehículo utilizado.
            </Typography>
          </Container>
        </Box>

        {/* Related articles */}
        <BlogRelatedArticles currentUid={SLUG} />

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
                lineHeight: '3rem',
              }}
            >
              Preguntas frecuentes sobre el cotizador de cargadores eléctricos
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
        <AuthorByline
          name="Manuel Ortega"
          bio="Ingeniero en desarrollo de software con 8+ años de experiencia en temas asociados a la electromovilidad."
          imageSrc="/images/profile/manuel-ortega.jpg"
          imageAlt="Manuel Ortega, Enérgica City"
        />

        {/* Cross-link */}
        <Box sx={{ py: 3, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.95rem', color: '#475569' }}>
            ¿Ya cotizaste? El siguiente paso es{' '}
            <Link href="/presupuesto-cargador-electrico" style={{ color: '#0898b9' }}>
              solicitar tu presupuesto definitivo de instalación
            </Link>.
          </Typography>
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
              ¿Listo para cotizar tu instalación?
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 5,
                fontSize: '1.05rem',
              }}
            >
              Precio exacto en 2 minutos. Sin registro, sin llamadas. Casa o edificio en RM y
              Valparaíso.
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
                  Ir al cotizador
                </Box>
              </Link>
              <Link
                href="/blog/instalar-cargador-ev-departamento-edificio"
                style={{ textDecoration: 'none' }}
              >
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
                  Ver guía para edificios
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

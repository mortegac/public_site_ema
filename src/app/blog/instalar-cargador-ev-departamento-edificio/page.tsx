import type { Metadata } from 'next'
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

const SLUG = 'instalar-cargador-ev-departamento-edificio'

export const metadata: Metadata = {
  title: 'Cargador EV en Departamento: 3 Opciones para Edificios en Chile',
  description:
    '¿Tienes auto eléctrico y vives en departamento? Estas son las 3 opciones reales para instalar o acceder a un cargador en tu edificio en Chile: electrolinera $0, kit técnico $29.000 o instalación privada.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Cargador EV en Departamento: 3 Opciones para Edificios en Chile',
    description:
      '¿Tienes auto eléctrico y vives en departamento? Estas son las 3 opciones reales para instalar o acceder a un cargador en tu edificio en Chile: electrolinera $0, kit técnico $29.000 o instalación privada.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/post/29_1170x400.png`,
        width: 1170,
        height: 400,
        alt: 'Cargador EV departamento edificio opciones Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargador EV en Departamento: 3 Opciones para Edificios en Chile',
    description:
      '¿Tienes auto eléctrico y vives en departamento? Estas son las 3 opciones reales para instalar o acceder a un cargador en tu edificio en Chile.',
    images: [`${CANONICAL_DOMAIN}/images/post/29_1170x400.png`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  image: {
    '@type': 'ImageObject',
    url: `${CANONICAL_DOMAIN}/images/post/29_1170x400.png`,
    width: 1170,
    height: 400,
  },
  headline: 'Cargador EV en tu Departamento: 3 Opciones Reales para Edificios en Chile',
  description:
    '¿Tienes auto eléctrico y vives en departamento? Estas son las 3 opciones reales para instalar o acceder a un cargador en tu edificio en Chile: electrolinera $0, kit técnico $29.000 o instalación privada.',
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
  articleSection: 'Edificios',
  keywords: 'cargador EV departamento Chile, instalar cargador edificio, electrolinera comunitaria edificio, Wallbox estacionamiento privado, Ley Copropiedad vehículo eléctrico, cargador auto eléctrico condominio, instalación cargador SEC edificio',
  datePublished: '2026-06-11',
  dateModified: '2026-07-08',
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
      name: '¿Puedo instalar un cargador eléctrico en el estacionamiento de mi departamento sin permiso de la asamblea?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depende de dónde quieras instalar el cargador. Si deseas instalar en el estacionamiento de visitas u otro espacio de uso común, no necesitas asamblea extraordinaria: basta con el permiso de la administración del edificio, que puede otorgarlo directamente según la Ley de Copropiedad 21.442. Enérgica City ofrece esta opción como "Electrolinera Comunitaria": la empresa instala y financia el cargador en el espacio común y los residentes pagan solo $330 por kWh consumido. Si, en cambio, deseas instalar el cargador en tu estacionamiento privado asignado, sí necesitas la autorización de la asamblea de propietarios, ya que implica modificar instalaciones en la propiedad individual y eventualmente requiere cableado por zonas comunes. En ese caso, la visita técnica con kit de documentos ($29.000) es el punto de partida ideal.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta instalar un cargador eléctrico en un edificio en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El costo varía según la opción elegida. La electrolinera comunitaria tiene inversión $0 para el edificio: Enérgica instala y los usuarios pagan $330/kWh consumido. La visita técnica con kit de documentos cuesta $29.000 y se acredita al presupuesto final si decides avanzar con la instalación. La instalación dedicada en estacionamiento privado parte desde $159.000 para edificios con distancias estándar al tablero (hasta 10 metros). En edificios con subterráneos profundos o tableros lejanos, el precio puede llegar a $369.000 o más. El cotizador en línea de Enérgica City muestra precio exacto según tu piso, el piso del estacionamiento y la distancia estimada al tablero general.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el kit de documentos de $29.000 para instalar cargador en edificio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El kit de documentos de $29.000 de Enérgica City es un paquete que incluye una visita técnica con profesional certificado SEC, un presupuesto definitivo entregado en 48 horas, una carta tipo para presentar a la administración del edificio, una memoria técnica firmada y fotos del recorrido propuesto para el cableado. El valor de $29.000 es acreditable al presupuesto final: si decides avanzar con la instalación, ese monto se descuenta del total. Es la opción ideal para residentes que quieren evaluar la viabilidad técnica y económica de la instalación privada antes de presentar la solicitud a la asamblea, o para edificios donde la administración exige documentación técnica antes de aprobar cualquier modificación eléctrica.',
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
      name: 'Cargador EV en Departamento: 3 Opciones para Edificios en Chile',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const optionCards = [
  {
    badge: 'MÁS POPULAR',
    badgeBg: PINK,
    title: 'Electrolinera Comunitaria',
    price: '$0 inversión',
    sub: '$330/kWh — solo pagas lo que cargas',
    borderColor: PINK,
    features: [
      'Enérgica instala y financia el cargador',
      'Se ubica en el estacionamiento de visitas',
      'Sin obra en tu estacionamiento privado',
      'Sin asamblea extraordinaria: solo permiso de espacio común',
      'Disponible para todos los residentes',
    ],
  },
  {
    badge: 'RECOMENDADO',
    badgeBg: TEAL,
    title: 'Visita Técnica + Kit de Documentos',
    price: '$29.000',
    sub: 'Acreditable al presupuesto final',
    borderColor: TEAL,
    features: [
      'Visita técnica con profesional certificado SEC',
      'Presupuesto definitivo en 48 horas',
      'Carta tipo para presentar a la administración',
      'Memoria técnica firmada',
      'Fotos del recorrido propuesto',
    ],
  },
  {
    badge: 'TU PROPIO CARGADOR',
    badgeBg: DARK,
    title: 'Instalación Dedicada',
    price: '$1.350.000 – $3.110.000',
    sub: 'Rango referencial para edificios — precio exacto se confirma en visita técnica',
    borderColor: DARK,
    features: [
      'Cargador exclusivo para ti',
      'Circuito dedicado desde el tablero',
      'Certificado TE6 ante la SEC',
      '1 año de garantía técnica',
      'Requiere aprobación de la comunidad',
    ],
  },
]

const comparisonRows = [
  [
    'No quiero invertir nada y hay estacionamiento de visitas disponible',
    'Electrolinera Comunitaria ($0)',
  ],
  [
    'Quiero evaluar la instalación privada antes de comprometer el presupuesto',
    'Visita Técnica + Kit ($29.000)',
  ],
  [
    'Tengo estacionamiento privado y el edificio ya aprobó el cargador',
    'Instalación Dedicada — rango $1.350.000–$3.110.000 (solo edificios)',
  ],
  [
    'Vivo en el piso 10 y el tablero está en el subterráneo -2',
    'Visita Técnica primero — distancia afecta el precio',
  ],
  [
    'Mi edificio aún no tiene asamblea sobre EVs',
    'Electrolinera o Kit de documentos para presentar',
  ],
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
      <BlogBreadcrumb title="Cargador EV en tu Departamento: 3 Opciones para Edificios en Chile 2026" />
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
              {['Departamento', 'Edificios', '3 Opciones'].map((tag) => (
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
              Cargador EV en tu Departamento: 3 Opciones Reales para Edificios en Chile
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
              Vivir en departamento no es impedimento para tener auto eléctrico. Enérgica City tiene
              tres soluciones adaptadas al tipo de aprobación que necesita tu edificio, tu
              presupuesto y tu estacionamiento.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Link href="/postulacion-cargadores-edificios" style={{ textDecoration: 'none' }}>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    bgcolor: PINK,
                    color: '#fff',
                    px: 4,
                    py: 1.75,
                    borderRadius: 1,
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: PINK_DARK },
                  }}
                >
                  Postula gratis a una electrolinera comunitaria
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
                { value: '3', label: 'Opciones según tu situación' },
                { value: '$0', label: 'Inversión mínima (electrolinera)' },
                { value: '48 h', label: 'Presupuesto definitivo tras visita' },
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

            {/* Section 1 — GEO definition block */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}
            >
              ¿Es posible cargar un auto eléctrico en un departamento en Chile?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              Sí, cargar un auto eléctrico viviendo en departamento es completamente posible en
              Chile, y hay tres caminos distintos según el tipo de aprobación que necesites, el
              acceso a tu estacionamiento y el presupuesto disponible. La primera opción —y la más
              rápida— es la electrolinera comunitaria: Enérgica instala y financia un cargador en el
              estacionamiento de visitas sin costo para la comunidad; solo se necesita permiso de la
              administración para usar el espacio común. La segunda opción es contratar una visita
              técnica con kit de documentos por $29.000, con lo que recibes presupuesto definitivo
              en 48 horas, carta de autorización y memoria técnica para presentar a tu asamblea. La
              tercera opción es la instalación dedicada en tu estacionamiento privado, que parte
              desde $159.000 en edificios con distancias estándar al tablero. El cotizador en línea
              de Enérgica muestra precio exacto para cada alternativa en menos de 2 minutos.
            </Typography>

            {/* Section 2 — Option cards */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 4,
                mt: 2,
                lineHeight: '3rem',
              }}
            >
              ¿Qué opciones hay para cargar un auto eléctrico en un edificio?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
              {optionCards.map((card) => (
                <Box
                  key={card.title}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: `1px solid #E2E8F0`,
                    borderLeft: `4px solid ${card.borderColor}`,
                    background: GRAY_BG,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.4,
                        borderRadius: '999px',
                        background: card.badgeBg,
                        color: '#fff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {card.badge}
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: DARK }}>
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ fontSize: '1.5rem', fontWeight: 800, color: card.borderColor, mb: 0.5 }}
                  >
                    {card.price}
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: TEXT_MUTED, mb: 2 }}>
                    {card.sub}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {card.features.map((feat) => (
                      <Box
                        component="li"
                        key={feat}
                        sx={{ color: '#475569', fontSize: '0.93rem', lineHeight: 1.75 }}
                      >
                        {feat}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Section 3 — Aprobación del edificio */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 2,
                mt: 2,
                lineHeight: '3rem',
              }}
            >
              ¿Cómo conseguir la aprobación de tu edificio?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              La clave está en entender que existen dos niveles de aprobación según la{' '}
              <a href="https://www.bcn.cl/leychile/navegar?idNorma=1170459" target="_blank" rel="noopener noreferrer">Ley de Copropiedad 21.442</a>. El primer nivel corresponde a los espacios de uso común —como el
              estacionamiento de visitas—: aquí basta el permiso del administrador del edificio, sin
              necesidad de convocar una asamblea extraordinaria. Es el camino que habilita la
              electrolinera comunitaria de Enérgica. El segundo nivel aplica cuando la instalación
              toca el estacionamiento privado asignado o requiere cableado por zonas comunes:
              en ese caso es obligatoria la aprobación de la asamblea de propietarios con quórum
              calificado. Para facilitar ese proceso, Enérgica entrega un kit de documentos técnicos
              listos para presentar al comité de administración, ahorrando semanas de preparación.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Documentos que Enérgica entrega para tu comité
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 5 }}>
              {[
                'Presentación lista para llevar a la reunión',
                'Carta de solicitud de autorización',
                'Memoria técnica firmada por profesional SEC',
                'Visita comercial a la administración (a pedido)',
              ].map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    p: 1.5,
                    background: GRAY_BG,
                    borderRadius: 1.5,
                  }}
                >
                  <Typography sx={{ color: TEAL, fontWeight: 700, fontSize: '1rem', mt: 0.1 }}>
                    ✓
                  </Typography>
                  <Typography sx={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Section 4 — Comparison table */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 3,
                mt: 2,
                lineHeight: '3rem',
              }}
            >
              ¿Qué opción de carga EV elegir según tu situación en el edificio?
            </Typography>
            <Box
              sx={{
                border: `1px solid #E2E8F0`,
                borderRadius: 2,
                overflow: 'hidden',
                mb: 6,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.2fr',
                  background: DARK,
                  color: '#fff',
                  px: 2,
                  py: 1.5,
                }}
              >
                {['Situación', 'Opción recomendada'].map((h) => (
                  <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                    {h}
                  </Typography>
                ))}
              </Box>
              {comparisonRows.map(([situation, recommendation], i) => (
                <Box
                  key={situation}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.2fr',
                    px: 2,
                    py: 1.75,
                    background: i % 2 === 0 ? GRAY_BG : '#fff',
                    borderTop: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, pr: 2 }}>
                    {situation}
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: TEAL, lineHeight: 1.6 }}>
                    {recommendation}
                  </Typography>
                </Box>
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
                lineHeight: '3rem',
              }}
            >
              Preguntas frecuentes sobre cargadores EV en edificios de departamentos
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
            <Typography sx={{ mt: 3, fontSize: '0.95rem', color: '#334155' }}>
              Para edificios con muchos vehículos eléctricos, conoce el modelo de{' '}
              <Link href="/blog/electrolinera-edificio-inversion-cero" style={{ color: '#0898b9' }}>
                electrolinera con inversión cero
              </Link>
              .{' '}
              Si estás en un proyecto nuevo, lee sobre{' '}
              <Link href="/blog/infraestructura-carga-proyectos-inmobiliarios-nuevos" style={{ color: '#0898b9' }}>
                infraestructura EV en proyectos inmobiliarios
              </Link>
              .
            </Typography>
          </Container>
        </Box>

        {/* Related articles */}
        <BlogRelatedArticles currentUid={SLUG} />

        {/* Author byline */}
        <AuthorByline dateModified="2026-07-07" />

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
              ¿En qué piso estás y qué opción te conviene?
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 5,
                fontSize: '1.05rem',
              }}
            >
              Responde 3 preguntas y recibe precio exacto para las 3 opciones: electrolinera, visita
              técnica o instalación privada.
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
              <Link href="/cargadores-en-edificios" style={{ textDecoration: 'none' }}>
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
                  Postula a una electrolinera comunitaria gratis
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

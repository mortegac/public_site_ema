import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Box, Typography, Grid, Button } from '@mui/material'
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

const SLUG = 'conoce-nuestra-metodologia-propia'

export const metadata: Metadata = {
  title: 'Conoce Nuestra Metodología Propia para Electrificar tu Flota',
  description:
    'Metodología propia de Enérgica City para optimizar y descarbonizar flotas: software GRETA, análisis técnico-económico y acompañamiento en todas las etapas del proyecto.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Conoce Nuestra Metodología Propia para Electrificar tu Flota',
    description:
      'Metodología propia de Enérgica City para optimizar y descarbonizar flotas: software GRETA, análisis técnico-económico y acompañamiento en todas las etapas del proyecto.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/post/01_1170x400.png`,
        width: 1170,
        height: 400,
        alt: 'Metodología GRETA Enérgica City electrificación de flotas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conoce Nuestra Metodología Propia para Electrificar tu Flota',
    description:
      'Metodología propia de Enérgica City para optimizar y descarbonizar flotas: software GRETA, análisis técnico-económico y acompañamiento en todas las etapas.',
    images: [`${CANONICAL_DOMAIN}/images/post/01_1170x400.png`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  image: {
    '@type': 'ImageObject',
    url: `${CANONICAL_DOMAIN}/images/post/01_1170x400.png`,
    width: 1170,
    height: 400,
  },
  headline: 'Conoce Nuestra Metodología Propia para Electrificar tu Flota',
  description:
    'Metodología propia de Enérgica City para optimizar y descarbonizar flotas: software GRETA, análisis técnico-económico y acompañamiento en todas las etapas del proyecto.',
  author: {
    '@type': 'Person',
    name: 'Gilberto Escalona',
    '@id': 'https://www.energica.city/#author-gilberto-escalona',
    jobTitle: 'Gerente de Desarrollo de Negocios, Enérgica City',
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
  articleSection: 'Empresas',
  keywords: 'metodología electrificación flotas, software GRETA Enérgica, descarbonización flotas chile, análisis técnico económico flotas eléctricas, optimización flota transporte, electromovilidad empresas chile, transición energética flotas',
  datePublished: '2026-07-07',
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
      name: '¿Qué es el software GRETA de Enérgica City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GRETA es el software de modelamiento propio de Enérgica City, diseñado para analizar datos clave de una flota de transporte y generar evaluaciones técnico-económicas optimizadas. Procesa variables como rutas, consumos energéticos, patrones de operación y costos actuales para entregar un análisis preciso que permite tomar decisiones estratégicas sobre la electrificación. GRETA es el núcleo de la Metodología Propia de Enérgica y ha sido perfeccionado con la experiencia acumulada en proyectos reales de optimización y descarbonización de flotas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué consiste el análisis técnico-económico de Enérgica para flotas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El análisis técnico-económico de Enérgica City evalúa la viabilidad del proyecto de electrificación considerando múltiples factores: costos de inversión en infraestructura de carga, ahorros operacionales versus combustible, riesgos técnicos y operativos, modelos de operación alternativos, y comparación de escenarios. El objetivo es garantizar que la transición a flotas eléctricas sea rentable y sostenible, con proyecciones claras de retorno de inversión. Enérgica acompaña a la empresa en la toma de decisiones estratégica para elegir la mejor opción según sus condiciones específicas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué etapas del proyecto de electrificación abarca Enérgica City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enérgica City puede acompañar a la empresa en todas las etapas del proyecto, ya sea de forma individual o integral. Esto incluye: levantamiento de información y análisis de la flota con GRETA, modelamiento y evaluación de escenarios, asesoría en la construcción de bases de licitación, implementación de infraestructura de carga, y supervisión de la operación. El servicio se adapta a las necesidades de cada cliente, permitiendo contratar etapas específicas o la gestión completa del proyecto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo ayuda la Metodología Propia de Enérgica a descarbonizar una flota?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Metodología Propia de Enérgica combina análisis de datos con experiencia práctica para identificar los vehículos y rutas con mayor potencial de electrificación, maximizando el impacto ambiental y económico de cada peso invertido. Al usar GRETA para modelar la operación actual y proyectar el escenario electrificado, Enérgica permite a las empresas definir una hoja de ruta de descarbonización progresiva, con métricas claras de reducción de emisiones CO₂ y ahorro en costos de combustible. El enfoque orientado a datos asegura que la electrificación sea estratégica, no especulativa.',
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
      name: 'Conoce Nuestra Metodología Propia para Electrificar tu Flota',
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
      <BlogBreadcrumb title="Conoce Nuestra Metodología Propia para Electrificar tu Flota" />
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
              {['Empresas', 'Flotas', 'GRETA'].map((tag) => (
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
              Conoce Nuestra Metodología Propia para Electrificar tu Flota
            </Typography>
            <Box
              component="time"
              dateTime="2026-07-07"
              sx={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', mt: 1.5, letterSpacing: '0.02em' }}
            >
              7 de julio, 2026
            </Box>
            <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
              Por <strong>Gilberto Escalona</strong> · Gerente de Desarrollo de Negocios, Enérgica City
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 640,
                lineHeight: 1.7,
                mt: 3,
              }}
            >
              Nuestra metodología, perfeccionada con la experiencia, te ayuda a optimizar y
              descarbonizar tu flota de transporte. Utilizamos GRETA, nuestro software de
              modelamiento, para analizar datos clave y realizar una evaluación eficiente y
              optimizada.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                component={Link}
                href="/contacto-greta"
                variant="contained"
                sx={{
                  bgcolor: PINK,
                  color: '#fff',
                  fontWeight: 700,
                  px: 4,
                  py: 1.75,
                  fontSize: '1rem',
                  borderRadius: 0,
                  textTransform: 'none',
                  '&:hover': { bgcolor: PINK_DARK },
                }}
              >
                Contactar equipo GRETA
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: 'GRETA', label: 'Software propio de modelamiento de flotas' },
                { value: 'Análisis 360°', label: 'Técnico, económico y operativo' },
                { value: 'Todas las etapas', label: 'Desde el levantamiento hasta la implementación' },
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
        <Box sx={{ py: { xs: 7, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">

            {/* Section 1 */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: 1.4, color: DARK, mb: 2 }}
            >
              ¿Qué es la Metodología Propia de Enérgica?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              La Metodología Propia de Enérgica City es un enfoque de trabajo validado por la
              experiencia en proyectos de optimización y descarbonización de flotas. Su núcleo es
              GRETA, nuestro software de modelamiento que procesa datos clave de tu flota para
              generar evaluaciones precisas, eficientes y orientadas a la toma de decisiones
              estratégicas.
            </Typography>

            {[
              {
                title: 'Análisis preciso',
                body: 'Usamos nuestro software GRETA para procesar datos clave de tu flota: rutas, consumos, patrones operativos y costos actuales.',
              },
              {
                title: 'Metodología avanzada',
                body: 'Un enfoque de trabajo validado por la experiencia en proyectos de optimización y descarbonización de flotas en Chile.',
              },
              {
                title: 'Evaluación optimizada',
                body: 'Obtenemos información valiosa para una toma de decisiones eficiente y eficaz, con métricas claras de retorno de inversión.',
              },
            ].map((item) => (
              <Box
                key={item.title}
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
                <Box>
                  <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>{item.title}</Typography>
                  <Typography sx={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {item.body}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* Section 2 */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                lineHeight: 1.4,
                color: DARK,
                mb: 2,
                mt: 6,
              }}
            >
              Análisis Técnico y Económico
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              Realizamos una evaluación de proyectos que optimiza los costos mientras garantizamos
              su viabilidad técnica y operativa. Nuestro análisis incluye la evaluación de riesgos,
              diferentes modelos de operación, y la comparación de distintos escenarios para que
              puedas elegir la mejor alternativa con información completa.
            </Typography>

            {[
              {
                title: 'Enfoque en costos',
                body: 'Mantenemos la viabilidad técnica y operativa del proyecto, asegurando que la inversión en electrificación sea rentable a largo plazo.',
              },
              {
                title: 'Análisis integral',
                body: 'Evaluamos riesgos, escenarios y modelos de operación para darte una visión completa antes de comprometer recursos.',
              },
              {
                title: 'Toma de decisiones estratégica',
                body: 'Te ayudamos a comparar diferentes opciones para elegir la mejor, con proyecciones claras de ahorro en combustible y reducción de emisiones CO₂.',
              },
            ].map((item) => (
              <Box
                key={item.title}
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
                <Box>
                  <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>{item.title}</Typography>
                  <Typography sx={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {item.body}
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
                lineHeight: 1.4,
                color: DARK,
                mb: 2,
                mt: 6,
              }}
            >
              Abarcamos Todas las Etapas del Proyecto
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              Nos adaptamos a tus necesidades y te acompañamos en todas las etapas del proyecto,
              ya sea de forma individual o integral. Desde el levantamiento de información hasta
              la implementación, nuestro equipo está a tu lado para asegurar el éxito de la
              transición a flotas eléctricas.
            </Typography>

            {[
              {
                title: 'Servicio a medida',
                body: 'Nos adaptamos a tus necesidades y podemos abarcar todas las etapas del proyecto de forma individual o conjunta, según tu nivel de madurez y los recursos disponibles.',
              },
              {
                title: 'Gestión completa',
                body: 'Te acompañamos desde el levantamiento de información y modelamiento con GRETA hasta la implementación de la infraestructura de carga.',
              },
              {
                title: 'Soporte especializado',
                body: 'Te ofrecemos asesoría experta en la construcción de bases de licitación y en la supervisión de la implementación para garantizar que cada etapa se ejecute correctamente.',
              },
            ].map((item) => (
              <Box
                key={item.title}
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
                <Box>
                  <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>{item.title}</Typography>
                  <Typography sx={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {item.body}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Container>
        </Box>

        {/* FAQ */}
        <Box sx={{ py: { xs: 7, md: 10 }, background: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.9rem' },
                fontWeight: 700,
                color: DARK,
                mb: 5,
                textAlign: 'center',
                lineHeight: 1.4,
              }}
            >
              Preguntas frecuentes sobre la metodología y el software GRETA
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
        <AuthorByline
          name="Gilberto Escalona"
          bio="Gerente de Desarrollo de Negocios con experiencia en proyectos de electrificación de flotas."
          imageSrc="/images/gilberto-escalona.jpg"
          url="/que-es-energica-city"
        />

        {/* Dark CTA band */}
        <Box sx={{ background: DARK, py: { xs: 7, md: 10 } }}>
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
              ¿Listo para electrificar tu flota?
            </Typography>
            <Typography
              sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: 5, fontSize: '1.05rem' }}
            >
              Contacta a nuestro equipo GRETA y recibe una evaluación personalizada.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                component={Link}
                href="/contacto-greta"
                variant="contained"
                sx={{
                  bgcolor: PINK,
                  color: '#fff',
                  fontWeight: 700,
                  px: 4,
                  py: 1.75,
                  fontSize: '1rem',
                  borderRadius: 0,
                  textTransform: 'none',
                  '&:hover': { bgcolor: PINK_DARK },
                }}
              >
                Contactar equipo GRETA
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

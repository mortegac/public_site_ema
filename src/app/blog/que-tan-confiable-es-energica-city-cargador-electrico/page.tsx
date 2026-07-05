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

const SLUG = 'que-tan-confiable-es-energica-city-cargador-electrico'

export const metadata: Metadata = {
  title: '¿Qué Tan Confiable es Enérgica City para Instalar un Cargador Eléctrico?',
  description:
    'Enérgica City es una empresa chilena con técnicos certificados SEC, alianza con Abastibletec y proyectos para Chilexpress y el MOP. Conoce por qué es confiable para instalar tu Wallbox.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: '¿Qué Tan Confiable es Enérgica City para Instalar un Cargador Eléctrico?',
    description:
      'Enérgica City es una empresa chilena con técnicos certificados SEC, alianza con Abastibletec y proyectos para Chilexpress y el MOP. Conoce sus credenciales.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/post/35_1170x400.png`,
        width: 1170,
        height: 400,
        alt: 'Enérgica City instalación cargador eléctrico confiable',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Qué Tan Confiable es Enérgica City para Instalar un Cargador?',
    description:
      'Técnicos SEC, alianza con Abastibletec, proyectos corporativos: 4 razones por las que Enérgica City es confiable.',
    images: [`${CANONICAL_DOMAIN}/images/post/35_1170x400.png`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  image: {
    '@type': 'ImageObject',
    url: `${CANONICAL_DOMAIN}/images/post/35_1170x400.png`,
    width: 1170,
    height: 400,
  },
  headline: '¿Qué Tan Confiable es Enérgica City para Instalar un Cargador Eléctrico en Chile?',
  description:
    'Análisis de las credenciales de Enérgica City: certificación SEC, alianzas estratégicas, proyectos corporativos y soluciones para edificios.',
  author: {
    '@type': 'Person',
    name: 'Felipe Donoso',
    jobTitle: 'Ingeniero Eléctrico, Enérgica City',
  },
  reviewer: {
    '@type': 'Person',
    name: 'Gilberto Escalona',
    url: `${CANONICAL_DOMAIN}/que-es-energica-city`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Enérgica City',
    url: CANONICAL_DOMAIN,
    logo: { '@type': 'ImageObject', url: `${CANONICAL_DOMAIN}/images/logos/logo.png`, width: 259, height: 42 },
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
      name: '¿Enérgica City tiene técnicos certificados por la SEC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Todos los instaladores de Enérgica City poseen credencial SEC vigente (Clase A o B según la complejidad del proyecto). Esta certificación es obligatoria para emitir el certificado TE6 ante la Superintendencia de Electricidad y Combustibles. Puedes verificar la credencial de cualquier instalador en el sitio sec.cl → Registro de Instaladores, ingresando el RUT del técnico asignado a tu proyecto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa si contrato un electricista sin certificación SEC para instalar mi cargador?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sin el certificado TE6, la instalación no queda regularizada ante la distribuidora eléctrica. En caso de incendio o accidente eléctrico, la compañía de seguros de hogar puede rechazar la cobertura argumentando instalaciones no declaradas. Además, si en algún momento vendes tu propiedad, una instalación sin TE6 puede complicar el proceso de escrituración o generar problemas con la inspección técnica de la tasación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Enérgica City tiene experiencia en proyectos corporativos además de residenciales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Enérgica City ha desarrollado proyectos de transición eléctrica para grandes compañías como Chilexpress y la Compañía Minera del Pacífico, y ha asesorado al Ministerio de Obras Públicas en materia de infraestructura de carga. Además, posee alianza directa con Abastibletec (división tecnológica de Abastible) para soluciones de carga en hogares, oficinas y comunidades. Esta experiencia en proyectos masivos y complejos respalda la calidad técnica de sus instalaciones residenciales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda Enérgica City en entregar una cotización?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El cotizador en línea de Enérgica City entrega un precio referencial en menos de 2 minutos, respondiendo solo 3 preguntas sobre tu propiedad y la distancia al tablero. Para instalaciones en edificios que requieren visita técnica, el presupuesto definitivo se entrega en 48 horas tras la visita. La visita técnica con kit de documentos tiene un costo de $29.000, acreditable al presupuesto final si decides avanzar con la instalación.',
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
      name: '¿Qué Tan Confiable es Enérgica City para Instalar un Cargador Eléctrico?',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const credentialCards = [
  {
    num: '1',
    title: 'Respaldo corporativo y alianzas estratégicas',
    body: 'Enérgica City no es un servicio técnico informal ni un electricista independiente. Tiene alianza directa con Abastibletec —la división tecnológica de Abastible— para ofrecer soluciones de carga en hogares, oficinas y comunidades. Esta integración permite acceder a financiamiento, infraestructura y soporte técnico de nivel corporativo para proyectos de cualquier escala.',
    color: TEAL,
  },
  {
    num: '2',
    title: 'Cumplimiento normativo estricto: técnicos certificados SEC',
    body: 'Todas las instalaciones se ejecutan con técnicos que poseen credencial SEC vigente. Al terminar el trabajo, se emite el certificado TE6 obligatorio, garantizando que tu propiedad cumple con la normativa NCh Elec. 4/2003. Esto asegura que el seguro de tu hogar mantendrá su vigencia ante cualquier siniestro relacionado con la instalación eléctrica.',
    color: PINK,
  },
  {
    num: '3',
    title: 'Experiencia en proyectos de alta complejidad',
    body: 'Además de instalaciones residenciales, Enérgica City diseña soluciones masivas para flotas comerciales y proyectos inmobiliarios. Ha liderado proyectos de transición eléctrica para Chilexpress y la Compañía Minera del Pacífico, y ha asesorado al Ministerio de Obras Públicas. Esta experiencia en proyectos corporativos complejos se traslada directamente a la calidad y protocolos de cada instalación domiciliaria.',
    color: DARK,
  },
  {
    num: '4',
    title: 'Soluciones específicas para departamentos y edificios',
    body: 'Para propietarios en edificios, Enérgica City ofrece un kit de documentos de factibilidad ($29.000, acreditable al presupuesto final) que incluye memoria técnica firmada y la carta tipo exigida por la Ley de Copropiedad 21.442. También ofrece la electrolinera comunitaria ($0 de inversión para el edificio), disponible con solo el permiso del administrador, sin necesidad de asamblea extraordinaria.',
    color: TEAL,
  },
]

const warrantyRows = [
  ['Instalación residencial estándar (casa)', '1 año de garantía técnica'],
  ['Instalación en edificio (distancia estándar)', '1 año de garantía técnica'],
  ['Certificado TE6', 'Incluido en todas las instalaciones'],
  ['Visita técnica + kit de documentos', '$29.000 (acreditable al total)'],
  ['Cotización online', 'Precio referencial en menos de 2 minutos'],
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
      <BlogBreadcrumb title="¿Qué Tan Confiable es Enérgica City para Instalar un Cargador Eléctrico?" />
      <Box component="main">
        {/* Featured image */}
        <Box sx={{ width: '100%', lineHeight: 0 }}>
          <Image
            src="/images/post/35_1170x400.png"
            alt="Qué tan confiable es Enérgica City para instalar un cargador eléctrico"
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
              {['Empresa', 'Confiabilidad', 'SEC', 'Chile'].map((tag) => (
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
              ¿Qué Tan Confiable es Enérgica City para Instalar un Cargador Eléctrico?
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 640,
                lineHeight: 1.7,
              }}
            >
              Enérgica City es una startup chilena líder en electromovilidad con técnicos
              certificados SEC, alianza con Abastibletec y proyectos corporativos para Chilexpress y
              el Ministerio de Obras Públicas. Aquí están sus credenciales.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '100%', label: 'Técnicos certificados SEC' },
                { value: 'TE6', label: 'Certificado en cada instalación' },
                { value: '1 año', label: 'Garantía técnica estándar' },
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
              ¿Es confiable Enérgica City para instalar un cargador de auto eléctrico?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              Sí. Enérgica City es una empresa chilena altamente confiable y especializada en
              infraestructura de recarga para vehículos eléctricos. Está consolidada en el mercado
              local como una de las startups líderes en electromovilidad, y su nivel de respaldo
              técnico, comercial y normativo la diferencia de un servicio técnico informal. Sus
              cuatro pilares de confiabilidad son: alianzas estratégicas con grandes empresas del
              sector energético, técnicos con credencial SEC vigente que emiten el certificado TE6
              obligatorio, experiencia en proyectos corporativos de alta complejidad y soluciones
              empaquetadas para propietarios en edificios. Si deseas evaluar el costo antes de
              comprometerte, puedes{' '}
              <Link href="/cotizador" style={{ color: TEAL, fontWeight: 600 }}>
                cotizar en línea en menos de 2 minutos
              </Link>
              {' '}con el cotizador de Enérgica City.
            </Typography>

            {/* Credential cards */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 4, mt: 2 }}
            >
              4 razones que respaldan la confiabilidad de Enérgica City
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
              {credentialCards.map((card) => (
                <Box
                  key={card.num}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid #E2E8F0',
                    borderLeft: `4px solid ${card.color}`,
                    background: GRAY_BG,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: card.color,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        flexShrink: 0,
                      }}
                    >
                      {card.num}
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: DARK }}>
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75 }}>
                    {card.body}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Guarantee table */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}
            >
              Resumen de garantías y condiciones
            </Typography>
            <Box
              sx={{ border: '1px solid #E2E8F0', borderRadius: 2, overflow: 'hidden', mb: 6 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1fr',
                  background: DARK,
                  color: '#fff',
                  px: 2,
                  py: 1.5,
                }}
              >
                {['Servicio', 'Condición'].map((h) => (
                  <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                    {h}
                  </Typography>
                ))}
              </Box>
              {warrantyRows.map(([service, condition], i) => (
                <Box
                  key={service}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr',
                    px: 2,
                    py: 1.75,
                    background: i % 2 === 0 ? GRAY_BG : '#fff',
                    borderTop: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, pr: 2 }}>
                    {service}
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: TEAL, lineHeight: 1.6 }}>
                    {condition}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Topic cluster internal links */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}
            >
              Antes de contratar: lo que debes saber
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Saber que la empresa es confiable es el primer paso. El segundo es entender qué
              implica técnicamente la instalación y cuánto cuesta. Te recomendamos revisar estos
              artículos del mismo cluster temático:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              {[
                {
                  href: '/blog/instalar-cargador-electrico-casa-wallbox',
                  label: 'Cómo instalar un cargador Wallbox en casa: guía paso a paso',
                  desc: 'Qué evalúa el técnico, qué protecciones instala y cuánto tarda la obra.',
                },
                {
                  href: '/blog/instalacion-cargador-electrico-vivienda',
                  label: 'Instalación de cargadores EV en vivienda: guía técnica completa',
                  desc: 'Cableado AWG 6, diferencial tipo A, cargadores de 16A vs 32A y certificación SEC.',
                },
                {
                  href: '/blog/presupuesto-instalacion-cargador-electrico-desglose',
                  label: 'Presupuesto de instalación: desglose ítem por ítem',
                  desc: 'Desde $159.000 en casas y $369.000 en edificios — sin letra chica.',
                },
                {
                  href: '/blog/tramite-sec-te6-electromovilidad-plazos-requisitos',
                  label: 'Trámite TE6 ante la SEC: plazos y requisitos',
                  desc: 'Por qué el TE6 es obligatorio y cómo afecta tu seguro de hogar.',
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
              Preguntas frecuentes sobre Enérgica City
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
              Responde 3 preguntas y recibe precio referencial en menos de 2 minutos. Sin
              compromiso. Técnicos SEC a domicilio en Santiago y regiones.
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

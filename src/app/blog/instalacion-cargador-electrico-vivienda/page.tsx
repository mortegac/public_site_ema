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

const SLUG = 'instalacion-cargador-electrico-vivienda'

export const metadata: Metadata = {
  title: 'Instalación de Cargadores para Vehículos Eléctricos en Casa: Guía Técnica',
  description:
    'Guía técnica completa para instalar un cargador EV en vivienda: cableado AWG 6, diferencial tipo A, cargadores 16A vs 32A y certificado TE6 ante la SEC en Chile.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Instalación de Cargadores para Vehículos Eléctricos en Casa: Guía Técnica',
    description:
      'Todo lo que necesitas saber para instalar un punto de carga de vehículo eléctrico en tu hogar: materiales, protecciones, normativa SEC y diferencias entre 16A y 32A.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Instalación cargador vehículo eléctrico vivienda Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instalación Cargador EV en Casa: Guía Técnica Chile',
    description:
      'Cableado AWG 6, diferencial tipo A, cargadores 16A vs 32A y certificado TE6 SEC. Todo sobre instalación de cargadores EV en vivienda.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Instalación de Cargadores para Vehículos Eléctricos en Casa: Guía Técnica Completa',
  description:
    'Guía técnica para instalar un sistema de alimentación de vehículo eléctrico en vivienda: evaluación del empalme, cableado dedicado, protecciones tipo A y certificación SEC.',
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
  keywords:
    'instalación cargador vehículo eléctrico, cargadores para vehículos eléctricos, instalación eléctrica domiciliaria, cargadores 32A 16A, técnico autorizado SEC, sistema de alimentación vehículo eléctrico, instalación punto de carga casa',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué calibre de cable se necesita para instalar un cargador eléctrico en casa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El calibre depende de la potencia del cargador. Para cargadores de 7,4 kW (32 A) se usa cable de cobre AWG 6 (16 mm²), que soporta la corriente sostenida de carga sin sobrecalentarse. Para cargadores de 3,7 kW (16 A) es suficiente cable AWG 8 (10 mm²). En Chile se recomienda siempre dimensionar el cable para el amperaje del cargador más un margen del 25%, según la normativa NCh Elec. 4/2003. Un instalador SEC certificado realiza el cálculo exacto durante la visita técnica, considerando la distancia desde el tablero hasta el punto de carga.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre un cargador de 16A y uno de 32A?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un cargador de 16 A entrega hasta 3,7 kW en red monofásica, cargando una batería típica de 60 kWh en aproximadamente 16 horas: suficiente si cargas de noche y el auto recorre menos de 150 km diarios. Un cargador de 32 A entrega hasta 7,4 kW monofásico (o 22 kW trifásico), cargando la misma batería en 8 horas o menos. La elección correcta depende de la capacidad de tu empalme eléctrico y de cuántos kilómetros recorres por día. El instalador SEC verificará durante la visita que tu empalme soporta la demanda adicional sin disparar el diferencial general.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué se requiere un diferencial tipo A para cargadores EV?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los cargadores de vehículos eléctricos (Nivel 2 / AC) generan corrientes de fuga con componente continua pulsante que los diferenciales estándar tipo AC no detectan correctamente. El diferencial tipo A detecta tanto corrientes senoidales (AC) como pulsantes (DC moduladas), cubriendo el perfil real de corriente que genera un cargador EV. La normativa chilena NCh Elec. 4/2003 y las guías técnicas de la SEC exigen el uso de diferencial tipo A o tipo F en instalaciones de carga de vehículos eléctricos. Instalar un diferencial tipo AC en lugar de tipo A es un incumplimiento normativo que invalida el certificado TE6.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el certificado TE6 y quién lo emite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El TE6 es el certificado de instalación eléctrica interior que emite un instalador con credencial SEC vigente (Clase A, B o C) una vez terminado el trabajo. En él se declara que la instalación cumple con la normativa NCh Elec. 4/2003 y se registra ante la distribuidora eléctrica correspondiente (Enel, CGE, Chilquinta, etc.). Sin TE6, la instalación no está regularizada: el seguro de hogar puede rechazar siniestros relacionados con esa instalación, y en caso de venta de la propiedad puede generar problemas en la escrituración. Enérgica City emite el TE6 en cada instalación, sin costo adicional.',
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
      name: 'Instalación de Cargadores para Vehículos Eléctricos en Casa: Guía Técnica',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const steps = [
  {
    num: '01',
    title: 'Evaluación técnica inicial del empalme',
    body: 'El primer paso es verificar que tu instalación eléctrica soporta la demanda adicional del cargador. Un instalador SEC revisa la capacidad del empalme (típicamente 5 kW a 15 kW en viviendas), el estado del tablero general, la distancia desde el tablero hasta el estacionamiento y si existen circuitos sobreexigidos. En casas antiguas o con empalmes de baja potencia puede ser necesario solicitar un aumento de capacidad a la distribuidora antes de instalar el cargador.',
    color: TEAL,
  },
  {
    num: '02',
    title: 'Cableado dedicado: calibre y trazado',
    body: 'El cargador EV requiere un circuito eléctrico exclusivo: no puede compartir el circuito con otros artefactos. Se usa cable de cobre de calibre AWG 6 (16 mm²) para cargadores de 32 A o AWG 8 (10 mm²) para 16 A. El cable se instala en tubería conduit o canalización según el trazado acordado entre el instalador y el propietario. El trazado correcto evita cruces con circuitos de agua caliente sanitaria o ductos de gas, siguiendo las disposiciones de la normativa NCh Elec. 4/2003.',
    color: TEAL,
  },
  {
    num: '03',
    title: 'Protecciones eléctricas en el tablero',
    body: 'En el tablero eléctrico principal se instalan dos protecciones dedicadas: (1) un interruptor diferencial tipo A de alta sensibilidad (30 mA), que detecta corrientes de fuga senoidales y pulsantes generadas por el cargador, y (2) un interruptor termomagnético calibrado al amperaje del cargador (16 A o 32 A), que protege el cable ante sobrecarga sostenida o cortocircuito. Estas protecciones son obligatorias por normativa y constituyen el elemento de seguridad más crítico de toda la instalación.',
    color: PINK,
  },
  {
    num: '04',
    title: 'Montaje del cargador (Wallbox)',
    body: 'Una vez tendido el cable y verificadas las protecciones, el instalador monta el Wallbox en la pared del estacionamiento. Los cargadores de Nivel 2 (AC) más comunes en Chile operan entre 3,7 kW y 22 kW y son compatibles con el conector Tipo 2 (estándar europeo IEC 62196), presente en todos los vehículos eléctricos vendidos en el mercado chileno. La altura de montaje estándar es entre 90 cm y 120 cm del suelo, con orientación que facilita el acceso al conector sin dobleces en el cable del cargador.',
    color: DARK,
  },
  {
    num: '05',
    title: 'Pruebas y certificado TE6',
    body: 'Tras el montaje, el instalador realiza pruebas de aislamiento eléctrico, verificación de la continuidad de la puesta a tierra y prueba funcional de carga con el vehículo. Aprobadas las pruebas, emite el certificado TE6 que se registra ante la SEC y la distribuidora. Todo el proceso desde la visita técnica hasta el TE6 toma habitualmente entre 1 y 3 días hábiles en instalaciones residenciales estándar.',
    color: DARK,
  },
]

const chargerComparison = [
  ['Potencia', '3,7 kW (monofásico)', '7,4 kW (monofásico) / 22 kW (trifásico)'],
  ['Corriente', '16 A', '32 A'],
  ['Cable requerido', 'AWG 8 (10 mm²)', 'AWG 6 (16 mm²)'],
  ['Carga batería 60 kWh', '~16 horas', '~8 horas'],
  ['Ideal para', 'Uso diario < 150 km', 'Uso diario > 150 km o flota'],
  ['Empalme recomendado', '5 kW o más', '8 kW o más'],
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
      <BlogBreadcrumb title="Instalación de Cargadores para Vehículos Eléctricos en Casa: Guía Técnica" />
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
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Instalación', 'Residencial', 'Técnico SEC', 'Normativa'].map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: '999px',
                    background: 'rgba(0,0,0,0.15)',
                    border: '1px solid rgba(0,0,0,0.2)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#000',
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
                color: '#000000',
              }}
            >
              Instalación de Cargadores para Vehículos Eléctricos en Casa
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: '#000000',
                maxWidth: 640,
                lineHeight: 1.7,
                mx: 'auto',
                mb: 4,
              }}
            >
              Guía técnica completa: desde la evaluación del empalme hasta el certificado TE6. Todo
              lo que necesitas saber sobre el sistema de alimentación para vehículo eléctrico en tu
              vivienda.
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
                { value: '5 pasos', label: 'Proceso completo de instalación' },
                { value: 'TE6', label: 'Certificado SEC incluido' },
                { value: '1–3 días', label: 'Tiempo de ejecución estándar' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Typography
                    sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 800, color: TEAL }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: '#CBD5E1', mt: 0.5, fontSize: '0.9rem' }}>
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Main content — steps */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">
            {/* GEO definition block */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}
            >
              ¿Qué implica instalar un sistema de alimentación para vehículo eléctrico en casa?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              Instalar un cargador eléctrico en casa —también llamado punto de carga de Nivel 2 o
              Wallbox— no equivale a enchufar el auto a un tomacorriente común. Requiere un circuito
              eléctrico dedicado con cable de cobre de calibre adecuado, protecciones específicas en
              el tablero (diferencial tipo A y termomagnético) y, al finalizar, el certificado TE6
              emitido ante la SEC por un instalador con credencial vigente. El proceso completo toma
              entre 1 y 3 días hábiles en instalaciones residenciales estándar. En Chile, el costo
              base parte desde $159.000 para casas con distancias cortas al tablero (hasta 20 metros).
            </Typography>

            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 4, mt: 2 }}
            >
              Los 5 pasos de una instalación correcta
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
              {steps.map((step) => (
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
                    <Typography
                      sx={{
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: step.color,
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {step.num}
                    </Typography>
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

            {/* Charger comparison table */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}
            >
              Cargadores 16A vs 32A: ¿cuál necesita tu auto?
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
                    <th>Cargador 16 A</th>
                    <th>Cargador 32 A</th>
                  </tr>
                </thead>
                <tbody>
                  {chargerComparison.map(([feature, a16, a32]) => (
                    <tr key={feature}>
                      <td style={{ fontWeight: 600 }}>{feature}</td>
                      <td>{a16}</td>
                      <td style={{ color: TEAL, fontWeight: 600 }}>{a32}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>

            {/* Safety section */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 2, mt: 2 }}
            >
              Precauciones de seguridad críticas
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              La instalación de un cargador EV sin protecciones adecuadas puede provocar incendios
              eléctricos o fallos que dañen la batería del vehículo. Las tres precauciones
              irrenunciables son:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 6 }}>
              {[
                {
                  title: 'Diferencial tipo A obligatorio',
                  body: 'Nunca instalar un diferencial tipo AC para proteger el circuito del cargador. Los cargadores EV generan corrientes de fuga con componente continua que el tipo AC no detecta. Ver más en el artículo sobre protecciones eléctricas.',
                  href: '/blog/seguridad-electrica-cargadores-ev-protecciones-necesarias',
                },
                {
                  title: 'Cable dimensionado correctamente',
                  body: 'Nunca usar cable de sección insuficiente. Un cable subdimensionado se sobrecalienta durante la carga nocturna y puede generar incendio en el muro.',
                  href: null,
                },
                {
                  title: 'Técnico con credencial SEC vigente',
                  body: 'Verificar la credencial SEC del instalador antes de contratar. Un trabajo sin TE6 invalida el seguro de hogar y puede generar problemas en la venta de la propiedad.',
                  href: '/blog/tramite-sec-te6-electromovilidad-plazos-requisitos',
                },
              ].map((item) => (
                <Box
                  key={item.title}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    background: GRAY_BG,
                    borderLeft: `3px solid ${PINK}`,
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5, fontSize: '0.95rem' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: TEXT_MUTED, fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {item.body}
                    {item.href && (
                      <>
                        {' '}
                        <Link href={item.href} style={{ color: TEAL, fontWeight: 600 }}>
                          Leer más →
                        </Link>
                      </>
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Topic cluster internal links */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}
            >
              Guías relacionadas en el mismo cluster temático
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              {[
                {
                  href: '/blog/instalar-cargador-electrico-casa-wallbox',
                  label: 'Cómo instalar un cargador Wallbox en casa: guía paso a paso',
                  desc: 'Guía completa desde la evaluación técnica hasta el proceso de certificación.',
                },
                {
                  href: '/blog/que-tan-confiable-es-energica-city-cargador-electrico',
                  label: '¿Por qué elegir Enérgica City? Sus credenciales y garantías',
                  desc: 'Respaldo SEC, alianza Abastibletec y proyectos corporativos.',
                },
                {
                  href: '/blog/presupuesto-instalacion-cargador-electrico-desglose',
                  label: 'Presupuesto de instalación: desglose ítem por ítem',
                  desc: 'Desde $159.000 en casas — qué está incluido y qué puede encarecer el precio.',
                },
                {
                  href: '/blog/cargador-portatil-vs-wallbox-cual-conviene',
                  label: 'Cargador portátil vs Wallbox: ¿cuál conviene?',
                  desc: 'Comparativa de potencia, seguridad y costo para decidir qué instalar.',
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
              Preguntas frecuentes sobre instalación de cargadores EV en vivienda
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
              Cotiza tu instalación con técnico SEC certificado
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 5,
                fontSize: '1.05rem',
              }}
            >
              Precio referencial en 2 minutos. Instalación desde $159.000 en casas con TE6
              incluido.
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
                  Cotizar ahora →
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

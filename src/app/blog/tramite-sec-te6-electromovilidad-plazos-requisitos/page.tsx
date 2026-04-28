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

const SLUG = 'tramite-sec-te6-electromovilidad-plazos-requisitos'

export const metadata: Metadata = {
  title: 'Trámite TE6 ante la SEC: Plazos y requisitos para tu cargador',
  description:
    'Cómo obtener el certificado TE6 de la SEC para tu cargador eléctrico en Chile. Plazos, requisitos, costos y por qué es obligatorio para seguros de hogar.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Trámite TE6 ante la SEC: Plazos y requisitos para tu cargador',
    description:
      'Todo sobre el certificado TE6 de la SEC para cargadores eléctricos en Chile: quién puede tramitarlo, plazos y consecuencias de no tenerlo.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Formulario TE6 SEC certificación instalación eléctrica cargador EV Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trámite TE6 SEC: Plazos y requisitos para cargadores EV',
    description:
      'El TE6 es obligatorio para instalar cargadores eléctricos en Chile. Conoce los plazos, requisitos y quién puede tramitarlo.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Trámite TE6 ante la SEC: Plazos y Requisitos para tu Cargador',
  description:
    'Guía completa sobre la declaración TE6 ante la SEC para instalaciones de cargadores de vehículos eléctricos en Chile: requisitos, plazos, costos y consecuencias legales.',
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
  datePublished: '2025-05-05',
  dateModified: '2025-05-05',
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
      name: '¿Cuánto tiempo tarda el trámite TE6 ante la SEC en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'El plazo estándar para procesar la declaración TE6 ante la Superintendencia de Electricidad y Combustibles (SEC) es de 5 a 7 días hábiles desde su presentación. El instalador eléctrico con licencia SEC vigente presenta el formulario en línea a través del portal de la SEC junto con los planos de la instalación, el certificado de materiales y el informe de mediciones. Una vez aprobado, el número de declaración queda registrado en el sistema de la SEC y es verificable por aseguradoras y organismos fiscalizadores.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa si instalo un cargador sin certificado TE6?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Instalar un cargador eléctrico sin tramitar el formulario TE6 ante la SEC tiene tres consecuencias legales en Chile: primero, el seguro de hogar puede rechazar cualquier siniestro (incendio, corto circuito) relacionado con la instalación eléctrica no declarada. Segundo, la SEC puede aplicar multas que van desde 1 a 50 UTM (~$67.000 a $3.360.000) según la gravedad de la infracción. Tercero, en edificios y condominios, la administración puede exigir la remoción de la instalación no certificada y el propietario debe asumir todos los costos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cualquier electricista puede tramitar el TE6 para un cargador EV?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'No. Solo pueden presentar el formulario TE6 ante la SEC los instaladores eléctricos con licencia vigente categoría A, B o C registrados en la SEC. La categoría mínima para instalaciones domiciliarias de cargadores EV es la categoría B. Además, el instalador debe tener RUT vigente en el portal SEC Online y, en muchos casos, contar con experiencia específica en instalaciones de electromovilidad, ya que los circuitos dedicados para cargadores tienen requisitos distintos a los circuitos domésticos estándar contemplados en la NCh Elec. 4/2003.',
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
      name: 'Trámite TE6 ante la SEC: Plazos y requisitos para tu cargador',
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
            background: `linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)`,
            color: '#fff',
            py: { xs: 8, md: 12 },
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {['Certificación SEC', 'Normativa TE6', 'NCh Elec. 4/2003'].map((tag) => (
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
              Trámite TE6 ante la SEC: Plazos y Requisitos para tu Cargador
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 640,
                lineHeight: 1.7,
              }}
            >
              La declaración TE6 es el documento legal que certifica que tu instalación de carga
              eléctrica cumple la normativa chilena. Sin él, tu seguro de hogar puede quedar sin
              cobertura.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '5–7', label: 'Días hábiles para aprobación' },
                { value: '50 UTM', label: 'Multa máxima sin TE6' },
                { value: '$0', label: 'Costo adicional con Enérgica City' },
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
              ¿Qué es el formulario TE6 y por qué es obligatorio?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El formulario TE6 es la <strong>Declaración de Instalación Eléctrica</strong>{' '}
              exigida por la Superintendencia de Electricidad y Combustibles (SEC) de Chile. Su
              base legal es el Reglamento de Instalaciones Eléctricas de Corrientes Fuertes (DS N°
              327 del Ministerio de Energía), que establece que toda instalación eléctrica nueva o
              modificación de una existente en baja tensión debe ser declarada ante la SEC antes de
              entrar en operación.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Un cargador de vehículo eléctrico implica siempre la modificación del tablero
              eléctrico (nuevo breaker dedicado) y la instalación de un circuito nuevo, por lo que
              obliga a presentar el TE6 independientemente de la potencia del cargador. Esto aplica
              tanto para cargadores monofásicos de 7,4 kW como para unidades trifásicas de 22 kW,
              y tanto para viviendas como para oficinas, edificios y parkings comerciales.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Consecuencias legales de no tener el TE6
            </Typography>
            <Box sx={{ mb: 4 }}>
              {[
                {
                  icon: '⚠️',
                  title: 'Invalidación del seguro de hogar',
                  desc:
                    'Las pólizas de seguro de incendio y hogar exigen que las instalaciones eléctricas cumplan la normativa vigente. Un incendio originado en un circuito de carga no declarado puede resultar en rechazo del siniestro, dejándote sin cobertura por pérdidas que pueden superar los $50 millones.',
                },
                {
                  icon: '💰',
                  title: 'Multas de la SEC',
                  desc:
                    'La SEC puede multar entre 1 y 50 UTM (~$67.000 a $3.360.000 CLP) por instalaciones eléctricas no declaradas. Las multas son más elevadas cuando la instalación representa un riesgo para terceros, como en edificios o locales comerciales.',
                },
                {
                  icon: '🏢',
                  title: 'Problemas en edificios y condominios',
                  desc:
                    'En edificios de uso mixto o residencial, la administración puede exigir la documentación TE6 como condición para mantener la instalación. Sin este certificado, la administración puede requerir la remoción del cargador y el propietario debe asumir todos los costos de desinstalación y reparación.',
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
                    mb: 2,
                    borderLeft: '4px solid #F59E0B',
                  }}
                >
                  <Typography sx={{ fontSize: '1.4rem', lineHeight: 1 }}>{item.icon}</Typography>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: '#475569', fontSize: '0.93rem', lineHeight: 1.7 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

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
              ¿Quién puede tramitar el TE6?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Solo los instaladores eléctricos con licencia vigente registrados en la SEC pueden
              presentar el formulario TE6. La ley chilena prohíbe expresamente que un propietario
              o un técnico sin licencia SEC realice instalaciones eléctricas en baja tensión o
              presente este tipo de declaraciones.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Categorías de licencia SEC para cargadores EV
            </Typography>
            <Box
              sx={{
                border: `1px solid #E2E8F0`,
                borderRadius: 2,
                overflow: 'hidden',
                mb: 4,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr',
                  background: DARK,
                  color: '#fff',
                  px: 2,
                  py: 1.5,
                }}
              >
                {['Categoría', 'Alcance', 'Válida para cargadores EV'].map((h) => (
                  <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                    {h}
                  </Typography>
                ))}
              </Box>
              {[
                ['Categoría A', 'Instalaciones especiales e industriales, alta tensión', 'Sí'],
                [
                  'Categoría B',
                  'Instalaciones domiciliarias y pequeño comercio hasta 40 kVA',
                  'Sí (mínima recomendada)',
                ],
                ['Categoría C', 'Solo mantenimiento, sin instalaciones nuevas', 'No'],
                ['Empresa instaladora', 'Proyectos de gran escala, edificios, industria', 'Sí'],
              ].map(([cat, alcance, valido], i) => (
                <Box
                  key={cat}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 1fr',
                    px: 2,
                    py: 1.5,
                    background: i % 2 === 0 ? GRAY_BG : '#fff',
                    borderTop: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: DARK }}>
                    {cat}
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: '#475569' }}>{alcance}</Typography>
                  <Typography
                    sx={{
                      fontSize: '0.88rem',
                      color: valido === 'Sí' ? '#059669' : '#DC2626',
                      fontWeight: 600,
                    }}
                  >
                    {valido}
                  </Typography>
                </Box>
              ))}
            </Box>

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
              Documentos necesarios para el TE6
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El instalador eléctrico debe reunir y adjuntar los siguientes documentos al formulario
              TE6 en el portal SEC Online. El proceso es digital desde 2022 y no requiere
              presentación física salvo casos excepcionales.
            </Typography>

            {[
              {
                n: '01',
                title: 'Plano unifilar de la instalación',
                body:
                  'Diagrama eléctrico que muestra el circuito desde el empalme hasta el punto de carga. Debe indicar calibres de cable, protecciones, distancias y características del cargador instalado.',
              },
              {
                n: '02',
                title: 'Memoria de cálculo eléctrico',
                body:
                  'Cálculo de la caída de tensión, la corriente de cortocircuito y la capacidad térmica de los conductores según NCh Elec. 4/2003. Para circuitos de cargadores EV, la caída de tensión máxima permitida es del 3 % en ramales terminales.',
              },
              {
                n: '03',
                title: 'Lista de materiales certificados',
                body:
                  'Detalle de todos los materiales instalados (cables, breakers, conduits, conectores) con sus certificaciones de producto. Los materiales eléctricos en Chile deben tener certificación de la SEC o de un organismo de certificación reconocido.',
              },
              {
                n: '04',
                title: 'Informe de mediciones',
                body:
                  'Resultado de las pruebas realizadas tras la instalación: resistencia de aislamiento, continuidad de conductores de protección (tierra), y verificación de la polaridad. Los valores mínimos exigidos por la SEC para residencias son resistencia de aislamiento > 1 MΩ y resistencia de tierra < 200 Ω.',
              },
              {
                n: '05',
                title: 'Identificación del instalador',
                body:
                  'RUT, número de licencia SEC vigente y firma del instalador responsable. La declaración es un documento legal y el instalador asume responsabilidad civil y penal por la veracidad de lo declarado.',
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
              Requisitos específicos de la NCh Elec. 4/2003 para cargadores EV
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              La norma NCh Elec. 4/2003 —la norma eléctrica residencial chilena— fue actualizada
              para incluir requisitos específicos para la instalación de puntos de carga de
              vehículos eléctricos. Los puntos más relevantes para instaladores son:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 4 }}>
              {[
                'Todo circuito dedicado a carga de VE debe protegerse con un interruptor diferencial (RCCB) de 30 mA de tipo A o tipo B, dependiendo del tipo de cargador.',
                'El conductor de tierra debe tener el mismo calibre que los conductores de fase, como mínimo 6 AWG para circuitos de 50 A.',
                'Los tomacorrientes para carga (modo 2) deben ser del tipo industrial (CEE 7/4 o similar), no enchufes domésticos estándar.',
                'Las instalaciones en zonas de lavado de vehículos o al aire libre requieren protección IP44 como mínimo para los componentes eléctricos.',
                'Los cargadores de pared (modo 3, wallbox) deben tener protección contra sobretensiones instalada en el tablero si están ubicados a menos de 50 m de la acometida.',
              ].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1.5 }}>
                  <Typography sx={{ color: '#334155', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El incumplimiento de alguno de estos requisitos es causa suficiente para que la SEC
              rechace el formulario TE6 y exija la corrección antes de aprobar la declaración.
              Enérgica City realiza una revisión previa de todos estos puntos durante la visita
              técnica, antes de comenzar la instalación, para garantizar la aprobación del TE6 en
              el primer intento.
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
              Preguntas frecuentes sobre el TE6 y la SEC
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
              Instala tu cargador con certificación TE6 incluida
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 5,
                fontSize: '1.05rem',
              }}
            >
              Todos nuestros proyectos incluyen la tramitación del TE6 ante la SEC sin costo
              adicional. Instalaciones desde $159.000.
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
                  Cotizar instalación
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

import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import BlogBreadcrumb from '@/app/components/shared/BlogBreadcrumb'
import AuthorByline from '@/app/components/shared/AuthorByline'
import BlogRelatedArticles from '@/app/components/shared/BlogRelatedArticles'
import { CANONICAL_DOMAIN } from '@/utils/seo-config'
import TechnicianForm from './TechnicianForm'

const DARK = '#0F172A'
const TEAL = '#0898b9'
const PINK = '#e81a68'
const GRAY_BG = '#F8FAFC'

const SLUG = 'instaladores-sec-ema-electromovilidad-chile'

export const metadata: Metadata = {
  title: 'Instaladores SEC: Únete a la Red EMA de Electromovilidad',
  description:
    'El problema de la electromovilidad en Chile no es la falta de autos, es la falta de manos certificadas. Únete a EMA (Electricians Marketplace) y accede a proyectos ya validados, gestión operativa y el segmento residencial que concentra más del 70% de la carga en Chile, según proyecciones del Ministerio de Energía.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Instaladores SEC: Únete a la Red EMA de Electromovilidad',
    description:
      'Enérgica City escala EMA, su red de instaladores certificados SEC. Proyectos validados, gestión operativa y foco residencial. Postula como partner.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/post/13_1170x400.png`,
        width: 1170,
        height: 400,
        alt: 'Instaladores SEC certificados red EMA Enérgica City',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instaladores SEC: Únete a la Red EMA',
    description:
      'Proyectos ya validados, gestión operativa con EVE y foco en el segmento residencial. Postula como partner de la red EMA de Enérgica City.',
    images: [`${CANONICAL_DOMAIN}/images/post/13_1170x400.png`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Instaladores SEC: Únete a la Red EMA de Electromovilidad',
  description:
    'El verdadero freno de la electromovilidad en Chile es la fricción de instalación: procesos lentos, caros y sin trazabilidad. EMA resuelve esto conectando instaladores certificados SEC con proyectos ya validados.',
  image: {
    '@type': 'ImageObject',
    url: `${CANONICAL_DOMAIN}/images/post/13_1170x400.png`,
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
  articleSection: 'Servicios',
  keywords: 'instaladores SEC electromovilidad, red EMA instaladores certificados, certificado TE6 cargadores eléctricos, instalación cargador vehículo eléctrico Chile, electricistas marketplace, electromovilidad Chile 2026, instaladores certificados SEC Chile',
  datePublished: '2026-07-03',
  dateModified: '2026-07-08',
  url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${CANONICAL_DOMAIN}/blog/${SLUG}` },
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
      name: 'Instaladores SEC: Únete a la Red EMA',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Por qué es obligatoria la certificación SEC para instalar cargadores de vehículos eléctricos en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La certificación SEC es obligatoria porque sin ella el instalador no puede emitir el certificado TE6, que la Superintendencia de Electricidad y Combustibles exige para que la instalación sea legal. Además, sin TE6 el seguro de hogar queda inválido. Un error frecuente de instaladores no certificados es usar interruptores diferenciales tipo AC en lugar del tipo A obligatorio para cargadores EV, dejando la instalación sin protección real ante fallas eléctricas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el certificado TE6 y cuándo se necesita?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El TE6 es el certificado oficial de instalación eléctrica emitido por un instalador con credencial SEC vigente. Es requerido por la Superintendencia de Electricidad y Combustibles para acreditar que la instalación de un cargador de vehículo eléctrico cumple las normas técnicas chilenas. Sin TE6, la instalación no es legal y el seguro de hogar puede quedar sin cobertura.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es EMA (Electricians Marketplace) y cómo funciona?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EMA (Electricians Marketplace) es la red de instaladores certificados SEC de Enérgica City. Conecta técnicos eléctricos con proyectos residenciales ya validados mediante un simulador de viabilidad técnica y económica, evitando visitas técnicas perdidas. La plataforma EVE gestiona el flujo de energía y pagos, eliminando la carga administrativa para los instaladores.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué el segmento residencial concentra la mayoría de la carga EV en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El segmento residencial concentra más del 70% de la carga en Chile, según proyecciones del Ministerio de Energía. La mayoría de los conductores de vehículos eléctricos carga su auto en casa durante la noche, cuando el vehículo permanece estacionado por más horas. Esto convierte el punto de carga residencial en el más utilizado estadísticamente. A medida que crece el parque de vehículos eléctricos en Chile, la demanda de instalaciones en casas y departamentos supera ampliamente a la de carga pública o comercial.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuáles son los beneficios de unirse a la red EMA como instalador SEC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los instaladores que se suman a EMA reciben proyectos ya validados (sin visitas técnicas perdidas), acceso a la plataforma EVE para gestión de energía y pagos, y participación en el segmento residencial que concentra más del 70% de la carga en Chile, según proyecciones del Ministerio de Energía. EMA busca socios estratégicos, no intermediarios, que quieran crecer con la infraestructura de carga más inteligente del país.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo puede un instalador certificado SEC postular para unirse a la red EMA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los instaladores certificados SEC y proveedores de infraestructura pueden completar el formulario de postulación disponible en la página del blog. El equipo de Enérgica City revisará la postulación y se contactará con los requisitos y el proceso de incorporación. También es posible consultar directamente por WhatsApp al +56 9 6766 6652.',
      },
    },
  ],
}

const benefits = [
  {
    icon: '📋',
    title: 'Proyectos ya validados',
    body: 'No más visitas técnicas perdidas. Recibes solicitudes que ya pasaron por nuestro simulador de viabilidad técnica y económica. Tu tiempo vale.',
    color: TEAL,
  },
  {
    icon: '⚙️',
    title: 'Gestión operativa',
    body: 'Tú instalas, nosotros operamos el flujo de energía y pagos a través de EVE, nuestra plataforma de administración. Sin fricción administrativa.',
    color: DARK,
  },
  {
    icon: '🏠',
    title: 'Foco residencial',
    body: 'Entra al segmento residencial que concentra más del 70% de la carga en Chile (Min. Energía). El mercado más grande está en las casas y departamentos del país.',
    color: PINK,
  },
]

const comments = [
  {
    author: 'Fernando Guerrero',
    role: 'Gerente Comercial en Guerrel',
    text: 'Agrega a todo, que el instalador no capacitado te va a ofrecer un interruptor tipo AC, porque no consiguió uno tipo B en ningún distribuidor del sector en que está haciendo la instalación.',
    isAuthor: false,
  },
  {
    author: 'Felipe Donoso',
    role: 'Founder en Enérgica City',
    text: 'Lamentablemente es así, incluso hubo una noticia en que un ingeniero informático, no certificado por la SEC, realizó la instalación de un cargador. 👌⚡',
    isAuthor: true,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HpHeaderNew />
      <BlogBreadcrumb title="Instaladores SEC: Únete a la Red EMA de Electromovilidad en Chile" />

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
              {['Electromovilidad', 'Instaladores SEC', 'EMA', 'Chile 2026'].map((tag) => (
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
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, lineHeight: 1.15, mb: 2, maxWidth: 820 }}
            >
              Instaladores SEC: Únete a la Red EMA de Electromovilidad en Chile
            </Typography>
          <Box
            component="time"
            dateTime="2026-07-03"
            sx={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', mt: 1.5, letterSpacing: '0.02em' }}
          >
            3 de julio, 2026
          </Box>
          <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
            Por <strong>Felipe Donoso</strong> · Ingeniero Eléctrico, Enérgica City
          </Typography>
            <Typography
              sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, color: 'rgba(255,255,255,0.75)', maxWidth: 640, lineHeight: 1.7, mb: 4 }}
            >
              El problema de la electromovilidad no es la falta de autos, es la falta de manos certificadas.
              Por Felipe Donoso Vergara, Founder en Enérgica City — cómo EMA (Electricians Marketplace)
              escala la red de instaladores SEC para resolver la fricción de instalación residencial.
            </Typography>
            <Link href="#postula" style={{ textDecoration: 'none' }}>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  bgcolor: PINK,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: '#c01556' },
                }}
              >
                Postula como partner →
              </Box>
            </Link>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '70%+', label: 'de la carga EV es residencial en Chile (Min. Energía)' },
                { value: 'SEC', label: 'Certificación obligatoria para instalar cargadores en Chile' },
                { value: 'EVE', label: 'Plataforma de gestión de energía y pagos de Enérgica City' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Box sx={{ textAlign: 'center', color: '#fff' }}>
                    <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800 }}>
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', opacity: 0.85, py: '16px' }}>{stat.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Main article */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{ lineHeight: 1.4, fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3 }}
            >
              ¿Por qué la instalación certificada es el principal obstáculo en la electromovilidad?
            </Typography>
            <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Muchos creen que vender un cargador es el final del proceso. En Enérgica City sabemos que
              es apenas el comienzo. La verdadera brecha hoy es la <strong>"fricción de instalación"</strong>:
              clientes que quieren su vehículo eléctrico, pero se topan con procesos lentos, caros y sin
              trazabilidad.
            </Typography>
            <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Chile tiene una Estrategia Nacional de Electromovilidad con metas claras: la electrificación
              del transporte privado para 2035. Pero entre el auto y el enchufe existe una cadena crítica
              que la industria ha ignorado: los <strong>instaladores eléctricos certificados SEC</strong>.
              Sin ellos, no hay infraestructura. Sin infraestructura, no hay adopción masiva.
            </Typography>
            <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Para resolver esto, estamos escalando <strong>EMA (Electricians Marketplace)</strong> y
              buscamos a los mejores instaladores SEC y proveedores de hardware para sumarlos a nuestra
              red de cumplimiento. No buscamos intermediarios, buscamos socios estratégicos que quieran
              dejar de pelear por "proyectos chicos" y ser dueños de la infraestructura de carga más
              inteligente del país.
            </Typography>

            <Typography
              component="h2"
              sx={{ lineHeight: 1.4, fontSize: { xs: '1.4rem', md: '1.75rem' }, fontWeight: 700, color: DARK, mt: 6, mb: 4 }}
            >
              ¿Por qué ser partner de EMA?
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
              {benefits.map((b) => (
                <Box
                  key={b.title}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    p: 3,
                    border: '1px solid #E2E8F0',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: b.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                    }}
                  >
                    {b.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>{b.title}</Typography>
                    <Typography sx={{ color: '#475569', lineHeight: 1.7 }}>{b.body}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#334155' }}>
              La oportunidad está en el segmento residencial: casas y departamentos que hoy reciben
              su primer vehículo eléctrico y necesitan una instalación correcta, certificada y con
              trazabilidad. Ese mercado crece cada mes y los técnicos de calidad son el cuello de botella.
            </Typography>
          </Container>
        </Box>

        {/* Comments section */}
        <Box sx={{ py: { xs: 6, md: 8 }, background: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{ lineHeight: 1.4, fontSize: { xs: '1.4rem', md: '1.75rem' }, fontWeight: 700, color: DARK, mb: 1 }}
            >
              ¿Por qué la certificación SEC importa para instalar cargadores EV?
            </Typography>
            <Typography sx={{ color: '#64748B', mb: 4 }}>
              Conversación real de LinkedIn sobre los riesgos de instaladores no certificados
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {comments.map((c, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 3,
                    bgcolor: '#fff',
                    border: c.isAuthor ? `2px solid ${TEAL}` : '1px solid #E2E8F0',
                    position: 'relative',
                    ml: c.isAuthor ? { xs: 0, sm: 4 } : 0,
                  }}
                >
                  {c.isAuthor && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        px: 1.5,
                        py: 0.25,
                        borderRadius: '999px',
                        bgcolor: TEAL,
                        color: '#fff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                      }}
                    >
                      AUTHOR
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: c.isAuthor ? TEAL : '#CBD5E1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1rem',
                        flexShrink: 0,
                      }}
                    >
                      {c.author.charAt(0)}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: DARK, fontSize: '0.95rem' }}>
                        {c.author}
                      </Typography>
                      <Typography sx={{ color: '#64748B', fontSize: '0.8rem' }}>{c.role}</Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ color: '#334155', lineHeight: 1.7 }}>{c.text}</Typography>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                mt: 4,
                p: 3,
                bgcolor: '#FFF7ED',
                border: '1px solid #FED7AA',
              }}
            >
              <Typography sx={{ fontWeight: 700, color: '#9A3412', mb: 1 }}>
                ⚠️ Por qué la certificación SEC no es opcional
              </Typography>
              <Typography sx={{ color: '#7C2D12', lineHeight: 1.7, fontSize: '0.95rem' }}>
                Un instalador sin{' '}<a href="https://www.sec.cl/sitioweb/instaladores-electricos/" target="_blank" rel="noopener noreferrer">credencial SEC vigente</a>{' '}no puede emitir el certificado TE6, que es
                <strong> obligatorio</strong> para mantener válido el seguro de hogar y para que la
                instalación sea legal ante la Superintendencia de Electricidad y Combustibles. Además,
                errores como usar un interruptor diferencial tipo AC (en lugar del tipo A obligatorio
                para cargadores EV) pueden dejar la instalación sin protección real ante una falla
                eléctrica.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Registration form */}
        <Box id="postula" sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' }, fontWeight: 800, color: DARK, mb: 2, lineHeight: '40px' }}
              >
                ¿Eres instalador certificado o proveedor de infraestructura?
              </Typography>
              <Typography sx={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, maxWidth: 580, mx: 'auto' }}>
                Postula para unirte a los proyectos que estamos desplegando en la{' '}
                <Link href="/servicios/santiago" style={{ color: '#0898b9' }}>Región Metropolitana</Link>{' '}
                y regiones. Completa el formulario y te contactaremos con los requisitos y el proceso
                de incorporación.
              </Typography>
            </Box>

            <Box
              sx={{
                maxWidth: 560,
                mx: 'auto',
                p: { xs: 3, md: 5 },
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              <TechnicianForm />
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
                ¿Preguntas? Escríbenos directamente a{' '}
                <a href="https://wa.me/56967666652" style={{ color: TEAL, fontWeight: 600 }}>
                  WhatsApp +56 9 6766 6652
                </a>
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* CTA */}
        <Box sx={{ py: { xs: 6, md: 8 }, background: DARK }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography
              component="h2"
              sx={{ lineHeight: 1.4, fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 800, color: '#fff', mb: 2 }}
            >
              ¿Tienes un vehículo eléctrico y necesitas instalación?
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)', mb: 4, lineHeight: 1.7 }}>
              Cotiza tu instalación en 2 minutos. Técnicos SEC certificados, TE6 incluido.
            </Typography>
            <Link href="/cotizador" passHref>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  px: 4,
                  py: 1.75,
                  bgcolor: PINK,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: '#c01556' },
                }}
              >
                Cotizar mi instalación
              </Box>
            </Link>
          </Container>
        </Box>

        <AuthorByline dateModified="2026-07-07" />
        <BlogRelatedArticles currentUid={SLUG} />
      </Box>
    </>
  )
}

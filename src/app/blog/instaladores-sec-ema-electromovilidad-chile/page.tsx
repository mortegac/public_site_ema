import type { Metadata } from 'next'
import Image from 'next/image'
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
  title: 'Instaladores SEC: Únete a la Red EMA de Electromovilidad en Chile',
  description:
    'El problema de la electromovilidad en Chile no es la falta de autos, es la falta de manos certificadas. Únete a EMA (Electricians Marketplace) y accede a proyectos ya validados, gestión operativa y el segmento residencial que concentrará el 80% de la carga.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Instaladores SEC: Únete a la Red EMA de Electromovilidad en Chile',
    description:
      'Enérgica City escala EMA, su red de instaladores certificados SEC. Proyectos validados, gestión operativa y foco residencial. Postula como partner.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Instaladores SEC certificados red EMA Enérgica City electromovilidad Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instaladores SEC: Únete a la Red EMA',
    description:
      'Proyectos ya validados, gestión operativa con EVE y foco en el segmento residencial. Postula como partner de la red EMA de Enérgica City.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Instaladores SEC: Únete a la Red EMA de Electromovilidad en Chile',
  description:
    'El verdadero freno de la electromovilidad en Chile es la fricción de instalación: procesos lentos, caros y sin trazabilidad. EMA resuelve esto conectando instaladores certificados SEC con proyectos ya validados.',
  author: {
    '@type': 'Person',
    name: 'Felipe Donoso Vergara',
    jobTitle: 'Founder, Enérgica City',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Enérgica City',
    url: CANONICAL_DOMAIN,
  },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
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
    body: 'Entra al segmento que concentrará el 80% de la carga en los próximos años. El mercado más grande está en las casas y departamentos de Chile.',
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
    author: 'Felipe Donoso Vergara',
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
      <HpHeaderNew />
      <BlogBreadcrumb title="Instaladores SEC: Únete a la Red EMA de Electromovilidad en Chile" />

      <Box component="main">
        {/* Featured image */}
        <Box sx={{ width: '100%', lineHeight: 0 }}>
          <Image
            src="/images/post/13_1170x400.png"
            alt="Instaladores eléctricos certificados SEC red EMA electromovilidad Chile"
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
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, lineHeight: 1.15, mb: 3, maxWidth: 820 }}
            >
              El problema de la electromovilidad en Chile no es la falta de autos, es la falta de manos certificadas
            </Typography>
            <Typography
              sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, color: 'rgba(255,255,255,0.75)', maxWidth: 640, lineHeight: 1.7 }}
            >
              Por Felipe Donoso Vergara, Founder en Enérgica City — cómo EMA (Electricians Marketplace)
              está escalando la red de instaladores certificados SEC para resolver la "fricción de instalación"
              que frena la electromovilidad residencial en Chile.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '80%', label: 'de la carga EV será residencial en los próximos años' },
                { value: 'SEC', label: 'Certificación obligatoria para instalar cargadores en Chile' },
                { value: 'EVE', label: 'Plataforma de gestión de energía y pagos de Enérgica City' },
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

        {/* Main article */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3 }}
            >
              La fricción de instalación: el obstáculo real
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
              sx={{ fontSize: { xs: '1.4rem', md: '1.75rem' }, fontWeight: 700, color: DARK, mt: 6, mb: 4 }}
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
                    borderRadius: 2,
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
              sx={{ fontSize: { xs: '1.4rem', md: '1.75rem' }, fontWeight: 700, color: DARK, mb: 1 }}
            >
              La industria habla: por qué la certificación importa
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
                    borderRadius: 2,
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
                borderRadius: 2,
                bgcolor: '#FFF7ED',
                border: '1px solid #FED7AA',
              }}
            >
              <Typography sx={{ fontWeight: 700, color: '#9A3412', mb: 1 }}>
                ⚠️ Por qué la certificación SEC no es opcional
              </Typography>
              <Typography sx={{ color: '#7C2D12', lineHeight: 1.7, fontSize: '0.95rem' }}>
                Un instalador sin credencial SEC vigente no puede emitir el certificado TE6, que es
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
        <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' }, fontWeight: 800, color: DARK, mb: 2 }}
              >
                ¿Eres instalador certificado o proveedor de infraestructura?
              </Typography>
              <Typography sx={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, maxWidth: 580, mx: 'auto' }}>
                Postula para unirte a los proyectos que estamos desplegando en la Región Metropolitana
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
                borderRadius: 3,
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
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 800, color: '#fff', mb: 2 }}
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

        <AuthorByline />
        <BlogRelatedArticles currentUid={SLUG} />
      </Box>
    </>
  )
}

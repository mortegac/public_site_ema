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

const SLUG = 'cargador-byd-seal-dolphin-atto-3-chile'

export const metadata: Metadata = {
  title: 'Cargador para BYD Seal, Dolphin y Atto 3 en Chile: Instala en Casa o Edificio',
  description:
    'Instala un cargador certificado SEC para tu BYD en casa o edificio. Compatible con BYD Seal (75,7 kWh), Dolphin (44,9 kWh) y Atto 3 (60,5 kWh). Precio desde $159.000. Cotiza en minutos.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Cargador para BYD Seal, Dolphin y Atto 3 en Chile: Instala en Casa o Edificio',
    description:
      'Instala un cargador certificado SEC para tu BYD en casa o edificio. Compatible con BYD Seal (75,7 kWh), Dolphin (44,9 kWh) y Atto 3 (60,5 kWh). Precio desde $159.000. Cotiza en minutos.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/post/26_1170x400.png`,
        width: 1170,
        height: 400,
        alt: 'Cargador Wallbox para BYD Seal Dolphin Atto 3 en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargador para BYD Seal, Dolphin y Atto 3 en Chile',
    description:
      'Instala un cargador certificado SEC para tu BYD en casa o edificio. Compatible con BYD Seal, Dolphin y Atto 3. Desde $159.000.',
    images: [`${CANONICAL_DOMAIN}/images/post/26_1170x400.png`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  image: {
    '@type': 'ImageObject',
    url: `${CANONICAL_DOMAIN}/images/post/26_1170x400.png`,
    width: 1170,
    height: 400,
  },
  headline: 'Cargador para BYD Seal, Dolphin y Atto 3 en Chile: Instala en Casa o Edificio',
  description:
    'Guía completa para instalar un cargador Wallbox Tipo 2 para BYD en Chile: compatibilidad por modelo, tiempos de carga, opciones para edificios y precios actualizados.',
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
  articleSection: 'Vehículos',
  datePublished: '2026-06-11',
  dateModified: '2026-07-07',
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
      name: '¿Qué conector usa el BYD Seal para cargar en casa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El BYD Seal usa conector Tipo 2 (IEC 62196-2) para carga en corriente alterna, compatible con cualquier Wallbox Tipo 2 instalado en Chile. Para carga rápida en corriente continua (DC), el BYD Seal incorpora el conector combinado CCS2 (Combined Charging System 2), compatible con los electrolineras rápidas públicas. En casa, con un Wallbox de 7 kW instalado por Enérgica City y certificado TE6 ante la SEC, el BYD Seal (75,7 kWh) carga de 10% a 90% en aproximadamente 9 horas. Para quienes llegan a casa con 20% y parten al día siguiente, se recuperan más de 400 km de autonomía durante la noche.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tarda cargar el BYD Dolphin con un Wallbox en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El BYD Dolphin tiene una batería de 44,9 kWh (versión más vendida en Chile) y acepta hasta 7 kW de potencia AC. Con un Wallbox de 7 kW instalado en casa o edificio, la carga de 10% a 90% tarda aproximadamente 6 horas. Si llegas a casa cada noche con el 20% de batería y quieres salir al día siguiente con el 80%, el Wallbox recupera esa diferencia (60% = ~27 kWh) en menos de 4 horas. Con el cargador portátil incluido en el vehículo (2,2 kW), la misma carga tomaría más de 12 horas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta instalar un cargador para BYD en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La instalación de un cargador para BYD en Chile parte desde $159.000 en casas, con Enérgica City, incluyendo materiales estándar (ductos, breaker dedicado, cable 6 AWG), mano de obra, certificación TE6 y un año de garantía técnica. El precio varía según la distancia entre el tablero eléctrico y el punto de instalación: hasta 5 metros aplica un factor de descuento (desde ~$130.000); entre 20 y 40 metros el precio puede llegar a ~$215.000. En edificios, la instalación dedicada parte desde $369.000. La alternativa gratuita para residentes de edificios es la electrolinera comunitaria: $0 de inversión, pagas solo $330 por kWh consumido.',
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
      name: 'Cargador para BYD Seal, Dolphin y Atto 3 en Chile',
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
      <BlogBreadcrumb title="Cargador para BYD Seal, Dolphin y Atto 3 en Chile: Instala en Casa o Edificio" />
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
              {['BYD Chile', 'Wallbox Tipo 2', 'Instalación SEC'].map((tag) => (
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
              Cargador para BYD Seal, Dolphin y Atto 3 en Chile: Instala en Casa o Edificio
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
              BYD lidera las ventas de autos eléctricos en Chile. Todos sus modelos usan conector
              Tipo 2 (AC) y CCS2 (DC), compatibles con Wallbox y cargadores portátiles certificados
              SEC. Cotiza tu instalación en minutos.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '7 kW', label: 'Potencia AC máxima (Wallbox 7kW)' },
                { value: '~6 h', label: 'Carga 10–90% BYD Dolphin (Wallbox)' },
                { value: '$159.000', label: 'Instalación en casa (incluye TE6)' },
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
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}
            >
              ¿Qué cargador necesita el BYD en Chile?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Los vehículos BYD comercializados en Chile —Seal, Dolphin, Atto 3, Han y Tang— utilizan
              el conector Tipo 2 (IEC 62196-2) para carga en corriente alterna (CA), el estándar
              universal en Europa y Latinoamérica. Para carga rápida en corriente continua (CC), usan
              el conector combinado CCS2. Esto significa que cualquier Wallbox Tipo 2 de 7 kW
              instalado en casa o edificio es totalmente compatible, sin adaptadores. La instalación
              domiciliaria certificada por la SEC en Chile arranca desde $159.000 en casas (con
              materiales, mano de obra y certificado TE6) y desde $369.000 en edificios. Con un
              Wallbox de 7 kW, el BYD Dolphin carga de 10% a 90% en aproximadamente 6 horas, el
              Atto 3 en 7 horas y el Seal en 9 horas. Enérgica City instala cargadores certificados
              para BYD en la Región Metropolitana y Valparaíso.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Compatibilidad por modelo BYD
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
                  gridTemplateColumns: '1.8fr 1fr 1fr 1.2fr 1.4fr',
                  background: DARK,
                  color: '#fff',
                  px: 2,
                  py: 1.5,
                }}
              >
                {[
                  'Modelo',
                  'Batería (kWh)',
                  'Carga AC máx.',
                  'Wallbox 7kW (10–90%)',
                  'Portátil 2,2kW (~10–90%)',
                ].map((h) => (
                  <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                    {h}
                  </Typography>
                ))}
              </Box>
              {[
                ['BYD Seal', '75,7', '7 kW', '~9 h', '~28 h'],
                ['BYD Dolphin', '44,9', '7 kW', '~6 h', '~17 h'],
                ['BYD Atto 3', '60,5', '7 kW', '~8 h', '~23 h'],
                ['BYD Han', '85,4', '7 kW', '~11 h', '~33 h'],
                ['BYD Tang EV', '108,8', '7 kW', '~14 h', '~42 h'],
              ].map(([model, kwh, acMax, wallbox, portable], i) => (
                <Box
                  key={model}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1.8fr 1fr 1fr 1.2fr 1.4fr',
                    px: 2,
                    py: 1.5,
                    background: i % 2 === 0 ? GRAY_BG : '#fff',
                    borderTop: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: DARK }}>
                    {model}
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: '#475569' }}>{kwh}</Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: '#475569' }}>{acMax}</Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: '#475569' }}>{wallbox}</Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: '#475569' }}>{portable}</Typography>
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
                lineHeight: '3rem',
              }}
            >
              ¿Wallbox o cargador portátil para tu BYD?
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Wallbox 7 kW: la opción más segura y rápida
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Un Wallbox de 7 kW instalado en forma fija es hasta 3 veces más rápido que el cargador
              portátil de serie. Además, cuenta con circuito dedicado protegido por un interruptor
              diferencial (RCCB) específico para vehículos eléctricos, lo que elimina el riesgo de
              sobrecargar el empalme domiciliario y protege el sistema de gestión de batería (BMS) del
              vehículo. No se requieren extensiones eléctricas, que son una de las principales causas
              de incendio domiciliario en cargas nocturnas. Para los dueños de BYD Seal (batería de
              75,7 kWh), el Wallbox es especialmente recomendado: con el portátil la carga completa
              de 10% a 90% tomaría 28 horas, lo que hace imposible la recuperación de autonomía
              durante la noche.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Cargador portátil: válido como complemento
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El cargador portátil incluido en algunos modelos BYD entrega 2,2 kW desde un enchufe
              estándar de 220 V. Es útil como solución de emergencia cuando no hay acceso a un
              Wallbox —por ejemplo, en viajes o en casa de familiares—, pero no es adecuado como
              única solución de carga domiciliaria. Para el BYD Dolphin, la carga de 10% a 90%
              tomaría 17 horas; para el Seal, 28 horas. Enérgica City también comercializa cargadores
              portátiles de mayor potencia (como el Workersbee 3,7 kW) que reducen esos tiempos a la
              mitad, siendo una alternativa razonable en edificios donde aún no existe instalación
              fija.
            </Typography>

            {/* Section 3 */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 2,
                mt: 6,
                lineHeight: '3rem',
              }}
            >
              ¿Tienes tu BYD en un edificio? Tres soluciones según tu situación
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              Muchos compradores de BYD en Chile viven en departamentos. Esto crea el desafío de
              cargar en casa sin una instalación eléctrica dedicada. Enérgica tiene tres soluciones
              según el tipo de edificio y la situación del propietario:
            </Typography>

            {[
              {
                n: '01',
                title: 'Electrolinera comunitaria (inversión $0)',
                body:
                  'Enérgica instala y financia un cargador en el estacionamiento de visitas o área común. El propietario paga solo $330 por kWh consumido, sin inversión inicial. No requiere obras en el estacionamiento privado. Solo es necesario el permiso del comité de administración para el área común.',
              },
              {
                n: '02',
                title: 'Visita técnica + kit ($29.000)',
                body:
                  'Un instalador SEC certifica la viabilidad técnica de tu estacionamiento privado, entrega un presupuesto definitivo en 48 horas, elabora la carta de autorización para la administración del edificio y prepara el memo técnico para la asamblea. El pago de $29.000 se descuenta del precio final de la instalación.',
              },
              {
                n: '03',
                title: 'Instalación dedicada ($369.000+)',
                body:
                  'Instalación privada fija en el estacionamiento personal del propietario. Incluye certificado SEC completo, breaker dedicado y Wallbox Tipo 2. Requiere aprobación formal del edificio. Es la solución más rápida y cómoda para cargar cada noche.',
              },
            ].map((step) => (
              <Box
                key={step.n}
                sx={{
                  display: 'flex',
                  gap: 3,
                  mb: 4,
                  p: 3,
                  background: GRAY_BG,
                  borderRadius: 2,
                  borderLeft: `4px solid ${TEAL}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: TEAL,
                    minWidth: 44,
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
                lineHeight: '3rem',
              }}
            >
              ¿Cómo accede un taxista con BYD al programa Mi Taxi Eléctrico?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El BYD Dolphin es uno de los modelos más populares dentro del programa{' '}
              <em>Mi Taxi Eléctrico</em> del <a href="https://energia.gob.cl/" target="_blank" rel="noopener noreferrer">Ministerio de Energía de Chile</a>, que otorga subsidios
              para la adquisición de vehículos eléctricos de uso comercial. El programa contempla
              también un subsidio para la instalación del cargador domiciliario. Enérgica City está
              autorizada para procesar este subsidio directamente: el propietario aporta solo la
              diferencia entre el monto subsidiado y el precio de instalación. Si tienes un BYD
              Dolphin adquirido a través del programa, contáctanos para verificar si calificas y
              agilizar el trámite.
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
                lineHeight: '3rem',
              }}
            >
              Preguntas frecuentes sobre cargadores para BYD en Chile
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
        <AuthorByline dateModified="2026-07-07" />

        {/* Dark CTA band */}
        <Box sx={{ background: DARK, pt: { xs: 8, md: 10 }, pb: { xs: 6, md: 8 }, mb: -5 }}>
          <Container maxWidth="md">
            <Typography
              sx={{
                fontSize: { xs: '1.7rem', md: '2.4rem' },
                fontWeight: 800,
                lineHeight: '3rem',
                color: '#fff',
                textAlign: 'center',
                mb: 2,
              }}
            >
              ¿Tienes un BYD? Cotiza tu cargador en minutos
            </Typography>
            <Typography
              sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: 5, fontSize: '1.05rem' }}
            >
              Rango referencial de instalación dedicada:{' '}
              <strong style={{ color: '#fff' }}>$1.350.000 – $3.110.000</strong>. El precio
              definitivo se confirma con visita técnica. Para casas, cotiza en{' '}
              <a href="/cotizador" style={{ color: '#4dbfd9' }}>energica.city/cotizador</a>.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/cotizador" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    px: 4,
                    py: 1.75,
                    borderRadius: 0,
                    background: TEAL,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { background: TEAL_DARK },
                    cursor: 'pointer',
                  }}
                >
                  Cotizar mi cargador BYD
                </Box>
              </Link>
              <Link href="/cotizador" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    px: 4,
                    py: 1.75,
                    borderRadius: 0,
                    border: `2px solid ${PINK}`,
                    color: PINK,
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { background: PINK, color: '#fff' },
                    cursor: 'pointer',
                  }}
                >
                  Ver opciones para edificio
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

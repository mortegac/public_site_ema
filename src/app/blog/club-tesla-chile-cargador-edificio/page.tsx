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

const SLUG = 'club-tesla-chile-cargador-edificio'

export const metadata: Metadata = {
  title: 'Club Tesla Chile: Cargador en Edificio — Opciones y Precios 2026',
  description:
    'Guía para miembros del Club Tesla Chile que viven en edificios: Wall Connector en departamento, electrolinera comunitaria $0 o instalación privada certificada SEC. Cotiza en minutos.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Club Tesla Chile: Cargador en Edificio — Opciones y Precios 2026',
    description:
      'Guía para miembros del Club Tesla Chile que viven en edificios: Wall Connector en departamento, electrolinera comunitaria $0 o instalación privada certificada SEC. Cotiza en minutos.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tesla Wall Connector instalado en estacionamiento de edificio en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Club Tesla Chile: Cargador en Edificio — Opciones y Precios 2026',
    description:
      'Guía para miembros del Club Tesla Chile que viven en edificios: Wall Connector en departamento, electrolinera comunitaria $0 o instalación privada certificada SEC.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Club Tesla Chile: Instala tu Cargador en Edificio con Técnicos SEC Certificados',
  description:
    'Guía para miembros del Club Tesla Chile que viven en edificios: Wall Connector en departamento, electrolinera comunitaria $0 o instalación privada certificada SEC. Cotiza en minutos.',
  author: {
    '@type': 'Person',
    name: 'Felipe Donoso',
    jobTitle: 'Ingeniero Eléctrico, Enérgica City',
  },
  reviewedBy: {
    '@type': 'Person',
    name: 'Gilberto Escalona',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Enérgica City',
    url: CANONICAL_DOMAIN,
  },
  datePublished: '2026-06-11',
  dateModified: '2026-06-11',
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
      name: '¿El Tesla Wall Connector es compatible con otros autos eléctricos en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, con un adaptador Tipo 2. El Wall Connector Gen 3 de Tesla usa conector propietario, pero incluye un cable de 7,3 metros que termina en conector propietario Tesla. Con el adaptador Tipo 2 (incluido en los Tesla vendidos en Chile o disponible en tiendas de accesorios EV), el Wall Connector puede cargar cualquier vehículo eléctrico compatible con Tipo 2: BYD Seal, Dolphin, Atto 3, Hyundai Ioniq 5, Ioniq 6, Kia EV6, Renault Kwid E-Tech, Volvo XC40 Recharge, entre otros. Esta compatibilidad universal hace del Wall Connector una inversión conveniente para hogares con más de un auto eléctrico, o para comunidades de edificios que buscan un cargador estándar en la electrolinera comunitaria.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta instalar el Tesla Wall Connector en un edificio en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La instalación del Tesla Wall Connector en un edificio en Chile parte desde $159.000 con Enérgica City, incluyendo materiales, mano de obra y certificado TE6. El precio varía según la distancia entre el tablero eléctrico y el punto de instalación en el estacionamiento: con subterráneos profundos (-3, -4) o departamentos en pisos altos, la distancia puede superar los 40 metros y elevar el precio hasta $369.000 o más. Para determinar el costo exacto, Enérgica ofrece una visita técnica por $29.000 (acreditable al presupuesto final) donde un ingeniero SEC certifica la distancia real, el estado del tablero y el tipo de circuito disponible. El cotizador en línea entrega una estimación preliminar en menos de 2 minutos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué documentos necesito para presentar la instalación del Wall Connector a la asamblea del edificio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para instalar el Wall Connector en tu estacionamiento privado necesitas presentar a la asamblea de propietarios una solicitud formal con la propuesta técnica. Enérgica City entrega el kit completo para facilitar este proceso: presentación ejecutiva del proyecto, carta de solicitud de autorización dirigida a la administración, memoria técnica firmada por profesional SEC certificado, y fotografías del recorrido propuesto para el cableado. Algunos edificios también piden cotización formal del contratista. Todo esto está incluido en la visita técnica de $29.000, que además entrega el presupuesto definitivo de la instalación en 48 horas. Para la opción de electrolinera en estacionamiento de visitas, no se requiere asamblea: solo la autorización de la administración.',
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
      name: 'Club Tesla Chile: Cargador en Edificio — Opciones y Precios 2026',
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
      <BlogBreadcrumb title="Club Tesla Chile: Cargador en Edificio — Opciones y Precios 2026" />
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
              {['Club Tesla Chile', 'Wall Connector', 'Edificios'].map((tag) => (
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
              Club Tesla Chile: Instala tu Cargador en Edificio con Técnicos SEC Certificados
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 640,
                lineHeight: 1.7,
              }}
            >
              Millones de propietarios de Tesla viven en departamentos. Enérgica City ofrece tres
              opciones para que cargues tu Model 3, Model Y o cualquier Tesla desde casa, con o sin
              estacionamiento privado.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '11,5 kW', label: 'Wall Connector trifásico (máx.)' },
                { value: '$0', label: 'Electrolinera comunitaria para edificios' },
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

            {/* Section 1 */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}
            >
              ¿Puede un propietario de Tesla en Chile instalar un cargador en su edificio?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Sí. Instalar un cargador Tesla Wall Connector en un edificio residencial en Chile es
              completamente posible, y hay tres caminos distintos según el tipo de aprobación
              disponible, el acceso al estacionamiento y el presupuesto. Todos los modelos Tesla
              comercializados en Chile —Model 3, Model Y, Model S y Model X— usan el conector
              propietario de Tesla, compatible con adaptador Tipo 2 (IEC 62196-2) para carga en
              corriente alterna (CA), el estándar en edificios chilenos. El Wall Connector Gen 3
              entrega hasta 11,5 kW en instalaciones trifásicas (comunes en edificios) y hasta 7,4
              kW en monofásicas. La opción más rápida y sin inversión es la electrolinera comunitaria
              de Enérgica City, que se instala en el estacionamiento de visitas sin costo para la
              comunidad. Los integrantes del Club Tesla Chile con estacionamiento privado asignado
              pueden optar por la instalación dedicada desde $159.000 con certificado TE6 incluido.
            </Typography>

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
              Tesla Wall Connector en edificio: requisitos técnicos
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Instalación trifásica vs. monofásica en edificios
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              La mayoría de los edificios residenciales en Santiago construidos después de 2005
              cuentan con alimentación trifásica en sus salas de medidores comunes. Los
              departamentos individuales, en cambio, suelen tener suministro monofásico. El Wall
              Connector Gen 3 se adapta a ambas configuraciones: entrega 7,4 kW en monofásico y
              hasta 11,5 kW en trifásico. Para una instalación privada en el estacionamiento con
              cableado desde el medidor del departamento (monofásico), se pueden esperar 7,4 kW. Si
              el cableado se realiza desde la sala de medidores del edificio (requiere aprobación de
              la comunidad), puede alcanzarse la configuración trifásica y aprovechar la potencia
              máxima.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Distancia al tablero: el factor crítico en edificios
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              En edificios, el principal desafío técnico es la distancia entre el tablero eléctrico
              y el punto de instalación en el estacionamiento. Los subterráneos profundos (-1, -2,
              -3, -4) incrementan considerablemente el recorrido del cableado. El cotizador de
              Enérgica incluye un selector de piso del estacionamiento respecto al piso del
              departamento, y aplica multiplicadores de distancia: hasta 5 m aplica descuento de
              0,85x, de 10 a 20 m un factor de 1,18x, de 20 a 40 m un factor de 1,35x, y sobre 40
              m un factor de 1,55x. Una visita técnica por $29.000 determina la distancia exacta y
              el precio definitivo antes de comprometerse con la instalación.
            </Typography>

            {/* Section 3 */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 4,
                mt: 6,
              }}
            >
              Las 3 opciones de Enérgica para propietarios de Tesla en edificios
            </Typography>

            {/* Option cards */}
            {[
              {
                number: '01',
                title: 'Electrolinera Comunitaria — $0',
                badge: 'Sin inversión',
                badgeColor: TEAL,
                ideal: 'Propietarios de Tesla cuyo edificio tiene estacionamiento de visitas',
                features: [
                  'Enérgica instala y financia el cargador',
                  'Ubicado en estacionamiento de visitas',
                  'Pagas solo $330/kWh consumido',
                  'Sin obras en tu estacionamiento privado',
                  'No requiere asamblea extraordinaria: solo autorización de espacios comunes',
                  'Compatible con Wall Connector mediante adaptador Tipo 2',
                ],
              },
              {
                number: '02',
                title: 'Visita Técnica + Kit — $29.000',
                badge: 'Más popular',
                badgeColor: PINK,
                ideal:
                  'Propietarios que quieren evaluar la instalación dedicada antes de comprometerse',
                features: [
                  'Visita profesional con ingeniero SEC certificado',
                  'Presupuesto definitivo en 48 horas',
                  'Carta de autorización para administración del edificio',
                  'Memoria técnica para presentar en asamblea',
                  'Fotografías del recorrido propuesto para el cableado',
                  'Monto se acredita al precio de instalación final',
                ],
              },
              {
                number: '03',
                title: 'Instalación Dedicada — rango $1.350.000–$3.110.000',
                badge: 'Instalación completa',
                badgeColor: DARK,
                ideal: 'Propietarios con estacionamiento privado que tienen o pueden obtener aprobación del edificio',
                features: [
                  'Wall Connector Gen 3 instalado en tu estacionamiento',
                  'Circuito dedicado desde tablero al estacionamiento',
                  'Certificación SEC TE6 incluida',
                  '1 año de garantía técnica',
                  'Desde $159.000 (distancia estándar) hasta $369.000+ (subterráneos profundos)',
                ],
              },
            ].map((option) => (
              <Box
                key={option.number}
                sx={{
                  mb: 4,
                  p: 3,
                  background: GRAY_BG,
                  borderRadius: 2,
                  borderLeft: `4px solid ${option.badgeColor}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
                  <Typography
                    sx={{ fontSize: '1.5rem', fontWeight: 800, color: option.badgeColor, minWidth: 40, lineHeight: 1 }}
                  >
                    {option.number}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: DARK, fontSize: '1.1rem', flex: 1 }}>
                    {option.title}
                  </Typography>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.4,
                      borderRadius: '999px',
                      background: option.badgeColor,
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {option.badge}
                  </Box>
                </Box>
                <Typography sx={{ color: TEXT_MUTED, fontSize: '0.88rem', mb: 2, fontStyle: 'italic' }}>
                  Ideal para: {option.ideal}
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {option.features.map((feat) => (
                    <Box
                      component="li"
                      key={feat}
                      sx={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, mb: 0.5 }}
                    >
                      {feat}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}

            {/* Section 4: Compatibility table */}
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
              Tiempos de carga Tesla con Wallbox 7 kW en edificio
            </Typography>

            <Box
              sx={{
                border: `1px solid #E2E8F0`,
                borderRadius: 2,
                overflow: 'hidden',
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.2fr 1.5fr 1.5fr',
                  background: DARK,
                  color: '#fff',
                  px: 2,
                  py: 1.5,
                }}
              >
                {['Modelo Tesla', 'Batería (kWh)', 'Mono 7,4 kW (10–90%)', 'Trifásico 11,5 kW (10–90%)'].map(
                  (h) => (
                    <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                      {h}
                    </Typography>
                  )
                )}
              </Box>
              {[
                ['Model 3 RWD (2024)', '57,5', '~7 h', 'N/A (mono)'],
                ['Model 3 Long Range', '82', '~10 h', '~6,5 h'],
                ['Model Y Long Range', '82', '~10 h', '~6,5 h'],
                ['Model S Long Range', '100', '~12 h', '~8 h'],
                ['Model X Long Range', '100', '~12 h', '~8 h'],
              ].map(([model, kwh, mono, tri], i) => (
                <Box
                  key={model}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.2fr 1.5fr 1.5fr',
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
                  <Typography sx={{ fontSize: '0.88rem', color: '#475569' }}>{mono}</Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: '#475569' }}>{tri}</Typography>
                </Box>
              ))}
            </Box>

            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Para quienes recorren entre 50 y 120 km diarios (habitual en Santiago), el Wall
              Connector en monofásico es más que suficiente para reponer la autonomía usada cada
              noche. El Model 3 consume aproximadamente 14 kWh/100 km; 100 km diarios requieren 14
              kWh, que se recuperan en menos de 2 horas con 7,4 kW.
            </Typography>

            {/* Section 5 */}
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
              ¿Por qué el Club Tesla Chile recomienda instalación certificada?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El Club Tesla Chile —la principal comunidad de propietarios de Tesla en Chile, activa
              en redes sociales y grupos de WhatsApp— enfatiza sistemáticamente la instalación
              certificada por dos razones fundamentales: (1) validez del seguro: una instalación
              sin certificación puede anular la cobertura del seguro de hogar para incidentes
              eléctricos; (2) garantía del cargador y la batería: el servicio de garantía de Tesla
              exige una instalación eléctrica correcta y documentada. Las instalaciones de Enérgica
              City incluyen certificación SEC completa (TE6) y cumplen con la NCh Elec. 4/2003.
              Numerosos miembros del Club Tesla Chile en Santiago han utilizado Enérgica para
              instalaciones en condominios de Providencia, Las Condes y Vitacura.
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
              Preguntas frecuentes — Club Tesla Chile en edificios
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
              ¿Eres del Club Tesla Chile y vives en edificio?
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 5,
                fontSize: '1.05rem',
              }}
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
                    background: TEAL,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { background: TEAL_DARK },
                    cursor: 'pointer',
                  }}
                >
                  Cotizar Wall Connector
                </Box>
              </Link>
              <Link href="/cotizador" style={{ textDecoration: 'none' }}>
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
                  Postular a electrolinera $0
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

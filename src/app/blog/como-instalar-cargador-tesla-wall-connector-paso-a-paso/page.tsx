import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import { CANONICAL_DOMAIN } from '@/utils/seo-config'

const DARK = '#0F172A'
const TEAL = '#0898b9'
const TEAL_DARK = '#0777a0'
const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'

const SLUG = 'como-instalar-cargador-tesla-wall-connector-paso-a-paso'

export const metadata: Metadata = {
  title: 'Tesla Wall Connector Gen 3: Instalación paso a paso en Chile',
  description:
    'Instala el Tesla Wall Connector Gen 3 en Chile. Compatibilidad con red monofásica y trifásica. Profesionales SEC certificados. Precio desde $279.000 instalación incluida.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Tesla Wall Connector Gen 3: Instalación paso a paso en Chile',
    description:
      'Instala el Tesla Wall Connector Gen 3 en Chile. Compatibilidad con red monofásica y trifásica. Profesionales SEC certificados. Precio desde $279.000.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Tesla Wall Connector instalado en garage domiciliario en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tesla Wall Connector Gen 3: Instalación en Chile',
    description:
      'Todo lo que necesitas saber para instalar el Tesla Wall Connector Gen 3 en tu casa o departamento en Chile.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Tesla Wall Connector Gen 3: Instalación Paso a Paso en Chile',
  description:
    'Guía completa para instalar el Tesla Wall Connector Gen 3 en Chile: requisitos eléctricos, certificación TE6, compatibilidad con modelos Tesla y precios actualizados.',
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
  datePublished: '2025-05-01',
  dateModified: '2025-05-01',
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
      name: '¿El Tesla Wall Connector funciona en Chile con red monofásica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Sí. El Tesla Wall Connector Gen 3 es compatible con redes monofásicas de 220 V y trifásicas de 380 V. En instalaciones monofásicas residenciales típicas de Chile entrega hasta 7,4 kW, lo que permite cargar un Model 3 Standard Range completamente en aproximadamente 6 horas. En redes trifásicas, como las disponibles en edificios o industrias, alcanza hasta 11,5 kW, reduciendo el tiempo de carga a unas 4 horas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué es obligatoria la certificación TE6 para instalar el Tesla Wall Connector?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'La declaración TE6 ante la Superintendencia de Electricidad y Combustibles (SEC) es exigida por la ley chilena para toda instalación eléctrica en baja tensión, incluyendo cargadores de vehículos eléctricos. Sin ella, el seguro de hogar puede quedar sin cobertura y el propietario puede ser multado. Solo instaladores eléctricos con licencia SEC vigente pueden presentar el formulario TE6. Enérgica City gestiona el trámite completo, sin costo adicional, dentro de los plazos legales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta instalar el Tesla Wall Connector en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'El precio de instalación del Tesla Wall Connector en Chile parte desde $279.000 con Enérgica City, incluyendo mano de obra, materiales estándar (ductos, breaker dedicado 50A, cable calibre 6 AWG), certificación TE6 y un año de garantía técnica. El valor puede aumentar según la distancia entre el tablero eléctrico y el punto de instalación, y si se requiere upgrade del empalme.',
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
      name: 'Tesla Wall Connector Gen 3: Instalación paso a paso en Chile',
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
            background: `linear-gradient(135deg, ${DARK} 0%, #1E3A5F 100%)`,
            color: '#fff',
            py: { xs: 8, md: 12 },
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {['Tesla Wall Connector', 'Instalación Chile', 'Certificación SEC'].map((tag) => (
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
              Tesla Wall Connector Gen 3: Instalación Paso a Paso en Chile
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 640,
                lineHeight: 1.7,
              }}
            >
              El Wall Connector de Tesla entrega 11,5 kW y recarga tu vehículo hasta 5 veces más
              rápido que un enchufe normal. Aquí te explicamos todo el proceso de instalación
              certificada en Chile.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '11,5 kW', label: 'Potencia máxima (trifásica)' },
                { value: '~4 h', label: 'Carga completa Model 3 LR' },
                { value: '$279.000', label: 'Instalación desde (incluye TE6)' },
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
              ¿Qué es el Tesla Wall Connector Gen 3?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El Tesla Wall Connector de tercera generación es el cargador domiciliario oficial de
              Tesla, diseñado para montaje en pared y conexión directa al tablero eléctrico del
              hogar o edificio. A diferencia del Mobile Connector que se conecta a enchufes
              convencionales, el Wall Connector es una instalación fija que aprovecha al máximo la
              capacidad del sistema eléctrico disponible.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              En Chile, todos los modelos Tesla —Model 3, Model Y, Model S y Model X— son
              compatibles con el Wall Connector. Dado que el estándar de carga AC en Chile es el
              conector Tipo 2 (IEC 62196), Tesla entrega un adaptador Tipo 2 homologado por el
              Ministerio de Transportes y Telecomunicaciones (MTT), que permite la conexión entre el
              cable nativo CCS/Tipo 2 del vehículo y el conector propietario del Wall Connector.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Especificaciones técnicas clave
            </Typography>
            <Box
              sx={{
                border: `1px solid #E2E8F0`,
                borderRadius: 2,
                overflow: 'hidden',
                mb: 4,
              }}
            >
              {[
                ['Potencia monofásica (220 V)', '7,4 kW'],
                ['Potencia trifásica (380 V)', '11,5 kW'],
                ['Corriente máxima', '48 A'],
                ['Tipo de conector', 'Propietario Tesla (adaptador Tipo 2 incluido)'],
                ['Longitud del cable', '7,3 m'],
                ['Conectividad', 'Wi-Fi (app Tesla)'],
                ['Certificaciones', 'UL, CE, CB, RoHS'],
                ['Función de load balancing', 'Sí, dinámico vía app'],
              ].map(([key, val], i) => (
                <Box
                  key={key}
                  sx={{
                    display: 'flex',
                    px: 2,
                    py: 1.5,
                    background: i % 2 === 0 ? GRAY_BG : '#fff',
                    borderBottom: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ flex: 1, fontWeight: 600, fontSize: '0.9rem', color: DARK }}>
                    {key}
                  </Typography>
                  <Typography sx={{ flex: 1, fontSize: '0.9rem', color: '#475569' }}>{val}</Typography>
                </Box>
              ))}
            </Box>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2 }}
            >
              Enchufe normal vs. Wall Connector: la diferencia real
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Un enchufe schuko de 220 V con el Mobile Connector entrega solo 2,4 kW, lo que
              significa aproximadamente 13-15 horas para cargar un Model 3 de batería mediana de
              cero a 100 %. Con el Wall Connector en instalación monofásica obtienes 7,4 kW (carga
              completa en ~6 h), y en trifásica 11,5 kW (carga completa en ~4 h). Si llegas a casa
              cada tarde con el 20 % de batería y partes al día siguiente con el 80 %, el Wall
              Connector completa esa carga en menos de 2 horas. El enchufe normal tardaría más de 5
              horas.
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
              Requisitos eléctricos antes de instalar
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Antes de agendar la instalación, un instalador SEC certificado debe evaluar tu
              instalación eléctrica actual. Los tres factores críticos son la capacidad del
              empalme, el estado del tablero eléctrico y la distancia física entre el tablero y el
              punto de instalación del cargador.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Capacidad del empalme y del tablero
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El Wall Connector en monofásico requiere un breaker dedicado de 50 A (para corriente
              máxima de 40 A según NEC 80 % rule) en el tablero domiciliario. La mayoría de las
              viviendas chilenas construidas después de 2010 con empalme de 10 kVA o más tienen
              capacidad suficiente. Si el empalme es de 6 kVA monofásico, deberás solicitar un
              upgrade de empalme a la distribuidora eléctrica (Enel, CGE, Chilquinta, etc.) antes
              de la instalación; ese trámite toma entre 2 y 4 semanas adicionales.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              En instalaciones trifásicas, comunes en edificios residenciales y comerciales, el
              Wall Connector puede aprovechar los 11,5 kW completos si el tablero tiene espacio
              para un breaker trifásico de 20 A por fase. El instalador revisará la carga
              instalada actual para evitar sobrecargas que disparen el interruptor diferencial
              general.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Cableado y conduit según NCh Elec. 4/2003
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              La norma chilena NCh Elec. 4/2003 exige que todo circuito dedicado para carga de
              vehículos eléctricos use cable de cobre de calibre mínimo 6 AWG (16 mm²) para 50 A,
              instalado en ducto conduit metálico o PVC de 25 mm como mínimo. El trayecto debe
              respetar las distancias de seguridad respecto a tuberías de gas y agua. Si la
              distancia entre el tablero y el garage supera los 15 m, podría ser necesario un
              calibre mayor (4 AWG) para minimizar la caída de tensión.
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
              }}
            >
              Proceso de instalación paso a paso
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              La instalación del Tesla Wall Connector en Chile sigue un proceso estándar de 6 pasos
              que un equipo de Enérgica City completa en un día hábil, incluyendo la presentación
              del formulario TE6 ante la SEC.
            </Typography>

            {[
              {
                n: '01',
                title: 'Visita técnica de evaluación',
                body:
                  'Un ingeniero eléctrico certifica la capacidad del empalme, el estado del tablero, las distancias y el punto de montaje óptimo. Se entrega un presupuesto detallado con todos los materiales necesarios.',
              },
              {
                n: '02',
                title: 'Instalación del circuito dedicado',
                body:
                  'Se instala un breaker RCCB 50 A dedicado en el tablero, se tiende el cableado 6 AWG en conduit desde el tablero hasta el punto de montaje, respetando la NCh Elec. 4/2003.',
              },
              {
                n: '03',
                title: 'Montaje del Wall Connector',
                body:
                  'El dispositivo se fija a la pared con el soporte incluido en la caja. Se conectan los conductores de fase, neutro y tierra. El instalador verifica que las medidas de tensión estén dentro del rango correcto (220 V ±5%).',
              },
              {
                n: '04',
                title: 'Configuración Wi-Fi y load balancing',
                body:
                  'Se conecta el Wall Connector a la red Wi-Fi del hogar mediante la app Tesla. Si se instalan dos o más Wall Connectors en la misma vivienda, se configura el load balancing dinámico para que ambos compartan el circuito sin superarlo.',
              },
              {
                n: '05',
                title: 'Prueba de carga y verificación',
                body:
                  'Se conecta el vehículo Tesla y se verifica que la carga inicie correctamente, que el amperaje sea el esperado y que la app Tesla refleje el estado en tiempo real.',
              },
              {
                n: '06',
                title: 'Certificación TE6 ante la SEC',
                body:
                  'El instalador SEC certificado completa y presenta la Declaración de Instalación Eléctrica (formulario TE6) ante la Superintendencia de Electricidad y Combustibles. Este trámite se incluye sin costo adicional y demora entre 5 y 7 días hábiles.',
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
              }}
            >
              Compatibilidad con modelos Tesla en Chile
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Todos los modelos Tesla disponibles en Chile son compatibles con el Wall Connector
              Gen 3 a través del adaptador Tipo 2 homologado por el MTT. La tabla siguiente muestra
              los tiempos de carga estimados según modelo y configuración de red:
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
                  gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr',
                  background: DARK,
                  color: '#fff',
                  px: 2,
                  py: 1.5,
                }}
              >
                {['Modelo', 'Batería (kWh)', 'Monofásico (7,4 kW)', 'Trifásico (11,5 kW)'].map(
                  (h) => (
                    <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                      {h}
                    </Typography>
                  )
                )}
              </Box>
              {[
                ['Model 3 Standard Range', '57,5', '~8 h', 'N/A (monofásico)'],
                ['Model 3 Long Range', '82', '~11 h', '~7 h'],
                ['Model Y Long Range', '82', '~11 h', '~7 h'],
                ['Model S Long Range', '100', '~14 h', '~9 h'],
                ['Model X Long Range', '100', '~14 h', '~9 h'],
              ].map(([model, kwh, mono, tri], i) => (
                <Box
                  key={model}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr',
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
              Los tiempos indican carga de 10 % a 90 %, que es el rango recomendado por Tesla para
              uso diario. La carga completa (0–100 %) tarda un 20–25 % más. Para quienes recorren
              entre 50 y 100 km diarios, el Wall Connector en monofásico es más que suficiente: 50
              km equivalen a aproximadamente 12,5 kWh, lo que se recupera en menos de 2 horas con
              7,4 kW.
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
              Preguntas frecuentes sobre el Tesla Wall Connector en Chile
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
              ¿Listo para instalar tu Tesla Wall Connector?
            </Typography>
            <Typography
              sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: 5, fontSize: '1.05rem' }}
            >
              Instalación certificada SEC desde $279.000. Certificado TE6 incluido.
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

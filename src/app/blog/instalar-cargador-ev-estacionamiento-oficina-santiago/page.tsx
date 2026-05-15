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

const SLUG = 'instalar-cargador-ev-estacionamiento-oficina-santiago'

export const metadata: Metadata = {
  title: 'Puntos de carga en oficinas: Guía para empresas en Santiago',
  description:
    'Electrifica el estacionamiento de tu empresa en Santiago. Beneficios tributarios, carga para empleados y flotas. Proyectos llave en mano en Providencia y Las Condes.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Puntos de carga en oficinas: Guía para empresas en Santiago',
    description:
      'Instala cargadores EV en el estacionamiento de tu empresa. ROI en 6-18 meses, beneficios tributarios y gestión OCPP para cobro por empleado.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cargadores eléctricos en estacionamiento corporativo Santiago Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puntos de carga EV en oficinas corporativas — Santiago',
    description:
      'Guía completa para instalar cargadores EV en edificios de oficinas en Santiago: costos, beneficios tributarios y ROI.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Puntos de Carga en Oficinas: Guía para Empresas en Santiago',
  description:
    'Guía completa para empresas en Santiago que quieren instalar puntos de carga para vehículos eléctricos en sus estacionamientos. Incluye análisis de ROI, beneficios tributarios y gestión OCPP.',
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
  datePublished: '2025-05-08',
  dateModified: '2025-05-08',
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
      name: '¿Cuánto cuesta instalar cargadores EV en el estacionamiento de una empresa en Santiago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'El costo de instalación de puntos de carga corporativos en Santiago varía según la cantidad de puntos, la potencia disponible en el edificio y la distancia de los tableros. Un proyecto estándar de 4 puntos de carga de 7,4 kW con gestión OCPP parte desde $1.800.000 instalado por Enérgica City, incluyendo cableado, protecciones, montaje, configuración del software de gestión y certificación TE6 ante la SEC. Proyectos de mayor escala (10 o más puntos) tienen economías de escala que reducen el costo unitario entre un 20 y un 30 %.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pueden las empresas descontar tributariamente la instalación de cargadores EV en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Sí. En Chile, la infraestructura de carga para vehículos eléctricos instalada por una empresa puede acogerse a depreciación instantánea en el año de adquisición, según la Ley 21.210 de Modernización Tributaria que amplió los bienes sujetos a este beneficio. Esto significa que el 100 % del costo de los equipos y la instalación puede deducirse como gasto en el año tributario en que se realiza la inversión, reduciendo significativamente la base imponible del impuesto de primera categoría.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se cobra la carga a los empleados en un edificio de oficinas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Con cargadores que soportan el protocolo OCPP, la plataforma de gestión EVE de Enérgica City permite asignar credenciales (tarjeta RFID o app) a cada empleado y registrar el consumo individual en tiempo real. Al final del mes, el sistema genera un informe de consumo por usuario que puede integrarse al sistema de gastos comunes del edificio o descontarse directamente del sueldo con el consentimiento del empleado. También es posible que la empresa subsidie parcial o totalmente el costo de la carga como beneficio.',
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
      name: 'Puntos de carga en oficinas: Guía para empresas en Santiago',
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
            background: `linear-gradient(135deg, #0F172A 0%, #1a2b4a 100%)`,
            color: '#fff',
            py: { xs: 8, md: 12 },
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {['Empresas', 'Las Condes', 'Providencia', 'OCPP'].map((tag) => (
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
              Puntos de Carga en Oficinas: Guía para Empresas en Santiago
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 660,
                lineHeight: 1.7,
              }}
            >
              El 60 % de los profesionales con vehículo eléctrico eligen empleador según la
              disponibilidad de carga en la oficina. Proyectos llave en mano en Providencia y Las
              Condes con ROI en 6 a 18 meses.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '6–18', label: 'Meses de payback típico' },
                { value: '100%', label: 'Depreciación tributaria año 1' },
                { value: '20 puertos', label: 'Caso de estudio — Las Condes' },
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
              ¿Por qué las empresas en Santiago están instalando cargadores EV?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Las empresas con sede en Providencia, Las Condes, Vitacura y el sector norte de
              Santiago están adoptando la infraestructura de carga eléctrica por tres razones
              concretas: retención de talento, obligaciones ESG y preparación para la flota. En
              Chile, el parque de vehículos eléctricos creció un 68 % en 2024 respecto al año
              anterior, y más del 40 % de los propietarios de EV son profesionales con altos
              ingresos que trabajan en zonas corporativas del sector oriente de Santiago.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Ofrecer carga gratuita o subsidiada en el estacionamiento es hoy un beneficio laboral
              de alto impacto a costo relativamente bajo. Un empleado que carga 10 kWh diarios en
              la oficina ahorra aproximadamente $47.000 mensuales en electricidad (a tarifa
              residencial de $160/kWh). Para la empresa, ese mismo consumo en tarifa industrial
              (~$100/kWh) cuesta solo $30.000 al mes por empleado, generando un diferencial de
              ahorro que el trabajador percibe como beneficio real y cuantificable.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Beneficio tributario: depreciación instantánea
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              La Ley 21.210 de Modernización Tributaria (2020) introdujo la depreciación instantánea
              para bienes del activo fijo nuevos, permitiendo que el 100 % del costo de adquisición
              e instalación se descuente como gasto en el ejercicio tributario correspondiente. Los
              cargadores de vehículos eléctricos y la infraestructura de alimentación eléctrica
              asociada (tableros, cableado, ductos) califican como activo fijo bajo el número de
              cuenta contable 151 (Maquinaria y Equipo).
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Para una empresa con tasa de impuesto de primera categoría del 27 %, una inversión de
              $10.000.000 en cargadores genera un ahorro tributario inmediato de $2.700.000, lo que
              reduce el costo real neto de la inversión a $7.300.000. Este beneficio es adicional al
              IVA crédito fiscal que las empresas con giro comercial pueden recuperar sobre la
              compra de los equipos.
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
              Caso de estudio: 20 puertos en edificio de oficinas en Las Condes
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              En 2024, Enérgica City completó la instalación de 20 puntos de carga de 7,4 kW con
              gestión OCPP en un edificio corporativo de 12 pisos ubicado en el corredor Apoquindo,
              Las Condes. El proyecto incluyó un upgrade del tablero de distribución del
              subterráneo, instalación de un sistema de load balancing dinámico para 20 vehículos
              simultáneos con un suministro máximo de 80 kW, y la integración con el sistema de
              gastos comunes del edificio para cobro automático por uso.
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
                  px: 2,
                  py: 1.5,
                  background: DARK,
                  color: '#fff',
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  Resumen del proyecto — Las Condes (2024)
                </Typography>
              </Box>
              {[
                ['Cantidad de puntos', '20 (cargadores 7,4 kW monofásicos)'],
                ['Potencia total instalada', '80 kW (load balancing dinámico)'],
                ['Costo total del proyecto', '$18.500.000 (instalado)'],
                ['Ahorro tributario año 1', '$4.995.000 (27 % depreciación instantánea)'],
                ['Costo neto real', '$13.505.000'],
                ['Ingresos anuales por cobro de uso', '$3.200.000 (~$160.000 por punto/año)'],
                ['Payback estimado', '~4,2 años (sin beneficio tributario: 5,8 años)'],
                ['Emisiones CO2 evitadas/año', '~12 t CO2 eq. (vs. gasolina)'],
              ].map(([key, val], i) => (
                <Box
                  key={key}
                  sx={{
                    display: 'flex',
                    px: 2,
                    py: 1.5,
                    background: i % 2 === 0 ? GRAY_BG : '#fff',
                    borderTop: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ flex: 1, fontWeight: 600, fontSize: '0.88rem', color: DARK }}>
                    {key}
                  </Typography>
                  <Typography sx={{ flex: 1, fontSize: '0.88rem', color: '#475569' }}>
                    {val}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Gestión OCPP: cobro individual y reportes de flota
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El protocolo OCPP (Open Charge Point Protocol) permite que cada punto de carga se
              comunique con la plataforma de gestión EVE de Enérgica City. Cada usuario se
              identifica con una tarjeta RFID o a través de la app, y el sistema registra
              automáticamente la energía consumida, el costo según tarifa configurada y el tiempo
              de ocupación del punto. Los administradores del edificio acceden a un dashboard en
              tiempo real con todos los datos de uso, y al cierre de mes el sistema genera el
              informe de cobro por empresa o por individuo.
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
              Requisitos para instalar en edificios corporativos
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              A diferencia de las instalaciones residenciales, los proyectos en edificios
              corporativos y de oficinas requieren coordinar con la administración del edificio,
              la distribuidora eléctrica y, en algunos casos, la Dirección de Obras de la
              municipalidad correspondiente (Santiago, Providencia, Las Condes, Vitacura).
            </Typography>

            {[
              {
                title: 'Informe de capacidad eléctrica del edificio',
                desc:
                  'La administración debe solicitar a la distribuidora (Enel, CGE) el certificado de capacidad del empalme actual y el margen disponible para cargas adicionales. En edificios con empalmes trifásicos de alta tensión, este trámite tarda entre 10 y 15 días hábiles.',
              },
              {
                title: 'Autorización de la comunidad o directorio',
                desc:
                  'En edificios de uso mixto o con copropiedad, la instalación de infraestructura de uso común (cargadores en estacionamientos compartidos) requiere aprobación en asamblea de copropietarios con quórum simple (más del 50 %). Enérgica City provee presentaciones técnicas para facilitar el proceso de aprobación.',
              },
              {
                title: 'Permiso de obras menores',
                desc:
                  'Si el proyecto requiere perforaciones en muros o losas para el trayecto de conduits, algunas comunas del sector oriente de Santiago exigen un permiso de obras menores. Enérgica City gestiona este trámite directamente con la dirección de obras municipal.',
              },
              {
                title: 'Certificación TE6 para cada circuito',
                desc:
                  'Cada tablero de distribución modificado requiere su propio formulario TE6 ante la SEC. En un proyecto de 20 puntos típicamente se presentan entre 2 y 4 formularios TE6, dependiendo de la distribución de los circuitos. Todos están incluidos en el precio del proyecto.',
              },
            ].map((item) => (
              <Box
                key={item.title}
                sx={{
                  p: 3,
                  background: GRAY_BG,
                  borderRadius: 2,
                  mb: 2.5,
                  borderLeft: `4px solid ${TEAL}`,
                }}
              >
                <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>{item.title}</Typography>
                <Typography sx={{ color: '#475569', fontSize: '0.93rem', lineHeight: 1.7 }}>
                  {item.desc}
                </Typography>
              </Box>
            ))}

            {/* Section 4: ROI */}
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
              Cálculo de ROI para proyectos corporativos
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              El retorno sobre la inversión (ROI) de un proyecto de cargadores corporativos
              depende de tres fuentes de valor: los ingresos por cobro de uso a empleados o
              arrendatarios, el ahorro tributario por depreciación instantánea y el aumento del
              valor del inmueble. La valorización de activos en edificios con infraestructura de
              carga EV es un fenómeno documentado en mercados maduros y comenzó a observarse en el
              mercado inmobiliario corporativo chileno desde 2023.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Para un proyecto de 10 cargadores de 7,4 kW con uso promedio de 2 horas diarias por
              punto a $150/kWh, los ingresos anuales alcanzan aproximadamente $1.643.000
              (10 puntos × 2 h × 7,4 kWh × $150 × 250 días hábiles). Con una inversión total de
              $9.000.000 y el ahorro tributario del año 1 de $2.430.000, el costo neto real
              es $6.570.000, lo que implica un payback de aproximadamente 4 años. Si se incluye la
              valorización del inmueble, muchos proyectos recuperan la inversión en 18 a 24 meses.
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
              Preguntas frecuentes — Cargadores EV para empresas
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
              Proyectos corporativos llave en mano en Santiago
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 5,
                fontSize: '1.05rem',
              }}
            >
              Desde 4 hasta 100+ puntos de carga. Gestión OCPP, certificación SEC y soporte
              post-instalación incluidos.
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
                  Solicitar propuesta corporativa
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

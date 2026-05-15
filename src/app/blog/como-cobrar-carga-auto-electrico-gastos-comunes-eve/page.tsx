import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

const DARK = '#0F172A'
const TEAL = '#0898b9'
const TEAL_DARK = '#0777a0'
const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'
const CANONICAL_DOMAIN = 'https://www.energica.city'

const SLUG = 'como-cobrar-carga-auto-electrico-gastos-comunes-eve'

export const metadata: Metadata = {
  title: 'Cómo cobrar la carga EV a través de los gastos comunes',
  description:
    'Gestión transparente del consumo EV en edificios con plataforma EVE de Enérgica City. Cobro automático por gastos comunes, balanceo de carga y app móvil.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Cómo cobrar la carga EV a través de los gastos comunes',
    description:
      'La plataforma EVE de Enérgica City resuelve el problema de la medición y cobro del consumo eléctrico por carga de autos en edificios. Sin medidores individuales, sin facturas separadas.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Plataforma EVE de Enérgica City para gestión de carga EV en edificios',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cómo cobrar la carga EV a través de los gastos comunes',
    description:
      'EVE by Enérgica City: cobro automático del consumo EV vía gastos comunes. Desplegado en 15+ edificios en Santiago.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Cómo Cobrar la Carga EV a Través de los Gastos Comunes',
  description:
    'La plataforma EVE de Enérgica City permite a los edificios gestionar el consumo eléctrico por carga de autos eléctricos y cobrarlo automáticamente vía gastos comunes, sin medidores individuales.',
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
      name: '¿Necesito instalar un medidor eléctrico separado para cargar mi auto en el edificio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. La plataforma EVE de Enérgica City utiliza el medidor de energía integrado en cada cargador OCPP para registrar el consumo exacto por sesión de carga. Este dato se envía a la nube y se consolida en el estado de cuenta mensual del residente. No necesitas un medidor eléctrico independiente ni una acometida separada desde el medidor de tu departamento.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo garantiza EVE que los residentes paguen exactamente lo que consumen y no más?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada cargador compatible con el protocolo OCPP registra el consumo en kWh con precisión de clase de medida B (±1%). El sistema EVE calcula el monto a cobrar multiplicando los kWh de cada sesión por la tarifa eléctrica vigente. El administrador del edificio accede a un reporte mensual con el detalle por departamento y por sesión, que puede adjuntar al estado de cuenta. El residente recibe el desglose en su app móvil en tiempo real.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta implementar la plataforma EVE en un edificio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enérgica City financia la infraestructura de carga sin costo inicial para el edificio bajo el modelo de servicio mensual EVE. El edificio no paga nada por la instalación de los cargadores ni por la plataforma. En cambio, Enérgica City cobra una tarifa de servicio por cargador activo al mes, que se incluye como ítem en el estado de cuenta de gastos comunes. Los residentes que usen los cargadores pagan por su consumo más una fracción de la tarifa de servicio proporcional a su uso.',
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
      name: 'Cómo Cobrar la Carga EV a Través de los Gastos Comunes',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const eveSteps = [
  {
    numero: '01',
    titulo: 'Descarga la app EVE',
    descripcion: 'El residente descarga la app EVE, crea su cuenta con el número de departamento y vincula su método de pago preferido.',
  },
  {
    numero: '02',
    titulo: 'Conecta el vehículo',
    descripcion: 'El residente enchufa el cable Tipo 2 en el cargador de su estacionamiento. La app detecta automáticamente el cargador y solicita autorización.',
  },
  {
    numero: '03',
    titulo: 'Sesión registrada en la nube',
    descripcion: 'El cargador OCPP envía datos de consumo (kWh, duración, hora de inicio y fin) al servidor EVE en tiempo real.',
  },
  {
    numero: '04',
    titulo: 'Reporte mensual al administrador',
    descripcion: 'A fin de mes, el administrador recibe un reporte consolidado con el consumo de cada departamento para incluirlo en el estado de cuenta.',
  },
  {
    numero: '05',
    titulo: 'Cobro via gastos comunes',
    descripcion: 'El consumo eléctrico por carga EV aparece como una línea adicional en el estado de cuenta de gastos comunes, igual que el agua o el gas.',
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
            background: 'linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)',
            color: '#fff',
            py: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '1.875rem', md: '2.75rem' },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.2,
                color: '#000000',
              }}
            >
              Cómo Cobrar la Carga EV a Través de los Gastos Comunes
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                color: '#000000',
                mb: 5,
                maxWidth: 560,
                mx: 'auto',
              }}
            >
              El mayor obstáculo para instalar cargadores en edificios no es la electricidad:
              es el cobro. La plataforma EVE de Enérgica City lo resuelve con cero costo para
              el edificio y cobro automático vía gastos comunes.
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
              Ver plataforma EVE →
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ bgcolor: DARK, color: '#fff', py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" textAlign="center">
              {[
                { value: '15+', label: 'Edificios con EVE desplegado en Santiago' },
                { value: '$0', label: 'Costo de infraestructura para el edificio' },
                { value: 'OCPP', label: 'Protocolo abierto de carga inteligente' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 800, color: TEAL }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#CBD5E1', mt: 0.5 }}>
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Section 1 */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              El Problema Real: ¿Quién Paga la Electricidad del Cargador?
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              En Chile, los edificios de departamentos enfrentan un problema estructural cuando
              sus residentes quieren cargar autos eléctricos. La electricidad de los
              estacionamientos en subterráneo suele estar conectada a los medidores de áreas
              comunes, pagada por todos los copropietarios a través de los gastos comunes. Si un
              residente instala un cargador conectado a ese circuito y recarga su auto por las
              noches, el costo de su electricidad lo está pagando toda la comunidad. Es
              injusto, y los administradores lo saben.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La solución obvia parece ser instalar un medidor eléctrico individual para cada
              cargador, conectado al medidor del departamento del propietario. Pero esta solución
              tiene un costo enorme: cada medidor eléctrico monofásico cuesta entre $150.000 y
              $300.000 CLP, más la acometida desde el medidor del departamento (que puede estar
              en un piso distinto del estacionamiento en subterráneo) puede costar $500.000–
              $1.500.000 CLP adicionales por unidad, dependiendo de la distancia. Para un edificio
              con 50 estacionamientos, el costo total solo en medidores y acometidas puede superar
              los $30.000.000 CLP.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              La Solución EVE: Medición Inteligente sin Medidores Individuales
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La plataforma EVE de Enérgica City elimina la necesidad de medidores eléctricos
              individuales. Cada cargador compatible con el protocolo OCPP (Open Charge Point
              Protocol) —el estándar internacional abierto para cargadores inteligentes— tiene
              integrado un medidor de energía que registra el consumo exacto en kWh por sesión de
              carga. Este dato se transmite a la plataforma EVE en la nube y se asocia al perfil
              del residente que inició la sesión.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              El resultado es un sistema de cobro granular y transparente: cada residente paga
              exactamente los kWh que consumió su vehículo, no más y no menos. El administrador
              no necesita leer medidores manualmente ni hacer cálculos proporcionales. Al finalizar
              cada mes, el sistema EVE genera automáticamente el reporte de consumo por
              departamento listo para incluirlo en el estado de cuenta de gastos comunes.
            </Typography>
          </Container>
        </Box>

        {/* How EVE works - steps */}
        <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: GRAY_BG }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                mb: 2,
                color: DARK,
                textAlign: 'center',
              }}
            >
              Cómo Funciona EVE: Paso a Paso
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: TEXT_MUTED, mb: 6, textAlign: 'center' }}
            >
              De la sesión de carga al cobro automático en 5 pasos sin intervención manual
            </Typography>
            <Grid container spacing={3}>
              {eveSteps.map((step) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={step.numero}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: '#fff',
                      borderRadius: 2,
                      height: '100%',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: TEAL,
                        lineHeight: 1,
                        mb: 1,
                      }}
                    >
                      {step.numero}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ fontSize: '1rem', fontWeight: 700, mb: 1, color: DARK }}
                    >
                      {step.titulo}
                    </Typography>
                    <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.7 }}>
                      {step.descripcion}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Section 2 */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Balanceo Dinámico de Carga: Protegiendo el Transformador del Edificio
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Uno de los mayores temores de los administradores de edificios ante la instalación
              de cargadores EV es la sobrecarga eléctrica. Un edificio residencial típico tiene
              un transformador dimensionado para la demanda histórica de los departamentos —
              iluminación, electrodomésticos, aire acondicionado— pero no para agregar docenas
              de cargadores de 7 kW que se activan simultáneamente cuando los residentes llegan
              a casa entre las 19:00 y las 21:00.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La plataforma EVE incluye un módulo de gestión dinámica de carga (Dynamic Load
              Management, DLM). Este módulo monitorea en tiempo real la demanda eléctrica total
              del edificio y distribuye la potencia disponible entre los cargadores activos. Si
              el edificio está operando cerca de su capacidad máxima —por ejemplo, una noche de
              verano con todos los aires acondicionados encendidos— el sistema EVE reduce
              automáticamente la potencia de carga de los vehículos en proporción, sin cortar
              ninguna sesión. Cuando la demanda del edificio baja, la potencia de carga se
              restaura.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              El Transformador del Edificio No Necesita Ampliarse
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Gracias al DLM, en los más de 15 edificios de Santiago donde EVE está desplegado,
              ninguno ha necesitado ampliar su transformador para soportar la carga EV de los
              residentes. El sistema gestiona inteligentemente la carga disponible y la distribuye
              de forma óptima. El resultado es que los residentes cargan sus autos cada noche sin
              problemas y el edificio no incurre en costos de ampliación de infraestructura
              eléctrica mayor.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Priorización de Carga: Quién Carga Primero
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              En la plataforma EVE, los residentes pueden configurar una prioridad de carga desde
              la app. Si un residente necesita salir temprano al día siguiente, puede marcar su
              sesión como &ldquo;prioritaria&rdquo; y el sistema garantizará que su vehículo alcance el
              estado de carga deseado antes que otros. Esta funcionalidad es especialmente valorada
              en edificios con muchos vehículos eléctricos y capacidad limitada de carga simultánea.
            </Typography>
          </Container>
        </Box>

        {/* Section 3 */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Modelo de Negocio: Cero Costo para el Edificio
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Enérgica City financia íntegramente la instalación de los cargadores y la activación
              de la plataforma EVE. El edificio no realiza ninguna inversión inicial: ni los
              cargadores, ni el cableado, ni la integración del software. En cambio, Enérgica City
              recupera su inversión a través de una tarifa de servicio mensual por cargador activo,
              que se distribuye entre los residentes que usan el servicio en proporción a su consumo.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Para el residente promedio que carga su auto 4–5 noches por semana, la tarifa de
              servicio mensual representa un costo adicional de $8.000–$15.000 CLP sobre el costo
              de la electricidad consumida. Este valor es significativamente menor al ahorro en
              combustible que genera el uso del vehículo eléctrico: el mismo conductor ahorraría
              $60.000–$80.000 CLP en gasolina al mes comparado con un vehículo de combustión
              equivalente.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Transparencia Total para el Administrador
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              El panel de administración del sistema EVE permite al administrador del edificio
              ver en tiempo real el estado de cada cargador (ocupado, disponible, en mantención),
              el consumo acumulado del mes por departamento, alertas de fallas técnicas y el
              historial completo de sesiones. Al final del mes, el sistema genera un archivo
              exportable en PDF y Excel con todos los datos necesarios para incluirlos en el
              estado de cuenta de gastos comunes. El tiempo de trabajo del administrador se reduce
              a menos de 10 minutos mensuales para gestionar el cobro de la carga EV de todo el
              edificio.
            </Typography>
          </Container>
        </Box>

        {/* Section 4 */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Cómo Proponer EVE en tu Edificio: Guía para Residentes
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Si eres residente de un edificio y tienes o planeas comprar un auto eléctrico, puedes
              proponer la implementación de EVE en tu comunidad. El primer paso es solicitar al
              administrador que incluya el tema en la agenda de la próxima reunión de copropietarios.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Enérgica City puede enviar un representante técnico a la reunión —sin costo— para
              presentar el modelo EVE, responder preguntas de los copropietarios y entregar una
              propuesta técnica adaptada al edificio específico. La propuesta incluye el número
              de cargadores recomendados según la capacidad eléctrica del edificio, el modelo de
              costos detallado y el tiempo estimado de instalación.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              ¿Se Necesita Acuerdo de la Asamblea?
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              La instalación de cargadores en las áreas comunes del edificio (estacionamientos de
              visita, áreas de carga compartidas) requiere acuerdo de la asamblea de copropietarios
              ya que afecta bienes comunes. Sin embargo, la instalación en el estacionamiento
              privado de un propietario es un derecho amparado por la Ley de Electromovilidad
              (Ley 21.226), que prohíbe a las administraciones impedir este tipo de instalación.
              Enérgica City puede orientarte sobre cómo ejercer este derecho correctamente.
            </Typography>
          </Container>
        </Box>

        {/* FAQ */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                mb: 5,
                color: DARK,
                textAlign: 'center',
              }}
            >
              Preguntas Frecuentes
            </Typography>
            {faqSchema.mainEntity.map((item, i) => (
              <Box
                key={i}
                sx={{
                  mb: 3,
                  p: 3,
                  bgcolor: '#fff',
                  borderRadius: 2,
                  borderLeft: `4px solid ${TEAL}`,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <Typography variant="h3" sx={{ fontSize: '1rem', fontWeight: 700, mb: 1, color: DARK }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.7 }}>
                  {item.acceptedAnswer.text}
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>

        {/* Author */}
        <Box sx={{ py: 5, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: GRAY_BG,
                borderLeft: `4px solid ${TEAL}`,
              }}
            >
              <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.7 }}>
                <strong style={{ color: DARK }}>Escrito por Felipe Donoso</strong>, Ingeniero
                Eléctrico. Revisor:{' '}
                <strong style={{ color: DARK }}>Gilberto Escalona</strong>, Gerente Técnico,
                Enérgica City.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* CTA dark band */}
        <Box sx={{ bgcolor: DARK, py: { xs: 7, md: 10 }, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 800,
                color: '#fff',
                mb: 2,
              }}
            >
              Implementa EVE en tu Edificio sin Costo Inicial
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 480, mx: 'auto' }}>
              Cargadores inteligentes OCPP, plataforma de gestión y cobro automático vía gastos
              comunes.{' '}
              <strong style={{ color: '#fff' }}>$0 de inversión para el edificio.</strong>
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box
                component={Link}
                href="/cotizador"
                sx={{
                  display: 'inline-block',
                  bgcolor: TEAL,
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  '&:hover': { bgcolor: TEAL_DARK },
                }}
              >
                Cotizar para mi edificio
              </Box>
              <Box
                component={Link}
                href="/agenda"
                sx={{
                  display: 'inline-block',
                  bgcolor: 'transparent',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  border: '2px solid #fff',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                Agendar presentación
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

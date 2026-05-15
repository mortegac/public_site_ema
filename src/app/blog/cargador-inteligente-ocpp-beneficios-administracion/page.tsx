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

const SLUG = 'cargador-inteligente-ocpp-beneficios-administracion'

export const metadata: Metadata = {
  title: 'OCPP: El protocolo que hace inteligente a tu cargador EV',
  description:
    'Qué es OCPP y por qué elegir cargadores con este protocolo. Gestión remota, programación horaria, integración con EVE y reducción de costos eléctricos en Chile.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'OCPP: El protocolo que hace inteligente a tu cargador EV',
    description:
      'Protocolo OCPP para cargadores EV en Chile: gestión remota, carga nocturna programada y reducción de costos. Compatible con la plataforma EVE de Enérgica City.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cargador inteligente con protocolo OCPP gestionado remotamente en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCPP: Cómo hacer inteligente tu cargador EV en Chile',
    description:
      'Todo sobre el protocolo OCPP para cargadores EV: gestión remota, cobro por uso y ahorro en la tarifa eléctrica nocturna.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'OCPP: El Protocolo que Hace Inteligente a tu Cargador EV',
  description:
    'Explicación completa del protocolo OCPP para cargadores de vehículos eléctricos: versiones 1.6 y 2.0.1, funcionalidades de gestión remota, carga programada y beneficios para hogares, edificios y flotas en Chile.',
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
  datePublished: '2025-05-12',
  dateModified: '2025-05-12',
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
      name: '¿Qué diferencia hay entre OCPP 1.6 y OCPP 2.0.1?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'OCPP 1.6 es el estándar más ampliamente adoptado hoy. Soporta funciones básicas: inicio y parada remota de carga, autenticación con tarjetas RFID, registro de transacciones y diagnósticos. OCPP 2.0.1 (publicado en 2020) añade funcionalidades avanzadas como Device Management, soporte para V2G (Vehicle to Grid), perfiles de carga inteligente con curvas dinámicas y mayor seguridad mediante certificados TLS bidireccionales. La plataforma EVE de Enérgica City es compatible con ambas versiones, y la mayoría de los cargadores residenciales y comerciales disponibles en Chile usan OCPP 1.6.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo puedo verificar si un cargador EV es compatible con OCPP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Para verificar la compatibilidad OCPP de un cargador, solicita al fabricante o distribuidor la ficha técnica del producto y busca la especificación "OCPP 1.6 compliant" o "OCPP 2.0.1 compliant". Adicionalmente, el Open Charge Alliance (OCA), organismo que mantiene el estándar OCPP, publica una lista de productos certificados en su sitio web. Un cargador verdaderamente compatible con OCPP debe permitir cambiar el servidor de gestión (CSMS) sin modificaciones de hardware, lo que garantiza la independencia del proveedor de plataforma.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto se ahorra programando la carga nocturna con OCPP en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'En Chile, la tarifa eléctrica nocturna en horario valle (generalmente 23:00 a 07:00) puede ser hasta un 35 % más barata que la tarifa punta en algunos contratos residenciales con medidor inteligente (aproximadamente $104/kWh vs. $160/kWh en tarifa punta). Para un conductor que carga 10 kWh diarios, programar la carga para que se inicie a las 23:00 supone un ahorro anual de aproximadamente $20.440 vs. cargar a las 20:00. Con OCPP, la plataforma EVE permite programar ventanas de carga y límites de corriente que se aplican automáticamente sin intervención del usuario.',
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
      name: 'OCPP: El protocolo que hace inteligente a tu cargador EV',
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
            background: `linear-gradient(135deg, #0F172A 0%, #1a3350 100%)`,
            color: '#fff',
            py: { xs: 8, md: 12 },
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {['Protocolo OCPP', 'Cargador Inteligente', 'Gestión Remota', 'Plataforma EVE'].map(
                (tag) => (
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
                )
              )}
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
              OCPP: El Protocolo que Hace Inteligente a tu Cargador EV
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 660,
                lineHeight: 1.7,
              }}
            >
              OCPP es el lenguaje común que permite a tu cargador hablar con cualquier plataforma
              de gestión. Significa libertad de proveedor, carga programada a tarifa valle y cobro
              automático por usuario.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: 'OCPP 1.6', label: 'Versión más instalada en Chile' },
                { value: '~35%', label: 'Ahorro carga nocturna (tarifa valle)' },
                { value: '~$47/kWh', label: 'Tarifa off-peak estimada en contratos optimizados' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Box sx={{ textAlign: 'center', color: '#fff' }}>
                    <Typography
                      sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 800 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: '0.88rem', opacity: 0.85 }}>{stat.label}</Typography>
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
              ¿Qué es OCPP y por qué importa el estándar abierto?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              OCPP son las siglas de <strong>Open Charge Point Protocol</strong>, el protocolo de
              comunicación estandarizado que define cómo un punto de carga (cargador EV) se
              comunica con un sistema de gestión central (llamado CSMS, Charge Station Management
              System). Fue desarrollado por la Open Charge Alliance (OCA), un consorcio internacional
              de empresas del sector de electromovilidad, y su primera versión significativa (OCPP
              1.5) data de 2012. La versión más extendida hoy es OCPP 1.6, aunque OCPP 2.0.1 está
              ganando adopción rápidamente en proyectos nuevos.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              La palabra clave es <strong>abierto</strong>: OCPP no es propiedad de ninguna empresa
              específica, y cualquier fabricante de cargadores puede implementarlo. Esto significa
              que si tu cargador es compatible con OCPP, puedes conectarlo a cualquier plataforma
              de gestión —la plataforma EVE de Enérgica City, ChargePoint, OCPI, o cualquier
              otra—, sin depender de la plataforma propietaria del fabricante del hardware. Esta
              independencia de proveedor, también llamada <em>vendor lock-in freedom</em>, protege
              tu inversión a largo plazo.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              OCPP vs. protocolos propietarios: la diferencia real
            </Typography>
            <Box
              sx={{ border: `1px solid #E2E8F0`, borderRadius: 2, overflow: 'hidden', mb: 4 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.5fr 1.5fr',
                  background: DARK,
                  color: '#fff',
                  px: 2,
                  py: 1.5,
                }}
              >
                {['Característica', 'Protocolo OCPP', 'Protocolo propietario'].map((h) => (
                  <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                    {h}
                  </Typography>
                ))}
              </Box>
              {[
                ['Portabilidad de plataforma', 'Cualquier CSMS compatible', 'Solo plataforma del fabricante'],
                ['Costo de plataforma mensual', 'Compitivo (múltiples opciones)', 'Tarifa única del fabricante'],
                ['Integración con terceros', 'API abierta estándar', 'Depende del fabricante'],
                ['Cobro por uso (billing)', 'Sí, con plugins estándar', 'Limitado o de pago extra'],
                ['Carga programada (smart charging)', 'Sí (OCPP 1.6 SmartCharging)', 'Variable'],
                ['Continuidad si el fabricante cierra', 'Garantizada (estándar abierto)', 'En riesgo'],
              ].map(([feat, ocpp, prop], i) => (
                <Box
                  key={feat}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.5fr 1.5fr',
                    px: 2,
                    py: 1.5,
                    background: i % 2 === 0 ? GRAY_BG : '#fff',
                    borderTop: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: DARK }}>
                    {feat}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
                    {ocpp}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#DC2626' }}>{prop}</Typography>
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
              Funcionalidades OCPP para distintos tipos de usuarios
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Hogar: carga nocturna a tarifa valle
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Para el usuario domiciliario en Chile, la funcionalidad más valiosa de OCPP es la
              programación horaria de la carga. Con un medidor inteligente (AMI) que distingue
              entre tarifa punta y valle, programar la carga para que se inicie a las 23:00
              puede reducir el costo eléctrico mensual en un 30 a 35 %. La plataforma EVE
              permite crear perfiles de carga semanales: por ejemplo, iniciar carga a las
              23:00 de lunes a jueves y a las 22:00 los viernes, limitando la corriente de carga
              al 80 % de la capacidad nominal para alargar la vida útil de la batería del vehículo.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Con OCPP, además, el usuario puede iniciar o detener la carga remotamente desde la
              app EVE, recibir notificaciones cuando la carga está completa y ver el historial de
              consumo mensual desglosado por sesión.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Edificios: cobro individual por gastos comunes
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              En condominios y edificios residenciales, el protocolo OCPP resuelve el problema del
              cobro equitativo: cada propietario o arrendatario paga exactamente lo que consume.
              La plataforma EVE registra cada sesión de carga con timestamp, usuario (identificado
              por tarjeta RFID o app), kWh consumidos y costo calculado según la tarifa
              configurada por la administración. El administrador del edificio genera el informe
              mensual de un solo clic y lo integra al prorrateo de gastos comunes.
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Un edificio residencial de 12 cargadores en Santiago paga en promedio $180.000
              mensuales en consumo eléctrico de carga. Sin OCPP, ese costo se distribuye en partes
              iguales entre todos los propietarios, independientemente de si tienen o no vehículo
              eléctrico. Con OCPP, solo paga quien carga.
            </Typography>

            <Typography
              component="h3"
              sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, mt: 4 }}
            >
              Flotas: optimización basada en rutas
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Para empresas con flotas de vehículos eléctricos, OCPP permite coordinar la carga
              según los planes de ruta de cada vehículo. La plataforma EVE puede recibir el plan
              de rutas del día siguiente desde el sistema de gestión de flota (TMS) y calcular
              automáticamente qué vehículos necesitan carga completa y cuáles pueden cargarse
              parcialmente o en horario nocturno, optimizando el uso de la potencia disponible
              sin necesidad de ampliar el suministro eléctrico.
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
              La plataforma EVE de Enérgica City
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              EVE es la plataforma CSMS desarrollada por Enérgica City específicamente para el
              mercado chileno. Implementa el protocolo OCPP 1.6 completo e incorpora las funciones
              del perfil SmartCharging, que permite definir potencia máxima por cargador, potencia
              máxima por grupo de cargadores (load balancing) y ventanas horarias de carga
              preferente. EVE también integra datos de las distribuidoras eléctricas chilenas
              (Enel, CGE, Chilquinta) para mostrar la tarifa vigente en tiempo real y recalcular
              automáticamente el costo cuando la distribuidora actualiza sus tarifas reguladas.
            </Typography>

            {[
              {
                title: 'Dashboard en tiempo real',
                desc:
                  'Vista consolidada de todos los puntos de carga: estado (disponible, cargando, fuera de servicio), potencia actual, energía acumulada del mes y alertas de fallo.',
              },
              {
                title: 'Gestión de usuarios y tarjetas RFID',
                desc:
                  'Alta y baja de usuarios, asignación de credenciales y configuración de límites individuales (kWh máximos por mes o por sesión).',
              },
              {
                title: 'Reportes de consumo y facturación',
                desc:
                  'Exportación de reportes en PDF y CSV por usuario, por cargador o por período. Integración con sistemas contables via API REST.',
              },
              {
                title: 'Actualizaciones OTA',
                desc:
                  'Los cargadores compatibles pueden recibir actualizaciones de firmware de forma remota (Over the Air) sin necesidad de visita técnica.',
              },
            ].map((item) => (
              <Box
                key={item.title}
                sx={{
                  p: 3,
                  background: GRAY_BG,
                  borderRadius: 2,
                  mb: 2,
                  borderLeft: `4px solid ${TEAL}`,
                }}
              >
                <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>{item.title}</Typography>
                <Typography sx={{ color: '#475569', fontSize: '0.93rem', lineHeight: 1.7 }}>
                  {item.desc}
                </Typography>
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
              ¿Cómo verificar si tu cargador es compatible con OCPP?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Antes de comprar un cargador EV en Chile, te recomendamos verificar la compatibilidad
              OCPP haciendo estas preguntas al proveedor o distribuidor:
            </Typography>
            <Box component="ol" sx={{ pl: 3, mb: 4 }}>
              {[
                '¿El cargador es compatible con OCPP 1.6 o 2.0.1? (no aceptes "compatible con nuestro estándar propio")',
                '¿Puedo apuntar el cargador a cualquier servidor CSMS, incluyendo uno que yo administre?',
                '¿El protocolo de comunicación es WebSocket sobre TCP (requerido por OCPP 1.6j)?',
                '¿El cargador soporta el perfil SmartCharging de OCPP 1.6 para programación horaria?',
                '¿El fabricante tiene certificación de la Open Charge Alliance (OCA) para este modelo?',
              ].map((q) => (
                <Box component="li" key={q} sx={{ mb: 1.5 }}>
                  <Typography sx={{ color: '#334155', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {q}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Los cargadores que Enérgica City instala e integra con la plataforma EVE son todos
              verificados OCPP 1.6 o 2.0.1. Si ya tienes un cargador instalado y quieres saber si
              es compatible con EVE, puedes contactarnos para una prueba de integración gratuita.
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
              Preguntas frecuentes sobre OCPP y cargadores inteligentes
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
              Instala un cargador inteligente con protocolo OCPP
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 5,
                fontSize: '1.05rem',
              }}
            >
              Todos nuestros cargadores incluyen integración con la plataforma EVE (OCPP 1.6/2.0.1)
              y gestión remota desde el primer día.
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
                  Cotizar cargador inteligente
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

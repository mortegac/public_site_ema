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

export const metadata: Metadata = {
  title: 'Fallas comunes en cargadores EV: Guía de mantenimiento',
  description:
    'Qué hacer si tu cargador eléctrico deja de funcionar. Diagnóstico de fallas comunes, mantenimiento preventivo y servicio técnico especializado en Chile.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/mantenimiento-correctivo-cargadores-fallas-comunes` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/mantenimiento-correctivo-cargadores-fallas-comunes`,
    title: 'Fallas comunes en cargadores EV: Guía de mantenimiento',
    description:
      'Diagnóstico de fallas comunes en cargadores EV, mantenimiento preventivo y servicio técnico en Chile. Garantía 2 años Enérgica City.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Fallas y mantenimiento cargadores EV en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fallas comunes en cargadores EV: Guía de mantenimiento',
    description: 'Diagnóstico de fallas: sin energía, conector bloqueado, carga lenta, WiFi perdido.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Fallas Comunes en Cargadores EV: Guía de Mantenimiento',
  description:
    'Qué hacer si tu cargador eléctrico deja de funcionar. Diagnóstico de fallas comunes, mantenimiento preventivo y servicio técnico especializado en Chile.',
  author: { '@type': 'Person', name: 'Gilberto Escalona', jobTitle: 'Gerente Técnico, Enérgica City' },
  publisher: { '@type': 'Organization', name: 'Enérgica City', url: CANONICAL_DOMAIN },
  datePublished: '2025-07-01',
  dateModified: '2025-07-01',
  url: `${CANONICAL_DOMAIN}/blog/mantenimiento-correctivo-cargadores-fallas-comunes`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${CANONICAL_DOMAIN}/blog/mantenimiento-correctivo-cargadores-fallas-comunes`,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Con qué frecuencia debo hacer mantención a mi cargador EV?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Se recomienda una inspección técnica anual para cargadores de uso doméstico. Para cargadores en flotas o uso comercial (más de 5 cargas diarias), la revisión debe ser semestral. En la inspección se verifica el estado del conector y el cable, la firmeza de las conexiones eléctricas en el tablero, la correcta actuación del diferencial y el termomagnético, el estado del aislamiento del conductor y la vigencia del firmware del Wallbox. Enérgica City ofrece contratos de mantención anual que incluyen una visita técnica completa con informe.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué cubre la garantía de 2 años de Enérgica City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La garantía de instalación de Enérgica City (2 años desde la fecha de la recepción conforme) cubre defectos de instalación: conexiones mal ejecutadas, canalización deficiente, fallas de puesta a tierra atribuibles a la instalación y mal funcionamiento del diferencial o termomagnético instalados. No cubre daño físico por golpes o mala manipulación del usuario, fallas del Wallbox como producto (que cubre el fabricante por separado, generalmente 2 años), ni desgaste normal del conector. Ante cualquier falla durante la garantía, basta contactar al equipo de soporte para coordinar visita técnica sin costo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mi cargador marca error pero el auto no carga. ¿Qué hago antes de llamar al técnico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Primero, desenchufa el cable del auto, espera 30 segundos y vuelve a conectar: muchos errores de comunicación CP/PP se resuelven así. Luego verifica en el tablero eléctrico que el interruptor termomagnético del circuito EV no haya saltado. Si el cargador tiene pantalla o LEDs, anota el código de error o el patrón de parpadeo (consulta el manual). Si el cargador tiene app, revísala: frecuentemente indica si el error es de conectividad WiFi, de temperatura interna o de comunicación con el vehículo. Si después de estos pasos el error persiste, contacta a tu instalador o al soporte del fabricante.',
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
      name: 'Fallas Comunes en Cargadores EV',
      item: `${CANONICAL_DOMAIN}/blog/mantenimiento-correctivo-cargadores-fallas-comunes`,
    },
  ],
}

const commonFaults = [
  {
    code: 'F-01',
    title: 'Sin energía — el cargador no enciende',
    symptoms: 'LEDs apagados, sin respuesta al conectar el auto, pantalla negra.',
    causes: [
      'Interruptor termomagnético disparado en el tablero eléctrico.',
      'Diferencial Tipo A disparado por corriente de fuga.',
      'Corte de suministro general del inmueble.',
      'Falla del controlador interno del Wallbox (menos frecuente).',
    ],
    userSteps: [
      'Revisa el tablero eléctrico: busca el interruptor del circuito EV en posición intermedia o "OFF".',
      'Restablece el interruptor termomagnético y el diferencial.',
      'Si vuelve a disparar inmediatamente, no insistas: hay una falla eléctrica real. Llama a un técnico.',
    ],
    callTechnician: 'Si el diferencial o termomagnético dispara repetidamente al restablecerlo.',
    color: '#DC2626',
    priority: 'ALTA',
  },
  {
    code: 'F-02',
    title: 'Conector no encaja o no se libera del auto',
    symptoms: 'Cable atascado en el puerto del vehículo, LED de carga no enciende al conectar.',
    causes: [
      'Señal CP/PP interrumpida (cable dañado o conector sucio).',
      'Bloqueo físico del conector por temperatura extrema.',
      'Bug en el firmware del vehículo o del Wallbox.',
      'Oxidación en los pines del conector Tipo 2.',
    ],
    userSteps: [
      'Desbloquea el auto desde la app del vehículo o desde la llave antes de intentar desconectar.',
      'Limpia suavemente los pines del conector con un paño seco.',
      'Reinicia el Wallbox desde el app o desde el interruptor del tablero y vuelve a intentar.',
    ],
    callTechnician: 'Si el conector presenta daño físico visible o si la operación de bloqueo/desbloqueo falla sistemáticamente.',
    color: '#D97706',
    priority: 'MEDIA',
  },
  {
    code: 'F-03',
    title: 'La carga se detiene antes de llegar al 100%',
    symptoms: 'El auto deja de cargar a un porcentaje intermedio sin haber completado el proceso.',
    causes: [
      'Error de comunicación entre el vehículo y el EVSE (señal CP interrumpida).',
      'El auto alcanzó su límite de carga programado (revisar configuración del vehículo).',
      'Sobretemperatura del conector del Wallbox (protección térmica activada).',
      'Corte eléctrico breve que interrumpió la sesión.',
    ],
    userSteps: [
      'Desconecta y vuelve a conectar el cable: muchas veces la sesión se reinicia correctamente.',
      'Verifica en la app del vehículo que el límite de carga no esté configurado al porcentaje donde paró.',
      'Revisa el historial de sesiones en la app del Wallbox (si tiene) para identificar el motivo del corte.',
    ],
    callTechnician: 'Si el problema se repite consistentemente en las mismas condiciones, especialmente si el conector está caliente al tacto.',
    color: '#D97706',
    priority: 'MEDIA',
  },
  {
    code: 'F-04',
    title: 'Carga lenta — potencia inferior a la esperada',
    symptoms: 'El vehículo carga a 2-3 kW cuando debería hacerlo a 7 kW.',
    causes: [
      'El Wallbox o la app del vehículo tienen la corriente máxima limitada a un valor bajo.',
      'La protección térmica reduce la potencia en días de calor extremo.',
      'Conexión WiFi perdida en Wallboxes con función de gestión de carga (OCPP).',
      'El auto está en modo de carga lenta por configuración del conductor.',
    ],
    userSteps: [
      'Revisa la app del Wallbox: busca el parámetro de "corriente máxima" o "max charge current" y verifica que esté en el valor máximo (por ejemplo, 32 A).',
      'Revisa la pantalla o app del vehículo: algunos autos tienen un límite de corriente AC configurable.',
      'Reinicia el Wallbox si usa gestión OCPP y la conectividad WiFi está perdida.',
    ],
    callTechnician: 'Si la corriente máxima está correctamente configurada pero la potencia medida es sistemáticamente baja.',
    color: '#2563EB',
    priority: 'BAJA',
  },
  {
    code: 'F-05',
    title: 'WiFi o conectividad OCPP perdida',
    symptoms: 'La app no muestra el estado del cargador, las sesiones no se registran, los reportes están vacíos.',
    causes: [
      'El router WiFi cambió de contraseña o fue reemplazado.',
      'El Wallbox perdió la configuración de red tras un corte eléctrico.',
      'El servidor OCPP tiene un problema de conectividad.',
      'El Wallbox está fuera del rango de cobertura WiFi.',
    ],
    userSteps: [
      'Verifica que el router WiFi funcione correctamente desde otro dispositivo.',
      'Accede a la app del Wallbox y reconecta la red WiFi con las credenciales actuales.',
      'Si el problema persiste, realiza un factory reset del Wallbox (consulta el manual) y reconfigura.',
    ],
    callTechnician: 'Si el Wallbox pierde la conectividad de forma recurrente o si es parte de una flota gestionada con OCPP que requiere reconfiguración del servidor.',
    color: '#7C3AED',
    priority: 'BAJA',
  },
]

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />

      <Box component="main">
        {/* ── Hero ── */}
        <Box
          sx={{
            background: 'linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)',
            py: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            {/* Breadcrumb */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4, flexWrap: 'wrap' }}>
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: 'Fallas y Mantención Cargadores EV', href: null },
              ].map((item, i) => (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {i > 0 && (
                    <Typography sx={{ color: 'rgba(0,0,0,0.4)', fontSize: '0.8rem' }}>›</Typography>
                  )}
                  {item.href ? (
                    <Box
                      component={Link}
                      href={item.href}
                      sx={{
                        color: 'rgba(0,0,0,0.6)',
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {item.label}
                    </Box>
                  ) : (
                    <Typography sx={{ color: '#000', fontSize: '0.8rem', fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.75rem' },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.2,
                color: '#000',
              }}
            >
              Fallas Comunes en Cargadores EV: Guía de Mantenimiento
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                color: '#000',
                mb: 5,
                maxWidth: 620,
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Tu cargador dejó de funcionar. Antes de llamar al técnico, sigue esta guía de diagnóstico. La mayoría
              de las fallas tienen solución en menos de 5 minutos sin herramientas.
            </Typography>

            <Box
              component={Link}
              href="/soporte"
              sx={{
                display: 'inline-block',
                bgcolor: PINK,
                color: '#fff',
                px: 4,
                py: 1.75,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
                '&:hover': { bgcolor: PINK_DARK },
              }}
            >
              Contactar soporte técnico →
            </Box>
          </Container>
        </Box>

        {/* ── Stats bar ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: 5, borderBottom: '1px solid #E2E8F0' }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} justifyContent="center">
              {[
                { value: '70%', label: 'de las fallas se resuelven reiniciando el diferencial o reconectando el cable' },
                { value: '2 años', label: 'garantía de instalación incluida en todos los servicios de Enérgica City' },
                { value: '1 vez/año', label: 'frecuencia mínima de mantención preventiva recomendada' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: TEAL }}>{stat.value}</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: TEXT_MUTED, mt: 0.5 }}>{stat.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── Section 1: Diagnóstico de fallas ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Las 5 fallas más comunes en cargadores EV y cómo diagnosticarlas
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 4 }}>
              Basándonos en las llamadas de soporte técnico recibidas por Enérgica City entre 2023 y 2025, estas son
              las cinco fallas que representan el 90% de los incidentes reportados. La mayoría tienen solución
              inmediata sin necesidad de visita técnica.
            </Typography>

            {commonFaults.map((fault) => (
              <Box
                key={fault.code}
                sx={{
                  mb: 4,
                  p: 0,
                  bgcolor: '#fff',
                  borderRadius: 2,
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    bgcolor: fault.color + '10',
                    borderBottom: `1px solid ${fault.color}30`,
                    px: 3,
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: fault.color,
                      fontSize: '0.85rem',
                      bgcolor: fault.color + '20',
                      px: 1.5,
                      py: 0.25,
                      borderRadius: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {fault.code}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: DARK, fontSize: '1.05rem' }}>
                    {fault.title}
                  </Typography>
                  <Box
                    sx={{
                      ml: 'auto',
                      bgcolor: fault.color + '15',
                      color: fault.color,
                      px: 1.5,
                      py: 0.25,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {fault.priority}
                  </Box>
                </Box>

                <Box sx={{ p: 3 }}>
                  {/* Symptoms */}
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: TEXT_MUTED, mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Síntomas
                  </Typography>
                  <Typography sx={{ fontSize: '0.95rem', color: '#475569', mb: 2.5 }}>{fault.symptoms}</Typography>

                  {/* Causes */}
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: TEXT_MUTED, mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Causas más frecuentes
                  </Typography>
                  <Box component="ul" sx={{ pl: 2.5, mb: 2.5, '& li': { fontSize: '0.9rem', color: '#475569', mb: 0.75, lineHeight: 1.6 } }}>
                    {fault.causes.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </Box>

                  {/* Steps */}
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: TEXT_MUTED, mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Pasos para el usuario
                  </Typography>
                  <Box sx={{ mb: 2.5 }}>
                    {fault.userSteps.map((s, i) => (
                      <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1, alignItems: 'flex-start' }}>
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            bgcolor: fault.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            flexShrink: 0,
                            mt: '1px',
                          }}
                        >
                          {i + 1}
                        </Box>
                        <Typography sx={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{s}</Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Call technician */}
                  <Box
                    sx={{
                      bgcolor: GRAY_BG,
                      borderRadius: 1.5,
                      px: 2,
                      py: 1.5,
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#DC2626', mb: 0.5 }}>
                      LLAMA AL TÉCNICO SI:
                    </Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: '#475569' }}>{fault.callTechnician}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Container>
        </Box>

        {/* ── Section 2: Mantención preventiva ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Mantención preventiva: qué incluye una revisión anual
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 4 }}>
              La mantención preventiva es la forma más efectiva de evitar fallas inesperadas y de prolongar la vida
              útil del sistema. Para cargadores de uso doméstico, una revisión al año es suficiente. Para uso
              comercial o flotas, dos revisiones anuales.
            </Typography>

            <Grid container spacing={3}>
              {[
                {
                  category: 'Revisión mecánica',
                  items: [
                    'Inspección visual del conector y cable de carga',
                    'Verificación de firmeza del Wallbox en la pared',
                    'Estado del sello del cuerpo del cargador (IP)',
                    'Limpieza del conector con limpiador dieléctrico',
                  ],
                },
                {
                  category: 'Revisión eléctrica',
                  items: [
                    'Apriete de bornes en el tablero (pueden aflojarse con ciclos térmicos)',
                    'Medición de resistencia de tierra y comparación con baseline',
                    'Prueba de actuación del diferencial Tipo A',
                    'Verificación de sección y estado del aislamiento del cable',
                  ],
                },
                {
                  category: 'Revisión de software',
                  items: [
                    'Verificación y actualización de firmware del Wallbox',
                    'Revisión de logs de sesiones y errores registrados',
                    'Prueba de conectividad WiFi/OCPP si aplica',
                    'Verificación de límites de corriente configurados',
                  ],
                },
                {
                  category: 'Prueba funcional',
                  items: [
                    'Carga de prueba con vehículo conectado (verificar potencia real)',
                    'Medición de corriente con pinza durante la carga',
                    'Verificación de temperatura del conector durante carga',
                    'Documentación del informe técnico con firma',
                  ],
                },
              ].map((group) => (
                <Grid size={{ xs: 12, sm: 6 }} key={group.category}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: '#fff',
                      borderRadius: 2,
                      border: '1px solid #E2E8F0',
                      height: '100%',
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, color: TEAL, mb: 2 }}>{group.category}</Typography>
                    <Box component="ul" sx={{ pl: 2.5, m: 0, '& li': { fontSize: '0.9rem', color: '#475569', mb: 1, lineHeight: 1.6 } }}>
                      {group.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 6, mb: 2, color: DARK }}>
              Actualización de firmware: una mantención que muchos olvidan
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Los Wallboxes modernos son dispositivos IoT con sistema operativo propio. Los fabricantes lanzan
              actualizaciones de firmware con regularidad que incluyen correcciones de compatibilidad con nuevos
              modelos de vehículos, mejoras de estabilidad, parches de seguridad y nuevas funcionalidades. Un
              Wallbox con firmware de 2022 puede tener problemas de comunicación con un vehículo lanzado en 2025.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155' }}>
              La actualización generalmente se realiza desde la app del fabricante (Wallbox, ABB, Schneider, etc.)
              de forma inalámbrica vía WiFi. El proceso tarda entre 5 y 15 minutos y el cargador se reinicia solo
              al terminar. Si el Wallbox no tiene app o no tiene conectividad, la actualización puede requerir
              la visita de un técnico con laptop.
            </Typography>
          </Container>
        </Box>

        {/* ── Section 3: Cuándo llamar al técnico ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Cuándo definitivamente debes llamar a un técnico
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 4 }}>
              Algunos problemas son sencillos de diagnosticar y resolver sin experiencia técnica. Otros involucran
              riesgo eléctrico real y no deben ser manipulados por usuarios no calificados. Ante cualquiera de estas
              señales, contacta a tu instalador o a Enérgica City:
            </Typography>

            {[
              {
                signal: 'Olor a quemado o plástico caliente',
                desc: 'Indica posible arco eléctrico o sobrecalentamiento de un conductor. Corta el circuito desde el tablero inmediatamente y no lo restablezca hasta la visita técnica.',
                severity: 'URGENTE',
                color: '#DC2626',
              },
              {
                signal: 'Diferencial o termomagnético que dispara repetidamente',
                desc: 'El disparo repetido indica una falla eléctrica real (corriente de fuga, cortocircuito o sobrecarga). No fuerces el restablecimiento más de dos veces. El problema no desaparecerá solo.',
                severity: 'URGENTE',
                color: '#DC2626',
              },
              {
                signal: 'Conector visiblemente dañado (quemado, fundido, con pines torcidos)',
                desc: 'Un conector dañado puede provocar arcos eléctricos en el siguiente uso. No uses el cargador hasta la reposición del conector.',
                severity: 'ALTO',
                color: '#D97706',
              },
              {
                signal: 'Wallbox suelto de la pared o con humedad visible en el interior',
                desc: 'Un Wallbox mal anclado o con infiltración de agua puede generar contacto eléctrico imprevisto. Corta el circuito hasta la revisión.',
                severity: 'ALTO',
                color: '#D97706',
              },
              {
                signal: 'Conector siempre caliente al tacto después de cada carga',
                desc: 'El conector puede alcanzar temperaturas moderadas durante la carga, pero no debe estar incómodo al tacto. Calor excesivo indica conexión deficiente o conector desgastado.',
                severity: 'MEDIO',
                color: '#2563EB',
              },
            ].map((alert) => (
              <Box
                key={alert.signal}
                sx={{
                  mb: 3,
                  p: 3,
                  bgcolor: alert.color + '08',
                  borderRadius: 2,
                  border: `1px solid ${alert.color}30`,
                  borderLeft: `4px solid ${alert.color}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
                  <Typography sx={{ fontWeight: 700, color: DARK, fontSize: '1rem' }}>{alert.signal}</Typography>
                  <Box
                    sx={{
                      bgcolor: alert.color + '15',
                      color: alert.color,
                      px: 1.5,
                      py: 0.25,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {alert.severity}
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7 }}>{alert.desc}</Typography>
              </Box>
            ))}
          </Container>
        </Box>

        {/* ── FAQ Section ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 5, color: DARK }}>
              Preguntas frecuentes
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
                }}
              >
                <Typography sx={{ fontWeight: 700, mb: 1.5, color: DARK, fontSize: '1rem' }}>{item.name}</Typography>
                <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
                  {item.acceptedAnswer.text}
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>

        {/* ── Author byline ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: 5, borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
          <Container maxWidth="md">
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: TEAL,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}
              >
                GE
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, color: DARK }}>Gilberto Escalona</Typography>
                <Typography sx={{ fontSize: '0.9rem', color: TEXT_MUTED, mb: 1 }}>
                  Gerente Técnico, Enérgica City
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  Escrito por Gilberto Escalona, Gerente Técnico con más de 10 años en proyectos de electromovilidad
                  industrial. Revisor: Felipe Donoso, Ingeniero Eléctrico.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── Dark CTA band ── */}
        <Box sx={{ bgcolor: DARK, py: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2.25rem' }, fontWeight: 800, color: '#fff', mb: 2 }}
            >
              ¿Tu cargador tiene una falla que no pudiste resolver?
            </Typography>
            <Typography sx={{ color: '#94A3B8', mb: 5, fontSize: '1.05rem', maxWidth: 540, mx: 'auto' }}>
              Nuestro equipo técnico atiende en Santiago y regiones. Garantía de 2 años en instalaciones Enérgica
              City. Diagnóstico remoto y visitas técnicas con tiempo de respuesta de 48 horas.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box
                component={Link}
                href="/soporte"
                sx={{
                  display: 'inline-block',
                  bgcolor: TEAL,
                  color: '#fff',
                  px: 4,
                  py: 1.75,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  '&:hover': { bgcolor: TEAL_DARK },
                }}
              >
                Abrir ticket de soporte →
              </Box>
              <Box
                component={Link}
                href="/agenda"
                sx={{
                  display: 'inline-block',
                  bgcolor: 'transparent',
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.4)',
                  px: 4,
                  py: 1.75,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  '&:hover': { borderColor: '#fff' },
                }}
              >
                Agendar visita técnica
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

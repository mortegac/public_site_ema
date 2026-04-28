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

const SLUG = 'instalacion-cargador-renault-kwid-e-tech-hogar'

export const metadata: Metadata = {
  title: 'Renault Kwid E-Tech: Cómo instalar tu cargador en casa',
  description:
    'Guía técnica para instalar el cargador del Renault Kwid E-Tech en Chile. Conectores Tipo 2, normativa SEC. Precio desde $159.000 con certificado TE6.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Renault Kwid E-Tech: Cómo Instalar tu Cargador en Casa',
    description:
      'Todo sobre la instalación domiciliaria del cargador para el Renault Kwid E-Tech en Chile. Proceso, costos, normativa SEC y tiempos de carga reales.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Instalación de cargador para Renault Kwid E-Tech en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renault Kwid E-Tech: Cómo instalar tu cargador en casa',
    description:
      'Instala tu cargador para Renault Kwid E-Tech desde $159.000 con técnicos SEC en Chile.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Renault Kwid E-Tech: Cómo Instalar tu Cargador en Casa',
  description:
    'Guía técnica completa para instalar un cargador domiciliario para el Renault Kwid E-Tech en Chile: especificaciones, proceso, costos y normativa SEC.',
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
      name: '¿Cuánto tiempo demora en cargar el Renault Kwid E-Tech con un Wallbox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con un Wallbox de 7,4 kW (monofásico 32 A), la batería de 26,8 kWh del Kwid E-Tech se carga completamente en aproximadamente 4 horas desde vacío. Si instalas un Wallbox de 3,7 kW (16 A), el tiempo sube a unas 8 horas. La carga nocturna completa es perfectamente posible en ambos casos, dejando el auto listo cada mañana.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El Renault Kwid E-Tech tiene carga rápida en DC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. El Renault Kwid E-Tech no incluye carga rápida DC en ninguna versión comercializada en Chile. Solo dispone de carga AC con conector Tipo 2 de hasta 7,4 kW. Esto lo hace ideal para uso urbano con carga nocturna, pero limita las opciones en viajes interurbanos largos. Para rutas de más de 300 km se recomienda planificar paradas en los puntos de carga AC públicos disponibles.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo instalar el cargador del Kwid E-Tech en un departamento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La Ley de Electromovilidad chilena (Ley 21.226) garantiza el derecho del propietario a instalar un cargador en su estacionamiento privado, sin necesidad de aprobación de la administración del edificio. Solo se requiere notificarlos y contratar un instalador SEC que emita el certificado TE6. En Enérgica City gestionamos instalaciones en edificios desde $369.000 con todo el proceso incluido.',
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
      name: 'Renault Kwid E-Tech: Cómo Instalar tu Cargador en Casa',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const chargingOptions = [
  {
    modo: 'Enchufe doméstico 220V',
    potencia: '2,3 kW (10 A)',
    tiempo: '~12 h',
    instalacion: 'No requerida',
    seguridad: 'Baja',
  },
  {
    modo: 'Wallbox 3,7 kW (Modo 3)',
    potencia: '3,7 kW (16 A)',
    tiempo: '~8 h',
    instalacion: 'Desde $159.000',
    seguridad: 'Alta',
  },
  {
    modo: 'Wallbox 7,4 kW (Modo 3)',
    potencia: '7,4 kW (32 A)',
    tiempo: '~4 h',
    instalacion: 'Desde $159.000',
    seguridad: 'Alta',
  },
  {
    modo: 'Carga pública AC Tipo 2',
    potencia: 'Hasta 7,4 kW',
    tiempo: '~4 h',
    instalacion: 'Por uso externo',
    seguridad: 'Alta',
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
              Renault Kwid E-Tech: Cómo Instalar tu Cargador en Casa
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                color: '#000000',
                mb: 5,
                maxWidth: 540,
                mx: 'auto',
              }}
            >
              El Kwid E-Tech es el eléctrico más accesible de Chile. Su batería de 26,8 kWh se llena
              en 4 horas con un Wallbox de 7,4 kW. Aquí te explicamos cómo instalarlo correctamente.
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
              Cotizar instalación →
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ bgcolor: DARK, color: '#fff', py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" textAlign="center">
              {[
                { value: '26,8 kWh', label: 'Batería Kwid E-Tech' },
                { value: '300 km', label: 'Autonomía WLTP' },
                { value: '~4 h', label: 'Carga completa con Wallbox 7,4 kW' },
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
              El Renault Kwid E-Tech: El Primer Eléctrico de Muchos Chilenos
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Renault Kwid E-Tech llegó a Chile como el vehículo eléctrico más económico del
              mercado, con precios de partida cercanos a los $11 millones CLP. Este valor lo coloca
              dentro del alcance de familias que ya evalúan dejar los combustibles fósiles, y ha
              catalizado la adopción de electromovilidad en segmentos que antes no consideraban un
              eléctrico como opción realista.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Su batería de 26,8 kWh es considerablemente más pequeña que la de otros eléctricos del
              mercado, lo que es una ventaja doble: pesa menos y se carga más rápido. En la práctica
              urbana chilena —viajes diarios de 30 a 60 km— el Kwid E-Tech cubre perfectamente la
              semana laboral con una sola carga nocturna, sin ansiedad de rango.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Especificaciones Técnicas de Carga
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Kwid E-Tech usa el conector Tipo 2 (IEC 62196-2) y acepta carga AC monofásica de
              hasta 7,4 kW (32 A a 230V). No incluye carga DC rápida, lo cual es habitual en
              vehículos de este segmento de precio. El cargador integrado a bordo (OBC) trabaja en
              modo monofásico, por lo que un circuito trifásico no le entregará mayor velocidad: el
              límite es 7,4 kW independientemente de la infraestructura.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Autonomía Real en Santiago y Ciudades Chilenas
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              La autonomía homologada WLTP del Kwid E-Tech es de 300 km. En condiciones de uso real
              en Santiago —tráfico detenido, aire acondicionado en verano, subidas en Las Condes o
              Peñalolén— la autonomía práctica se sitúa entre 220 y 260 km por carga. Para la
              mayoría de los habitantes del Gran Santiago, esto equivale a más de 4 días de uso sin
              necesidad de cargar. Con carga nocturna diaria, el nivel de batería nunca baja de 50%.
            </Typography>
          </Container>
        </Box>

        {/* Comparison Table */}
        <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: GRAY_BG }}>
          <Container maxWidth="lg">
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
              Opciones de Carga para el Renault Kwid E-Tech
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <Box
                component="table"
                sx={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  '& th': {
                    bgcolor: DARK,
                    color: '#fff',
                    px: 2,
                    py: 1.5,
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  },
                  '& td': {
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid #E2E8F0',
                    fontSize: '0.875rem',
                    color: DARK,
                  },
                  '& tr:nth-of-type(even) td': { bgcolor: '#F1F5F9' },
                  '& tr:hover td': { bgcolor: '#E0F2FE' },
                }}
              >
                <thead>
                  <tr>
                    <th>Modo de carga</th>
                    <th>Potencia</th>
                    <th>Tiempo (0–100%)</th>
                    <th>Costo instalación</th>
                    <th>Seguridad</th>
                  </tr>
                </thead>
                <tbody>
                  {chargingOptions.map((row) => (
                    <tr key={row.modo}>
                      <td style={{ fontWeight: 600 }}>{row.modo}</td>
                      <td>{row.potencia}</td>
                      <td>{row.tiempo}</td>
                      <td>{row.instalacion}</td>
                      <td>{row.seguridad}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Section 2 */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Cómo Instalar el Cargador: Proceso en Chile
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La instalación de un Wallbox para el Kwid E-Tech en Chile sigue el mismo proceso
              regulado por la Superintendencia de Electricidad y Combustibles (SEC). Todo el trabajo
              debe ejecutarlo un instalador con credencial SEC vigente, y el resultado debe quedar
              documentado en el certificado TE6, que acredita que la instalación cumple la normativa
              NCh Elec. 4/2003.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Paso 1: Evaluación del Punto de Carga
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El instalador visita el domicilio y evalúa la ubicación ideal del Wallbox: cerca del
              estacionamiento, protegido de la lluvia y con acceso fácil al cable del vehículo. Se
              mide la distancia al tablero eléctrico y se verifica si existe espacio para un
              interruptor diferencial y un termomagnético de 32 A. En casas con tableros modernos
              (posteriores a 2000), la instalación suele ser directa. En casas antiguas puede
              requerirse reemplazar el tablero o ampliar la capacidad.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Paso 2: Tendido de Cableado y Protecciones
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Se tiende cable de cobre de 6 mm² en conduit de PVC o metálico desde el tablero hasta
              el punto del Wallbox. Para el Kwid E-Tech con Wallbox monofásico de 7,4 kW (32 A), el
              cable de 6 mm² es suficiente para distancias de hasta 30 metros. Se instalan las
              protecciones en el tablero: diferencial de alta sensibilidad (30 mA tipo A o AC) y
              termomagnético calibrado. La combinación protege tanto al vehículo como a la
              instalación del hogar en caso de falla.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Paso 3: Montaje del Wallbox y Pruebas
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Wallbox se ancla a la pared con fijaciones mecánicas apropiadas para el sustrato
              (hormigón, tabique, madera estructural). Se conectan los conductores, se prueba la
              secuencia de fases y se verifica la correcta actuación de las protecciones simulando
              una falla. Luego se realiza la primera carga de prueba con el vehículo conectado,
              verificando que la comunicación entre el Wallbox y el auto funciona correctamente (el
              protocolo IEC 61851 que gestiona el handshake de carga).
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Paso 4: Emisión del Certificado TE6
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Al finalizar, el instalador SEC completa el formulario TE6 (Declaración de Instalación
              Eléctrica Interior) y lo presenta a la distribuidora eléctrica. Este trámite es
              obligatorio. Sin el TE6, la instalación no está regularizada y el propietario podría
              enfrentar problemas con la aseguradora en caso de siniestro. En Enérgica City, el TE6
              está incluido en el precio desde $159.000 para casas.
            </Typography>
          </Container>
        </Box>

        {/* Section 3 - Departamentos */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Kwid E-Tech en Departamento: La Solución Más Demandada
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Por ser el EV más accesible del mercado, el Renault Kwid E-Tech es popular entre
              compradores que viven en departamentos de ciudades chilenas. La buena noticia es que la
              instalación en condominio es perfectamente posible, y la ley la protege.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El circuito eléctrico del Wallbox debe alimentarse desde el medidor individual del
              propietario, no desde la electricidad común del edificio. Esto requiere trazar el cable
              desde el gabinete de medidores —generalmente en el primer piso o subterráneo— hasta el
              estacionamiento privado. El trazado puede pasar por ductos verticales del edificio, lo
              que requiere coordinación con la administración pero no su aprobación.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Dado que la batería del Kwid E-Tech es de solo 26,8 kWh, incluso un Wallbox de 3,7 kW
              (16 A) —que demanda menos infraestructura y es más económico de instalar— permite
              cargar el auto completamente en una noche. Para muchos dueños de departamentos, esta
              es la opción de menor costo total que resuelve el 100% de la necesidad cotidiana.
            </Typography>
          </Container>
        </Box>

        {/* Section 4 - Costos */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Cuánto Cuesta Instalar el Cargador del Kwid E-Tech
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              En Enérgica City la instalación base para casa parte desde <strong>$159.000 CLP</strong>{' '}
              e incluye: evaluación técnica, diseño del circuito, materiales básicos (cable, conduit,
              protecciones), montaje del Wallbox y certificado TE6. Para edificios, la instalación
              parte desde <strong>$369.000 CLP</strong> incluyendo el trazado desde el medidor
              individual hasta el estacionamiento.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El precio puede variar según factores como la distancia del tablero al estacionamiento,
              el tipo de muros por perforar o canaletear, la necesidad de ampliar el tablero
              eléctrico, o si se requiere instalar un medidor de subcontaje (para separar el consumo
              del auto en edificios con medidor común). Una cotización online orientativa está
              disponible en nuestro cotizador en 5 minutos.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Considerando que el Kwid E-Tech puede ahorrarle al propietario entre $40.000 y $60.000
              CLP mensuales en combustible (versus un auto a gasolina de clase similar), la
              instalación del Wallbox se recupera en 3 a 4 meses de uso. Es una de las inversiones
              con mejor retorno en el mundo de la electromovilidad chilena.
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
                Eléctrico con 10+ años de experiencia en electromovilidad. Revisor técnico:{' '}
                <strong style={{ color: DARK }}>Gilberto Escalona</strong>.
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
              Instala tu Cargador para Renault Kwid E-Tech Hoy
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 480, mx: 'auto' }}>
              Técnicos SEC certificados. Certificado TE6 incluido. Instalación desde{' '}
              <strong style={{ color: '#fff' }}>$159.000</strong> en casas y{' '}
              <strong style={{ color: '#fff' }}>$369.000</strong> en edificios.
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
                Cotizar instalación
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
                Agendar visita técnica
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

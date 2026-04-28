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

const SLUG = 'cargador-portatil-vs-wallbox-cual-conviene'

export const metadata: Metadata = {
  title: 'Cargador Portátil vs. Wallbox: ¿Cuál es mejor para tu casa?',
  description:
    'Compara cargador portátil y Wallbox para autos eléctricos en Chile. Potencia, seguridad, costo. Por qué la instalación fija protege tu batería y ahorra dinero.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Cargador Portátil vs. Wallbox: ¿Cuál es Mejor para tu Casa?',
    description:
      'Análisis técnico completo: cargador portátil vs Wallbox para EV en Chile. Diferencias en potencia, seguridad, costo y vida útil de la batería.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Comparación cargador portátil versus Wallbox para autos eléctricos Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargador Portátil vs. Wallbox: ¿Cuál es mejor para tu casa?',
    description:
      'Cargador portátil o Wallbox fijo: análisis técnico para EV en Chile. Qué conviene para el uso diario.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Cargador Portátil vs. Wallbox: ¿Cuál es Mejor para tu Casa?',
  description:
    'Comparativa técnica detallada entre cargadores portátiles y Wallbox fijos para vehículos eléctricos en Chile. Potencia, seguridad, costos y recomendaciones.',
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
      name: '¿Es seguro cargar un auto eléctrico con un cargador portátil en un enchufe doméstico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es posible, pero no es la opción recomendada para uso cotidiano. Un cargador portátil (modo 2) conectado a un enchufe de 220V entrega 10 A continuo durante horas, algo para lo que los enchufes domésticos chilenos no están dimensionados. Con el tiempo, el calor generado en el tomacorriente puede dañar el cableado del inmueble. Para una carga segura y diaria, se recomienda siempre un Wallbox con circuito dedicado instalado por técnico SEC.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué el Wallbox protege mejor la batería del auto eléctrico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un Wallbox utiliza el protocolo IEC 61851 para comunicarse con el auto antes y durante la carga. Este "handshake" permite al vehículo comunicar al cargador su estado de batería, temperatura y corriente máxima admitida, ajustando la entrega de energía en tiempo real. Un cargador portátil en enchufe Schuko no tiene esta comunicación bidireccional: entrega corriente constante sin saber el estado real de la batería, lo que puede generar estrés térmico acumulado.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuándo tiene sentido usar un cargador portátil en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El cargador portátil es útil en situaciones específicas: viajes a zonas sin Wallbox disponible (cabañas, casas de familiares), como respaldo de emergencia cuando el Wallbox tiene falla, o como solución temporal mientras se tramita la instalación del circuito fijo. Para el uso cotidiano en casa, el Wallbox siempre es la mejor opción: más rápido, más seguro, más inteligente y con retorno de inversión en 3–4 meses versus el desgaste eléctrico del enchufe doméstico.',
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
      name: 'Cargador Portátil vs. Wallbox: ¿Cuál es Mejor para tu Casa?',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const comparisonData = [
  {
    caracteristica: 'Potencia de carga',
    portatil: '2,4 kW (10 A) a 3,7 kW (16 A)',
    wallbox: '7,4 kW (32 A) a 22 kW (32 A trifásico)',
  },
  {
    caracteristica: 'Tiempo de carga (60 kWh)',
    portatil: '16–25 horas',
    wallbox: '3–9 horas',
  },
  {
    caracteristica: 'Instalación requerida',
    portatil: 'Ninguna (enchufe doméstico)',
    wallbox: 'Circuito dedicado por técnico SEC',
  },
  {
    caracteristica: 'Costo de adquisición',
    portatil: '$80.000–$200.000',
    wallbox: 'Desde $120.000 (equipo) + $159.000 instalación',
  },
  {
    caracteristica: 'Seguridad eléctrica',
    portatil: 'Media (sin protección dedicada)',
    wallbox: 'Alta (diferencial + termomagnético dedicados)',
  },
  {
    caracteristica: 'Comunicación con el auto (IEC 61851)',
    portatil: 'No (modo 2 básico)',
    wallbox: 'Sí (protocolo completo)',
  },
  {
    caracteristica: 'Programación horaria (tarifa nocturna)',
    portatil: 'No (depende del auto)',
    wallbox: 'Sí (desde la app del Wallbox)',
  },
  {
    caracteristica: 'Monitoreo de consumo',
    portatil: 'No',
    wallbox: 'Sí (modelos con WiFi)',
  },
  {
    caracteristica: 'Certificado TE6 requerido',
    portatil: 'No',
    wallbox: 'Sí (incluido en instalación)',
  },
  {
    caracteristica: 'Vida útil estimada',
    portatil: '3–5 años (calor en enchufe)',
    wallbox: '10–15 años',
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
              Cargador Portátil vs. Wallbox: ¿Cuál es Mejor para tu Casa?
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
              El cargador portátil viene de regalo con el auto. El Wallbox cuesta más, pero carga
              hasta 3 veces más rápido, protege la batería y reduce el riesgo eléctrico en tu hogar.
              Aquí está la comparación completa.
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
              Cotizar Wallbox →
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ bgcolor: DARK, color: '#fff', py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" textAlign="center">
              {[
                { value: '3x', label: 'Más rápido: Wallbox vs portátil' },
                { value: '10 años', label: 'Vida útil de un Wallbox' },
                { value: 'IEC 61851', label: 'Protocolo que protege tu batería' },
              ].map((stat) => (
                <Grid item xs={12} sm={4} key={stat.label}>
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
              El Cargador Portátil: Conveniente Pero Limitado
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La mayoría de los autos eléctricos vendidos en Chile incluyen un cargador portátil
              (también llamado cable de modo 2 o ICCB — In-Cable Control Box) como accesorio
              estándar. Este cable permite conectar el vehículo a un enchufe doméstico de 220V y
              comenzar a cargar sin necesitar ninguna instalación adicional. Para quien acaba de
              recibir su primer EV, esta simplicidad es tentadora.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Sin embargo, los cargadores portátiles entregan potencias muy bajas: entre 2,4 kW
              (10 A, el mínimo habitual para proteger el enchufe) y 3,7 kW (16 A en modelos más
              avanzados). Para una batería de 60 kWh —tamaño promedio de un EV mediano en Chile—
              esto significa entre 16 y 25 horas de carga desde vacío. En la práctica, si llegas a
              casa con 20% de batería y necesitas el auto al día siguiente a las 8 AM, no hay
              tiempo suficiente para una carga completa.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              El Problema del Enchufe Doméstico Bajo Carga Continua
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El aspecto más preocupante del cargador portátil no es la lentitud, sino el riesgo
              para la instalación del hogar. Un enchufe doméstico estándar en Chile (tipo NEMA L6-20
              o schuko europeo) está diseñado para cargas intermitentes: conectar un televisor, una
              lámpara o una aspiradora. No está pensado para mantener una corriente de 10 A durante
              8 a 10 horas seguidas, noche tras noche.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Con el tiempo, la conexión repetida del enchufe genera arcos eléctricos microscópicos.
              El calor acumulado en el tomacorriente ablanda el plástico y oxida los contactos. En
              instalaciones domésticas antiguas —especialmente comunes en casas construidas antes de
              1990— este desgaste puede derivar en falla del tomacorriente o, en el peor caso,
              incendio del cableado empotrado en el muro. Los cargadores portátiles tienen un sensor
              térmico interno que corta la carga si detecta temperatura anómala, pero este sensor
              mide la temperatura del cable, no la del enchufe ni del muro.
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
              Comparación Completa: Cargador Portátil vs. Wallbox
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
                  },
                  '& td': {
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid #E2E8F0',
                    fontSize: '0.875rem',
                    color: DARK,
                    verticalAlign: 'top',
                  },
                  '& tr:nth-of-type(even) td': { bgcolor: '#F1F5F9' },
                  '& tr:hover td': { bgcolor: '#E0F2FE' },
                }}
              >
                <thead>
                  <tr>
                    <th>Característica</th>
                    <th>Cargador Portátil</th>
                    <th>Wallbox Fijo</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.caracteristica}>
                      <td style={{ fontWeight: 600 }}>{row.caracteristica}</td>
                      <td style={{ color: TEXT_MUTED }}>{row.portatil}</td>
                      <td style={{ color: TEAL, fontWeight: 600 }}>{row.wallbox}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Section 2: Wallbox */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              El Wallbox: Por Qué es la Solución Correcta para Uso Diario
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Un Wallbox es un cargador de pared de modo 3 (IEC 61851-1) instalado en el
              estacionamiento con un circuito eléctrico dedicado. A diferencia del cargador
              portátil, el Wallbox establece una comunicación digital con el vehículo antes de
              iniciar la carga: el auto le informa su estado de batería, temperatura interna y
              corriente máxima admitida. El Wallbox ajusta su salida en consecuencia, entregando
              exactamente lo que la batería necesita en cada momento.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Potencia Real: 7,4 kW a 22 kW
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Los Wallbox monofásicos disponibles en Chile entregan típicamente 7,4 kW (32 A a 230V),
              lo que reduce el tiempo de carga a entre 3 y 9 horas según la capacidad de la batería.
              Los modelos trifásicos llegan a 11 kW o 22 kW (32 A en trifásico), pero la potencia
              útil está limitada por el cargador a bordo del vehículo (OBC). El Volvo XC40 Recharge
              acepta hasta 11 kW, el BYD Atto 3 acepta 7,4 kW, el Tesla Model 3 acepta hasta 11 kW
              (trifásico) o 7,4 kW (monofásico) según la versión.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Carga Programada y Tarifa Nocturna
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Los Wallbox inteligentes (modelos con WiFi como el Wallbox Pulsar Plus, ABB Terra AC o
              Schneider EVlink) permiten programar el inicio y fin de la carga desde una aplicación
              móvil. Esta funcionalidad es especialmente valiosa en Chile, donde las distribuidoras
              eléctricas ofrecen tarifas con discriminación horaria: la electricidad nocturna
              (23:00–07:00) puede costar entre 30% y 40% menos que en horario pico. Un conductor que
              carga cada noche con tarifa nocturna ahorra $400–$800 CLP por sesión versus cargar
              durante el día.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Retorno de Inversión del Wallbox
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              El costo total de un Wallbox instalado en una casa chilena es de aproximadamente
              $280.000–$380.000 CLP (equipo + instalación básica con TE6). Considerando el ahorro
              por tarifa nocturna versus carga diurna (estimado en $12.000–$25.000 CLP al mes según
              el vehículo y frecuencia de carga), y eliminando el riesgo de daño al tomacorriente
              que podría costar $80.000–$150.000 en reparación eléctrica, el Wallbox se recupera
              económicamente en 12 a 24 meses. Para quienes cargan el auto 5–7 veces por semana,
              el retorno es aún más rápido.
            </Typography>
          </Container>
        </Box>

        {/* Section 3: When portable is OK */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              ¿Cuándo Tiene Sentido el Cargador Portátil?
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Aunque el Wallbox es la solución recomendada para uso cotidiano, hay situaciones
              concretas donde el cargador portátil cumple un rol válido:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              {[
                'Viajes a zonas rurales o cabañas sin Wallbox disponible. El portátil se lleva en el maletero y permite recargar en cualquier enchufe 220V durante la noche.',
                'Como respaldo de emergencia. Si el Wallbox presenta una falla y el técnico no puede llegar el mismo día, el portátil resuelve la carga de emergencia.',
                'Solución temporal mientras se instala el Wallbox. El plazo entre compra del EV y la instalación del circuito puede ser de 1 a 2 semanas; el portátil cubre ese período.',
                'EVs usados con incertidumbre de uso. Si no sabes todavía cuánto usarás el auto, puede tener sentido comenzar con el portátil y evaluar si el patrón de uso justifica el Wallbox.',
              ].map((item, i) => (
                <Box component="li" key={i} sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ color: TEXT_MUTED, lineHeight: 1.8 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              En todos los demás casos —uso cotidiano en casa, departamento propio, empresa con
              flota— el Wallbox es la solución correcta. La diferencia en tiempo de carga (3h vs
              16h), en seguridad (circuito dedicado vs enchufe doméstico) y en inteligencia de
              carga (programación horaria, monitoreo de consumo) justifica la inversión para
              cualquier conductor que usa su EV como vehículo principal.
            </Typography>
          </Container>
        </Box>

        {/* Section 4: Cost-benefit */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Análisis Costo-Beneficio: Portátil vs. Wallbox en 3 Años
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Para un conductor que recorre 1.200 km mensuales y carga su EV de 60 kWh
              aproximadamente 5 veces por semana, el análisis a 3 años es el siguiente:
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Cargador Portátil (3 años)
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              {[
                'Costo inicial: $0 (viene con el auto) o $80.000–$200.000 si se compra adicional',
                'Tarifa eléctrica: carga diurna promedio ~$90–$100 CLP/kWh',
                'Consumo mensual estimado: 240 kWh → costo $21.600–$24.000 CLP/mes',
                'Costo electricidad 36 meses: ~$780.000–$864.000 CLP',
                'Riesgo de daño al enchufe/cableado: $80.000–$200.000 (potencial)',
                'Costo total estimado 3 años: $860.000–$1.064.000 CLP',
              ].map((item, i) => (
                <Box component="li" key={i} sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: TEXT_MUTED }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Wallbox Instalado (3 años)
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              {[
                'Costo inicial: $280.000–$380.000 CLP (equipo + instalación)',
                'Tarifa eléctrica: carga nocturna ~$60–$70 CLP/kWh (30% menos)',
                'Consumo mensual estimado: 240 kWh → costo $14.400–$16.800 CLP/mes',
                'Costo electricidad 36 meses: ~$518.000–$605.000 CLP',
                'Riesgo de daño eléctrico: mínimo (circuito dedicado con protecciones)',
                'Costo total estimado 3 años: $798.000–$985.000 CLP',
              ].map((item, i) => (
                <Box component="li" key={i} sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: TEXT_MUTED }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              El análisis muestra que el Wallbox cuesta igual o menos en 3 años incluso contando
              su inversión inicial. Sumando la mayor velocidad de carga, la protección de la batería
              y la eliminación del riesgo eléctrico, la decisión de instalar un Wallbox es clara para
              cualquier usuario que usa su EV como vehículo principal.
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
            <Box sx={{ p: 3, borderRadius: 2, bgcolor: GRAY_BG, borderLeft: `4px solid ${TEAL}` }}>
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
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 800, color: '#fff', mb: 2 }}
            >
              Instala tu Wallbox y Carga tu Auto en la Mitad del Tiempo
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 500, mx: 'auto' }}>
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
                Cotizar Wallbox
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

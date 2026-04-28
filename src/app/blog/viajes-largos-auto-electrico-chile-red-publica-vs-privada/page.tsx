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

const SLUG = 'viajes-largos-auto-electrico-chile-red-publica-vs-privada'

export const metadata: Metadata = {
  title: 'Viajes largos en auto eléctrico por Chile: Planificación 2025',
  description:
    'Cómo planificar viajes interurbanos en auto eléctrico en Chile 2025. Red de carga pública, app de rutas, ansiedad de rango y por qué la carga en casa es la base.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Viajes largos en auto eléctrico por Chile: Planificación 2025',
    description:
      'Guía práctica para planificar viajes interurbanos en EV por Chile: red pública Copec Voltex, Enel X, Zunder, Tesla Supercharger. Corredores Santiago-Valparaíso, Concepción y La Serena.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Planificación de viajes largos en auto eléctrico por Chile 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viajes largos en auto eléctrico por Chile: Planificación 2025',
    description:
      'Red de carga pública en Chile, corredores clave y estrategia de carga en casa para viajes interurbanos en EV.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Viajes Largos en Auto Eléctrico por Chile: Planificación 2025',
  description:
    'Guía completa para planificar viajes interurbanos en vehículo eléctrico en Chile. Análisis de los corredores clave, red de carga pública, gestión de la ansiedad de rango y estrategia de carga domiciliaria.',
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
      name: '¿Es posible viajar de Santiago a Concepción en auto eléctrico en 2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El corredor Santiago-Concepción (aproximadamente 500 km por la Ruta 5 Sur) es viable en 2025 para la mayoría de los autos eléctricos con autonomía de 300 km o más. Necesitarás al menos una parada de carga rápida DC (CCS2 o CHAdeMO) en la zona de Chillán o Los Ángeles. La red de Copec Voltex y Enel X Way tiene cargadores rápidos de 50–150 kW distribuidos a lo largo de la Ruta 5 Sur. El tiempo de parada es de 20–35 minutos para cargar del 20% al 80%. Se recomienda usar la app ABetterRoutePlanner para calcular la ruta optimizada con todas las paradas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta cargar el auto en un cargador público rápido DC en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los cargadores rápidos DC públicos en Chile (Copec Voltex, Enel X Way) cobran entre $200 y $350 CLP por kWh, dependiendo del proveedor y la velocidad del cargador. Para un vehículo con consumo de 20 kWh/100 km, cargar 100 km de autonomía cuesta entre $4.000 y $7.000 CLP. En contraste, la misma distancia recargada en casa con tarifa nocturna cuesta entre $1.500 y $2.800 CLP. La carga pública rápida es entre 2 y 3 veces más cara que la carga en casa, pero sigue siendo más barata que la gasolina (que cuesta $14.000–$18.000 CLP por 100 km en un vehículo convencional).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo cargo mi auto eléctrico cuando me quedo en un hotel en viaje largo por Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada vez más hoteles en Chile instalan enchufes Tipo 2 o cargadores Mode 3 en sus estacionamientos, especialmente en la red de hoteles de cadenas internacionales en las principales ciudades de la Ruta 5. Si el hotel no tiene cargador dedicado, muchos tienen enchufes industriales trifásicos (32 A) en sus estacionamientos para vehículos de servicio, que con el cable Mode 2 de tu vehículo pueden entregar 3,5–7 kW. Una noche de carga a 7 kW entrega unos 63 kWh, suficiente para reponer la batería completa de la mayoría de los autos eléctricos. Busca hoteles con carga EV en PlugShare antes de reservar.',
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
      name: 'Viajes Largos en Auto Eléctrico por Chile: Planificación 2025',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const corridors = [
  {
    ruta: 'Santiago – Valparaíso',
    distancia: '130 km',
    paradaCarga: 'No necesaria',
    tiempoCarga: '—',
    cargadoresEnRuta: 'Varios en Viña del Mar',
    dificultad: 'Fácil',
  },
  {
    ruta: 'Santiago – La Serena',
    distancia: '470 km',
    paradaCarga: '1 parada (Illapel o Ovalle)',
    tiempoCarga: '20–30 min',
    cargadoresEnRuta: 'Copec Voltex en Illapel',
    dificultad: 'Media',
  },
  {
    ruta: 'Santiago – Concepción',
    distancia: '500 km',
    paradaCarga: '1 parada (Chillán o Los Ángeles)',
    tiempoCarga: '25–35 min',
    cargadoresEnRuta: 'Copec Voltex / Enel X',
    dificultad: 'Media',
  },
  {
    ruta: 'Santiago – Puerto Montt',
    distancia: '1.000 km',
    paradaCarga: '2–3 paradas',
    tiempoCarga: '20–30 min c/u',
    cargadoresEnRuta: 'Ruta 5 Sur (cobertura parcial)',
    dificultad: 'Alta',
  },
  {
    ruta: 'Santiago – Calama',
    distancia: '1.600 km',
    paradaCarga: '4–5 paradas',
    tiempoCarga: '20–30 min c/u',
    cargadoresEnRuta: 'Ruta 5 Norte (cobertura limitada)',
    dificultad: 'Muy alta',
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
              Viajes Largos en Auto Eléctrico por Chile: Planificación 2025
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
              Chile tiene 3.000 km de largo y una red de carga pública en expansión. La clave para
              viajar sin ansiedad: salir siempre con batería al 100% desde tu cargador en casa.
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
              Instalar cargador en casa →
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ bgcolor: DARK, color: '#fff', py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" textAlign="center">
              {[
                { value: '3.000 km', label: 'Extensión norte-sur de Chile (el país más largo del mundo)' },
                { value: '$3.500', label: 'Costo de carga en casa por 100 km (tarifa nocturna)' },
                { value: '$25.000', label: 'Costo de carga en público por 100 km (cargador rápido DC)' },
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
              El Desafío Geográfico de Chile para los Autos Eléctricos
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Chile tiene una geografía única en el mundo: más de 4.200 km de longitud de norte a
              sur, pero solo 177 km de ancho promedio. Esta configuración crea un país que es
              esencialmente una sola carretera larga —la Ruta 5, la autopista Panamericana— con
              ciudades intermedias separadas por decenas o cientos de kilómetros de territorio a
              veces deshabitado. Para los conductores de autos eléctricos, este paisaje geográfico
              significa que la planificación de la carga es una parte inseparable de la experiencia
              de viaje.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La buena noticia es que la red de carga pública en Chile ha crecido
              significativamente entre 2022 y 2025. Copec Voltex, la red de carga pública de
              Empresas Copec, tenía más de 200 puntos de carga rápida DC (CCS2 y CHAdeMO,
              50–150 kW) en todo Chile a inicios de 2025. Enel X Way y Zunder suman otros 100+
              puntos adicionales. La red Tesla Supercharger, que abrió sus estaciones a otros
              vehículos a nivel global, tiene puntos en Santiago, Viña del Mar y Concepción.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              La Estrategia Base: Salir Siempre con 100%
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El principio más importante para gestionar la ansiedad de rango en viajes largos es
              deceptivamente simple: cargar el auto en casa hasta el 100% la noche previa al viaje.
              Esto te da la máxima autonomía posible desde el primer kilómetro y reduce el número
              de paradas de carga en ruta. Un conductor de BYD Atto 3 (420 km WLTP, ~340 km real)
              que sale de Santiago con batería completa puede llegar a Concepción haciendo solo
              una parada de 25 minutos en la zona de Chillán. Sin cargador en casa, el mismo
              conductor debe empezar su viaje buscando un cargador público en Santiago antes de
              salir —lo que agrega entre 30 y 60 minutos al viaje.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Apps Esenciales para Planificar: PlugShare y ABRP
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Dos aplicaciones son fundamentales para viajar en EV por Chile. PlugShare es el
              mapa colaborativo global de puntos de carga: los usuarios reportan el estado real
              de los cargadores (funcionando, fuera de servicio, ocupado) y añaden fotos y
              comentarios. ABetterRoutePlanner (ABRP) es la aplicación de planificación de rutas
              más avanzada: integra el perfil de tu vehículo específico, el estado de carga
              actual, las condiciones climáticas y el tráfico para calcular la ruta óptima con
              todas las paradas necesarias y el tiempo de cada parada. Ambas son gratuitas y
              disponibles para iOS y Android.
            </Typography>
          </Container>
        </Box>

        {/* Corridors table */}
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
              Corredores Clave: Planificación por Ruta
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: TEXT_MUTED, mb: 5, textAlign: 'center' }}
            >
              Referencia para vehículo con 300–420 km de autonomía real (BYD Atto 3, MG4, Hyundai Ioniq 5)
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
                    <th>Ruta</th>
                    <th>Distancia</th>
                    <th>Paradas de carga</th>
                    <th>Tiempo de carga</th>
                    <th>Cargadores en ruta</th>
                    <th>Dificultad</th>
                  </tr>
                </thead>
                <tbody>
                  {corridors.map((row) => (
                    <tr key={row.ruta}>
                      <td style={{ fontWeight: 600 }}>{row.ruta}</td>
                      <td>{row.distancia}</td>
                      <td>{row.paradaCarga}</td>
                      <td>{row.tiempoCarga}</td>
                      <td>{row.cargadoresEnRuta}</td>
                      <td>{row.dificultad}</td>
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
              Red de Carga Pública en Chile: Estado 2025
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Chile tiene la red de carga pública más desarrollada de Latinoamérica en 2025.
              Los principales operadores son Copec Voltex (líder en carga rápida DC por la Ruta 5),
              Enel X Way (concentrado en Santiago y ciudades grandes), Zunder (cargadores en
              autopistas urbanas y retail) y Tesla Supercharger (estaciones propias abiertas a
              todos los vehículos CCS2 en Santiago, Viña del Mar y Concepción).
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Copec Voltex: El Backbone de la Ruta 5
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Copec Voltex desplegó cargadores de 50 kW y 120 kW CCS2/CHAdeMO en sus estaciones de
              servicio a lo largo de la Ruta 5 Norte y Sur. El espaciado entre cargadores en el
              tramo Santiago-Temuco (700 km) es de entre 80 y 120 km —dentro del alcance de
              cualquier EV moderno con autonomía superior a 200 km. El costo de carga en Copec
              Voltex en 2025 varía entre $210 y $290 CLP/kWh, con opción de pago con tarjeta de
              crédito, débito o la app Voltex. No se necesita suscripción previa.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Zonas con Cobertura Limitada: Norte Grande y Patagonia
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El tramo de la Ruta 5 Norte entre Antofagasta y Arica (700 km) tiene cobertura de
              carga pública rápida muy limitada en 2025. Las distancias entre ciudades con
              cargadores disponibles pueden superar los 300 km, lo que hace inviable el trayecto
              para autos eléctricos con autonomía inferior a 400 km sin planificación especial
              (por ejemplo, usando hoteles con enchufes o cargadores de baja potencia en
              ciudades intermedias). La Patagonia (sur de Puerto Montt) tiene cobertura nula
              de carga rápida pública, aunque la situación está mejorando gradualmente.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Ansiedad de Rango: Cómo Suprarla con Datos
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              La ansiedad de rango —el miedo a quedarse sin batería en ruta— es una preocupación
              psicológica más que técnica para la mayoría de los viajes en Chile. Los estudios de
              comportamiento de conductores EV muestran que el 95% de los viajes que realizan los
              propietarios de autos eléctricos en Chile son de menos de 100 km —distancias
              perfectamente cubiertas por cualquier EV moderno con una sola carga domiciliaria
              nocturna. Para los viajes largos, la planificación con ABRP elimina la incertidumbre:
              la app calcula exactamente cuándo y dónde parar, cuánto cargar y el tiempo que
              tomará, con un margen de error típico inferior al 10%.
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
              Por Qué el Cargador en Casa Es la Base de Todo
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El 80–90% de la carga de un auto eléctrico ocurre en casa, según datos consistentes
              de todos los mercados EV maduros (Noruega, Países Bajos, California). Chile no
              es la excepción. Tener un Wallbox instalado en casa —con certificado TE6 emitido
              por instalador SEC autorizado— transforma la experiencia del auto eléctrico:
              el conductor nunca busca una gasolinera, nunca piensa en la autonomía en el
              contexto de su vida cotidiana. El auto amanece siempre cargado.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La diferencia de costo entre cargar en casa y cargar en público es sustancial.
              Con un Wallbox de 7,4 kW y tarifa nocturna (~$80 CLP/kWh), recargar 100 km de
              autonomía cuesta aproximadamente $1.600–$2.400 CLP. En un cargador público rápido
              DC (~$250 CLP/kWh), los mismos 100 km cuestan $5.000–$7.000 CLP. A lo largo de
              un año, para un conductor que recorre 15.000 km, la diferencia es de $50.000–
              $80.000 CLP solo en costo de electricidad entre cargar en casa vs. cargar exclusivamente
              en público.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Hoteles con Carga EV: La Lista que Crece
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              En 2025, los hoteles de las principales cadenas en Chile (Marriott, Hilton, Accor,
              Enjoy) han comenzado a instalar cargadores Mode 3 Tipo 2 en sus estacionamientos.
              Esta tendencia es especialmente visible en las ciudades de la Ruta 5 Sur (Chillán,
              Temuco, Osorno, Puerto Montt). Una noche de hotel con cargador disponible significa
              llegar al destino con la batería casi vacía y salir al día siguiente con el 100%.
              Antes de reservar, verifica en PlugShare si el hotel específico tiene carga disponible
              —muchos usuarios reportan incluso el tipo de conector y la potencia disponible.
            </Typography>
          </Container>
        </Box>

        {/* FAQ */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
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
                  bgcolor: GRAY_BG,
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
        <Box sx={{ py: 5, bgcolor: GRAY_BG }}>
          <Container maxWidth="md">
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: '#fff',
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
              Instala tu Cargador en Casa y Viaja sin Ansiedad
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 480, mx: 'auto' }}>
              Sal siempre con batería al 100%. Técnicos SEC certificados. Certificado TE6
              incluido. Desde{' '}
              <strong style={{ color: '#fff' }}>$159.000</strong>.
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

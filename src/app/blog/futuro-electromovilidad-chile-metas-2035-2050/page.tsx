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

const SLUG = 'futuro-electromovilidad-chile-metas-2035-2050'

export const metadata: Metadata = {
  title: 'Chile 2035: El fin de los autos a gasolina y cómo prepararse',
  description:
    'La Estrategia Nacional de Electromovilidad de Chile: meta 2035 para vehículos cero emisiones, carbono neutralidad 2050. Cómo prepararse hoy con Enérgica City.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Chile 2035: El fin de los autos a gasolina y cómo prepararse',
    description:
      'La Estrategia Nacional de Electromovilidad: 2035 (100% vehículos livianos cero emisión), 2040 buses, 2045 camiones, 2050 carbono neutro. Litio, solar y la transición de Enérgica City.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Chile 2035: Estrategia Nacional de Electromovilidad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chile 2035: El fin de los autos a gasolina y cómo prepararse',
    description:
      'Chile tiene el 40% del litio mundial, 50%+ de electricidad renovable y una meta 2035 de cero emisiones en vehículos nuevos. La transición eléctrica ya comenzó.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Chile 2035: El Fin de los Autos a Gasolina y Cómo Prepararse',
  description:
    'Análisis completo de la Estrategia Nacional de Electromovilidad de Chile: metas 2035 y 2050, ventajas competitivas del país (litio, solar, red eléctrica limpia), acuerdo público-privado y pasos para que empresas y hogares se preparen hoy.',
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
      name: '¿Qué significa exactamente la meta 2035 de electromovilidad de Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La meta 2035 de la Estrategia Nacional de Electromovilidad de Chile establece que el 100% de los vehículos livianos nuevos (autos particulares y SUV) que se vendan en Chile a partir del año 2035 deben ser de cero emisiones directas (vehículos eléctricos puros BEV o vehículos de hidrógeno FCEV). No implica que los vehículos a gasolina ya existentes deban retirarse de circulación. Para los vehículos medianos y buses, la meta es 2040. Para camiones y vehículos pesados, es 2045.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué Chile tiene ventaja competitiva en la transición eléctrica a nivel global?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chile tiene tres ventajas estructurales únicas en el mundo para la transición eléctrica. Primero, el 40% de las reservas mundiales de litio están en el Salar de Atacama (Codelco y SQM son los principales exportadores). Segundo, el Desierto de Atacama tiene la irradiación solar más alta del planeta, lo que hace que la energía solar sea la más barata del mundo en esa zona. Tercero, la matriz eléctrica ya supera el 50% de energías renovables (hidro, solar, eólica) y sigue creciendo, lo que hace que los vehículos eléctricos en Chile tengan una huella de carbono real entre 3 y 5 veces menor que un vehículo a gasolina equivalente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué deben hacer las empresas hoy para prepararse para la meta 2035?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las empresas con flotas de vehículos tienen tres acciones prioritarias. Primera: auditar la capacidad eléctrica de sus instalaciones para estimar cuántos cargadores pueden soportar hoy y qué ampliaciones serán necesarias. Segunda: comenzar la transición gradual reemplazando los primeros 2–5 vehículos con EV y construyendo la infraestructura de carga inicial, lo que genera experiencia operacional antes de que la transición sea obligatoria. Tercera: aprovechar los beneficios tributarios de la Ley 21.505 y la depreciación acelerada ahora, mientras están vigentes. Enérgica City ofrece una auditoría de electromovilidad gratuita para empresas.',
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
      name: 'Chile 2035: El Fin de los Autos a Gasolina y Cómo Prepararse',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const timeline = [
  {
    anio: '2024',
    hito: '~15.000 nuevos EV registrados',
    detalle: 'Crecimiento 100% interanual. Marcas chinas lideran con +60% del mercado EV.',
  },
  {
    anio: '2030',
    hito: 'Meta: 30% de ventas nuevas EV',
    detalle: 'Compromiso intermedio del Acuerdo Público-Privado por la Electromovilidad con Ministerio de Energía.',
  },
  {
    anio: '2035',
    hito: '100% ventas nuevas cero emisiones (vehículos livianos)',
    detalle: 'Meta de la Estrategia Nacional de Electromovilidad. Fin de la venta de autos nuevos a gasolina y diésel.',
  },
  {
    anio: '2040',
    hito: '100% buses nuevos cero emisiones',
    detalle: 'Red de transporte público urbano completamente electrificada. Transantiago/RED en transición desde 2021.',
  },
  {
    anio: '2045',
    hito: '100% camiones nuevos cero emisiones',
    detalle: 'Flota de carga terrestre electrificada. Codelco, BHP y Antofagasta Minerals ya pilotan camiones EV en minería.',
  },
  {
    anio: '2050',
    hito: 'Carbono neutralidad',
    detalle: 'Compromiso de Chile ante el Acuerdo de París. Meta de emisiones netas cero en toda la economía.',
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
              Chile 2035: El Fin de los Autos a Gasolina y Cómo Prepararse
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
              En 2035, Chile dejará de vender autos nuevos a gasolina. El 40% del litio mundial
              está en el Atacama. La transición eléctrica no es una posibilidad: es política de
              Estado. Te explicamos el mapa completo.
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
              Prepárate hoy →
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ bgcolor: DARK, color: '#fff', py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" textAlign="center">
              {[
                { value: '2035', label: 'Meta: 100% de autos nuevos cero emisiones en Chile' },
                { value: '40%', label: 'Del litio mundial está en el Salar de Atacama' },
                { value: '50%+', label: 'Electricidad chilena ya proviene de fuentes renovables' },
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
              La Estrategia Nacional de Electromovilidad de Chile: El Mapa Completo
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Ministerio de Energía de Chile publicó su Estrategia Nacional de Electromovilidad
              en 2017 y la actualizó en 2021 y 2023. El documento establece metas escalonadas de
              descarbonización del transporte: 100% de vehículos livianos nuevos cero emisiones
              al 2035, 100% de buses nuevos al 2040, 100% de camiones nuevos al 2045, y carbono
              neutralidad general de la economía al 2050. Estas metas están respaldadas por
              compromisos de Chile ante el Acuerdo de París (COP21) y el Plan de Acción Nacional
              de Cambio Climático.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Para el transporte público, Chile ya lleva varios años avanzando: la flota RED
              (exTransantiago) de Santiago tiene más de 1.000 buses eléctricos en operación
              comercial al 2024, lo que la convierte en la segunda flota de buses eléctricos
              urbanos más grande de Latinoamérica, después de São Paulo. Los buses operan con
              baterías de hasta 300 kWh cargadas durante la noche en los terminales, donde
              Enérgica City y otras empresas han instalado sistemas de carga masiva.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              El Acuerdo Público-Privado por la Electromovilidad
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              En 2022, el Ministerio de Energía formalizó el Acuerdo Público-Privado por la
              Electromovilidad, firmado por más de 80 empresas y organizaciones del sector
              privado. Los signatarios se comprometieron a electrificar gradualmente sus flotas
              y a invertir en infraestructura de carga. Entre los compromisos concretos: Copec
              comprometió 400 puntos de carga rápida para 2025 (cumplido); Enel comprometió
              100 cargadores urbanos adicionales; y el sector inmobiliario se comprometió a
              incluir preinstalación de carga EV en todos los proyectos nuevos a partir de 2023.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              2024: El Año del Quiebre en el Mercado EV Chileno
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              El año 2024 marcó un punto de inflexión en el mercado de vehículos eléctricos
              en Chile. Las ventas de EV crecieron aproximadamente un 100% respecto a 2023,
              alcanzando alrededor de 15.000 unidades nuevas. Este crecimiento fue impulsado
              por la entrada de modelos más asequibles de marcas chinas (BYD Dolphin por bajo
              los $20.000.000 CLP) y por la maduración de la red de carga pública. Chile pasó
              de tener el 0,5% del mercado automotriz en EV en 2022 al 3–4% en 2024.
              A modo de referencia, Noruega —el país más avanzado en electromovilidad del mundo—
              alcanzó el 4% de participación EV en 2014, diez años antes que su meta de
              electrificación total.
            </Typography>
          </Container>
        </Box>

        {/* Timeline */}
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
              Hoja de Ruta: Chile Eléctrico 2024–2050
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: TEXT_MUTED, mb: 6, textAlign: 'center' }}
            >
              Metas oficiales de la Estrategia Nacional de Electromovilidad y el Acuerdo de París
            </Typography>
            <Box sx={{ position: 'relative' }}>
              {timeline.map((item, i) => (
                <Box
                  key={item.anio}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    mb: 4,
                    alignItems: 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      minWidth: 72,
                      height: 72,
                      borderRadius: '50%',
                      bgcolor: i === 0 ? TEAL : i === 2 ? PINK : DARK,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '1rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.anio}
                  </Box>
                  <Box sx={{ pt: 1 }}>
                    <Typography variant="h3" sx={{ fontSize: '1rem', fontWeight: 700, mb: 0.5, color: DARK }}>
                      {item.hito}
                    </Typography>
                    <Typography variant="body2" sx={{ color: TEXT_MUTED, lineHeight: 1.7 }}>
                      {item.detalle}
                    </Typography>
                  </Box>
                </Box>
              ))}
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
              Las Ventajas Estructurales de Chile para la Electromovilidad
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Chile no está adoptando la electromovilidad solo por presión climática global:
              tiene ventajas competitivas estructurales que hacen de la transición eléctrica
              una oportunidad económica extraordinaria para el país.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              El Litio del Atacama: 40% de las Reservas Mundiales
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Salar de Atacama contiene las mayores reservas de litio del mundo: se estima
              que Chile posee el 40% del litio total recuperable del planeta. El litio es el
              elemento central de las baterías de iones de litio que alimentan todos los
              vehículos eléctricos modernos. SQM (Sociedad Química y Minera de Chile) y Codelco
              son los dos principales productores mundiales de litio. En 2023, el presidente
              Boric anunció la Política Nacional del Litio, que busca que Chile no solo exporte
              el mineral en bruto sino que desarrolle toda la cadena de valor: extracción,
              procesamiento, manufactura de celdas y montaje de baterías dentro del país.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Energía Solar: La Más Barata del Mundo en el Atacama
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Desierto de Atacama recibe más irradiación solar por metro cuadrado que
              cualquier otro lugar del mundo: hasta 3.500 kWh/m² al año, frente a los
              1.200–1.500 kWh/m² típicos de Europa Central. Esto se traduce en el costo de
              generación solar más bajo del planeta: en algunas licitaciones eléctricas
              chilenas, el precio de la energía solar ha llegado a $17 USD/MWh, el registro
              más bajo de la historia en cualquier tecnología de generación. Para los
              vehículos eléctricos, esta energía ultra barata significa que cargar un auto
              en Chile puede costar literalmente menos que en cualquier otro país del mundo
              en términos de costo de generación.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Una Matriz Eléctrica Cada Vez Más Limpia
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Más del 50% de la electricidad generada en Chile en 2024 proviene de fuentes
              renovables: hidráulica (principalmente en el sur del país), solar (norte y
              región de Atacama) y eólica. Esta proporción sigue creciendo con nuevos
              proyectos de energía solar y eólica que entran en operación cada año. Un
              vehículo eléctrico cargado en Chile tiene una huella de carbono de ciclo de
              vida entre 3 y 5 veces menor que un vehículo a gasolina equivalente, y esta
              diferencia seguirá ampliándose a medida que la matriz sea más limpia.
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
              La Minería Lidera: Codelco, BHP y Antofagasta Minerals
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El sector minero chileno —el más intensivo en energía y emisiones del país— está
              liderando la adopción de vehículos eléctricos en los segmentos más desafiantes:
              camiones de extracción, maquinaria de movimiento de tierra y flotas de servicio
              en faenas a más de 4.000 metros de altitud. Codelco pilota camiones eléctricos
              de extracción en la mina El Teniente (Chile central). BHP Escondida y Antofagasta
              Minerals están probando vehículos eléctricos medianos en sus operaciones del
              desierto de Atacama. La adopción en minería es estratégica: el sector consume
              el 35% de la energía total de Chile y sus compromisos de descarbonización son
              vinculantes con los contratos de suministro eléctrico firmados bajo el esquema
              de energías renovables.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              El Desafío del Norte Grande: Altitud y Temperaturas Extremas
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Los vehículos eléctricos presentan desafíos específicos en las condiciones de
              la minería del Norte Grande: altitudes superiores a 4.000 metros sobre el nivel
              del mar (donde la temperatura puede caer a -20°C durante la noche) y polvo
              extremo. Las baterías de litio reducen su capacidad efectiva entre un 15 y un
              25% en temperaturas muy bajas. Los fabricantes están desarrollando sistemas de
              gestión térmica activa para las baterías en estas condiciones. Enérgica City
              trabaja con los principales equipos de ingeniería minera para diseñar sistemas
              de carga que funcionen correctamente bajo estas condiciones extremas.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              El Papel de Enérgica City en la Transición
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Enérgica City es parte activa del Acuerdo Público-Privado por la Electromovilidad
              del Ministerio de Energía. Nuestras herramientas tecnológicas —la plataforma EVE
              para gestión de carga en edificios y la herramienta GRETA para simulación de
              transición energética de flotas— son usadas tanto por administradores de edificios
              residenciales en Santiago como por empresas de logística y minería en regiones.
              La certificación SEC de todos nuestros instaladores garantiza que cada instalación
              cumple con la normativa NCh Elec. 4/2003 y contribuye a la red eléctrica de Chile
              de forma segura y documentada.
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
              Cómo Prepararse para 2035: Guía Práctica para Hogares y Empresas
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La meta 2035 parece lejana, pero la preparación técnica y financiera debe
              comenzar hoy. Quienes instalen infraestructura de carga ahora se benefician de
              los incentivos tributarios vigentes y construyen know-how operacional que tendrá
              valor creciente a medida que más vehículos se electrifiquen.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Para Propietarios de Casas: Preinstalación de Carga
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Si estás remodelando tu casa o construyendo una nueva, es el momento ideal para
              instalar la infraestructura de carga aunque aún no tengas un auto eléctrico. El
              costo de preinstalar el circuito dedicado, el tubo conduit y las protecciones
              en el tablero durante una remodelación es mucho menor que hacer la obra después:
              entre $80.000 y $120.000 CLP por la preinstalación, frente a $159.000–$200.000
              CLP si se hace como obra independiente. Cuando compres tu primer EV, solo
              necesitarás conectar el Wallbox al circuito existente.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Para Edificios: Pre-diseño de Infraestructura Escalable
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Los edificios residenciales que aún no tienen cargadores deben comenzar por
              contratar una auditoría eléctrica para determinar la capacidad disponible de
              su transformador y su tablero general. Esta auditoría (gratuita con Enérgica
              City) identifica cuántos cargadores puede soportar el edificio hoy y qué
              ampliaciones serían necesarias para escalar. La planificación temprana evita
              la situación de 2028–2032, cuando la demanda de carga en edificios será masiva
              y los tiempos de obra y los costos de materiales serán significativamente mayores.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Para Empresas: Electrificación Gradual de Flota
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Las empresas deben comenzar con un piloto de 2–5 vehículos eléctricos en los
              segmentos de mayor kilometraje (vendedores, distribución urbana, ejecutivos).
              Este piloto genera datos reales de consumo, costos operacionales y satisfacción
              de los conductores, además de desarrollar las competencias internas para gestionar
              la carga. La Ley 21.505 hace que el costo financiero del primer piloto sea
              especialmente bajo: la infraestructura se deprecia 100% en año 1 y el IVA
              es recuperable. El ROI positivo del piloto justifica la expansión progresiva
              de la flota eléctrica hasta alcanzar el 100% antes de que sea obligatorio.
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
              Enérgica City: tu Socio en la Transición Eléctrica
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 480, mx: 'auto' }}>
              Instalación certificada SEC, plataforma EVE para edificios, simulación GRETA
              para flotas. Prepárate para 2035 con la empresa líder en electromovilidad en Chile.
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

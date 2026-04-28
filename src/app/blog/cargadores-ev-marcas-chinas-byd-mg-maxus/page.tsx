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

const SLUG = 'cargadores-ev-marcas-chinas-byd-mg-maxus'

export const metadata: Metadata = {
  title: 'Cargadores para autos chinos: BYD, MG y Maxus en Chile',
  description:
    'Instalación de cargadores compatibles con BYD, MG y Maxus en Chile. Estándares CCS2 y GBT. Técnicos certificados SEC. Desde $159.000.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Cargadores para autos chinos: BYD, MG y Maxus en Chile',
    description:
      'Guía completa de carga para BYD Atto 3, BYD Dolphin, MG4 y Maxus Euniq 6. Estándares CCS2, Type 2 y GBT. Instalación SEC desde $159.000.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cargadores para autos eléctricos chinos BYD, MG y Maxus en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargadores para autos chinos: BYD, MG y Maxus en Chile',
    description:
      'BYD, MG y Maxus dominan el mercado EV chileno. Guía completa de instalación de Wallbox compatible desde $159.000.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Cargadores para Autos Chinos: BYD, MG y Maxus en Chile',
  description:
    'Guía técnica de instalación de cargadores domiciliarios para BYD Atto 3, BYD Dolphin, MG4 y Maxus Euniq 6 en Chile. Estándares CCS2, Type 2 y GBT, normativa SEC y costos.',
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
      name: '¿El BYD Atto 3 es compatible con los Wallbox vendidos en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El BYD Atto 3 usa el conector Tipo 2 (IEC 62196-2) para carga AC, el mismo estándar que la mayoría de los Wallbox disponibles en Chile. Acepta hasta 7 kW en monofásico y 11 kW en trifásico (aunque el cargador a bordo estándar está limitado a 7 kW en la mayoría de las versiones). Para carga rápida DC usa CCS2, compatible con la red Copec Voltex y Enel X. No necesitas ningún adaptador especial.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa con el estándar GBT chino? ¿Lo debo considerar al instalar un cargador?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El estándar GBT (GB/T 20234) es el sistema de carga chino que usa un conector diferente al europeo. Sin embargo, para que un vehículo eléctrico sea homologado por el MTT en Chile, debe incluir adaptador CCS2/Type 2 o venir directamente con conectores europeos. Los modelos BYD, MG y Maxus vendidos oficialmente en Chile desde 2022 ya vienen con puerto Tipo 2 para AC y CCS2 para DC. No necesitas considerar GBT para la instalación domiciliaria en Chile.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta instalar un Wallbox para BYD Dolphin en un departamento de Santiago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La instalación de un Wallbox para BYD Dolphin en un departamento de Santiago parte desde $369.000 CLP con Enérgica City. Este precio incluye el Wallbox monofásico de 7,4 kW (suficiente para la carga máxima del Dolphin), el circuito dedicado desde el medidor del propietario hasta el estacionamiento en subterráneo, las protecciones eléctricas (diferencial 30 mA y termomagnético), y el certificado TE6 emitido por instalador SEC autorizado.',
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
      name: 'Cargadores para autos chinos: BYD, MG y Maxus en Chile',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const chineseEvModels = [
  {
    marca: 'BYD Atto 3',
    bateria: '60,5 kWh',
    cargaAC: '7 kW (monofásico)',
    cargaDC: 'CCS2 hasta 80 kW',
    conectorAC: 'Tipo 2',
    autonomia: '420 km WLTP',
    wallboxRecomendado: 'Wallbox 7,4 kW monofásico',
  },
  {
    marca: 'BYD Dolphin',
    bateria: '44,9 kWh',
    cargaAC: '6,6 kW (monofásico)',
    cargaDC: 'CCS2 hasta 60 kW',
    conectorAC: 'Tipo 2',
    autonomia: '340 km WLTP',
    wallboxRecomendado: 'Wallbox 7,4 kW monofásico',
  },
  {
    marca: 'MG4 Electric',
    bateria: '51 kWh',
    cargaAC: '11 kW (trifásico)',
    cargaDC: 'CCS2 hasta 135 kW',
    conectorAC: 'Tipo 2',
    autonomia: '435 km WLTP',
    wallboxRecomendado: 'Wallbox 11 kW trifásico',
  },
  {
    marca: 'Maxus Euniq 6',
    bateria: '90 kWh',
    cargaAC: '7,2 kW (monofásico)',
    cargaDC: 'CCS2 hasta 100 kW',
    conectorAC: 'Tipo 2',
    autonomia: '480 km WLTP',
    wallboxRecomendado: 'Wallbox 7,4 kW monofásico',
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
              Cargadores para Autos Chinos: BYD, MG y Maxus en Chile
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
              En 2024, los autos eléctricos chinos representan más del 60% de las ventas EV en Chile.
              Guía completa de compatibilidad, estándares y costos de instalación para BYD, MG y Maxus.
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
                { value: '+60%', label: 'Del mercado EV chileno son marcas chinas (2024)' },
                { value: 'Tipo 2', label: 'Conector AC estándar en todos los modelos homologados MTT' },
                { value: '$159.000', label: 'Instalación Wallbox desde (casa)' },
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
              Los Autos Eléctricos Chinos Dominan Chile en 2024
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El mercado chileno de vehículos eléctricos experimentó una transformación estructural entre
              2022 y 2024. Según datos del Ministerio de Transportes y Telecomunicaciones (MTT), durante
              2024 se registraron aproximadamente 15.000 nuevos vehículos eléctricos livianos, de los
              cuales más del 60% correspondían a marcas de origen chino: BYD, MG (SAIC Motor), Maxus,
              Chery y JAC, entre otras. Este fenómeno no es casual: los fabricantes chinos llevan más
              de una década invirtiendo masivamente en tecnología de baterías de iones de litio y han
              logrado reducir el costo de manufactura a niveles que los fabricantes europeos y japoneses
              aún no pueden igualar.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Los cuatro modelos más vendidos del segmento son el BYD Atto 3, el BYD Dolphin, el MG4
              Electric y el Maxus Euniq 6. Cada uno tiene especificaciones de carga distintas, lo que
              determina qué tipo de Wallbox domiciliario instalar. La buena noticia es que todos usan
              el conector Tipo 2 para carga AC, el estándar que rige en Chile.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              ¿Por Qué las Marcas Chinas Usan Tipo 2 y No GBT en Chile?
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              China tiene su propio estándar de carga eléctrica, llamado GB/T 20234 (GBT), con un
              conector físicamente diferente al europeo. Sin embargo, para que un vehículo eléctrico
              obtenga la homologación del MTT en Chile y pueda circular legalmente, debe cumplir con
              los requisitos de compatibilidad de la normativa chilena, que sigue los lineamientos de
              la regulación europea. Esto obliga a los fabricantes a equipar sus vehículos para el
              mercado latinoamericano con el conector Tipo 2 (IEC 62196-2) para carga AC y el
              conector CCS2 (Combined Charging System 2) para carga rápida DC.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              En la práctica, los BYD, MG y Maxus vendidos oficialmente en Chile desde 2022 a través
              de concesionarios autorizados ya vienen con los puertos europeos de fábrica. No existen
              adaptadores GBT que debas comprar ni configuraciones especiales. El Wallbox estándar
              Type 2 que vende cualquier proveedor en Santiago funciona directamente con estos
              vehículos.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              CCS2: El Estándar de Carga Rápida que Une Europa y China
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Para la carga rápida en corriente continua (DC), los autos eléctricos chinos vendidos
              en Chile usan el conector CCS2 (Combined Charging System 2), el mismo que usan los
              vehículos europeos como el Volkswagen ID.4, el BMW iX3 o el Volvo XC40 Recharge. Esto
              es especialmente relevante para los viajes interurbanos: los cargadores públicos de
              Copec Voltex, Enel X Way y la red de estaciones Zunder que están desplegadas en la
              Ruta 5 y en autopistas urbanas de Santiago son en su mayoría CCS2, lo que los hace
              completamente compatibles con BYD, MG y Maxus.
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
                mb: 2,
                color: DARK,
                textAlign: 'center',
              }}
            >
              Comparativa: Especificaciones de Carga de Autos Chinos en Chile
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: TEXT_MUTED, mb: 5, textAlign: 'center' }}
            >
              Modelos con homologación MTT vigente y mayor participación de mercado en 2024
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
                    <th>Modelo</th>
                    <th>Batería</th>
                    <th>Carga AC máx.</th>
                    <th>Carga DC máx.</th>
                    <th>Conector AC</th>
                    <th>Autonomía WLTP</th>
                    <th>Wallbox recomendado</th>
                  </tr>
                </thead>
                <tbody>
                  {chineseEvModels.map((row) => (
                    <tr key={row.marca}>
                      <td style={{ fontWeight: 600 }}>{row.marca}</td>
                      <td>{row.bateria}</td>
                      <td>{row.cargaAC}</td>
                      <td>{row.cargaDC}</td>
                      <td>{row.conectorAC}</td>
                      <td>{row.autonomia}</td>
                      <td>{row.wallboxRecomendado}</td>
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
              BYD Atto 3 y BYD Dolphin: Diferencias Clave para la Instalación
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El BYD Atto 3 y el BYD Dolphin son los modelos más vendidos de BYD en Chile. Aunque
              comparten la plataforma e6 de BYD y el conector Tipo 2, tienen capacidades de carga
              distintas que influyen en qué circuito eléctrico debes instalar.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              BYD Atto 3: Batería de 60,5 kWh y Carga de 7 kW
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El BYD Atto 3 tiene una batería de 60,5 kWh (neta) y un cargador a bordo (OBC) que
              acepta hasta 7 kW en corriente alterna. Esto significa que aunque instales un Wallbox
              trifásico de 11 kW, el vehículo nunca tomará más de 7 kW. Para este modelo, un
              Wallbox monofásico de 7,4 kW (32 A) es la solución más eficiente: entrega casi la
              potencia máxima que acepta el vehículo, permitiendo una carga completa desde vacío en
              aproximadamente 8,6 horas. Con tarifa nocturna, el costo de una carga completa es de
              aproximadamente $4.800–$5.500 CLP, lo que equivale a cubrir unos 420 km de autonomía.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              BYD Dolphin: La Solución Compacta y Económica
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El BYD Dolphin es el modelo más asequible del catálogo BYD en Chile. Con una batería
              de 44,9 kWh y un OBC de 6,6 kW, su carga domiciliaria se completa en aproximadamente
              6,8 horas con un Wallbox de 7,4 kW. El costo de una carga completa desde el enchufe
              domiciliario equivale a cargar unos 340 km de autonomía por menos de $4.000 CLP en
              tarifa nocturna —una fracción del costo de la gasolina para un vehículo de combustión
              equivalente.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Para ambos modelos BYD, el circuito eléctrico dedicado debe dimensionarse para un
              Wallbox monofásico de 32 A: cable de cobre de 6 mm², interruptor diferencial de 30 mA
              (tipo A o F), interruptor termomagnético de 32 A y una distancia máxima recomendada de
              20 metros desde el tablero. El certificado TE6 documenta todo el trabajo según la
              norma NCh Elec. 4/2003.
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
              MG4 y Maxus Euniq 6: Alta Potencia y Grandes Baterías
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El MG4 Electric y el Maxus Euniq 6 representan el extremo superior del segmento de
              autos chinos en Chile: más autonomía, más potencia de carga y mayor capacidad de
              batería. Sus requisitos de instalación son levemente distintos.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              MG4 Electric: El Único que Necesita Trifásico
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El MG4 Electric es el modelo con mayor potencia de carga AC entre los cuatro: su OBC
              acepta hasta 11 kW en trifásico (16 A × 3 fases). Si instalas un Wallbox monofásico
              de 7,4 kW, el MG4 se adapta, pero desaprovechas la capacidad del vehículo. Para sacar
              el máximo provecho, el MG4 requiere un Wallbox trifásico de 11 kW y un circuito
              dedicado trifásico: cable de 4 mm² o 6 mm² por fase, diferencial trifásico de 30 mA y
              termomagnético de 16 A por fase. La carga completa desde vacío tarda aproximadamente
              4,6 horas —la más rápida del grupo.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Maxus Euniq 6: La Mayor Autonomía del Grupo con 90 kWh
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Maxus Euniq 6 es un SUV familiar de 7 plazas con la batería más grande del grupo:
              90 kWh. Su OBC acepta 7,2 kW en monofásico. Con un Wallbox de 7,4 kW, la carga
              completa tarda aproximadamente 12,5 horas —ideal para carga nocturna programada. La
              gran batería le otorga hasta 480 km de autonomía WLTP, lo que en uso real en Chile
              se traduce en aproximadamente 380–400 km. Para este modelo, muchos propietarios
              optan por cargar al 80% (unos 10 horas) y reservar la carga al 100% para días de
              viaje largo.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              En Enérgica City, el 35% de los propietarios de Maxus Euniq 6 que han instalado
              Wallbox con nosotros optan por un Wallbox inteligente con programación horaria, para
              aprovechar automáticamente la tarifa nocturna de su distribuidora sin necesidad de
              recordar programar la carga manualmente cada día.
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
              Proceso de Instalación y Normativa SEC en Chile
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La instalación de un cargador para autos eléctricos en Chile, independientemente de
              la marca del vehículo, debe ser realizada por un instalador eléctrico autorizado por
              la Superintendencia de Electricidad y Combustibles (SEC). Al finalizar, el instalador
              emite el certificado TE6, que es el documento legal que acredita que la instalación
              cumple con la norma eléctrica chilena NCh Elec. 4/2003. Este certificado es
              obligatorio y te protege legalmente ante cualquier siniestro eléctrico relacionado
              con la instalación del cargador.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              ¿Cuánto Demora y Qué Incluye la Instalación?
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              En una casa particular, la instalación se completa en un día hábil: 3 a 5 horas de
              trabajo efectivo. El proceso incluye evaluación del tablero eléctrico, tendido de
              cableado en tubo conduit, instalación de protecciones eléctricas, montaje del Wallbox
              en el estacionamiento y pruebas de funcionamiento con el vehículo conectado. El precio
              de instalación en Enérgica City parte desde $159.000 CLP en casas e incluye el TE6.
              En edificios y condominios, la instalación parte desde $369.000 CLP e incluye la
              acometida desde el medidor del propietario hasta el estacionamiento en subterráneo.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Garantía del Fabricante y del Instalador
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Los Wallbox instalados por Enérgica City tienen garantía de 2 años del fabricante
              sobre el equipo y 1 año de garantía del instalador sobre la mano de obra. Es
              importante notar que instalar un Wallbox sin certificado TE6 puede invalidar la
              garantía de tu concesionario en caso de problemas eléctricos relacionados con el
              vehículo. Los concesionarios BYD, MG y Maxus en Chile recomiendan explícitamente
              que la instalación sea realizada por personal SEC autorizado.
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
              Instala tu Wallbox para BYD, MG o Maxus Hoy
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

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

const SLUG = 'instalar-cargador-auto-electrico-valparaiso-vina'

export const metadata: Metadata = {
  title: 'Instalación de cargadores EV en Valparaíso y Viña del Mar',
  description:
    'Expertos en electromovilidad para la V Región. Instalación certificada SEC de cargadores en Viña del Mar y Valparaíso. Proyectos residenciales y comerciales.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Instalación de Cargadores EV en Valparaíso y Viña del Mar',
    description:
      'Instalación certificada de cargadores para autos eléctricos en la V Región. Técnicos SEC en Valparaíso, Viña del Mar y el Gran Valparaíso.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Instalación de cargadores EV en Valparaíso y Viña del Mar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instalación de cargadores EV en Valparaíso y Viña del Mar',
    description:
      'Técnicos SEC certificados para instalación de cargadores en la V Región. Proyectos residenciales y comerciales.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Instalación de Cargadores EV en Valparaíso y Viña del Mar',
  description:
    'Guía completa para instalar un cargador de vehículo eléctrico en la V Región de Chile: condiciones locales, normativa SEC, proyectos residenciales y comerciales.',
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
      name: '¿Pueden instalar cargadores EV en Valparaíso y Viña del Mar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Enérgica City realiza instalaciones de cargadores para vehículos eléctricos en toda la V Región, incluyendo Valparaíso, Viña del Mar, Quilpué, Villa Alemana y Concón. Nuestros técnicos SEC certificados trabajan en proyectos residenciales (casas y edificios) y comerciales en la región. El proceso incluye certificado TE6 y cumplimiento de la normativa NCh Elec. 4/2003.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se requieren protecciones especiales para cargadores en zonas costeras?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. En zonas costeras como Viña del Mar, Valparaíso o Concón, la brisa marina contiene cloruro de sodio que acelera la corrosión de los componentes metálicos. Para instalaciones en estas zonas se recomienda usar Wallbox con grado de protección IP55 mínimo (preferiblemente IP65), gabinetes de acero inoxidable o plástico técnico, y conectores con tratamiento anti-corrosión. Los cables y prensaestopas también deben ser de materiales resistentes a la salinidad ambiental.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo afecta la topografía de Valparaíso a la instalación de cargadores?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los cerros de Valparaíso presentan desafíos únicos: casas antiguas con instalaciones eléctricas precarias, accesos angostos para el traslado de materiales, y tableros eléctricos frecuentemente alejados del estacionamiento. Muchas casas en cerro tienen estacionamiento en la calle o en terrazas de difícil acceso. Nuestros técnicos tienen experiencia específica en estas condiciones y diseñan soluciones adaptadas a la arquitectura porteña.',
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
      name: 'Instalación de Cargadores EV en Valparaíso y Viña del Mar',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const zonas = [
  {
    zona: 'Viña del Mar (plano)',
    desafio: 'Ambiente marino + edificios de altura',
    solucion: 'Wallbox IP65 + trazado subterráneo en edificios',
    precio: 'Desde $159.000 casas / $369.000 edificios',
  },
  {
    zona: 'Valparaíso (cerros)',
    desafio: 'Instalaciones antiguas + accesos difíciles',
    solucion: 'Evaluación ampliada de tablero + conduit protegido',
    precio: 'Desde $180.000 (evaluación ampliada)',
  },
  {
    zona: 'Concón',
    desafio: 'Alta salinidad ambiental + casas nuevas',
    solucion: 'Materiales anti-corrosión + sellado especial',
    precio: 'Desde $169.000 casas',
  },
  {
    zona: 'Quilpué / Villa Alemana',
    desafio: 'Distancia al servicio técnico',
    solucion: 'Servicio regular con técnico en zona',
    precio: 'Desde $159.000 casas',
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
              Instalación de Cargadores EV en Valparaíso y Viña del Mar
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
              La V Región lidera el crecimiento en electromovilidad fuera de Santiago. Técnicos SEC
              con experiencia en la costa: protección marina, cerros porteños y edificios en Viña.
              Instalación desde $159.000 con TE6 incluido.
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
                { value: '+200', label: 'Instalaciones en V Región' },
                { value: '4 comunas', label: 'Valparaíso, Viña, Concón, Quilpué' },
                { value: 'IP65', label: 'Protección mínima zona costera' },
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
              Por Qué la V Región Lidera la Adopción EV Fuera de Santiago
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Valparaíso y Viña del Mar concentran el segundo mayor mercado de vehículos eléctricos
              fuera de la Región Metropolitana. Las razones son múltiples: una clase profesional y
              empresarial que viaja regularmente a Santiago por la Ruta 68, un alto porcentaje de
              propietarios de vivienda (versus arrendatarios), y una sensibilidad ambiental mayor
              dado el entorno costero que se quiere preservar.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El corredor Santiago–Valparaíso (Ruta 68, 120 km) es perfectamente manejable para
              cualquier EV moderno con una carga nocturna previa. Un Volvo XC40 Recharge, un BYD
              Atto 3 o un Tesla Model 3 cubren el trayecto de ida y vuelta desde Viña del Mar hasta
              Santiago sin necesidad de cargar en el camino. La estación de carga rápida en Casablanca
              (km 62) ofrece respaldo adicional para quienes hacen el recorrido con más frecuencia o
              con EVs de menor autonomía.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              El Perfil del Propietario EV en la V Región
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Los propietarios de autos eléctricos en el Gran Valparaíso son principalmente
              profesionales del sector público (municipalidades, universidades, hospitales regionales),
              ejecutivos que trabajan en Santiago pero viven en la costa por calidad de vida, y
              empresas locales que están renovando sus flotas con EVs. También hay un segmento
              importante de turismo: hostales, hoteles boutique y paradores en Valparaíso y
              Zapallar que instalan cargadores como servicio diferenciador para sus huéspedes.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Normativa SEC en la V Región: Igual que en Todo Chile
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              La normativa que regula las instalaciones eléctricas domiciliarias en Chile es nacional:
              la NCh Elec. 4/2003 aplica en Arica tanto como en Punta Arenas. El certificado TE6 se
              emite ante la distribuidora eléctrica local, que en la V Región es principalmente CGE
              (Compañía General de Electricidad). Los instaladores deben tener credencial SEC vigente
              para la región donde trabajan. Enérgica City cuenta con técnicos habilitados para
              trabajar en la V Región y conoce los procedimientos específicos de CGE.
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
              Instalación por Zona en el Gran Valparaíso
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
                  },
                  '& tr:nth-of-type(even) td': { bgcolor: '#F1F5F9' },
                  '& tr:hover td': { bgcolor: '#E0F2FE' },
                }}
              >
                <thead>
                  <tr>
                    <th>Zona</th>
                    <th>Desafío principal</th>
                    <th>Solución técnica</th>
                    <th>Precio base</th>
                  </tr>
                </thead>
                <tbody>
                  {zonas.map((row) => (
                    <tr key={row.zona}>
                      <td style={{ fontWeight: 600 }}>{row.zona}</td>
                      <td style={{ color: TEXT_MUTED }}>{row.desafio}</td>
                      <td>{row.solucion}</td>
                      <td style={{ color: TEAL, fontWeight: 700 }}>{row.precio}</td>
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
              Desafíos Técnicos Específicos del Ambiente Costero
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Instalar un cargador EV en Viña del Mar, Valparaíso o Concón exige considerar
              factores que no son relevantes en ciudades del interior. El ambiente marino —con brisa
              salina presente prácticamente todo el año— genera condiciones de corrosión acelerada
              en componentes metálicos expuestos. Ignorar esto resulta en equipos que fallan en
              18–24 meses versus los 10+ años de vida útil esperada.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Protección IP: Por Qué IP55 No es Suficiente en la Costa
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El grado de protección IP (Ingress Protection) indica la resistencia del equipo ante
              polvo y agua. Un Wallbox IP44 resiste salpicaduras de agua desde cualquier dirección,
              suficiente para interiores cubiertos en el interior del país. En zonas costeras, sin
              embargo, la humedad salina penetra por grietas microscópicas y la niebla marina puede
              generar condensación dentro de gabinetes IP44. Recomendamos IP55 como mínimo (protección
              ante chorros de agua) e IP65 (protección ante polvo total y chorros directos) para
              instalaciones en exteriores o en estacionamientos que no tienen cierre completo.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Materiales y Prensaestopas Anti-Corrosión
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Las conexiones de entrada de cable al Wallbox (prensaestopas) son puntos críticos.
              En ambientes marinos se recomienda usar prensaestopas de nylon o polipropileno en
              lugar de los metálicos estándar. Los tornillos de fijación del equipo deben ser de
              acero inoxidable 316 (no 304). El conduit de protección del cable exterior debe ser de
              PVC resistente a UV. Estos cambios de material tienen un costo adicional marginal
              ($5.000–$10.000 por instalación) pero multiplican la vida útil del sistema en
              ambientes costeros.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Instalaciones en los Cerros de Valparaíso
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Los cerros de Valparaíso presentan un desafío adicional: la arquitectura histórica.
              Muchas casas del patrimonio porteño tienen instalaciones eléctricas de los años 1960–80,
              con cableado de aluminio (reemplazado por cobre en las actualizaciones) o tableros de
              baja capacidad (40 A o menos). Antes de instalar un Wallbox en estos hogares, se
              requiere una evaluación eléctrica completa. En varios proyectos que hemos realizado en
              los cerros Alegre, Concepción y Bellavista, fue necesario reemplazar el tablero
              eléctrico como condición previa, lo cual se cotiza por separado ($100.000–$250.000
              según el caso).
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
              Proyectos Comerciales en la V Región: Hoteles, Oficinas y Flotas
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El turismo en Valparaíso y Viña del Mar es un motor creciente para la instalación de
              cargadores comerciales. Los hoteles boutique del barrio puerto, los resorts en Reñaca
              y los paradores en Zapallar y Papudo están instalando puntos de carga como atractivo
              diferenciador. Un huésped con auto eléctrico que llega desde Santiago con un 30% de
              batería agradece —y a menudo busca activamente— alojamientos con carga disponible.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Para proyectos comerciales de 2 o más puntos de carga, Enérgica City diseña la
              infraestructura desde el tablero general del establecimiento, incluyendo gestión de
              carga (load balancing) para que múltiples EVs carguen simultáneamente sin superar la
              potencia contratada. Esta solución es especialmente relevante para hoteles con
              estacionamiento propio o empresas con flota de vehículos eléctricos.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Corredor Ruta 68: Santiago–Valparaíso en Eléctrico
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Con carga nocturna en casa, el viaje Santiago–Valparaíso es rutinario para cualquier
              EV con más de 200 km de autonomía. La estación de carga rápida de COPEC Voltex en
              Casablanca (km 62 de la Ruta 68) ofrece puntos CCS2 de 50 kW para quienes necesitan
              refuerzo en el camino. Para conductores que hacen el trayecto de ida y vuelta 2 o más
              veces por semana (160–200 km diarios), la carga nocturna en casa es perfectamente
              suficiente con un Wallbox de 7,4 kW. El costo del trayecto ida-vuelta en electricidad
              nocturna es de aproximadamente $800–$1.200 CLP versus $10.000–$15.000 CLP en
              combustible con un vehículo equivalente a gasolina.
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
            <Box sx={{ p: 3, borderRadius: 2, bgcolor: '#fff', borderLeft: `4px solid ${TEAL}` }}>
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
              Instala tu Cargador EV en Valparaíso o Viña del Mar
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 500, mx: 'auto' }}>
              Técnicos SEC certificados en la V Región. Protección marina, cerros y edificios.
              Instalación desde <strong style={{ color: '#fff' }}>$159.000</strong> con TE6 incluido.
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

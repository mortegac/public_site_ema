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

const SLUG = 'presupuesto-instalacion-cargador-electrico-desglose'

export const metadata: Metadata = {
  title: 'Presupuesto para instalar cargador eléctrico: ¿Qué pagas realmente?',
  description:
    'Desglose transparente del costo de instalación de cargador EV en Chile: desde $159.000 en casas y $369.000 en edificios. Qué incluye: protecciones, tablero, TE6.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Presupuesto para Instalar Cargador Eléctrico: ¿Qué Pagas Realmente?',
    description:
      'Desglose completo de costos de instalación de cargador EV en Chile. Lo que incluye, lo que puede encarecer el precio y cómo evitar sorpresas.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Presupuesto instalación cargador eléctrico Chile desglose de costos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Presupuesto para instalar cargador eléctrico: ¿Qué pagas realmente?',
    description:
      'Desglose transparente de costos. Instalación cargador EV desde $159.000 en casas con TE6 incluido.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Presupuesto para Instalar un Cargador Eléctrico: ¿Qué Pagas Realmente?',
  description:
    'Desglose detallado y transparente del presupuesto para instalar un cargador EV en Chile: materiales, mano de obra, protecciones y certificado TE6.',
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
      name: '¿Cuánto cuesta instalar un cargador de auto eléctrico en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La instalación básica de un cargador EV (Wallbox) en una casa en Chile parte desde $159.000 CLP e incluye el circuito dedicado, protecciones eléctricas, materiales de canalización, montaje del Wallbox y certificado TE6. En edificios o departamentos, el precio base es de $369.000 CLP por la mayor complejidad del trazado eléctrico desde el medidor individual hasta el estacionamiento.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué está incluido en el precio de instalación de un Wallbox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una instalación completa incluye: visita técnica, diseño del circuito, interruptor diferencial (30 mA), interruptor termomagnético (16–32 A), cable de cobre 4–6 mm², tubo conduit de protección, caja de paso si se requiere, montaje del Wallbox en la pared, pruebas de funcionamiento y certificado TE6 emitido ante la SEC. El Wallbox en sí puede incluirse o cotizarse por separado según el modelo elegido.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué la instalación en edificio es más cara que en casa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En un edificio el cable debe recorrer desde el gabinete de medidores individuales (frecuentemente en el primer piso o subterráneo) hasta el estacionamiento del propietario, que puede estar en el subterráneo 2 o 3. Esto implica mayor metraje de cable, tubo conduit y horas de mano de obra. Además pueden requerirse permisos adicionales de la administración, coordinación con otros propietarios para el paso por ductos y en algunos casos la instalación de un medidor de subcontaje.',
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
      name: 'Presupuesto para Instalar un Cargador Eléctrico: ¿Qué Pagas Realmente?',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const houseCostItems = [
  { item: 'Visita técnica y diseño de circuito', costo: 'Incluida', nota: 'Sin costo adicional' },
  { item: 'Interruptor diferencial 30 mA tipo A', costo: '$15.000–$25.000', nota: 'Protección ante corrientes de fuga' },
  { item: 'Termomagnético 32 A', costo: '$8.000–$12.000', nota: 'Protección de sobrecarga' },
  { item: 'Cable cobre 6 mm² (por metro)', costo: '$2.500–$3.500/m', nota: 'Hasta 20 m incluidos' },
  { item: 'Tubo conduit + accesorios', costo: '$12.000–$20.000', nota: 'Según metraje del trazado' },
  { item: 'Mano de obra instalación', costo: '$60.000–$90.000', nota: 'Instalador SEC certificado' },
  { item: 'Certificado TE6 + trámite SEC', costo: '$25.000–$35.000', nota: 'Obligatorio por ley' },
  { item: 'Wallbox básico (incluible)', costo: 'Desde $120.000', nota: 'Modelo según presupuesto' },
]

const pricingFactors = [
  { factor: 'Distancia tablero > 20 m', impacto: '+$30.000–$80.000', descripcion: 'Cable adicional + caída de tensión' },
  { factor: 'Tablero eléctrico antiguo', impacto: '+$80.000–$200.000', descripcion: 'Reemplazo o ampliación requerida' },
  { factor: 'Estacionamiento subterráneo', impacto: '+$50.000–$150.000', descripcion: 'Trazado vertical + conduit empotrado' },
  { factor: 'Muros de hormigón armado', impacto: '+$20.000–$50.000', descripcion: 'Canalización especial' },
  { factor: 'Medidor de subcontaje', impacto: '+$60.000–$90.000', descripcion: 'Para edificios con tarifa separada' },
  { factor: 'Wallbox con WiFi/app', impacto: '+$50.000–$150.000', descripcion: 'Modelos premium con conectividad' },
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
              Presupuesto para Instalar un Cargador Eléctrico: ¿Qué Pagas Realmente?
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
              Desglose ítem por ítem de lo que incluye una instalación de cargador EV en Chile.
              Sin letra chica, sin sorpresas: desde $159.000 en casas y $369.000 en edificios.
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
                { value: '$159.000', label: 'Instalación base en casa' },
                { value: '$369.000', label: 'Instalación base en edificio' },
                { value: 'TE6', label: 'Certificado SEC incluido' },
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

        {/* Section 1: What's included */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              ¿Qué Incluye el Precio de Instalación?
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Cuando alguien cotiza la instalación de un cargador EV en Chile, la respuesta más
              honesta parte por desglosar cada componente. Muchas empresas ofrecen precios bajos que
              luego suben considerablemente al llegar al domicilio porque la cotización no incluía
              el cable, o el diferencial, o el certificado. En Enérgica City creemos que la
              transparencia de precios es parte del servicio.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 5, lineHeight: 1.8 }}>
              Una instalación correcta y completa para cargador EV en casa incluye los siguientes
              componentes, todos necesarios para cumplir con la normativa NCh Elec. 4/2003 y
              obtener el certificado TE6:
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Protecciones Eléctricas: El Componente Más Importante
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El elemento crítico de toda instalación de cargador EV es el sistema de protecciones.
              La normativa SEC exige un interruptor diferencial de alta sensibilidad (30 mA) de tipo
              A o tipo F para instalaciones con cargadores de vehículos eléctricos. Este tipo
              detecta corrientes de fuga tanto sinusoidales (tipo AC) como pulsantes (tipo A),
              cubriendo los perfiles de corriente reales que generan los cargadores modernos. Un
              diferencial estándar tipo AC no es suficiente.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Además del diferencial, se instala un interruptor termomagnético calibrado según la
              corriente del Wallbox (típicamente 16 A para Wallbox de 3,7 kW o 32 A para Wallbox
              de 7,4 kW). Este interruptor protege el cableado en caso de sobrecarga sostenida o
              cortocircuito. Ambas protecciones se montan dentro del tablero eléctrico general del
              hogar.
            </Typography>
          </Container>
        </Box>

        {/* Cost breakdown table */}
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
              Desglose de Costos: Instalación en Casa (Base)
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: TEXT_MUTED, mb: 5, textAlign: 'center' }}
            >
              Precios referenciales 2025 en CLP. Incluyen IVA. Distancia estándar hasta 20 m.
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
                    <th>Ítem</th>
                    <th>Costo estimado</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {houseCostItems.map((row) => (
                    <tr key={row.item}>
                      <td style={{ fontWeight: 600 }}>{row.item}</td>
                      <td style={{ color: TEAL, fontWeight: 700 }}>{row.costo}</td>
                      <td style={{ color: TEXT_MUTED }}>{row.nota}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Section 2: What can increase price */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              ¿Qué Factores Pueden Encarecer la Instalación?
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 5, lineHeight: 1.8 }}>
              El precio base cubre el escenario estándar: tablero eléctrico moderno, estacionamiento
              a menos de 20 metros del tablero y acceso sin complicaciones. Estos son los factores
              más comunes que aumentan el presupuesto:
            </Typography>
          </Container>
          <Container maxWidth="lg">
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
                    <th>Factor</th>
                    <th>Impacto en precio</th>
                    <th>Por qué sucede</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingFactors.map((row) => (
                    <tr key={row.factor}>
                      <td style={{ fontWeight: 600 }}>{row.factor}</td>
                      <td style={{ color: PINK, fontWeight: 700 }}>{row.impacto}</td>
                      <td style={{ color: TEXT_MUTED }}>{row.descripcion}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Section 3: Red flags */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Señales de Alerta: Instaladores Sin Certificación SEC
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El mercado chileno de instalación de cargadores EV incluye operadores que ofrecen
              precios muy bajos —a veces menores de $80.000— pero que no emiten el certificado TE6 o
              que usan instaladores sin credencial SEC vigente. Contratar estos servicios tiene
              consecuencias concretas:
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Riesgos Legales y de Seguro
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Sin certificado TE6, la instalación eléctrica no está declarada ante la distribuidora.
              Si ocurre un incendio o accidente eléctrico, la compañía de seguros puede rechazar la
              cobertura argumentando instalaciones no regularizadas. El propietario queda expuesto
              legal y económicamente. En Chile, el TE6 es el único documento que certifica que el
              trabajo fue ejecutado por un instalador competente y que cumple la normativa vigente.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Cómo Verificar a un Instalador SEC
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Puedes verificar la credencial de cualquier instalador eléctrico en el sitio web de la
              SEC (sec.cl → Registro de Instaladores). Ingresa el RUT del instalador y comprueba que
              tenga la clase y categoría habilitada para instalaciones en inmuebles (Clase A, B o C
              según la complejidad). Todo instalador de Enérgica City tiene credencial SEC vigente y
              está disponible para presentarla antes de iniciar el trabajo.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              El Wallbox También Debe Tener Certificación
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              En Chile, los Wallbox para vehículos eléctricos deben tener la homologación MTT
              (Ministerio de Transportes y Telecomunicaciones) o certificación equivalente que
              confirme su seguridad eléctrica. Los equipos de marcas reconocidas como Wallbox
              (marca española), ABB, Schneider Electric, Hager y ZapTec incluyen estas
              certificaciones. Equipos de marcas desconocidas importados sin certificación pueden
              presentar fallas de aislamiento que los diferenciales no detectan correctamente.
            </Typography>
          </Container>
        </Box>

        {/* Section 4: Buildings */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Instalación en Edificio: Desglose de $369.000 en Adelante
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El precio base de $369.000 para edificios cubre el escenario típico de un
              departamento en un edificio de 5 a 15 pisos con estacionamiento en subterráneo 1, y
              gabinete de medidores en el primer piso o subterráneo nivel acceso. Esto implica
              aproximadamente 15 a 30 metros de trazado vertical y horizontal, con paso por ductos
              comunes del edificio.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El costo aumenta cuando el estacionamiento está en subterráneo 2 o 3 (mayor metraje),
              cuando los ductos verticales están llenos y se requiere una solución alternativa, o
              cuando la administración exige permisos adicionales. En todos los casos, Enérgica City
              entrega una cotización cerrada antes de iniciar el trabajo, sin cobros sorpresa al
              finalizar.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              En proyectos de building-wide EV charging —cuando el edificio instala cargadores para
              varios propietarios a la vez— es posible reducir el costo por unidad significativamente
              mediante el diseño de una infraestructura compartida. En Enérgica City tenemos
              experiencia en este tipo de proyectos y podemos presentar propuestas a comunidades de
              condominios para instalar 5, 10 o 20 puntos de carga simultáneamente.
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
              Obtén tu Presupuesto Exacto en 5 Minutos
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 480, mx: 'auto' }}>
              Cotización online sin compromiso. Instalación desde{' '}
              <strong style={{ color: '#fff' }}>$159.000</strong> en casas y{' '}
              <strong style={{ color: '#fff' }}>$369.000</strong> en edificios. TE6 incluido.
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

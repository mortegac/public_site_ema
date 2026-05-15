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

const SLUG = 'depreciacion-acelerada-vehiculos-electricos-empresas-chile'

export const metadata: Metadata = {
  title: 'Beneficios tributarios: depreciación acelerada para flotas EV',
  description:
    'Cómo las empresas chilenas ahorran impuestos al electrificar flotas. Depreciación acelerada, Ley 21.505, crédito fiscal y ROI de infraestructura de carga.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Beneficios tributarios: depreciación acelerada para flotas EV',
    description:
      'Guía tributaria completa para empresas chilenas que electrifican su flota. Ley 21.505, depreciación instantánea, IVA recuperable, permiso de circulación e impuesto verde.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Beneficios tributarios para flotas eléctricas en Chile — Ley 21.505',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beneficios tributarios: depreciación acelerada para flotas EV',
    description:
      'Ley 21.505: 100% de depreciación de infraestructura EV en año 1. Caso real: $68,9M de ahorro tributario para flota de 10 BYD Atto 3.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Beneficios Tributarios: Depreciación Acelerada para Flotas EV en Chile',
  description:
    'Análisis completo de los beneficios tributarios para empresas chilenas que electrifican sus flotas: Ley 21.505, depreciación acelerada, IVA recuperable, permiso de circulación e impuesto verde. Caso de cálculo con 10 vehículos BYD Atto 3.',
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
      name: '¿Qué es la Ley 21.505 y cómo beneficia a las empresas con flota EV?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Ley 21.505, promulgada en Chile en 2022, permite a las empresas deducir el 100% de la inversión en infraestructura de carga de vehículos eléctricos (cargadores Wallbox, instalación eléctrica, transformadores) como gasto tributario en el año 1 de la inversión. Esto es lo que se denomina depreciación instantánea o acelerada. En la práctica, una empresa que invierte $5.000.000 CLP en cargadores para su flota puede deducir los $5.000.000 en su declaración de impuestos del mismo año, reduciendo su base imponible en ese monto. A una tasa de impuesto de primera categoría del 27%, esto equivale a un ahorro tributario directo de $1.350.000 CLP.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los vehículos eléctricos de empresa pagan impuesto verde en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. El impuesto verde (Green Tax) que aplica en Chile al importar vehículos nuevos no se aplica a los vehículos eléctricos puros (BEV). La Ley de Impuesto Verde grava a los vehículos de combustión interna en función de sus emisiones de CO2 y rendimiento de combustible. Los BEV tienen emisión cero de tubo de escape, por lo que están exentos de este impuesto, que puede representar $300.000–$1.500.000 CLP en vehículos de combustión de precio equivalente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto se ahorra en combustible una empresa al reemplazar 10 vehículos de gasolina por autos eléctricos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una empresa con 10 vehículos de flota que recorren en promedio 2.500 km mensuales cada uno (30.000 km/año por vehículo) ahorra aproximadamente $3.000.000 CLP al mes en combustible al pasar a vehículos eléctricos. El cálculo es: vehículo a gasolina consume ~8L/100 km × $1.100 CLP/L = $8.800 CLP/100 km × 2.500 km/mes = $220.000 CLP/vehículo/mes × 10 vehículos = $2.200.000 CLP/mes en gasolina. El mismo recorrido con BYD Atto 3 cargado en casa o en el trabajo cuesta ~$40.000 CLP/vehículo/mes × 10 = $400.000 CLP/mes. El ahorro mensual es de $1.800.000 CLP y el anual supera los $21.000.000 CLP.',
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
      name: 'Beneficios Tributarios: Depreciación Acelerada para Flotas EV',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const taxBenefits = [
  {
    beneficio: 'Depreciación infraestructura carga (Ley 21.505)',
    descripcion: '100% del valor de cargadores e instalación deducible en año 1',
    impacto: 'Ahorro directo = Inversión × 27%',
    ejemplo: '$5M invertidos → $1,35M de ahorro tributario',
  },
  {
    beneficio: 'Depreciación acelerada vehículo EV',
    descripcion: '1/3 de vida útil para vehículos eléctricos (vs. vida útil estándar)',
    impacto: 'Mayor deducción anual los primeros años',
    ejemplo: 'Vehículo de $25M: $8,3M deducibles/año (vs. $2,5M normal)',
  },
  {
    beneficio: 'IVA recuperable sobre equipos',
    descripcion: 'El IVA (19%) pagado en cargadores y vehículos es crédito fiscal',
    impacto: 'Recuperación del 19% de la inversión',
    ejemplo: '$5M en cargadores → $950.000 de IVA recuperado',
  },
  {
    beneficio: 'Exención permiso de circulación',
    descripcion: 'Primeros 2 años sin pago de permiso de circulación (Ley 18.290)',
    impacto: '$300.000–$800.000 CLP ahorrados por vehículo',
    ejemplo: '10 vehículos × 2 años = $3M–$8M en permisos no pagados',
  },
  {
    beneficio: 'Exención impuesto verde',
    descripcion: 'Los BEV no pagan Green Tax al importarse',
    impacto: '$300.000–$1.500.000 por vehículo',
    ejemplo: '10 vehículos × $800.000 promedio = $8M sin impuesto verde',
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
              Beneficios Tributarios: Depreciación Acelerada para Flotas EV
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
              La Ley 21.505 permite deducir el 100% de la infraestructura de carga en el año 1.
              Más IVA recuperable, cero impuesto verde y exención del permiso de circulación.
              El ROI financiero de electrificar tu flota es extraordinario.
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
              Cotizar infraestructura flota →
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ bgcolor: DARK, color: '#fff', py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" textAlign="center">
              {[
                { value: '100%', label: 'Depreciación de infraestructura carga en año 1 (Ley 21.505)' },
                { value: '$68,9M', label: 'Ahorro tributario caso real: 10 BYD Atto 3 + infraestructura' },
                { value: '$36M', label: 'Ahorro en combustible al año (10 vehículos, 2.500 km/mes c/u)' },
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
              El Marco Tributario para la Electromovilidad Empresarial en Chile
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Estado de Chile ha diseñado un conjunto de incentivos tributarios para acelerar
              la adopción de vehículos eléctricos en el sector empresarial. Estos beneficios
              están distribuidos en varias leyes y normas, pero su efecto combinado sobre el
              balance financiero de una empresa que electrifica su flota es significativo y,
              en muchos casos, determinante para la decisión de inversión.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Los cinco pilares del marco tributario favorable a la electromovilidad empresarial
              en Chile son: (1) la depreciación instantánea de la infraestructura de carga bajo
              la Ley 21.505; (2) la depreciación acelerada de los vehículos eléctricos; (3) el
              IVA recuperable sobre equipos; (4) la exención del permiso de circulación durante
              los primeros dos años; y (5) la exención del impuesto verde en la compra.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Ley 21.505 (2022): Depreciación Instantánea de Infraestructura
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La Ley 21.505, promulgada el 26 de octubre de 2022 y modificatoria de la Ley
              21.305, introdujo una disposición específica para la electromovilidad: las
              empresas pueden depreciar en forma instantánea (100% en el año 1) cualquier
              bien del activo fijo destinado a la carga de vehículos eléctricos. Esto incluye
              los cargadores Wallbox, los tableros eléctricos, el cableado de la instalación,
              los transformadores y cualquier equipo de gestión de carga (OCPP, sistemas de
              balanceo). El activo se da de baja contablemente en el año de compra, generando
              una deducción tributaria inmediata.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Depreciación Acelerada de Vehículos Eléctricos
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Los vehículos eléctricos también se benefician de la depreciación acelerada
              general del Servicio de Impuestos Internos (SII). Para los vehículos eléctricos,
              la vida útil tributaria es de 3 años (en lugar de los 7–9 años habituales para
              vehículos a combustión). Esto significa que una empresa puede deducir 1/3 del
              valor del vehículo cada año durante 3 años, en lugar de depreciarlo durante
              7–9 años. Un BYD Atto 3 valorado en $25.000.000 CLP genera una deducción de
              $8.333.000 CLP anuales durante 3 años, frente a los $2.500.000–$3.570.000 CLP
              anuales de un vehículo convencional.
            </Typography>
          </Container>
        </Box>

        {/* Benefits table */}
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
              Resumen de Beneficios Tributarios para Flotas EV en Chile
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: TEXT_MUTED, mb: 5, textAlign: 'center' }}
            >
              Vigentes a 2025. Consultar con contador tributario para aplicación al caso específico.
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
                    <th>Beneficio</th>
                    <th>Descripción</th>
                    <th>Impacto</th>
                    <th>Ejemplo numérico</th>
                  </tr>
                </thead>
                <tbody>
                  {taxBenefits.map((row) => (
                    <tr key={row.beneficio}>
                      <td style={{ fontWeight: 600 }}>{row.beneficio}</td>
                      <td>{row.descripcion}</td>
                      <td>{row.impacto}</td>
                      <td>{row.ejemplo}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Section 2 — Case calculation */}
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}
            >
              Caso Real: Empresa que Electrifica 10 Vehículos con BYD Atto 3
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Para ilustrar el impacto financiero concreto, analicemos el caso de una empresa
              mediana chilena que decide reemplazar 10 vehículos de flota a gasolina por 10
              BYD Atto 3 e instala la infraestructura de carga correspondiente.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Inversión Total del Año 1
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              La empresa adquiere 10 BYD Atto 3 a $25.000.000 CLP cada uno (precio referencial 2025)
              = $250.000.000 CLP. Adicionalmente, instala 10 cargadores Wallbox de 7,4 kW con
              instalación eléctrica completa y certificado TE6 a $500.000 CLP cada uno
              = $5.000.000 CLP. La inversión total del año 1 es de{' '}
              <strong>$255.000.000 CLP</strong>.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Ahorro Tributario del Año 1
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Con la Ley 21.505, los $5.000.000 CLP de infraestructura se deprecian al 100%
              en el año 1. Los $250.000.000 CLP en vehículos se deprecian al 1/3 = $83.333.000 CLP
              en el año 1. Total deducible año 1: $5.000.000 + $83.333.000 = $88.333.000 CLP.
              A la tasa del impuesto de primera categoría del 27%:{' '}
              <strong>$23.850.000 CLP de ahorro tributario</strong> en el año 1.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Sumando la deducción de los años 2 y 3 de los vehículos ($83.333.000 × 27% × 2 años
              = $45.000.000 CLP adicionales), el ahorro tributario total sobre los 3 años de
              depreciación es de aproximadamente <strong>$68.900.000 CLP</strong>. Este es el
              valor que el Estado deja de cobrar a la empresa gracias a los beneficios de la
              electromovilidad.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Ahorro Operacional en Combustible: $36M al Año
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Asumiendo que cada vehículo de flota recorre 2.500 km mensuales y que el vehículo
              a gasolina reemplazado consume 8 L/100 km a $1.100 CLP/L, el costo mensual en
              gasolina por vehículo es de $220.000 CLP. Con el BYD Atto 3 cargado en la empresa
              a $100 CLP/kWh (tarifa industrial), el mismo recorrido cuesta $50.000 CLP/mes por
              vehículo. El ahorro mensual es $170.000 CLP por vehículo × 10 = $1.700.000 CLP/mes
              × 12 meses = <strong>$20.400.000 CLP/año</strong> solo en combustible. Sumando
              el menor costo de mantención (los EV no tienen cambio de aceite, filtros, ni
              correa de distribución), el ahorro operacional anual total supera los{' '}
              <strong>$36.000.000 CLP</strong>.
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
              IVA, Permiso de Circulación e Impuesto Verde: Los Beneficios que Pasan Desapercibidos
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Además de la depreciación acelerada, hay tres beneficios adicionales que muchas
              empresas no consideran al evaluar la electrificación de su flota.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              IVA Recuperable: 19% de la Inversión de Vuelta
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Las empresas que adquieren vehículos eléctricos y equipos de carga pueden recuperar
              el IVA (19%) pagado en la compra como crédito fiscal, siempre que los vehículos
              se usen en la actividad comercial de la empresa. Para los $255.000.000 CLP de
              inversión, el IVA recuperable es de $48.450.000 CLP. Este monto se descuenta del
              IVA débito de la empresa en el mismo mes de la compra, reduciendo el costo neto
              de la inversión a $206.550.000 CLP.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Exención del Permiso de Circulación: 2 Años sin Pagar
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              El Artículo 12 de la Ley 18.290 (Ley de Tránsito) establece que los vehículos
              eléctricos están exentos del permiso de circulación durante sus primeros dos
              años de vida. Para una flota de 10 vehículos con permiso de circulación estimado
              en $400.000–$600.000 CLP por vehículo por año, el ahorro durante dos años es de
              $8.000.000–$12.000.000 CLP.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Cero Impuesto Verde en la Compra
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Chile aplica el &ldquo;impuesto verde&rdquo; o &ldquo;green tax&rdquo; sobre la importación de vehículos
              nuevos que emiten más de ciertos gramos de CO2/km. Los vehículos eléctricos puros
              (BEV) están completamente exentos, ya que tienen emisión cero de tubo de escape.
              Para un vehículo de combustión de precio equivalente al BYD Atto 3, el impuesto
              verde puede representar entre $300.000 y $800.000 CLP. Para 10 vehículos, el
              ahorro es de $3.000.000–$8.000.000 CLP.
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
              Cómo Enérgica City Apoya la Electrificación de Flotas
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Enérgica City tiene experiencia especializada en la instalación de infraestructura
              de carga para flotas empresariales. Nuestro equipo de ingenieros diseña el sistema
              de carga considerando la capacidad eléctrica existente del establecimiento, el
              número de vehículos y los turnos de uso, el balanceo dinámico de carga para no
              sobrecargar el transformador, y los requisitos de medición y reporte para la
              gestión del consumo por vehículo.
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 3, lineHeight: 1.8 }}>
              Utilizamos la herramienta de simulación GRETA para modelar el comportamiento
              energético de la flota electrificada antes de la instalación: GRETA calcula la
              demanda de potencia hora a hora, identifica los cuellos de botella de la
              infraestructura existente y dimensiona el sistema de carga óptimo. Esta simulación
              es gratuita y forma parte de nuestro proceso de cotización para flotas.
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, mb: 2, color: DARK }}
            >
              Documentación para el SII y Certificación SEC
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_MUTED, mb: 0, lineHeight: 1.8 }}>
              Para que la empresa pueda aplicar los beneficios tributarios correctamente, cada
              instalación de Enérgica City entrega documentación completa: factura detallada que
              desglosa el equipo de carga de la instalación eléctrica (para fundamentar la
              deducción bajo Ley 21.505), certificado TE6 emitido por instalador SEC autorizado
              (obligatorio para la Superintendencia de Electricidad y Combustibles), y manual
              de mantención del equipo instalado. Esta documentación es suficiente para que
              el contador de la empresa procese los beneficios tributarios correctamente.
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
                Enérgica City. Este artículo tiene carácter informativo. Para asesoría tributaria
                específica, consulta con tu contador.
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
              Electrifica tu Flota y Aprovecha los Beneficios Tributarios
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 480, mx: 'auto' }}>
              Diseño e instalación de infraestructura de carga para flotas. Simulación GRETA
              gratuita. Certificado TE6 incluido. Documentación completa para el SII.
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
                Cotizar para mi empresa
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

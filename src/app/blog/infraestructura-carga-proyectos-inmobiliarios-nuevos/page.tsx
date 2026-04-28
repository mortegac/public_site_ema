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
  title: 'Electromovilidad Inmobiliaria: El 1% que cambia tu proyecto',
  description:
    'Cómo habilitar el 100% de estacionamientos EV en proyectos inmobiliarios nuevos. El costo no supera el 1% del presupuesto eléctrico. Atrae compradores con edificios EV Ready.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/infraestructura-carga-proyectos-inmobiliarios-nuevos` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/infraestructura-carga-proyectos-inmobiliarios-nuevos`,
    title: 'Electromovilidad Inmobiliaria: El 1% que cambia tu proyecto',
    description:
      'Pre-instalación EV en proyectos nuevos. Costo inferior al 1% del presupuesto eléctrico. Ley 21.505 obliga a edificios comerciales nuevos.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Infraestructura de carga EV en proyectos inmobiliarios Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electromovilidad Inmobiliaria: El 1% que cambia tu proyecto',
    description: 'Pre-instalación EV en proyectos nuevos. Ley 21.505. 5-10x más barato que el retrofit.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Electromovilidad Inmobiliaria: El 1% que Cambia tu Proyecto',
  description:
    'Cómo habilitar el 100% de estacionamientos EV en proyectos inmobiliarios nuevos. El costo no supera el 1% del presupuesto eléctrico.',
  author: { '@type': 'Person', name: 'Gilberto Escalona', jobTitle: 'Gerente Técnico, Enérgica City' },
  publisher: { '@type': 'Organization', name: 'Enérgica City', url: CANONICAL_DOMAIN },
  datePublished: '2025-06-15',
  dateModified: '2025-06-15',
  url: `${CANONICAL_DOMAIN}/blog/infraestructura-carga-proyectos-inmobiliarios-nuevos`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${CANONICAL_DOMAIN}/blog/infraestructura-carga-proyectos-inmobiliarios-nuevos`,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué obliga la Ley 21.505 en materia de electromovilidad para edificios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Ley 21.505, promulgada en 2022, establece que los nuevos edificios y estacionamientos de uso comercial y público deben contar con infraestructura básica de carga para vehículos eléctricos. Específicamente exige que al menos el 10% de los estacionamientos estén habilitados o pre-habilitados para carga EV. La normativa aplica a proyectos que soliciten permiso de edificación después de la entrada en vigencia de la ley. El Ministerio de Energía y el Ministerio de Vivienda y Urbanismo son los organismos responsables de su fiscalización.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funciona el sistema EVE para gestionar la carga en edificios con muchos estacionamientos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EVE (Electric Vehicle Energy Management) es una tecnología de gestión inteligente de carga que distribuye dinámicamente la potencia disponible entre todos los Wallboxes activos de un edificio, sin necesidad de ampliar el transformador. Cuando solo 5 autos están cargando en un edificio con 100 puntos, cada uno recibe más potencia. Cuando 80 están cargando simultáneamente, el sistema reparte la carga disponible de forma equitativa o priorizada según programación. Esto permite activar el 100% de los estacionamientos con la infraestructura eléctrica existente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto más barato es pre-instalar la infraestructura EV durante la construcción vs. después?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La diferencia de costo es sustancial: pre-instalar conduit, cableado y capacidad de tablero durante la construcción de un edificio de 200 departamentos cuesta entre 35 y 45 millones de CLP. Realizar el mismo trabajo como retrofit (post-construcción, con muros ya terminados, cerámicas instaladas y pintura colocada) puede costar entre 150 y 220 millones de CLP, es decir, 5 a 6 veces más caro. La razón es principalmente el costo de rotura y reposición de terminaciones, el trabajo en altura en zonas terminadas y la necesidad de interrumpir el uso del estacionamiento.',
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
      name: 'Electromovilidad Inmobiliaria',
      item: `${CANONICAL_DOMAIN}/blog/infraestructura-carga-proyectos-inmobiliarios-nuevos`,
    },
  ],
}

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
                { label: 'Electromovilidad Inmobiliaria', href: null },
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
              Electromovilidad Inmobiliaria: El 1% que Cambia tu Proyecto
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
              Pre-instalar la infraestructura de carga EV durante la construcción cuesta menos del 1% del presupuesto
              eléctrico. No hacerlo puede costar 5 a 10 veces más cuando los compradores lo exijan. Y ya lo están
              exigiendo.
            </Typography>

            <Box
              component={Link}
              href="/cotizador"
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
              Consultar para mi proyecto →
            </Box>
          </Container>
        </Box>

        {/* ── Stats bar ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: 5, borderBottom: '1px solid #E2E8F0' }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} justifyContent="center">
              {[
                { value: '5–10×', label: 'más costoso hacer el retrofit post-construcción' },
                { value: '1%', label: 'del presupuesto eléctrico para pre-instalar el 100% de estacionamientos' },
                { value: 'Ley 21.505', label: 'obliga infraestructura EV en edificios comerciales nuevos (2022)' },
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

        {/* ── Section 1: El problema del retrofit ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Por qué los edificios terminados pagan 5 veces más por la misma infraestructura
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Cuando un condominio o edificio de oficinas ya está construido y entregado, instalar cargadores EV en
              el estacionamiento es técnicamente complejo y económicamente penalizado. El problema no es el
              Wallbox en sí: cuesta lo mismo durante la construcción que después. El problema es todo lo demás:
              los muros, los cielos falsos, los pavimentos, la pintura, las cerámicas.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Para llevar alimentación eléctrica desde el tablero principal del subterráneo hasta cada
              estacionamiento, el cableado debe recorrer decenas o cientos de metros a través de estructuras
              ya terminadas. En un edificio terminado, eso significa picar, canalizar por falsos cielos o ductos
              existentes (frecuentemente ya saturados), atravesar losas, y reponer todas las terminaciones. En un
              edificio en construcción, el cable simplemente acompaña a todo el cableado eléctrico previsto, sin
              costo adicional de terminaciones.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              El caso concreto que hemos visto en Enérgica City lo ilustra bien: un edificio residencial de 200
              departamentos en Las Condes que instaló la infraestructura EV durante la construcción pagó 40 millones
              de CLP por tener conduit, cableado y capacidad de tablero instalados en los 200 estacionamientos.
              Un edificio de características similares en Providencia que lo contrató como retrofit pagó más de 200
              millones de CLP por el mismo alcance funcional, más 3 meses de obras con el estacionamiento
              parcialmente inutilizable.
            </Typography>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 5, mb: 2, color: DARK }}>
              La regla del 1%: qué incluye la pre-instalación
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Cuando hablamos de "pre-instalación EV", nos referimos a tres elementos específicos que se incorporan
              durante la construcción del edificio:
            </Typography>
            {[
              {
                title: 'Conduit (tubería de protección)',
                desc: 'Canalización vacía desde el tablero eléctrico del subterráneo hasta cada estacionamiento. El costo del conduit es mínimo — solo materiales plásticos. La mano de obra es prácticamente cero porque los electricistas ya están en el edificio haciendo el resto del tendido.',
              },
              {
                title: 'Reserva de capacidad en tablero',
                desc: 'El tablero eléctrico del subterráneo se diseña con circuitos reservados y espacio físico para interruptores adicionales. Esto representa un costo de entre $800.000 y $2.000.000 CLP según el tamaño del tablero. En construcción, es una línea más en el presupuesto eléctrico; en retrofit, requiere cambiar el tablero completo.',
              },
              {
                title: 'Puesta a tierra en cada punto',
                desc: 'El sistema de puesta a tierra se extiende a cada punto de carga durante la construcción, aprovechando que los piques están abiertos y las paredes desnudas. Costo: proporcional a la longitud del conductor de tierra, que ya está tendido.',
              },
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  mb: 3,
                  p: 3,
                  bgcolor: GRAY_BG,
                  borderRadius: 2,
                  border: '1px solid #E2E8F0',
                  borderLeft: `4px solid ${TEAL}`,
                }}
              >
                <Typography sx={{ fontWeight: 700, color: DARK, mb: 1 }}>{item.title}</Typography>
                <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>{item.desc}</Typography>
              </Box>
            ))}
          </Container>
        </Box>

        {/* ── Section 2: Ley 21.505 y marco regulatorio ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Ley 21.505: la obligación legal que ya está vigente
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              En Chile, la Ley 21.505 de 2022 estableció por primera vez obligaciones concretas de infraestructura
              de carga eléctrica para vehículos en nuevas edificaciones. La ley modifica la Ley General de Urbanismo
              y Construcciones e instruyó al Ministerio de Vivienda y Urbanismo a actualizar la Ordenanza General de
              Urbanismo y Construcciones (OGUC) para incluir estándares mínimos de pre-habilitación EV.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Los puntos clave de la Ley 21.505 relevantes para desarrolladores inmobiliarios:
            </Typography>
            <Box component="ul" sx={{ pl: 3, color: '#334155', '& li': { mb: 2, fontSize: '1.05rem', lineHeight: 1.7 } }}>
              <li>
                <strong>Edificios comerciales y públicos nuevos</strong> deben habilitar o pre-habilitar al menos el
                10% de sus estacionamientos para carga EV.
              </li>
              <li>
                <strong>Estacionamientos de uso masivo</strong> (centros comerciales, supermercados, estadios) tienen
                un porcentaje mínimo exigido en función de la capacidad total.
              </li>
              <li>
                La ley diferencia entre "habilitado" (con Wallbox instalado) y "pre-habilitado" (con conduit y
                capacidad de tablero, listo para instalar el Wallbox en cualquier momento sin obras adicionales).
              </li>
              <li>
                Los proyectos residenciales aún no tienen obligación legal directa, pero la presión de mercado y las
                políticas municipales están acelerando la adopción voluntaria.
              </li>
            </Box>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              En la práctica, las inmobiliarias que ya están entregando proyectos con 100% de estacionamientos
              pre-habilitados no lo hacen solo por cumplimiento: lo hacen porque es un argumento de venta efectivo
              frente a compradores cada vez más conscientes de la electromovilidad.
            </Typography>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 5, mb: 2, color: DARK }}>
              El sello "EV Ready": diferenciación frente al comprador
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155' }}>
              Un edificio "EV Ready" es aquel en que cualquier propietario puede instalar un Wallbox en su
              estacionamiento con una tramitación simple ante el comité de administración, sin necesidad de hacer
              obras de infraestructura. Este atributo se está convirtiendo en un factor de decisión de compra
              equivalente a la conectividad de fibra óptica o a la disponibilidad de cargadores USB en las áreas
              comunes. En encuestas del sector inmobiliario chileno (2024), más del 35% de los compradores menores de
              45 años calificaron la disponibilidad de carga EV como "importante" o "muy importante" al comparar
              proyectos similares.
            </Typography>
          </Container>
        </Box>

        {/* ── Section 3: Tecnología EVE ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Tecnología EVE: 100% de estacionamientos sin ampliar el transformador
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              La objeción más frecuente que escuchamos de los ingenieros eléctricos de proyectos inmobiliarios es:
              "Si habilitamos todos los estacionamientos, el transformador del edificio no da abasto." Esta objeción
              era completamente válida en 2015. En 2025, no lo es.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              La tecnología EVE (Electric Vehicle Energy Management) permite gestionar dinámicamente la potencia
              distribuida entre todos los Wallboxes activos de un edificio, respetando siempre el límite máximo del
              transformador. El sistema funciona con un controlador central que se comunica con cada Wallbox a través
              del protocolo OCPP 1.6 o 2.0, ajustando en tiempo real la corriente máxima de cada punto en función
              de cuántos vehículos están cargando simultáneamente.
            </Typography>

            <Box sx={{ p: 4, bgcolor: GRAY_BG, borderRadius: 2, border: '1px solid #E2E8F0', mb: 4 }}>
              <Typography sx={{ fontWeight: 700, color: DARK, mb: 2 }}>Ejemplo práctico — Edificio 200 departamentos</Typography>
              <Grid container spacing={3}>
                {[
                  {
                    label: 'Transformador disponible',
                    value: '200 kVA',
                    sub: 'Para todo el edificio',
                  },
                  {
                    label: 'Potencia reservada para carga EV',
                    value: '80 kW',
                    sub: 'Sin afectar otras cargas',
                  },
                  {
                    label: 'Wallboxes instalados',
                    value: '200 puntos',
                    sub: '7,4 kW cada uno',
                  },
                  {
                    label: 'Cargando simultáneamente',
                    value: 'Hasta 10',
                    sub: 'A máxima potencia (7,4 kW)',
                  },
                  {
                    label: 'Con 80 activos',
                    value: '1 kW c/u',
                    sub: 'EVE distribuye la potencia',
                  },
                  {
                    label: 'Batería cargada de noche',
                    value: '100%',
                    sub: 'Carga nocturna de bajo consumo',
                  },
                ].map((item) => (
                  <Grid size={{ xs: 6, sm: 4 }} key={item.label}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: TEAL }}>{item.value}</Typography>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: DARK, mt: 0.5 }}>{item.label}</Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED }}>{item.sub}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              En la práctica, la mayoría de los departamentos no cargan simultáneamente a máxima potencia durante
              todo el día. El patrón típico en edificios residenciales muestra que entre las 22:00 y las 06:00 hay
              una alta demanda de carga (propietarios que llegan de trabajar), pero la potencia por unidad es baja
              porque el sistema EVE distribuye los 80 kW disponibles entre todos los activos. El resultado: todos los
              autos amanecen cargados, sin necesidad de ampliar el transformador.
            </Typography>
          </Container>
        </Box>

        {/* ── Section 4: Comparativa costos ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Comparativa de costos: pre-instalación vs. retrofit
            </Typography>

            <Box sx={{ overflowX: 'auto' }}>
              <Box
                component="table"
                sx={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  '& th': {
                    bgcolor: DARK,
                    color: '#fff',
                    py: 1.5,
                    px: 2,
                    textAlign: 'left',
                    fontWeight: 700,
                  },
                  '& td': { py: 1.25, px: 2, borderBottom: '1px solid #E2E8F0', color: '#334155' },
                  '& tr:nth-of-type(even) td': { bgcolor: '#fff' },
                }}
              >
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Pre-instalación en obra</th>
                    <th>Retrofit post-entrega</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      concept: 'Conduit + cableado 200 estac.',
                      pre: '$8–12M CLP',
                      retro: '$35–50M CLP',
                    },
                    {
                      concept: 'Tablero eléctrico ampliado',
                      pre: '$2–4M CLP',
                      retro: '$8–15M CLP (cambio total)',
                    },
                    {
                      concept: 'Puesta a tierra en cada punto',
                      pre: 'Incluida en obras generales',
                      retro: '$5–8M CLP',
                    },
                    {
                      concept: 'Reposición de terminaciones',
                      pre: '$0 (no aplica)',
                      retro: '$40–80M CLP (cerámica, pintura, cielos)',
                    },
                    {
                      concept: 'Disrupciones operacionales',
                      pre: 'Ninguna',
                      retro: '2–4 meses, estac. parcialmente inutilizable',
                    },
                    {
                      concept: 'Gestión y coordinación',
                      pre: 'Integrada al proyecto',
                      retro: '$3–5M CLP adicionales',
                    },
                    {
                      concept: 'TOTAL estimado 200 estac.',
                      pre: '$40–55M CLP',
                      retro: '$150–220M CLP',
                    },
                  ].map((row, i) => (
                    <tr key={row.concept}>
                      <td style={{ fontWeight: i === 6 ? 700 : 400 }}>{row.concept}</td>
                      <td
                        style={{
                          fontWeight: i === 6 ? 700 : 400,
                          color: i === 6 ? '#16A34A' : undefined,
                        }}
                      >
                        {row.pre}
                      </td>
                      <td
                        style={{
                          fontWeight: i === 6 ? 700 : 400,
                          color: i === 6 ? '#DC2626' : undefined,
                        }}
                      >
                        {row.retro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mt: 1.5, fontStyle: 'italic' }}>
                Estimaciones basadas en proyectos ejecutados por Enérgica City en Santiago (2023–2025). Costos varían
                según región, tipo de construcción y especificaciones del proyecto.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* ── FAQ Section ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
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
                  bgcolor: GRAY_BG,
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
              ¿Tienes un proyecto inmobiliario en etapa de diseño o construcción?
            </Typography>
            <Typography sx={{ color: '#94A3B8', mb: 5, fontSize: '1.05rem', maxWidth: 540, mx: 'auto' }}>
              Integramos la pre-instalación EV en tu proyecto sin impactar el cronograma de obras. Desde la
              especificación técnica hasta la entrega del sistema EVE con monitoreo OCPP. Consulta sin costo.
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
                  py: 1.75,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  '&:hover': { bgcolor: TEAL_DARK },
                }}
              >
                Solicitar propuesta técnica →
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
                Hablar con un ingeniero
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

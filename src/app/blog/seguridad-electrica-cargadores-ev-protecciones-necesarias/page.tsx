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
  title: 'Seguridad eléctrica: Protecciones críticas para tu cargador EV',
  description:
    'Protecciones obligatorias para instalar un cargador EV seguro en Chile. Diferencial tipo A, interruptor automático, GFCI. Normativa NCh Elec. 4/2003.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/seguridad-electrica-cargadores-ev-protecciones-necesarias` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/seguridad-electrica-cargadores-ev-protecciones-necesarias`,
    title: 'Seguridad eléctrica: Protecciones críticas para tu cargador EV',
    description:
      'Protecciones obligatorias para instalar un cargador EV seguro en Chile. Diferencial tipo A, interruptor automático. NCh Elec. 4/2003.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Protecciones eléctricas para cargadores EV en Chile NCh Elec 4/2003',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seguridad eléctrica: Protecciones críticas para cargadores EV',
    description: 'Diferencial tipo A, interruptor automático y más. Normativa NCh Elec. 4/2003 Chile.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Seguridad Eléctrica: Protecciones Críticas para tu Cargador EV',
  description:
    'Protecciones obligatorias para instalar un cargador EV seguro en Chile. Diferencial tipo A, interruptor automático, GFCI. Normativa NCh Elec. 4/2003.',
  author: { '@type': 'Person', name: 'Gilberto Escalona', jobTitle: 'Gerente Técnico, Enérgica City' },
  publisher: { '@type': 'Organization', name: 'Enérgica City', url: CANONICAL_DOMAIN },
  datePublished: '2025-05-22',
  dateModified: '2025-05-22',
  url: `${CANONICAL_DOMAIN}/blog/seguridad-electrica-cargadores-ev-protecciones-necesarias`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${CANONICAL_DOMAIN}/blog/seguridad-electrica-cargadores-ev-protecciones-necesarias`,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Es obligatorio el diferencial Tipo A para instalar un cargador EV en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La norma IEC 61851, adoptada como referencia técnica por la SEC en Chile, exige el uso de un interruptor diferencial de Tipo A (o superior) en los circuitos dedicados a carga de vehículos eléctricos. El Tipo A detecta corrientes de falta puras en alterna y corrientes pulsantes, que son las que puede generar el proceso de rectificación interna de un EVSE. Un diferencial estándar Tipo AC no es suficiente para esta aplicación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo conectar el cargador EV al mismo circuito que otros artefactos del hogar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No se recomienda y en la mayoría de los casos tampoco es técnicamente posible de manera segura. Un Wallbox de 7kW consume 32 A de forma continua por 8 o más horas. Los circuitos domésticos tipo "enchufes" están dimensionados para 16 A o 20 A, y mezclar esta carga sostenida con otros artefactos puede provocar calentamiento del conductor, disparo del diferencial y, en casos extremos, incendio eléctrico. La NCh Elec. 4/2003 exige circuito dedicado para cargas sostenidas de este tipo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué es más seguro un Wallbox que enchufar el auto a un toma corriente normal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un enchufe doméstico estándar (Schuko o tipo L en Chile) soporta 16 A y está diseñado para cargas intermitentes. Cargar un auto eléctrico durante 10-12 horas genera calor acumulado en el contacto del enchufe, el cable y el interior del tomacorriente. Más del 80% de los incendios relacionados con carga de vehículos eléctricos a nivel internacional ocurren con cargadores de Modo 1 (cable directo a enchufe). Un Wallbox usa Modo 2 o 3 con comunicación CP/PP constante, monitoreo de temperatura y corte automático ante fallas.',
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
      name: 'Seguridad Eléctrica Cargadores EV',
      item: `${CANONICAL_DOMAIN}/blog/seguridad-electrica-cargadores-ev-protecciones-necesarias`,
    },
  ],
}

const protections = [
  {
    number: '01',
    title: 'Interruptor Termomagnético Dedicado',
    description:
      'Calibrado para el 125% de la corriente nominal del circuito de carga. Para un Wallbox de 32 A, se usa un termomagnético de 40 A. Protege contra sobrecargas sostenidas y cortocircuitos. Debe instalarse en el tablero general, en una posición claramente identificada.',
    norm: 'NCh Elec. 4/2003, Art. 5-7',
    critical: true,
  },
  {
    number: '02',
    title: 'Diferencial Tipo A (30 mA)',
    description:
      'El diferencial tipo A detecta corrientes de falta en alterna y corrientes de falta pulsantes de CC, propias de los convertidores AC/DC internos del EVSE. La sensibilidad mínima recomendada es 30 mA. Un diferencial AC estándar no es adecuado para este circuito.',
    norm: 'IEC 61851-1 / IEC 62955',
    critical: true,
  },
  {
    number: '03',
    title: 'Circuito Dedicado (sin cargas compartidas)',
    description:
      'El circuito del cargador EV no debe compartirse con ningún otro artefacto. Desde el tablero hasta el Wallbox debe existir un cableado independiente de sección mínima 6 mm² para corrientes de hasta 32 A, sin empalmes intermedios ni extensiones.',
    norm: 'NCh Elec. 4/2003, Art. 5-2',
    critical: true,
  },
  {
    number: '04',
    title: 'Sistema de Tierra (puesta a tierra)',
    description:
      'El Wallbox y el circuito deben estar correctamente conectados al sistema de tierra del inmueble, con resistencia de tierra inferior a 10 Ω según la norma chilena. Un Wallbox sin tierra funcional puede presentar tensiones peligrosas en la carcasa en caso de falla interna.',
    norm: 'NCh Elec. 4/2003, Art. 5-8',
    critical: true,
  },
  {
    number: '05',
    title: 'Conductor mínimo 6 mm²',
    description:
      'Para circuitos de 32 A, el conductor de cobre debe ser de sección mínima 6 mm² (fase, neutro y tierra). Usar 4 mm² en 32 A genera calor acumulado y puede causar falla de aislamiento. En instalaciones en bandejas o bajo tubo sin ventilación, puede requerirse 10 mm².',
    norm: 'NCh Elec. 4/2003, Tabla 5-1',
    critical: false,
  },
  {
    number: '06',
    title: 'Canalización y fijación del cable',
    description:
      'El cable desde el tablero hasta el punto de carga debe ir canalizado en conduit o canalete homologado, fijado con abrazaderas cada 50 cm máximo. No se permite cable suelto expuesto a daño mecánico o a la intemperie sin protección adecuada (IP mínimo 44 en exterior).',
    norm: 'NCh Elec. 4/2003, Art. 5-3',
    critical: false,
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
                { label: 'Seguridad Eléctrica EV', href: null },
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
              Seguridad Eléctrica: Protecciones Críticas para tu Cargador EV
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
              Una instalación mal hecha puede provocar incendios, electrocución o el rechazo del formulario TE6 ante la
              SEC. Te explicamos las 6 protecciones obligatorias que debe tener tu circuito de carga EV.
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
              Instalación segura certificada →
            </Box>
          </Container>
        </Box>

        {/* ── Stats bar ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: 5, borderBottom: '1px solid #E2E8F0' }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} justifyContent="center">
              {[
                { value: '80%+', label: 'de incendios EV ocurren con carga Modo 1 (enchufe directo)' },
                { value: '32 A', label: 'corriente continua sostenida de un Wallbox 7kW estándar' },
                { value: '6 mm²', label: 'sección mínima de conductor para circuito de 32 A' },
              ].map((stat) => (
                <Grid item xs={12} sm={4} key={stat.label}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: TEAL }}>{stat.value}</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: TEXT_MUTED, mt: 0.5 }}>{stat.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── Section 1: Por qué la seguridad importa ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Por qué la carga EV exige protecciones diferentes a los enchufes comunes
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Cargar un auto eléctrico con un Wallbox de 7 kW implica mantener una corriente de 32 amperios de forma
              continua durante 8 a 12 horas. Esta es una carga eléctrica de una naturaleza muy diferente a encender
              un microondas o un televisor: es una demanda sostenida, alta y predecible que estrena el cable y los
              componentes de protección noche tras noche.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Un circuito eléctrico doméstico normal para enchufes está diseñado para corrientes de 16 A a 20 A
              con carga intermitente. Cuando se fuerza una carga de 32 A en un cable de 2,5 mm² (típico en hogares
              chilenos), el conductor se calienta, el aislamiento se degrada y el contacto del enchufe puede
              alcanzar temperaturas que generan arcos eléctricos. Este es el escenario de inicio de incendio más
              común en propietarios de autos eléctricos que intentan cargar directamente sin una instalación
              dedicada.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Adicionalmente, los cargadores tipo EVSE (Electric Vehicle Supply Equipment) contienen convertidores
              AC/DC internos que pueden generar corrientes de falta de forma pulsante o con componente de corriente
              continua. Los diferenciales estándar Tipo AC que protegen la mayoría de los circuitos domésticos en
              Chile no detectan estas corrientes: solo responden a corrientes de falta puramente alternas. Por eso
              la norma IEC 61851-1 (referencia técnica de la SEC) exige protecciones específicas para circuitos EV.
            </Typography>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 5, mb: 2, color: DARK }}>
              El rol de la NCh Elec. 4/2003 en instalaciones EV
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              La norma chilena NCh Elec. 4/2003 (Instalaciones de Consumidores en Baja Tensión) es el marco técnico
              exigido por la Superintendencia de Electricidad y Combustibles (SEC) para todo trabajo eléctrico
              residencial y comercial en el país. Si tu instalación no cumple esta norma, el instalador eléctrico
              autorizado no puede firmar el formulario TE6, que es el documento requerido para la aprobación legal
              de la instalación ante la SEC.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Para circuitos de carga EV, la NCh Elec. 4/2003 aplica en cuanto a dimensionamiento de conductores,
              protecciones térmicas, puesta a tierra y canalización. La IEC 61851 complementa este marco con
              requisitos específicos para EVSE: tipos de diferencial, comunicación CP/PP y protección contra
              inserción en carga. En Enérgica City, nuestras instalaciones cumplen ambas normativas.
            </Typography>
          </Container>
        </Box>

        {/* ── Section 2: Las 6 protecciones ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 2, color: DARK }}>
              Las 6 protecciones que debe tener toda instalación EV en Chile
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 5 }}>
              Las primeras cuatro son críticas: sin ellas, la instalación no puede ser aprobada por la SEC. Las dos
              últimas son requeridas por buena práctica de ingeniería y garantizan la vida útil del sistema.
            </Typography>

            {protections.map((p) => (
              <Box
                key={p.number}
                sx={{
                  mb: 3,
                  p: 3,
                  bgcolor: '#fff',
                  borderRadius: 2,
                  border: `1px solid ${p.critical ? '#FCA5A5' : '#E2E8F0'}`,
                  borderLeft: `4px solid ${p.critical ? '#DC2626' : TEAL}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      color: p.critical ? '#DC2626' : TEAL,
                      minWidth: 36,
                    }}
                  >
                    {p.number}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: DARK, fontSize: '1rem' }}>{p.title}</Typography>
                  {p.critical && (
                    <Box
                      sx={{
                        ml: 'auto',
                        bgcolor: '#FEE2E2',
                        color: '#DC2626',
                        px: 1.5,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      OBLIGATORIO
                    </Box>
                  )}
                </Box>
                <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#475569', mb: 1.5 }}>
                  {p.description}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, fontWeight: 600 }}>
                  Norma: {p.norm}
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>

        {/* ── Section 3: Modo 1 vs Modo 2 vs Modo 3 ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Modos de carga: por qué el Modo 1 es peligroso y el Modo 3 es el estándar
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              La norma IEC 61851 define cuatro modos de carga AC. En Chile, los más comunes en entornos domésticos
              y comerciales son los modos 1, 2 y 3.
            </Typography>

            <Box sx={{ overflowX: 'auto', mt: 3 }}>
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
                  '& tr:nth-of-type(even) td': { bgcolor: GRAY_BG },
                }}
              >
                <thead>
                  <tr>
                    <th>Modo</th>
                    <th>Descripción</th>
                    <th>Potencia típica</th>
                    <th>Seguridad</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      modo: 'Modo 1',
                      desc: 'Cable directo a enchufe doméstico (Schuko o tipo L)',
                      potencia: '~2,3 kW (10 A)',
                      seg: 'Peligroso — sin protección EVSE',
                    },
                    {
                      modo: 'Modo 2',
                      desc: 'Cable portátil con ICCPD (caja intermedia con protecciones)',
                      potencia: '~3,7 kW (16 A)',
                      seg: 'Aceptable para uso ocasional',
                    },
                    {
                      modo: 'Modo 3',
                      desc: 'Wallbox fijo con comunicación CP/PP al vehículo',
                      potencia: '7,4–22 kW',
                      seg: 'Óptimo — protecciones integradas',
                    },
                    {
                      modo: 'Modo 4',
                      desc: 'Cargador DC rápido externo (CHAdeMO, CCS2)',
                      potencia: '50–350 kW',
                      seg: 'Estaciones públicas, no doméstico',
                    },
                  ].map((row) => (
                    <tr key={row.modo}>
                      <td style={{ fontWeight: 600 }}>{row.modo}</td>
                      <td>{row.desc}</td>
                      <td>{row.potencia}</td>
                      <td>{row.seg}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>

            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mt: 4 }}>
              El Modo 3 es el único que incluye comunicación bidireccional mediante señales PWM en el pin de Control
              Pilot (CP). Esta comunicación permite que el Wallbox verifique que el vehículo está correctamente
              conectado antes de energizar el cable, que monitoree la temperatura del conector y que corte la energía
              inmediatamente si detecta una falla. Sin este nivel de protección, cualquier falla de aislamiento
              puede resultar en electrocución del usuario o incendio.
            </Typography>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 5, mb: 2, color: DARK }}>
              Cuándo NO hacer la instalación por cuenta propia
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              En Chile, toda instalación eléctrica de Baja Tensión debe ser realizada por un Instalador Eléctrico
              autorizado por la SEC (categoría A, B o C según la potencia del trabajo). Además, el formulario TE6
              debe ser firmado por el instalador y presentado ante la SEC para obtener la aprobación legal. Realizar
              la instalación sin este proceso invalida el seguro del inmueble en caso de siniestro eléctrico, puede
              resultar en multas de hasta 50 UTM y anula la garantía del Wallbox.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155' }}>
              Los casos más peligrosos de autoinstalación ocurren cuando el propietario instala el Wallbox pero
              conecta el cable al mismo circuito de enchufes existente, usa cable de sección insuficiente o
              prescinde del diferencial Tipo A. En todos estos casos, el sistema puede funcionar durante semanas o
              meses sin incidente visible, pero la degradación térmica del cable es progresiva y silenciosa.
            </Typography>
          </Container>
        </Box>

        {/* ── Section 4: Checklist de inspección ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Checklist de seguridad: qué verificar antes de firmar la recepción
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 4 }}>
              Si contratas la instalación con cualquier empresa, verifica estos puntos antes de aceptar el trabajo
              terminado. Un instalador certificado no tendrá problemas en mostrarte cada elemento.
            </Typography>
            {[
              'Tablero eléctrico tiene interruptor termomagnético dedicado para el circuito EV, correctamente dimensionado.',
              'Diferencial Tipo A de 30 mA (no Tipo AC) instalado en el circuito del Wallbox.',
              'Cable de sección mínima 6 mm² desde el tablero hasta el Wallbox, sin empalmes ni extensiones.',
              'Cable canalizado en conduit o canalete fijado a la pared, sin secciones sueltas.',
              'Wallbox correctamente fijado a la pared con tornillos y taco, sin movilidad.',
              'Puesta a tierra verificada con instrumento (resistencia medida y documentada).',
              'Formulario TE6 entregado por el instalador con su firma y número de carné SEC.',
              'Prueba de carga realizada en presencia del cliente antes de la entrega.',
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 2,
                  p: 2.5,
                  bgcolor: '#fff',
                  borderRadius: 2,
                  border: '1px solid #E2E8F0',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '4px',
                    border: `2px solid ${TEAL}`,
                    flexShrink: 0,
                    mt: '2px',
                  }}
                />
                <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#334155' }}>{item}</Typography>
              </Box>
            ))}
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
              Instalación certificada SEC, todas las protecciones incluidas
            </Typography>
            <Typography sx={{ color: '#94A3B8', mb: 5, fontSize: '1.05rem', maxWidth: 520, mx: 'auto' }}>
              Diferencial Tipo A, termomagnético dedicado, cable 6 mm², puesta a tierra verificada y TE6 gestionado
              en máximo 5 días hábiles. Desde $159.000 en casas y $369.000 en edificios.
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
                Cotizar instalación segura →
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

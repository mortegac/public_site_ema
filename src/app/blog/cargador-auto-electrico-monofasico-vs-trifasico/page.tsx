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
  title: 'Cargador Monofásico vs. Trifásico: ¿Cuál necesita tu auto?',
  description:
    'Diferencias entre cargador monofásico (7kW) y trifásico (22kW) para autos eléctricos en Chile. Elige según tu empalme y la capacidad de tu vehículo.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/cargador-auto-electrico-monofasico-vs-trifasico` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/cargador-auto-electrico-monofasico-vs-trifasico`,
    title: 'Cargador Monofásico vs. Trifásico para autos eléctricos en Chile',
    description:
      'Diferencias entre cargador monofásico (7kW) y trifásico (22kW) para autos eléctricos en Chile. Elige según tu empalme y la capacidad de tu vehículo.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Comparativa cargador monofásico vs trifásico para autos eléctricos en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargador Monofásico vs. Trifásico: ¿Cuál necesita tu auto?',
    description: 'Diferencias entre 7kW y 22kW para autos eléctricos en Chile. Elige según tu empalme.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Cargador Monofásico vs. Trifásico: ¿Cuál Necesita tu Auto Eléctrico?',
  description:
    'Diferencias entre cargador monofásico (7kW) y trifásico (22kW) para autos eléctricos en Chile. Elige según tu empalme y la capacidad de tu vehículo.',
  author: { '@type': 'Person', name: 'Gilberto Escalona', jobTitle: 'Gerente Técnico, Enérgica City' },
  publisher: { '@type': 'Organization', name: 'Enérgica City', url: CANONICAL_DOMAIN },
  datePublished: '2025-05-15',
  dateModified: '2025-05-15',
  url: `${CANONICAL_DOMAIN}/blog/cargador-auto-electrico-monofasico-vs-trifasico`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${CANONICAL_DOMAIN}/blog/cargador-auto-electrico-monofasico-vs-trifasico`,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo sé si mi casa tiene empalme monofásico o trifásico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Revisa el tablero eléctrico de tu hogar. Si hay un interruptor principal con dos bornes (o "fases") visibles, es monofásico. Si hay tres bornes o tres rieles de distribución distintos, tienes trifásico. También puedes consultar tu contrato de suministro con la distribuidora (Enel, CGE, etc.): el número de fases aparece especificado. El 95% de los hogares y el 60% de los apartamentos en Chile tienen empalme monofásico.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Vale la pena instalar un cargador trifásico 22kW en casa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Solo tiene sentido si tu vivienda ya cuenta con empalme trifásico Y tu auto puede recibir más de 11kW AC (por ejemplo, el Renault Zoe puede recibir 22kW). Para la mayoría de los vehículos eléctricos vendidos en Chile (BYD, Hyundai, Tesla), el cargador de a bordo acepta hasta 11kW AC, por lo que un Wallbox trifásico no entregará más velocidad que uno monofásico de 11kW. La instalación trifásica también es más cara y requiere tramitar un empalme trifásico ante la distribuidora.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda cargar un auto eléctrico con un Wallbox monofásico 7kW?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depende del tamaño de la batería. Un BYD Atto 3 (60,5 kWh) tarda aproximadamente 8,5 horas con un Wallbox de 7kW, lo que encaja perfectamente en una carga nocturna. Un Hyundai Ioniq 6 (77,4 kWh) tarda unas 11 horas con 7kW, o solo 7 horas con un Wallbox de 11kW. En la práctica, la gran mayoría de los propietarios de autos eléctricos en Chile cargan de noche y el auto está listo al despertar.',
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
      name: 'Cargador Monofásico vs. Trifásico',
      item: `${CANONICAL_DOMAIN}/blog/cargador-auto-electrico-monofasico-vs-trifasico`,
    },
  ],
}

const vehicleRows: Array<{ model: string; battery: string; acCharger: string; time7kw: string; time11kw: string }> = [
  { model: 'BYD Atto 3', battery: '60,5 kWh', acCharger: '7 kW (Tipo 2)', time7kw: '~8,5 h', time11kw: 'Sin mejora' },
  { model: 'BYD Dolphin', battery: '44,9 kWh', acCharger: '6,6 kW (Tipo 2)', time7kw: '~7 h', time11kw: 'Sin mejora' },
  { model: 'Hyundai Ioniq 5', battery: '77,4 kWh', acCharger: '11 kW (Tipo 2)', time7kw: '~11 h', time11kw: '~7 h' },
  { model: 'Hyundai Ioniq 6', battery: '77,4 kWh', acCharger: '11 kW (Tipo 2)', time7kw: '~11 h', time11kw: '~7 h' },
  { model: 'Tesla Model 3', battery: '75 kWh', acCharger: '11 kW (Tipo 2)', time7kw: '~11 h', time11kw: '~7 h' },
  { model: 'Renault Zoe', battery: '52 kWh', acCharger: '22 kW (Tipo 2)', time7kw: '~7,5 h', time11kw: '~4,7 h' },
  { model: 'MG MG4', battery: '64 kWh', acCharger: '11 kW (Tipo 2)', time7kw: '~9,2 h', time11kw: '~5,8 h' },
]

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />

      <Box component="main">
        {/* ── Hero teal gradient ── */}
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
                { label: 'Monofásico vs. Trifásico', href: null },
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
              Cargador Monofásico vs. Trifásico: ¿Cuál Necesita tu Auto Eléctrico?
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
              La diferencia entre 7 kW y 22 kW puede ser determinante para elegir bien. Te explicamos qué tipo de
              cargador AC admite tu vehículo y cómo verificar si tu empalme lo soporta.
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
              Cotizar instalación →
            </Box>
          </Container>
        </Box>

        {/* ── Stats bar ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: 5, borderBottom: '1px solid #E2E8F0' }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} justifyContent="center">
              {[
                { value: '95%', label: 'de hogares chilenos tienen empalme monofásico' },
                { value: '7,4 kW', label: 'potencia AC máxima de la mayoría de los EVs en Chile' },
                { value: '8–12 h', label: 'tiempo de carga nocturna con Wallbox 7kW' },
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

        {/* ── Section 1: ¿Qué es un cargador monofásico? ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              ¿Qué es un cargador monofásico y cuándo es suficiente?
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Un cargador eléctrico monofásico utiliza una sola fase de la red eléctrica domiciliaria (230 V en Chile).
              Su potencia máxima práctica ronda los 7,4 kW, aunque algunos modelos permiten ajustar la corriente hasta
              32 A, entregando exactamente 7.360 W en corriente alterna. Este nivel de potencia es más que suficiente
              para la mayoría de los autos eléctricos vendidos en Chile: si tu vehículo tiene un cargador de a bordo
              (OBC, onboard charger) de 7 kW o menos, instalar un Wallbox trifásico no te dará ningún beneficio.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              En términos prácticos, un Wallbox monofásico de 7 kW carga el BYD Atto 3 (60,5 kWh) completamente en
              unas 8,5 horas. Conectado a las 22:00 y desconectado a las 7:00 del día siguiente, el auto sale con
              batería al 100% sin necesidad de infraestructura especial. Las instalaciones monofásicas también son más
              simples y económicas: desde $159.000 CLP en casas unifamiliares con el servicio certificado SEC de
              Enérgica City.
            </Typography>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 5, mb: 2, color: DARK }}>
              Ventajas del cargador monofásico
            </Typography>
            <Box component="ul" sx={{ pl: 3, color: '#334155', '& li': { mb: 1.5, fontSize: '1.05rem', lineHeight: 1.7 } }}>
              <li>Compatible con el 95% de los empalmes residenciales en Chile.</li>
              <li>Instalación más simple, menor costo de material y mano de obra.</li>
              <li>
                Suficiente para BYD Atto 3, BYD Dolphin, MG MG4 y la mayoría de los EVs populares en el mercado
                chileno.
              </li>
              <li>Tramitación TE6 ante la SEC idéntica al trifásico.</li>
              <li>Menor impacto sobre el interruptor diferencial del tablero general.</li>
            </Box>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 5, mb: 2, color: DARK }}>
              Limitaciones del cargador monofásico
            </Typography>
            <Box component="ul" sx={{ pl: 3, color: '#334155', '& li': { mb: 1.5, fontSize: '1.05rem', lineHeight: 1.7 } }}>
              <li>
                No puede entregar más de 7,4 kW AC, por lo que si tu vehículo acepta 11 kW o más, no aprovechas toda
                la capacidad del OBC.
              </li>
              <li>Para flotas con requerimientos de carga rápida AC, puede ser insuficiente.</li>
              <li>
                En edificios con muchos puntos de carga simultánea, la suma de cargas monofásicas puede desequilibrar
                las fases de la red interna.
              </li>
            </Box>
          </Container>
        </Box>

        {/* ── Section 2: ¿Qué es un cargador trifásico? ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Cargador trifásico: 22 kW para quien realmente los puede usar
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Un cargador trifásico opera con las tres fases de la red eléctrica (400 V entre fases en Chile). Su
              potencia máxima en corriente alterna llega a 22 kW (32 A × 3 fases × 230 V ≈ 22.080 W). Esta potencia
              es particularmente útil en aplicaciones comerciales, flotas corporativas y edificios de oficinas donde
              los vehículos necesitan estar cargados en ventanas de 3 a 4 horas durante el día.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Sin embargo, hay una trampa frecuente: muchos propietarios instalan un cargador trifásico esperando
              velocidades de carga muy superiores, sin verificar previamente que su auto pueda recibirlos. El
              cargador de a bordo (OBC) del vehículo es el cuello de botella. Si tu auto tiene un OBC de 11 kW
              (como el Hyundai Ioniq 5 o el Tesla Model 3), instalando un Wallbox trifásico de 22 kW solo conseguirás
              cargar a 11 kW de todas formas, porque el OBC del auto limita la potencia recibida.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              En Chile, solo el Renault Zoe y algunos modelos Renault Kangoo E-Tech cuentan con OBC nativo de 22 kW,
              lo que hace que un cargador trifásico realmente marque diferencia. Para estos vehículos, la diferencia
              entre monofásico y trifásico es pasar de 7,5 horas de carga a solo 2,5 horas.
            </Typography>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 5, mb: 2, color: DARK }}>
              Requisitos para instalar un cargador trifásico en Chile
            </Typography>
            <Box component="ul" sx={{ pl: 3, color: '#334155', '& li': { mb: 1.5, fontSize: '1.05rem', lineHeight: 1.7 } }}>
              <li>
                Empalme trifásico existente: solo el 5% de los hogares y el 40% de las empresas e industrias en Chile
                tienen suministro trifásico.
              </li>
              <li>
                Si no tienes empalme trifásico, debes solicitarlo a la distribuidora (Enel, CGE, Saesa, etc.), lo que
                implica un proceso de semanas y un mayor cargo fijo mensual en la cuenta de la luz.
              </li>
              <li>
                Cableado de sección mínima 6 mm² por fase hasta el punto de carga, con neutro y tierra incluidos.
              </li>
              <li>
                Interruptor termomagnético trifásico y diferencial Tipo A trifásico calibrados para 32 A por fase.
              </li>
              <li>Formulario TE6 ante la SEC igual que en instalaciones monofásicas.</li>
            </Box>
          </Container>
        </Box>

        {/* ── Section 3: La pregunta clave — OBC del vehículo ── */}
        <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              La pregunta clave: ¿cuánto acepta el OBC de tu vehículo?
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              El cargador de a bordo (OBC, Onboard Charger) es el componente electrónico dentro del vehículo que
              convierte la corriente alterna de la red en corriente continua para cargar la batería. No importa cuánta
              potencia entregue el Wallbox: el OBC siempre actúa como el verdadero cuello de botella de la carga AC.
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 3 }}>
              Antes de decidir entre monofásico y trifásico, busca las especificaciones técnicas de tu vehículo en el
              manual o en el sitio oficial del fabricante. Busca el campo "Carga AC máxima" o "Onboard Charger". Si
              indica 7,2 kW o 7,4 kW, un Wallbox monofásico es el tope. Si indica 11 kW, necesitas un Wallbox de
              11 kW (monofásico o trifásico según tu empalme). Si indica 22 kW, solo un trifásico aprovechará toda la
              velocidad disponible.
            </Typography>

            {/* Comparison table */}
            <Box sx={{ mt: 5, overflowX: 'auto' }}>
              <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mb: 3, color: DARK }}>
                Tabla: OBC y tiempos de carga por modelo EV popular en Chile
              </Typography>
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
                    whiteSpace: 'nowrap',
                  },
                  '& td': { py: 1.25, px: 2, borderBottom: '1px solid #E2E8F0', color: '#334155' },
                  '& tr:nth-of-type(even) td': { bgcolor: GRAY_BG },
                }}
              >
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Batería</th>
                    <th>OBC máx. (AC)</th>
                    <th>Tiempo con 7 kW</th>
                    <th>Tiempo con 11 kW</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleRows.map((row) => (
                    <tr key={row.model}>
                      <td style={{ fontWeight: 600 }}>{row.model}</td>
                      <td>{row.battery}</td>
                      <td>{row.acCharger}</td>
                      <td>{row.time7kw}</td>
                      <td>{row.time11kw}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mt: 1.5, fontStyle: 'italic' }}>
                Tiempos estimados de 0% a 100%. Pueden variar según temperatura y estado de la batería.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* ── Section 4: Cómo elegir ── */}
        <Box sx={{ bgcolor: GRAY_BG, py: { xs: 6, md: 10 } }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 700, mb: 3, color: DARK }}>
              Cómo elegir el tipo correcto: checklist paso a paso
            </Typography>
            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mb: 4 }}>
              Antes de cotizar cualquier instalación, responde estas tres preguntas en orden. Cada respuesta puede
              cerrar opciones o abrir posibilidades.
            </Typography>

            {[
              {
                step: '1',
                title: '¿Cuál es la capacidad AC máxima del OBC de tu vehículo?',
                text: 'Consulta el manual o la ficha técnica oficial. Si es ≤ 7,4 kW, un Wallbox monofásico es el tope y no necesitas más. Si es 11 kW, evalúa si tienes empalme trifásico para aprovechar la diferencia. Si es 22 kW, solo con trifásico obtendrás velocidad máxima.',
              },
              {
                step: '2',
                title: '¿Qué tipo de empalme tienes en tu hogar o negocio?',
                text: 'Revisa el tablero eléctrico o consulta tu contrato de suministro. El 95% de los hogares chilenos son monofásicos. Si quieres trifásico y no lo tienes, deberás solicitarlo a tu distribuidora, proceso que puede tomar varias semanas y aumenta el cargo fijo mensual.',
              },
              {
                step: '3',
                title: '¿Cuántas horas tienes disponibles para cargar?',
                text: 'Si cargas de noche (8–10 horas), un Wallbox de 7 kW es más que suficiente para el 90% de los autos en Chile. Si necesitas cargar en 3–4 horas (uso diurno en oficina, flota), busca al menos 11 kW. Para vehículos comerciales pesados o recargas rápidas programadas, considera DC rápido.',
              },
            ].map((item) => (
              <Box
                key={item.step}
                sx={{
                  display: 'flex',
                  gap: 3,
                  mb: 4,
                  p: 3,
                  bgcolor: '#fff',
                  borderRadius: 2,
                  border: '1px solid #E2E8F0',
                }}
              >
                <Box
                  sx={{
                    minWidth: 44,
                    height: 44,
                    borderRadius: '50%',
                    bgcolor: TEAL,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, mb: 1, color: DARK }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>{item.text}</Typography>
                </Box>
              </Box>
            ))}

            <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', mt: 2 }}>
              En Enérgica City, cada cotización incluye una visita técnica gratuita donde nuestros ingenieros verifican
              el tipo de empalme, la capacidad del tablero y la distancia al punto de carga. Con esa información, la
              recomendación entre monofásico y trifásico es técnica, no comercial.
            </Typography>
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
              ¿No sabes qué cargador necesita tu auto?
            </Typography>
            <Typography sx={{ color: '#94A3B8', mb: 5, fontSize: '1.05rem', maxWidth: 520, mx: 'auto' }}>
              Nuestros ingenieros revisan tu tipo de empalme, el OBC de tu vehículo y el tablero eléctrico antes de
              recomendarte nada. Instalación certificada SEC desde $159.000 CLP.
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
                Cotizar gratis →
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

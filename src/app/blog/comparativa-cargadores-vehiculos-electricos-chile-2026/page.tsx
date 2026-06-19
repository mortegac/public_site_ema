import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import BlogBreadcrumb from '@/app/components/shared/BlogBreadcrumb'
import AuthorByline from '@/app/components/shared/AuthorByline'
import { CANONICAL_DOMAIN } from '@/utils/seo-config'
import BlogRelatedArticles from '@/app/components/shared/BlogRelatedArticles'

const DARK = '#0F172A'
const TEAL = '#0898b9'
const TEAL_DARK = '#0777a0'
const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'

const SLUG = 'comparativa-cargadores-vehiculos-electricos-chile-2026'

export const metadata: Metadata = {
  title: 'Comparativa Cargadores para Autos Eléctricos Chile 2026: Wallbox y Portátiles',
  description:
    'Compara los 8 mejores Wallbox para autos eléctricos disponibles en Chile 2026: ZEERO Minibox, EFFITEC, LIVOLTEK, KPN, BESTE, BENY y Workersbee portátil. Precios y especificaciones.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Comparativa Cargadores para Autos Eléctricos Chile 2026: Wallbox y Portátiles',
    description:
      'Precios actualizados, potencia, conectividad y cuándo elegir cada uno. Compara todos los cargadores EV disponibles en Chile con instalación certificada SEC.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Comparativa cargadores vehículos eléctricos Chile 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparativa Wallbox Chile 2026: ZEERO, EFFITEC, KPN, BESTE y más',
    description: 'Precios, potencia y conectividad de los 8 mejores cargadores EV disponibles en Chile con certificación SEC.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Comparativa de Cargadores para Vehículos Eléctricos en Chile 2026: Wallbox y Portátiles',
  description:
    'Comparativa completa de los 8 cargadores EV disponibles en Chile 2026: ZEERO Minibox, EFFITEC, LIVOLTEK, KPN KBox App, KPN KBox OCPP, BESTE TS-EVC07, BESTE Smart Mini, BENY y Workersbee portátil.',
  author: {
    '@type': 'Person',
    name: 'Felipe Donoso',
    jobTitle: 'Ingeniero Eléctrico, Enérgica City',
  },
  reviewer: {
    '@type': 'Person',
    name: 'Gilberto Escalona',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Enérgica City',
    url: CANONICAL_DOMAIN,
  },
  datePublished: '2026-06-19',
  dateModified: '2026-06-19',
  url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${CANONICAL_DOMAIN}/blog/${SLUG}`,
  },
  keywords:
    'comparativa cargadores autos eléctricos Chile, mejores Wallbox Chile 2026, ZEERO Minibox, EFFITEC wallbox, KPN KBox, BESTE cargador, BENY wallbox, cargador portátil EV Chile, precio wallbox Chile',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuál es el mejor Wallbox para auto eléctrico en Chile en 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El mejor Wallbox depende de tu prioridad. Para la mejor relación calidad-precio, el ZEERO Minibox 7 kW a $549.989 es la opción más accesible con instalación incluida. Si priorizas conectividad avanzada y gestión OCPP (compatible con sistemas de flota o edificios inteligentes), el KPN KBox OCPP 1.6 a $779.450 es el más completo. Si necesitas flexibilidad para cargar en distintos lugares antes de tener instalación fija, el Workersbee 2,2–7 kW portátil a $299.000 es la única opción portable del catálogo. Todos los modelos tienen compatibilidad con el conector Tipo 2 (IEC 62196), estándar de todos los vehículos eléctricos vendidos en Chile.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre un cargador portátil y un Wallbox fijo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un cargador portátil como el Workersbee 2,2–7 kW se conecta a un enchufe convencional o industrial y puede llevarse de un lugar a otro. Ofrece potencia regulable pero requiere acceso a un punto eléctrico apropiado y no usa circuito dedicado. Un Wallbox fijo se instala permanentemente en la pared con un circuito dedicado desde el tablero, protecciones tipo A y certificado TE6: es más seguro, más rápido y la opción correcta para carga diaria. Los Wallbox del catálogo de Enérgica City operan entre 7 y 7,4 kW constantes, en comparación con los 2,2–7 kW variables del portátil.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los cargadores KPN OCPP son compatibles con todos los autos eléctricos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Todos los Wallbox del catálogo usan conector Tipo 2 (IEC 62196-2), que es el estándar para carga AC en todos los vehículos eléctricos vendidos en Chile: BYD, Tesla, Hyundai, Kia, Volvo, MG, Maxus, JAC y todos los demás. El protocolo OCPP 1.6 del KPN KBox es una característica de gestión de red (comunicación con sistemas de administración de energía), no afecta la compatibilidad con el vehículo. Cualquiera de los 8 modelos carga cualquier auto eléctrico de pasajeros disponible en el mercado chileno.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda cargar un auto eléctrico con un Wallbox de 7 kW?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con un Wallbox de 7 kW: BYD Dolphin (44,9 kWh) en ~6,5 horas desde 0%, BYD Seal (75,7 kWh) en ~11 horas, Hyundai Ioniq 5 (72 kWh) en ~10 horas, Tesla Model 3 estándar (57,5 kWh) en ~8,5 horas, Kia EV6 (77 kWh) en ~11 horas. En la práctica, la mayoría de los conductores no carga desde 0%: si llegas cada noche con el 20–30% de batería, una carga nocturna de 6–8 horas con cualquiera de los Wallbox de 7 kW es más que suficiente para salir al día siguiente con el 100%.',
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
      name: 'Comparativa Cargadores para Autos Eléctricos Chile 2026',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

const CHARGERS = [
  {
    id: 'workersbee',
    name: 'Workersbee 2.2–7 kW',
    tipo: 'Portátil',
    kw: '2,2–7 kW (regulable)',
    conector: 'Tipo 2',
    conectividad: 'Sin conectividad WiFi',
    ocpp: 'No',
    precio: 299000,
    destacado: false,
    badge: 'SOLO PORTÁTIL',
    badgeBg: TEXT_MUTED,
    pros: ['Flexible — sin instalación fija', 'Potencia regulable', 'Precio más accesible'],
    cons: ['No reemplaza un Wallbox para uso diario', 'Sin gestión inteligente', 'Sin TE6 propio'],
    ideal: 'Usuarios sin estacionamiento fijo o que necesitan carga ocasional en distintos lugares.',
  },
  {
    id: 'zeero',
    name: 'ZEERO Minibox 7 kW',
    tipo: 'Wallbox',
    kw: '7 kW',
    conector: 'Tipo 2',
    conectividad: 'WiFi',
    ocpp: 'No',
    precio: 549989,
    destacado: true,
    badge: 'MEJOR PRECIO',
    badgeBg: TEAL,
    pros: ['Precio más bajo de Wallbox fijos', 'Diseño compacto', 'Conectividad WiFi básica'],
    cons: ['Sin protocolo OCPP', 'Potencia limitada a 7 kW (vs 7,3 kW de otros)'],
    ideal: 'Uso residencial estándar con presupuesto ajustado. Ideal para casas con empalme de 25 A.',
  },
  {
    id: 'effitec',
    name: 'EFFITEC 7 kW',
    tipo: 'Wallbox',
    kw: '7 kW',
    conector: 'Cable Tipo 2 integrado',
    conectividad: 'WiFi',
    ocpp: 'No',
    precio: 599900,
    destacado: false,
    badge: 'CABLE INCLUIDO',
    badgeBg: '#6366F1',
    pros: ['Cable Tipo 2 integrado (no necesitas cable adicional)', 'Buena relación precio-calidad'],
    cons: ['Sin OCPP', 'Cable fijo puede ser menos flexible'],
    ideal: 'Quien quiere comodidad operativa sin gestionar un cable separado.',
  },
  {
    id: 'livoltek',
    name: 'LIVOLTEK Smart EV 7.3 kW',
    tipo: 'Wallbox',
    kw: '7,3 kW',
    conector: 'Tipo 2',
    conectividad: 'WiFi + App',
    ocpp: 'No',
    precio: 650000,
    destacado: false,
    badge: 'APP AVANZADA',
    badgeBg: '#7C3AED',
    pros: ['App con gestión de carga avanzada', 'Monitoreo de consumo en tiempo real', '7,3 kW (3% más que los de 7 kW)'],
    cons: ['Sin OCPP para integración con sistemas de edificio', 'Precio medio-alto'],
    ideal: 'Usuarios que quieren control completo desde el celular y seguimiento del consumo.',
  },
  {
    id: 'kpn-app',
    name: 'KPN KBox App 7.3 kW',
    tipo: 'Wallbox',
    kw: '7,3 kW',
    conector: 'Tipo 2',
    conectividad: 'WiFi + App',
    ocpp: 'No',
    precio: 606900,
    destacado: false,
    badge: 'APP DE USUARIO',
    badgeBg: '#0891B2',
    pros: ['App de usuario para programar carga', 'Precio competitivo para 7,3 kW', 'Gestión dinámica de carga'],
    cons: ['Sin OCPP — no apto para gestión de flota'],
    ideal: 'Uso residencial con programación horaria para aprovechar tarifas nocturnas.',
  },
  {
    id: 'beste-s',
    name: 'BESTE TS-EVC07-003(S) 7.3 kW',
    tipo: 'Wallbox',
    kw: '7,3 kW',
    conector: 'Cable Tipo 2 integrado',
    conectividad: 'WiFi',
    ocpp: 'No',
    precio: 773500,
    destacado: false,
    badge: 'CABLE INTEGRADO',
    badgeBg: '#059669',
    pros: ['Cable Tipo 2 integrado', 'Alta potencia 7,3 kW', 'Construcción robusta'],
    cons: ['Precio más alto del segmento medio', 'Sin OCPP'],
    ideal: 'Instalaciones que priorizan durabilidad y cable integrado a máxima potencia.',
  },
  {
    id: 'beste-mini',
    name: 'BESTE Smart Mini 7.3 kW',
    tipo: 'Wallbox',
    kw: '7,3 kW',
    conector: 'Tipo 2',
    conectividad: 'WiFi + App',
    ocpp: 'No',
    precio: 773500,
    destacado: false,
    badge: 'DISEÑO COMPACTO',
    badgeBg: '#D97706',
    pros: ['Diseño muy compacto — ideal para espacios reducidos', 'App inteligente', '7,3 kW completos'],
    cons: ['Mismo precio que el BESTE TS (sin cable integrado)', 'Sin OCPP'],
    ideal: 'Estacionamientos con poco espacio de pared o instalaciones que priorizan estética.',
  },
  {
    id: 'kpn-ocpp',
    name: 'KPN KBox OCPP 1.6 7.3 kW',
    tipo: 'Wallbox',
    kw: '7,3 kW',
    conector: 'Tipo 2',
    conectividad: 'WiFi + OCPP 1.6',
    ocpp: 'Sí (OCPP 1.6)',
    precio: 779450,
    destacado: true,
    badge: 'OCPP 1.6',
    badgeBg: PINK,
    pros: ['Protocolo OCPP 1.6 — compatible con sistemas de gestión de flota y edificio', 'Máxima potencia 7,3 kW', 'Apto para proyectos multi-punto'],
    cons: ['El más caro de los KPN', 'OCPP innecesario para uso residencial individual'],
    ideal: 'Edificios con múltiples cargadores, flotas corporativas o proyectos con gestión energética centralizada.',
  },
  {
    id: 'beny',
    name: 'BENY 7 kW',
    tipo: 'Wallbox',
    kw: '7 kW',
    conector: 'Tipo 2',
    conectividad: 'WiFi + App',
    ocpp: 'No',
    precio: 889800,
    destacado: false,
    badge: 'PREMIUM',
    badgeBg: DARK,
    pros: ['Marca reconocida internacionalmente', 'App robusta', 'Alta confiabilidad en proyectos corporativos'],
    cons: ['El más caro del catálogo sin OCPP', 'Solo 7 kW vs 7,3 kW de competidores más baratos'],
    ideal: 'Usuarios que priorizan marca y confiabilidad por sobre el precio, o proyectos con requisitos corporativos.',
  },
]

function formatPrice(p: number) {
  return `$${p.toLocaleString('es-CL')}`
}

export default function ArticlePage() {
  const wallboxes = CHARGERS.filter((c) => c.tipo === 'Wallbox')
  const portables = CHARGERS.filter((c) => c.tipo === 'Portátil')

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
      <BlogBreadcrumb title="Comparativa Cargadores para Autos Eléctricos Chile 2026" />
      <Box component="main">
        {/* Featured image */}
        <Box sx={{ width: '100%', lineHeight: 0 }}>
          <Image
            src="/images/post/31_1170x400.png"
            alt="Comparativa de cargadores para autos eléctricos Chile 2026"
            width={1170}
            height={400}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </Box>
        {/* Hero */}
        <Box
          sx={{
            background: 'linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)',
            py: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Wallbox', 'Portátil', 'Comparativa', 'Chile 2026', 'Precios'].map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: 2, py: 0.5, borderRadius: '999px',
                    background: 'rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.18)',
                    fontSize: '0.78rem', fontWeight: 600, color: '#000',
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>
            <Typography component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, lineHeight: 1.15, mb: 3, color: '#000000' }}>
              Comparativa de Cargadores para Autos Eléctricos en Chile 2026
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: '#000000', maxWidth: 600, lineHeight: 1.7, mx: 'auto', mb: 5 }}>
              8 modelos comparados: precios reales, potencia, conectividad y para quién es cada uno.
              Todos disponibles en Chile con instalación certificada SEC.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box component={Link} href="/cargadores-vehiculos-electricos-sin-instalacion"
                sx={{ display: 'inline-block', bgcolor: PINK, color: '#fff', px: 4, py: 1.5, borderRadius: 2, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', '&:hover': { bgcolor: PINK_DARK } }}>
                Comprar cargador →
              </Box>
              <Box component={Link} href="/cotizador"
                sx={{ display: 'inline-block', bgcolor: 'rgba(0,0,0,0.12)', color: '#000', px: 4, py: 1.5, borderRadius: 2, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', border: '1px solid rgba(0,0,0,0.2)', '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' } }}>
                Cotizar con instalación →
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ bgcolor: DARK, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" textAlign="center">
              {[
                { value: '9', label: 'Modelos comparados (8 Wallbox + 1 portátil)' },
                { value: '7–7,3 kW', label: 'Potencia estándar de los Wallbox' },
                { value: '$299k–$890k', label: 'Rango de precios del catálogo' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Typography sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 800, color: TEAL }}>
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: '#CBD5E1', mt: 0.5, fontSize: '0.9rem' }}>{stat.label}</Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Main content */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">

            {/* GEO definition block */}
            <Typography component="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}>
              ¿Qué Wallbox se venden en Chile en 2026?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 4 }}>
              En Chile, el catálogo de cargadores para autos eléctricos de Enérgica City incluye 9
              modelos: un cargador portátil Workersbee (2,2–7 kW) y ocho Wallbox fijos de 7 a
              7,3 kW, con precios entre $299.000 y $889.800. Todos los Wallbox usan conector Tipo
              2 (IEC 62196-2) compatible con todos los vehículos eléctricos disponibles en el
              mercado chileno. Las principales diferencias entre modelos son el precio, la
              conectividad (WiFi / App / OCPP 1.6) y si incluyen cable integrado o socket. Puedes{' '}
              <Link href="/cargadores-vehiculos-electricos-sin-instalacion" style={{ color: TEAL, fontWeight: 600 }}>
                ver el catálogo completo y comprar
              </Link>{' '}
              o{' '}
              <Link href="/cotizador" style={{ color: TEAL, fontWeight: 600 }}>
                cotizar con instalación incluida
              </Link>{' '}
              en el cotizador de Enérgica City.
            </Typography>

            {/* Quick comparison table */}
            <Typography component="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}>
              Comparativa rápida: todos los modelos
            </Typography>
            <Box sx={{ overflowX: 'auto', mb: 6 }}>
              <Box component="table" sx={{
                width: '100%',
                borderCollapse: 'collapse',
                '& th': { bgcolor: DARK, color: '#fff', px: 2, py: 1.5, textAlign: 'left', fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap' },
                '& td': { px: 2, py: 1.5, borderBottom: '1px solid #E2E8F0', fontSize: '0.82rem', color: DARK, verticalAlign: 'middle' },
                '& tr:nth-of-type(even) td': { bgcolor: '#F1F5F9' },
              }}>
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Tipo</th>
                    <th>Potencia</th>
                    <th>Conectividad</th>
                    <th>OCPP</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {CHARGERS.map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.name}</td>
                      <td>
                        <Box sx={{ display: 'inline-block', px: 1, py: 0.2, borderRadius: '4px', bgcolor: c.tipo === 'Portátil' ? '#F1F5F9' : '#EFF9FC', color: c.tipo === 'Portátil' ? TEXT_MUTED : TEAL, fontSize: '0.78rem', fontWeight: 600 }}>
                          {c.tipo}
                        </Box>
                      </td>
                      <td style={{ color: TEAL, fontWeight: 600 }}>{c.kw}</td>
                      <td>{c.conectividad}</td>
                      <td style={{ color: c.ocpp !== 'No' ? PINK : TEXT_MUTED, fontWeight: c.ocpp !== 'No' ? 700 : 400 }}>{c.ocpp}</td>
                      <td style={{ fontWeight: 700 }}>{formatPrice(c.precio)}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>

            {/* Detailed cards — Wallbox */}
            <Typography component="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 4, mt: 2 }}>
              Análisis detallado: Wallbox fijos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
              {wallboxes.map((c) => (
                <Box
                  key={c.id}
                  sx={{ p: 3, borderRadius: 2, border: '1px solid #E2E8F0', borderLeft: `4px solid ${c.destacado ? PINK : '#CBD5E1'}`, background: GRAY_BG }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ px: 1.5, py: 0.4, borderRadius: '999px', background: c.badgeBg, color: '#fff', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                      {c.badge}
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: DARK }}>{c.name}</Typography>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: TEAL, ml: 'auto' }}>{formatPrice(c.precio)}</Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, mb: 2 }}>
                    {[
                      ['Potencia', c.kw],
                      ['Conector', c.conector],
                      ['Conectividad', c.conectividad],
                      ['OCPP', c.ocpp],
                    ].map(([label, val]) => (
                      <Box key={label} sx={{ display: 'flex', gap: 1 }}>
                        <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, flexShrink: 0, minWidth: 90 }}>{label}:</Typography>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: DARK }}>{val}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: TEAL, mb: 0.75 }}>A favor</Typography>
                      {c.pros.map((p) => (
                        <Typography key={p} sx={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>✓ {p}</Typography>
                      ))}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: PINK, mb: 0.75 }}>A considerar</Typography>
                      {c.cons.map((p) => (
                        <Typography key={p} sx={{ fontSize: '0.82rem', color: TEXT_MUTED, lineHeight: 1.6 }}>— {p}</Typography>
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ p: 1.5, background: '#fff', borderRadius: 1, border: '1px solid #E2E8F0' }}>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: DARK, display: 'inline' }}>Ideal para: </Typography>
                    <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, display: 'inline' }}>{c.ideal}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Portable section */}
            <Typography component="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}>
              Cargador portátil: Workersbee
            </Typography>
            {portables.map((c) => (
              <Box key={c.id} sx={{ p: 3, borderRadius: 2, border: '1px solid #E2E8F0', borderLeft: `4px solid ${TEXT_MUTED}`, background: GRAY_BG, mb: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ px: 1.5, py: 0.4, borderRadius: '999px', background: TEXT_MUTED, color: '#fff', fontSize: '0.72rem', fontWeight: 700 }}>
                    {c.badge}
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: DARK }}>{c.name}</Typography>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: TEAL, ml: 'auto' }}>{formatPrice(c.precio)}</Typography>
                </Box>
                <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 2, fontSize: '0.95rem' }}>
                  El Workersbee es el único cargador portátil del catálogo. Su potencia es regulable
                  entre 2,2 kW y 7 kW según la instalación disponible. Es la opción para usuarios
                  que aún no tienen instalación fija, que necesitan carga en distintos lugares o que
                  quieren un respaldo para viajes. <strong>No reemplaza a un Wallbox</strong> para
                  uso diario: sin circuito dedicado, no puede garantizar carga segura durante toda la
                  noche en un enchufe convencional.
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: TEAL, mb: 0.75 }}>A favor</Typography>
                    {c.pros.map((p) => <Typography key={p} sx={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>✓ {p}</Typography>)}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: PINK, mb: 0.75 }}>A considerar</Typography>
                    {c.cons.map((p) => <Typography key={p} sx={{ fontSize: '0.82rem', color: TEXT_MUTED, lineHeight: 1.6 }}>— {p}</Typography>)}
                  </Box>
                </Box>
              </Box>
            ))}

            {/* Decision guide */}
            <Typography component="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}>
              ¿Cuál cargador elegir según tu caso?
            </Typography>
            <Box sx={{ border: '1px solid #E2E8F0', borderRadius: 2, overflow: 'hidden', mb: 6 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', background: DARK, color: '#fff', px: 2, py: 1.5 }}>
                {['Tu situación', 'Modelo recomendado'].map((h) => (
                  <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{h}</Typography>
                ))}
              </Box>
              {[
                ['Quiero el Wallbox más económico', 'ZEERO Minibox — $549.989'],
                ['Necesito cable integrado sin gestionar extras', 'EFFITEC 7 kW — $599.900'],
                ['Quiero la mejor app para programar horarios', 'LIVOLTEK Smart EV — $650.000'],
                ['Precio medio con app de programación', 'KPN KBox App — $606.900'],
                ['Proyecto edificio o flota con gestión OCPP', 'KPN KBox OCPP 1.6 — $779.450'],
                ['Priorizo diseño compacto y estética', 'BESTE Smart Mini — $773.500'],
                ['Máxima potencia con cable integrado', 'BESTE TS-EVC07 — $773.500'],
                ['Marca internacional con máxima confiabilidad', 'BENY 7 kW — $889.800'],
                ['Sin instalación fija, carga ocasional', 'Workersbee portátil — $299.000'],
              ].map(([situation, rec], i) => (
                <Box key={situation} sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', px: 2, py: 1.75, background: i % 2 === 0 ? GRAY_BG : '#fff', borderTop: '1px solid #E2E8F0' }}>
                  <Typography sx={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.6, pr: 2 }}>{situation}</Typography>
                  <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: TEAL, lineHeight: 1.6 }}>{rec}</Typography>
                </Box>
              ))}
            </Box>

            {/* Cluster links */}
            <Typography component="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 3, mt: 2 }}>
              Antes de comprar: guías relacionadas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              {[
                {
                  href: '/blog/guia-cargar-auto-electrico-casa-normativa-sec-te6',
                  label: 'Normativa SEC: qué exige el RIC N°15 para tu instalación',
                  desc: 'TE6 obligatorio, circuito dedicado, diferencial tipo A y gestión de empalme.',
                },
                {
                  href: '/blog/instalar-cargador-electrico-casa-wallbox',
                  label: 'Cómo instalar un Wallbox en casa: proceso completo',
                  desc: 'Desde la visita técnica hasta el certificado TE6.',
                },
                {
                  href: '/blog/cargador-portatil-vs-wallbox-cual-conviene',
                  label: 'Cargador portátil vs Wallbox fijo: diferencias reales',
                  desc: 'Cuándo el portátil tiene sentido y cuándo necesitas instalación fija.',
                },
                {
                  href: '/blog/presupuesto-instalacion-cargador-electrico-desglose',
                  label: 'Desglose de costos de instalación: sin letra chica',
                  desc: 'Qué incluye el precio desde $159.000 y qué lo puede encarecer.',
                },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                  <Box sx={{ p: 2.5, borderRadius: 2, border: '1px solid #E2E8F0', background: GRAY_BG, '&:hover': { borderColor: TEAL, background: '#EFF9FC' }, transition: 'all 0.15s' }}>
                    <Typography sx={{ fontWeight: 700, color: TEAL, fontSize: '0.95rem', mb: 0.5 }}>{link.label}</Typography>
                    <Typography sx={{ color: TEXT_MUTED, fontSize: '0.88rem' }}>{link.desc}</Typography>
                  </Box>
                </Link>
              ))}
            </Box>
          </Container>
        </Box>

        {/* FAQ */}
        <Box sx={{ py: { xs: 6, md: 8 }, background: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography component="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' }, fontWeight: 700, color: DARK, mb: 5, textAlign: 'center' }}>
              Preguntas frecuentes sobre cargadores EV en Chile
            </Typography>
            {faqSchema.mainEntity.map((item) => (
              <Box key={item.name} sx={{ mb: 3, p: 3, background: '#fff', borderRadius: 2, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                <Typography sx={{ fontWeight: 700, color: DARK, mb: 1 }}>{item.name}</Typography>
                <Typography sx={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>{item.acceptedAnswer.text}</Typography>
              </Box>
            ))}
          </Container>
        </Box>

        <BlogRelatedArticles currentUid={SLUG} />
        <AuthorByline />

        {/* Dark CTA band */}
        <Box sx={{ background: DARK, py: { xs: 8, md: 10 } }}>
          <Container maxWidth="md">
            <Typography sx={{ fontSize: { xs: '1.7rem', md: '2.4rem' }, fontWeight: 800, color: '#fff', textAlign: 'center', mb: 2 }}>
              ¿Ya elegiste tu cargador?
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: 5, fontSize: '1.05rem' }}>
              Cómpralo en el catálogo o cotiza con instalación certificada SEC incluida. Técnicos
              a domicilio en RM y Valparaíso.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/cargadores-vehiculos-electricos-sin-instalacion" style={{ textDecoration: 'none' }}>
                <Box sx={{ px: 4, py: 1.75, background: PINK, color: '#fff', fontWeight: 700, fontSize: '1rem', '&:hover': { background: PINK_DARK }, cursor: 'pointer' }}>
                  Comprar cargador →
                </Box>
              </Link>
              <Link href="/cotizador" style={{ textDecoration: 'none' }}>
                <Box sx={{ px: 4, py: 1.75, background: TEAL, color: '#fff', fontWeight: 700, fontSize: '1rem', '&:hover': { background: TEAL_DARK }, cursor: 'pointer' }}>
                  Cotizar con instalación →
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

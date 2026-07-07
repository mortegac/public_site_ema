import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Container, Box, Typography, Grid } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import { CANONICAL_DOMAIN } from '@/utils/seo-config'

const DARK = '#0F172A'
const TEAL = '#0898b9'
const TEAL_DARK = '#0777a0'
const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'

const PAGE_URL = `${CANONICAL_DOMAIN}/agenda-una-visita-tecnica-para-evaluar-la-instalacion-de-tu-cargador`

export const metadata: Metadata = {
  title: 'Agenda una Visita Técnica para Evaluar la Instalación de tu Cargador',
  description:
    'Agenda una visita técnica con un instalador certificado SEC para evaluar la instalación de tu cargador eléctrico. Partner oficial de Abastibletec. Presupuesto definitivo en 48 horas.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    url: PAGE_URL,
    title: 'Agenda una Visita Técnica para Evaluar la Instalación de tu Cargador',
    description:
      'Instalador certificado SEC a domicilio. Evaluamos tu empalme, distancia al tablero y te entregamos presupuesto en 48 horas. Partner de Abastibletec.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`,
        width: 1200,
        height: 630,
        alt: 'Visita técnica instalación cargador eléctrico Enérgica City',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agenda Visita Técnica — Cargador Eléctrico',
    description: 'Instalador SEC a domicilio. Presupuesto definitivo en 48 horas. Partner de Abastibletec.',
    images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`],
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Agenda una Visita Técnica para Evaluar la Instalación de tu Cargador Eléctrico',
  description:
    'Servicio de visita técnica domiciliaria para evaluar la instalación de cargadores EV en Chile. Partner oficial de Abastibletec.',
  url: PAGE_URL,
  provider: {
    '@type': 'Organization',
    name: 'Enérgica City',
    url: CANONICAL_DOMAIN,
    sameAs: ['https://abastibletec.cl/electromovilidad/cargadoreselectricos/'],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Visita técnica para instalación de cargador eléctrico',
  description:
    'Visita técnica domiciliaria con instalador certificado SEC que evalúa la capacidad del empalme, la distancia al tablero y entrega presupuesto definitivo en 48 horas.',
  provider: {
    '@type': 'Organization',
    name: 'Enérgica City',
    url: CANONICAL_DOMAIN,
  },
  areaServed: ['Santiago', 'Región Metropolitana', 'Valparaíso'],
  offers: {
    '@type': 'Offer',
    price: '29000',
    priceCurrency: 'CLP',
    description: 'Visita técnica + kit de documentos para edificios, acreditable al presupuesto final.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: CANONICAL_DOMAIN },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Agenda Visita Técnica',
      item: PAGE_URL,
    },
  ],
}

const visitIncludes = [
  {
    title: 'Evaluación del empalme eléctrico',
    body: 'Verificamos la capacidad disponible de tu empalme y si puede soportar la demanda del cargador sin modificaciones. En empalmes pequeños (< 5 kW) podemos asesorarte en la solicitud de aumento a la distribuidora.',
  },
  {
    title: 'Medición de distancia tablero → estacionamiento',
    body: 'Medimos el trazado real desde el tablero principal hasta donde se instalará el cargador. Esta distancia define el calibre del cable y es el principal factor que varía el precio final.',
  },
  {
    title: 'Revisión de protecciones en el tablero',
    body: 'Inspeccionamos el estado del tablero eléctrico y verificamos si requiere ampliación para instalar el diferencial tipo A y el termomagnético que exige la normativa SEC para cargadores EV.',
  },
  {
    title: 'Presupuesto definitivo en 48 horas',
    body: 'Tras la visita entregas el precio cerrado: sin cobros sorpresa ni ajustes al finalizar la obra. Para edificios también entregamos la memoria técnica y la carta tipo para presentar a la administración.',
  },
]

const quoterSteps = [
  {
    num: '1',
    label: 'Casa o Edificio',
    desc: 'Selecciona el tipo de propiedad. Casa activa instalación desde $159.000. Edificio muestra tres opciones incluyendo la electrolinera $0.',
  },
  {
    num: '2',
    label: 'Elige tu cargador',
    desc: 'Portátil (2,2–7 kW) o Wallbox fijo (7–7,3 kW). El slider de distancia al tablero ajusta el precio entre 0,85× (< 5 m) y 1,55× (> 40 m).',
  },
  {
    num: '3',
    label: 'Revisa el desglose',
    desc: 'Materiales, mano de obra, trámite SEC (TE6) y cargador, todo con IVA incluido. Precio definitivo para casas, referencial para edificios.',
  },
  {
    num: '4',
    label: 'Paga y agenda',
    desc: 'Pago seguro con Webpay. Recibes confirmación por email con el link para coordinar la visita con un técnico SEC.',
  },
]

const pricingRows = [
  ['Casa — hasta 10 m al tablero', '$569.676', 'Materiales, mano de obra, trámite SEC y visita técnica incluidos'],
  ['Casa — 20 m al tablero', '$829.042', 'Materiales, mano de obra, trámite SEC y visita técnica incluidos'],
  ['Edificio — visita técnica + kit docs', '$29.000', 'Acreditable al total'],
  ['Edificio — instalación dedicada', 'Por evaluar', 'Presupuesto tras visita técnica'],
  ['Edificio — electrolinera comunitaria', '$0 inversión', '$330/kWh consumido'],
]

export default function AgendaVisitaTecnicaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
            py: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Visita Técnica', 'SEC Certificado', 'RM y Valparaíso'].map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: '999px',
                    background: 'rgba(0,0,0,0.12)',
                    border: '1px solid rgba(0,0,0,0.18)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#000',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 3,
                color: '#000000',
              }}
            >
              Agenda una Visita Técnica para Evaluar la Instalación de tu Cargador
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: '#000000',
                maxWidth: 600,
                lineHeight: 1.7,
                mx: 'auto',
                mb: 5,
              }}
            >
              Un instalador certificado SEC va a tu domicilio, evalúa la capacidad eléctrica y la
              distancia al tablero, y te entrega presupuesto definitivo en 48 horas. Sin letra chica,
              sin cobros sorpresa.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                  fontSize: '1rem',
                  textDecoration: 'none',
                  '&:hover': { bgcolor: PINK_DARK },
                }}
              >
                Cotizar ahora (2 min) →
              </Box>
              <Box
                component={Link}
                href="/forms"
                sx={{
                  display: 'inline-block',
                  bgcolor: 'rgba(0,0,0,0.12)',
                  color: '#000',
                  px: 4,
                  py: 1.75,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  border: '1px solid rgba(0,0,0,0.2)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' },
                }}
              >
                Agendar visita →
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ bgcolor: DARK, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" textAlign="center">
              {[
                { value: '48 h', label: 'Presupuesto definitivo tras visita' },
                { value: '2 min', label: 'Precio referencial online' },
                { value: 'TE6', label: 'Certificado SEC en cada instalación' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Typography
                    sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 800, color: TEAL }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: '#CBD5E1', mt: 0.5, fontSize: '0.9rem' }}>
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Partner Abastibletec */}
        <Box sx={{ py: { xs: 6, md: 8 }, background: '#fff' }}>
          <Container maxWidth="md">
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: '2px solid #1A5E9F',
                background: '#EFF4FB',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { md: 'center' },
                gap: 3,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  width: { xs: 160, md: 200 },
                  background: '#fff',
                  borderRadius: 2,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Image
                  src="/images/logos/logo-Abastibletec.svg"
                  alt="Logo Abastibletec"
                  width={160}
                  height={54}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 2,
                    py: 0.4,
                    borderRadius: '999px',
                    background: '#1A5E9F',
                    color: '#fff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    mb: 1.5,
                  }}
                >
                  PARTNER OFICIAL
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: DARK, mb: 1 }}>
                  Somos partner de Abastibletec
                </Typography>
                <Typography sx={{ color: '#334155', lineHeight: 1.75, fontSize: '0.95rem', mb: 2 }}>
                  Enérgica City tiene alianza directa con{' '}
                  <strong>Abastibletec</strong>, la división tecnológica de Abastible, para ofrecer
                  soluciones de carga eléctrica en hogares, oficinas y comunidades. Esta alianza nos
                  permite respaldar cada instalación con el estándar técnico y comercial de una de
                  las empresas energéticas más grandes de Chile.
                </Typography>
                <Box
                  component="a"
                  href="https://abastibletec.cl/electromovilidad/cargadoreselectricos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    color: '#1A5E9F',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Ver soluciones Abastibletec Electromovilidad →
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* What the visit includes */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 2 }}
            >
              ¿Qué incluye la visita técnica?
            </Typography>
            <Typography sx={{ color: TEXT_MUTED, lineHeight: 1.8, mb: 5 }}>
              La visita técnica es el paso previo obligatorio para edificios y recomendado para
              instalaciones en casas con características no estándar (empalmes pequeños, muros de
              hormigón o distancias al tablero mayores a 30 metros).
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {visitIncludes.map((item, i) => (
                <Box
                  key={item.title}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    p: 3,
                    background: '#fff',
                    borderRadius: 2,
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: TEAL,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1rem',
                      flexShrink: 0,
                      mt: 0.5,
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.75, fontSize: '1rem' }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: TEXT_MUTED, lineHeight: 1.7, fontSize: '0.93rem' }}>
                      {item.body}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Cotizador summary */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 2 }}
            >
              ¿Prefieres el precio online primero? Usa el cotizador
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 5 }}>
              Para casas con instalaciones estándar, el cotizador online entrega el precio definitivo
              en menos de 2 minutos —sin registro ni llamadas. Solo responde cuatro preguntas:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
              {quoterSteps.map((step) => (
                <Box
                  key={step.num}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'flex-start',
                    p: 2.5,
                    borderRadius: 2,
                    background: GRAY_BG,
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: PINK,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: DARK, fontSize: '0.95rem', mb: 0.4 }}>
                      {step.label}
                    </Typography>
                    <Typography sx={{ color: TEXT_MUTED, fontSize: '0.88rem', lineHeight: 1.65 }}>
                      {step.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component={Link}
                href="/cotizador"
                sx={{
                  display: 'inline-block',
                  bgcolor: TEAL,
                  color: '#fff',
                  px: 5,
                  py: 1.75,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  '&:hover': { bgcolor: TEAL_DARK },
                }}
              >
                Ir al cotizador →
              </Box>
              <Typography sx={{ color: TEXT_MUTED, fontSize: '0.85rem', mt: 1.5 }}>
                O{' '}
                <Link
                  href="/blog/como-usar-cotizador-cargador-electrico"
                  style={{ color: TEAL, fontWeight: 600 }}
                >
                  lee la guía completa del cotizador
                </Link>{' '}
                para entender cada campo antes de comenzar.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Pricing reference */}
        <Box sx={{ py: { xs: 6, md: 8 }, background: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: DARK, mb: 2 }}
            >
              Precios referenciales de instalación
            </Typography>
            <Typography sx={{ color: TEXT_MUTED, lineHeight: 1.8, mb: 4 }}>
              Precio llave en mano con IVA incluido: materiales, mano de obra, trámite SEC y visita
              técnica. Para edificios el precio se confirma tras la visita técnica.
            </Typography>
            <Box sx={{ border: '1px solid #E2E8F0', borderRadius: 2, overflow: 'hidden' }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  background: DARK,
                  color: '#fff',
                  px: 2,
                  py: 1.5,
                }}
              >
                {['Tipo de instalación', 'Precio', 'Incluye'].map((h) => (
                  <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                    {h}
                  </Typography>
                ))}
              </Box>
              {pricingRows.map(([type, price, includes], i) => (
                <Box
                  key={type}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    px: 2,
                    py: 1.75,
                    background: i % 2 === 0 ? GRAY_BG : '#fff',
                    borderTop: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.5, pr: 2 }}>
                    {type}
                  </Typography>
                  <Typography sx={{ fontSize: '0.86rem', fontWeight: 700, color: TEAL }}>
                    {price}
                  </Typography>
                  <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED }}>{includes}</Typography>
                </Box>
              ))}
            </Box>
            <Typography sx={{ color: TEXT_MUTED, fontSize: '0.8rem', mt: 2 }}>
              * Precios referenciales 2026 en CLP. El precio definitivo puede variar según las
              condiciones del domicilio evaluadas en la visita técnica.
            </Typography>
          </Container>
        </Box>

        {/* Dark CTA band */}
        <Box sx={{ background: DARK, py: { xs: 8, md: 10 } }}>
          <Container maxWidth="md">
            <Typography
              sx={{
                fontSize: { xs: '1.7rem', md: '2.4rem' },
                fontWeight: 800,
                color: '#fff',
                textAlign: 'center',
                mb: 2,
              }}
            >
              ¿Casa o edificio? Empieza por el cotizador
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 5,
                fontSize: '1.05rem',
                maxWidth: 520,
                mx: 'auto',
              }}
            >
              Si tienes dudas sobre tu instalación, agenda la visita técnica. Si ya sabes lo que
              necesitas, cotiza en línea en 2 minutos. Técnicos SEC a domicilio en RM y Valparaíso.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/cotizador" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    px: 4,
                    py: 1.75,
                    background: TEAL,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { background: TEAL_DARK },
                    cursor: 'pointer',
                  }}
                >
                  Cotizar en 2 min →
                </Box>
              </Link>
              <Link href="/postulacion-cargadores-edificios" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    px: 4,
                    py: 1.75,
                    border: '2px solid #fff',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { background: 'rgba(255,255,255,0.1)' },
                    cursor: 'pointer',
                  }}
                >
                  Postular a un cargador comunitario sin costo
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

import type { Metadata } from 'next'
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

const SLUG = 'electrolinera-edificio-inversion-cero'

export const metadata: Metadata = {
  title: 'Electrolinera para Edificio: $0 de Inversión, Pagas Solo lo que Cargas',
  description:
    'Enérgica instala y financia un cargador eléctrico en el estacionamiento de visitas de tu edificio. Inversión $0 para la comunidad. Pagas solo $330/kWh consumido. Sin obra en tu estacionamiento privado.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/blog/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    title: 'Electrolinera para Edificio: $0 de Inversión, Pagas Solo lo que Cargas',
    description:
      'Enérgica instala y financia un cargador eléctrico en el estacionamiento de visitas de tu edificio. Inversión $0 para la comunidad. Pagas solo $330/kWh consumido. Sin obra en tu estacionamiento privado.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/images/post/28_1170x400.png`,
        width: 1170,
        height: 400,
        alt: 'Electrolinera cero inversión edificio cargador eléctrico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electrolinera para Edificio: $0 de Inversión, Pagas Solo lo que Cargas',
    description:
      'Enérgica instala y financia un cargador eléctrico en el estacionamiento de visitas de tu edificio. Sin inversión para la comunidad.',
    images: [`${CANONICAL_DOMAIN}/images/post/28_1170x400.png`],
  },
}

const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  image: {
    '@type': 'ImageObject',
    url: `${CANONICAL_DOMAIN}/images/post/28_1170x400.png`,
    width: 1170,
    height: 400,
  },
  headline: 'Electrolinera para tu Edificio: $0 de Inversión, Pagas Solo lo que Cargas',
  description:
    'Enérgica instala y financia un cargador eléctrico en el estacionamiento de visitas de tu edificio. Inversión $0 para la comunidad. Pagas solo $330/kWh consumido. Sin obra en tu estacionamiento privado.',
  author: {
    '@type': 'Person',
    name: 'Felipe Donoso',
    jobTitle: 'Ingeniero Eléctrico, Enérgica City',
    url: `${CANONICAL_DOMAIN}/que-es-energica-city`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Enérgica City',
    url: CANONICAL_DOMAIN,
    logo: { '@type': 'ImageObject', url: `${CANONICAL_DOMAIN}/images/logos/logo.png`, width: 259, height: 42 },
  },
  datePublished: '2026-06-11',
  dateModified: '2026-06-11',
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
      name: '¿Qué es una electrolinera comunitaria en un edificio residencial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una electrolinera comunitaria es un punto de carga para autos eléctricos instalado en el estacionamiento de visitas u otro espacio de uso común de un edificio residencial. A diferencia de la instalación privada —en la que cada propietario costea e instala su propio cargador en su estacionamiento asignado—, la electrolinera comunitaria es financiada e instalada por Enérgica City sin costo para la comunidad. El funcionamiento es similar al de un medidor de gas independiente: Enérgica suministra la infraestructura completa y los usuarios pagan exclusivamente por la energía que consumen, a $330 por kWh. La instalación se realiza en el espacio común, por lo que no requiere intervención en estacionamientos privados ni asamblea extraordinaria de propietarios. Solo se necesita la autorización de la administración del edificio para usar el espacio común designado, lo que hace de esta la opción más rápida y fácil de implementar.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito aprobación de la asamblea de copropietarios para instalar la electrolinera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, si el cargador se instala en el estacionamiento de visitas u otro espacio de uso común. Según la Ley de Copropiedad Inmobiliaria 21.442 de Chile, la administración del edificio tiene facultad para autorizar usos de espacios comunes que no alteren su destino ni afecten a los demás copropietarios. La electrolinera de Enérgica City no modifica infraestructura privada ni restringe el acceso de otros residentes: el estacionamiento de visitas sigue disponible para todos. Solo se necesita un permiso de uso del espacio común, que la administración puede otorgar directamente. Enérgica entrega carta de solicitud de autorización, memoria técnica firmada y presentación lista para el comité, para facilitar el proceso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta cargar un auto eléctrico en la electrolinera comunitaria de Enérgica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El precio es de $330 por kWh en la electrolinera comunitaria de Enérgica City. El costo exacto depende de la batería del vehículo y el estado de carga inicial. Ejemplo práctico: un BYD Dolphin (44,9 kWh) que carga de 20% a 90% consume aproximadamente 31,4 kWh, lo que equivale a $10.362. Un BYD Seal (75,7 kWh) en la misma operación consume ~53 kWh y cuesta $17.490. Para autos con autonomía de 300-400 km, el costo por kilómetro con la electrolinera es de $15–$22, versus $100–$120 por kilómetro con gasolina. Sin tarifas de membresía, sin cargos fijos mensuales: solo pagas lo que cargas.',
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
      name: 'Electrolinera para Edificio: $0 de Inversión, Pagas Solo lo que Cargas',
      item: `${CANONICAL_DOMAIN}/blog/${SLUG}`,
    },
  ],
}

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
      <BlogBreadcrumb title="Electrolinera para Edificio: $0 de Inversión, Pagas Solo lo que Cargas" />
      <Box component="main">
        {/* Hero */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${DARK} 0%, #1E3A5F 100%)`,
            color: '#fff',
            py: { xs: 8, md: 12 },
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {['Edificios', 'Electrolinera', 'Sin Inversión'].map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: '999px',
                    background: 'rgba(8,152,185,0.25)',
                    border: `1px solid ${TEAL}`,
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#7DD3FC',
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
                maxWidth: 820,
              }}
            >
              Electrolinera para tu Edificio: $0 de Inversión, Pagas Solo lo que Cargas
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 640,
                lineHeight: 1.7,
              }}
            >
              Enérgica City instala y financia un cargador eléctrico en el estacionamiento de visitas
              de tu edificio. Tu comunidad no pone ni un peso. Cada residente paga solo la energía
              que consume: $330 por kWh.
            </Typography>
          </Container>
        </Box>

        {/* Stats bar */}
        <Box sx={{ background: TEAL, py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '$0', label: 'Inversión para la comunidad' },
                { value: '$330/kWh', label: 'Solo pagas lo que cargas' },
                { value: 'Sin obra', label: 'No requiere intervención en tu estacionamiento' },
              ].map((stat) => (
                <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                  <Box sx={{ textAlign: 'center', color: '#fff' }}>
                    <Typography
                      sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', opacity: 0.85 }}>{stat.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Main content */}
        <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
          <Container maxWidth="md">

            {/* Section 1 */}
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, lineHeight: '3rem', color: DARK, mb: 2 }}
            >
              ¿Qué es una electrolinera comunitaria para edificios?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Una electrolinera comunitaria es un punto de carga para vehículos eléctricos instalado
              en el estacionamiento de visitas o en un área de uso común de un edificio residencial,
              financiado y operado por Enérgica City sin costo para la comunidad. El modelo de
              negocio funciona como la electricidad en los medidores de gas o agua individuales:
              Enérgica instala, mantiene y financia la infraestructura completa —cargador,
              protecciones eléctricas, medición y conectividad—, mientras los residentes y visitas
              solo pagan por la energía efectivamente consumida. En Chile, el precio es de $330 por
              kWh. Para un vehículo eléctrico promedio (como el BYD Dolphin, con autonomía de 300 km
              y batería de 44,9 kWh), cargar desde 20% hasta 90% cuesta aproximadamente $9.900.
              Comparado con un litro de bencina a $1.200, el costo por kilómetro en la electrolinera
              es tres veces menor.
            </Typography>

            {/* Section 2 */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 2,
                mt: 6,
              }}
            >
              ¿Cómo funciona el programa de electrolinera de Enérgica City?
            </Typography>

            {[
              {
                n: '1',
                title: 'Solicitud online',
                body: 'Completa el cotizador en energica.city/cotizador. En 48 horas recibes la evaluación técnica preliminar.',
              },
              {
                n: '2',
                title: 'Visita técnica',
                body: 'Un profesional certificado SEC evalúa el estacionamiento de visitas, la capacidad eléctrica del edificio y el punto de conexión al tablero general.',
              },
              {
                n: '3',
                title: 'Acuerdo de espacio común',
                body: 'Solo necesitas la autorización para usar el espacio común del estacionamiento de visitas. No requiere asamblea de propietarios sobre tu estacionamiento privado.',
              },
              {
                n: '4',
                title: 'Instalación profesional',
                body: 'Enérgica instala el cargador, las protecciones eléctricas, el medidor independiente y la señalética. Todo certificado ante la SEC.',
              },
              {
                n: '5',
                title: 'Gestión de cobros automática',
                body: 'La plataforma EVE de Enérgica registra cada sesión de carga, genera reportes mensuales y gestiona el cobro por kWh consumido.',
              },
              {
                n: '6',
                title: 'Mantenimiento incluido',
                body: 'Enérgica se encarga del mantenimiento preventivo y correctivo. Sin costos ocultos para la comunidad.',
              },
            ].map((step) => (
              <Box
                key={step.n}
                sx={{
                  display: 'flex',
                  gap: 3,
                  mb: 4,
                  p: 3,
                  background: GRAY_BG,
                  borderRadius: 2,
                  borderLeft: `4px solid ${TEAL}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: TEAL,
                    minWidth: 44,
                    lineHeight: 1,
                  }}
                >
                  {step.n}
                </Typography>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>{step.title}</Typography>
                  <Typography sx={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {step.body}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* Section 3 */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 2,
                mt: 6,
              }}
            >
              ¿Necesito autorización de la asamblea de propietarios?
            </Typography>
            <Typography sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
              Esta es la pregunta más frecuente de los comités de administración. La respuesta es
              no, si el cargador se instala en el estacionamiento de visitas u otro espacio de uso
              común, no en estacionamientos privados asignados. Bajo la Ley de Copropiedad
              Inmobiliaria (Ley 21.442), la administración del edificio puede autorizar el uso de
              espacios comunes sin necesidad de convocar a asamblea extraordinaria, siempre que el
              uso no altere el destino del bien común ni afecte a los demás copropietarios. La
              electrolinera de Enérgica cumple ambas condiciones: no modifica infraestructura privada
              y está disponible para todos los residentes y visitas.
            </Typography>

            {/* Section 4 */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 2,
                mt: 6,
              }}
            >
              Documentos que Enérgica entrega para presentar a tu comité
            </Typography>
            <Box sx={{ mb: 4 }}>
              {[
                'Presentación lista para llevar a la reunión de comité',
                'Carta de solicitud de autorización de uso de espacio común',
                'Memoria técnica firmada por profesional SEC',
                'Modelo de contrato de operación',
                'Visita comercial a la administración (si la pides)',
              ].map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    mb: 1.5,
                    p: 2,
                    background: GRAY_BG,
                    borderRadius: 2,
                  }}
                >
                  <Typography sx={{ color: TEAL, fontWeight: 800, fontSize: '1rem', lineHeight: 1.6 }}>
                    ✓
                  </Typography>
                  <Typography sx={{ color: '#334155', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Section 5: Comparison table */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 700,
                color: DARK,
                mb: 2,
                mt: 6,
              }}
            >
              Electrolinera comunitaria vs. instalación privada: comparativa
            </Typography>

            <Box
              sx={{
                border: `1px solid #E2E8F0`,
                borderRadius: 2,
                overflow: 'hidden',
                mb: 4,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1.5fr 1.5fr',
                  background: DARK,
                  color: '#fff',
                  px: 2,
                  py: 1.5,
                }}
              >
                {['Criterio', 'Electrolinera Comunitaria', 'Instalación Privada'].map((h) => (
                  <Typography key={h} sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                    {h}
                  </Typography>
                ))}
              </Box>
              {[
                ['Inversión inicial', '$0', 'Desde $159.000 (casa) / $369.000 (edificio)'],
                ['Proceso de aprobación', 'Solo permiso espacio común', 'Requiere asamblea propietarios'],
                ['Dónde se instala', 'Estacionamiento visitas', 'Tu estacionamiento privado'],
                ['Quién paga la energía', 'El que carga ($330/kWh)', 'El propietario (tarifa eléctrica)'],
                ['Mantenimiento', 'Enérgica City (incluido)', 'Propietario (costo propio)'],
                ['Disponibilidad', 'Todos los residentes y visitas', 'Solo el propietario'],
                ['Velocidad de aprobación', 'La más rápida', 'Depende de asamblea'],
              ].map(([criterio, comunitaria, privada], i) => (
                <Box
                  key={criterio}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1.5fr 1.5fr',
                    px: 2,
                    py: 1.5,
                    background: i % 2 === 0 ? GRAY_BG : '#fff',
                    borderTop: '1px solid #E2E8F0',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: DARK }}>
                    {criterio}
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: '#475569' }}>{comunitaria}</Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: '#475569' }}>{privada}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* FAQ */}
        <Box sx={{ py: { xs: 6, md: 8 }, background: GRAY_BG }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.9rem' },
                fontWeight: 700,
                color: DARK,
                mb: 5,
                textAlign: 'center',
              }}
            >
              Preguntas frecuentes sobre la electrolinera comunitaria para edificios
            </Typography>
            {faqSchema.mainEntity.map((item) => (
              <Box
                key={item.name}
                sx={{
                  mb: 3,
                  p: 3,
                  background: '#fff',
                  borderRadius: 2,
                  boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                }}
              >
                <Typography sx={{ fontWeight: 700, color: DARK, mb: 1 }}>{item.name}</Typography>
                <Typography sx={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {item.acceptedAnswer.text}
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>

        {/* Related articles */}
        <BlogRelatedArticles currentUid={SLUG} />

        {/* Author byline */}
        <AuthorByline />

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
              ¿Vives en un edificio y tienes auto eléctrico?
            </Typography>
            <Typography
              sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: 5, fontSize: '1.05rem' }}
            >
              Postula a la electrolinera comunitaria gratuita de Enérgica City. Sin inversión, sin
              obra en tu estacionamiento.
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
                  Postular a electrolinera
                </Box>
              </Link>
              <Link href="/cotizador" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    px: 4,
                    py: 1.75,
                    border: `2px solid ${PINK}`,
                    color: PINK,
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { background: PINK, color: '#fff' },
                    cursor: 'pointer',
                  }}
                >
                  Ver todas las opciones
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

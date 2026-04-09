import type { Metadata } from 'next'
import { Container, Box, Typography } from '@mui/material'
import { notFound } from 'next/navigation'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

const cities: Record<string, { name: string; demonym: string; description: string; address: string; lat: number; lon: number }> = {
  santiago: { name: 'Santiago', demonym: 'santiaguino', description: 'la capital de Chile', address: 'Santiago, Región Metropolitana, Chile', lat: -33.4489, lon: -70.6693 },
  'las-condes': { name: 'Las Condes', demonym: 'de Las Condes', description: 'la comuna financiera y empresarial de Santiago', address: 'Las Condes, Región Metropolitana, Chile', lat: -33.4113, lon: -70.5664 },
  providencia: { name: 'Providencia', demonym: 'providenciano', description: 'una de las comunas más activas de Santiago', address: 'Providencia, Región Metropolitana, Chile', lat: -33.4323, lon: -70.6100 },
  vitacura: { name: 'Vitacura', demonym: 'vitacurino', description: 'una de las comunas premium de Santiago', address: 'Vitacura, Región Metropolitana, Chile', lat: -33.3866, lon: -70.5790 },
  nunoa: { name: 'Ñuñoa', demonym: 'ñuñoíno', description: 'una comuna residencial y comercial de Santiago', address: 'Ñuñoa, Región Metropolitana, Chile', lat: -33.4568, lon: -70.5985 },
  'la-florida': { name: 'La Florida', demonym: 'floridano', description: 'la comuna más poblada de Santiago', address: 'La Florida, Región Metropolitana, Chile', lat: -33.5167, lon: -70.5948 },
}

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityData = cities[city]
  if (!cityData) return {}
  return {
    title: `Cargadores EV en ${cityData.name} | Energica City`,
    description: `Instalación de cargadores eléctricos para empresas y edificios en ${cityData.name}. Técnicos certificados SEC. Cotiza gratis.`,
    alternates: { canonical: `https://www.energica.city/servicios/${city}` },
  }
}

export default async function CityPage({ params }: Props) {
  const { city } = await params
  const cityData = cities[city]
  if (!cityData) notFound()

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ElectricalContractor"],
    "name": "Energica City",
    "url": "https://www.energica.city",
    "description": `Instalación de cargadores eléctricos certificados SEC en ${cityData.name}, Chile.`,
    "areaServed": { "@type": "City", "name": cityData.name },
    "geo": { "@type": "GeoCoordinates", "latitude": cityData.lat, "longitude": cityData.lon },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": "Región Metropolitana",
      "addressCountry": "CL"
    },
    "telephone": "+56967666652",
    "openingHours": "Mo-Fr 09:00-18:00"
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.energica.city" },
      { "@type": "ListItem", "position": 2, "name": cityData.name, "item": `https://www.energica.city/servicios/${city}` }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 2 }}>
            Cargadores EV en {cityData.name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.25rem', color: 'text.secondary', mb: 6 }}>
            Instalamos cargadores eléctricos para empresas y edificios en {cityData.description}. Técnicos certificados SEC, instalación garantizada y gestión TE6 incluida.
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 8 }}>
            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
                Instalación de Cargadores en {cityData.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Si tu empresa opera en {cityData.name} y quieres electrificar tu flota o instalar cargadores en tu edificio, Energica City es tu partner de confianza. Ofrecemos soluciones completas desde la visita técnica hasta la certificación SEC.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Trabajamos con las principales empresas {cityData.demonym}s para entregar infraestructura de carga eléctrica confiable, eficiente y certificada. Nuestros técnicos conocen la normativa local y los requisitos específicos de cada tipo de inmueble.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                La instalación incluye: evaluación eléctrica, diseño del sistema de carga, instalación de cargadores AC/DC, sistema de monitoreo y gestión del trámite TE6 ante la SEC.
              </Typography>
            </Box>
            <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 2 }}>
                ¿Por qué Energica City en {cityData.name}?
              </Typography>
              {[
                'Técnicos certificados SEC en ' + cityData.name,
                'Visita técnica sin costo',
                'Cotización en 24 horas',
                'Gestión completa del TE6',
                'Monitoreo remoto incluido',
                'Garantía en materiales y mano de obra',
              ].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 3 }}>
              Tipos de instalación en {cityData.name}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
              {[
                { title: 'Edificios de oficinas', desc: 'Cargadores para estacionamientos de edificios corporativos y de uso mixto.' },
                { title: 'Flotas empresariales', desc: 'Infraestructura de carga para flotas de reparto, servicio y transporte de personal.' },
                { title: 'Condominios', desc: 'Soluciones de carga para edificios residenciales con gestión de energía compartida.' },
              ].map((type) => (
                <Box key={type.title} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  <Typography variant="h3" sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 1 }}>{type.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{type.desc}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ p: 4, bgcolor: 'primary.main', borderRadius: 2, textAlign: 'center', color: 'white' }}>
            <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
              Solicita tu cotización en {cityData.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Visita técnica gratuita y propuesta personalizada en 24 horas.
            </Typography>
            <Box component="a" href="/cotizador" sx={{ display: 'inline-block', bgcolor: 'white', color: 'primary.main', px: 4, py: 1.5, borderRadius: 1, fontWeight: 600, textDecoration: 'none' }}>
              Cotizar ahora
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

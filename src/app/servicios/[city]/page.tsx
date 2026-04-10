import type { Metadata } from 'next'
import { Container, Box, Typography } from '@mui/material'
import { notFound } from 'next/navigation'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

const cities: Record<string, { name: string; demonym: string; description: string; address: string; lat: number; lon: number; zones: string[] }> = {
  santiago: { name: 'Santiago', demonym: 'santiaguino', description: 'la capital de Chile', address: 'Santiago, Región Metropolitana, Chile', lat: -33.4489, lon: -70.6693, zones: ['Barrio Italia', 'Yungay', 'Estación Central', 'San Miguel', 'La Cisterna', 'El Bosque'] },
  'las-condes': { name: 'Las Condes', demonym: 'de Las Condes', description: 'la comuna financiera y empresarial de Santiago', address: 'Las Condes, Región Metropolitana, Chile', lat: -33.4113, lon: -70.5664, zones: ['Apoquindo', 'El Golf', 'Nueva Las Condes', 'La Dehesa', 'Lo Barnechea', 'Escandinavia'] },
  providencia: { name: 'Providencia', demonym: 'providenciano', description: 'una de las comunas más activas de Santiago', address: 'Providencia, Región Metropolitana, Chile', lat: -33.4323, lon: -70.6100, zones: ['Manuel Montt', 'Los Leones', 'Pedro de Valdivia', 'Tobalaba', 'Baquedano', 'Salvador'] },
  vitacura: { name: 'Vitacura', demonym: 'vitacurino', description: 'una de las comunas premium de Santiago', address: 'Vitacura, Región Metropolitana, Chile', lat: -33.3866, lon: -70.5790, zones: ['Bicentenario', 'Lo Curro', 'Miraflores', 'El Arrabal', 'Las Condes Norte', 'Chicureo'] },
  nunoa: { name: 'Ñuñoa', demonym: 'ñuñoíno', description: 'una comuna residencial y comercial de Santiago', address: 'Ñuñoa, Región Metropolitana, Chile', lat: -33.4568, lon: -70.5985, zones: ['Irarrázaval', 'Plaza Ñuñoa', 'Suecia', 'Echeñique', 'Villa Frei', 'Macul'] },
  'la-florida': { name: 'La Florida', demonym: 'floridano', description: 'la comuna más poblada de Santiago', address: 'La Florida, Región Metropolitana, Chile', lat: -33.5167, lon: -70.5948, zones: ['Vicuña Mackenna', 'Los Quillayes', 'Roble Alto', 'La Florida Centro', 'Santa Amalia', 'El Castillo'] },
  'lo-barnechea': { name: 'Lo Barnechea', demonym: 'barnecheano', description: 'una de las comunas de mayor crecimiento en el sector oriente de Santiago', address: 'Lo Barnechea, Región Metropolitana, Chile', lat: -33.3527, lon: -70.5232, zones: ['El Arrayán', 'La Dehesa', 'San Enrique', 'Valle Escondido', 'Los Trapenses', 'Montecillo'] },
  'san-miguel': { name: 'San Miguel', demonym: 'sanmiguelino', description: 'una de las comunas más conectadas del sur de Santiago', address: 'San Miguel, Región Metropolitana, Chile', lat: -33.4981, lon: -70.6516, zones: ['Gran Avenida', 'Lo Ovalle', 'Club Hípico', 'Santa Rosa', 'Departamental', 'El Llano'] },
  'villa-alemana': { name: 'Villa Alemana', demonym: 'villalemanino', description: 'una ciudad en crecimiento en la Región de Valparaíso', address: 'Villa Alemana, Región de Valparaíso, Chile', lat: -33.0428, lon: -71.3745, zones: ['Centro Villa Alemana', 'Los Aromos', 'Santa Laura', 'El Belloto', 'Reñaca Alto', 'Parque Industrial'] },
  'estacion-central': { name: 'Estación Central', demonym: 'estacioncentralino', description: 'una de las comunas más céntricas y conectadas de Santiago', address: 'Estación Central, Región Metropolitana, Chile', lat: -33.4569, lon: -70.6828, zones: ['Alameda', 'Acceso Sur', 'Las Rosas', 'Los Nogales', 'Pudahuel Norte', 'Ricardo Cumming'] },
  huechuraba: { name: 'Huechuraba', demonym: 'de Huechuraba', description: 'una comuna industrial y residencial en el norte de Santiago', address: 'Huechuraba, Región Metropolitana, Chile', lat: -33.3614, lon: -70.6458, zones: ['Ciudad Empresarial', 'El Barrero', 'La Pincoya', 'Vivaceta', 'Lo Marcoleta', 'Portal Bicentenario'] },
  colina: { name: 'Colina', demonym: 'colinano', description: 'una comuna en expansión al norte de la Región Metropolitana', address: 'Colina, Región Metropolitana, Chile', lat: -33.2021, lon: -70.6746, zones: ['Colina Centro', 'El Asiento', 'Chicureo', 'Los Almendros', 'Portal del Bosque', 'Valle Grande'] },
  lampa: { name: 'Lampa', demonym: 'lampino', description: 'una comuna logística y residencial al noroeste de Santiago', address: 'Lampa, Región Metropolitana, Chile', lat: -33.2867, lon: -70.8766, zones: ['Lampa Centro', 'Batuco', 'Estación Colina', 'Lo Vargas', 'Parque Industrial Lampa', 'Villa Esperanza'] },
  chicureo: { name: 'Chicureo', demonym: 'chicureano', description: 'un sector residencial de alto estándar al norte de Santiago', address: 'Chicureo, Colina, Región Metropolitana, Chile', lat: -33.2028, lon: -70.6155, zones: ['Piedra Roja', 'Valle Grande', 'Bosques de Montemar', 'La Reserva', 'San Jorge', 'Los Almendros'] },
  maipu: { name: 'Maipú', demonym: 'maipucino', description: 'una de las comunas más grandes y pobladas de la Región Metropolitana', address: 'Maipú, Región Metropolitana, Chile', lat: -33.5131, lon: -70.7578, zones: ['Pajaritos', 'Las Rastras', 'Monte Tabor', 'Villa Los Héroes', 'Santiago Sur', 'Cerrillos'] },
  algarrobo: { name: 'Algarrobo', demonym: 'algarrobino', description: 'un balneario y comuna costera de la Región de Valparaíso', address: 'Algarrobo, Región de Valparaíso, Chile', lat: -33.3673, lon: -71.6673, zones: ['El Canelo', 'San Alfonso del Mar', 'Mirasol', 'El Tabo', 'Las Cruces', 'Centro Algarrobo'] },
  'la-cisterna': { name: 'La Cisterna', demonym: 'cisternino', description: 'una comuna residencial y comercial del sur de Santiago', address: 'La Cisterna, Región Metropolitana, Chile', lat: -33.5275, lon: -70.6636, zones: ['Gran Avenida', 'Lo Ovalle Sur', 'Walker Martínez', 'Santa Rosa Sur', 'El Parrón', 'Villa La Florida'] },
  penalolen: { name: 'Peñalolén', demonym: 'peñalolino', description: 'una comuna residencial en el sector oriente de Santiago', address: 'Peñalolén, Región Metropolitana, Chile', lat: -33.4894, lon: -70.5378, zones: ['Lo Hermida', 'San Luis', 'La Faena', 'San Patricio', 'Las Vizcachas', 'El Vergel'] },
  'con-con': { name: 'Con Con', demonym: 'conconeño', description: 'una ciudad costera e industrial de la Región de Valparaíso', address: 'Con Con, Región de Valparaíso, Chile', lat: -32.9228, lon: -71.5338, zones: ['Barrio Industrial', 'Playa Negra', 'Los Pinos', 'La Boca', 'Concón Centro', 'Parque Empresarial'] },
  maitencillo: { name: 'Maitencillo', demonym: 'maitencillano', description: 'un exclusivo balneario en la costa de la Región de Valparaíso', address: 'Maitencillo, Puchuncaví, Región de Valparaíso, Chile', lat: -32.6483, lon: -71.4175, zones: ['Maitencillo Centro', 'Cachagua', 'Zapallar', 'Papudo', 'Los Molles', 'Pichicuy'] },
}

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityData = cities[city]
  if (!cityData) return {}
  const url = `https://www.energica.city/servicios/${city}`
  const description = `Instalación de cargadores eléctricos para empresas, edificios y condominios en ${cityData.name}. Técnicos certificados SEC, gestión TE6 incluida. Cotiza gratis.`
  return {
    title: `Cargadores EV en ${cityData.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `Cargadores EV en ${cityData.name}`,
      description,
      images: [{ url: 'https://www.energica.city/images/og/servicios-cargadores-ev.jpg', width: 1200, height: 630, alt: `Instalación de cargadores EV en ${cityData.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Cargadores EV en ${cityData.name}`,
      description,
      images: ['https://www.energica.city/images/og/servicios-cargadores-ev.jpg'],
    },
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
    "image": "https://www.energica.city/images/og/servicios-cargadores-ev.jpg",
    "description": `Instalación de cargadores eléctricos certificados SEC en ${cityData.name}, Chile.`,
    "priceRange": "$$",
    "hasMap": `https://www.google.com/maps/search/Energica+City+${encodeURIComponent(cityData.name)}`,
    "areaServed": { "@type": "City", "name": cityData.name },
    "geo": { "@type": "GeoCoordinates", "latitude": cityData.lat, "longitude": cityData.lon },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": "Región Metropolitana",
      "addressCountry": "CL"
    },
    "telephone": "+56967666652",
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": [
      "https://www.linkedin.com/company/energica-city",
      "https://www.instagram.com/energicacity/"
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.energica.city" },
      { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://www.energica.city/servicios" },
      { "@type": "ListItem", "position": 3, "name": cityData.name, "item": `https://www.energica.city/servicios/${city}` }
    ]
  }

  const installationSteps = [
    {
      number: 1,
      title: 'Cotización en línea',
      body: 'Ingresa los datos de tu proyecto en nuestro cotizador y recibe una estimación de costos en minutos.',
    },
    {
      number: 2,
      title: 'Visita técnica',
      body: `Un técnico certificado SEC visita tu propiedad en ${cityData.name} para evaluar la instalación y preparar el proyecto definitivo.`,
    },
    {
      number: 3,
      title: 'Instalación certificada',
      body: 'Ejecutamos la instalación según normativa SEC, incluyendo cargadores AC/DC, sistema de monitoreo y cableado.',
    },
    {
      number: 4,
      title: 'Certificación TE6',
      body: 'Gestionamos el trámite TE6 ante la SEC en un máximo de 5 días hábiles tras finalizar las obras.',
    },
  ]

  const faqs = [
    {
      question: '¿Cuánto demora la instalación de un cargador eléctrico?',
      answer: `El tiempo de instalación varía según el proyecto. Una instalación estándar toma entre 4 y 8 horas. Proyectos para edificios o flotas en ${cityData.name} pueden tardar varios días según el alcance.`,
    },
    {
      question: '¿Necesito permisos especiales para instalar en mi edificio?',
      answer: 'Sí. En edificios debes contar con autorización de la administración del condominio. Toda instalación debe cumplir la normativa SEC y contar con el certificado TE6. Energica City gestiona este trámite por ti.',
    },
    {
      question: '¿Qué garantía tienen las instalaciones?',
      answer: 'Nuestras instalaciones cuentan con garantía de 6 meses en mano de obra. Los materiales y equipos tienen la garantía de sus respectivos fabricantes.',
    },
    {
      question: `¿Pueden instalar en departamentos de edificios en ${cityData.name}?`,
      answer: 'Sí, instalamos en edificios de departamentos siempre que exista autorización de la administración e infraestructura eléctrica adecuada. Nuestros técnicos evalúan la factibilidad durante la visita técnica.',
    },
  ]

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

          {/* Section A — Proceso de instalación */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 3 }}>
              Proceso de instalación
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {installationSteps.map((step) => (
                <Box key={step.number} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: '0.95rem' }}>
                    {step.number}
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontSize: '1rem', fontWeight: 600, mb: 0.5 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.body}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Banner — Cargadores sin instalación */}
          <Box component="a" href="/cargadores-vehiculos-electricos-sin-instalacion" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, p: { xs: 3, md: 4 }, mb: 6, bgcolor: 'grey.900', borderRadius: 2, textDecoration: 'none', '&:hover': { bgcolor: 'grey.800' } }}>
            <Box>
              <Typography variant="h3" sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', mb: 0.5 }}>
                ¿Solo necesitas el cargador, sin instalación?
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Compra tu cargador eléctrico directamente — entrega a domicilio en {cityData.name}.
              </Typography>
            </Box>
            <Box sx={{ px: 3, py: 1.5, bgcolor: 'primary.main', borderRadius: 1, color: 'white', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
              Ver cargadores →
            </Box>
          </Box>

          {/* Section B — Zonas que atendemos */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>
              Zonas que atendemos
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Atendemos instalaciones de cargadores eléctricos en toda la comuna de {cityData.name} y sectores aledaños:
            </Typography>
            <Box>
              {cityData.zones.map((zone) => (
                <Box key={zone} component="span" sx={{ display: 'inline-block', px: 2, py: 0.5, bgcolor: 'grey.100', borderRadius: 2, mr: 1, mb: 1, fontSize: '0.875rem' }}>
                  {zone}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Section C — Preguntas frecuentes */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 3 }}>
              Preguntas frecuentes sobre instalación de cargadores en {cityData.name}
            </Typography>
            {faqs.map((faq) => (
              <Box key={faq.question} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 2 }}>
                <Typography variant="h3" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                  {faq.question}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {faq.answer}
                </Typography>
              </Box>
            ))}
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

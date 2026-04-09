import type { Metadata } from 'next'
import { Container, Box, Typography } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

export const metadata: Metadata = {
  title: 'Credenciales SEC y Certificaciones',
  description: 'Instaladores certificados SEC (TE1/TE6) para cargadores EV en Chile. Conoce nuestras credenciales y estándares de seguridad.',
  alternates: { canonical: 'https://www.energica.city/credenciales' },
}

const certifications = [
  { title: 'Certificación TE1', description: 'Nuestros instaladores cuentan con la certificación TE1 de la Superintendencia de Electricidad y Combustibles (SEC), habilitación obligatoria para trabajos en instalaciones eléctricas en Chile.' },
  { title: 'Certificación TE6', description: 'Especialmente relevante para instalaciones de carga vehicular eléctrica. Gestionamos el trámite TE6 ante la SEC para que tu instalación cumpla toda la normativa vigente.' },
  { title: 'NCh Elec. 4/2003', description: 'Todas nuestras instalaciones cumplen la norma técnica NCh Elec. 4/2003 del Ministerio de Energía, que regula las instalaciones eléctricas de baja tensión en Chile.' },
  { title: 'IEC 61851 / SAE J1772', description: 'Instalamos cargadores que cumplen los estándares internacionales IEC 61851 (Modo 2, 3 y 4) y SAE J1772, garantizando compatibilidad con todos los vehículos eléctricos del mercado.' },
]

export default function CredencialesPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ElectricalContractor"],
    "name": "Energica City",
    "url": "https://www.energica.city",
    "description": "Instalación certificada SEC de cargadores eléctricos para empresas y edificios en Chile.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santiago",
      "addressRegion": "Región Metropolitana",
      "addressCountry": "CL"
    },
    "areaServed": { "@type": "Country", "name": "Chile" },
    "telephone": "+56967666652",
    "openingHours": "Mo-Fr 09:00-18:00",
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "name": "Certificación TE1 SEC Chile" },
      { "@type": "EducationalOccupationalCredential", "name": "Certificación TE6 SEC Chile" }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.energica.city" },
      { "@type": "ListItem", "position": 2, "name": "Credenciales", "item": "https://www.energica.city/credenciales" }
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
            Credenciales y Certificaciones
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.25rem', color: 'text.secondary', mb: 6, maxWidth: 700 }}>
            Somos una empresa con instaladores certificados por la SEC, garantizando instalaciones eléctricas seguras y conformes a la normativa chilena.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 8 }}>
            {certifications.map((cert) => (
              <Box key={cert.title} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h2" component="h2" sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1, color: 'primary.main' }}>{cert.title}</Typography>
                <Typography variant="body1" color="text.secondary">{cert.description}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 4, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 2 }}>¿Por qué importa la certificación SEC?</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              En Chile, la instalación de cargadores eléctricos para vehículos requiere que el instalador esté habilitado por la Superintendencia de Electricidad y Combustibles (SEC). Sin esta certificación, la instalación es ilegal y puede invalidar seguros.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Además, para edificios y empresas se requiere el formulario TE6, que certifica la instalación eléctrica para uso en recarga de vehículos eléctricos. Energica City gestiona todo el trámite por ti.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  )
}

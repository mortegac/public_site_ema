import type { Metadata } from 'next'
import { Container, Box, Typography } from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

export const metadata: Metadata = {
  title: 'Cómo Funciona la Instalación de Cargadores EV',
  description: 'Conoce el proceso paso a paso para instalar cargadores eléctricos en tu empresa o edificio en Chile: cotización, visita técnica, instalación y certificación TE6.',
  alternates: { canonical: 'https://energica.city/como-funciona' },
}

// Steps data
const steps = [
  { number: '01', title: 'Cotización gratuita', description: 'Completa nuestro formulario online con los datos de tu empresa y cantidad de vehículos eléctricos. En 24 horas recibirás una propuesta personalizada.' },
  { number: '02', title: 'Visita técnica', description: 'Un ingeniero certificado SEC visita tus instalaciones para evaluar la factibilidad eléctrica y diseñar la solución óptima para tu flota.' },
  { number: '03', title: 'Propuesta y aprobación', description: 'Presentamos la propuesta técnica y económica detallada. Coordinamos financiamiento y tiempos de instalación según tus necesidades.' },
  { number: '04', title: 'Instalación certificada', description: 'Nuestros técnicos SEC instalan los cargadores con los más altos estándares de seguridad eléctrica y conforme a la normativa chilena.' },
  { number: '05', title: 'Certificación TE6', description: 'Gestionamos la documentación y certificación TE6 ante la SEC, garantizando que tu instalación cumple toda la normativa vigente en Chile.' },
  { number: '06', title: 'Soporte continuo', description: 'Ofrecemos mantenimiento preventivo, monitoreo remoto y soporte técnico para asegurar el máximo rendimiento de tus cargadores.' },
]

export default function ComoFuncionaPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Instalación de Cargadores EV para Empresas",
    "provider": {
      "@type": "Organization",
      "name": "Energica City",
      "url": "https://energica.city"
    },
    "areaServed": { "@type": "Country", "name": "Chile" },
    "description": "Servicio completo de instalación de cargadores eléctricos para empresas y edificios en Chile, incluyendo visita técnica, instalación certificada y trámites TE6.",
    "serviceType": "Electric Vehicle Charger Installation"
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://energica.city" },
      { "@type": "ListItem", "position": 2, "name": "Cómo Funciona", "item": "https://energica.city/como-funciona" }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HpHeaderNew />
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 2 }}>
            Cómo Funciona
          </Typography>
          <Typography variant="h2" component="h2" sx={{ fontSize: '1.25rem', color: 'text.secondary', mb: 6, maxWidth: 700 }}>
            Instalamos cargadores eléctricos para empresas en Chile con un proceso simple, certificado y sin complicaciones.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {steps.map((step) => (
              <Box key={step.number} sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                <Box sx={{ minWidth: 64, height: 64, borderRadius: '50%', bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 700 }}>
                  {step.number}
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 600, mb: 1 }}>{step.title}</Typography>
                  <Typography variant="body1" color="text.secondary">{step.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 8, p: 4, bgcolor: 'primary.main', borderRadius: 2, textAlign: 'center', color: 'white' }}>
            <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>¿Listo para comenzar?</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>Cotiza gratis y agenda una visita técnica sin compromiso.</Typography>
            <Box component="a" href="/cotizador" sx={{ display: 'inline-block', bgcolor: 'white', color: 'primary.main', px: 4, py: 1.5, borderRadius: 1, fontWeight: 600, textDecoration: 'none' }}>
              Cotizar ahora
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

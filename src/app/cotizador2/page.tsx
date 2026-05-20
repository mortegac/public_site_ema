import type { Metadata } from 'next'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import { CANONICAL_DOMAIN } from '@/utils/seo-config'
import CotizadorWizard from './CotizadorWizard'

const SLUG = 'cotizador2'
const TITLE = 'Cotizador de Instalación de Cargador EV — Energica City'
const DESC = 'Simula el costo de tu instalación de cargador eléctrico en Chile. Elige tu cargador, obtén precio al instante y agenda tu visita técnica. Certificado SEC.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${CANONICAL_DOMAIN}/${SLUG}` },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/${SLUG}`,
    title: TITLE,
    description: DESC,
    images: [{ url: `${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`, width: 1200, height: 630, alt: 'Cotizador instalación cargador EV Chile' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: [`${CANONICAL_DOMAIN}/images/og/servicios-cargadores-ev.jpg`] },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cotizador de Instalación EV — Enérgica City',
  description: DESC,
  url: `${CANONICAL_DOMAIN}/${SLUG}`,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'CLP' },
  provider: { '@type': 'Organization', name: 'Enérgica City', url: CANONICAL_DOMAIN },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: CANONICAL_DOMAIN },
    { '@type': 'ListItem', position: 2, name: 'Cotizador', item: `${CANONICAL_DOMAIN}/${SLUG}` },
  ],
}

export default function Cotizador2Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* <HpHeaderNew /> */}
      <CotizadorWizard />
    </>
  )
}

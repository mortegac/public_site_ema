import type { Metadata } from 'next';
import ComparadorWizard from './ComparadorWizard';

export const metadata: Metadata = {
  title: 'Comparador Eléctrico: ¿Cuánto ahorras cambiando a EV?',
  description:
    'Calculadora TCO gratuita: compara tu auto actual con 20+ modelos eléctricos disponibles en Chile. Descubre tu ahorro real a 5 años en menos de 3 minutos.',
  alternates: { canonical: 'https://www.energica.city/comparador-electrico' },
  openGraph: {
    url: 'https://www.energica.city/comparador-electrico',
    title: 'Comparador Eléctrico — Calcula tu ahorro real en Chile',
    description:
      'Descubre cuánto ahorrarías cambiando a un auto eléctrico. Análisis TCO personalizado con 20+ modelos disponibles en Chile.',
    images: [
      {
        url: 'https://www.energica.city/images/og/servicios-cargadores-ev.jpg',
        width: 1200,
        height: 630,
        alt: 'Comparador eléctrico Chile — calculadora TCO gratuita',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparador Eléctrico — ¿Cuánto ahorras cambiando a EV?',
    description: 'Calculadora TCO gratuita para Chile. Compara tu auto actual con 20+ modelos eléctricos.',
    images: ['https://www.energica.city/images/og/servicios-cargadores-ev.jpg'],
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Comparador Eléctrico — Calculadora TCO Chile",
  "description": "Calculadora gratuita de costo total de propiedad (TCO) para comparar tu auto actual con 20+ modelos eléctricos disponibles en Chile.",
  "url": "https://www.energica.city/comparador-electrico",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CLP" },
  "provider": { "@type": "Organization", "name": "Energica City", "url": "https://www.energica.city" },
};

export default function ComparadorElectricoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <ComparadorWizard />
    </>
  );
}

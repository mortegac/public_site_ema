import type { Metadata } from 'next';
import SimuladorClient from './SimuladorClient';

export const metadata: Metadata = {
  title: 'Simulador de Electroterminal B2B',
  description:
    'Calcula el costo de instalar infraestructura de carga para tu flota de vehículos eléctricos (buses, camiones, furgones). Simulador B2B por Enérgica City.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.energica.city/simulador' },
  openGraph: {
    url: 'https://www.energica.city/simulador',
    title: 'Simulador de Ahorro con Cargador Eléctrico — Enérgica City',
    description: 'Calcula cuánto ahorras con un auto eléctrico y cargador en casa. Simulación personalizada para flotas y uso residencial en Chile.',
    images: [{ url: 'https://www.energica.city/images/og/servicios-cargadores-ev.jpg', width: 1200, height: 630, alt: 'Simulador ahorro cargador eléctrico Chile' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulador Cargador Eléctrico — Enérgica City',
    description: 'Calcula tu ahorro con cargador EV en casa. Simulación para flotas y uso residencial.',
    images: ['https://www.energica.city/images/og/servicios-cargadores-ev.jpg'],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Simulador de Electroterminal B2B — Enérgica City",
  "description": "Calcula el costo de instalar infraestructura de carga para tu flota de vehículos eléctricos (buses, camiones, furgones).",
  "url": "https://www.energica.city/simulador",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "provider": { "@type": "Organization", "name": "Enérgica City", "url": "https://www.energica.city" },
}

export default function SimuladorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <SimuladorClient />
    </>
  );
}

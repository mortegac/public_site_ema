import type { Metadata } from 'next';
import SimuladorClient from './SimuladorClient';

export const metadata: Metadata = {
  title: 'Simulador de Electroterminal B2B',
  description:
    'Calcula el costo de instalar infraestructura de carga para tu flota de vehículos eléctricos (buses, camiones, furgones). Simulador B2B por Enérgica City.',
  robots: { index: true, follow: true },
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

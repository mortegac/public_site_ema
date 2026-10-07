import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mapa Red EVE — Cargadores EV",
  description: "Mapa interactivo de la Red EVE: edificios, hoteles y recintos con cargadores de vehículos eléctricos gestionados por Enérgica City en Santiago, Chile.",
  alternates: {
    canonical: "https://www.energica.city/mapa-red-eve",
  },
  openGraph: {
    url: 'https://www.energica.city/mapa-red-eve',
    title: 'Mapa Red EVE — Cargadores EV Enérgica City',
    description: 'Explora los puntos de carga EVE de Enérgica City en Santiago: edificios residenciales, hoteles y recintos con cargadores operativos.',
    images: [{ url: 'https://www.energica.city/images/og/servicios-cargadores-ev.jpg', width: 1200, height: 630, alt: 'Mapa Red EVE cargadores eléctricos Chile' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mapa Red EVE — Enérgica City',
    description: 'Mapa interactivo de puntos de carga EVE en Santiago, Chile.',
    images: ['https://www.energica.city/images/og/servicios-cargadores-ev.jpg'],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.energica.city" },
    { "@type": "ListItem", "position": 2, "name": "Red EVE", "item": "https://www.energica.city/mapa-red-eve" },
  ],
};

export default function MapaRedEvePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <iframe
        src="/red-eve.html"
        style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
        title="Mapa Red EVE — Cargadores Eléctricos Enérgica City"
      />
    </>
  );
}

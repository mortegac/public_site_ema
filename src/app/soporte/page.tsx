import type { Metadata } from 'next';
import SoporteClient from './SoporteClient';

export const metadata: Metadata = {
  title: "Soporte Técnico en Cargadores EV",
  description: "Contáctate con nuestro equipo de soporte para resolver tus dudas o problemas con la instalación de cargadores eléctricos.",
  alternates: {
    canonical: "https://www.energica.city/soporte",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Soporte Técnico en Cargadores EV",
  "url": "https://www.energica.city/soporte",
  "description": "Contáctate con nuestro equipo de soporte para resolver tus dudas o problemas con la instalación de cargadores eléctricos.",
  "telephone": "+56967666652",
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.energica.city" },
    { "@type": "ListItem", "position": 2, "name": "Soporte", "item": "https://www.energica.city/soporte" }
  ]
}

export default function SoportePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SoporteClient />
    </>
  );
}

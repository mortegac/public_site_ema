import type { Metadata } from 'next';
import SoporteClient from './SoporteClient';

export const metadata: Metadata = {
  title: "Soporte Técnico en Cargadores EV",
  description: "Contáctate con nuestro equipo de soporte para resolver tus dudas o problemas con la instalación de cargadores eléctricos.",
  alternates: {
    canonical: "https://www.energica.city/soporte",
  },
  openGraph: {
    url: 'https://www.energica.city/soporte',
    title: 'Soporte Técnico en Cargadores EV — Enérgica City',
    description: 'Contáctate con nuestro equipo de soporte para resolver tus dudas o problemas con la instalación de cargadores eléctricos en Chile.',
    images: [{ url: 'https://www.energica.city/images/og/servicios-cargadores-ev.jpg', width: 1200, height: 630, alt: 'Soporte cargadores eléctricos Chile' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soporte Técnico — Enérgica City',
    description: 'Resuelve tus dudas o reporta un problema con tu instalación de cargador eléctrico. Equipo disponible Lun–Vie 09:00–18:00.',
    images: ['https://www.energica.city/images/og/servicios-cargadores-ev.jpg'],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "Preguntas frecuentes — Soporte Cargadores EV",
  "url": "https://www.energica.city/soporte",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo puedo contactar al soporte técnico de Energica City?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Puedes enviarnos un formulario de soporte en esta página con tu email, teléfono y descripción del problema. Un ejecutivo se contactará contigo a la brevedad. También puedes llamarnos al +56 9 6766 6652, disponible lunes a viernes de 09:00 a 18:00 horas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué información debo incluir al reportar un problema con mi cargador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incluye el modelo del cargador, la fecha de instalación, una descripción detallada del problema y, si tienes, el número de orden de servicio. Esto permite a nuestro equipo técnico atenderte más rápido."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo tarda en responder el equipo de soporte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Respondemos en un plazo máximo de 24 horas hábiles. Para casos urgentes relacionados con seguridad eléctrica, llamar directamente al +56 9 6766 6652 durante el horario de atención."
      }
    },
    {
      "@type": "Question",
      "name": "¿El soporte técnico cubre la garantía de instalación?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Las instalaciones realizadas por Energica City tienen garantía de 6 meses en mano de obra. Si el problema se debe a un defecto de instalación dentro de ese período, la revisión y corrección no tiene costo adicional."
      }
    }
  ]
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SoporteClient />
    </>
  );
}

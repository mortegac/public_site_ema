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

export default function ComparadorElectricoPage() {
  return <ComparadorWizard />;
}

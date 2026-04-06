import type { Metadata } from 'next';
import ComparadorWizard from './ComparadorWizard';

export const metadata: Metadata = {
  title: '¿Te conviene pasarte a eléctrico?',
  description:
    'Compara tu auto actual con alternativas eléctricas disponibles en Chile. Calcula el ahorro real a 5 años con nuestra calculadora TCO gratuita.',
  openGraph: {
    title: '¿Te conviene pasarte a eléctrico? — Energica City',
    description:
      'Descubre cuánto ahorrarías cambiando a un auto eléctrico. Análisis TCO personalizado con 20 modelos disponibles en Chile.',
    url: 'https://www.energica.city/comparador-electrico',
    siteName: 'Energica City',
  },
};

export default function ComparadorElectricoPage() {
  return <ComparadorWizard />;
}

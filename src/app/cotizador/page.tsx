import type { Metadata } from 'next';
import CotizadorClient from './CotizadorClient';

export const metadata: Metadata = {
  title: "Cotizador de Cargadores EV",
  description: "Calcula gratis el costo estimado de instalación de tu cargador eléctrico en Chile. Obtén tu cotización en minutos.",
  alternates: {
    canonical: "https://energica.city/cotizador",
  },
};

export default function CotizadorPage() {
  return <CotizadorClient />;
}

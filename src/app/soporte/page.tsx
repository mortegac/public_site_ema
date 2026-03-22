import type { Metadata } from 'next';
import SoporteClient from './SoporteClient';

export const metadata: Metadata = {
  title: "Soporte | Energica City",
  description: "Contáctate con nuestro equipo de soporte para resolver tus dudas o problemas con la instalación de cargadores eléctricos.",
  alternates: {
    canonical: "https://energica.city/soporte",
  },
};

export default function SoportePage() {
  return <SoporteClient />;
}

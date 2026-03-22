import type { Metadata } from 'next';
import AgendaClient from './AgendaClient';

export const metadata: Metadata = {
  title: "Agenda tu Visita Técnica | Energica City",
  description: "Agenda tu visita técnica para la instalación de tu cargador eléctrico. Elige el horario que mejor te acomode.",
  alternates: {
    canonical: "https://energica.city/agenda",
  },
};

export default function AgendaPage() {
  return <AgendaClient />;
}

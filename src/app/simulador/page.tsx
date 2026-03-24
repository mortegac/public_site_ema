import type { Metadata } from 'next';
import SimuladorClient from './SimuladorClient';

export const metadata: Metadata = {
  title: 'Simulador de Electroterminal B2B — Enérgica City',
  description:
    'Calcula el costo de instalar infraestructura de carga para tu flota de vehículos eléctricos (buses, camiones, furgones). Simulador B2B por Enérgica City.',
  robots: { index: true, follow: true },
};

export default function SimuladorPage() {
  return <SimuladorClient />;
}

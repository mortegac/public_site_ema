import type { Metadata } from 'next'

const CANONICAL_DOMAIN = 'https://www.energica.city'

export const metadata: Metadata = {
  title: 'Presupuesto Instalación Cargador Eléctrico Online Chile',
  description:
    'Obtén el precio exacto de instalación de tu cargador EV online. Casa desde $159.000, edificio desde $0 con electrolinera. Sin registro, sin llamadas. RM y Valparaíso.',
  alternates: {
    canonical: `${CANONICAL_DOMAIN}/presupuesto-cargador-electrico`,
  },
  openGraph: {
    title: 'Presupuesto Cargador Eléctrico Online — Precio Exacto en 2 Minutos',
    description:
      'Sin registro ni llamadas. Precio real para casas y edificios en RM y Valparaíso. Incluye materiales, mano de obra certificada SEC y declaración TE6.',
    url: `${CANONICAL_DOMAIN}/presupuesto-cargador-electrico`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Presupuesto Cargador Eléctrico Online — Enérgica City',
    description: 'Precio exacto en 2 minutos. Casa desde $159.000, edificio desde $0. Sin registro. RM y Valparaíso.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

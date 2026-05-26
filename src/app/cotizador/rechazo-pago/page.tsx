import type { Metadata } from 'next'
import RechazoPagoClient from './RechazoPagoClient'

export const metadata: Metadata = {
  title: 'Error en el pago — Enérgica City',
  robots: { index: false, follow: false },
}

export default function RechazoPagoPage() {
  return <RechazoPagoClient />
}

import type { Metadata } from 'next'
import PagoClient from './PagoClient'

export const metadata: Metadata = {
  title: 'Reservar instalación — Enérgica City',
  robots: { index: false, follow: false },
}

export default function PagoPage() {
  return <PagoClient />
}

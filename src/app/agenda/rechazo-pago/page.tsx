import type { Metadata } from 'next'
import RechazoPagoClient from './RechazoPagoClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function RechazoPagoPage() {
  return <RechazoPagoClient />
}

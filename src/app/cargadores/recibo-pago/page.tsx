import type { Metadata } from 'next'
import ReciboPagoClient from './ReciboPagoClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ReciboPagoPage() {
  return <ReciboPagoClient />
}

import type { Metadata } from 'next'
import SimulacionClient from './SimulacionClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function SimulacionPage() {
  return <SimulacionClient />
}

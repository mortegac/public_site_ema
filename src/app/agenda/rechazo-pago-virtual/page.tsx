import type { Metadata } from 'next'
import RechazoPagoVirtualClient from './RechazoPagoVirtualClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function RechazoPagoVirtualPage() {
  return <RechazoPagoVirtualClient />
}

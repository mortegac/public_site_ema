import type { Metadata } from 'next'
import ReciboVirtualClient from '../recibo-virtual/ReciboVirtualClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ReciboPagoVirtualPage() {
  return <ReciboVirtualClient />
}

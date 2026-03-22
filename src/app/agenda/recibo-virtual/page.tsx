import type { Metadata } from 'next'
import ReciboVirtualClient from './ReciboVirtualClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ReciboVirtualPage() {
  return <ReciboVirtualClient />
}

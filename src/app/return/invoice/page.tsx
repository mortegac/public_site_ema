import type { Metadata } from 'next'
import InvoiceClient from './InvoiceClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function InvoicePage() {
  return <InvoiceClient />
}

import type { Metadata } from 'next'
import ReciboPagadoClient from './ReciboPagadoClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ReciboPagadoPage() {
  return <ReciboPagadoClient />
}

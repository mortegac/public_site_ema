import type { Metadata } from 'next'
import FichaTecnicaClient from './FichaTecnicaClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function FichaTecnicaCargadoresPage() {
  return <FichaTecnicaClient />
}

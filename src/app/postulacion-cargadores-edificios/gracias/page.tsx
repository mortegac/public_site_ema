import type { Metadata } from 'next'
import GraciasClient from './GraciasClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function GraciasPage() {
  return <GraciasClient />
}

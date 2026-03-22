import type { Metadata } from 'next'
import FormsClient from './FormsClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function FormsPage() {
  return <FormsClient />
}

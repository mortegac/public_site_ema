import type { Metadata } from 'next'
import ReturnClient from './ReturnClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ReturnPage() {
  return <ReturnClient />
}

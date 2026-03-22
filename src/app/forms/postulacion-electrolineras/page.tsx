import type { Metadata } from 'next'
import PostulacionClient from './PostulacionClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function PostulacionElectrolinerasPage() {
  return <PostulacionClient />
}

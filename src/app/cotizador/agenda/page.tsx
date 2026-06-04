import type { Metadata } from 'next'
import AgendaClient from './AgendaClient'

export const metadata: Metadata = {
  title: 'Agendar visita técnica — Enérgica City',
  robots: { index: false, follow: false },
}

export default function AgendaPage() {
  return <AgendaClient />
}

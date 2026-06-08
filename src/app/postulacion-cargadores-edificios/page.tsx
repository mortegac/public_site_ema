import type { Metadata } from 'next'
import PostulacionClient from './PostulacionClient'

export const metadata: Metadata = {
  title: 'Postula tu edificio para electrolinera compartida',
  description: 'Instala un cargador compartido en el estacionamiento de visitas de tu edificio sin costo. Energica financia e instala.',
}

export default function PostulacionEdificiosPage() {
  return <PostulacionClient />
}

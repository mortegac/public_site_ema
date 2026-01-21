// app/sitemap.ts
import { MetadataRoute } from 'next'
import { createClient } from '@/prismicio'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient()
  const pages = await client.getAllByType('page') // O tus tipos personalizados

  const prismicEntries = pages.map((page) => ({
    url: `https://energica.city/${page.uid}`,
    lastModified: new Date(page.last_publication_date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://energica.city', lastModified: new Date(), priority: 1 },
    ...prismicEntries,
  ]
}
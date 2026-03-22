// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { createClient } from '@/prismicio'

const STATIC_LAST_MODIFIED = new Date('2026-01-01')

const STATIC_ROUTES = [
  '/cotizador',
  '/agenda',
  '/faqs',
  '/soporte',
  '/contactanos',
  '/terminos-condiciones',
  '/como-funciona',
  '/casos-de-exito',
  '/credenciales',
  '/blog',
]

const CITY_ROUTES = ['santiago', 'las-condes', 'providencia', 'vitacura', 'nunoa', 'la-florida']

const PRISMIC_EXCLUDED_UIDS = new Set(['home', 'privacidad'])

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient()

  const [pages, blogPosts] = await Promise.all([
    client.getAllByType('page'),
    client.getAllByType('blog'),
  ])

  const prismicEntries = pages
    .filter((page) => !PRISMIC_EXCLUDED_UIDS.has(page.uid))
    .map((page) => ({
      url: `https://energica.city/${page.uid}`,
      lastModified: new Date(page.last_publication_date),
    }))

  const blogEntries = blogPosts.map((post) => ({
    url: `https://energica.city/blog/${post.uid}`,
    lastModified: new Date(post.last_publication_date),
  }))

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `https://energica.city${route}`,
    lastModified: STATIC_LAST_MODIFIED,
  }))

  const cityEntries = CITY_ROUTES.map((city) => ({
    url: `https://energica.city/servicios/${city}`,
    lastModified: STATIC_LAST_MODIFIED,
  }))

  return [
    { url: 'https://energica.city', lastModified: STATIC_LAST_MODIFIED },
    ...prismicEntries,
    ...blogEntries,
    ...staticEntries,
    ...cityEntries,
  ]
}

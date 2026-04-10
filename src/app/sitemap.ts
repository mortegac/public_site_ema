// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { createClient } from '@/prismicio'

const STATIC_LAST_MODIFIED = new Date('2026-04-10')

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
  '/comparador-electrico',
  '/simulador',
  '/comparar/energica-vs-enel-x',
  '/comparar/energica-vs-copec-voltex',
  '/comparar/mejor-empresa-instalacion-cargadores-chile',
]

const CITY_ROUTES = [
  'santiago', 'las-condes', 'providencia', 'vitacura', 'nunoa', 'la-florida',
  'lo-barnechea', 'san-miguel', 'villa-alemana', 'estacion-central', 'huechuraba',
  'colina', 'lampa', 'chicureo', 'maipu', 'algarrobo', 'la-cisterna',
  'penalolen', 'con-con', 'maitencillo',
]

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
      url: `https://www.energica.city/${page.uid}`,
      lastModified: new Date(page.last_publication_date),
    }))

  const blogEntries = blogPosts.map((post) => ({
    url: `https://www.energica.city/blog/${post.uid}`,
    lastModified: new Date(post.last_publication_date),
  }))

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `https://www.energica.city${route}`,
    lastModified: STATIC_LAST_MODIFIED,
  }))

  const cityEntries = CITY_ROUTES.map((city) => ({
    url: `https://www.energica.city/servicios/${city}`,
    lastModified: STATIC_LAST_MODIFIED,
  }))

  return [
    { url: 'https://www.energica.city', lastModified: STATIC_LAST_MODIFIED },
    ...prismicEntries,
    ...blogEntries,
    ...staticEntries,
    ...cityEntries,
  ]
}

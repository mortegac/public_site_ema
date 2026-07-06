// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { createClient } from '@/prismicio'
import { BLOG_ARTICLES } from '@/data/blog-articles'

const STATIC_LAST_MODIFIED = new Date('2026-07-06')

const STATIC_ROUTES = [
  '/cotizador',
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
  '/auto-electrico-vs-gasolina-chile',
  '/agenda-una-visita-tecnica-para-evaluar-la-instalacion-de-tu-cargador',
  '/cookie-policy',
  '/presupuesto-cargador-electrico',
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

  const staticBlogEntries = BLOG_ARTICLES.map((article) => ({
    url: `https://www.energica.city/blog/${article.uid}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const HIGH_PRIORITY_ROUTES = new Set(['/cotizador', '/comparador-electrico', '/presupuesto-cargador-electrico'])
  const LOW_PRIORITY_ROUTES = new Set(['/terminos-condiciones', '/cookie-policy'])

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `https://www.energica.city${route}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: HIGH_PRIORITY_ROUTES.has(route) ? ('weekly' as const) : ('monthly' as const),
    priority: HIGH_PRIORITY_ROUTES.has(route) ? 0.9 : LOW_PRIORITY_ROUTES.has(route) ? 0.6 : 0.8,
  }))

  const cityEntries = CITY_ROUTES.map((city) => ({
    url: `https://www.energica.city/servicios/${city}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: 'https://www.energica.city', lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'weekly' as const, priority: 1.0 },
    ...prismicEntries,
    ...blogEntries,
    ...staticBlogEntries,
    ...staticEntries,
    ...cityEntries,
  ]
}

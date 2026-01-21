// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/slice-simulator'], // Bloquea lo innecesario
    },
    sitemap: 'https://energica.city/sitemap.xml',
  }
}
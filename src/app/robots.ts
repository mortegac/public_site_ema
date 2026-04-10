// app/robots.ts
import type { MetadataRoute } from 'next'

const BLOCKED_PATHS = [
  '/return',
  '/return/',
  '/return/invoice',
  '/agenda/recibo-pago',
  '/agenda/rechazo-pago',
  '/agenda/recibo-virtual',
  '/agenda/recibo-pago-virtual',
  '/agenda/recibo-pagado',
  '/agenda/rechazo-pago-virtual',
  '/cargadores/recibo-pago',
  '/cargadores/rechazo-pago',
  '/cotizador/simulacion',
  '/forms',
  '/postulacion-cargadores-edificios/gracias',
  '/api/',
  '/slice-simulator',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot'],
        allow: '/',
        disallow: BLOCKED_PATHS,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: BLOCKED_PATHS,
      },
    ],
    sitemap: 'https://www.energica.city/sitemap.xml',
  }
}

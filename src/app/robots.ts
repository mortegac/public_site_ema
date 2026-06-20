// app/robots.ts
import type { MetadataRoute } from 'next'

const BLOCKED_PATHS = [
  '/return',
  '/return/',
  '/return/invoice',
  '/cargadores/recibo-pago',
  '/cargadores/rechazo-pago',
  '/cotizador/simulacion',
  '/forms',
  '/postulacion-cargadores-edificios/gracias',
  '/api/',
  '/slice-simulator',
]

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'OAI-SearchBot',
  'Applebot-Extended',
  'CCBot',
  'Google-Extended',
  'FacebookBot',
  'Amazonbot',
  'Bytespider',
  'cohere-ai',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: AI_BOTS,
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

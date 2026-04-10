import type { Metadata } from 'next'
import Link from 'next/link'
import { asText } from '@prismicio/client'
import { Container, Box, Typography, Grid } from '@mui/material'

import { createClient } from '@/prismicio'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import { STATIC_ROUTES, CITY_ROUTES, PRISMIC_EXCLUDED_UIDS } from './sitemapData'

export const metadata: Metadata = {
  title: 'Mapa del Sitio',
  description:
    'Explora todas las páginas de Energica City: servicios por ciudad, herramientas de comparación, blog y más.',
  alternates: { canonical: 'https://www.energica.city/sitemap' },
}

// Design tokens
const PINK = '#e81a68'
const DARK = '#0F172A'
const GRAY_BG = '#F8FAFC'
const TEXT_MUTED = '#64748B'
const BORDER = '#E2E8F0'

function SitemapSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Box>
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: 15, sm: 16 },
          fontWeight: 700,
          color: DARK,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          borderLeft: `3px solid ${PINK}`,
          pl: 1.5,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {children}
      </Box>
    </Box>
  )
}

function SitemapLink({ href, label }: { href: string; label: string }) {
  return (
    <Box component="li">
      <Box
        component={Link}
        href={href}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          color: '#1E3A8A',
          fontSize: 14,
          textDecoration: 'none',
          py: 0.5,
          '&:hover': { color: PINK, textDecoration: 'underline' },
          '&::before': { content: '"→"', color: PINK, fontSize: 12, flexShrink: 0 },
        }}
      >
        {label}
      </Box>
    </Box>
  )
}

export default async function SitemapPage() {
  const client = createClient()
  const [pages, blogPosts] = await Promise.all([
    client.getAllByType('page'),
    client.getAllByType('blog'),
  ])

  const prismicPages = pages.filter((p) => !PRISMIC_EXCLUDED_UIDS.has(p.uid))
  const sortedCities = [...CITY_ROUTES].sort((a, b) =>
    a.label.localeCompare(b.label, 'es')
  )

  return (
    <>
      <HpHeaderNew />

      {/* Hero bar */}
      <Box
        component="section"
        sx={{
          bgcolor: GRAY_BG,
          borderBottom: `1px solid ${BORDER}`,
          py: 6,
        }}
      >
        <Container sx={{ maxWidth: '1200px !important' }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
              fontWeight: 800,
              color: DARK,
              mb: 1,
            }}
          >
            Mapa del Sitio
          </Typography>
          <Typography sx={{ fontSize: 16, color: TEXT_MUTED }}>
            Encuentra cualquier página de Energica City.
          </Typography>
        </Container>
      </Box>

      {/* Main content */}
      <Box component="main" sx={{ bgcolor: '#ffffff', py: 6 }}>
        <Container sx={{ maxWidth: '1200px !important' }}>
          <Grid container spacing={4}>
            {/* Section 1: Páginas Principales */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <SitemapSection title="Páginas Principales">
                {STATIC_ROUTES.map((route) => (
                  <SitemapLink key={route.path} href={route.path} label={route.label} />
                ))}
              </SitemapSection>
            </Grid>

            {/* Section 2: Servicios por Ciudad */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <SitemapSection title="Servicios por Ciudad">
                {sortedCities.map((city) => (
                  <SitemapLink
                    key={city.slug}
                    href={`/servicios/${city.slug}`}
                    label={city.label}
                  />
                ))}
              </SitemapSection>
            </Grid>

            {/* Section 3: Blog */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <SitemapSection title="Blog">
                {blogPosts.map((post) => {
                  // blog.title is a RichTextField; fall back to meta_title then uid
                  const richLabel = asText(post.data.title)
                  const label = richLabel || post.data.meta_title || post.uid
                  return (
                    <SitemapLink key={post.uid} href={`/blog/${post.uid}`} label={label} />
                  )
                })}
              </SitemapSection>
            </Grid>

            {/* Section 4: Otras Páginas (Prismic pages, excluding home & privacidad) */}
            {prismicPages.length > 0 && (
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <SitemapSection title="Otras Páginas">
                  {prismicPages.map((page) => {
                    // PageDocumentData has meta_title (KeyTextField), no title field
                    const label = page.data.meta_title || page.uid
                    return (
                      <SitemapLink key={page.uid} href={`/${page.uid}`} label={label} />
                    )
                  })}
                </SitemapSection>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Container, Typography, Card, CardActionArea, CardContent, Chip } from '@mui/material'
import type { BlogArticle } from '@/data/blog-articles'

export interface PrismicPostCard {
  uid: string
  title: string
  description: string
  date: string
  imageUrl: string
}

interface PostCard {
  uid: string
  title: string
  description: string
  date: string
  category: string
  image?: string
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogClientContent({
  prismicPosts,
  staticArticles,
}: {
  prismicPosts: PrismicPostCard[]
  staticArticles: BlogArticle[]
}) {
  const [activeCategory, setActiveCategory] = useState('Todos')

  const FEATURED_UID = 'como-usar-cotizador-cargador-electrico'
  const featuredArticle = staticArticles.find((a) => a.uid === FEATURED_UID) ?? staticArticles[0]
  const restStatic: PostCard[] = staticArticles.filter((a) => a.uid !== featuredArticle.uid)

  const prismicCards: PostCard[] = prismicPosts.map((p) => ({
    uid: p.uid,
    title: p.title,
    description: p.description,
    date: p.date,
    category: '',
    image: p.imageUrl || undefined,
  }))

  const allCategories = ['Todos', ...Array.from(new Set(restStatic.map((a) => a.category).filter(Boolean)))]

  const gridCards: PostCard[] =
    activeCategory === 'Todos'
      ? [...prismicCards, ...restStatic]
      : restStatic.filter((a) => a.category === activeCategory)

  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 700, mb: 1 }}>
          Blog
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 6, fontSize: '1.1rem' }}>
          Artículos sobre electromovilidad, normativa SEC y cargadores eléctricos en Chile.
        </Typography>

        {/* Featured post — full width */}
        <Link href={`/blog/${featuredArticle.uid}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '48px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              borderRadius: 3,
              overflow: 'hidden',
              border: '5px solid #e1dfdf',
              transition: 'box-shadow 0.2s',
              '&:hover': { boxShadow: '0 8px 32px rgba(0,0,0,0.13)' },
            }}
          >
            {/* Text side */}
            <Box
              sx={{
                flex: 1,
                p: { xs: 3, md: 5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                bgcolor: '#F8FAFC',
              }}
            >
              <Chip
                label={featuredArticle.category}
                size="small"
                sx={{ alignSelf: 'flex-start', mb: 2, bgcolor: '#E81A68', color: '#fff', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.04em' }}
              />
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '1.4rem', md: '1.9rem' }, fontWeight: 800, color: '#0F172A', mb: 2, lineHeight: 1.3 }}
              >
                {featuredArticle.title}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  mb: 2,
                  lineHeight: 1.7,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {featuredArticle.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(featuredArticle.date)}
              </Typography>
            </Box>

            {/* Image side */}
            {featuredArticle.image && (
              <Box
                sx={{
                  width: { xs: '100%', md: '46%' },
                  minHeight: { xs: 220, md: 300 },
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 900px) 100vw, 46vw"
                  priority
                />
              </Box>
            )}
          </Box>
        </Link>

        {/* Category filter tabs */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 5 }}>
          {allCategories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setActiveCategory(cat)}
              sx={{
                cursor: 'pointer',
                fontWeight: activeCategory === cat ? 700 : 500,
                bgcolor: activeCategory === cat ? '#E81A68' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#64748b',
                border: '1px solid',
                borderColor: activeCategory === cat ? '#E81A68' : '#e2e8f0',
                '&:hover': {
                  bgcolor: activeCategory === cat ? '#c01556' : '#f1f5f9',
                  borderColor: activeCategory === cat ? '#c01556' : '#cbd5e1',
                },
              }}
            />
          ))}
        </Box>

        {/* Cards grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {gridCards.map((card) => (
            <Card
              key={card.uid}
              sx={{
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.07)',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: '0 6px 24px rgba(0,0,0,0.12)' },
                overflow: 'hidden',
              }}
            >
              <CardActionArea
                component={Link}
                href={`/blog/${card.uid}`}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}
              >
                {/* Image area */}
                {card.image ? (
                  <Box sx={{ width: '100%', aspectRatio: '370/246', position: 'relative', overflow: 'hidden' }}>
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                    {card.category && (
                      <Chip
                        label={card.category.toUpperCase()}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          bgcolor: '#E81A68',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.65rem',
                          letterSpacing: '0.05em',
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: 4,
                      background: 'linear-gradient(90deg, #0898b9 0%, #4dbfd9 100%)',
                    }}
                  />
                )}

                {/* Content */}
                <CardContent sx={{ p: 3, width: '100%', flexGrow: 1 }}>
                  {/* Teal accent */}
                  <Box sx={{ width: 32, height: 3, bgcolor: '#0898b9', borderRadius: 2, mb: 2 }} />

                  {/* Date + category chip */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                    {card.date && (
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(card.date)}
                      </Typography>
                    )}
                    {card.category && (
                      <Chip
                        label={card.category}
                        size="small"
                        sx={{ height: 20, fontSize: '0.7rem', bgcolor: '#e0f4fa', color: '#0777a0', fontWeight: 600 }}
                      />
                    )}
                  </Box>

                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{ fontSize: '1.05rem', fontWeight: 700, mb: 1.5, lineHeight: 1.4, color: '#0F172A' }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

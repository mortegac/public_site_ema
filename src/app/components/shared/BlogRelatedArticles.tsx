import Link from 'next/link'
import Image from 'next/image'
import { Box, Container, Typography, Chip } from '@mui/material'
import { getRelatedArticles } from '@/data/blog-articles'

const TEAL = '#0898b9'
const DARK = '#0F172A'
const GRAY_BG = '#F8FAFC'

interface BlogRelatedArticlesProps {
  currentUid: string
  count?: number
}

export default function BlogRelatedArticles({ currentUid, count = 3 }: BlogRelatedArticlesProps) {
  const articles = getRelatedArticles(currentUid, count)

  return (
    <Box sx={{ bgcolor: GRAY_BG, py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '1.4rem', md: '1.75rem' },
            fontWeight: 800,
            color: DARK,
            mb: 5,
          }}
        >
          Artículos relacionados
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {articles.map((article) => (
            <Box
              key={article.uid}
              component={Link}
              href={`/blog/${article.uid}`}
              sx={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#fff',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(8,152,185,0.15)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {/* Thumbnail */}
              {article.image ? (
                <Box sx={{ position: 'relative', width: '100%', aspectRatio: '370/246', flexShrink: 0 }}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: 6,
                    background: 'linear-gradient(90deg, #0898b9 0%, #4dbfd9 100%)',
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Body */}
              <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Chip
                  label={article.category}
                  size="small"
                  sx={{
                    alignSelf: 'flex-start',
                    mb: 1.5,
                    height: 22,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    bgcolor: '#e0f4fa',
                    color: TEAL,
                    letterSpacing: '0.02em',
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: DARK,
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    lineHeight: 1.45,
                    mb: 1,
                  }}
                >
                  {article.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#64748B',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {article.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

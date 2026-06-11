import Link from 'next/link'
import { Box, Container, Typography } from '@mui/material'

interface BlogBreadcrumbProps {
  title: string
}

export default function BlogBreadcrumb({ title }: BlogBreadcrumbProps) {
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderBottom: '1px solid #E2E8F0',
        py: 1,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'nowrap', overflow: 'hidden' }}>
          <Typography
            component={Link}
            href="/"
            sx={{
              fontSize: '0.8rem',
              color: '#0898b9',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Inicio
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: '#94A3B8', flexShrink: 0 }}>/</Typography>
          <Typography
            component={Link}
            href="/blog"
            sx={{
              fontSize: '0.8rem',
              color: '#0898b9',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Blog
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: '#94A3B8', flexShrink: 0 }}>/</Typography>
          <Typography
            sx={{
              fontSize: '0.8rem',
              color: '#64748B',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

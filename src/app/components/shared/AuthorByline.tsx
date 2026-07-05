import Image from 'next/image'
import { Box, Container, Typography } from '@mui/material'

interface AuthorBylineProps {
  name?: string
  bio?: string
  imageSrc?: string
  imageAlt?: string
}

export default function AuthorByline({
  name = 'Felipe Donoso',
  bio = 'Ingeniero Eléctrico con 10+ años de experiencia en electromovilidad.',
  imageSrc = '/images/felipe-donoso.jpeg',
  imageAlt,
}: AuthorBylineProps) {
  return (
    <Box sx={{ py: 4, background: '#fff', borderTop: '1px solid #E2E8F0' }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Box
            sx={{
              flexShrink: 0,
              width: 64,
              height: 64,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #fff',
              boxShadow: '0 0 0 2px #0898b9',
              position: 'relative',
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt ?? `${name}, Enérgica City`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="64px"
            />
          </Box>
          <Typography sx={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.7 }}>
            Escrito por <strong>{name}</strong>, {bio}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

import Image from 'next/image'
import { Box, Container, Typography } from '@mui/material'

interface AuthorBylineProps {
  name?: string
  bio?: string
  imageSrc?: string
  imageAlt?: string
  url?: string
  dateModified?: string
}

function formatDate(iso: string): string {
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} de ${months[m - 1]} de ${y}`
}

export default function AuthorByline({
  name = 'Felipe Donoso',
  bio = 'Ingeniero Eléctrico con 10+ años de experiencia en electromovilidad.',
  imageSrc = '/images/felipe-donoso.jpeg',
  imageAlt,
  url = '/que-es-energica-city',
  dateModified,
}: AuthorBylineProps) {
  return (
    <Box sx={{ py: 4, background: '#fff', borderTop: '1px solid #E2E8F0' }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Box
            component="a"
            href={url}
            sx={{
              flexShrink: 0,
              width: 64,
              height: 64,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #fff',
              boxShadow: '0 0 0 2px #0898b9',
              position: 'relative',
              display: 'block',
              textDecoration: 'none',
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
          <Box>
            <Typography sx={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.7 }}>
              Escrito por{' '}
              <Box component="a" href={url} sx={{ color: '#0898b9', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                {name}
              </Box>
              , {bio}
            </Typography>
            {dateModified && (
              <Typography sx={{ fontSize: '0.8rem', color: '#94A3B8', mt: 0.5 }}>
                Actualizado: {formatDate(dateModified)}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Box, Typography } from '@mui/material'

const CLIENTS = [
  { name: 'Inmobiliaria Paz', url: 'https://www.paz.cl/', logo: '/images/logos/inmobiliarias/inmobiliaria-paz.png' },
  { name: 'Inmobiliaria CDi', url: 'https://inmobiliariacdi.cl/', logo: '/images/logos/inmobiliarias/inmobiliaria-CDI.svg' },
  { name: 'Inmobiliaria Aconcagua', url: 'https://www.iaconcagua.com/', logo: '/images/logos/inmobiliarias/inmobiliaria-aconcagua.png' },
  { name: 'Inmobiliaria Santolaya', url: 'https://santolaya.cl/', logo: '/images/logos/inmobiliarias/inmobiliaria-santolaya.svg' },
  { name: 'Inmobiliaria Fortaleza', url: 'https://www.ifortaleza.cl/', logo: '/images/logos/inmobiliarias/inmobiliaria-fortaleza.svg' },
  { name: 'Inmobiliaria Activa', url: 'https://www.activa.cl/', logo: '/images/logos/inmobiliarias/inmobiliaria-activa.svg' },
  { name: 'Hotel Wyndham Pettra', url: 'https://www.wyndhampettra.cl/', logo: '/images/logos/inmobiliarias/hotel-wyndham-pettra.png' },
]

const CARD_BG = '#1E293B'

export default function ClientsCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )

  return (
    <Box
      component="section"
      aria-label="Proyectos inmobiliarios clientes de Enérgica City"
      sx={{ bgcolor: '#0F172A', py: { xs: 6, md: 8 } }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '1.4rem', md: '1.8rem' },
            fontWeight: 700,
            lineHeight: 1.4,
            color: '#fff',
            mb: 1,
            textAlign: 'center',
          }}
        >
          Proyectos inmobiliarios que confiaron en Enérgica
        </Typography>
        <Typography sx={{ textAlign: 'center', color: '#94A3B8', mb: 4, fontSize: '1rem' }}>
          Más de 7 inmobiliarias y hoteles ya integraron infraestructura EV con nuestra metodología.
        </Typography>

        <Box
          ref={emblaRef}
          sx={{ overflow: 'hidden', cursor: 'grab', '&:active': { cursor: 'grabbing' } }}
          role="list"
          aria-label="Clientes inmobiliarios Enérgica City"
        >
          <Box sx={{ display: 'flex', gap: 2, userSelect: 'none' }}>
            {CLIENTS.map((client) => (
              <Box
                key={client.name}
                role="listitem"
                sx={{ flex: '0 0 auto', width: { xs: 200, md: 240 } }}
              >
                <Box
                  component="a"
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visitar sitio de ${client.name}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 110,
                    px: 3,
                    bgcolor: CARD_BG,
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 2,
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      borderColor: '#0898b9',
                      boxShadow: '0 4px 16px rgba(8,152,185,0.2)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', width: '100%', height: 56 }}>
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="200px"
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      color: 'rgba(255,255,255,0.4)',
                      mt: 1,
                      textAlign: 'center',
                    }}
                    aria-hidden="true"
                  >
                    {client.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import NextLink from 'next/link'

const STORAGE_KEY = 'cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  function handleChoice(value: 'accepted' | 'rejected') {
    localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <Box
      role="dialog"
      aria-label="Consentimiento de cookies"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        bgcolor: '#fff',
        borderTop: '1px solid #e2e8f0',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
        px: { xs: 3, md: 6 },
        py: { xs: 2.5, md: 2 },
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        animation: 'slideUp 0.3s ease',
        '@keyframes slideUp': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      }}
    >
      <Typography sx={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6 }}>
        Usamos cookies para mejorar tu experiencia. Consulta nuestra{' '}
        <Box component={NextLink} href="/privacidad" sx={{ color: '#0898b9', textDecoration: 'underline' }}>
          Política de Privacidad
        </Box>{' '}
        y{' '}
        <Box component={NextLink} href="/cookie-policy" sx={{ color: '#0898b9', textDecoration: 'underline' }}>
          Política de Cookies
        </Box>
        .
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleChoice('rejected')}
          sx={{
            borderColor: '#cbd5e1',
            color: '#64748b',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': { borderColor: '#94a3b8', bgcolor: '#f8fafc' },
          }}
        >
          Rechazar
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleChoice('accepted')}
          sx={{
            bgcolor: '#e81a68',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: '#c01556' },
          }}
        >
          Aceptar
        </Button>
      </Box>
    </Box>
  )
}

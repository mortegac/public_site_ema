'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import Footer from '@/app/components/shared/footer'
import { fetchWebpayStart } from '@/store/Webpay/services'

interface PaymentData {
  glosa: string
  total: number | string
  order: string
  email: string
  shoppingCartId: string
}

const FailureIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="36" stroke="#EF4444" strokeWidth="3" fill="none" />
    <path
      d="M26 26L54 54M54 26L26 54"
      stroke="#EF4444"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
)

export default function RechazoPagoClient() {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [retrying, setRetrying] = useState(false)
  const hasRead = useRef(false)

  useEffect(() => {
    if (hasRead.current) return
    hasRead.current = true
    try {
      const raw = sessionStorage.getItem('paymentData')
      if (raw) {
        const parsed = JSON.parse(raw)
        setPaymentData(parsed)
        sessionStorage.removeItem('paymentData')
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  async function handleRetry() {
    if (!paymentData?.shoppingCartId) return
    setRetrying(true)
    try {
      const res = await fetchWebpayStart({
        shoppingCartId: paymentData.shoppingCartId,
        glosa: paymentData.glosa || 'Visita técnica instalación solar',
      })
      if (res?.token && res?.url) {
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = res.url
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = 'token_ws'
        input.value = res.token
        form.appendChild(input)
        document.body.appendChild(form)
        form.submit()
      } else {
        setRetrying(false)
      }
    } catch {
      setRetrying(false)
    }
  }

  return (
    <>
      <HpHeaderNew />
      <Box id="VISITA-PRESENCIAL-RECHAZO" component="main">
        {/* Hero */}
        <Box
          sx={{
            background: 'linear-gradient(180deg, #4dbfd9 10%, #0898b9 80%)',
            py: 0,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 800,
                color: '#000',
                mb: 1,
              }}
            >
              Transacción rechazada
            </Typography>
          </Container>
        </Box>

        {/* Content */}
        <Box sx={{ bgcolor: '#F8FAFC', minHeight: '60vh', py: 4 }}>
          <Container maxWidth="sm">
            <Box
              sx={{
                bgcolor: '#fff',
                borderRadius: 3,
                boxShadow: '0 2px 24px rgba(0,0,0,0.08)',
                p: { xs: 3, md: 4 },
              }}
            >
              {/* Failure icon — always shown */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <FailureIcon />
              </Box>

              <Typography
                variant="h5"
                fontWeight={700}
                textAlign="center"
                mb={0.5}
              >
                Error en el pago
              </Typography>
              <Typography
                fontSize="0.9rem"
                color="#64748B"
                textAlign="center"
                mb={3}
              >
                La transacción fue rechazada
              </Typography>

              {paymentData ? (
                <>
                  {/* Description info box */}
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      bgcolor: '#FEF2F2',
                      border: '1px solid #FECACA',
                      mb: 3,
                    }}
                  >
                    <Typography fontSize="0.85rem" color="#7F1D1D" lineHeight={1.7}>
                      Lamentamos informarte que hubo un problema con tu transacción y tu
                      pago ha sido rechazado. Pero no te preocupes, ¡aún puedes reintentar
                      el pago!
                    </Typography>
                  </Box>

                  {/* Action buttons */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={retrying || !paymentData.shoppingCartId}
                      onClick={handleRetry}
                      sx={{
                        py: 1.5,
                        borderRadius: '24px',
                        bgcolor: '#e81a68',
                        '&:hover': { bgcolor: '#c4155a' },
                        fontWeight: 700,
                      }}
                    >
                      {retrying ? 'Redirigiendo…' : 'Reintentar pago'}
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      component={Link}
                      href="/cotizador"
                      sx={{
                        py: 1.5,
                        borderRadius: '24px',
                        borderColor: '#0898b9',
                        color: '#0898b9',
                        fontWeight: 600,
                        '&:hover': { borderColor: '#0676a0', color: '#0676a0' },
                      }}
                    >
                      Simular nueva cotización
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      component={Link}
                      href="/"
                      sx={{
                        py: 1.5,
                        borderRadius: '24px',
                        borderColor: '#CBD5E1',
                        color: '#64748B',
                        fontWeight: 600,
                        '&:hover': { borderColor: '#94A3B8', color: '#475569' },
                      }}
                    >
                      Ir al inicio
                    </Button>
                  </Box>
                </>
              ) : (
                /* No data fallback */
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: 2,
                    gap: 3,
                  }}
                >
                  <Typography fontSize="0.95rem" color="#64748B" textAlign="center">
                    No se encontraron datos de la transacción
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    href="/cotizador"
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: '24px',
                      bgcolor: '#e81a68',
                      '&:hover': { bgcolor: '#c4155a' },
                      fontWeight: 700,
                    }}
                  >
                    Volver al cotizador
                  </Button>
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
      {/* <Footer /> */}
    </>
  )
}

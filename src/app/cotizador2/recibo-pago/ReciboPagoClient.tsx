'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'

interface PaymentData {
  glosa: string
  total: number | string
  order: string
  card: string
  typePay: string
  email: string
  shoppingCartId: string
}

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CL')

const SuccessIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" stroke="#22C55E" strokeWidth="3" fill="#F0FDF4" />
    <path
      d="M20 32L28 40L44 24"
      stroke="#22C55E"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function ReciboPagoClient() {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
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

  const rowBg = 'rgb(247, 245, 255)'
  const cellSx = (alt: boolean) =>
    alt
      ? { backgroundColor: rowBg, py: 1, px: 2, border: 'none' }
      : { py: 1, px: 2, border: 'none' }

  return (
    <>
      <HpHeaderNew />
      <Box component="main">
        {/* Hero */}
        <Box
          sx={{
            background: 'linear-gradient(358deg, #0898b9 0%, #4dbfd9 100%)',
            py: { xs: 6, md: 8 },
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
              ¡Pago exitoso!
            </Typography>
            <Typography sx={{ color: '#000', fontSize: '0.9rem' }}>
              Tu proceso de instalación ha comenzado
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
              {paymentData ? (
                <>
                  {/* Success icon */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <SuccessIcon />
                  </Box>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                    textAlign="center"
                    mb={0.5}
                  >
                    ¡Tu compra fue procesada con éxito!
                  </Typography>

                  {/* Payment details table */}
                  <Box sx={{ mt: 3 }}>
                    <Table size="small" sx={{ mb: 0 }}>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={cellSx(true)}>
                            <Typography fontWeight={700} fontSize="0.85rem">
                              Servicio
                            </Typography>
                          </TableCell>
                          <TableCell sx={cellSx(true)}>
                            <Typography fontSize="0.85rem">{paymentData.glosa}</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={cellSx(false)}>
                            <Typography fontWeight={700} fontSize="0.85rem">
                              Total
                            </Typography>
                          </TableCell>
                          <TableCell sx={cellSx(false)}>
                            <Typography fontWeight={700} fontSize="0.85rem">
                              {fmt(Number(paymentData.total))}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={cellSx(true)}>
                            <Typography fontWeight={700} fontSize="0.85rem">
                              Orden
                            </Typography>
                          </TableCell>
                          <TableCell sx={cellSx(true)}>
                            <Typography fontSize="0.85rem">{paymentData.order}</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={cellSx(false)}>
                            <Typography fontWeight={700} fontSize="0.85rem">
                              Tarjeta
                            </Typography>
                          </TableCell>
                          <TableCell sx={cellSx(false)}>
                            <Typography fontSize="0.85rem">
                              **** **** **** {paymentData.card}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={cellSx(true)}>
                            <Typography fontWeight={700} fontSize="0.85rem">
                              Tipo de pago
                            </Typography>
                          </TableCell>
                          <TableCell sx={cellSx(true)}>
                            <Typography fontSize="0.85rem">{paymentData.typePay}</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={cellSx(false)}>
                            <Typography fontWeight={700} fontSize="0.85rem">
                              Email
                            </Typography>
                          </TableCell>
                          <TableCell sx={cellSx(false)}>
                            <Typography fontSize="0.85rem">{paymentData.email}</Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>

                  {/* Info box */}
                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: '#e0f7fa',
                      border: '1px solid #b2ebf2',
                    }}
                  >
                    <Typography fontSize="0.85rem" color="#0898b9" lineHeight={1.6}>
                      Un técnico certificado SEC se contactará contigo para coordinar la
                      visita técnica de instalación.
                    </Typography>
                  </Box>

                  {/* Action buttons */}
                  <Box
                    sx={{
                      mt: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5,
                    }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      component={Link}
                      href="/cotizador2"
                      sx={{
                        py: 1.5,
                        borderRadius: '24px',
                        bgcolor: '#e81a68',
                        '&:hover': { bgcolor: '#c4155a' },
                        fontWeight: 700,
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
                        borderColor: '#0898b9',
                        color: '#0898b9',
                        fontWeight: 600,
                        '&:hover': { borderColor: '#0676a0', color: '#0676a0' },
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
                    py: 4,
                    gap: 3,
                  }}
                >
                  <Typography
                    fontSize="0.95rem"
                    color="#64748B"
                    textAlign="center"
                  >
                    No se encontraron datos de la transacción
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    href="/cotizador2"
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
    </>
  )
}

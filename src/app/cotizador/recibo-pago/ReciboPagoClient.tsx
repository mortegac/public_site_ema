'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Chip, Container, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import Footer from '@/app/components/shared/footer'
import type { CalendarSlot } from '@/app/api/schedules/route'
import { track } from '@/lib/tracker'

interface PaymentData {
  // Payment confirmation fields (from /return after Webpay)
  customerId?: string
  email?: string
  total?: number | string
  glosa?: string
  shoppingCartId?: string
  order?: string
  card?: string
  typePay?: string
  typeOfCart?: string
  // Wizard context fields (from CotizadorWizard before Webpay redirect)
  tipo?: string
  chargerName?: string
  dist?: number | null
  address?: string
  depto?: string
  neto?: number
  iva?: number
  chargerPrice?: number
  mat?: number
  inst?: number
  sec?: number
  isOwn?: boolean
  formId?: string
}

interface DateSlot {
  dateKey: string       // YYYY-MM-DD — used for grouping
  label: string         // e.g. "Jue, 21 may" — weekday short + day + month short, locale es-CL
  available: boolean    // true if at least one slot exists for this day
  slots: CalendarSlot[] // raw slots for this day (for future use)
}

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CL')

// Stepper — 3 labels, current step index
function Stepper({ step, labels }: { step: number; labels: string[] }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', mb: 4 }}>
      {labels.map((label, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, minWidth: 56 }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 700,
              bgcolor: i < step ? '#0898b9' : i === step ? '#e81a68' : '#E2E8F0',
              color: i <= step ? '#fff' : '#64748B',
            }}>
              {i < step ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : i + 1}
            </Box>
            <Typography sx={{ fontSize: '0.65rem', fontWeight: i === step ? 600 : 400, color: i === step ? '#e81a68' : '#64748B', textAlign: 'center', lineHeight: 1.2 }}>
              {label}
            </Typography>
          </Box>
          {i < labels.length - 1 && (
            <Box sx={{ flex: 1, height: 2, borderRadius: 1, bgcolor: i < step ? '#0898b9' : '#E2E8F0', mt: -2.5 }} />
          )}
        </Box>
      ))}
    </Box>
  )
}

export default function ReciboPagoClient() {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [dates, setDates] = useState<DateSlot[]>([])
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [booked, setBooked] = useState(false)
  const [loadingDates, setLoadingDates] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const hasRead = useRef(false)

  useEffect(() => {
    if (hasRead.current) return
    hasRead.current = true

    // Validate paymentData exists — redirect if missing (direct navigation without payment)
    const raw = sessionStorage.getItem('paymentData')
    if (!raw) { router.replace('/cotizador'); return }

    // Read data but keep it in sessionStorage so refresh works.
    // It is deleted only after booking is confirmed (see setBooked calls below).
    try {
      const parsed = JSON.parse(raw)
      console.log('[recibo-pago] paymentData from sessionStorage:', JSON.stringify(parsed))
      console.log('[recibo-pago] email:', parsed?.email, '| customerId:', parsed?.customerId, '| shoppingCartId:', parsed?.shoppingCartId)
      setPaymentData(parsed)
      track('payment_confirmed', { total: parsed?.total != null ? Number(parsed.total) : undefined })
      // Update ClientForm step to PAID_PENDING_SCHEDULE on page load
      if (parsed?.formId) {
        fetch('/api/update-step', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formId: parsed.formId, step: '4' }),
        })
          .then(r => r.ok ? null : r.json().then(e => console.error('[recibo-pago] update-step error:', e)))
          .catch(err => console.error('[recibo-pago] update-step fetch error:', err))
      } else {
        console.warn('[recibo-pago] no formId in paymentData — skipping currentStep update')
      }
    } catch { /* ignore */ }

    // Fetch real calendar slots from API
    const fetchDates = async () => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      try {
        const startDate = new Date()
        startDate.setDate(startDate.getDate() + 2)
        startDate.setHours(0, 0, 0, 0)

        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 16)
        endDate.setHours(23, 59, 59, 999)

        const res = await fetch(
          `/api/schedules?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
          { signal: controller.signal }
        )
        const { items } = await res.json()

        // Group slots by day
        const slotsByDay = new Map<string, CalendarSlot[]>()
        for (const slot of (items ?? []) as CalendarSlot[]) {
          const key = slot.startDate.slice(0, 10) // YYYY-MM-DD
          if (!slotsByDay.has(key)) slotsByDay.set(key, [])
          slotsByDay.get(key)!.push(slot)
        }

        // Generate all days in range (skip Sundays)
        const allDates: DateSlot[] = []
        const cursor = new Date(startDate)
        while (cursor <= endDate) {
          if (cursor.getDay() !== 0) { // skip Sundays
            const key = cursor.toISOString().slice(0, 10)
            allDates.push({
              dateKey: key,
              label: cursor.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' }),
              available: (slotsByDay.get(key)?.length ?? 0) > 0,
              slots: slotsByDay.get(key) ?? [],
            })
          }
          cursor.setDate(cursor.getDate() + 1)
        }

        setDates(allDates)
      } catch {
        setDates([])
      } finally {
        clearTimeout(timeoutId)
        setLoadingDates(false)
      }
    }

    fetchDates()
  }, [])

  const step = booked ? 2 : 1

  return (
    <>
      <HpHeaderNew />
      <Box id="VISITA-PRESENCIAL-PAGADO" component="main">
        {/* ── Hero ── */}
        <Box sx={{ background: 'linear-gradient(180deg, #4dbfd9 10%, #0898b9 80%)', py: 0, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography variant="h1" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 800, color: '#000', mb: 1 }}>
              {booked ? '¡Todo listo!' : '¡Pago exitoso!'}
            </Typography>
            <Typography sx={{ color: '#000', fontSize: '0.9rem' }}>
              {booked ? 'Visita agendada' : 'Elige una fecha para tu visita técnica'}
            </Typography>
          </Container>
        </Box>

        {/* ── Content ── */}
        <Box sx={{ bgcolor: '#F8FAFC', minHeight: '60vh', py: { xs: 3, md: 5 } }}>
          <Container maxWidth="sm">
            <Paper elevation={0} sx={{ borderRadius: 3, boxShadow: '0 2px 24px rgba(0,0,0,0.08)', p: { xs: 3, md: 4 } }}>
              <Stepper step={step} labels={['Pago', 'Agendar visita', 'Confirmación']} />

              {!booked ? (
                /* ── STEP 1: Date picker ── */
                <>
                  {/* Payment confirmed banner */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, borderRadius: 2, bgcolor: '#ECFDF5', mb: 2 }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L6.5 11.5L13 4.5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <Typography fontSize="0.8rem" fontWeight={600} color="#166534">
                      Pago confirmado{paymentData?.email ? ` · Comprobante enviado a ${paymentData.email}` : ''}
                    </Typography>
                  </Box>

                  {/* What's next info card */}
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#EBF7F9', border: '1px solid rgba(8,152,185,0.2)', mb: 3 }}>
                    <Typography fontSize="0.85rem" fontWeight={700} color="#2A3547" mb={0.5}>¿Qué sigue?</Typography>
                    <Typography fontSize="0.8rem" color="#64748B" lineHeight={1.6}>
                      Un técnico visitará tu domicilio para validar las condiciones de instalación (distancia exacta y tipo de canalización). Sin costo adicional — es parte del proceso.
                    </Typography>
                  </Box>

                  {/* Date picker */}
                  <Typography fontSize="0.85rem" fontWeight={700} color="#2A3547" mb={0.25}>Elige una fecha</Typography>
                  <Typography fontSize="0.75rem" color="#64748B" mb={1.5}>Horario se confirma posterior a reservar horario hábil entre 09:00 a 18:00 hrs</Typography>

                  {loadingDates ? (
                    <Typography fontSize="0.85rem" color="#64748B" sx={{ mb: 3, textAlign: 'center', py: 2 }}>
                      Cargando fechas disponibles...
                    </Typography>
                  ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 3 }}>
                    {dates.map((d, i) => (
                      <Box key={i} onClick={d.available ? () => setSelectedDate(i) : undefined} sx={{
                        p: '10px 14px', borderRadius: 2,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        border: `1.5px solid ${selectedDate === i ? '#e81a68' : d.available ? '#E2E8F0' : 'transparent'}`,
                        bgcolor: selectedDate === i ? '#FEF0F4' : d.available ? '#fff' : '#F8FAFC',
                        cursor: d.available ? 'pointer' : 'default',
                        opacity: d.available ? 1 : 0.45,
                        transition: 'all 0.15s',
                      }}>
                        <Typography fontSize="0.85rem" fontWeight={500} color="#2A3547" sx={{ textTransform: 'capitalize' }}>
                          {d.label}
                        </Typography>
                        {d.available ? (
                          <Chip label={selectedDate === i ? 'Seleccionado' : 'Disponible'} size="small" sx={{
                            fontSize: '0.65rem', fontWeight: 600, height: 20,
                            bgcolor: selectedDate === i ? '#FEF0F4' : '#EBF7F9',
                            color: selectedDate === i ? '#e81a68' : '#0898b9',
                          }} />
                        ) : (
                          <Typography fontSize="0.7rem" color="#64748B">No disponible</Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                  )}

                  <Button variant="contained" fullWidth disabled={selectedDate === null || loadingDates || bookingLoading} onClick={async () => {
                    if (selectedDate === null) return
                    const slot = dates[selectedDate]
                    const calendarId = slot.slots?.[0]?.calendarId
                    if (!calendarId) {
                      setBookingError('No hay horario disponible para esta fecha. Selecciona otra.')
                      return
                    }

                    setBookingLoading(true)
                    setBookingError('')
                    try {
                      const bookingPayload = {
                        calendarId,
                        customerId: paymentData?.customerId ?? paymentData?.email ?? '',
                        address: paymentData?.address ?? '',
                        chargerName: paymentData?.chargerName ?? 'Instalación cargador EV',
                        formId: paymentData?.formId ?? '',
                        shoppingCartId: paymentData?.shoppingCartId ?? '',
                      }
                      console.log('[recibo-pago] ConfirmChargerVisit payload:', JSON.stringify(bookingPayload))
                      const res = await fetch('/api/confirm-charger-visit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bookingPayload),
                      })
                      const data = await res.json()
                      console.log('[recibo-pago] Booking response status:', res.status, '| data:', JSON.stringify(data))
                      if (data.error) {
                        setBookingError(data.error)
                      } else {
                        sessionStorage.removeItem('paymentData')
                        // Update ClientForm step to SCHEDULED
                        if (paymentData?.formId) {
                          fetch('/api/update-step', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ formId: paymentData.formId, step: '5' }),
                          }).catch(() => null)
                        }
                        setBooked(true)
                      }
                    } catch {
                      setBookingError('No se pudo agendar la visita. Intenta nuevamente.')
                    } finally {
                      setBookingLoading(false)
                    }
                  }} sx={{
                    py: 1.5, borderRadius: '24px', fontWeight: 700, fontSize: '0.95rem',
                    bgcolor: '#e81a68', '&:hover': { bgcolor: '#c01556' },
                    '&.Mui-disabled': { bgcolor: '#E2E8F0', color: '#94A3B8' },
                  }}>
                    {bookingLoading ? 'Agendando...' : selectedDate !== null ? `Confirmar visita · ${dates[selectedDate]?.label}` : 'Confirmar visita'}
                  </Button>
                  {bookingError && <Typography fontSize="0.78rem" color="error" textAlign="center" mt={1}>{bookingError}</Typography>}
                </>
              ) : (
                /* ── STEP 2: Confirmation ── */
                <>
                  {/* Success icon */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12L9.5 17.5L20 6.5" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Box>
                  </Box>

                  <Typography variant="h5" fontWeight={700} textAlign="center" mb={0.5}>¡Visita agendada!</Typography>
                  <Typography fontSize="0.85rem" color="#64748B" textAlign="center" mb={3} lineHeight={1.6}>
                    Fecha: <strong style={{ color: '#2A3547' }}>{dates[selectedDate!]?.label}</strong>
                    {paymentData?.email && <><br/>Confirmación enviada a <strong style={{ color: '#2A3547' }}>{paymentData.email}</strong></>}
                  </Typography>

                  {/* Summary card */}
                  <Box sx={{ borderRadius: 2, border: '1px solid #E2E8F0', p: 2, mb: 2 }}>
                    <Typography fontSize="0.8rem" fontWeight={700} color="#2A3547" mb={1.5}>Resumen</Typography>
                    {([
                      ['Tipo', paymentData?.tipo ? (paymentData.tipo.charAt(0).toUpperCase() + paymentData.tipo.slice(1)) : '—'],
                      ['Cargador', paymentData?.chargerName ?? (paymentData?.glosa ?? '—')],
                      ['Distancia est.', paymentData?.dist != null ? `${paymentData.dist}m` : '—'],
                      ['Dirección', paymentData?.address ?? '—'],
                      ['Referencia', paymentData?.depto || '—'],
                      ['Total pagado', paymentData?.total ? fmt(Number(paymentData.total)) : '—'],
                    ] as [string, string][]).map(([label, value], i) => (
                      <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                        <Typography fontSize="0.78rem" color="#64748B">{label}</Typography>
                        <Typography fontSize="0.78rem" fontWeight={600} color="#2A3547" textAlign="right" sx={{ maxWidth: '55%' }}>{value}</Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Next steps */}
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#EBF7F9', border: '1px solid rgba(8,152,185,0.2)', mb: 3 }}>
                    <Typography fontSize="0.8rem" fontWeight={700} color="#2A3547" mb={1}>Próximos pasos</Typography>
                    {[
                      'Un técnico visita tu domicilio en la fecha agendada.',
                      'Se revisarán las características técnicas de la instalación.',
                      'Se coordina la compra de materiales y la instalación.',
                    ].map((s, i) => (
                      <Typography key={i} fontSize="0.78rem" color="#64748B" lineHeight={1.8}>
                        <strong style={{ color: '#0898b9' }}>{i + 1}.</strong> {s}
                      </Typography>
                    ))}
                  </Box>

                  {/* WhatsApp button — full width */}
                  <Button fullWidth variant="contained" onClick={() => {
                    const text = `Hola, agendé mi instalación:\n- Servicio: ${paymentData?.glosa}\n- Total: ${paymentData ? fmt(Number(paymentData.total)) : ''}\n- Visita: ${dates[selectedDate!]?.label}`
                    window.open(`https://api.whatsapp.com/send?phone=56967666652&text=${encodeURIComponent(text)}`, '_blank')
                  }} sx={{ py: 1.25, borderRadius: 2, bgcolor: '#25D366', '&:hover': { bgcolor: '#1da851' }, fontSize: '0.8rem', fontWeight: 600, gap: 0.75, mb: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 1C5 1 1 5 1 10C1 11.8 1.5 13.4 2.4 14.8L1 19L5.4 17.7C6.8 18.5 8.3 19 10 19C15 19 19 15 19 10C19 5 15 1 10 1Z" fill="white"/><path d="M7 12.5C9 14.5 12 14 13.5 12.5L12.5 11.5C12 12 11 12.5 9.5 11C8 9.5 8.5 8.5 9 8L7.5 7C6 8.5 5 11 7 12.5Z" fill="#25D366"/></svg>
                    Contáctanos por WhatsApp
                  </Button>

                  <Button variant="contained" fullWidth component={Link} href="/cotizador" sx={{
                    py: 1.5, borderRadius: '24px', fontWeight: 700,
                    bgcolor: '#e81a68', '&:hover': { bgcolor: '#c01556' },
                  }}>
                    Cotizar una nueva instalación
                  </Button>

                  <Typography fontSize="0.75rem" color="#64748B" textAlign="center" mt={1.5}>
                    ¿Dudas? <Box component="span" sx={{ color: '#e81a68', fontWeight: 600 }}>contacto@energica.city</Box>
                  </Typography>
                </>
              )}

            </Paper>
          </Container>
        </Box>
      </Box>
      {/* <Footer /> */}
    </>
  )
}

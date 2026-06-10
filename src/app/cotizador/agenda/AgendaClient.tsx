'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Chip, Container, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import type { CalendarSlot } from '@/app/api/schedules/route'
import type { ActiveVisit } from '@/app/api/active-visit/route'

interface PaymentData {
  customerId?: string
  email?: string
  total?: number | string
  glosa?: string
  shoppingCartId?: string
  order?: string
  card?: string
  typePay?: string
  typeOfCart?: string
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
  dateKey: string
  label: string
  available: boolean
  slots: CalendarSlot[]
}

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CL')

interface JwtPayload {
  sub?: string
  formid?: string
  email?: string
  name?: string
  phone?: string
}

function decodeJwtPayload(token: string): JwtPayload | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    return JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}

function updateFormStep(formId: string | null | undefined, step: string) {
  if (!formId) return
  fetch('/api/update-step', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formId, step }),
  }).catch(() => null)
}

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

// ─── State label helpers ──────────────────────────────────────────────────────
function visitStateLabel(state: string): { label: string; color: string; bg: string } {
  switch (state) {
    case 'payed':
    case 'payedAndAgended':
      return { label: 'Confirmada y pagada', color: '#166534', bg: '#ECFDF5' }
    case 'reserved':
      return { label: 'Reservada — pendiente de pago', color: '#92400E', bg: '#FEF3C7' }
    case 'waiting':
      return { label: 'Procesando pago', color: '#1e40af', bg: '#EFF6FF' }
    default:
      return { label: state, color: '#374151', bg: '#F3F4F6' }
  }
}

function formatVisitDateFull(iso: string): string {
  const d = new Date(iso)
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  const weekday = d.toLocaleDateString('es-CL', { weekday: 'long' })
  const day = d.getDate()
  const month = d.toLocaleDateString('es-CL', { month: 'long' })
  const year = d.getFullYear()
  const hour = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
  return `${cap(weekday)}, ${day} de ${cap(month)} ${year} · ${hour}`
}

// ─── Active visit card ────────────────────────────────────────────────────────
function ActiveVisitCard({ visit, email }: { visit: ActiveVisit; email: string }) {
  const stateInfo = visitStateLabel(visit.state)
  return (
    <Box>
      {/* Success icon */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
        <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12L9.5 17.5L20 6.5" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Box>
      </Box>

      <Typography variant="h5" fontWeight={700} textAlign="center" mb={0.5}>
        Ya tienes una visita agendada
      </Typography>
      <Typography fontSize="0.85rem" color="#64748B" textAlign="center" mb={3} lineHeight={1.6}>
        Encontramos una reserva activa para tu instalación.
      </Typography>

      {/* State chip */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Box sx={{ px: 2, py: 0.75, borderRadius: 2, bgcolor: stateInfo.bg }}>
          <Typography fontSize="0.82rem" fontWeight={700} color={stateInfo.color}>
            {stateInfo.label}
          </Typography>
        </Box>
      </Box>

      {/* Visit details */}
      <Box sx={{ borderRadius: 2, border: '1px solid #E2E8F0', p: 2.5, mb: 3 }}>
        <Typography fontSize="0.8rem" fontWeight={700} color="#2A3547" mb={1.5}>
          Detalles de tu visita
        </Typography>
        {([
          ['Fecha y hora', formatVisitDateFull(visit.startDate)],
          ...(visit.location ? [['Dirección', visit.location]] : []),
          ...(visit.summary ? [['Servicio', visit.summary]] : []),
          ...(email ? [['Email', email]] : []),
        ] as [string, string][]).map(([label, value]) => (
          <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderTop: '1px solid #F1F5F9', '&:first-of-type': { borderTop: 'none' } }}>
            <Typography fontSize="0.78rem" color="#64748B" flexShrink={0} mr={2}>{label}</Typography>
            <Typography fontSize="0.78rem" fontWeight={600} color="#2A3547" textAlign="right">{value}</Typography>
          </Box>
        ))}
      </Box>

      {/* Info box */}
      <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#EBF7F9', border: '1px solid rgba(8,152,185,0.2)', mb: 3 }}>
        <Typography fontSize="0.8rem" fontWeight={700} color="#2A3547" mb={0.75}>¿Qué sigue?</Typography>
        {[
          'Un técnico certificado visitará tu domicilio en la fecha agendada.',
          'Se revisarán las condiciones de instalación (distancia, canalización).',
          'Se coordina la compra de materiales y la fecha de instalación.',
        ].map((s, i) => (
          <Typography key={i} fontSize="0.78rem" color="#64748B" lineHeight={1.8}>
            <strong style={{ color: '#0898b9' }}>{i + 1}.</strong> {s}
          </Typography>
        ))}
      </Box>

      {/* Contact */}
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          const text = `Hola, tengo una visita técnica agendada (${formatVisitDateFull(visit.startDate)}) y tengo una consulta.`
          window.open(`https://api.whatsapp.com/send?phone=56967666652&text=${encodeURIComponent(text)}`, '_blank')
        }}
        sx={{ py: 1.25, borderRadius: 2, bgcolor: '#25D366', '&:hover': { bgcolor: '#1da851' }, fontSize: '0.85rem', fontWeight: 600, gap: 0.75, mb: 2 }}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M10 1C5 1 1 5 1 10C1 11.8 1.5 13.4 2.4 14.8L1 19L5.4 17.7C6.8 18.5 8.3 19 10 19C15 19 19 15 19 10C19 5 15 1 10 1Z" fill="white"/>
          <path d="M7 12.5C9 14.5 12 14 13.5 12.5L12.5 11.5C12 12 11 12.5 9.5 11C8 9.5 8.5 8.5 9 8L7.5 7C6 8.5 5 11 7 12.5Z" fill="#25D366"/>
        </svg>
        Contáctanos por WhatsApp
      </Button>

      <Typography fontSize="0.75rem" color="#64748B" textAlign="center">
        ¿Necesitas reagendar? <Box component="span" sx={{ color: '#e81a68', fontWeight: 600 }}>contacto@energica.city</Box>
      </Typography>
    </Box>
  )
}

function AgendaContent() {
  const searchParams = useSearchParams()
  const token = [...searchParams.keys()][0] ?? ''
  const jwtPayload = decodeJwtPayload(token)

  const emailFromJwt = jwtPayload?.email ?? jwtPayload?.sub ?? ''
  const [paymentData, setPaymentData] = useState<PaymentData>(() => {
    if (emailFromJwt) return { email: emailFromJwt, customerId: emailFromJwt }
    try {
      const stored = typeof window !== 'undefined' ? sessionStorage.getItem('paymentData') : null
      if (stored) {
        const d = JSON.parse(stored)
        return {
          email: d.email ?? '',
          customerId: d.email ?? '',
          address: d.address ?? '',
          chargerName: d.chargerName ?? '',
          formId: d.formId ?? '',
          tipo: d.tipo ?? '',
          dist: d.dist ?? undefined,
          depto: d.depto ?? '',
          total: d.total ?? undefined,
          neto: d.neto ?? undefined,
          iva: d.iva ?? undefined,
        }
      }
    } catch {}
    return { email: '', customerId: '' }
  })

  const [dates, setDates] = useState<DateSlot[]>([])
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [booked, setBooked] = useState(false)
  const [loadingDates, setLoadingDates] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [activeVisit, setActiveVisit] = useState<ActiveVisit | null>(null)
  const [checkingVisit, setCheckingVisit] = useState(true)
  const hasRead = useRef(false)

  useEffect(() => {
    if (hasRead.current) return
    hasRead.current = true

    const customerId = emailFromJwt

    const run = async () => {
      // Mark form as PAID_PENDING_SCHEDULE when customer visits /cotizador/agenda
      const formIdForStep = jwtPayload?.formid
      if (formIdForStep) {
        fetch('/api/update-step', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formId: formIdForStep, step: '4' }),
        })
          .then(r => r.ok ? null : r.json().then(e => console.error('[agenda] update-step error:', e)))
          .catch(err => console.error('[agenda] update-step fetch error:', err))
      } else {
        console.warn('[agenda] no formid in JWT — skipping currentStep update')
      }

      // 1. Check if customer already has an active booking
      const formId = jwtPayload?.formid ?? paymentData.formId ?? ''

      // Fetch quote data from DB to populate summary card (non-blocking)
      if (formId) {
        fetch(`/api/quote?formId=${encodeURIComponent(formId)}`)
          .then(r => r.ok ? r.json() : null)
          .then(q => {
            if (!q) return
            setPaymentData(prev => ({
              ...prev,
              tipo: q.tipo ?? prev.tipo,
              chargerName: q.chargerName ?? prev.chargerName,
              dist: q.dist ?? prev.dist,
              address: q.address ?? prev.address,
              total: q.total ?? prev.total,
              neto: q.neto ?? prev.neto,
              iva: q.iva ?? prev.iva,
              chargerPrice: q.chargerPrice ?? prev.chargerPrice,
              mat: q.mat ?? prev.mat,
              inst: q.inst ?? prev.inst,
              sec: q.sec ?? prev.sec,
              isOwn: q.isOwn ?? prev.isOwn,
            }))
          })
          .catch(() => null)
      }

      if (formId || customerId) {
        try {
          const params = new URLSearchParams()
          if (formId) params.set('formId', formId)
          if (customerId) params.set('customerId', customerId)
          const res = await fetch(`/api/active-visit?${params.toString()}`)
          if (res.ok) {
            const { visit } = await res.json() as { visit: ActiveVisit | null }
            if (visit) {
              setActiveVisit(visit)
              setCheckingVisit(false)
              setLoadingDates(false)
              return // Skip fetching available dates — booking already exists
            }
          }
        } catch { /* ignore, proceed to date picker */ }
      }
      setCheckingVisit(false)

      // 2. No active booking — fetch available dates
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
          const key = slot.startDate.slice(0, 10)
          if (!slotsByDay.has(key)) slotsByDay.set(key, [])
          slotsByDay.get(key)!.push(slot)
        }

        // Generate all days in range (skip Sundays)
        const allDates: DateSlot[] = []
        const cursor = new Date(startDate)
        while (cursor <= endDate) {
          if (cursor.getDay() !== 0) {
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

    run()
  }, [])

  const step = booked ? 2 : 1

  return (
    <>
      <HpHeaderNew />
      <Box id="AGENDA-VISITA-TECNICA" component="main">
        {/* ── Hero ── */}
        <Box sx={{ background: 'linear-gradient(180deg, #4dbfd9 10%, #0898b9 80%)', py: 0, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography variant="h1" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 800, color: '#000', mb: 1 }}>
              {booked ? '¡Todo listo!' : 'Agenda tu visita técnica'}
            </Typography>
            <Typography sx={{ color: '#000', fontSize: '0.9rem' }}>
              {booked ? 'Visita agendada' : 'Elige una fecha para tu visita'}
            </Typography>
          </Container>
        </Box>

        {/* ── Content ── */}
        <Box sx={{ bgcolor: '#F8FAFC', minHeight: '60vh', py: { xs: 3, md: 5 } }}>
          <Container maxWidth="sm">
            <Paper elevation={0} sx={{ borderRadius: 3, boxShadow: '0 2px 24px rgba(0,0,0,0.08)', p: { xs: 3, md: 4 } }}>

              {/* ── Checking state ── */}
              {checkingVisit ? (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography fontSize="0.9rem" color="#64748B">Verificando tu reserva…</Typography>
                </Box>
              ) : activeVisit ? (
                /* ── Active booking found ── */
                <ActiveVisitCard visit={activeVisit} email={paymentData.email ?? ''} />
              ) : (
              <>
              <Stepper step={step} labels={['Información', 'Agendar visita', 'Confirmación']} />

              {!booked ? (
                /* ── STEP 1: Date picker ── */
                <>
                  {/* Customer identity + info banner */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 1.5, borderRadius: 2, bgcolor: '#EBF7F9', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      {(jwtPayload?.name || paymentData.email) && (
                        <Typography fontSize="0.8rem" fontWeight={700} color="#0777a0" mb={0.25}>
                          {jwtPayload?.name && <>{jwtPayload.name}</>}
                          {jwtPayload?.name && paymentData.email && ' · '}
                          {paymentData.email && <Box component="span" sx={{ fontWeight: 400 }}>{paymentData.email}</Box>}
                        </Typography>
                      )}
                      <Typography fontSize="0.8rem" fontWeight={600} color="#0777a0">
                        Elige una fecha para tu visita técnica
                      </Typography>
                    </Box>
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
                      const sessionFormId = (() => { try { return JSON.parse(sessionStorage.getItem('paymentData') ?? '{}')?.formId ?? '' } catch { return '' } })()
                      const bookingPayload = {
                        calendarId,
                        customerId: paymentData?.customerId ?? paymentData?.email ?? '',
                        address: paymentData?.address ?? '',
                        chargerName: paymentData?.chargerName ?? 'Instalación cargador EV',
                        formId: jwtPayload?.formid ?? sessionFormId,
                      }
                      const res = await fetch('/api/confirm-charger-visit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bookingPayload),
                      })
                      const data = await res.json()
                      if (data.error) {
                        setBookingError(data.error)
                      } else {
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
                    const text = `Hola, agendé mi visita técnica:\n- Visita: ${dates[selectedDate!]?.label}`
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
              </>
              )}

            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default function AgendaClient() {
  return (
    <Suspense fallback={null}>
      <AgendaContent />
    </Suspense>
  )
}

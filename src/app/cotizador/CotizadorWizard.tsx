'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Slider,
  TextField,
  Divider,
  Chip,
  Alert,
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material'
import { IconMail } from "@tabler/icons-react"
import AddressInput2 from '@/app/components/AddressInput2'
import Footer from '@/app/components/shared/footer'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import { sendEmail } from '@/store/Estimate/services'
import emailjs, { init as initEmailjs } from 'emailjs-com'

// ─── Color tokens ────────────────────────────────────────────────────────────
const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const TEAL = '#0898b9'
const TEAL_LIGHT = '#4dbfd9'
const SURFACE = '#F8FAFC'
const TEXT_MUTED = '#64748B'
const BORDER = '#E2E8F0'
const SUCCESS = '#00C47C'

// ─── Constants ───────────────────────────────────────────────────────────────
const GMAPS_KEY = 'AIzaSyBdAjJeBoZ8ehrL0byX2ZBHHtQSI6pfIvQ'

// ─── Data ────────────────────────────────────────────────────────────────────
const CHARGERS = [
  { id: 'workersbee', name: 'Workersbee 2.2–7 kW', tipo: 'portable', kw: '2.2–7', desc: 'Portable · Potencia regulable · Cable de carga', precio: 299000, stock: 2 },
  { id: 'livoltek', name: 'LIVOLTEK Smart EV 7.3 kW', tipo: 'wallbox', kw: '7.3', desc: 'Wallbox · Disponibilidad inmediata', precio: 599000, stock: 3 },
  { id: 'effitec', name: 'EFFITEC 7 kW', tipo: 'wallbox', kw: '7', desc: 'Cable tipo 2 · Garantía 2 años', precio: 595000, stock: 5 },
  { id: 'kpn-app', name: 'KPN Wallbox KBox App', tipo: 'wallbox', kw: '7.3', desc: 'Wallbox · App de usuario', precio: 606900, stock: 5 },
  { id: 'beste-s', name: 'BESTE TS-EVC07 7.3 kW', tipo: 'wallbox', kw: '7.3', desc: 'Cable tipo 2 · Disponibilidad inmediata', precio: 773500, stock: 5 },
  { id: 'beste-mini', name: 'BESTE Smart Mini 7.3 kW', tipo: 'wallbox', kw: '7.3', desc: 'Diseño compacto · Disponibilidad inmediata', precio: 773500, stock: 5 },
  { id: 'kpn-ocpp', name: 'KPN Wallbox KBox OCPP 1.6', tipo: 'wallbox', kw: '7.3', desc: 'Wallbox · Protocolo OCPP 1.6', precio: 779450, stock: 5 },
]

const INSTALL_BASE = {
  casa:     { mat: 156000, inst: 182000, sec: 25000 },
  edificio: { mat: 215000, inst: 258000, sec: 35000 },
}

const TIPO_FACTOR = { casa: 1.1, edificio: 1.15 }

// ─── Helpers ─────────────────────────────────────────────────────────────────
function dFactor(d: number): number {
  if (d <= 5) return 0.85
  if (d <= 10) return 1.0
  if (d <= 20) return 1.18
  if (d <= 40) return 1.35
  return 1.55
}

function fmt(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-CL')
}

const RM_KEYWORDS = [
  'región metropolitana', 'region metropolitana', 'metropolitana',
  'santiago', 'las condes', 'providencia', 'ñuñoa', 'vitacura',
  'la florida', 'maipú', 'puente alto', 'la reina', 'peñalolén', 'macul',
  'san miguel', 'huechuraba', 'colina', 'lo barnechea', 'independencia',
  'san bernardo', 'pudahuel', 'cerrillos', 'cerro navia', 'conchalí',
  'el bosque', 'estación central', 'la cisterna', 'la granja', 'la pintana',
  'lo espejo', 'lo prado', 'quinta normal', 'recoleta', 'renca',
  'san joaquín', 'san ramón', 'quilicura', 'padre hurtado', 'peñaflor',
  'melipilla', 'talagante', 'buin', 'calera de tango', 'paine',
]

function isRegionMetropolitana(addr: string): boolean {
  if (!addr || addr.trim().length < 4) return true // sin dirección → no bloquear
  return RM_KEYWORDS.some(k => addr.toLowerCase().includes(k))
}

function genDates(): Array<{ label: string; available: boolean }> {
  const out: Array<{ label: string; available: boolean }> = []
  const now = new Date()
  for (let i = 2; i < 16; i++) {
    const d = new Date(now)
    d.setDate(d.getDate() + i)
    if (d.getDay() === 0) continue
    out.push({
      label: d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' }),
      available: d.getDay() !== 6 && Math.random() > 0.25,
    })
  }
  return out
}

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface WizardState {
  step: number
  tipo: 'casa' | 'edificio' | null
  address: string
  addressValidated: boolean
  addressCity: string
  addressState: string
  addressZipCode: string
  addressLat: string
  addressLng: string
  editingAddr: boolean
  regionWarn: boolean
  tipoC: 'portable' | 'wallbox' | null
  chargerId: string | null
  dist: number
  activePanel: 'pago' | 'email' | null
  depto: string
  emailPago: string
  nombreEmail: string
  emailSolo: string
  emailSent: boolean
  emailSending: boolean
  emailError: string
  paid: boolean
  selectedDate: number | null
  booked: boolean
  estimateLoading: boolean
  apiResult: {
    mat: number
    inst: number
    sec: number
    chargerPrice: number
    chargerName: string
    neto: number
    iva: number
    total: number
    isOwn: boolean
  } | null
  formId: string | null
  nextVisitDate: string | null
  webpayLoading: boolean
  webpayError: string
  webpayData: { order: string; token: string; url: string; buy_order: string } | null
  customerSaving: boolean
  customerSaved: boolean
}

interface CalcResult {
  mat: number
  inst: number
  sec: number
  chargerPrice: number
  chargerName: string
  neto: number
  iva: number
  total: number
  isOwn: boolean
}

// ─── Price calc ───────────────────────────────────────────────────────────────
function calcResult(state: WizardState): CalcResult | null {
  if (!state.tipo || !state.tipoC) return null
  const base = INSTALL_BASE[state.tipo]
  const f = dFactor(state.dist) * TIPO_FACTOR[state.tipo]
  const mat = Math.round(base.mat * f)
  const inst = Math.round(base.inst * f)
  const sec = base.sec
  const charger = state.chargerId === 'own' ? null : CHARGERS.find(c => c.id === state.chargerId)
  const chargerPrice = charger ? Math.round(charger.precio / 1.19) : 0
  const chargerName = state.chargerId === 'own' ? 'Ya tiene cargador' : (charger?.name ?? '')
  const neto = mat + inst + sec + chargerPrice
  const iva = Math.round(neto * 0.19)
  return { mat, inst, sec, chargerPrice, chargerName, neto, iva, total: neto + iva, isOwn: state.chargerId === 'own' }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
interface StepperProps {
  step: number
  paid: boolean
  booked: boolean
}

function WizardStepper({ step, paid, booked }: StepperProps) {
  const preLabels = ['Ubicación', 'Cargador', 'Cotización']
  const postLabels = ['Pago', 'Agendar', '¡Listo!']

  const labels = paid ? postLabels : preLabels
  const activeIdx = paid ? (booked ? 2 : step - 3) : step

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, mt: 1 }}>
      {labels.map((label, idx) => {
        const isCompleted = idx < activeIdx
        const isActive = idx === activeIdx
        return (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
            {idx > 0 && (
              <Box sx={{
                width: { xs: 24, sm: 40 },
                height: 2,
                bgcolor: isCompleted ? TEAL : 'rgba(0,0,0,0.2)',
                transition: 'background-color 0.3s',
              }} />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isCompleted ? TEAL : isActive ? PINK : 'transparent',
                border: isCompleted || isActive ? 'none' : '2px solid rgba(0,0,0,0.3)',
                transition: 'all 0.3s',
              }}>
                {isCompleted ? (
                  <Typography sx={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>✓</Typography>
                ) : (
                  <Typography sx={{ color: isActive ? '#fff' : 'rgba(0,0,0,0.5)', fontSize: '0.8rem', fontWeight: 700 }}>
                    {idx + 1}
                  </Typography>
                )}
              </Box>
              <Typography sx={{ fontSize: '0.65rem', fontWeight: isActive ? 700 : 400, color: isActive ? '#000' : 'rgba(0,0,0,0.55)', whiteSpace: 'nowrap' }}>
                {label}
              </Typography>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

interface SelectionCardProps {
  selected: boolean
  onClick: () => void
  icon: string
  title: string
  subtitle: string
}

function SelectionCard({ selected, onClick, icon, title, subtitle }: SelectionCardProps) {
  return (
    <Box
      onClick={onClick}
      data-testid={`card-${title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-')}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      sx={{
        border: `2px solid ${selected ? PINK : BORDER}`,
        borderRadius: 2,
        p: 2.5,
        cursor: 'pointer',
        bgcolor: selected ? 'rgba(232,26,104,0.04)' : '#fff',
        transition: 'all 0.2s',
        '&:hover': { borderColor: PINK, bgcolor: 'rgba(232,26,104,0.04)' },
        textAlign: 'center',
      }}
    >
      <Typography sx={{ fontSize: '2rem', mb: 1 }}>{icon}</Typography>
      <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: selected ? PINK : '#2A3547' }}>{title}</Typography>
      <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mt: 0.5 }}>{subtitle}</Typography>
    </Box>
  )
}

interface ChargerListItemProps {
  charger: typeof CHARGERS[0]
  selected: boolean
  onClick: () => void
}

function ChargerListItem({ charger, selected, onClick }: ChargerListItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        border: `2px solid ${selected ? PINK : BORDER}`,
        borderRadius: 2,
        p: 2,
        cursor: 'pointer',
        bgcolor: selected ? 'rgba(232,26,104,0.04)' : '#fff',
        transition: 'all 0.2s',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&:hover': { borderColor: PINK, bgcolor: 'rgba(232,26,104,0.04)' },
        mb: 1,
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: selected ? PINK : '#2A3547' }}>{charger.name}</Typography>
        <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, mt: 0.25 }}>{charger.desc}</Typography>
        <Chip label={`${charger.stock} en stock`} size="small" sx={{ mt: 0.75, height: 20, fontSize: '0.65rem', bgcolor: 'rgba(0,196,124,0.1)', color: SUCCESS }} />
      </Box>
      <Box sx={{ textAlign: 'right', ml: 2, flexShrink: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547' }}>{fmt(charger.precio)}</Typography>
        <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED }}>+IVA</Typography>
      </Box>
    </Box>
  )
}

// ─── Distance factor label ────────────────────────────────────────────────────
function distLabel(d: number): string {
  if (d <= 5) return 'Distancia muy corta (descuento aplicado)'
  if (d <= 10) return 'Distancia estándar'
  if (d <= 20) return 'Distancia moderada'
  if (d <= 40) return 'Distancia larga'
  return 'Distancia muy larga'
}

const SLIDER_MARKS = [
  { value: 5, label: '5m' },
  { value: 10, label: '10m' },
  { value: 15, label: '15m' },
  { value: 20, label: '20m' },
  { value: 30, label: '30m' },
  { value: 40, label: '40m' },
  { value: 60, label: '60m' },
]

// ─── Hero title helpers ───────────────────────────────────────────────────────
const STEP_TITLES = [
  'Cotiza tu instalación',
  'Elige tu cargador eléctrico',
  'Tu cotización al instante',
  'Agenda tu visita técnica',
  '¡Todo listo!',
]

const STEP_SUBTITLES = [
  'Instalación certificada SEC · Precios claros · Sin sorpresas',
  'Selecciona el equipo que mejor se adapta a tus necesidades',
  'Precio real basado en tu perfil',
  'Coordina la visita técnica a tu domicilio',
  'Nuestro equipo coordinará contigo los detalles finales',
]

// ─── Main component ───────────────────────────────────────────────────────────
export default function CotizadorWizard() {
  const [state, setState] = useState<WizardState>({
    step: 0,
    tipo: null,
    address: '',
    addressValidated: false,
    addressCity: '',
    addressState: '',
    addressZipCode: '',
    addressLat: '',
    addressLng: '',
    editingAddr: true,
    regionWarn: false,
    tipoC: null,
    chargerId: null,
    dist: 10,
    activePanel: null,
    depto: '',
    emailPago: '',
    nombreEmail: '',
    emailSolo: '',
    emailSent: false,
    emailSending: false,
    emailError: '',
    paid: false,
    selectedDate: null,
    booked: false,
    estimateLoading: false,
    apiResult: null,
    formId: null,
    nextVisitDate: null,
    webpayLoading: false,
    webpayError: '',
    webpayData: null,
    customerSaving: false,
    customerSaved: false,
  })

  // Initialize dates client-only to avoid SSR/hydration mismatch (Math.random + Date)
  const [dates, setDates] = useState<Array<{ label: string; available: boolean }>>([])
  useEffect(() => { setDates(genDates()) }, [])

  const result = calcResult(state)

  // ─── Derived ─────────────────────────────────────────────────────────────
  const canNext = (() => {
    if (state.step === 0) return state.tipo !== null
    // 'own' is pre-selected by default so just need tipoC chosen
    if (state.step === 1) return state.tipoC !== null
    return true
  })()

  const heroTitle = state.booked
    ? '¡Visita agendada!'
    : state.paid
    ? STEP_TITLES[state.step] ?? '¡Todo confirmado!'
    : STEP_TITLES[state.step] ?? 'Cotiza tu instalación'

  const heroSubtitle = state.booked
    ? 'Te contactaremos para confirmar los detalles'
    : state.paid
    ? STEP_SUBTITLES[state.step] ?? ''
    : STEP_SUBTITLES[state.step] ?? ''

  // ─── Handlers ────────────────────────────────────────────────────────────
  function update(partial: Partial<WizardState>) {
    setState(prev => ({ ...prev, ...partial }))
  }

  async function goNext() {
    if (state.step === 1) {
      update({ estimateLoading: true })
      try {
        const isWallbox = state.tipoC === 'wallbox'
        const isPortable = state.tipoC === 'portable'
        const isHouse = state.tipo === 'casa'
        const charger = state.chargerId !== 'own' ? CHARGERS.find(c => c.id === state.chargerId) : null

        // Call Next.js API route — server-side AppSync call avoids client auth issues
        const res = await fetch('/api/cotizar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isHouse,
            isPortable,
            isWallbox,
            distance: state.dist,
            numberOfChargers: 1,
            ...(state.formId ? { existingFormId: state.formId } : {}),
          }),
        })

        if (res.ok) {
          const data = await res.json()
          const { formId, estimates } = data as { formId: string; estimates: any[] }

          const targetPotence = isWallbox ? 7 : 2.2
          const est = estimates.find((e: any) => Number(e.chargerPotence) === targetPotence) ?? estimates[0]

          if (est) {
            const chargerPrice = charger ? Math.round(charger.precio / 1.19) : 0
            const chargerName = state.chargerId === 'own' ? 'Ya tiene cargador' : (charger?.name ?? '')
            // Force SEC trámite from local base (API may return 0) so it always appears in the breakdown
            const secTramite = isHouse ? INSTALL_BASE.casa.sec : INSTALL_BASE.edificio.sec
            const installNeto = Number(est.netPrice ?? 0)
            const totalNeto = installNeto + chargerPrice + secTramite
            const totalIva = Math.round(totalNeto * 0.19)
            update({
              estimateLoading: false,
              step: 2,
              formId,
              nextVisitDate: (data as any).nextAvailableDate ?? null,
              apiResult: {
                mat: Number(est.materialsCost ?? 0),
                inst: Number(est.installationCost ?? 0),
                sec: secTramite,
                chargerPrice,
                chargerName,
                neto: totalNeto,
                iva: totalIva,
                total: totalNeto + totalIva,
                isOwn: state.chargerId === 'own',
              },
            })
            return
          }
        } else {
          const err = await res.json().catch(() => ({}))
          console.error('[cotizador2] /api/cotizar error:', err)
        }
      } catch (err) {
        console.error('[cotizador2] fetch /api/cotizar failed, falling back to local calc:', err)
      }
      // Fallback: show local calculation
      update({ estimateLoading: false, step: 2 })
      return
    }
    if (state.step < 2) {
      update({ step: state.step + 1 })
    }
  }

  function goBack() {
    if (state.step > 0) {
      update({ step: state.step - 1, activePanel: null })
    }
  }

  // ─── Webpay payment flow ─────────────────────────────────────────────────────

  // Step 1: called when user presses "Pagar e iniciar proceso de instalación"
  // Calls /api/payment, stores the token, and opens the panel
  async function initiatePayment() {
    const displayResult = state.apiResult ?? result
    if (!displayResult) return

    update({ webpayLoading: true, webpayError: '', webpayData: null, activePanel: 'pago' })
    console.log('[payment] Calling /api/payment...')

    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total: displayResult.total,
          vat: displayResult.iva,
          email: state.emailPago || undefined,
          address: state.address,
          tipo: state.tipo,
          chargerName: displayResult.chargerName,
          dist: state.dist,
          glosa: `Instalación Cargador eléctrico - ${state.dist} Mts`,
        }),
      })

      const data = await res.json()
      console.log('[payment] Response:', data)

      if (!res.ok || !data.token) {
        throw new Error(data.error ?? 'Error al iniciar el pago')
      }

      console.log('[payment] Token received, order:', data.order)
      update({
        webpayLoading: false,
        webpayData: { order: data.order, token: data.token, url: data.url, buy_order: data.buy_order },
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al procesar el pago'
      console.error('[payment] Error:', message)
      update({ webpayLoading: false, webpayError: message })
    }
  }

  // Step 2: called when user presses "Pagar $X con Webpay →"
  // Uses the stored token to submit a POST form to Webpay
  function submitWebpay() {
    if (!state.webpayData) return
    console.log('[payment] Submitting to Webpay URL:', state.webpayData.url)

    // Store wizard + estimate data so ReciboPagoClient can display a rich summary.
    // /return will merge payment confirmation fields into this same key.
    const displayResult = state.apiResult ?? result
    sessionStorage.setItem('paymentData', JSON.stringify({
      tipo: state.tipo ?? '',
      chargerName: displayResult?.chargerName ?? state.tipoC ?? '',
      dist: state.dist,
      address: state.address,
      depto: state.depto ?? '',
      email: state.emailPago ?? '',
      total: displayResult?.total ?? 0,
      neto: displayResult?.neto ?? 0,
      iva: displayResult?.iva ?? 0,
      chargerPrice: displayResult?.chargerPrice ?? 0,
      mat: displayResult?.mat ?? 0,
      inst: displayResult?.inst ?? 0,
      sec: displayResult?.sec ?? 0,
      isOwn: displayResult?.isOwn ?? false,
      formId: state.formId ?? '',
    }))
    sessionStorage.removeItem('wizardContext')

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = state.webpayData.url
    const tokenInput = document.createElement('input')
    tokenInput.type = 'hidden'
    tokenInput.name = 'token_ws'
    tokenInput.value = state.webpayData.token
    form.appendChild(tokenInput)
    document.body.appendChild(form)
    form.submit()
  }

  // Legacy alias kept for compatibility (not used in new flow)
  function handlePay() { submitWebpay() }

  async function handleSendEmail() {
    const displayResult = state.apiResult ?? result
    update({ emailSending: true, emailError: '' })
    try {
      // DB: create/update customer and link to the client form (non-blocking on failure)
      fetch('/api/send-quote-to-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.nombreEmail,
          email: state.emailSolo,
          formId: state.formId,
          address: state.address,
        }),
      }).catch(() => null)

      // Build quote HTML for the email template
      const charger = CHARGERS.find(c => c.id === state.chargerId)
      const fmtN = (n: number) => Math.round(n).toLocaleString('es-CL')
      const valor = fmtN(displayResult?.total ?? 0)
      const kws = charger?.kw ?? '7.3'
      const materiales = fmtN(displayResult?.mat ?? 0)
      const instalacion = fmtN(displayResult?.inst ?? 0)
      const sec = fmtN(displayResult?.sec ?? 0)
      const cargador = fmtN(displayResult?.chargerPrice ?? 0)
      const neto = fmtN(displayResult?.neto ?? 0)
      const iva = fmtN(displayResult?.iva ?? 0)
      const bruto = fmtN(displayResult?.total ?? 0)
      const tipoLabel = state.tipo === 'casa' ? 'Casa' : 'Edificio'
      const mts = String(state.dist)

      // Get signed payment URL for the email CTA button
      let paymentUrl = 'https://www.energica.city/cotizador/pago'
      if (state.formId && state.emailSolo) {
        try {
          const linkRes = await fetch('/api/generate-payment-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              formId: state.formId,
              email: state.emailSolo,
              tipo: state.tipo,
              dist: state.dist,
              mat: displayResult?.mat ?? 0,
              inst: displayResult?.inst ?? 0,
              sec: displayResult?.sec ?? 0,
              chargerPrice: displayResult?.chargerPrice ?? 0,
              chargerName: displayResult?.chargerName ?? '',
              neto: displayResult?.neto ?? 0,
              iva: displayResult?.iva ?? 0,
              total: displayResult?.total ?? 0,
              isOwn: displayResult?.isOwn ?? false,
            }),
          })
          if (linkRes.ok) {
            const linkData = await linkRes.json()
            paymentUrl = linkData.url
          }
        } catch { /* keep fallback url */ }
      }

      const HTML = `<tr>
                          <td
                            style="
                              font-family: proxima-nova, sans-serif;
                              box-sizing: border-box;
                              text-align: center;
                              padding: 1rem 4rem;
                            "
                          >
                            <p
                              style="
                                box-sizing: border-box;
                                color: #37373c;
                                font-size: 14px;
                                line-height: 24px;
                                font-weight: 300;
                                font-family:
                                  proxima-nova, sans-serif !important;
                                text-align: center;
                              "
                            >
                              A continuaci&oacute;n encontrar&aacute;s el
                              detalle de tu compra:
                            </p>

                            <p style="box-sizing:border-box;color:#37373c;font-size:14px;line-height:24px;font-weight:300;font-family:proxima-nova,sans-serif!important;text-align:left;margin:0 0 16px;">
                              Hola <strong>${state.nombreEmail}</strong>, aqu&iacute; est&aacute; tu cotizaci&oacute;n para la instalaci&oacute;n de tu cargador:
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:16px;">
                              <tr><td align="center" style="padding-bottom:4px;"><p style="font-family:proxima-nova,sans-serif;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#74787e;margin:0;">TOTAL</p></td></tr>
                              <tr><td align="center" style="padding-bottom:4px;"><p style="font-family:proxima-nova,sans-serif;font-size:46px;font-weight:700;color:#F0386B;margin:0;line-height:1.1;">$${valor}</p></td></tr>
                              <tr><td align="center" style="padding-bottom:16px;"><p style="font-family:proxima-nova,sans-serif;font-size:13px;color:#74787e;margin:0;">IVA incluido &middot; ${kws} kW</p></td></tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:16px;"><tr><td style="border-top:1px solid #e8e8e8;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr></table>

                            <p style="font-family:proxima-nova,sans-serif;font-size:15px;font-weight:700;color:#37373c;text-align:left;margin:0 0 12px;">Desglose de tu cotizaci&oacute;n</p>

                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;margin-bottom:16px;">
                              <thead>
                                <tr style="background-color:#f8fafc;">
                                  <th style="font-family:proxima-nova,sans-serif;font-size:13px;font-weight:600;color:#37373c;text-align:left;padding:10px 14px;border-bottom:1px solid #e8e8e8;">Concepto</th>
                                  <th style="font-family:proxima-nova,sans-serif;font-size:13px;font-weight:600;color:#37373c;text-align:right;padding:10px 14px;border-bottom:1px solid #e8e8e8;">Valor</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr><td style="font-family:proxima-nova,sans-serif;font-size:13px;color:#37373c;padding:10px 14px;border-bottom:1px solid #f0f0f0;text-align: left;">Materiales</td><td style="font-family:proxima-nova,sans-serif;font-size:13px;color:#37373c;text-align:right;padding:10px 14px;border-bottom:1px solid #f0f0f0;">$${materiales}</td></tr>
                                <tr><td style="font-family:proxima-nova,sans-serif;font-size:13px;color:#37373c;padding:10px 14px;border-bottom:1px solid #f0f0f0;text-align: left;">Instalaci&oacute;n</td><td style="font-family:proxima-nova,sans-serif;font-size:13px;color:#37373c;text-align:right;padding:10px 14px;border-bottom:1px solid #f0f0f0;">$${instalacion}</td></tr>
                                <tr><td style="font-family:proxima-nova,sans-serif;font-size:13px;color:#37373c;padding:10px 14px;border-bottom:1px solid #f0f0f0;text-align: left;">Tr&aacute;mites SEC</td><td style="font-family:proxima-nova,sans-serif;font-size:13px;color:#37373c;text-align:right;padding:10px 14px;border-bottom:1px solid #f0f0f0;">$${sec}</td></tr>
                                <tr><td style="font-family:proxima-nova,sans-serif;font-size:13px;color:#37373c;padding:10px 14px;border-bottom:1px solid #f0f0f0;text-align: left;">Cargador</td><td style="font-family:proxima-nova,sans-serif;font-size:13px;color:#37373c;text-align:right;padding:10px 14px;border-bottom:1px solid #f0f0f0;">$${cargador}</td></tr>
                                <tr><td style="font-family:proxima-nova,sans-serif;font-size:13px;font-weight:700;color:#37373c;padding:10px 14px;border-bottom:1px solid #e8e8e8;text-align: left;">Total neto</td><td style="font-family:proxima-nova,sans-serif;font-size:13px;font-weight:700;color:#37373c;text-align:right;padding:10px 14px;border-bottom:1px solid #e8e8e8;">$${neto}</td></tr>
                                <tr><td style="font-family:proxima-nova,sans-serif;font-size:13px;color:#37373c;padding:10px 14px;border-bottom:1px solid #f0f0f0;text-align: left;">IVA 19%</td><td style="font-family:proxima-nova,sans-serif;font-size:13px;color:#37373c;text-align:right;padding:10px 14px;border-bottom:1px solid #f0f0f0;">$${iva}</td></tr>
                                <tr style="background-color:#fef2f5;"><td style="font-family:proxima-nova,sans-serif;font-size:13px;font-weight:700;color:#37373c;padding:10px 14px;text-align: left;">Total bruto</td><td style="font-family:proxima-nova,sans-serif;font-size:13px;font-weight:700;color:#F0386B;text-align:right;padding:10px 14px;">$${bruto}</td></tr>
                              </tbody>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px;">
                              <tr>
                                <td style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px 16px;font-family:proxima-nova,sans-serif;font-size:12px;line-height:20px;color:#15803d;text-align:left;">
                                  Incluye tablero, canalizaci&oacute;n sobrepuesta y cableado. Cotizado para <strong>${mts} metros</strong> entre tablero el&eacute;ctrico y estacionamiento. Declaraci&oacute;n TE6 ante SEC y medici&oacute;n de puesta a tierra incluidas. Cumple normativa RIC N&deg;15.<br>
                                  Tipo de residencia: <strong>${tipoLabel}</strong>
                                </td>
                              </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:20px;"><tr><td style="border-top:1px solid #e8e8e8;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr></table>

                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px;">
                              <tr>
                                <td align="center" style="padding-bottom:8px;">
                                  <p style="font-family:proxima-nova,sans-serif;font-size:13px;color:#74787e;margin:0 0 16px;">Tu cotizaci&oacute;n est&aacute; lista. Haz clic para completar tu pago y agendar la instalaci&oacute;n:</p>
                                  <a href="${paymentUrl}" target="_blank" rel="noopener noreferrer" style="background-color:#e81a68;color:#ffffff;font-family:proxima-nova,sans-serif;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:8px;display:inline-block;letter-spacing:0.5px;">PAGA AQU&Iacute; TU INSTALACI&Oacute;N</a>
                                </td>
                              </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px;">
                              <tr><td align="center" style="padding-bottom:8px;"><p style="font-family:proxima-nova,sans-serif;font-size:16px;font-weight:700;color:#37373c;margin:0;">&iquest;Necesitas un cargador?</p></td></tr>
                              <tr><td align="center" style="padding-bottom:14px;"><p style="font-family:proxima-nova,sans-serif;font-size:13px;color:#74787e;margin:0;">Revisa nuestro cat&aacute;logo de cargadores con disponibilidad inmediata.</p></td></tr>
                              <tr><td align="center"><a href="https://www.energica.city/cargadores-vehiculos-electricos-sin-instalacion" target="_blank" rel="noopener noreferrer" style="border:1.5px solid #37373c;color:#37373c;font-family:proxima-nova,sans-serif;font-size:14px;font-weight:500;text-decoration:none;padding:10px 30px;border-radius:40px;display:inline-block;">Ver cargadores</a></td></tr>
                            </table>
                            

                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td style="background-color:#F0386B;border-radius:8px;padding:28px 24px;text-align:center;">
                                  <p style="font-family:proxima-nova,sans-serif;font-size:16px;font-weight:700;color:#ffffff;margin:0 0 8px;">&iquest;Vives en edificio?</p>
                                  <p style="font-family:proxima-nova,sans-serif;font-size:13px;color:#ffffff;margin:0 0 16px;">Postula aqu&iacute; para instalar una electrolinera sin costo en tu comunidad.</p>
                                  <a href="https://www.energica.city/cargadores-en-edificios" target="_blank" rel="noopener noreferrer" style="border:1.5px solid #ffffff;color:#ffffff;font-family:proxima-nova,sans-serif;font-size:14px;font-weight:500;text-decoration:none;padding:10px 30px;border-radius:40px;display:inline-block;">Postular mi edificio</a>
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>`

      // Send email with HTML quote content
      initEmailjs('UYcrSeCqLGW8xqT4S')
      await emailjs.send('service_dbrrm6b', 'template_eysyecb', {
        to_email: state.emailSolo,
        name: state.nombreEmail,
        subject: 'Resultado de su cotización',
        CONTENT_HTML: HTML,
      })

      update({ emailSent: true, emailSending: false })
    } catch {
      update({ emailSending: false, emailError: 'No se pudo enviar. Intenta nuevamente.' })
    }
  }

  function handleBookDate() {
    update({ booked: true, step: 4 })
  }

  function resetAll() {
    setState({
      step: 0,
      tipo: null,
      address: '',
      addressValidated: false,
      addressCity: '',
      addressState: '',
      addressZipCode: '',
      addressLat: '',
      addressLng: '',
      editingAddr: true,
      regionWarn: false,
      tipoC: null,
      chargerId: null,
      dist: 10,
      activePanel: null,
      depto: '',
      emailPago: '',
      nombreEmail: '',
      emailSolo: '',
      emailSent: false,
      emailSending: false,
      emailError: '',
      paid: false,
      selectedDate: null,
      booked: false,
      estimateLoading: false,
      apiResult: null,
      formId: null,
      nextVisitDate: null,
      webpayLoading: false,
      webpayError: '',
      webpayData: null,
      customerSaving: false,
      customerSaved: false,
    })
  }

  // ─── Step renderers ───────────────────────────────────────────────────────
  function renderStep0() {
    return (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#2A3547' }}>
          ¿Dónde instalarás tu cargador?
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, mb: 3 }}>
          El tipo de propiedad afecta el costo de instalación.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6 }}>
            <SelectionCard
              selected={state.tipo === 'casa'}
              onClick={() => update({ tipo: 'casa' })}
              icon="🏠"
              title="Casa"
              subtitle="Estacionamiento propio"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <SelectionCard
              selected={state.tipo === 'edificio'}
              onClick={() => update({ tipo: 'edificio' })}
              icon="🏢"
              title="Edificio"
              subtitle="Estacionamiento propio"
            />
          </Grid>
        </Grid>


      </Box>
    )
  }

  function renderStep1() {
    const portables = CHARGERS.filter(c => c.tipo === 'portable')
    const wallboxes = CHARGERS.filter(c => c.tipo === 'wallbox')

    return (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#2A3547' }}>
          Tipo de cargador
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, mb: 3 }}>
          Los wallbox se instalan fijos en la pared. Los portátiles son más flexibles.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6 }}>
            <SelectionCard
              selected={state.tipoC === 'portable'}
              onClick={() => update({ tipoC: 'portable', chargerId: 'own' })}
              icon="🔌"
              title="Portátil"
              subtitle="Cable de carga"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <SelectionCard
              selected={state.tipoC === 'wallbox'}
              onClick={() => update({ tipoC: 'wallbox', chargerId: 'own' })}
              icon="⚡"
              title="Wallbox"
              subtitle="Mayor potencia · Fijo en pared"
            />
          </Grid>
        </Grid>

        {/* Portátil list */}
        {state.tipoC === 'portable' && (
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 1.5, color: '#2A3547' }}>
              Selecciona tu cargador portátil
            </Typography>
            {portables.map(c => (
              <ChargerListItem
                key={c.id}
                charger={c}
                selected={state.chargerId === c.id}
                onClick={() => update({ chargerId: c.id })}
              />
            ))}
            <Box
              onClick={() => update({ chargerId: 'own' })}
              sx={{
                border: `2px solid ${state.chargerId === 'own' ? PINK : BORDER}`,
                borderRadius: 2,
                p: 2,
                cursor: 'pointer',
                bgcolor: state.chargerId === 'own' ? 'rgba(232,26,104,0.04)' : '#fff',
                transition: 'all 0.2s',
                '&:hover': { borderColor: PINK },
                mb: 1,
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: state.chargerId === 'own' ? PINK : '#2A3547' }}>
                Ya tengo mi cargador
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED }}>Solo necesito la instalación</Typography>
            </Box>
          </Box>
        )}

        {/* Wallbox dropdown Select (Image #13 style) */}
        {state.tipoC === 'wallbox' && (
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 1, color: '#2A3547' }}>
              Modelo
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <Select
                displayEmpty
                value={state.chargerId ?? ''}
                onChange={(e: SelectChangeEvent<string>) => update({ chargerId: (e.target.value as string) || null })}
                renderValue={(val: string) => {
                  if (!val) return <Typography sx={{ color: TEXT_MUTED, fontSize: '0.875rem' }}>Elige un wallbox...</Typography>
                  if (val === 'own') return 'Ya tengo mi cargador (solo instalación)'
                  const ch = wallboxes.find(c => c.id === val)
                  return ch ? `${ch.name} — ${fmt(Math.round(ch.precio / 1.19))} — ${ch.kw} kW` : val
                }}
                sx={{
                  bgcolor: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: BORDER },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: TEAL },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: TEAL },
                  fontSize: '0.875rem',
                }}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{ color: TEXT_MUTED, fontSize: '0.875rem' }}>Elige un wallbox...</Typography>
                </MenuItem>
                {wallboxes.map(c => (
                  <MenuItem key={c.id} value={c.id} sx={{ fontSize: '0.875rem' }}>
                    {c.name} — {fmt(Math.round(c.precio / 1.19))} — {c.kw} kW
                  </MenuItem>
                ))}
                <MenuItem value="own" sx={{ fontSize: '0.875rem' }}>
                  Ya tengo mi cargador (solo instalación)
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Distance slider */}
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 0.5, color: '#2A3547' }}>
            Distancia al tablero eléctrico
          </Typography>
          <Typography sx={{ fontSize: '0.78rem', color: TEXT_MUTED, mb: 2 }}>
            Distancia aproximada entre el estacionamiento y el tablero eléctrico principal.
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={state.dist}
              min={1}
              max={60}
              marks={SLIDER_MARKS}
              onChange={(_, v) => update({ dist: v as number })}
              sx={{
                color: PINK,
                '& .MuiSlider-markLabel': { fontSize: '0.65rem', color: TEXT_MUTED },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED }}>{distLabel(state.dist)}</Typography>
            <Chip label={`${state.dist} m`} size="small" sx={{ bgcolor: 'rgba(232,26,104,0.08)', color: PINK, fontWeight: 700 }} />
          </Box>
        </Box>
      </Box>
    )
  }

  function formatVisitDate(iso: string): string {
    const d = new Date(iso)
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
    const weekday = d.toLocaleDateString('es-CL', { weekday: 'long' })
    const day = d.getDate()
    const month = d.toLocaleDateString('es-CL', { month: 'long' })
    return `${cap(weekday)}, ${day} ${cap(month)}`
  }

  function renderStep2() {
    const localResult = result
    const displayResult = state.apiResult ?? localResult
    if (!displayResult) return null

    // Summary params for the header (Image #14)
    const tipoLabel = state.tipo === 'casa' ? 'Casa' : 'Edificio'
    const chargerLabel = displayResult.chargerName || 'Cargador propio'
    const distLabel2 = `${state.dist}m`

    return (
      <Box>
        {/* Estimación summary header (Image #14) */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#2A3547' }}>
            Tu cotización
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mt: 0.25 }}>
            {tipoLabel} · {chargerLabel} · {distLabel2}
          </Typography>
        </Box>

        {/* Price hero */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, mb: 0.5 }}>Total (con IVA)</Typography>
          <Typography sx={{ fontSize: '2.5rem', fontWeight: 900, color: PINK, lineHeight: 1 }}>
            {fmt(displayResult.total)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, mt: 1.5 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 5.5V12C3 16.5 7 20.5 12 22C17 20.5 21 16.5 21 12V5.5L12 2Z" fill="#22c55e" stroke="#22c55e" strokeWidth="0.5"/>
              <path d="M8 12L11 15L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <Typography sx={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>
              Compra protegida
            </Typography>
          </Box>
        </Box>

        {/* Breakdown card */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, overflow: 'hidden', mb: 3 }}>
          {!displayResult.isOwn && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 2 }}>
                <Box sx={{ flexShrink: 0, fontSize: '1.25rem', lineHeight: 1 }}>🔌</Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#2A3547' }}>
                    {displayResult.chargerName}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, flexShrink: 0, ml: 1 }}>
                  {fmt(displayResult.chargerPrice)}
                </Typography>
              </Box>
              <Divider />
            </>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 2 }}>
            <Box sx={{ flexShrink: 0, fontSize: '1.25rem', lineHeight: 1 }}>🔧</Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#2A3547' }}>
                Materiales certificados
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, mt: 0.25 }}>
                Tablero, canalización, cableado, protecciones
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, flexShrink: 0, ml: 1 }}>
              {fmt(displayResult.mat)}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 2 }}>
            <Box sx={{ flexShrink: 0, fontSize: '1.25rem', lineHeight: 1 }}>👷</Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#2A3547' }}>
                Instalación por técnico SEC
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, mt: 0.25 }}>
                Mano de obra certificada
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, flexShrink: 0, ml: 1 }}>
              {fmt(displayResult.inst)}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 2 }}>
            <Box sx={{ flexShrink: 0, fontSize: '1.25rem', lineHeight: 1 }}>📋</Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#2A3547' }}>
                Trámites y declaración TE6
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, mt: 0.25 }}>
                Certificación ante SEC incluida
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, flexShrink: 0, ml: 1 }}>
              {fmt(displayResult.sec)}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ px: 2.5, py: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 400, lineHeight: '1.334rem', fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', Helvetica, Arial, sans-serif", color: '#64748B' }}>Neto</Typography>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 400, lineHeight: '1.334rem', fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', Helvetica, Arial, sans-serif", color: '#64748B' }}>{fmt(displayResult.neto)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 400, lineHeight: '1.334rem', fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', Helvetica, Arial, sans-serif", color: '#64748B' }}>IVA (19%)</Typography>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 400, lineHeight: '1.334rem', fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', Helvetica, Arial, sans-serif", color: '#64748B' }}>{fmt(displayResult.iva)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547' }}>Total (IVA incl.)</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: PINK }}>{fmt(displayResult.total)}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Info text below breakdown (Image #15) */}
        <Box sx={{ bgcolor: 'rgba(8,152,185,0.06)', border: `1px solid rgba(8,152,185,0.2)`, borderRadius: 1.5, px: 2, py: 1.25, mb: 3 }}>
          <Typography sx={{ fontSize: '0.8rem', color: '#0777a0', lineHeight: 1.5 }}>
            Incluye tablero, canalización, cableado y declaración TE6 ante SEC. Normativa RIC N°15.
          </Typography>
        </Box>

        {/* ── Cronograma de instalación ───────────────────────────────────── */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#0898b9" strokeWidth="1.5"/>
              <path d="M12 7v5l3 3" stroke="#0898b9" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#2A3547' }}>
              Tu proceso de instalación
            </Typography>
          </Box>

          {/* Steps */}
          {([
            { label: 'Pago y agenda de visita', sub: 'Hoy', active: true },
            { label: 'Visita técnica para confirmar distancia y tipo de canalización', sub: state.nextVisitDate
                ? `Próxima fecha: ${formatVisitDate(state.nextVisitDate)}`
                : 'Próxima fecha disponible', active: true },
            { label: 'Compra de materiales', sub: '2 a 3 días hábiles', active: false },
            { label: 'Instalación de tu cargador', sub: '2 días hábiles', active: false },
          ] as { label: string; sub: string; active: boolean }[]).map((s, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: i < 3 ? 1.75 : 0 }}>
              <Box sx={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0, mt: 0.1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: s.active ? PINK : '#E2E8F0',
              }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: s.active ? '#fff' : '#94A3B8' }}>
                  {i + 1}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#2A3547', lineHeight: 1.3 }}>
                  {s.label}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: s.active ? PINK : TEXT_MUTED, mt: 0.15 }}>
                  {s.sub}
                </Typography>
              </Box>
            </Box>
          ))}

          {/* Footer */}
          <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${BORDER}`, bgcolor: 'rgba(8,152,185,0.05)', borderRadius: 1, px: 1.5, py: 1 }}>
            <Typography sx={{ fontSize: '0.78rem', color: TEAL, fontWeight: 600, textAlign: 'center' }}>
              De pago a cargador funcionando: ~7 a 12 días hábiles
            </Typography>
          </Box>
        </Box>

        {/* Social proof */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, py: 1.5, mb: 1 }}>
          <Box sx={{ display: 'flex' }}>
            {[
              { letter: 'H', color: '#FBBF24' },
              { letter: 'C', color: '#93C5FD' },
              { letter: 'J', color: '#86EFAC' },
              { letter: 'R', color: '#FCA5A5' },
            ].map(({ letter, color }, i) => (
              <Box
                key={i}
                sx={{
                  width: 28, height: 28, borderRadius: '50%', position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: color, border: '2px solid #fff',
                  ml: i > 0 ? -0.75 : 0, zIndex: 4 - i,
                }}
              >
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#fff' }}>{letter}</Typography>
              </Box>
            ))}
          </Box>
          <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED }}>
            +120 instalaciones completadas en Santiago
          </Typography>
        </Box>

        {/* Pay button — red when panel hidden, gray when panel visible (acts as toggle) */}
        <Box sx={{ mb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              if (state.activePanel === 'pago') {
                update({ activePanel: null, webpayData: null, webpayError: '', webpayLoading: false })
              } else {
                initiatePayment()
              }
            }}
            sx={{
              bgcolor: state.activePanel === 'pago' ? '#94A3B8' : 'rgb(240, 56, 107)',
              color: '#ffffff',
              '&:hover': { bgcolor: state.activePanel === 'pago' ? '#64748B' : 'rgb(239, 97, 136)' },
              fontWeight: 700,
              fontSize: '0.85rem',
              py: 1.25,
              boxShadow: 'none',
            }}
          >
            Reservar instalación
          </Button>
        </Box>

        {/* Panel: pago */}
        {state.activePanel === 'pago' && (
          <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2, color: '#2A3547' }}>
              Datos para la instalación
            </Typography>
            {/* ─── Dirección de instalación ─── */}
            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 1, color: '#2A3547' }}>
              Dirección de instalación
            </Typography>
            <Box sx={{ mb: state.address && !state.addressValidated ? 0.5 : 1.5 }}>
              <AddressInput2
                value={state.address}
                error={!!state.address && !state.addressValidated}
                onAddressChange={(v) => update({ address: v, addressValidated: false, regionWarn: false })}
                onValidationChange={(isValid) => update({ addressValidated: isValid })}
                onSelectAddress={(details) => {
                  if (details) {
                    const full = [details.StreetAddress, details.City, details.State].filter(Boolean).join(', ')
                    update({
                      address: full,
                      addressValidated: true,
                      addressCity: details.City ?? '',
                      addressState: details.State ?? '',
                      addressZipCode: details.ZipCode ?? '',
                      addressLat: String(details.Latitude ?? ''),
                      addressLng: String(details.Longitude ?? ''),
                      regionWarn: false,
                    })
                  }
                }}
              />
            </Box>
            {state.address && !state.addressValidated && (
              <Typography sx={{ fontSize: '0.75rem', color: 'error.main', mb: 1.5, ml: 0.25 }}>
                Selecciona una dirección del menú desplegable para continuar
              </Typography>
            )}

            {state.regionWarn && (
              <Alert severity="warning" sx={{ fontSize: '0.78rem', mb: 1.5 }}>
                Por el momento solo atendemos la Región Metropolitana y Valparaíso.
              </Alert>
            )}

            {/* ── Validación de cobertura RM ───────────────────────────────── */}
            {state.address && !isRegionMetropolitana(state.address) ? (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#FEF3C7', border: '1px solid #FCD34D', mb: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#92400E', mb: 0.75 }}>
                  Sin cobertura en tu región
                </Typography>
                <Typography sx={{ fontSize: '0.82rem', color: '#78350F', lineHeight: 1.6, mb: 1.5 }}>
                  De momento no tenemos cobertura en tu región por esta vía. Contáctanos para evaluar tu caso con un ejecutivo.
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => { update({ address: '' }) }}
                  sx={{ fontSize: '0.78rem', borderColor: '#92400E', color: '#92400E', textTransform: 'none', '&:hover': { borderColor: '#78350F', bgcolor: 'rgba(146,64,14,0.05)' } }}
                >
                  Cambiar dirección
                </Button>
              </Box>
            ) : (
              <>
                <TextField
                  fullWidth
                  size="small"
                  label="Depto / Referencia (opcional)"
                  value={state.depto}
                  onChange={e => update({ depto: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  size="small"
                  required
                  label="Email para comprobante"
                  type="email"
                  value={state.emailPago}
                  onChange={e => update({ emailPago: e.target.value, customerSaved: false })}
                  onBlur={async (e) => {
                    const email = e.target.value.trim().toLowerCase()
                    if (!email || !/\S+@\S+\.\S+/.test(email)) return
                    update({ customerSaving: true, customerSaved: false })
                    try {
                      const res = await fetch('/api/customer', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          email,
                          address: state.address || '',
                          city: state.addressCity || '',
                          state: state.addressState || '',
                          zipCode: state.addressZipCode || '',
                          lat: state.addressLat || '',
                          lng: state.addressLng || '',
                          depto: state.depto || '',
                          typeOfResidence: state.tipo === 'casa' ? 'house' : state.tipo === 'edificio' ? 'appartment' : 'other',
                          formId: state.formId ?? null,
                          ...(state.nombreEmail?.trim() ? { name: state.nombreEmail.trim() } : {}),
                        }),
                      })
                      update({ customerSaving: false, customerSaved: res.ok })
                    } catch {
                      update({ customerSaving: false, customerSaved: false })
                    }
                  }}
                  helperText={
                    state.customerSaving
                      ? 'Verificando datos…'
                      : 'Requerido para proceder al pago'
                  }
                  sx={{ mb: 2.5 }}
                />

                {/* Webpay error */}
                {state.webpayError && (
                  <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>
                    {state.webpayError}. <Button size="small" onClick={initiatePayment} sx={{ textTransform: 'none', fontSize: '0.78rem', p: 0, color: 'inherit', textDecoration: 'underline' }}>Reintentar</Button>
                  </Alert>
                )}

                {/* Webpay button — enabled only when token is ready AND email is filled */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={submitWebpay}
                  disabled={!state.webpayData || state.webpayLoading || !state.emailPago.trim() || !state.addressValidated || state.customerSaving || !state.customerSaved}
                  sx={{
                    bgcolor: PINK,
                    color: '#fff',
                    '&:hover': { bgcolor: PINK_DARK },
                    '&:disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
                    fontWeight: 700,
                    py: 1.5,
                    fontSize: '0.95rem',
                    boxShadow: 'none',
                  }}
                >
                  {state.webpayLoading
                    ? 'Generando orden…'
                    : `Pagar ${fmt(displayResult.total)} con webpay`}
                </Button>
                <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED, textAlign: 'center', mt: 1 }}>
                  Pago seguro · Visa, Mastercard, Redcompra, débito
                </Typography>
              </>
            )}
          </Box>
        )}

        {/* Próxima visita disponible — between pay and email buttons */}
        {state.nextVisitDate && (
          <Typography sx={{ fontSize: '0.78rem', color: TEXT_MUTED, textAlign: 'center', mb: 2, mt: -1 }}>
            Próxima visita disponible:{' '}
            <Box component="span" sx={{ color: TEAL, fontWeight: 600 }}>
              {formatVisitDate(state.nextVisitDate)}
            </Box>
          </Typography>
        )}

        {/* Email button — below pago panel */}
        <Box sx={{ mb: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<IconMail size={16} />}
            onClick={() => update({ activePanel: state.activePanel === 'email' ? null : 'email' })}
            sx={{
              bgcolor: '#fff',
              borderColor: BORDER,
              color: '#2A3547',
              '&:hover': { bgcolor: '#F8FAFC', borderColor: '#CBD5E1', color: 'rgb(8, 152, 185)' },
              fontWeight: 600,
              fontSize: '0.85rem',
              py: 1.25,
              boxShadow: 'none',
            }}
          >
            Enviar mi cotización por email
          </Button>
        </Box>

        {/* WhatsApp button */}
        <Box
          component="a"
          href={`https://wa.me/56967666652?text=${encodeURIComponent(`Hola, estoy viendo la cotización para mi cargador en ${state.address} (${state.dist}m, ${fmt(displayResult.total)}) y tengo una consulta.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
            py: 1.25, mb: 2, textDecoration: 'none', cursor: 'pointer',
            '&:hover .wa-text': { color: '#25D366' },
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#25D366"/>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#fff"/>
          </svg>
          <Typography className="wa-text" sx={{ fontSize: '0.9rem', color: TEXT_MUTED, fontWeight: 500, transition: 'color 0.2s' }}>
            ¿Tienes dudas? Habla con nosotros
          </Typography>
        </Box>

        {/* Panel: email */}
        {state.activePanel === 'email' && (
          <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 2 }}>
            {state.emailSent ? (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography sx={{ fontSize: '2rem', mb: 1 }}>📬</Typography>
                <Typography sx={{ fontWeight: 700, color: SUCCESS, mb: 0.5 }}>¡Cotización enviada!</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED }}>
                  Enviado a <Box component="span" sx={{ fontWeight: 600, color: '#2A3547' }}>{state.emailSolo}</Box>
                </Typography>
              </Box>
            ) : (
              <>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2, color: '#2A3547' }}>
                  Recibir cotización por email
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  label="Tu nombre"
                  value={state.nombreEmail}
                  onChange={e => update({ nombreEmail: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Tu email"
                  type="email"
                  value={state.emailSolo}
                  onChange={e => update({ emailSolo: e.target.value })}
                  sx={{ mb: 2.5 }}
                />
                {state.emailError && (
                  <Typography sx={{ fontSize: '0.78rem', color: '#dc2626', mb: 1.5, textAlign: 'center' }}>
                    {state.emailError}
                  </Typography>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSendEmail}
                  disabled={!state.emailSolo || !state.nombreEmail || state.emailSending}
                  sx={{
                    bgcolor: TEAL,
                    '&:hover': { bgcolor: '#0777a0' },
                    fontWeight: 700,
                    py: 1.25,
                  }}
                >
                  {state.emailSending ? 'Enviando…' : 'Enviar cotización'}
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Trust box — redesigned */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: 3, mt: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547', mb: 2.5 }}>
            Compra protegida
          </Typography>

          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M20 7H4C3.45 7 3 7.45 3 8V19C3 19.55 3.45 20 4 20H20C20.55 20 21 19.55 21 19V8C21 7.45 20.55 7 20 7Z" stroke="#0898b9" strokeWidth="1.5" fill="none"/>
                  <path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7" stroke="#0898b9" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 12V16M10 14H14" stroke="#0898b9" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              title: 'Tu dinero queda resguardado',
              desc: 'hasta que la instalación se complete.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 5.5V12C3 16.5 7 20.5 12 22C17 20.5 21 16.5 21 12V5.5L12 2Z" stroke="#0898b9" strokeWidth="1.5" fill="none"/>
                  <path d="M8 12L11 15L16 9" stroke="#0898b9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Devolución sin preguntas.',
              desc: 'Puedes solicitar la devolución de tu dinero en todo momento antes de la instalación.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#0898b9" strokeWidth="1.5" fill="none"/>
                  <path d="M12 7V12L15 15" stroke="#0898b9" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              title: 'Garantía de 3 meses',
              desc: 'sobre la instalación completa.',
            },
          ].map(({ icon, title, desc }) => (
            <Box key={title} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2, '&:last-child': { mb: 0 } }}>
              <Box sx={{ flexShrink: 0, mt: 0.25 }}>{icon}</Box>
              <Typography sx={{ fontSize: '0.85rem', color: '#2A3547', lineHeight: 1.5 }}>
                <strong>{title}</strong> {desc}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Nueva simulación */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="text"
            onClick={resetAll}
            sx={{
              color: TEXT_MUTED,
              fontSize: '0.82rem',
              textTransform: 'none',
              textDecoration: 'underline',
              '&:hover': { color: '#2A3547', bgcolor: 'transparent' },
            }}
          >
            ← Nueva simulación
          </Button>
        </Box>
      </Box>
    )
  }

  function renderStep3() {
    return (
      <>
       <div id="COTIZADOR-RESULTADO"></div> 
        <Box>
          {/* Confirmed banner */}
          <Box sx={{ bgcolor: 'rgba(0,196,124,0.1)', border: `1px solid ${SUCCESS}`, borderRadius: 2, p: 2, mb: 3, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>🎉</Typography>
            <Typography sx={{ fontWeight: 800, color: SUCCESS, fontSize: '1.1rem', mb: 0.25 }}>¡Pago confirmado!</Typography>
            <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED }}>
              Enviamos el comprobante a {state.emailPago || 'tu correo'}
            </Typography>
          </Box>

          {/* What's next */}
          <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 3 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.5, color: '#2A3547' }}>¿Qué sigue?</Typography>
            {[
              'Elige una fecha y hora para la visita técnica',
              'Nuestro técnico certificado irá a tu domicilio',
              'Instalación completa en el mismo día',
            ].map((t, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1, alignItems: 'flex-start' }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.1 }}>
                  <Typography sx={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>{i + 1}</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.85rem', color: '#2A3547' }}>{t}</Typography>
              </Box>
            ))}
          </Box>

          {/* Date picker */}
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.5, color: '#2A3547' }}>
            Elige tu fecha preferida
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, mb: 3 }}>
            {dates.map((d, i) => (
              <Box
                key={i}
                onClick={() => d.available && update({ selectedDate: i })}
                sx={{
                  border: `2px solid ${state.selectedDate === i ? PINK : d.available ? BORDER : '#f0f0f0'}`,
                  borderRadius: 1.5,
                  p: 1.25,
                  cursor: d.available ? 'pointer' : 'not-allowed',
                  bgcolor: state.selectedDate === i ? 'rgba(232,26,104,0.04)' : d.available ? '#fff' : '#fafafa',
                  opacity: d.available ? 1 : 0.5,
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  '&:hover': d.available ? { borderColor: PINK, bgcolor: 'rgba(232,26,104,0.04)' } : {},
                }}
              >
                <Typography sx={{ fontSize: '0.82rem', fontWeight: state.selectedDate === i ? 700 : 500, color: state.selectedDate === i ? PINK : d.available ? '#2A3547' : TEXT_MUTED }}>
                  {d.label}
                </Typography>
                <Typography sx={{ fontSize: '0.68rem', color: d.available ? SUCCESS : TEXT_MUTED, mt: 0.25 }}>
                  {d.available ? 'Disponible' : 'No disponible'}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            disabled={state.selectedDate === null}
            onClick={handleBookDate}
            sx={{
              bgcolor: PINK,
              '&:hover': { bgcolor: PINK_DARK },
              fontWeight: 700,
              py: 1.5,
              fontSize: '1rem',
            }}
          >
            Confirmar visita técnica →
          </Button>
        </Box>
      </>
    )
  }

  function renderStep4() {
    const displayResult = state.apiResult ?? result
    if (!displayResult) return null

    return (
      <Box>
        {/* Success */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '3.5rem', mb: 1 }}>✅</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#2A3547', mb: 0.5 }}>
            ¡Todo confirmado!
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>
            Tu visita técnica está agendada
          </Typography>
        </Box>

        {/* Summary */}
        <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2, color: '#2A3547' }}>Resumen de tu pedido</Typography>
          {[
            { label: 'Tipo de propiedad', value: state.tipo === 'casa' ? 'Casa' : 'Edificio' },
            { label: 'Cargador', value: displayResult.chargerName || 'Cargador propio' },
            { label: 'Distancia al tablero', value: `${state.dist} m` },
            { label: 'Dirección', value: state.address || '—' },
            ...(state.depto ? [{ label: 'Depto / Ref.', value: state.depto }] : []),
            { label: 'Total pagado', value: fmt(displayResult.total) },
          ].map(({ label, value }) => (
            <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, gap: 2 }}>
              <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, flexShrink: 0 }}>{label}</Typography>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#2A3547', textAlign: 'right' }}>{value}</Typography>
            </Box>
          ))}
        </Box>

        {/* Next steps */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.5, color: '#2A3547' }}>Próximos pasos</Typography>
          {[
            'Te llamaremos para confirmar hora exacta de visita',
            'Nuestro técnico irá con todos los materiales incluidos',
            'Recibirás el certificado SEC una vez terminada la instalación',
          ].map((t, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.25, alignItems: 'flex-start' }}>
              <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: PINK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.1 }}>
                <Typography sx={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>{i + 1}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.85rem', color: '#2A3547' }}>{t}</Typography>
            </Box>
          ))}
        </Box>

        {/* Contact buttons */}
        <Grid container spacing={1.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6 }}>
            <Button
              fullWidth
              variant="contained"
              href={`https://wa.me/56967666652?text=${encodeURIComponent(`Hola, estoy viendo la cotización para mi cargador en ${state.address} (${state.dist}m, ${fmt(displayResult.total)}) y tengo una consulta.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              component="a"
              sx={{
                bgcolor: '#25D366',
                '&:hover': { bgcolor: '#1ebe5d' },
                fontWeight: 700,
                fontSize: '0.85rem',
                py: 1.25,
                color: '#fff',
              }}
            >
              WhatsApp
            </Button>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              href="mailto:hola@energica.city"
              component="a"
              sx={{
                borderColor: TEAL,
                color: TEAL,
                '&:hover': { borderColor: '#0777a0', bgcolor: 'rgba(8,152,185,0.05)' },
                fontWeight: 700,
                fontSize: '0.85rem',
                py: 1.25,
              }}
            >
              Email
            </Button>
          </Grid>
        </Grid>

        {/* Reset */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={resetAll}
            sx={{ color: TEXT_MUTED, fontSize: '0.82rem', textDecoration: 'underline', '&:hover': { color: '#2A3547', bgcolor: 'transparent' } }}
          >
            Nueva simulación
          </Button>
        </Box>
      </Box>
    )
  }

  const showBottomNav = state.step < 2 && !state.paid

  return (
    <Box>
      <HpHeaderNew />
      {/* ── Loading overlay ───────────────────────────────────────────────── */}
      {state.estimateLoading && (
        <Box sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(255,255,255,0.85)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Typography sx={{ fontSize: '2rem' }}>⚡</Typography>
          <Typography sx={{ fontWeight: 700, color: '#2A3547' }}>Calculando tu presupuesto…</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>Procesando con datos reales del servidor</Typography>
        </Box>
      )}

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Box sx={{ background: `linear-gradient(180deg, ${TEAL_LIGHT} 10%, ${TEAL} 80%)`, pt: 0, pb: 0 }}>
        <Container maxWidth="sm" sx={{ px: { xs: 1, sm: 3 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.6rem', md: '2rem' },
              fontWeight: 800,
              color: '#000000',
              textAlign: 'center',
              mb: 1,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            {heroTitle}
          </Typography>
          <Typography sx={{ color: '#000000', textAlign: 'center', mb: { xs: 1, md: 4 }, fontSize: '0.9rem' }}>
            {heroSubtitle}
          </Typography>
          {!state.booked && <Box sx={{ mb: '10px' }}><WizardStepper step={state.step} paid={state.paid} booked={state.booked} /></Box>}
        </Container>
      </Box>

      {/* ── Wizard body ───────────────────────────────────────────────────── */}
      <Box sx={{ bgcolor: SURFACE, minHeight: '60vh', pt: { xs: 1, md: 4 }, pb: 4 }}>
        <Container maxWidth="sm" sx={{ px: { xs: 1, sm: 3 } }}>
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: 3,
              boxShadow: '0 2px 24px rgba(0,0,0,0.08)',
              p: { xs: 3, md: 4 },
            }}
          >
            {state.step === 0 && renderStep0()}
            {state.step === 1 && renderStep1()}
            {state.step === 2 && renderStep2()}
            {state.step === 3 && renderStep3()}
            {state.step === 4 && renderStep4()}

            {/* ── Bottom navigation ───────────────────────────────────────── */}
            {showBottomNav && (
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                {state.step > 0 && (
                  <Button
                    variant="outlined"
                    onClick={goBack}
                    sx={{
                      borderColor: BORDER,
                      color: TEXT_MUTED,
                      '&:hover': { borderColor: '#2A3547', color: '#2A3547' },
                      fontWeight: 600,
                      px: 3,
                    }}
                  >
                    Atrás
                  </Button>
                )}
                <Button
                  variant="contained"
                  disabled={!canNext}
                  onClick={goNext}
                  data-testid="btn-next"
                  sx={{
                    flex: 1,
                    bgcolor: PINK,
                    '&:hover': { bgcolor: PINK_DARK },
                    '&:disabled': { bgcolor: '#f0f0f0', color: '#aaa' },
                    fontWeight: 700,
                    py: 1.25,
                    fontSize: '0.95rem',
                  }}
                >
                  {state.step === 1 ? 'Ver mi cotización' : 'Siguiente →'}
                </Button>
              </Box>
            )}
          </Box>

          {/* ── Trust text — below white card, steps 0-2 only ─────────── */}
          {state.step <= 2 && !state.paid && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                color: TEXT_MUTED,
                mt: '10px',
              }}
            >
              Instalación certificada SEC · Garantía de 3 meses · Tu compra esta protegida
            </Typography>
          )}
        </Container>
      </Box>
      {/* <Footer /> */}
    </Box>
  )
}

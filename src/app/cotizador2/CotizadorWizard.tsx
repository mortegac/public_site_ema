'use client'

import { useState, useEffect, useRef } from 'react'
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

const VALID_REGIONS = [
  'metropolitana', 'santiago', 'las condes', 'providencia', 'ñuñoa', 'vitacura',
  'la florida', 'maipú', 'puente alto', 'la reina', 'peñalolén', 'macul',
  'san miguel', 'huechuraba', 'colina', 'lo barnechea', 'independencia',
  'san bernardo', 'valparaíso', 'viña del mar', 'quilpué', 'villa alemana',
  'concón', 'hamlet',
]

function checkRegion(addr: string): boolean {
  if (addr.length < 4) return false
  return !VALID_REGIONS.some(r => addr.toLowerCase().includes(r))
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
  editingAddr: boolean
  regionWarn: boolean
  tipoC: 'portable' | 'wallbox' | null
  chargerId: string | null
  dist: number
  activePanel: 'pago' | 'email' | null
  depto: string
  emailPago: string
  emailPagoError: string
  nombreEmail: string
  emailSolo: string
  emailSent: boolean
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
  webpayLoading: boolean
  webpayError: string
  webpayData: { order: string; token: string; url: string; buy_order: string } | null
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
  const chargerPrice = charger ? charger.precio : 0
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
  'Simula el costo de tu instalación',
  'Elige tu cargador eléctrico',
  'Tu cotización al instante',
  'Agenda tu visita técnica',
  '¡Todo listo!',
]

const STEP_SUBTITLES = [
  'Instalación certificada SEC · Precios claros · Sin sorpresas',
  'Selecciona el equipo que mejor se adapta a tus necesidades',
  'Precio estimado basado en tu perfil. Sin compromiso.',
  'Coordina la visita técnica a tu domicilio',
  'Nuestro equipo coordinará contigo los detalles finales',
]

// ─── Main component ───────────────────────────────────────────────────────────
export default function CotizadorWizard() {
  const [state, setState] = useState<WizardState>({
    step: 0,
    tipo: null,
    address: '',
    editingAddr: true,
    regionWarn: false,
    tipoC: null,
    chargerId: null,
    dist: 10,
    activePanel: null,
    depto: '',
    emailPago: '',
    emailPagoError: '',
    nombreEmail: '',
    emailSolo: '',
    emailSent: false,
    paid: false,
    selectedDate: null,
    booked: false,
    estimateLoading: false,
    apiResult: null,
    formId: null,
    webpayLoading: false,
    webpayError: '',
    webpayData: null,
  })

  const [geoStatus, setGeoStatus] = useState<'loading' | 'detected' | 'error'>('loading')
  const [geoAddress, setGeoAddress] = useState<string>('')
  const [geoError, setGeoError] = useState<string>('')
  // Controls whether the manual address input is visible
  const [showManualInput, setShowManualInput] = useState<boolean>(false)

  // Initialize dates client-only to avoid SSR/hydration mismatch (Math.random + Date)
  const [dates, setDates] = useState<Array<{ label: string; available: boolean }>>([])
  useEffect(() => { setDates(genDates()) }, [])

  // ─── Auto-detect location via IP on mount (no user gesture needed) ────────
  const autoGeoStarted = useRef(false)
  useEffect(() => {
    if (autoGeoStarted.current) return
    autoGeoStarted.current = true
    console.log('[geo] 🟡 Auto-detecting location via IP geolocation...')
    ;(async () => {
      try {
        const geoIpRes = await fetch('/api/geoip')
        const geoIpData = await geoIpRes.json()
        console.log('[geo] 📦 /api/geoip:', geoIpData)
        const { latitude: lat, longitude: lng } = geoIpData
        const geocodeRes = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`)
        const geocodeData = await geocodeRes.json()
        const addr: string = geocodeData.address ?? ''
        if (addr) {
          console.log('[geo] 📍 Auto-detected address:', addr)
          update({ address: addr })
          setGeoAddress(addr)
          setGeoStatus('detected')
        } else {
          setGeoStatus('error')
        }
      } catch (err) {
        console.error('[geo] ❌ Auto IP detection failed:', err)
        setGeoStatus('error')
      }
    })()
  }, [])

  // ─── Geolocation — triggered by user click (NOT on mount) ─────────────────
  async function requestGeoLocation() {
    if (!navigator.geolocation) {
      console.log('[geo] ⚠️  navigator.geolocation not available')
      setGeoError('Tu navegador no soporta geolocalización.')
      setGeoStatus('error')
      return
    }

    setGeoStatus('loading')
    setGeoError('')
    console.log('[geo] 🟡 User triggered geolocation detection...')

    if (navigator.permissions) {
      const perm = await navigator.permissions.query({ name: 'geolocation' }).catch(() => null)
      console.log(`[geo] 🔑 Browser permission state: "${perm?.state}"`)
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng, accuracy } = pos.coords
        console.log(`[geo] ✅ Position received: lat=${lat.toFixed(6)}, lng=${lng.toFixed(6)}, accuracy=±${Math.round(accuracy)}m`)
        try {
          const url = `/api/geocode?lat=${lat}&lng=${lng}`
          console.log(`[geo] 🔄 Reverse geocoding via ${url}`)
          const res = await fetch(url)
          console.log(`[geo] 📡 /api/geocode HTTP ${res.status}`)
          const json = await res.json()
          console.log('[geo] 📦 Response:', json)
          const addr: string = json.address ?? ''
          if (addr) {
            console.log('[geo] 📍 Address resolved:', addr)
            update({ address: addr })
            setGeoAddress(addr)
            setGeoStatus('detected')
          } else {
            console.warn('[geo] ⚠️  No address in response')
            setGeoStatus('detected') // still show input, just empty
          }
        } catch (fetchErr) {
          console.error('[geo] ❌ /api/geocode failed:', fetchErr)
          setGeoStatus('detected') // fallback to manual
        }
      },
      async (err) => {
        const codeMap: Record<number, string> = { 1: 'PERMISSION_DENIED', 2: 'POSITION_UNAVAILABLE', 3: 'TIMEOUT' }
        const type = codeMap[err.code] ?? 'UNKNOWN'
        console.error(`[geo] ❌ ${type} (code=${err.code}) — "${err.message}"`)

        // POSITION_UNAVAILABLE: macOS CoreLocation failure (e.g. Location Services
        // disabled for Chrome). Auto-fallback to IP-based geolocation instead of
        // showing an error — gives a city-level approximation silently.
        if (err.code === 2) {
          console.log('[geo] 🔄 POSITION_UNAVAILABLE — trying IP geolocation fallback via /api/geoip')
          try {
            const geoIpRes = await fetch('/api/geoip')
            const geoIpData = await geoIpRes.json()
            console.log('[geo] 📦 /api/geoip response:', geoIpData)
            const { latitude: lat, longitude: lng, city, region, source } = geoIpData
            console.log(`[geo] 🌐 IP location: ${city}, ${region} (source: ${source})`)
            // Reverse-geocode the IP coords to get a street-level address
            const geocodeRes = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`)
            const geocodeData = await geocodeRes.json()
            console.log('[geo] 📦 /api/geocode response:', geocodeData)
            const addr: string = geocodeData.address ?? `${city}, ${region}, Chile`
            console.log('[geo] 📍 IP-based address:', addr)
            update({ address: addr })
            setGeoAddress(addr)
            setGeoStatus('detected')
            return
          } catch (ipErr) {
            console.error('[geo] ❌ IP geolocation fallback failed:', ipErr)
          }
        }

        const messages: Record<string, string> = {
          PERMISSION_DENIED: 'Permiso denegado. Activa la ubicación en tu navegador.',
          POSITION_UNAVAILABLE: 'No se pudo detectar la ubicación. Escribe tu dirección manualmente.',
          TIMEOUT: 'Tiempo de espera agotado. Intenta de nuevo.',
        }
        setGeoError(messages[type] ?? 'No se pudo obtener tu ubicación.')
        setGeoStatus('error')
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false }
    )
  }

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
    : STEP_TITLES[state.step] ?? 'Simula el costo de tu instalación'

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
          }),
        })

        if (res.ok) {
          const data = await res.json()
          const { formId, estimates } = data as { formId: string; estimates: any[] }

          const targetPotence = isWallbox ? 7 : 2.2
          const est = estimates.find((e: any) => Number(e.chargerPotence) === targetPotence) ?? estimates[0]

          if (est) {
            const chargerPrice = charger ? charger.precio : 0
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

  function handleSendEmail() {
    update({ emailSent: true })
  }

  function handleBookDate() {
    update({ booked: true, step: 4 })
  }

  function resetAll() {
    setState({
      step: 0,
      tipo: null,
      address: '',
      editingAddr: true,
      regionWarn: false,
      tipoC: null,
      chargerId: null,
      dist: 10,
      activePanel: null,
      depto: '',
      emailPago: '',
      emailPagoError: '',
      nombreEmail: '',
      emailSolo: '',
      emailSent: false,
      paid: false,
      selectedDate: null,
      booked: false,
      estimateLoading: false,
      apiResult: null,
      formId: null,
      webpayLoading: false,
      webpayError: '',
      webpayData: null,
    })
    setGeoStatus('loading')
    setGeoAddress('')
    setGeoError('')
    setShowManualInput(false)
    autoGeoStarted.current = false  // allow re-detection on next render cycle
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
              subtitle="Con comunidad"
            />
          </Grid>
        </Grid>

        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 1, color: '#2A3547' }}>
          Dirección de instalación
        </Typography>

        {/* ─── Loading (auto IP detection on mount) ─── */}
        {geoStatus === 'loading' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, mb: 1.5 }}>
            <Typography sx={{ fontSize: '1.1rem' }}>📍</Typography>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#2A3547' }}>Detectando tu ubicación…</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: TEXT_MUTED }}>Calculando automáticamente</Typography>
            </Box>
          </Box>
        )}

        {/* ─── Detected address box — shown when detected AND not in manual mode ─── */}
        {geoStatus === 'detected' && geoAddress && !showManualInput && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 1.5, mb: 1.5, bgcolor: 'rgba(8,152,185,0.06)', border: `1px solid rgba(8,152,185,0.25)`, borderRadius: 1.5 }}>
            <Typography sx={{ fontSize: '1rem', mt: 0.1, flexShrink: 0 }}>📍</Typography>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ fontSize: '0.72rem', fontWeight: 600, color: TEAL, display: 'block', mb: 0.5 }}>
                Ubicación detectada
              </Typography>
              <Typography component="h3" sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#2A3547', lineHeight: 1.4, m: 0 }}>
                {geoAddress}
              </Typography>
            </Box>
            {/* Action buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.25, flexShrink: 0 }}>
              <Button
                size="small"
                onClick={() => setShowManualInput(true)}
                sx={{ fontSize: '0.7rem', color: TEXT_MUTED, textTransform: 'none', minWidth: 'auto', whiteSpace: 'nowrap', py: 0.25, '&:hover': { color: '#2A3547' } }}
              >
                Editar
              </Button>
            </Box>
          </Box>
        )}

        {/* ─── Manual input — shown when user clicked Editar or geo failed ─── */}
        {(geoStatus === 'error' || showManualInput) && (
          <Box sx={{ mb: 1.5 }}>
            {geoStatus === 'error' && (
              <Alert
                severity="warning"
                sx={{ mb: 1.5, fontSize: '0.8rem', '& .MuiAlert-message': { lineHeight: 1.5 } }}
                action={
                  <Button size="small" onClick={requestGeoLocation} sx={{ fontSize: '0.7rem', color: 'inherit', textTransform: 'none' }}>
                    Reintentar
                  </Button>
                }
              >
                {geoError || 'No se pudo detectar la ubicación. Ingresa tu dirección manualmente.'}
              </Alert>
            )}
            <AddressInput2
              value={state.address}
              onAddressChange={(v) => update({ address: v, regionWarn: false })}
              onSelectAddress={(details) => {
                if (details) {
                  const full = [details.StreetAddress, details.City, details.State].filter(Boolean).join(', ')
                  update({ address: full, regionWarn: false })
                }
              }}
            />
            {/* Back to auto-detected address */}
            {geoStatus === 'detected' && geoAddress && (
              <Button
                size="small"
                onClick={() => setShowManualInput(false)}
                sx={{ mt: 0.75, fontSize: '0.78rem', color: TEAL, textTransform: 'none', p: 0, '&:hover': { bgcolor: 'transparent' } }}
              >
                ← Usar ubicación detectada
              </Button>
            )}
          </Box>
        )}

        {state.regionWarn && (
          <Alert severity="warning" sx={{ fontSize: '0.8rem', mt: 1 }}>
            Por el momento solo atendemos la Región Metropolitana y Valparaíso. Igualmente continúa para recibir tu cotización de referencia.
          </Alert>
        )}

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
                  return ch ? `${ch.name} — ${fmt(ch.precio)} — ${ch.kw} kW` : val
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
                    {c.name} — {fmt(c.precio)} — {c.kw} kW
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
            Tu estimación
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mt: 0.25 }}>
            {tipoLabel} · {chargerLabel} · {distLabel2}
          </Typography>
        </Box>

        {/* Price hero */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, mb: 0.5 }}>Total estimado (con IVA)</Typography>
          <Typography sx={{ fontSize: '2.5rem', fontWeight: 900, color: PINK, lineHeight: 1 }}>
            {fmt(displayResult.total)}
          </Typography>
        </Box>

        {/* Breakdown card */}
        <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mb: 2, color: '#2A3547' }}>Desglose</Typography>

          {!displayResult.isOwn && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#2A3547' }}>Cargador ({displayResult.chargerName})</Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{fmt(displayResult.chargerPrice)}</Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: '0.85rem', color: '#2A3547' }}>Materiales eléctricos</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{fmt(displayResult.mat)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: '0.85rem', color: '#2A3547' }}>Instalación certificada</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{fmt(displayResult.inst)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: '0.85rem', color: '#2A3547' }}>Trámite SEC</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{fmt(displayResult.sec)}</Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
            <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>Subtotal neto</Typography>
            <Typography sx={{ fontSize: '0.85rem' }}>{fmt(displayResult.neto)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
            <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>IVA 19%</Typography>
            <Typography sx={{ fontSize: '0.85rem' }}>{fmt(displayResult.iva)}</Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Total con IVA</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: PINK }}>{fmt(displayResult.total)}</Typography>
          </Box>
        </Box>

        {/* Info text below breakdown (Image #15) */}
        <Box sx={{ bgcolor: 'rgba(8,152,185,0.06)', border: `1px solid rgba(8,152,185,0.2)`, borderRadius: 1.5, px: 2, py: 1.25, mb: 3 }}>
          <Typography sx={{ fontSize: '0.8rem', color: '#0777a0', lineHeight: 1.5 }}>
            Incluye tablero, canalización, cableado y declaración TE6 ante SEC. Normativa RIC N°15.
          </Typography>
        </Box>

        {/* Pay button — red when panel hidden, gray when panel visible (acts as toggle) */}
        <Box sx={{ mb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              if (state.activePanel === 'pago') {
                update({ activePanel: null, webpayData: null, webpayError: '', webpayLoading: false, emailPagoError: '' })
              } else {
                update({ activePanel: 'pago', webpayData: null, webpayError: '', emailPagoError: '' })
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
            Pagar e iniciar proceso de instalación
          </Button>
        </Box>

        {/* Panel: pago */}
        {state.activePanel === 'pago' && (
          <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2, color: '#2A3547' }}>
              Datos para la instalación
            </Typography>

            {/* Address */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography sx={{ fontSize: '0.82rem', color: '#2A3547', flex: 1, bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 1, px: 1.5, py: 0.75 }}>
                {state.address || 'Sin dirección ingresada'}
              </Typography>
              <Button size="small" onClick={() => update({ step: 0 })} sx={{ color: TEAL, fontSize: '0.72rem', minWidth: 'auto', whiteSpace: 'nowrap' }}>
                Cambiar
              </Button>
            </Box>

            <TextField
              fullWidth
              size="small"
              label="Depto / Referencia (opcional)"
              value={state.depto}
              onChange={e => update({ depto: e.target.value })}
              sx={{ mb: 2 }}
            />

            {/* Email — required */}
            <TextField
              fullWidth
              size="small"
              required
              label="Email para comprobante *"
              type="email"
              value={state.emailPago}
              onChange={e => update({ emailPago: e.target.value, emailPagoError: '' })}
              error={!!state.emailPagoError}
              helperText={state.emailPagoError || 'Recibirás el comprobante de pago aquí'}
              sx={{ mb: 2.5 }}
            />

            {/* Webpay error */}
            {state.webpayError && (
              <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>
                {state.webpayError}.{' '}
                <Button size="small" onClick={initiatePayment} sx={{ textTransform: 'none', fontSize: '0.78rem', p: 0, color: 'inherit', textDecoration: 'underline' }}>
                  Reintentar
                </Button>
              </Alert>
            )}

            {/* Step A: Confirm button — shown before token is obtained */}
            {!state.webpayData && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  const email = state.emailPago.trim()
                  if (!email) {
                    update({ emailPagoError: 'El email es obligatorio para continuar' })
                    return
                  }
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    update({ emailPagoError: 'Ingresa un email válido' })
                    return
                  }
                  initiatePayment()
                }}
                disabled={state.webpayLoading}
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
                {state.webpayLoading ? 'Generando orden…' : 'Confirmar y continuar →'}
              </Button>
            )}

            {/* Step B: Webpay button — shown once token is ready */}
            {state.webpayData && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, p: 1.25, bgcolor: 'rgba(0,196,124,0.08)', borderRadius: 1.5, border: '1px solid rgba(0,196,124,0.25)' }}>
                  <Typography sx={{ fontSize: '0.8rem', color: '#166534' }}>✓ Orden generada · Comprobante se enviará a <strong>{state.emailPago}</strong></Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={submitWebpay}
                  sx={{
                    bgcolor: PINK,
                    color: '#fff',
                    '&:hover': { bgcolor: PINK_DARK },
                    fontWeight: 700,
                    py: 1.5,
                    fontSize: '0.95rem',
                    boxShadow: 'none',
                  }}
                >
                  {`Pagar ${fmt(displayResult.total)} con Webpay →`}
                </Button>
              </>
            )}

            <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED, textAlign: 'center', mt: 1 }}>
              Pago seguro · Visa, Mastercard, Redcompra, débito
            </Typography>
          </Box>
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
              '&:hover': { bgcolor: '#F8FAFC', borderColor: '#CBD5E1' },
              fontWeight: 600,
              fontSize: '0.85rem',
              py: 1.25,
              boxShadow: 'none',
            }}
          >
            Enviar mi cotización por email
          </Button>
        </Box>

        {/* Panel: email */}
        {state.activePanel === 'email' && (
          <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 2 }}>
            {state.emailSent ? (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography sx={{ fontSize: '2rem', mb: 1 }}>📬</Typography>
                <Typography sx={{ fontWeight: 700, color: SUCCESS, mb: 0.5 }}>¡Cotización enviada!</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED }}>Revisa tu bandeja de entrada.</Typography>
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
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSendEmail}
                  disabled={!state.emailSolo || !state.nombreEmail}
                  sx={{
                    bgcolor: TEAL,
                    '&:hover': { bgcolor: '#0777a0' },
                    fontWeight: 700,
                    py: 1.25,
                  }}
                >
                  Enviar cotización
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Trust box — redesigned */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: 3, mt: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547', mb: 2.5 }}>
            Tu compra protegida
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
              href="https://wa.me/56999999999?text=Hola,%20acabo%20de%20agendar%20mi%20instalación%20de%20cargador%20EV"
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
      <Box sx={{ background: `linear-gradient(180deg, ${TEAL_LIGHT} 10%, ${TEAL} 80%)`, pt: { xs: '10px', md: '64px' }, pb: { xs: 2, md: 4 } }}>
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
          {!state.booked && <WizardStepper step={state.step} paid={state.paid} booked={state.booked} />}
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

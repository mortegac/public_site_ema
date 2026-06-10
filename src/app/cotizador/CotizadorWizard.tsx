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

const PARKING_FLOORS = [
  'Piso 1', 'Piso 2', 'Piso 3',
  'Subterráneo -1', 'Subterráneo -2', 'Subterráneo -3', 'Subterráneo -4',
]

// ─── Data ────────────────────────────────────────────────────────────────────
const CHARGERS = [
  // Portable
  { id: 'workersbee', name: 'Workersbee 2.2–7 kW', tipo: 'portable', kw: '2.2–7', desc: 'Portable · Potencia regulable · Cable de carga', precio: 299000, stock: 2 },
  // Wallbox — sincronizado con Prismic products (10 jun 2026)
  { id: 'zeero', name: 'ZEERO Minibox 7 kW', tipo: 'wallbox', kw: '7', desc: 'Wallbox · Con stock', precio: 549989, stock: 5 },
  { id: 'effitec', name: 'EFFITEC 7 kW', tipo: 'wallbox', kw: '7.3', desc: 'Cable tipo 2 · Con stock', precio: 599900, stock: 5 },
  { id: 'livoltek', name: 'LIVOLTEK Smart EV 7.3 kW', tipo: 'wallbox', kw: '7.3', desc: 'Wallbox · Con stock', precio: 650000, stock: 3 },
  { id: 'kpn-app', name: 'KPN Wallbox KBox App', tipo: 'wallbox', kw: '7.3', desc: 'Wallbox · App de usuario', precio: 606900, stock: 5 },
  { id: 'beste-s', name: 'BESTE TS-EVC07-003(S) 7.3 kW', tipo: 'wallbox', kw: '7.3', desc: 'Cable tipo 2 · Con stock', precio: 773500, stock: 5 },
  { id: 'beste-mini', name: 'BESTE Smart Mini 7.3 kW', tipo: 'wallbox', kw: '7.3', desc: 'Diseño compacto · Con stock', precio: 773500, stock: 5 },
  { id: 'kpn-ocpp', name: 'KPN Wallbox KBox OCPP 1.6', tipo: 'wallbox', kw: '7.3', desc: 'Protocolo OCPP · Con stock', precio: 779450, stock: 5 },
  { id: 'beny', name: 'BENY 7 kW', tipo: 'wallbox', kw: '7.3', desc: 'Wallbox · Con stock', precio: 889800, stock: 3 },
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
  activePanel: 'pago' | 'email' | 'visitaPago' | 'electrolinera' | null
  visitaTelefono: string
  depto: string
  emailPago: string
  nombreEmail: string
  emailSolo: string
  emailSent: boolean
  electrolineraSubmitted: boolean
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
    chargerGrossPrice: number
    installGross: number
  } | null
  formId: string | null
  nextVisitDate: string | null
  webpayLoading: boolean
  webpayError: string
  webpayData: { order: string; token: string; url: string; buy_order: string } | null
  customerSaving: boolean
  customerSaved: boolean
  selectedReserveOption: 'r70' | 'r30' | 'visita' | null
  reservePendingAmount: number | null
  reservePendingGlosa: string
  showEdificioData: boolean
  edificioFloor: string
  edificioParkingFloor: string
  edificioVisitorParking: boolean | null
  edificioOption: 'dedicated' | 'shared' | null
  removedChargerId: string | null  // remembers charger id when user clicks "quitar"
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
  chargerGrossPrice: number  // charger.precio (gross with IVA), 0 if no charger
  installGross: number       // (mat+inst+sec) * 1.19 — installation only, WITH IVA, NO charger
}

// ─── Price calc ───────────────────────────────────────────────────────────────
function calcResult(state: WizardState, chargers: typeof CHARGERS = CHARGERS): CalcResult | null {
  if (!state.tipo || !state.tipoC) return null
  const base = INSTALL_BASE[state.tipo]
  const f = dFactor(state.dist) * TIPO_FACTOR[state.tipo]
  const mat = Math.round(base.mat * f)
  const inst = Math.round(base.inst * f)
  const sec = base.sec
  const charger = state.chargerId === 'own' ? null : chargers.find(c => c.id === state.chargerId)
  // todos los precios en CHARGERS son bruto (IVA incluido)
  const chargerPrice = charger ? Math.round(charger.precio / 1.19) : 0
  const chargerGrossPrice = charger ? charger.precio : 0
  const chargerName = state.chargerId === 'own' ? 'Ya tiene cargador' : (charger?.name ?? '')
  const neto = mat + inst + sec + chargerPrice
  const iva = Math.round(neto * 0.19)
  const installGross = Math.round((mat + inst + sec) * 1.19)
  return { mat, inst, sec, chargerPrice, chargerName, neto, iva, total: neto + iva, isOwn: state.chargerId === 'own', chargerGrossPrice, installGross }
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
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547' }}>{fmt(Math.round(charger.precio / 1.19))}</Typography>
        <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED }}>+IVA</Typography>
      </Box>
    </Box>
  )
}

// Maps UI dropdown value to ClientFormParkingLevel enum
function mapParkingLevel(val: string): string | undefined {
  if (!val) return undefined
  if (val.startsWith('Piso')) return 'groundLevel'
  if (val === 'Subterráneo -1') return 'underground1'
  if (val === 'Subterráneo -2') return 'underground2'
  if (val === 'Subterráneo -3') return 'underground3'
  if (val === 'Subterráneo -4') return 'underground4'
  return undefined
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
    visitaTelefono: '',
    depto: '',
    emailPago: '',
    nombreEmail: '',
    emailSolo: '',
    emailSent: false,
    electrolineraSubmitted: false,
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
    selectedReserveOption: null,
    reservePendingAmount: null,
    reservePendingGlosa: '',
    showEdificioData: false,
    edificioFloor: '',
    edificioParkingFloor: '',
    edificioVisitorParking: null,
    edificioOption: null,
    removedChargerId: null,
  })

  // Initialize dates client-only to avoid SSR/hydration mismatch (Math.random + Date)
  const [dates, setDates] = useState<Array<{ label: string; available: boolean }>>([])
  useEffect(() => { setDates(genDates()) }, [])

  // Charger list — loaded from /api/charger, falls back to static CHARGERS
  const [chargerList, setChargerList] = useState<typeof CHARGERS>(CHARGERS)
  useEffect(() => {
    fetch('/api/charger')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.chargers) && d.chargers.length > 0) setChargerList(d.chargers) })
      .catch(() => {/* keep static fallback */})
  }, [])

  const result = calcResult(state, chargerList)

  // ─── Derived ─────────────────────────────────────────────────────────────
  const canNext = (() => {
    if (state.step === 0) return state.tipo !== null
    if (state.step === 1) {
      if (!state.tipoC) return false
      if (state.tipo === 'edificio') return state.edificioFloor.trim() !== '' && state.edificioParkingFloor !== ''
      return true
    }
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
    // Trigger cotizar API from step 1 (both casa and edificio)
    if (state.step === 1) {
      update({ estimateLoading: true })
      try {
        const isWallbox = state.tipoC === 'wallbox'
        const isPortable = state.tipoC === 'portable'
        const isHouse = state.tipo === 'casa'
        const charger = state.chargerId !== 'own' ? chargerList.find(c => c.id === state.chargerId) : null

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
            ...(state.tipo === 'edificio' ? {
              apartmentFloor: state.edificioFloor || undefined,
              parkingLevel: mapParkingLevel(state.edificioParkingFloor),
              hasVisitorParking: state.edificioVisitorParking ?? undefined,
            } : {}),
          }),
        })

        if (res.ok) {
          const data = await res.json()
          const { formId, estimates } = data as { formId: string; estimates: any[] }

          const targetPotence = isWallbox ? 7 : 2.2
          const est = estimates.find((e: any) => Number(e.chargerPotence) === targetPotence) ?? estimates[0]

          if (est) {
            const chargerPrice = charger ? Math.round(charger.precio / 1.19) : 0
            const chargerGrossPrice = charger ? charger.precio : 0
            const chargerName = state.chargerId === 'own' ? 'Ya tiene cargador' : (charger?.name ?? '')
            const secTramite = isHouse ? INSTALL_BASE.casa.sec : INSTALL_BASE.edificio.sec
            const installNeto = Number(est.netPrice ?? 0)
            const totalNeto = installNeto + chargerPrice + secTramite
            const totalIva = Math.round(totalNeto * 0.19)
            const apiMat = Number(est.materialsCost ?? 0)
            const apiInst = Number(est.installationCost ?? 0)
            const installGross = Math.round((apiMat + apiInst + secTramite) * 1.19)
            update({
              estimateLoading: false,
              step: 2,
              formId,
              nextVisitDate: (data as any).nextAvailableDate ?? null,
              apiResult: {
                mat: apiMat,
                inst: apiInst,
                sec: secTramite,
                chargerPrice,
                chargerName,
                neto: totalNeto,
                iva: totalIva,
                total: totalNeto + totalIva,
                isOwn: state.chargerId === 'own',
                chargerGrossPrice,
                installGross,
              },
            })
            return
          }
        } else {
          const err = await res.json().catch(() => ({}))
          console.error('[cotizador] /api/cotizar error:', err)
        }
      } catch (err) {
        console.error('[cotizador] fetch /api/cotizar failed, falling back to local calc:', err)
      }
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

  // ─── Step tracking helper ─────────────────────────────────────────────────────

  function updateFormStep(formId: string | null, step: string) {
    if (!formId) return
    fetch('/api/update-step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formId, step }),
    }).catch(() => null)
  }

  // Calls /api/payment and immediately submits form to Webpay (no intermediate panel)
  async function payDirect(amount: number, glosa: string, typeOfCart: 'chargerInstallation' | 'visit' = 'chargerInstallation', pendingCart?: { amount: number; glosa: string }) {
    update({ webpayLoading: true, webpayError: '' })
    const displayResult = state.apiResult ?? result
    const vat = Math.round(amount * 0.19 / 1.19)

    // Save customer non-blocking — links nombre + teléfono before payment
    const email = state.emailPago?.trim().toLowerCase()
    if (email) {
      fetch('/api/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: state.nombreEmail || email,
          phone: state.visitaTelefono || state.depto || '',
          address: state.address || '',
          city: state.addressCity || '',
          state: state.addressState || '',
          zipCode: state.addressZipCode || '',
          lat: state.addressLat || '',
          lng: state.addressLng || '',
          depto: state.depto || '',
          typeOfResidence: state.tipo === 'casa' ? 'house' : 'appartment',
          formId: state.formId ?? null,
        }),
      }).catch(() => null)
    }

    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total: amount,
          vat,
          email: email || undefined,
          address: state.address || undefined,
          tipo: state.tipo,
          chargerName: displayResult?.chargerName ?? '',
          dist: state.dist,
          glosa,
          formId: state.formId ?? undefined,
          typeOfCart,
          typeOfItem: typeOfCart,
          ...(pendingCart ? { pendingAmount: pendingCart.amount, pendingGlosa: pendingCart.glosa } : {}),
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.token) throw new Error(data.error ?? 'Error al iniciar el pago')

      const isEdificioVisit = typeOfCart === 'visit' && state.tipo === 'edificio'
      console.log('[payDirect] typeOfCart:', typeOfCart, '| state.tipo:', state.tipo, '| isEdificioVisit:', isEdificioVisit)
      sessionStorage.setItem('paymentData', JSON.stringify({
        tipo: state.tipo ?? '',
        chargerName: displayResult?.chargerName ?? '',
        dist: state.dist,
        address: state.address,
        depto: state.depto ?? '',
        email: state.emailPago ?? '',
        nombre: state.nombreEmail ?? '',
        telefono: state.visitaTelefono ?? '',
        total: amount,
        neto: amount - vat,
        iva: vat,
        chargerPrice: displayResult?.chargerPrice ?? 0,
        mat: displayResult?.mat ?? 0,
        inst: displayResult?.inst ?? 0,
        sec: displayResult?.sec ?? 0,
        isOwn: displayResult?.isOwn ?? false,
        formId: state.formId ?? '',
        ...(isEdificioVisit ? { paymentType: 'edificioVisita' } : {}),
      }))
      console.log('[payDirect] sessionStorage.paymentData written:', sessionStorage.getItem('paymentData'))
      sessionStorage.removeItem('wizardContext')

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.url
      const tokenInput = document.createElement('input')
      tokenInput.type = 'hidden'
      tokenInput.name = 'token_ws'
      tokenInput.value = data.token
      form.appendChild(tokenInput)
      document.body.appendChild(form)
      form.submit()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al procesar el pago'
      update({ webpayLoading: false, webpayError: message })
    }
  }

  // ─── Webpay payment flow ─────────────────────────────────────────────────────

  // Step 1: called when user presses "Pagar e iniciar proceso de instalación"
  // Calls /api/payment, stores the token, and opens the panel
  async function initiatePayment() {
    const displayResult = state.apiResult ?? result
    if (!displayResult) return

    // Ensure customer is saved with name when user clicks "Reservar instalación"
    const customerEmail = (state.emailPago || state.emailSolo || '').trim().toLowerCase()
    const customerName = state.nombreEmail?.trim()
    if (customerEmail && /\S+@\S+\.\S+/.test(customerEmail)) {
      fetch('/api/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerEmail,
          ...(customerName ? { name: customerName } : {}),
          address: state.address || '',
          city: state.addressCity || '',
          state: state.addressState || '',
          zipCode: state.addressZipCode || '',
          lat: state.addressLat || '',
          lng: state.addressLng || '',
          depto: state.depto || '',
          typeOfResidence: state.tipo === 'casa' ? 'house' : state.tipo === 'edificio' ? 'appartment' : 'other',
          formId: state.formId ?? null,
        }),
      }).catch(() => null) // best-effort, don't block payment flow
    }

    // Update ClientForm step to PENDING_PAYMENT
    updateFormStep(state.formId, '3')

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
          ...(state.formId ? { formId: state.formId } : {}),
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
      customerName: state.nombreEmail ?? '',
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

      // Also save directly via /api/customer to ensure name is persisted reliably
      fetch('/api/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: state.emailSolo,
          name: state.nombreEmail,
          address: state.address || '',
          formId: state.formId ?? null,
        }),
      }).catch(() => null)

      // Build quote HTML for the email template
      const charger = chargerList.find(c => c.id === state.chargerId)
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

      // Update ClientForm step to QUOTE_SENT
      updateFormStep(state.formId, '2')

      update({
        emailSent: true,
        emailSending: false,
        // Pre-fill payment email + mark customer as saved (already saved via send-quote-to-email)
        ...(state.emailSolo && !state.emailPago ? { emailPago: state.emailSolo, customerSaved: true } : {}),
      })
    } catch {
      update({ emailSending: false, emailError: 'No se pudo enviar. Intenta nuevamente.' })
    }
  }

  function handleBookDate() {
    update({ booked: true, step: 4 })
  }

  function resetAll() {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
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
      visitaTelefono: '',
      depto: '',
      emailPago: '',
      nombreEmail: '',
      emailSolo: '',
      emailSent: false,
      electrolineraSubmitted: false,
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
      selectedReserveOption: null,
      reservePendingAmount: null,
      reservePendingGlosa: '',
      showEdificioData: false,
      edificioFloor: '',
      edificioParkingFloor: '',
      edificioVisitorParking: null,
      edificioOption: null,
      removedChargerId: null,
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
    const portables = chargerList.filter(c => c.tipo === 'portable')
    const wallboxes = chargerList.filter(c => c.tipo === 'wallbox')

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
                  return ch ? `${ch.name} — ${fmt(Math.round(ch.precio / 1.19))} +IVA — ${ch.kw} kW` : val
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
                    {c.name} — {fmt(Math.round(c.precio / 1.19))} +IVA — {c.kw} kW
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

        {/* Edificio extra fields — only shown when tipo === 'edificio' */}
        {state.tipo === 'edificio' && (
          <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${BORDER}` }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.5, color: '#2A3547' }}>
              Cuéntanos de tu edificio
            </Typography>
            <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, mb: 2.5, lineHeight: 1.6 }}>
              El costo depende del recorrido del cable desde el tablero común hasta tu estacionamiento.
            </Typography>

            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 1, color: '#2A3547' }}>
              ¿En qué piso vives?
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="number"
              placeholder="5"
              inputProps={{ min: -10, max: 60 }}
              value={state.edificioFloor}
              onChange={e => update({ edificioFloor: e.target.value })}
              sx={{
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#fff',
                  '& fieldset': { borderColor: BORDER },
                  '&:hover fieldset': { borderColor: TEAL },
                  '&.Mui-focused fieldset': { borderColor: TEAL },
                },
              }}
            />

            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 1, color: '#2A3547' }}>
              ¿En qué piso está tu estacionamiento?
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 2.5 }}>
              <Select
                displayEmpty
                value={state.edificioParkingFloor}
                onChange={(e: SelectChangeEvent<string>) => update({ edificioParkingFloor: e.target.value as string })}
                renderValue={(val: string) =>
                  val
                    ? val
                    : <Typography sx={{ color: TEXT_MUTED, fontSize: '0.875rem' }}>Selecciona un piso…</Typography>
                }
                sx={{
                  bgcolor: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: BORDER },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: TEAL },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: TEAL },
                  fontSize: '0.875rem',
                }}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{ color: TEXT_MUTED, fontSize: '0.875rem' }}>Selecciona un piso…</Typography>
                </MenuItem>
                {PARKING_FLOORS.map(f => (
                  <MenuItem key={f} value={f} sx={{ fontSize: '0.875rem' }}>{f}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 0.5, color: '#2A3547' }}>
              ¿Tu edificio tiene estacionamiento de visitas?
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: TEXT_MUTED, mb: 1.5 }}>
              Es donde podríamos instalar la electrolinera compartida.
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Box
                  onClick={() => update({ edificioVisitorParking: true })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && update({ edificioVisitorParking: true })}
                  sx={{
                    border: `2px solid ${state.edificioVisitorParking === true ? PINK : BORDER}`,
                    borderRadius: 2,
                    p: 2,
                    cursor: 'pointer',
                    bgcolor: state.edificioVisitorParking === true ? 'rgba(232,26,104,0.04)' : '#fff',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: PINK, bgcolor: 'rgba(232,26,104,0.04)' },
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: state.edificioVisitorParking === true ? PINK : '#2A3547' }}>
                    Sí
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Box
                  onClick={() => update({ edificioVisitorParking: false })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && update({ edificioVisitorParking: false })}
                  sx={{
                    border: `2px solid ${state.edificioVisitorParking === false ? PINK : BORDER}`,
                    borderRadius: 2,
                    p: 2,
                    cursor: 'pointer',
                    bgcolor: state.edificioVisitorParking === false ? 'rgba(232,26,104,0.04)' : '#fff',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: PINK, bgcolor: 'rgba(232,26,104,0.04)' },
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: state.edificioVisitorParking === false ? PINK : '#2A3547' }}>
                    No
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    )
  }

  // ─── Step: edificio data collection ──────────────────────────────────────────
  function renderEdificioData() {
    return (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#2A3547' }}>
          Cuéntanos de tu edificio
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, mb: 3, lineHeight: 1.6 }}>
          En edificios el costo depende del recorrido del cable desde el tablero común hasta tu estacionamiento.
        </Typography>

        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 1, color: '#2A3547' }}>
          ¿En qué piso vives?
        </Typography>
        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="5"
          inputProps={{ min: -10, max: 60 }}
          value={state.edificioFloor}
          onChange={e => update({ edificioFloor: e.target.value })}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              bgcolor: '#fff',
              '& fieldset': { borderColor: BORDER },
              '&:hover fieldset': { borderColor: TEAL },
              '&.Mui-focused fieldset': { borderColor: TEAL },
            },
          }}
        />

        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 1, color: '#2A3547' }}>
          ¿En qué piso está tu estacionamiento?
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 3 }}>
          <Select
            displayEmpty
            value={state.edificioParkingFloor}
            onChange={(e: SelectChangeEvent<string>) => update({ edificioParkingFloor: e.target.value as string })}
            renderValue={(val: string) =>
              val
                ? val
                : <Typography sx={{ color: TEXT_MUTED, fontSize: '0.875rem' }}>Selecciona un piso…</Typography>
            }
            sx={{
              bgcolor: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: BORDER },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: TEAL },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: TEAL },
              fontSize: '0.875rem',
            }}
          >
            <MenuItem value="" disabled>
              <Typography sx={{ color: TEXT_MUTED, fontSize: '0.875rem' }}>Selecciona un piso…</Typography>
            </MenuItem>
            {PARKING_FLOORS.map(f => (
              <MenuItem key={f} value={f} sx={{ fontSize: '0.875rem' }}>{f}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 0.5, color: '#2A3547' }}>
          ¿Tu edificio tiene estacionamiento de visitas?
        </Typography>
        <Typography sx={{ fontSize: '0.78rem', color: TEXT_MUTED, mb: 1.5 }}>
          Es donde podríamos instalar la electrolinera compartida.
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Box
              onClick={() => update({ edificioVisitorParking: true })}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && update({ edificioVisitorParking: true })}
              sx={{
                border: `2px solid ${state.edificioVisitorParking === true ? PINK : BORDER}`,
                borderRadius: 2,
                p: 2,
                cursor: 'pointer',
                bgcolor: state.edificioVisitorParking === true ? 'rgba(232,26,104,0.04)' : '#fff',
                textAlign: 'center',
                transition: 'all 0.2s',
                '&:hover': { borderColor: PINK, bgcolor: 'rgba(232,26,104,0.04)' },
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: state.edificioVisitorParking === true ? PINK : '#2A3547' }}>
                Sí
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Box
              onClick={() => update({ edificioVisitorParking: false })}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && update({ edificioVisitorParking: false })}
              sx={{
                border: `2px solid ${state.edificioVisitorParking === false ? PINK : BORDER}`,
                borderRadius: 2,
                p: 2,
                cursor: 'pointer',
                bgcolor: state.edificioVisitorParking === false ? 'rgba(232,26,104,0.04)' : '#fff',
                textAlign: 'center',
                transition: 'all 0.2s',
                '&:hover': { borderColor: PINK, bgcolor: 'rgba(232,26,104,0.04)' },
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: state.edificioVisitorParking === false ? PINK : '#2A3547' }}>
                No
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }

  // ─── Step 2: edificio option selector ────────────────────────────────────────
  function renderStep2Edificio() {
    const localResult = result
    const displayResult = state.apiResult ?? localResult
    if (!displayResult) return null

    const RANGE_LOW = 1350000
    const RANGE_HIGH = 3110000

    return (
      <Box>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#2A3547' }}>
            Tu estimación referencial
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mt: 0.25 }}>
            Edificio · recorrido estimado {state.dist} m
          </Typography>
        </Box>

        {/* Community notice */}
        <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 1.5, p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 0.75, alignItems: 'flex-start' }}>
            <Typography sx={{ fontSize: '1rem', flexShrink: 0 }}>🏢</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#2A3547', lineHeight: 1.4 }}>
              En un edificio no decides solo: necesitas el OK de la comunidad
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, lineHeight: 1.6, pl: '1.75rem' }}>
            Por eso no te cobramos una instalación que aún no está aprobada. Te damos las herramientas para conseguir ese permiso — y la opción que casi siempre lo logra más rápido.
          </Typography>
        </Box>

        {/* Price range */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '0.72rem', color: TEXT_MUTED, mb: 0.5, letterSpacing: '0.03em' }}>
            Rango referencial de instalación dedicada
          </Typography>
          <Typography sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' }, fontWeight: 900, color: '#2A3547', lineHeight: 1.1 }}>
            {fmt(RANGE_LOW)} – {fmt(RANGE_HIGH)}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, mt: 0.5 }}>
            El precio definitivo se confirma con visita técnica.
          </Typography>
        </Box>

        {/* Option 1: Instalación dedicada */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: { xs: 2, sm: 2.5 }, mb: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547', mb: 0.75 }}>
            Instalación dedicada en tu estacionamiento
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, mb: 2, lineHeight: 1.6 }}>
            Recibe tu presupuesto definitivo <strong>+ el kit para conseguir la aprobación</strong> de tu comunidad.
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', mb: 1.25, color: '#2A3547' }}>
            Después de pagar la visita recibes:
          </Typography>
          {[
            'Visita técnica con profesional certificado SEC',
            'Presupuesto definitivo en 48 horas',
            'Carta tipo para presentar a la administración',
            'Memoria técnica firmada',
            'Fotos del recorrido propuesto',
          ].map(item => (
            <Box key={item} sx={{ display: 'flex', gap: 1, mb: 0.75, alignItems: 'flex-start' }}>
              <Typography sx={{ color: SUCCESS, fontWeight: 700, flexShrink: 0, fontSize: '0.9rem' }}>✓</Typography>
              <Typography sx={{ fontSize: '0.82rem', color: '#2A3547', lineHeight: 1.5 }}>{item}</Typography>
            </Box>
          ))}

          <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${BORDER}` }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1.5 }}>
              <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', color: '#2A3547' }}>$29.000</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: TEXT_MUTED }}>acreditable al presupuesto final</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              onClick={() => update({ activePanel: state.activePanel === 'visitaPago' ? null : 'visitaPago' })}
              sx={{
                bgcolor: state.activePanel === 'visitaPago' ? '#94A3B8' : PINK,
                '&:hover': { bgcolor: state.activePanel === 'visitaPago' ? '#64748B' : PINK_DARK },
                fontWeight: 700,
                py: 1.25,
                fontSize: '0.9rem',
                boxShadow: 'none',
                borderRadius: 2,
              }}
            >
              Pagar visita y recibir mi kit →
            </Button>
          </Box>
        </Box>

        {/* Panel datos de contacto para visita técnica */}
        {state.activePanel === 'visitaPago' && (
          <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2, color: '#2A3547' }}>
              Datos para el comprobante
            </Typography>
            {/* Address */}
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
            {state.address && !isRegionMetropolitana(state.address) && (
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#FEF3C7', border: '1px solid #FCD34D', mb: 2 }}>
                <Typography sx={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 600 }}>
                  Solo atendemos Región Metropolitana y Valparaíso
                </Typography>
              </Box>
            )}
            <TextField
              fullWidth
              size="small"
              label="Tu nombre completo (opcional)"
              value={state.nombreEmail}
              onChange={e => update({ nombreEmail: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              size="small"
              required
              label="Email para comprobante"
              type="email"
              value={state.emailPago}
              onChange={e => update({ emailPago: e.target.value })}
              helperText="Requerido para proceder al pago"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              size="small"
              label="Teléfono"
              type="tel"
              value={state.visitaTelefono}
              onChange={e => update({ visitaTelefono: e.target.value })}
              sx={{ mb: 2.5 }}
            />
            {state.webpayError && (
              <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>
                {state.webpayError}
              </Alert>
            )}
            <Button
              fullWidth
              variant="contained"
              disabled={!state.emailPago.trim() || !state.addressValidated || state.webpayLoading}
              onClick={() => payDirect(29000, 'Visita técnica · Instalación dedicada edificio', 'visit')}
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
              {state.webpayLoading ? 'Redirigiendo…' : 'Pagar $29.000 con Webpay →'}
            </Button>
            <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED, textAlign: 'center', mt: 1 }}>
              Pago seguro · Visa, Mastercard, Redcompra, débito
            </Typography>
          </Box>
        )}

        {/* Option 2: Electrolinera compartida */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, overflow: 'hidden', mb: 3 }}>
          <Box sx={{ bgcolor: PINK, px: 2, py: 0.875, display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Typography sx={{ fontSize: '0.8rem' }}>🔥</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '0.72rem', color: '#fff', letterSpacing: '0.08em' }}>
              LA MÁS ELEGIDA
            </Typography>
          </Box>
          <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547', mb: 0.5 }}>
              Electrolinera compartida · sin costo para ti
            </Typography>
            <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, mb: 2, lineHeight: 1.6 }}>
              Energica instala y financia un cargador en el estacionamiento de visitas. Pagas solo lo que cargas.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, mb: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: '2rem', color: '#2A3547', lineHeight: 1 }}>$0</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED }}>inversión</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#2A3547', lineHeight: 1 }}>$330/kWh</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED }}>solo lo que cargas</Typography>
              </Box>
            </Box>

            {[
              'Sin obra en tu estacionamiento privado',
              'No requiere asamblea sobre tu estacionamiento, solo permiso de uso común',
              'La opción más fácil y rápida de aprobar',
            ].map(item => (
              <Box key={item} sx={{ display: 'flex', gap: 1, mb: 0.75, alignItems: 'flex-start' }}>
                <Typography sx={{ color: SUCCESS, fontWeight: 700, flexShrink: 0, fontSize: '0.9rem' }}>✓</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: '#2A3547', lineHeight: 1.5 }}>{item}</Typography>
              </Box>
            ))}

            <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', mt: 2, mb: 1.25, color: '#2A3547' }}>
              Te entregamos para tu comité:
            </Typography>
            {[
              'Presentación lista para llevar a la reunión',
              'Carta de solicitud de autorización',
              'Visita comercial a la administración (si la pides)',
            ].map(item => (
              <Box key={item} sx={{ display: 'flex', gap: 1, mb: 0.75, alignItems: 'flex-start' }}>
                <Typography sx={{ color: SUCCESS, fontWeight: 700, flexShrink: 0, fontSize: '0.9rem' }}>✓</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: '#2A3547', lineHeight: 1.5 }}>{item}</Typography>
              </Box>
            ))}

            <Box sx={{ mt: 2.5 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => update({ activePanel: state.activePanel === 'electrolinera' ? null : 'electrolinera' })}
                sx={{
                  bgcolor: state.activePanel === 'electrolinera' ? '#94A3B8' : PINK,
                  '&:hover': { bgcolor: state.activePanel === 'electrolinera' ? '#64748B' : PINK_DARK },
                  fontWeight: 700,
                  py: 1.25,
                  fontSize: '0.9rem',
                  boxShadow: 'none',
                  borderRadius: 2,
                }}
              >
                Quiero electrolinera en mi edificio →
              </Button>
              {state.activePanel === 'electrolinera' && (
                <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${BORDER}` }}>
                  {state.electrolineraSubmitted ? (
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                      <Typography sx={{ fontSize: '2rem', mb: 1 }}>✅</Typography>
                      <Typography sx={{ fontWeight: 700, color: '#166534', mb: 0.5, fontSize: '1rem' }}>
                        ¡Postulación enviada correctamente!
                      </Typography>
                      <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, lineHeight: 1.6 }}>
                        Nuestro equipo evaluará la factibilidad técnica. Recibirás una respuesta lo antes posible.
                      </Typography>
                    </Box>
                  ) : (
                    <>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.5, color: '#2A3547' }}>
                    Regístrate para recibir tu kit
                  </Typography>
                  <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, mb: 2, lineHeight: 1.5 }}>
                    Te enviamos todo lo que necesitas para presentar en la próxima reunión de tu comunidad.
                  </Typography>
                  {/* Dirección con validación Google Maps + RM only */}
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 1, color: '#2A3547' }}>
                    Dirección del edificio
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
                          update({ address: full, addressValidated: true, addressCity: details.City ?? '', addressState: details.State ?? '', addressZipCode: details.ZipCode ?? '', addressLat: String(details.Latitude ?? ''), addressLng: String(details.Longitude ?? ''), regionWarn: false })
                        }
                      }}
                    />
                  </Box>
                  {state.address && !state.addressValidated && (
                    <Typography sx={{ fontSize: '0.75rem', color: 'error.main', mb: 1.5, ml: 0.25 }}>
                      Selecciona una dirección del menú desplegable para continuar
                    </Typography>
                  )}
                  {state.address && !isRegionMetropolitana(state.address) && (
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#FEF3C7', border: '1px solid #FCD34D', mb: 2 }}>
                      <Typography sx={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 600 }}>
                        Solo atendemos Región Metropolitana y Valparaíso
                      </Typography>
                    </Box>
                  )}
                  <TextField fullWidth size="small" label="Nombre"
                    value={state.nombreEmail} onChange={e => update({ nombreEmail: e.target.value })} sx={{ mb: 2 }} />
                  <TextField fullWidth size="small" label="Email" type="email"
                    value={state.emailPago} onChange={e => update({ emailPago: e.target.value })} sx={{ mb: 2 }} />
                  <TextField fullWidth size="small" label="Teléfono" type="tel"
                    value={state.visitaTelefono} onChange={e => update({ visitaTelefono: e.target.value })} sx={{ mb: 2.5 }} />
                  {state.webpayError && (
                    <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>{state.webpayError}</Alert>
                  )}
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!state.emailPago.trim() || !state.addressValidated || state.webpayLoading}
                    onClick={async () => {
                      if (!state.emailPago.trim() || !state.addressValidated) return
                      update({ webpayLoading: true, webpayError: '' })
                      try {
                        initEmailjs('UYcrSeCqLGW8xqT4S')
                        const parkingLabel = state.edificioParkingFloor || 'No indicado'
                        const visitasLabel = state.edificioVisitorParking === true ? 'Sí' : state.edificioVisitorParking === false ? 'No' : 'No indicado'
                        await emailjs.send('service_dbrrm6b', 'template_eysyecb', {
                          to_email: state.emailPago,
                          name: state.nombreEmail || state.emailPago,
                          subject: `Nueva postulación electrolinera — ${state.nombreEmail || state.emailPago}`,
                          CONTENT_HTML: `
                            <h3 style="font-family:sans-serif;">Nueva postulación: Electrolinera compartida en edificio</h3>
                            <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:13px;">
                              <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;color:#4B4B5C;">Nombre</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${state.nombreEmail || '—'}</td></tr>
                              <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;color:#4B4B5C;">Email</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${state.emailPago}</td></tr>
                              <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;color:#4B4B5C;">Teléfono</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${state.visitaTelefono || '—'}</td></tr>
                              <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;color:#4B4B5C;">Dirección edificio</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${state.address || '—'}</td></tr>
                              <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;color:#4B4B5C;">Piso departamento</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${state.edificioFloor || '—'}</td></tr>
                              <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;color:#4B4B5C;">Piso estacionamiento</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${parkingLabel}</td></tr>
                              <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;color:#4B4B5C;">¿Tiene estacionamiento visitas?</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${visitasLabel}</td></tr>
                            </table>
                            <p style="font-family:sans-serif;font-size:13px;color:#4B4B5C;line-height:1.6;margin-top:16px;">
                              Nuestro equipo evaluará la factibilidad técnica y la coordinación con la administración o entidad responsable.<br><br>
                              💡 Este programa está orientado a comunidades, establecimientos y espacios de alto tránsito que busquen fomentar la movilidad eléctrica y compartir el beneficio entre sus residentes, huéspedes, clientes o colaboradores.<br><br>
                              Recibirás una respuesta de nuestros consultores lo antes posible.
                            </p>`,
                        })
                        update({ webpayLoading: false, electrolineraSubmitted: true })
                      } catch {
                        update({ webpayLoading: false, webpayError: 'No se pudo enviar. Intenta nuevamente.' })
                      }
                    }}
                    sx={{
                      bgcolor: PINK, color: '#fff',
                      '&:hover': { bgcolor: PINK_DARK },
                      '&:disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
                      fontWeight: 700, py: 1.5, fontSize: '0.95rem', boxShadow: 'none', borderRadius: 2,
                    }}
                  >
                    {state.webpayLoading ? 'Enviando…' : 'Quiero electrolinera en mi edificio →'}
                  </Button>
                  <Typography sx={{ fontSize: '0.72rem', color: TEXT_MUTED, textAlign: 'center', mt: 1 }}>
                    Sin compromiso si la comunidad la rechaza.
                  </Typography>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Cómo se aprueba en tu edificio */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: { xs: 2.5, sm: 3 }, mb: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547', mb: 2.5 }}>
            Cómo se aprueba en tu edificio
          </Typography>

          {([
            { n: 1, title: 'Te registras hoy', desc: 'Recibes tu kit por correo' },
            { n: 2, title: 'Presentas a tu comunidad', desc: 'Con la carta y presentación que te damos' },
            { n: 3, title: 'Aprobación del comité', desc: 'Te acompañamos en la gestión' },
            { n: 4, title: 'Instalación', desc: 'Energica instala y financia' },
          ] as { n: number; title: string; desc: string }[]).map((s, i, arr) => (
            <Box key={s.n} sx={{ display: 'flex', gap: 2, mb: i < arr.length - 1 ? 2 : 0, alignItems: 'flex-start' }}>
              <Box sx={{
                width: 28, height: 28, borderRadius: '50%', bgcolor: PINK,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.1,
              }}>
                <Typography sx={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>{s.n}</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#2A3547', lineHeight: 1.3 }}>
                  {s.title}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mt: 0.2 }}>
                  {s.desc}
                </Typography>
              </Box>
            </Box>
          ))}

          <Box sx={{ mt: 2.5, pt: 2, borderTop: `1px solid ${BORDER}`, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, mb: 2 }}>
              Ya operamos en{' '}
              <Box component="span" sx={{ fontWeight: 700, color: '#2A3547' }}>14 edificios</Box>
              {' · '}
              <Box component="span" sx={{ fontWeight: 700, color: '#2A3547' }}>+100 usuarios</Box>
              {' '}cargando
            </Typography>

            <Box
              component="a"
              href={`https://wa.me/56967666652?text=${encodeURIComponent('Hola, quiero información sobre la electrolinera compartida para mi edificio.')}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'block', textDecoration: 'none', mb: 1.5 }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: '#25D366',
                  '&:hover': { bgcolor: '#1ebe5d' },
                  fontWeight: 700,
                  py: 1.25,
                  fontSize: '0.9rem',
                  color: '#fff',
                  boxShadow: 'none',
                  borderRadius: 2,
                  display: 'flex',
                  gap: 1,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#25D366"/>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#fff"/>
                </svg>
                💬 Hablar con un asesor por WhatsApp
              </Button>
            </Box>

          </Box>
        </Box>

        {/* Panel de pago — se muestra al hacer clic en "Pagar visita" */}
        {state.activePanel === 'pago' && (
          <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2, color: '#2A3547' }}>
              Datos para la visita técnica
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 1, color: '#2A3547' }}>
              Dirección del edificio
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
            {state.address && !isRegionMetropolitana(state.address) ? (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#FEF3C7', border: '1px solid #FCD34D', mb: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#92400E', mb: 0.75 }}>
                  Sin cobertura en tu región
                </Typography>
                <Typography sx={{ fontSize: '0.82rem', color: '#78350F', lineHeight: 1.6, mb: 1.5 }}>
                  De momento no tenemos cobertura en tu región por esta vía. Contáctanos para evaluar tu caso.
                </Typography>
                <Button size="small" variant="outlined" onClick={() => update({ address: '' })}
                  sx={{ fontSize: '0.78rem', borderColor: '#92400E', color: '#92400E', textTransform: 'none' }}>
                  Cambiar dirección
                </Button>
              </Box>
            ) : (
              <>
                <TextField fullWidth size="small" label="Depto / N° de estacionamiento (opcional)"
                  value={state.depto} onChange={e => update({ depto: e.target.value })} sx={{ mb: 2 }} />
                <TextField
                  fullWidth size="small" required label="Email para comprobante" type="email"
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
                          typeOfResidence: 'appartment',
                          formId: state.formId ?? null,
                        }),
                      })
                      update({ customerSaving: false, customerSaved: res.ok })
                    } catch {
                      update({ customerSaving: false, customerSaved: false })
                    }
                  }}
                  helperText={state.customerSaving ? 'Verificando datos…' : 'Requerido para proceder al pago'}
                  sx={{ mb: 2.5 }}
                />
                {state.webpayError && (
                  <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>
                    {state.webpayError}.{' '}
                    <Button size="small" onClick={initiatePayment}
                      sx={{ textTransform: 'none', fontSize: '0.78rem', p: 0, color: 'inherit', textDecoration: 'underline' }}>
                      Reintentar
                    </Button>
                  </Alert>
                )}
                <Button fullWidth variant="contained" onClick={submitWebpay}
                  disabled={!state.webpayData || state.webpayLoading || !state.emailPago.trim() || !state.addressValidated || state.customerSaving || !state.customerSaved}
                  sx={{
                    bgcolor: PINK, color: '#fff',
                    '&:hover': { bgcolor: PINK_DARK },
                    '&:disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
                    fontWeight: 700, py: 1.5, fontSize: '0.95rem', boxShadow: 'none',
                  }}
                >
                  {state.webpayLoading ? 'Generando orden…' : 'Pagar $29.000 con Webpay →'}
                </Button>
                <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED, textAlign: 'center', mt: 1 }}>
                  Pago seguro · Visa, Mastercard, Redcompra, débito
                </Typography>
              </>
            )}
          </Box>
        )}

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={resetAll}
            sx={{ color: TEXT_MUTED, fontSize: '0.82rem', textTransform: 'none', textDecoration: 'underline', '&:hover': { color: '#2A3547', bgcolor: 'transparent' } }}
          >
            ← Nueva simulación
          </Button>
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

  // ─── Casa booking options (Image #7) ─────────────────────────────────────────
  function renderBookingOptions(displayResult: NonNullable<ReturnType<typeof calcResult>>) {
    // Use IVA-inclusive installation price (no charger) for all calculations
    const installBaseGross = displayResult.installGross

    const inst70 = Math.round(installBaseGross * 0.85)
    const save70 = installBaseGross - inst70
    const pay70 = Math.round(inst70 * 0.70)
    const bal70 = inst70 - pay70

    const inst30 = Math.round(installBaseGross * 0.93)
    const save30 = installBaseGross - inst30
    const pay30 = Math.round(inst30 * 0.30)
    const bal30 = inst30 - pay30

    const visitaAmount = 10000

    const opts = [
      {
        key: 'r70' as const,
        title: 'Reserva 70%',
        badge: { label: 'MEJOR PRECIO', color: '#00C47C' },
        instDisc: inst70,
        instOrig: installBaseGross,
        savings: save70,
        savingsPct: 15,
        payToday: pay70,
        balance: bal70,
        chargerDeferred: displayResult.chargerPrice,
        features: ['Prioridad máxima en la agenda de instalación', 'Visita técnica sin costo', 'Puedes desistir tras la visita y te devolvemos lo pagado'],
        disclaimer: 'Si en la visita técnica detectamos algún impedimento técnico para instalar, te devolvemos el 100% de lo pagado, sin preguntas.',
        btnLabel: `Reservar con ${fmt(pay70)} →`,
        payAmount: pay70,
        glosa: 'Reserva 70% · Instalación cargador eléctrico',
        highlight: false,
      },
      {
        key: 'r30' as const,
        title: 'Reserva 30%',
        badge: { label: '🔥 LA MÁS ELEGIDA', color: PINK },
        instDisc: inst30,
        instOrig: installBaseGross,
        savings: save30,
        savingsPct: 7,
        payToday: pay30,
        balance: bal30,
        chargerDeferred: displayResult.chargerPrice,
        features: ['Prioridad en la instalación', 'Visita técnica sin costo', 'Puedes desistir tras la visita y te devolvemos lo pagado'],
        disclaimer: null,
        btnLabel: `Reservar con ${fmt(pay30)} →`,
        payAmount: pay30,
        glosa: 'Reserva 30% · Instalación cargador eléctrico',
        highlight: true,
      },
    ]

    return (
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547', mb: 2 }}>
          Elige cómo reservar tu instalación
        </Typography>

        {state.webpayError && (
          <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>{state.webpayError}</Alert>
        )}

        {opts.map(opt => (
          <Box
            key={opt.key}
            sx={{
              bgcolor: '#fff',
              border: `2px solid ${opt.highlight ? PINK : BORDER}`,
              borderRadius: 2,
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {opt.badge && (
              <Box sx={{ bgcolor: opt.badge.color, px: 2, py: 0.75, display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.72rem', color: '#fff', letterSpacing: '0.06em' }}>
                  {opt.badge.label}
                </Typography>
              </Box>
            )}
            <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547', mb: 0.75 }}>{opt.title}</Typography>

              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.25 }}>
                <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mr: 0.5 }}>Instalación</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#2A3547' }}>{fmt(opt.instDisc)}</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, textDecoration: 'line-through' }}>{fmt(opt.instOrig)}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: SUCCESS, fontWeight: 600, mb: 1.5 }}>
                {opt.savingsPct}% dcto · ahorras {fmt(opt.savings)} en la instalación
              </Typography>

              <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, mb: 0.5, lineHeight: 1.6 }}>
                Pagas hoy <strong>{fmt(opt.payToday)}</strong> ({opt.key === 'r70' ? '70' : '30'}% de la instalación). Saldo <strong>{fmt(opt.balance)}</strong> {opt.key === 'r70' ? 'tras la visita técnica.' : 'cuando confirmemos el precio en la visita técnica.'}
              </Typography>
              {/* Use live result (not stale apiResult) to reflect charger toggle */}
              {(result?.isOwn ?? state.chargerId === 'own') ? (
                <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, mb: 1.5, lineHeight: 1.6 }}>
                  Cargador: lo pones tú ($0).
                </Typography>
              ) : (result?.chargerGrossPrice ?? 0) > 0 ? (
                <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, mb: 1.5, lineHeight: 1.6 }}>
                  Cargador <strong>{fmt(result?.chargerGrossPrice ?? 0)}</strong>, se paga después de la visita técnica.
                </Typography>
              ) : null}

              {opt.features.map(f => (
                <Box key={f} sx={{ display: 'flex', gap: 1, mb: 0.5, alignItems: 'flex-start' }}>
                  <Typography sx={{ color: SUCCESS, fontWeight: 700, flexShrink: 0, fontSize: '0.9rem' }}>✓</Typography>
                  <Typography sx={{ fontSize: '0.82rem', color: '#2A3547', fontWeight: 600 }}>{f}</Typography>
                </Box>
              ))}
              {opt.disclaimer && (
                <Typography sx={{ fontSize: '0.73rem', color: TEXT_MUTED, mt: 1, lineHeight: 1.5, fontStyle: 'italic' }}>
                  {opt.disclaimer}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                disabled={state.webpayLoading}
                onClick={() => update({
                  selectedReserveOption: opt.key,
                  activePanel: state.activePanel === 'visitaPago' && state.selectedReserveOption === opt.key ? null : 'visitaPago',
                  reservePendingAmount: opt.balance,
                  reservePendingGlosa: opt.key === 'r70' ? `Saldo 30% · Instalación cargador eléctrico` : `Saldo 70% · Instalación cargador eléctrico`,
                })}
                sx={{
                  bgcolor: state.activePanel === 'visitaPago' && state.selectedReserveOption === opt.key ? '#94A3B8' : PINK,
                  '&:hover': { bgcolor: state.activePanel === 'visitaPago' && state.selectedReserveOption === opt.key ? '#64748B' : PINK_DARK },
                  '&:disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
                  fontWeight: 700,
                  py: 1.25,
                  fontSize: '0.9rem',
                  boxShadow: 'none',
                  borderRadius: 2,
                  mt: 2,
                }}
              >
                {state.webpayLoading ? 'Redirigiendo…' : opt.btnLabel}
              </Button>

              {state.activePanel === 'visitaPago' && state.selectedReserveOption === opt.key && (
                <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${BORDER}` }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.5, color: '#2A3547' }}>
                    Datos para el comprobante
                  </Typography>
                  {/* Address */}
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
                  {state.address && !isRegionMetropolitana(state.address) && (
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#FEF3C7', border: '1px solid #FCD34D', mb: 2 }}>
                      <Typography sx={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 600 }}>
                        Solo atendemos Región Metropolitana y Valparaíso
                      </Typography>
                    </Box>
                  )}
                  <TextField fullWidth size="small" label="Tu nombre completo (opcional)"
                    value={state.nombreEmail} onChange={e => update({ nombreEmail: e.target.value })} sx={{ mb: 2 }} />
                  <TextField fullWidth size="small" required label="Email para comprobante" type="email"
                    value={state.emailPago}
                    onChange={e => update({ emailPago: e.target.value })}
                    helperText="Requerido para proceder al pago"
                    sx={{ mb: 2 }} />
                  <TextField fullWidth size="small" label="Teléfono" type="tel"
                    value={state.visitaTelefono} onChange={e => update({ visitaTelefono: e.target.value })} sx={{ mb: 2.5 }} />
                  {state.webpayError && (
                    <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>{state.webpayError}</Alert>
                  )}
                  <Button fullWidth variant="contained"
                    disabled={!state.emailPago.trim() || !state.addressValidated || state.webpayLoading}
                    onClick={() => payDirect(
                      opt.payAmount,
                      opt.glosa,
                      'chargerInstallation',
                      state.reservePendingAmount ? { amount: state.reservePendingAmount, glosa: state.reservePendingGlosa } : undefined
                    )}
                    sx={{
                      bgcolor: PINK, color: '#fff',
                      '&:hover': { bgcolor: PINK_DARK },
                      '&:disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
                      fontWeight: 700, py: 1.5, fontSize: '0.95rem', boxShadow: 'none', borderRadius: 2,
                    }}
                  >
                    {state.webpayLoading ? 'Redirigiendo…' : `Pagar ${fmt(opt.payAmount)} con Webpay →`}
                  </Button>
                  <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED, textAlign: 'center', mt: 1 }}>
                    Pago seguro · Visa, Mastercard, Redcompra, débito
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        ))}

        {/* Solo visita técnica */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: { xs: 2, sm: 2.5 }, mb: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547', mb: 0.5 }}>
            Solo visita técnica
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.35rem', color: '#2A3547' }}>{fmt(visitaAmount)}</Typography>
            <Typography sx={{ fontSize: '0.82rem', color: TEAL, fontWeight: 600 }}>acreditable a tu instalación</Typography>
          </Box>
          <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, mb: 1.5, lineHeight: 1.6 }}>
            Agenda la visita, recibe tu presupuesto definitivo y decide después. Sin compromiso de instalar.
          </Typography>
          {[
            'Profesional certificado SEC en terreno',
            'Presupuesto definitivo y plan de instalación',
            'Si avanzas, los $10.000 se descuentan',
          ].map(f => (
            <Box key={f} sx={{ display: 'flex', gap: 1, mb: 0.5, alignItems: 'flex-start' }}>
              <Typography sx={{ color: SUCCESS, fontWeight: 700, flexShrink: 0, fontSize: '0.9rem' }}>✓</Typography>
              <Typography sx={{ fontSize: '0.82rem', color: '#2A3547' }}>{f}</Typography>
            </Box>
          ))}
          <Button
            fullWidth
            variant="contained"
            disabled={state.webpayLoading}
            onClick={() => update({
              selectedReserveOption: 'visita',
              activePanel: state.activePanel === 'visitaPago' && state.selectedReserveOption === 'visita' ? null : 'visitaPago',
              reservePendingAmount: null,
              reservePendingGlosa: '',
            })}
            sx={{
              bgcolor: state.activePanel === 'visitaPago' && state.selectedReserveOption === 'visita' ? '#94A3B8' : PINK,
              '&:hover': { bgcolor: state.activePanel === 'visitaPago' && state.selectedReserveOption === 'visita' ? '#64748B' : PINK_DARK },
              '&:disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
              fontWeight: 700,
              py: 1.25,
              fontSize: '0.9rem',
              boxShadow: 'none',
              borderRadius: 2,
              mt: 2,
            }}
          >
            {state.webpayLoading ? 'Redirigiendo…' : `Pagar visita ${fmt(visitaAmount)} →`}
          </Button>

          {state.activePanel === 'visitaPago' && state.selectedReserveOption === 'visita' && (
            <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${BORDER}` }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.5, color: '#2A3547' }}>
                Datos para el comprobante
              </Typography>
              {/* Address */}
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
              {state.address && !isRegionMetropolitana(state.address) && (
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#FEF3C7', border: '1px solid #FCD34D', mb: 2 }}>
                  <Typography sx={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 600 }}>
                    Solo atendemos Región Metropolitana y Valparaíso
                  </Typography>
                </Box>
              )}
              <TextField fullWidth size="small" label="Tu nombre completo (opcional)"
                value={state.nombreEmail} onChange={e => update({ nombreEmail: e.target.value })} sx={{ mb: 2 }} />
              <TextField fullWidth size="small" required label="Email para comprobante" type="email"
                value={state.emailPago}
                onChange={e => update({ emailPago: e.target.value })}
                helperText="Requerido para proceder al pago"
                sx={{ mb: 2 }} />
              <TextField fullWidth size="small" label="Teléfono" type="tel"
                value={state.visitaTelefono} onChange={e => update({ visitaTelefono: e.target.value })} sx={{ mb: 2.5 }} />
              {state.webpayError && (
                <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>{state.webpayError}</Alert>
              )}
              <Button fullWidth variant="contained"
                disabled={!state.emailPago.trim() || !state.addressValidated || state.webpayLoading}
                onClick={() => payDirect(visitaAmount, 'Visita técnica · Instalación cargador', 'visit')}
                sx={{
                  bgcolor: PINK, color: '#fff',
                  '&:hover': { bgcolor: PINK_DARK },
                  '&:disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
                  fontWeight: 700, py: 1.5, fontSize: '0.95rem', boxShadow: 'none', borderRadius: 2,
                }}
              >
                {state.webpayLoading ? 'Redirigiendo…' : `Pagar ${fmt(visitaAmount)} con Webpay →`}
              </Button>
              <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED, textAlign: 'center', mt: 1 }}>
                Pago seguro · Visa, Mastercard, Redcompra, débito
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    )
  }

  function renderStep2() {
    if (state.tipo === 'edificio') return renderStep2Edificio()

    const localResult = result
    const displayResult = state.apiResult ?? localResult
    if (!displayResult) return null

    const tipoLabel = state.tipo === 'casa' ? 'Casa' : 'Edificio'
    const distLabel2 = `${state.dist}m`
    const removedCharger = state.removedChargerId ? chargerList.find(c => c.id === state.removedChargerId) ?? null : null

    return (
      <Box>
        {/* ── Simplified summary header ── */}
        <Box sx={{ textAlign: 'center', mb: 2.5 }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#2A3547', mb: 0.25 }}>
            Tu cotización personalizada
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED, mb: 1.5 }}>
            {tipoLabel} · instalación a {distLabel2} del tablero
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, mb: 0.5 }}>
            Instalación llave en mano (IVA incl.)
          </Typography>
          <Typography sx={{ fontSize: '2.4rem', fontWeight: 900, color: PINK, lineHeight: 1 }}>
            {fmt(displayResult.installGross)}
          </Typography>
          <Typography sx={{ fontSize: '0.78rem', color: TEXT_MUTED, mt: 0.75, maxWidth: 280, mx: 'auto' }}>
            Materiales, mano de obra, trámite SEC y visita técnica incluidos.
          </Typography>
        </Box>

        {/* ── Charger card — mode 1: charger selected and NOT removed ── */}
        {!displayResult.isOwn && state.removedChargerId === null && (
          <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#2A3547' }}>
                  {result?.chargerName ?? displayResult.chargerName}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: TEXT_MUTED, mt: 0.2 }}>
                  Equipo estándar, a precio de mercado
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right', flexShrink: 0, ml: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#2A3547' }}>
                  {fmt(result?.chargerGrossPrice ?? displayResult.chargerGrossPrice)}
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED }}>IVA incluido</Typography>
              </Box>
            </Box>
            <Box
              component="span"
              onClick={() => update({ removedChargerId: state.chargerId, chargerId: 'own' })}
              sx={{ fontSize: '0.78rem', color: PINK, cursor: 'pointer', fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' } }}
            >
              Ya tengo el mío · quitar ($0)
            </Box>
            <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, mt: 1.5, lineHeight: 1.5 }}>
              El cargador es un equipo estándar que puedes comprar donde quieras. Nosotros no lo encarecemos: nuestro valor es la instalación, rápida y a bajo costo.
            </Typography>
            <Box sx={{ mt: 1.5, pt: 1.5, borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED }}>Total proyecto:</Typography>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#2A3547' }}>
                {fmt(displayResult.installGross + displayResult.chargerGrossPrice)} (instalación + cargador)
              </Typography>
            </Box>
          </Box>
        )}

        {/* ── Charger card — mode 2: own charger OR charger was removed ── */}
        {(displayResult.isOwn || state.removedChargerId !== null) && (
          <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#2A3547' }}>
                  Cargador · lo pones tú
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: TEXT_MUTED, mt: 0.2 }}>
                  Usarás tu propio cargador
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#2A3547', flexShrink: 0, ml: 2 }}>
                $0
              </Typography>
            </Box>
            {removedCharger && (
              <Box
                component="span"
                onClick={() => update({ chargerId: state.removedChargerId!, removedChargerId: null })}
                sx={{
                  display: 'inline-block', fontSize: '0.78rem', color: PINK, cursor: 'pointer',
                  fontWeight: 600, border: `1.5px solid ${PINK}`, borderRadius: 1,
                  px: 1, py: 0.25, mt: 0.5,
                  '&:hover': { bgcolor: 'rgba(232,26,104,0.05)' },
                }}
              >
                + Agregar {removedCharger.name} ({fmt(removedCharger.precio)})
              </Box>
            )}
            <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, mt: 1.5, lineHeight: 1.5 }}>
              El cargador es un equipo estándar que puedes comprar donde quieras. Nosotros no lo encarecemos: nuestro valor es la instalación, rápida y a bajo costo.
            </Typography>
            <Box sx={{ mt: 1.5, pt: 1.5, borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED }}>Total proyecto:</Typography>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#2A3547' }}>
                {fmt(displayResult.installGross)} (Instalación)
              </Typography>
            </Box>
          </Box>
        )}

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

        {/* Booking options — replaces single "Reservar" button */}
        {renderBookingOptions(displayResult)}

        {/* Panel: pago — kept for legacy/fallback */}
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
                  label="Tu nombre completo (opcional)"
                  value={state.nombreEmail}
                  onChange={e => update({ nombreEmail: e.target.value })}
                  onBlur={async (e) => {
                    const nombre = e.target.value.trim()
                    const email = state.emailPago.trim().toLowerCase()
                    if (!nombre || !email || !/\S+@\S+\.\S+/.test(email)) return
                    update({ customerSaving: true, customerSaved: false })
                    try {
                      const res = await fetch('/api/customer', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          email,
                          name: nombre,
                          address: state.address || '',
                          city: state.addressCity || '',
                          state: state.addressState || '',
                          zipCode: state.addressZipCode || '',
                          lat: state.addressLat || '',
                          lng: state.addressLng || '',
                          depto: state.depto || '',
                          typeOfResidence: state.tipo === 'casa' ? 'house' : state.tipo === 'edificio' ? 'appartment' : 'other',
                          formId: state.formId ?? null,
                        }),
                      })
                      update({ customerSaving: false, customerSaved: res.ok })
                    } catch {
                      update({ customerSaving: false, customerSaved: false })
                    }
                  }}
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

        {/* ── Cronograma de instalación ───────────────────────────────────── */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#0898b9" strokeWidth="1.5"/>
              <path d="M12 7v5l3 3" stroke="#0898b9" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#2A3547' }}>
              Tu proceso de instalación
            </Typography>
          </Box>
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
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#2A3547', lineHeight: 1.3 }}>{s.label}</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: s.active ? PINK : TEXT_MUTED, mt: 0.15 }}>{s.sub}</Typography>
              </Box>
            </Box>
          ))}
          <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${BORDER}`, bgcolor: 'rgba(8,152,185,0.05)', borderRadius: 1, px: 1.5, py: 1 }}>
            <Typography sx={{ fontSize: '0.78rem', color: TEAL, fontWeight: 600, textAlign: 'center' }}>
              De pago a cargador funcionando: ~7 a 12 días hábiles
            </Typography>
          </Box>
        </Box>

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

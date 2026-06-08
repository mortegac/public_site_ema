'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Alert,
  TextField,
} from '@mui/material'
import { IconMail } from '@tabler/icons-react'
import AddressInput2 from '@/app/components/AddressInput2'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import LoadingIcon from '@/app/components/shared/LoadingIcon'
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
  if (!addr || addr.trim().length < 4) return true
  return RM_KEYWORDS.some(k => addr.toLowerCase().includes(k))
}

function formatVisitDate(iso: string): string {
  const d = new Date(iso)
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  const weekday = d.toLocaleDateString('es-CL', { weekday: 'long' })
  const day = d.getDate()
  const month = d.toLocaleDateString('es-CL', { month: 'long' })
  return `${cap(weekday)}, ${day} ${cap(month)}`
}

// ─── JWT decoder (payload only, no signature verification) ────────────────────
interface JwtPayload {
  sub?: string
  formid?: string
  email?: string
  name?: string
  phone?: string
  // Quote amounts embedded at email send time (exact wizard values)
  tipo?: 'casa' | 'edificio'
  dist?: number
  mat?: number
  inst?: number
  sec?: number
  chargerPrice?: number
  chargerName?: string
  neto?: number
  iva?: number
  total?: number
  isOwn?: boolean
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

// ─── Step tracker (fire-and-forget) ──────────────────────────────────────────
function updateFormStep(formId: string | null | undefined, step: string) {
  if (!formId) return
  fetch('/api/update-step', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formId, step }),
  }).catch(() => null)
}

// ─── Main inner component (needs useSearchParams so must be wrapped in Suspense) ──
function PagoContent() {
  const searchParams = useSearchParams()
  const token = [...searchParams.keys()][0] ?? ''
  const jwtPayload = decodeJwtPayload(token)

  const [state, setState] = useState<WizardState>({
    step: 2,
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
    emailPago: jwtPayload?.email ?? jwtPayload?.sub ?? '',
    nombreEmail: jwtPayload?.name ?? '',
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

  function update(partial: Partial<WizardState>) {
    setState(prev => ({ ...prev, ...partial }))
  }

  // ─── Hydrate from JWT (amounts) + /api/quote (address, nextVisitDate) ─────────
  const hydratedRef = useRef(false)
  useEffect(() => {
    if (hydratedRef.current) return
    const formId = jwtPayload?.formid
    if (!formId) return
    hydratedRef.current = true

    const controller = new AbortController()

    // If the JWT already carries all quote amounts (new format), use them directly.
    // Only call /api/quote for address and nextVisitDate.
    const jwtHasAmounts = jwtPayload?.total != null

    if (jwtHasAmounts) {
      // Immediately apply JWT amounts without waiting for the API
      update({
        formId,
        tipo: jwtPayload!.tipo ?? null,
        dist: jwtPayload!.dist ?? 10,
        apiResult: {
          mat: jwtPayload!.mat ?? 0,
          inst: jwtPayload!.inst ?? 0,
          sec: jwtPayload!.sec ?? 0,
          chargerPrice: jwtPayload!.chargerPrice ?? 0,
          chargerName: jwtPayload!.chargerName ?? '',
          neto: jwtPayload!.neto ?? 0,
          iva: jwtPayload!.iva ?? 0,
          total: jwtPayload!.total!,
          isOwn: jwtPayload!.isOwn ?? false,
        },
        estimateLoading: true,
      })
    } else {
      update({ estimateLoading: true })
    }

    // Always fetch address + nextVisitDate from the DB
    fetch(`/api/quote?formId=${encodeURIComponent(formId)}`, { signal: controller.signal })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then((data) => {
        update({
          estimateLoading: false,
          address: data.address ?? '',
          addressValidated: !!(data.address),
          customerSaved: true,
          nextVisitDate: data.nextVisitDate ?? null,
          // Only use DB amounts if JWT didn't carry them
          ...(jwtHasAmounts ? {} : {
            formId: data.formId,
            tipo: data.tipo,
            dist: data.dist,
            apiResult: {
              mat: data.mat,
              inst: data.inst,
              sec: data.sec,
              chargerPrice: data.chargerPrice,
              chargerName: data.chargerName,
              neto: data.neto,
              iva: data.iva,
              total: data.total,
              isOwn: data.isOwn,
            },
          }),
        })
        // Mark form as PENDING_PAYMENT when customer visits /cotizador/pago
        updateFormStep(data.formId ?? formId, '3')
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return
        console.error('[PagoClient] /api/quote error:', err)
        update({ estimateLoading: false, customerSaved: jwtHasAmounts })
      })

    return () => controller.abort()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── Webpay payment flow ─────────────────────────────────────────────────────

  async function initiatePayment() {
    const result = calcResult(state)
    const displayResult = state.apiResult ?? result
    if (!displayResult) return

    update({ webpayLoading: true, webpayError: '', webpayData: null, activePanel: 'pago' })

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

      if (!res.ok || !data.token) {
        throw new Error(data.error ?? 'Error al iniciar el pago')
      }

      update({
        webpayLoading: false,
        webpayData: { order: data.order, token: data.token, url: data.url, buy_order: data.buy_order },
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al procesar el pago'
      update({ webpayLoading: false, webpayError: message })
    }
  }

  function submitWebpay() {
    if (!state.webpayData) return

    const result = calcResult(state)
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

  async function handleSendEmail() {
    const result = calcResult(state)
    const displayResult = state.apiResult ?? result
    update({ emailSending: true, emailError: '' })
    try {
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

  // ─── Step 2 render ────────────────────────────────────────────────────────────
  const result = calcResult(state)
  const displayResult = state.apiResult ?? result

  const tipoLabel = state.tipo === 'casa' ? 'Casa' : 'Edificio'
  const chargerLabel = displayResult?.chargerName || 'Cargador propio'
  const distLabel2 = `${state.dist}m`

  return (
    <Box>
      <HpHeaderNew />

      {/* Hero */}
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
            Tu cotización al instante
          </Typography>
          <Typography sx={{ color: '#000000', textAlign: 'center', mb: { xs: 1, md: 4 }, fontSize: '0.9rem' }}>
            Precio real basado en tu perfil
          </Typography>
        </Container>
      </Box>

      {/* Wizard body */}
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
            {!displayResult ? (
              state.estimateLoading ? (
                /* Loading state while fetching quote from API */
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <LoadingIcon icon="oval" color="#0898b9" style={{ width: 48, height: 48, display: 'inline-block' }} />
                  <Typography sx={{ fontSize: '0.9rem', color: TEXT_MUTED, mt: 2 }}>
                    Cargando tu cotización…
                  </Typography>
                </Box>
              ) : (
                /* No quote context — prompt to start from the wizard */
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography sx={{ fontSize: '2rem', mb: 2 }}>⚡</Typography>
                  <Typography sx={{ fontWeight: 700, color: '#2A3547', mb: 1 }}>
                    No hay cotización activa
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', color: TEXT_MUTED, mb: 3 }}>
                    Para ver tu presupuesto personalizado necesitas completar el cotizador.
                  </Typography>
                  <Button
                    variant="contained"
                    href="/cotizador"
                    component="a"
                    sx={{
                      bgcolor: PINK,
                      '&:hover': { bgcolor: PINK_DARK },
                      fontWeight: 700,
                      py: 1.25,
                      px: 4,
                      fontSize: '0.95rem',
                    }}
                  >
                    Cotizar desde el inicio
                  </Button>
                </Box>
              )
            ) : (
              <Box>
                {/* Summary header */}
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

                {/* Info text */}
                <Box sx={{ bgcolor: 'rgba(8,152,185,0.06)', border: `1px solid rgba(8,152,185,0.2)`, borderRadius: 1.5, px: 2, py: 1.25, mb: 3 }}>
                  <Typography sx={{ fontSize: '0.8rem', color: '#0777a0', lineHeight: 1.5 }}>
                    Incluye tablero, canalización, cableado y declaración TE6 ante SEC. Normativa RIC N°15.
                  </Typography>
                </Box>

                {/* Cronograma de instalación */}
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
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#2A3547', lineHeight: 1.3 }}>
                          {s.label}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: s.active ? PINK : TEXT_MUTED, mt: 0.15 }}>
                          {s.sub}
                        </Typography>
                      </Box>
                    </Box>
                  ))}

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

                {/* Pay button — toggle: gray when pago panel open, pink when closed */}
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

                        {state.webpayError && (
                          <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>
                            {state.webpayError}.{' '}
                            <Button
                              size="small"
                              onClick={initiatePayment}
                              sx={{ textTransform: 'none', fontSize: '0.78rem', p: 0, color: 'inherit', textDecoration: 'underline' }}
                            >
                              Reintentar
                            </Button>
                          </Alert>
                        )}

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

                {/* Próxima visita disponible */}
                {state.nextVisitDate && (
                  <Typography sx={{ fontSize: '0.78rem', color: TEXT_MUTED, textAlign: 'center', mb: 2, mt: -1 }}>
                    Próxima visita disponible:{' '}
                    <Box component="span" sx={{ color: TEAL, fontWeight: 600 }}>
                      {formatVisitDate(state.nextVisitDate)}
                    </Box>
                  </Typography>
                )}

                {/* Email button */}
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

                {/* Trust box */}
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

                {/* Link back to full wizard */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button
                    variant="text"
                    href="/cotizador"
                    component="a"
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
            )}
          </Box>

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
        </Container>
      </Box>
    </Box>
  )
}

// ─── Export — wraps PagoContent in Suspense for useSearchParams ───────────────
export default function PagoClient() {
  return (
    <Suspense fallback={null}>
      <PagoContent />
    </Suspense>
  )
}

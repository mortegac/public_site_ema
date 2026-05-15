'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Slider,
  Select,
  MenuItem,
  TextField,
  Divider,
  Chip,
  Alert,
  FormControl,
  InputLabel,
} from '@mui/material'

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
  { id: 'kpn-ocpp', name: 'KPN Wallbox KBox OCPP 1.6', tipo: 'wallbox', kw: '7.3', desc: 'Wallbox · Protocolo OCPP 1.6', precio: 779450, stock: 5 },
]

const INSTALL_BASE = {
  casa:     { mat: 156000, inst: 182000, sec: 0 },
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
  nombreEmail: string
  emailSolo: string
  emailSent: boolean
  paid: boolean
  selectedDate: number | null
  booked: boolean
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
  'Cotiza tu instalación de cargador EV',
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
    nombreEmail: '',
    emailSolo: '',
    emailSent: false,
    paid: false,
    selectedDate: null,
    booked: false,
  })

  const [dates] = useState(genDates)

  const result = calcResult(state)

  // ─── Derived ─────────────────────────────────────────────────────────────
  const canNext = (() => {
    if (state.step === 0) return state.tipo !== null
    if (state.step === 1) return state.tipoC !== null && state.chargerId !== null
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

  function goNext() {
    if (state.step < 2) {
      update({ step: state.step + 1 })
    }
  }

  function goBack() {
    if (state.step > 0) {
      update({ step: state.step - 1, activePanel: null })
    }
  }

  function handlePay() {
    update({ paid: true, step: 3, activePanel: null })
  }

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
      nombreEmail: '',
      emailSolo: '',
      emailSent: false,
      paid: false,
      selectedDate: null,
      booked: false,
    })
  }

  function handleAddressBlur() {
    if (state.address.length >= 4) {
      update({ editingAddr: false, regionWarn: checkRegion(state.address) })
    }
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
              subtitle="Estacionamiento en subterráneo"
            />
          </Grid>
        </Grid>

        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 1, color: '#2A3547' }}>
          Dirección de instalación
        </Typography>

        {state.editingAddr ? (
          <TextField
            fullWidth
            size="small"
            placeholder="Ej: Av. Providencia 1234, Santiago"
            value={state.address}
            onChange={e => update({ address: e.target.value, regionWarn: false })}
            onBlur={handleAddressBlur}
            onKeyDown={e => { if (e.key === 'Enter') handleAddressBlur() }}
            sx={{ mb: 1 }}
          />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography sx={{ fontSize: '0.9rem', color: '#2A3547', flex: 1, bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 1, px: 1.5, py: 0.75 }}>
              {state.address}
            </Typography>
            <Button size="small" onClick={() => update({ editingAddr: true })} sx={{ color: TEAL, fontSize: '0.75rem', minWidth: 'auto', whiteSpace: 'nowrap' }}>
              Editar
            </Button>
          </Box>
        )}

        {state.regionWarn && (
          <Alert severity="warning" sx={{ fontSize: '0.8rem', mt: 1 }}>
            Por el momento solo atendemos la Región Metropolitana y Valparaíso. Igualmente continúa para recibir tu cotización de referencia.
          </Alert>
        )}

        {state.tipo === 'edificio' && (
          <Alert severity="info" sx={{ mt: 2, fontSize: '0.8rem' }}>
            Para edificios se incluye trámite SEC y coordinación con la administración.
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
              onClick={() => update({ tipoC: 'portable', chargerId: null })}
              icon="🔌"
              title="Portátil"
              subtitle="Enchufe estándar · Flexible"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <SelectionCard
              selected={state.tipoC === 'wallbox'}
              onClick={() => update({ tipoC: 'wallbox', chargerId: null })}
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

        {/* Wallbox select */}
        {state.tipoC === 'wallbox' && (
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 1.5, color: '#2A3547' }}>
              Selecciona tu wallbox
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Modelo de wallbox</InputLabel>
              <Select
                label="Modelo de wallbox"
                value={state.chargerId ?? ''}
                onChange={e => update({ chargerId: e.target.value })}
              >
                {wallboxes.map(c => (
                  <MenuItem key={c.id} value={c.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Box>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{c.name}</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: TEXT_MUTED }}>{c.desc}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, ml: 2, flexShrink: 0 }}>{fmt(c.precio)}</Typography>
                    </Box>
                  </MenuItem>
                ))}
                <MenuItem value="own">
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>Ya tengo mi cargador</Typography>
                </MenuItem>
              </Select>
            </FormControl>

            {state.chargerId && state.chargerId !== 'own' && (() => {
              const sel = CHARGERS.find(c => c.id === state.chargerId)
              return sel ? (
                <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2, mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mb: 0.5 }}>{sel.name}</Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mb: 1 }}>{sel.desc}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label={`${sel.kw} kW`} size="small" sx={{ bgcolor: 'rgba(8,152,185,0.1)', color: TEAL, fontWeight: 600 }} />
                    <Chip label={`${sel.stock} en stock`} size="small" sx={{ bgcolor: 'rgba(0,196,124,0.1)', color: SUCCESS }} />
                    <Chip label={fmt(sel.precio)} size="small" sx={{ bgcolor: 'rgba(232,26,104,0.08)', color: PINK, fontWeight: 700 }} />
                  </Box>
                </Box>
              ) : null
            })()}
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
    if (!result) return null

    return (
      <Box>
        {/* Price hero */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, mb: 0.5 }}>Total estimado (con IVA)</Typography>
          <Typography sx={{ fontSize: '2.5rem', fontWeight: 900, color: PINK, lineHeight: 1 }}>
            {fmt(result.total)}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED, mt: 0.5 }}>
            Valor referencial · sujeto a visita técnica
          </Typography>
        </Box>

        {/* Breakdown card */}
        <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mb: 2, color: '#2A3547' }}>Desglose</Typography>

          {!result.isOwn && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#2A3547' }}>Cargador ({result.chargerName})</Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{fmt(result.chargerPrice)}</Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: '0.85rem', color: '#2A3547' }}>Materiales eléctricos</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{fmt(result.mat)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: '0.85rem', color: '#2A3547' }}>Instalación certificada</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{fmt(result.inst)}</Typography>
          </Box>
          {result.sec > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#2A3547' }}>Trámites SEC</Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{fmt(result.sec)}</Typography>
            </Box>
          )}

          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
            <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>Subtotal neto</Typography>
            <Typography sx={{ fontSize: '0.85rem' }}>{fmt(result.neto)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
            <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>IVA 19%</Typography>
            <Typography sx={{ fontSize: '0.85rem' }}>{fmt(result.iva)}</Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Total con IVA</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: PINK }}>{fmt(result.total)}</Typography>
          </Box>
        </Box>

        {/* Action panels */}
        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          <Grid size={{ xs: 6 }}>
            <Button
              fullWidth
              variant={state.activePanel === 'pago' ? 'contained' : 'outlined'}
              onClick={() => update({ activePanel: state.activePanel === 'pago' ? null : 'pago' })}
              sx={{
                bgcolor: state.activePanel === 'pago' ? PINK : 'transparent',
                borderColor: PINK,
                color: state.activePanel === 'pago' ? '#fff' : PINK,
                '&:hover': { bgcolor: state.activePanel === 'pago' ? PINK_DARK : 'rgba(232,26,104,0.06)', borderColor: PINK_DARK },
                fontWeight: 700,
                fontSize: '0.85rem',
                py: 1.25,
              }}
            >
              Pagar ahora
            </Button>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Button
              fullWidth
              variant={state.activePanel === 'email' ? 'contained' : 'outlined'}
              onClick={() => update({ activePanel: state.activePanel === 'email' ? null : 'email' })}
              sx={{
                bgcolor: state.activePanel === 'email' ? TEAL : 'transparent',
                borderColor: TEAL,
                color: state.activePanel === 'email' ? '#fff' : TEAL,
                '&:hover': { bgcolor: state.activePanel === 'email' ? '#0777a0' : 'rgba(8,152,185,0.06)', borderColor: '#0777a0' },
                fontWeight: 700,
                fontSize: '0.85rem',
                py: 1.25,
              }}
            >
              Recibir por email
            </Button>
          </Grid>
        </Grid>

        {/* Panel: pago */}
        {state.activePanel === 'pago' && (
          <Box sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2, p: 2.5, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2, color: '#2A3547' }}>
              Datos para la instalación
            </Typography>
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
            <TextField
              fullWidth
              size="small"
              label="Email para comprobante"
              type="email"
              value={state.emailPago}
              onChange={e => update({ emailPago: e.target.value })}
              sx={{ mb: 2.5 }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handlePay}
              disabled={!state.emailPago}
              sx={{
                bgcolor: PINK,
                '&:hover': { bgcolor: PINK_DARK },
                fontWeight: 700,
                py: 1.5,
                fontSize: '0.95rem',
              }}
            >
              Pagar {fmt(result.total)} con Webpay →
            </Button>
            <Typography sx={{ fontSize: '0.7rem', color: TEXT_MUTED, textAlign: 'center', mt: 1 }}>
              Pago seguro · Visa, Mastercard, Redcompra, débito
            </Typography>
          </Box>
        )}

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

        {/* Trust box */}
        <Box sx={{ bgcolor: '#fff', border: `1px solid ${BORDER}`, borderRadius: 2, p: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: '#2A3547', mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.75 }}>
            🔒 Tu compra protegida
          </Typography>
          <Grid container spacing={1}>
            {[
              { icon: '✅', text: 'Instalación certificada SEC' },
              { icon: '🔄', text: 'Garantía de satisfacción 30 días' },
              { icon: '📞', text: 'Soporte post-venta incluido' },
            ].map(({ icon, text }) => (
              <Grid size={{ xs: 12 }} key={text}>
                <Typography sx={{ fontSize: '0.78rem', color: TEXT_MUTED, display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  {icon} {text}
                </Typography>
              </Grid>
            ))}
          </Grid>
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
    if (!result) return null

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
            { label: 'Cargador', value: result.chargerName || 'Cargador propio' },
            { label: 'Distancia al tablero', value: `${state.dist} m` },
            { label: 'Dirección', value: state.address || '—' },
            ...(state.depto ? [{ label: 'Depto / Ref.', value: state.depto }] : []),
            { label: 'Total pagado', value: fmt(result.total) },
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
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Box sx={{ background: `linear-gradient(358deg, ${TEAL} 0%, ${TEAL_LIGHT} 100%)`, py: { xs: 6, md: 8 } }}>
        <Container maxWidth="sm">
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
          <Typography sx={{ color: '#000000', textAlign: 'center', mb: 4, fontSize: '0.9rem' }}>
            {heroSubtitle}
          </Typography>
          {!state.booked && <WizardStepper step={state.step} paid={state.paid} booked={state.booked} />}
        </Container>
      </Box>

      {/* ── Wizard body ───────────────────────────────────────────────────── */}
      <Box sx={{ bgcolor: SURFACE, minHeight: '60vh', py: 4 }}>
        <Container maxWidth="sm">
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
        </Container>
      </Box>

      {/* ── Trust footer ─────────────────────────────────────────────────── */}
      <Box sx={{ py: 3, textAlign: 'center', bgcolor: SURFACE }}>
        <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
          Valores referenciales · Instalación certificada SEC · Cotización formal tras visita técnica
        </Typography>
      </Box>
    </Box>
  )
}

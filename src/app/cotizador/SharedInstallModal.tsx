'use client'

import { useState } from 'react'
import {
  Dialog, DialogContent, Box, Typography, TextField,
  FormControl, Select, MenuItem, Button, CircularProgress,
} from '@mui/material'
import { CHILE_REGIONS } from '@/data/chile-regions'
import { track, trackUnique, setTrackerIdentity } from '@/lib/tracker'

const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const BORDER = '#E2E8F0'
const TEAL = '#0898b9'
const TEXT_MUTED = '#64748B'

const selectSx = {
  '& .MuiOutlinedInput-notchedOutline': { borderColor: BORDER },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: TEAL },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: TEAL },
  bgcolor: '#fff',
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#fff',
    '& fieldset': { borderColor: BORDER },
    '&:hover fieldset': { borderColor: TEAL },
    '&.Mui-focused fieldset': { borderColor: TEAL },
  },
}

const TD_LABEL = 'padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;color:#4B4B5C;'
const TD_VALUE = 'padding:8px 12px;border:1px solid #e8e8e8;'

function escapeHtml(s: string) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function row(label: string, value: string) {
  return `<tr><td style="${TD_LABEL}">${escapeHtml(label)}</td><td style="${TD_VALUE}">${escapeHtml(value)}</td></tr>`
}

interface Props {
  open: boolean
  onClose: () => void
  initialName?: string
  initialEmail?: string
  initialPhone?: string
  initialRol?: string
  initialUsersEV?: string
  // edificio context for the email
  edificioFloor?: string
  edificioParkingFloor?: string
  edificioVisitorParking?: boolean | null
  formId?: string | null
}

export default function SharedInstallModal({
  open, onClose,
  initialName = '', initialEmail = '', initialPhone = '', initialRol = '', initialUsersEV = '',
  edificioFloor = '', edificioParkingFloor = '', edificioVisitorParking = null,
}: Props) {
  const [region, setRegion] = useState('')
  const [comuna, setComuna] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)
  const [rol, setRol] = useState(initialRol)
  const [usersEV, setUsersEV] = useState(initialUsersEV)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const comunas = CHILE_REGIONS.find(r => r.name === region)?.comunas ?? []
  const canSubmit = !!(region && comuna && address.trim() && name.trim() && email.trim() && phone.trim() && rol && usersEV)

  function handleEmailChange(v: string) {
    setEmail(v)
    if (v.includes('@') && v.includes('.')) {
      setTrackerIdentity({ customerId: v })
      trackUnique('email_captured', { step: 0, typeOfResidence: 'EDIFICIO' })
    }
  }

  async function handleSubmit() {
    if (!canSubmit || loading) return
    setLoading(true)
    setError('')
    trackUnique('cta_envio_form_electrolinera', { step: 0, typeOfResidence: 'EDIFICIO' })
    try {
      const { default: emailjs, init } = await import('emailjs-com')
      init('UYcrSeCqLGW8xqT4S')
      const parkingLabel = edificioParkingFloor || 'No indicado'
      const visitasLabel = edificioVisitorParking === true ? 'Sí' : edificioVisitorParking === false ? 'No' : 'No indicado'
      const fullAddress = [address, comuna, region].filter(Boolean).join(', ')
      const CONTENT_HTML = [
        '<h3 style="font-family:sans-serif;">Nueva postulación: Electrolinera compartida en edificio</h3>',
        '<table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:13px;">',
        row('Nombre', name || '—'),
        row('Email', email),
        row('Teléfono', phone || '—'),
        row('Dirección edificio', fullAddress || '—'),
        row('Piso departamento', edificioFloor || '—'),
        row('Piso estacionamiento', parkingLabel),
        row('¿Tiene estacionamiento visitas?', visitasLabel),
        rol ? row('Cargo/Rol', rol) : '',
        usersEV ? row('Usuarios con auto eléctrico', usersEV) : '',
        '</table>',
      ].join('')

      await emailjs.send('service_dbrrm6b', 'template_eysyecb', {
        to_email: email,
        name: name || email,
        subject: `Nueva postulación electrolinera — ${name || email}`,
        CONTENT_HTML,
      })
      track('electrolinera_submitted')
      setSubmitted(true)
    } catch {
      setError('No se pudo enviar. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { borderRadius: 3, m: { xs: 1, sm: 2 } } }}
    >
      <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
        {submitted ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography sx={{ fontSize: '2.5rem', mb: 1.5 }}>✅</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#2A3547', mb: 1 }}>
              ¡Listo! Te enviaremos el kit pronto.
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: TEXT_MUTED, lineHeight: 1.6 }}>
              Nos pondremos en contacto contigo para coordinar la presentación en tu comunidad.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ pr: 2 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#2A3547', lineHeight: 1.3 }}>
                  Regístrate para recibir tu{' '}
                  <Box component="span" sx={{ color: PINK }}>kit</Box>
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: TEXT_MUTED, mt: 0.5, lineHeight: 1.5 }}>
                  Te enviamos todo lo que necesitas para presentar en la próxima reunión de tu comunidad.
                </Typography>
              </Box>
              <Box
                component="button" onClick={onClose}
                sx={{ border: 'none', background: 'none', cursor: 'pointer', p: 0.5, color: TEXT_MUTED, flexShrink: 0, lineHeight: 1, fontSize: '1.25rem', '&:hover': { color: '#2A3547' } }}
                aria-label="Cerrar"
              >
                ✕
              </Box>
            </Box>

            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#2A3547' }}>
              Dirección del edificio
            </Typography>

            <FormControl fullWidth size="small">
              <Select
                displayEmpty value={region}
                onChange={e => { setRegion(e.target.value); setComuna('') }}
                sx={selectSx}
                renderValue={v => v || <em style={{ color: TEXT_MUTED, fontStyle: 'normal' }}>Región</em>}
              >
                {CHILE_REGIONS.map(r => (
                  <MenuItem key={r.code} value={r.name}>{r.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" disabled={!region}>
              <Select
                displayEmpty value={comuna}
                onChange={e => setComuna(e.target.value)}
                sx={selectSx}
                renderValue={v => v || <em style={{ color: TEXT_MUTED, fontStyle: 'normal' }}>Comuna</em>}
              >
                {comunas.map(c => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField fullWidth size="small" placeholder="Dirección (calle y número)"
              value={address} onChange={e => setAddress(e.target.value)} sx={fieldSx} />

            <TextField fullWidth size="small" placeholder="Nombre"
              value={name} onChange={e => setName(e.target.value)} sx={fieldSx} />

            <TextField fullWidth size="small" placeholder="Email" type="email"
              value={email} onChange={e => handleEmailChange(e.target.value)} sx={fieldSx} />

            <TextField fullWidth size="small" placeholder="Teléfono" type="tel"
              value={phone} onChange={e => setPhone(e.target.value)} sx={fieldSx} />

            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#2A3547', mt: 0.5 }}>
              Cargo / Rol
            </Typography>

            <FormControl fullWidth size="small">
              <Select
                displayEmpty value={rol} onChange={e => setRol(e.target.value)} sx={selectSx}
                renderValue={v => v || <em style={{ color: TEXT_MUTED, fontStyle: 'normal' }}>Seleccione una opción</em>}
              >
                <MenuItem value="Administrador(a)">Administrador(a)</MenuItem>
                <MenuItem value="Copropietario(a)">Copropietario(a)</MenuItem>
                <MenuItem value="Arrendatario(a)">Arrendatario(a)</MenuItem>
                <MenuItem value="Miembro del comité de la comunidad">Miembro del comité de la comunidad</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>

            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#2A3547', mt: 0.5 }}>
              ¿Cantidad de usuarios con auto eléctrico?
            </Typography>

            <FormControl fullWidth size="small">
              <Select
                displayEmpty value={usersEV} onChange={e => setUsersEV(e.target.value)} sx={selectSx}
                renderValue={v => v || <em style={{ color: TEXT_MUTED, fontStyle: 'normal' }}>Seleccione una opción</em>}
              >
                <MenuItem value="No lo sé">No lo sé</MenuItem>
                <MenuItem value="Si hay, pero no sé cuántos">Si hay, pero no sé cuántos</MenuItem>
                <MenuItem value="Si hay, 2 o menos">Si hay, 2 o menos</MenuItem>
                <MenuItem value="Si hay, más de 2">Si hay, más de 2</MenuItem>
                <MenuItem value="No hay">No hay</MenuItem>
              </Select>
            </FormControl>

            {error && (
              <Typography sx={{ fontSize: '0.82rem', color: PINK, textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth variant="contained" disabled={!canSubmit || loading}
              onClick={handleSubmit}
              sx={{
                mt: 0.5, py: 1.5, fontWeight: 700, fontSize: '0.95rem', borderRadius: 2, boxShadow: 'none',
                bgcolor: PINK, '&:hover': { bgcolor: PINK_DARK, boxShadow: 'none' },
                '&.Mui-disabled': { bgcolor: '#E2E8F0', color: '#94A3B8' },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Quiero instalación compartida →'}
            </Button>

            <Typography sx={{ fontSize: '0.8rem', color: PINK, textAlign: 'center' }}>
              Sin compromiso si la comunidad la rechaza.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  Alert,
  InputAdornment,
} from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import AddressInput2 from '@/app/components/AddressInput2'
import emailjs, { init as initEmailjs } from 'emailjs-com'

// ─── Design tokens ──────────────────────────────────────────────────────────
const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const TEAL = '#0898b9'
const TEAL_LIGHT = '#4dbfd9'
const SURFACE = '#F8FAFC'
const TEXT_MUTED = '#64748B'
const BORDER = '#E2E8F0'

// ─── Select options ──────────────────────────────────────────────────────────
const CARGO_OPTIONS = [
  'Residente',
  'Administrador/a',
  'Miembro del comité',
  'Propietario/a',
  'Otro',
]

const TIPO_ESTABLECIMIENTO_OPTIONS = [
  'Edificio residencial',
  'Condominio',
  'Hotel u hospedaje',
  'Edificio de oficinas',
  'Centro comercial',
  'Otro',
]

const ESTACIONAMIENTOS_OPTIONS = ['Sí', 'No', 'No sé']

const CANTIDAD_USUARIOS_OPTIONS = [
  '1 a 5',
  '6 a 10',
  '11 a 20',
  'Más de 20',
  'No sé',
]

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormState {
  nombre: string
  cargo: string
  email: string
  telefono: string
  tipoEstablecimiento: string
  address: string
  addressValidated: boolean
  estacionamientosVisita: string
  cantidadUsuarios: string
  mensaje: string
  submitting: boolean
  submitted: boolean
  error: string
}

// ─── Shared field sx ─────────────────────────────────────────────────────────
const fieldSx = {
  mb: 2,
  '& .MuiOutlinedInput-root': {
    bgcolor: '#fff',
    '& fieldset': { borderColor: BORDER },
    '&:hover fieldset': { borderColor: TEAL },
    '&.Mui-focused fieldset': { borderColor: TEAL },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: TEAL },
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function PostulacionClient() {
  const [form, setForm] = useState<FormState>({
    nombre: '',
    cargo: '',
    email: '',
    telefono: '',
    tipoEstablecimiento: '',
    address: '',
    addressValidated: false,
    estacionamientosVisita: '',
    cantidadUsuarios: '',
    mensaje: '',
    submitting: false,
    submitted: false,
    error: '',
  })

  function update(partial: Partial<FormState>) {
    setForm(prev => ({ ...prev, ...partial }))
  }

  const canSubmit =
    form.nombre.trim() !== '' &&
    form.cargo !== '' &&
    form.email.trim() !== '' &&
    form.telefono.trim() !== '' &&
    form.tipoEstablecimiento !== '' &&
    form.addressValidated &&
    !form.submitting

  async function handleSubmit() {
    if (!canSubmit) return
    update({ submitting: true, error: '' })

    const CONTENT_HTML = `
      <p><strong>Nueva postulación: Cargador comunitario en edificio</strong></p>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
        <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;background:#f9f9f9;">Nombre</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${form.nombre}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;background:#f9f9f9;">Cargo/Rol</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${form.cargo}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;background:#f9f9f9;">Email</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${form.email}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;background:#f9f9f9;">Teléfono</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">+56 ${form.telefono}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;background:#f9f9f9;">Tipo de establecimiento</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${form.tipoEstablecimiento}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;background:#f9f9f9;">Dirección</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${form.address}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;background:#f9f9f9;">Estacionamientos visita</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${form.estacionamientosVisita || '—'}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;background:#f9f9f9;">Usuarios con auto eléctrico</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${form.cantidadUsuarios || '—'}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e8e8e8;font-weight:600;background:#f9f9f9;">Mensaje</td><td style="padding:8px 12px;border:1px solid #e8e8e8;">${form.mensaje || '—'}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:13px;color:#4B4B5C;line-height:1.6;margin-top:16px;">
        Nuestro equipo evaluará la factibilidad técnica y la coordinación con la administración o entidad responsable.<br><br>
        💡 Este programa está orientado a comunidades, establecimientos y espacios de alto tránsito que busquen fomentar la movilidad eléctrica y compartir el beneficio entre sus residentes, huéspedes, clientes o colaboradores.<br><br>
        Recibirás una respuesta de nuestros consultores lo antes posible.
      </p>
    `

    try {
      initEmailjs('UYcrSeCqLGW8xqT4S')
      await emailjs.send('service_dbrrm6b', 'template_eysyecb', {
        to_email: 'hola@energica.city',
        name: form.nombre,
        subject: `Nueva postulación cargador comunitario — ${form.nombre}`,
        CONTENT_HTML,
      })
      update({ submitted: true, submitting: false })
    } catch {
      update({ submitting: false, error: 'No se pudo enviar. Intenta nuevamente.' })
    }
  }

  return (
    <Box>
      <HpHeaderNew />

      {/* Hero */}
      <Box sx={{ background: `linear-gradient(180deg, ${TEAL_LIGHT} 10%, ${TEAL} 80%)`, py: { xs: 3, sm: 4 } }}>
        <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.875rem' },
              fontWeight: 800,
              color: '#000000',
              textAlign: 'center',
              mb: 1,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            Postula tu edificio para un cargador comunitario
          </Typography>
          <Typography
            sx={{
              color: '#000000',
              textAlign: 'center',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              maxWidth: 480,
              mx: 'auto',
            }}
          >
            Completa este formulario y evaluamos —sin costo— si tu edificio puede tener
            un punto de carga comunitario. Nosotros financiamos la instalación; tú pagas
            solo la energía que cargas. Revisamos la factibilidad técnica y coordinamos
            con tu administración. Toma 2 minutos y no tiene costo ni compromiso.
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Box sx={{ bgcolor: SURFACE, minHeight: '60vh', pt: { xs: 2, md: 4 }, pb: 8 }}>
        <Container maxWidth="sm" sx={{ px: { xs: 1, sm: 3 } }}>

          {/* Back button */}
          <Box sx={{ mb: 2 }}>
            <Button
              variant="text"
              onClick={() => window.history.back()}
              sx={{
                color: TEXT_MUTED,
                fontSize: '0.85rem',
                textTransform: 'none',
                fontWeight: 600,
                p: 0,
                minWidth: 0,
                '&:hover': { color: '#2A3547', bgcolor: 'transparent' },
              }}
            >
              ← Volver a mi cotización
            </Button>
          </Box>

          {!form.submitted ? (
            /* ── Form card ── */
            <Box
              sx={{
                bgcolor: '#fff',
                borderRadius: 3,
                boxShadow: '0 2px 24px rgba(0,0,0,0.08)',
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 0.5, color: '#2A3547', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Completa el formulario
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, mb: 3, lineHeight: 1.6 }}>
                Todos los campos marcados son requeridos para evaluar tu postulación.
              </Typography>

              {/* 1. Nombre */}
              <TextField
                fullWidth
                size="small"
                label="Nombre completo del solicitante"
                value={form.nombre}
                onChange={e => update({ nombre: e.target.value })}
                sx={fieldSx}
              />

              {/* 2. Cargo */}
              <TextField
                select
                fullWidth
                size="small"
                label="Cargo/Rol"
                value={form.cargo}
                onChange={e => update({ cargo: e.target.value })}
                sx={fieldSx}
              >
                {CARGO_OPTIONS.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>

              {/* 3. Email */}
              <TextField
                fullWidth
                size="small"
                label="Correo electrónico"
                type="email"
                placeholder="email@dominio.com"
                value={form.email}
                onChange={e => update({ email: e.target.value })}
                sx={fieldSx}
              />

              {/* 4. Teléfono with +56 prefix */}
              <TextField
                fullWidth
                size="small"
                label="Teléfono de contacto"
                type="tel"
                value={form.telefono}
                onChange={e => update({ telefono: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{
                          bgcolor: '#F1F5F9',
                          border: `1px solid ${BORDER}`,
                          borderRadius: 1,
                          px: 1,
                          py: 0.25,
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: '#2A3547',
                          lineHeight: 1.6,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        +56
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={fieldSx}
              />

              {/* 5. Tipo de establecimiento */}
              <TextField
                select
                fullWidth
                size="small"
                label="¿Tipo de establecimiento?"
                value={form.tipoEstablecimiento}
                onChange={e => update({ tipoEstablecimiento: e.target.value })}
                sx={fieldSx}
              >
                {TIPO_ESTABLECIMIENTO_OPTIONS.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>

              {/* 6. Dirección */}
              <Box sx={{ mb: 2 }}>
                <AddressInput2
                  value={form.address}
                  error={!!form.address && !form.addressValidated}
                  onAddressChange={(v) => setForm(prev => ({ ...prev, address: v, addressValidated: false }))}
                  onValidationChange={(isValid) => setForm(prev => ({ ...prev, addressValidated: isValid }))}
                  onSelectAddress={(details) => {
                    if (details) {
                      const full = [details.StreetAddress, details.City, details.State]
                        .filter(Boolean)
                        .join(', ')
                      setForm(prev => ({ ...prev, address: full, addressValidated: true }))
                    }
                  }}
                />
              </Box>

              {/* 7. Estacionamientos de visita */}
              <TextField
                select
                fullWidth
                size="small"
                label="¿Tiene estacionamientos de visita?"
                value={form.estacionamientosVisita}
                onChange={e => update({ estacionamientosVisita: e.target.value })}
                sx={fieldSx}
              >
                {ESTACIONAMIENTOS_OPTIONS.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>

              {/* 8. Cantidad de usuarios con auto eléctrico */}
              <TextField
                select
                fullWidth
                size="small"
                label="¿Cantidad de usuarios con auto eléctrico?"
                value={form.cantidadUsuarios}
                onChange={e => update({ cantidadUsuarios: e.target.value })}
                sx={fieldSx}
              >
                {CANTIDAD_USUARIOS_OPTIONS.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>

              {/* 9. Mensaje (optional) */}
              <TextField
                fullWidth
                size="small"
                label={
                  <Box component="span" sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                    Mensaje
                    <Box
                      component="span"
                      sx={{
                        fontSize: '0.72rem',
                        color: TEXT_MUTED,
                        fontWeight: 400,
                        letterSpacing: 0,
                      }}
                    >
                      * Opcional
                    </Box>
                  </Box>
                }
                multiline
                rows={4}
                value={form.mensaje}
                onChange={e => update({ mensaje: e.target.value })}
                sx={{ ...fieldSx, mb: 3 }}
              />

              {form.error && (
                <Alert severity="error" sx={{ mb: 2, fontSize: '0.82rem' }}>
                  {form.error}
                </Alert>
              )}

              {/* 10. Submit button */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={!canSubmit}
                sx={{
                  bgcolor: PINK,
                  '&:hover': { bgcolor: PINK_DARK },
                  '&.Mui-disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
                  fontWeight: 700,
                  py: 1.5,
                  fontSize: '1rem',
                  boxShadow: 'none',
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                {form.submitting ? 'Enviando…' : 'Enviar email'}
              </Button>
            </Box>
          ) : (
            /* ── Success state ── */
            <Box
              sx={{
                bgcolor: '#fff',
                borderRadius: 3,
                boxShadow: '0 2px 24px rgba(0,0,0,0.08)',
                p: { xs: 3, md: 4 },
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: '3rem', mb: 1 }}>✅</Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: '#2A3547',
                  mb: 1.5,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                ¡Postulación enviada!
              </Typography>
              <Typography sx={{ fontSize: '0.95rem', color: TEXT_MUTED, lineHeight: 1.7 }}>
                Recibirás una respuesta de nuestros consultores lo antes posible.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

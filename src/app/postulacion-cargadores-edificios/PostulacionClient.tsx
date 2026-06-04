'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Alert,
} from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import emailjs, { init as initEmailjs } from 'emailjs-com'

const PINK = '#e81a68'
const PINK_DARK = '#c01556'
const TEAL = '#0898b9'
const TEAL_LIGHT = '#4dbfd9'
const SURFACE = '#F8FAFC'
const TEXT_MUTED = '#64748B'
const BORDER = '#E2E8F0'
const SUCCESS = '#00C47C'

interface FormState {
  nombre: string
  email: string
  telefono: string
  submitting: boolean
  submitted: boolean
  error: string
}

const APPROVAL_STEPS = [
  { num: 1, title: 'Te registras hoy', desc: 'Recibes tu kit por correo' },
  { num: 2, title: 'Presentas a tu comunidad', desc: 'Con la carta y presentación que te damos' },
  { num: 3, title: 'Aprobación del comité', desc: 'Te acompañamos en la gestión' },
  { num: 4, title: 'Instalación', desc: 'Energica instala y financia' },
]

export default function PostulacionClient() {
  const [form, setForm] = useState<FormState>({
    nombre: '',
    email: '',
    telefono: '',
    submitting: false,
    submitted: false,
    error: '',
  })

  function update(partial: Partial<FormState>) {
    setForm(prev => ({ ...prev, ...partial }))
  }

  async function handleSubmit() {
    if (!form.nombre.trim() || !form.email.trim() || !form.telefono.trim()) return
    update({ submitting: true, error: '' })

    try {
      initEmailjs('UYcrSeCqLGW8xqT4S')
      await emailjs.send('service_dbrrm6b', 'template_eysyecb', {
        to_email: 'hola@energica.city',
        name: form.nombre,
        subject: `Nueva postulación electrolinera en edificio — ${form.nombre}`,
        CONTENT_HTML: `
          <p><strong>Nueva postulación: Electrolinera compartida en edificio</strong></p>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:8px;border:1px solid #e8e8e8;font-weight:600;">Nombre</td><td style="padding:8px;border:1px solid #e8e8e8;">${form.nombre}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e8e8e8;font-weight:600;">Email</td><td style="padding:8px;border:1px solid #e8e8e8;">${form.email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e8e8e8;font-weight:600;">Teléfono</td><td style="padding:8px;border:1px solid #e8e8e8;">${form.telefono}</td></tr>
          </table>
        `,
      })
      update({ submitted: true, submitting: false })
    } catch {
      update({ submitting: false, error: 'No se pudo enviar. Intenta nuevamente.' })
    }
  }

  const canSubmit = form.nombre.trim() !== '' && form.email.trim() !== '' && form.telefono.trim() !== '' && !form.submitting

  return (
    <Box>
      <HpHeaderNew />

      {/* Hero */}
      <Box sx={{ background: `linear-gradient(180deg, ${TEAL_LIGHT} 10%, ${TEAL} 80%)`, pt: 0, pb: 0 }}>
        <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 3, sm: 4 } }}>
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
            {form.submitted ? 'Ya estás en la lista 🎉' : 'Electrolinera compartida en tu edificio'}
          </Typography>
          <Typography sx={{ color: '#000000', textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {form.submitted
              ? 'Te enviamos el kit por email para presentar en tu comunidad'
              : 'Sin inversión. Energica instala y financia. Tú solo pagas lo que cargas.'}
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Box sx={{ bgcolor: SURFACE, minHeight: '60vh', pt: { xs: 2, md: 4 }, pb: 6 }}>
        <Container maxWidth="sm" sx={{ px: { xs: 1, sm: 3 } }}>

          {!form.submitted ? (
            /* ── Form ── */
            <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 24px rgba(0,0,0,0.08)', p: { xs: 3, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#2A3547' }}>
                Regístrate para recibir tu kit
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED, mb: 3, lineHeight: 1.6 }}>
                Te enviamos todo lo que necesitas para presentar en la próxima reunión de tu comunidad.
              </Typography>

              <TextField
                fullWidth
                size="small"
                label="Nombre"
                value={form.nombre}
                onChange={e => update({ nombre: e.target.value })}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#fff',
                    '& fieldset': { borderColor: BORDER },
                    '&:hover fieldset': { borderColor: TEAL },
                    '&.Mui-focused fieldset': { borderColor: TEAL },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Email"
                type="email"
                value={form.email}
                onChange={e => update({ email: e.target.value })}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#fff',
                    '& fieldset': { borderColor: BORDER },
                    '&:hover fieldset': { borderColor: TEAL },
                    '&.Mui-focused fieldset': { borderColor: TEAL },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Teléfono"
                type="tel"
                value={form.telefono}
                onChange={e => update({ telefono: e.target.value })}
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

              {form.error && (
                <Alert severity="error" sx={{ mb: 2, fontSize: '0.82rem' }}>
                  {form.error}
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={!canSubmit}
                sx={{
                  bgcolor: PINK,
                  '&:hover': { bgcolor: PINK_DARK },
                  '&:disabled': { bgcolor: '#e0e0e0', color: '#aaa' },
                  fontWeight: 700,
                  py: 1.5,
                  fontSize: '1rem',
                  boxShadow: 'none',
                  borderRadius: 2,
                }}
              >
                {form.submitting ? 'Enviando…' : 'Quiero electrolinera en mi edificio →'}
              </Button>
              <Typography sx={{ fontSize: '0.72rem', color: TEXT_MUTED, textAlign: 'center', mt: 1 }}>
                Sin compromiso si la comunidad la rechaza.
              </Typography>
            </Box>
          ) : (
            /* ── Success state ── */
            <Box>
              {/* Process steps */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 24px rgba(0,0,0,0.08)', p: { xs: 3, md: 4 }, mb: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#2A3547', mb: 2.5 }}>
                  Cómo se aprueba en tu edificio
                </Typography>
                {APPROVAL_STEPS.map((s, i) => (
                  <Box key={s.num} sx={{ display: 'flex', gap: 2, mb: i < APPROVAL_STEPS.length - 1 ? 2.5 : 0, alignItems: 'flex-start' }}>
                    <Box sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: PINK,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: 0.1,
                    }}>
                      <Typography sx={{ color: '#fff', fontSize: '0.78rem', fontWeight: 700 }}>{s.num}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#2A3547', lineHeight: 1.3 }}>
                        {s.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mt: 0.25 }}>
                        {s.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                {/* Social proof */}
                <Box sx={{ mt: 3, pt: 2.5, borderTop: `1px solid ${BORDER}`, textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '0.82rem', color: TEXT_MUTED }}>
                    Ya operamos en <Box component="span" sx={{ fontWeight: 700, color: '#2A3547' }}>14 edificios</Box> · <Box component="span" sx={{ fontWeight: 700, color: '#2A3547' }}>+100 usuarios</Box> cargando
                  </Typography>
                </Box>
              </Box>

              {/* WhatsApp CTA */}
              <Box
                component="a"
                href={`https://wa.me/56967666652?text=${encodeURIComponent('Hola, acabo de postular mi edificio para la electrolinera compartida y tengo una consulta.')}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'block', textDecoration: 'none', mb: 2 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#25D366',
                    '&:hover': { bgcolor: '#1ebe5d' },
                    fontWeight: 700,
                    py: 1.5,
                    fontSize: '0.95rem',
                    color: '#fff',
                    boxShadow: 'none',
                    borderRadius: 2,
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#25D366"/>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#fff"/>
                  </svg>
                  💬 Hablar con un asesor por WhatsApp
                </Button>
              </Box>

              {/* Nueva cotización */}
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  component="a"
                  href="/cotizador"
                  sx={{
                    fontSize: '0.85rem',
                    color: TEXT_MUTED,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    '&:hover': { color: '#2A3547' },
                  }}
                >
                  ↺ Nueva cotización
                </Box>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

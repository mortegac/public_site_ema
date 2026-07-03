'use client'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import emailjs, { init } from 'emailjs-com'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'

const DARK = '#0F172A'
const TEAL = '#0898b9'
const PINK = '#e81a68'
const PINK_DARK = '#c01556'

const REGIONES = [
  'Región Metropolitana',
  'Valparaíso',
  'Biobío',
  'La Araucanía',
  'Los Lagos',
  'O\'Higgins',
  'Maule',
  'Antofagasta',
  'Los Ríos',
  'Coquimbo',
  'Atacama',
  'Ñuble',
  'Arica y Parinacota',
  'Tarapacá',
  'Aysén',
  'Magallanes',
]

const schema = yup.object({
  name: yup.string().min(2, 'Ingresa tu nombre completo').required('Campo obligatorio'),
  email: yup.string().email('Email inválido').required('Campo obligatorio'),
  phone: yup
    .string()
    .required('Campo obligatorio')
    .test('valid-phone', 'Formato inválido: usa +56 9XX XXX XXX', (v) => {
      if (!v) return false
      try { return isValidPhoneNumber(v) } catch { return false }
    }),
  region: yup.string().required('Selecciona una región'),
  experience: yup.string().required('Selecciona tus años de experiencia'),
  projectTypes: yup.string().required('Selecciona el tipo de proyectos'),
})

export default function TechnicianForm() {
  const [submitted, setSubmitted] = useState<'idle' | 'success' | 'error'>('idle')

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      region: '',
      secCredential: '',
      experience: '',
      projectTypes: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        init('UYcrSeCqLGW8xqT4S')
        await emailjs.send('service_dbrrm6b', 'template_ey97i29', {
          from_name: values.name,
          to_email: values.email,
          to_name: values.name,
          reply_to: values.email,
          contentTitle: 'Postulación Instalador EMA',
          contentWelcomeText:
            'Gracias por tu interés en unirte a la red EMA de Enérgica City. Revisaremos tu perfil y nos contactaremos en las próximas 48 horas con los detalles del proceso de incorporación.',
          contentHTML: `
            <p>Nombre: <b>${values.name}</b></p>
            <p>Email: <b>${values.email}</b></p>
            <p>Teléfono: <b>${values.phone}</b></p>
            <p>Región: <b>${values.region}</b></p>
            <p>Credencial SEC: <b>${values.secCredential || 'No indicada'}</b></p>
            <p>Años de experiencia: <b>${values.experience}</b></p>
            <p>Tipo de proyectos: <b>${values.projectTypes}</b></p>
          `,
        })
        setSubmitted('success')
      } catch {
        setSubmitted('error')
      }
    },
  })

  if (submitted === 'success') {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 4,
          border: '1px solid #E2E8F0',
          borderRadius: 3,
          bgcolor: '#F0FFF4',
        }}
      >
        <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>✅</Typography>
        <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, color: DARK, mb: 1 }}>
          ¡Postulación recibida!
        </Typography>
        <Typography sx={{ color: '#475569', lineHeight: 1.7 }}>
          Te contactaremos en las próximas 48 horas con los requisitos de incorporación a la red EMA.
          Mientras tanto, puedes escribirnos por WhatsApp al{' '}
          <a href="https://wa.me/56967666652" style={{ color: TEAL, fontWeight: 600 }}>
            +56 9 6766 6652
          </a>
          .
        </Typography>
      </Box>
    )
  }

  if (submitted === 'error') {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 4,
          border: '1px solid #FEE2E2',
          borderRadius: 3,
          bgcolor: '#FFF5F5',
        }}
      >
        <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>😕</Typography>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 1 }}>
          Error al enviar
        </Typography>
        <Typography sx={{ color: '#475569' }}>
          Hubo un problema. Escríbenos directamente por WhatsApp al{' '}
          <a href="https://wa.me/56967666652" style={{ color: TEAL, fontWeight: 600 }}>
            +56 9 6766 6652
          </a>
          .
        </Typography>
      </Box>
    )
  }

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'rgba(0,17,51,0.15)' },
      '&:hover fieldset': { borderColor: TEAL },
      '&.Mui-focused fieldset': { borderColor: TEAL },
    },
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Nombre */}
        <Box>
          <Typography component="label" htmlFor="name" sx={{ display: 'block', mb: 0.5, fontWeight: 500, color: '#475569' }}>
            Nombre completo *
          </Typography>
          <TextField
            fullWidth
            id="name"
            name="name"
            placeholder="Ej: Juan González Pérez"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={fieldSx}
          />
        </Box>

        {/* Email */}
        <Box>
          <Typography component="label" htmlFor="email" sx={{ display: 'block', mb: 0.5, fontWeight: 500, color: '#475569' }}>
            Correo electrónico *
          </Typography>
          <TextField
            fullWidth
            id="email"
            name="email"
            type="email"
            placeholder="correo@dominio.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={fieldSx}
          />
        </Box>

        {/* Teléfono */}
        <Box>
          <Typography component="label" htmlFor="phone" sx={{ display: 'block', mb: 0.5, fontWeight: 500, color: '#475569' }}>
            Teléfono *
          </Typography>
          <Box
            sx={{
              '& .PhoneInput': {
                height: '56px',
                border: formik.touched.phone && Boolean(formik.errors.phone)
                  ? '1px solid #d32f2f'
                  : '1px solid rgba(0,17,51,0.15)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                px: 1.5,
                bgcolor: '#fff',
                '&:focus-within': { borderColor: TEAL, boxShadow: `0 0 0 1px ${TEAL}` },
              },
              '& .PhoneInputInput': {
                border: 'none !important',
                outline: 'none',
                fontSize: '1rem',
                fontFamily: 'inherit',
                bgcolor: 'transparent',
                width: '100%',
              },
              '& .PhoneInputCountry': { mr: 1 },
            }}
          >
            <PhoneInput
              international
              defaultCountry="CL"
              id="phone"
              value={formik.values.phone}
              onChange={(v) => { formik.setFieldValue('phone', v || ''); formik.setFieldTouched('phone', true) }}
              onBlur={() => formik.setFieldTouched('phone', true)}
              placeholder="+56 9 1234 5678"
            />
          </Box>
          {formik.touched.phone && formik.errors.phone && (
            <Typography sx={{ fontSize: '0.75rem', color: '#d32f2f', mt: '3px', ml: '14px' }}>
              {formik.errors.phone as string}
            </Typography>
          )}
        </Box>

        {/* Región */}
        <Box>
          <Typography component="label" htmlFor="region" sx={{ display: 'block', mb: 0.5, fontWeight: 500, color: '#475569' }}>
            Región donde operas *
          </Typography>
          <FormControl fullWidth error={formik.touched.region && Boolean(formik.errors.region)}>
            <Select
              id="region"
              name="region"
              value={formik.values.region}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              displayEmpty
              sx={{ '& fieldset': { borderColor: 'rgba(0,17,51,0.15)' } }}
            >
              <MenuItem value=""><em>Selecciona tu región</em></MenuItem>
              {REGIONES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </Select>
            {formik.touched.region && formik.errors.region && (
              <FormHelperText>{formik.errors.region}</FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* Credencial SEC (opcional) */}
        <Box>
          <Typography component="label" htmlFor="secCredential" sx={{ display: 'block', mb: 0.5, fontWeight: 500, color: '#475569' }}>
            Número de credencial SEC <Typography component="span" sx={{ fontSize: '0.85rem', color: '#94A3B8' }}>(opcional)</Typography>
          </Typography>
          <TextField
            fullWidth
            id="secCredential"
            name="secCredential"
            placeholder="Ej: IE-12345"
            value={formik.values.secCredential}
            onChange={formik.handleChange}
            sx={fieldSx}
          />
        </Box>

        {/* Años de experiencia */}
        <Box>
          <Typography component="label" htmlFor="experience" sx={{ display: 'block', mb: 0.5, fontWeight: 500, color: '#475569' }}>
            Años de experiencia en instalaciones eléctricas *
          </Typography>
          <FormControl fullWidth error={formik.touched.experience && Boolean(formik.errors.experience)}>
            <Select
              id="experience"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              displayEmpty
              sx={{ '& fieldset': { borderColor: 'rgba(0,17,51,0.15)' } }}
            >
              <MenuItem value=""><em>Selecciona tu experiencia</em></MenuItem>
              <MenuItem value="Menos de 1 año">Menos de 1 año</MenuItem>
              <MenuItem value="1 a 3 años">1 a 3 años</MenuItem>
              <MenuItem value="3 a 5 años">3 a 5 años</MenuItem>
              <MenuItem value="5 a 10 años">5 a 10 años</MenuItem>
              <MenuItem value="Más de 10 años">Más de 10 años</MenuItem>
            </Select>
            {formik.touched.experience && formik.errors.experience && (
              <FormHelperText>{formik.errors.experience}</FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* Tipo de proyectos */}
        <Box>
          <Typography component="label" htmlFor="projectTypes" sx={{ display: 'block', mb: 0.5, fontWeight: 500, color: '#475569' }}>
            Tipo de proyectos que realizas *
          </Typography>
          <FormControl fullWidth error={formik.touched.projectTypes && Boolean(formik.errors.projectTypes)}>
            <Select
              id="projectTypes"
              name="projectTypes"
              value={formik.values.projectTypes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              displayEmpty
              sx={{ '& fieldset': { borderColor: 'rgba(0,17,51,0.15)' } }}
            >
              <MenuItem value=""><em>Selecciona el tipo</em></MenuItem>
              <MenuItem value="Residencial (casas y departamentos)">Residencial (casas y departamentos)</MenuItem>
              <MenuItem value="Comercial (oficinas y locales)">Comercial (oficinas y locales)</MenuItem>
              <MenuItem value="Industrial (bodegas y plantas)">Industrial (bodegas y plantas)</MenuItem>
              <MenuItem value="Todos los anteriores">Todos los anteriores</MenuItem>
            </Select>
            {formik.touched.projectTypes && formik.errors.projectTypes && (
              <FormHelperText>{formik.errors.projectTypes}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={formik.isSubmitting}
          sx={{
            bgcolor: PINK,
            '&:hover': { bgcolor: PINK_DARK },
            py: 1.8,
            fontSize: '1rem',
            fontWeight: 700,
            borderRadius: 2,
            mt: 1,
          }}
        >
          {formik.isSubmitting ? 'Enviando...' : 'Postular como partner EMA'}
        </Button>

        <Typography sx={{ fontSize: '0.8rem', color: '#94A3B8', textAlign: 'center' }}>
          Tus datos son confidenciales. Solo los usamos para evaluar tu perfil.
        </Typography>
      </Box>
    </form>
  )
}

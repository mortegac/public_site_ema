import {
  Box, Container, Typography, Grid, Button, Chip,
} from '@mui/material'
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew'
import PageContainer from '@/app/components/container/PageContainer'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import BoltIcon from '@mui/icons-material/Bolt'
import HomeIcon from '@mui/icons-material/Home'
import ApartmentIcon from '@mui/icons-material/Apartment'
import Link from 'next/link'
import PresupuestoFAQ from './PresupuestoFAQ'

const CANONICAL_DOMAIN = 'https://www.energica.city'

// ─── Schema ──────────────────────────────────────────────────────────────────

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Presupuesto de Instalación de Cargador Eléctrico Online',
    description:
      'Obtén el precio exacto de instalación de tu cargador EV en Chile sin registro ni llamadas. Casa desde $512.708, edificio desde $0. Cubre RM y Valparaíso.',
    url: `${CANONICAL_DOMAIN}/presupuesto-cargador-electrico`,
    datePublished: '2026-07-01',
    dateModified: '2026-07-02',
    publisher: { '@type': 'Organization', name: 'Enérgica City', url: CANONICAL_DOMAIN },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: CANONICAL_DOMAIN },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Presupuesto Cargador Eléctrico',
          item: `${CANONICAL_DOMAIN}/presupuesto-cargador-electrico`,
        },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Instalación de Cargadores Eléctricos EV en Chile',
    provider: { '@type': 'Organization', name: 'Enérgica City', url: CANONICAL_DOMAIN },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Región Metropolitana, Chile' },
      { '@type': 'AdministrativeArea', name: 'Región de Valparaíso, Chile' },
    ],
    description:
      'Instalación profesional de cargadores EV en casas y edificios. Incluye materiales, mano de obra certificada SEC, trámite TE6 y cargador. Precio desde $159.000 IVA incluido.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CLP',
      lowPrice: 0,
      highPrice: 3110000,
      offerCount: 4,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿El precio del cotizador es definitivo o puede cambiar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para instalaciones en casa, el precio del cotizador es el precio final para distancias estándar. Incluye materiales (ductos, breaker dedicado, cable calibre 6 AWG), mano de obra de instaladores certificados SEC y el trámite de declaración TE6 obligatorio en Chile — todo con IVA. El cotizador incorpora un factor de distancia al tablero: si el recorrido supera los 10 metros, el precio se ajusta automáticamente con un multiplicador entre 1,18× y 1,55×. Para edificios, el precio definitivo se entrega tras la visita técnica ($9.990, descontable), ya que la distancia de cableado varía según el diseño del edificio.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo ver el presupuesto sin compromiso de pago?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. El cotizador de Enérgica City muestra el precio exacto sin registro ni pago previo. Solo pagas cuando decides confirmar tu instalación, vía Webpay (Visa, Mastercard, Redcompra, débito). Para casas, el pago confirma la instalación directamente. Para edificios, la electrolinera comunitaria es completamente sin inversión. La visita técnica con kit de documentos ($9.990) sí requiere pago inicial, pero ese monto se descuenta del presupuesto definitivo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿El cotizador cubre mi dirección en Chile?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El servicio de Enérgica City cubre la Región Metropolitana completa (39 comunas: Santiago, Las Condes, Providencia, Maipú, Pudahuel, La Florida, Ñuñoa, Vitacura, Lo Barnechea, Peñalolén, Macul, San Miguel, La Reina, Las Condes y más) y la Región de Valparaíso. El cotizador valida tu dirección automáticamente al ingresarla. Si tu propiedad está fuera de estas regiones, el sistema lo indica de inmediato y puedes contactar a Enérgica para evaluar disponibilidad.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué autos eléctricos son compatibles con la instalación?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Todas las instalaciones de Enérgica City son compatibles con los autos eléctricos que usan el conector Tipo 2 (IEC 62196), estándar vigente en Chile. Esto incluye BYD Seal, Dolphin y Atto 3; Tesla Model 3 y Model Y (con adaptador homologado MTT); Hyundai Ioniq 5 e Ioniq 6; Kia EV6; Volvo XC40 Recharge; Renault Kwid E-Tech; MG ZS EV; y Maxus EUNIQ 5 y 6. La declaración TE6 emitida es válida independiente del vehículo.',
        },
      },
    ],
  },
]

// ─── Datos ───────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: '⚡',
    title: 'Precio real al instante',
    body: 'Sin formularios de contacto ni esperas. El cotizador calcula el precio exacto de tu instalación — materiales, mano de obra, cargador y certificado SEC — en menos de 2 minutos.',
  },
  {
    icon: '🔒',
    title: 'Transparencia total',
    body: 'Ves el desglose completo antes de pagar: precio de cada componente, IVA y total final. Sin cargos ocultos ni "te llamamos para confirmar". Lo que ves es lo que pagas.',
  },
  {
    icon: '📋',
    title: 'Sin compromiso inicial',
    body: 'Puedes calcular tu presupuesto cuantas veces quieras sin pagar ni registrarte. Solo confirmas cuando estás listo para instalar. Plazo de agenda flexible desde la compra.',
  },
]

const SCENARIOS = [
  {
    icon: <HomeIcon sx={{ fontSize: 36, color: '#0898b9' }} />,
    tag: 'Casa o propiedad individual',
    title: 'Wallbox',
    price: 'Desde $512.000',
    features: [
      'Cable calibre 6 AWG incluido',
      'Breaker dedicado',
      'Certificado SEC (TE6)',
      'Agenda tu visita en nuestra plataforma',
    ],
    cta: 'Cotizar para casa',
  },
  {
    icon: <ApartmentIcon sx={{ fontSize: 36, color: '#e81a68' }} />,
    tag: 'Departamento en edificio',
    title: 'Electrolinera comunitaria sin inversión',
    price: 'Desde $0',
    features: [
      'Sin inversión inicial',
      'Cargador en estacionamiento de visitas',
      'Pagas solo $330/kWh consumido',
      'Incluye instalación y mantención',
    ],
    highlight: true,
    cta: 'Cotizar para edificio',
  },
  {
    icon: <BoltIcon sx={{ fontSize: 36, color: '#0898b9' }} />,
    tag: 'Edificio con estacionamiento privado',
    title: 'Instalación dedicada con kit documentación',
    price: 'Visita técnica $9.990',
    features: [
      'Ingeniería in situ',
      'Presupuesto definitivo en 48 h',
      'Kit completo para el comité',
      '$9.990 se descuentan del total',
    ],
    cta: 'Ver opciones edificio',
  },
]

const STEPS = [
  {
    number: '1',
    title: 'Ingresa tu tipo de propiedad y dirección',
    body: 'Selecciona si es casa o edificio. El cotizador valida automáticamente que tu dirección esté dentro de la cobertura en la Región Metropolitana o Valparaíso. Sin registro previo.',
  },
  {
    number: '2',
    title: 'Recibe tu presupuesto desglosado al instante',
    body: 'El cotizador muestra el precio exacto: materiales, mano de obra, trámite SEC y cargador seleccionado, todo con IVA. Puedes ajustar la distancia al tablero eléctrico con un slider.',
  },
  {
    number: '3',
    title: 'Paga online y agenda tu instalación',
    body: 'Paga con Webpay (Visa, Mastercard, Redcompra o débito). Recibes confirmación por email y coordinas con un instalador certificado SEC. Instalación en 1 día hábil.',
  },
]

const INCLUDED = [
  { item: 'Cable calibre 6 AWG', casa: true, edificio: true },
  { item: 'Breaker dedicado', casa: true, edificio: true },
  { item: 'Ductos y protecciones', casa: true, edificio: true },
  { item: 'Mano de obra certificada SEC', casa: true, edificio: true },
  { item: 'Declaración TE6 (obligatoria en Chile)', casa: true, edificio: true },
  { item: 'Cargador EV (portátil o Wallbox)', casa: true, edificio: false },
  { item: 'Memoria técnica para el comité', casa: false, edificio: true },
]

const FAQS = [
  {
    q: '¿El precio del cotizador es definitivo o puede cambiar?',
    a: 'Para instalaciones en casa, el precio del cotizador es el precio final para distancias estándar. Incluye materiales (ductos, breaker dedicado, cable calibre 6 AWG), mano de obra de instaladores certificados SEC y el trámite de declaración TE6 obligatorio en Chile — todo con IVA. El cotizador incorpora un factor de distancia al tablero: si el recorrido supera los 10 metros, el precio se ajusta automáticamente con un multiplicador entre 1,18× y 1,55×. Para edificios, el precio definitivo se entrega tras la visita técnica ($9.990, descontable), ya que la distancia de cableado varía según el diseño del edificio.',
  },
  {
    q: '¿Puedo ver el presupuesto sin compromiso de pago?',
    a: 'Sí. El cotizador de Enérgica City muestra el precio exacto sin registro ni pago previo. Solo pagas cuando decides confirmar tu instalación, vía Webpay (Visa, Mastercard, Redcompra, débito). Para casas, el pago confirma la instalación directamente. Para edificios, la electrolinera comunitaria es completamente sin inversión. La visita técnica con kit de documentos ($9.990) sí requiere pago inicial, pero ese monto se descuenta del presupuesto definitivo.',
  },
  {
    q: '¿El cotizador cubre mi dirección en Chile?',
    a: 'El servicio de Enérgica City cubre la Región Metropolitana completa (39 comunas: Santiago, Las Condes, Providencia, Maipú, Pudahuel, La Florida, Ñuñoa, Vitacura, Lo Barnechea, Peñalolén, Macul, San Miguel, La Reina, Las Condes y más) y la Región de Valparaíso. El cotizador valida tu dirección automáticamente al ingresarla. Si tu propiedad está fuera de estas regiones, el sistema lo indica de inmediato y puedes contactar a Enérgica para evaluar disponibilidad.',
  },
  {
    q: '¿Qué autos eléctricos son compatibles con la instalación?',
    a: 'Todas las instalaciones de Enérgica City son compatibles con los autos eléctricos que usan el conector Tipo 2 (IEC 62196), estándar vigente en Chile. Esto incluye BYD Seal, Dolphin y Atto 3; Tesla Model 3 y Model Y (con adaptador homologado MTT); Hyundai Ioniq 5 e Ioniq 6; Kia EV6; Volvo XC40 Recharge; Renault Kwid E-Tech; MG ZS EV; y Maxus EUNIQ 5 y 6. La declaración TE6 emitida es válida independiente del vehículo.',
  },
]

// ─── Componente ──────────────────────────────────────────────────────────────

export default function PresupuestoCargadorPage() {
  return (
    <>
      {/* Schema */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <PageContainer
        title="Presupuesto Instalación Cargador Eléctrico Online Chile | Enérgica City"
        description="Obtén el precio exacto de instalación de tu cargador EV online. Casa desde $159.000, edificio desde $0 con electrolinera. Sin registro, sin llamadas. RM y Valparaíso."
      >
        <HpHeaderNew />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <Box sx={{ bgcolor: '#ffffff', pt: { xs: 8, md: 12 }, pb: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 7 }}>
                <Chip
                  label="Sin registro · Sin llamadas · Precio con IVA"
                  sx={{
                    bgcolor: '#e0f4fa',
                    color: '#0777a0',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    mb: 3,
                    borderRadius: '9999px',
                  }}
                />
                <Typography
                  component="h1"
                  variant="h1"
                  sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, lineHeight: 1.2, mb: 2, color: '#2A3547' }}
                >
                  Presupuesto de Cargador Eléctrico{' '}
                  <Box component="span" sx={{ color: '#e81a68' }}>
                    Online
                  </Box>
                  : Precio Exacto en 2 Minutos
                </Typography>
                <Typography
                  sx={{ fontSize: '1.1rem', color: '#64748B', mb: 4, lineHeight: 1.7, maxWidth: 560 }}
                >
                  Calcula el costo real de instalar tu cargador EV en casa o edificio en Chile.
                  Incluye materiales, mano de obra certificada SEC y declaración TE6.
                  Cubre la Región Metropolitana y Valparaíso.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    href="/cotizador"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: '#e81a68',
                      '&:hover': { bgcolor: '#c01556' },
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    Cotizar ahora →
                  </Button>
                  <Button
                    component={Link}
                    href="/blog/como-usar-cotizador-cargador-electrico"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#0898b9',
                      color: '#0898b9',
                      '&:hover': { borderColor: '#0777a0', bgcolor: '#e0f4fa' },
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    Ver guía paso a paso
                  </Button>
                </Box>
              </Grid>

              {/* Tarjeta resumen lateral */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <Box sx={{ bgcolor: '#0898b9', p: 3 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                      ¿Cuánto cuesta instalar un cargador EV?
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#fff', p: 3 }}>
                    {/* Fila 1: Casa */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid #E2E8F0' }}>
                      <Typography sx={{ fontSize: '0.875rem', color: '#2A3547', maxWidth: 180 }}>
                        Casa — cargador Wallbox 10 mts
                      </Typography>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontWeight: 700, color: '#0898b9', fontSize: '0.95rem', lineHeight: 1.2 }}>
                          $512.708
                        </Typography>
                        <Typography sx={{ fontSize: '0.7rem', color: '#e81a68', fontWeight: 700, mt: 0.3 }}>
                          10% dcto aplicado
                        </Typography>
                      </Box>
                    </Box>
                    {/* Fila 2: Electrolinera */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid #E2E8F0' }}>
                      <Typography sx={{ fontSize: '0.875rem', color: '#2A3547', maxWidth: 180 }}>
                        Edificio — electrolinera comunitaria
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: '#0898b9', fontSize: '0.95rem' }}>
                        $0 inversión
                      </Typography>
                    </Box>
                    {/* Fila 3: Visita técnica */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid #E2E8F0' }}>
                      <Typography sx={{ fontSize: '0.875rem', color: '#2A3547', maxWidth: 180 }}>
                        Edificio — visita técnica + kit docs
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: '#0898b9', fontSize: '0.95rem' }}>
                        $9.990
                      </Typography>
                    </Box>
                    {/* Fila 4: Instalación dedicada */}
                    <Box sx={{ py: 1.5 }}>
                      <Typography sx={{ fontSize: '0.875rem', color: '#2A3547', mb: 0.5 }}>
                        Edificio — instalación dedicada
                      </Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: '#64748B', mb: 0.5 }}>
                        Rango referencial de instalación dedicada
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: '#0898b9', fontSize: '0.95rem' }}>
                        $1.350.000 – $3.110.000
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: '#64748B', mt: 0.5 }}>
                        El precio definitivo se confirma con visita técnica.
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748B', mt: 1, borderTop: '1px solid #E2E8F0', pt: 1.5 }}>
                      * Precios con IVA incluido. Factor de distancia al tablero puede ajustar el valor.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ── TRES PILARES ──────────────────────────────────────────────────── */}
        <Box sx={{ bgcolor: '#F8FAFC', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {PILLARS.map((p, i) => (
                <Grid key={i} size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      bgcolor: '#fff',
                      borderRadius: 3,
                      p: 4,
                      height: '100%',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      borderTop: '4px solid',
                      borderColor: '#0898b9',
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem', mb: 2 }}>{p.icon}</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5, color: '#2A3547', fontSize: '1.15rem' }}>
                      {p.title}
                    </Typography>
                    <Typography sx={{ color: '#64748B', lineHeight: 1.7, fontSize: '0.95rem' }}>
                      {p.body}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── ESCENARIOS / OPCIONES ─────────────────────────────────────────── */}
        <Box sx={{ bgcolor: '#ffffff', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography
              component="h2"
              variant="h2"
              sx={{ fontWeight: 700, textAlign: 'center', mb: 1.5, color: '#2A3547' }}
            >
              Un presupuesto para cada situación
            </Typography>
            <Typography sx={{ textAlign: 'center', color: '#64748B', mb: 6, fontSize: '1rem', maxWidth: 560, mx: 'auto' }}>
              El cotizador detecta automáticamente la mejor opción según tu tipo de propiedad y estacionamiento.
            </Typography>

            <Grid container spacing={4} alignItems="stretch">
              {SCENARIOS.map((s, i) => (
                <Grid key={i} size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      border: s.highlight ? '2px solid #e81a68' : '1px solid #E2E8F0',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: s.highlight ? '0 4px 20px rgba(232,26,104,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    {s.highlight && (
                      <Box sx={{ bgcolor: '#e81a68', py: 1, textAlign: 'center' }}>
                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.75rem' }}>
                          OPCIÓN MÁS POPULAR
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Box sx={{ mb: 2 }}>{s.icon}</Box>
                      <Chip
                        label={s.tag}
                        size="small"
                        sx={{ bgcolor: '#e0f4fa', color: '#0777a0', fontWeight: 600, fontSize: '0.7rem', mb: 2, borderRadius: '9999px' }}
                      />
                      <Typography variant="h3" sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#2A3547', mb: 1 }}>
                        {s.title}
                      </Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: '#0898b9', mb: 2 }}>
                        {s.price}
                      </Typography>
                      <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
                        {s.features.map((f, j) => (
                          <Box key={j} component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#00C47C', flexShrink: 0 }} />
                            <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>{f}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ p: 3, pt: 0 }}>
                      <Button
                        component={Link}
                        href="/cotizador"
                        fullWidth
                        variant={s.highlight ? 'contained' : 'outlined'}
                        sx={{
                          bgcolor: s.highlight ? '#e81a68' : 'transparent',
                          '&:hover': { bgcolor: s.highlight ? '#c01556' : '#e0f4fa' },
                          borderColor: '#0898b9',
                          color: s.highlight ? '#fff' : '#0898b9',
                          fontWeight: 700,
                          borderRadius: 2,
                          textTransform: 'none',
                          py: 1.2,
                        }}
                      >
                        {s.cta}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── STATS (dark band) ─────────────────────────────────────────────── */}
        <Box sx={{ bgcolor: '#0F172A', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center" textAlign="center">
              {[
                { value: '39', label: 'Comunas cubiertas en RM' },
                { value: '100%', label: 'Instalaciones con certificado SEC' },
                { value: '2 min', label: 'Para obtener tu presupuesto exacto' },
                { value: '$0', label: 'Inversión inicial electrolinera edificio' },
              ].map((s, i) => (
                <Grid key={i} size={{ xs: 6, md: 3 }}>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' }, color: '#0898b9', lineHeight: 1 }}
                  >
                    {s.value}
                  </Typography>
                  <Typography sx={{ color: '#94A3B8', fontSize: '0.85rem', mt: 1 }}>{s.label}</Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── CÓMO FUNCIONA ─────────────────────────────────────────────────── */}
        <Box sx={{ bgcolor: '#F8FAFC', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography
              component="h2"
              variant="h2"
              sx={{ fontWeight: 700, textAlign: 'center', mb: 1.5, color: '#2A3547' }}
            >
              Tu presupuesto en 3 pasos simples
            </Typography>
            <Typography sx={{ textAlign: 'center', color: '#64748B', mb: 7, fontSize: '1rem' }}>
              Sin formularios de contacto. Sin esperar que te llamen. Precio exacto en pantalla.
            </Typography>
            <Grid container spacing={5} alignItems="flex-start">
              {STEPS.map((s, i) => (
                <Grid key={i} size={{ xs: 12, md: 4 }}>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: '#0898b9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>{s.number}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h3" sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#2A3547', mb: 1 }}>
                        {s.title}
                      </Typography>
                      <Typography sx={{ color: '#64748B', lineHeight: 1.7, fontSize: '0.9rem' }}>{s.body}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                component={Link}
                href="/cotizador"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#e81a68',
                  '&:hover': { bgcolor: '#c01556' },
                  fontWeight: 700,
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                Ir al cotizador ahora
              </Button>
            </Box>
          </Container>
        </Box>

        {/* ── QUÉ INCLUYE (tabla) ───────────────────────────────────────────── */}
        <Box sx={{ bgcolor: '#ffffff', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              variant="h2"
              sx={{ fontWeight: 700, textAlign: 'center', mb: 1.5, color: '#2A3547' }}
            >
              ¿Qué incluye el precio del presupuesto?
            </Typography>
            <Typography sx={{ textAlign: 'center', color: '#64748B', mb: 5, fontSize: '1rem' }}>
              El cotizador calcula un precio todo incluido: no hay costos adicionales después de la instalación.
            </Typography>

            <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
              {/* Header */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 120px',
                  bgcolor: '#0898b9',
                  px: 3,
                  py: 2,
                }}
              >
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>Ítem</Typography>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', textAlign: 'center' }}>Casa</Typography>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', textAlign: 'center' }}>Edificio</Typography>
              </Box>
              {/* Filas */}
              {INCLUDED.map((row, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px 120px',
                    px: 3,
                    py: 2,
                    bgcolor: i % 2 === 0 ? '#fff' : '#F8FAFC',
                    borderBottom: i < INCLUDED.length - 1 ? '1px solid #E2E8F0' : 'none',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '0.875rem', color: '#2A3547' }}>{row.item}</Typography>
                  <Typography sx={{ textAlign: 'center', fontSize: '1.1rem', color: row.casa ? '#00C47C' : '#E2E8F0' }}>
                    {row.casa ? '✓' : '—'}
                  </Typography>
                  <Typography sx={{ textAlign: 'center', fontSize: '1.1rem', color: row.edificio ? '#00C47C' : '#E2E8F0' }}>
                    {row.edificio ? '✓' : '—'}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography sx={{ fontSize: '0.8rem', color: '#64748B', mt: 2, textAlign: 'center' }}>
              Todos los precios incluyen IVA (19%). Instaladores certificados por la SEC.
              ¿Tienes dudas sobre el proceso?{' '}
              <Box
                component={Link}
                href="/blog/como-usar-cotizador-cargador-electrico"
                sx={{ color: '#0898b9', textDecoration: 'underline' }}
              >
                Lee la guía paso a paso
              </Box>
              .
            </Typography>
          </Container>
        </Box>

        {/* ── COMUNAS COBERTURA (GEO/SEO) ──────────────────────────────────── */}
        <Box sx={{ bgcolor: '#ffffff', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography
              component="h2"
              variant="h2"
              sx={{ fontWeight: 700, textAlign: 'center', mb: 1.5, color: '#2A3547' }}
            >
              Instalación de cargadores EV en toda la Región Metropolitana
            </Typography>
            <Typography sx={{ textAlign: 'center', color: '#64748B', mb: 6, fontSize: '1rem', maxWidth: 620, mx: 'auto' }}>
              Enérgica City instala cargadores Wallbox y electrolineras comunitarias en 39 comunas de la RM.
              El cotizador online valida tu dirección automáticamente.
            </Typography>

            <Grid container spacing={3}>
              {[
                {
                  zona: 'Centro',
                  comunas: ['Santiago'],
                },
                {
                  zona: 'Oriente',
                  comunas: ['Providencia', 'Ñuñoa', 'Las Condes', 'Vitacura', 'Lo Barnechea', 'La Reina'],
                },
                {
                  zona: 'Suroriente',
                  comunas: ['La Florida', 'Puente Alto', 'Peñalolén', 'San José de Maipo'],
                },
                {
                  zona: 'Sur',
                  comunas: ['San Miguel', 'La Cisterna', 'San Joaquín', 'La Granja', 'El Bosque', 'La Pintana', 'Pedro Aguirre Cerda', 'Lo Espejo', 'San Ramón'],
                },
                {
                  zona: 'Surponiente',
                  comunas: ['Maipú', 'Cerrillos', 'Estación Central'],
                },
                {
                  zona: 'Poniente',
                  comunas: ['Quinta Normal', 'Lo Prado', 'Pudahuel', 'Cerro Navia'],
                },
                {
                  zona: 'Norte',
                  comunas: ['Recoleta', 'Independencia', 'Conchalí', 'Huechuraba', 'Quilicura', 'Renca', 'Colina', 'Lampa'],
                },
              ].map((z, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      border: '1px solid #E2E8F0',
                      overflow: 'hidden',
                      height: '100%',
                    }}
                  >
                    <Box sx={{ bgcolor: '#0898b9', px: 2.5, py: 1.5 }}>
                      <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                        ZONA {z.zona.toUpperCase()}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                      <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {z.comunas.map((c) => (
                          <Box
                            key={c}
                            component="li"
                            sx={{
                              bgcolor: '#e0f4fa',
                              color: '#0777a0',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: '9999px',
                            }}
                          >
                            {c}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                mt: 5,
                p: 3,
                bgcolor: '#F8FAFC',
                borderRadius: 3,
                border: '1px solid #E2E8F0',
                maxWidth: 720,
                mx: 'auto',
                textAlign: 'center',
              }}
            >
              <Typography sx={{ color: '#2A3547', fontSize: '0.9rem', lineHeight: 1.7 }}>
                <strong>¿Vives en otra región de Chile?</strong> El cotizador validará tu dirección automáticamente.
                Si tu comuna no está cubierta, el sistema te lo indicará de inmediato y podrás contactarnos
                para evaluar disponibilidad en tu zona.
              </Typography>
              <Button
                component={Link}
                href="/contactanos"
                variant="contained"
                sx={{
                  mt: 2.5,
                  bgcolor: '#e81a68',
                  '&:hover': { bgcolor: '#c01556' },
                  fontWeight: 700,
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Verificar mi dirección →
              </Button>
            </Box>
          </Container>
        </Box>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <Box sx={{ bgcolor: '#F8FAFC', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              variant="h2"
              sx={{ fontWeight: 700, textAlign: 'center', mb: 6, color: '#2A3547' }}
            >
              Preguntas frecuentes sobre el presupuesto
            </Typography>
            <PresupuestoFAQ faqs={FAQS} />
            <Typography sx={{ textAlign: 'center', mt: 4, color: '#64748B', fontSize: '0.875rem' }}>
              ¿Necesitas más información?{' '}
              <Box component={Link} href="/contactanos" sx={{ color: '#0898b9', textDecoration: 'underline' }}>
                Contáctanos
              </Box>{' '}
              o revisa nuestra{' '}
              <Box
                component={Link}
                href="/blog/como-usar-cotizador-cargador-electrico"
                sx={{ color: '#0898b9', textDecoration: 'underline' }}
              >
                guía completa del cotizador
              </Box>
              .
            </Typography>
          </Container>
        </Box>

        {/* ── CTA FINAL (dark) ──────────────────────────────────────────────── */}
        <Box sx={{ bgcolor: '#0F172A', py: { xs: 7, md: 10 }, textAlign: 'center' }}>
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h2"
              sx={{ fontWeight: 700, color: '#fff', mb: 2, fontSize: { xs: '1.75rem', md: '2rem' } }}
            >
              ¿Listo para obtener tu presupuesto?
            </Typography>
            <Typography sx={{ color: '#94A3B8', mb: 4, fontSize: '1rem', lineHeight: 1.7 }}>
              Precio exacto en 2 minutos. Sin registro, sin llamadas.
              Casa o edificio en RM y Valparaíso.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                href="/cotizador"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#e81a68',
                  '&:hover': { bgcolor: '#c01556' },
                  fontWeight: 700,
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                Ir al cotizador →
              </Button>
              <Button
                component={Link}
                href="/cotizador?type-schedule"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                Agendar visita técnica
              </Button>
            </Box>
          </Container>
        </Box>
      </PageContainer>
    </>
  )
}

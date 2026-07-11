import { Box, Container, Typography } from '@mui/material';

const REVIEWS = [
  {
    nombre: 'Francisco Olave',
    imagen: 'https://lh3.googleusercontent.com/a/ACg8ocJcFalZpnmQyEXK9bn9kwYDY-FF0ylOG3fZAZQh6jKkc7-J5w=w36-h36-p-rp-mo-br100',
    review: 'Excelente servicio de principio a fin, con asesoría desde el primer minuto sobre la instalación del cargador y buenos precios, gestionando además un segundo empalme de uso exclusivo.',
    vehiculo: 'Auto eléctrico',
  },
  {
    nombre: 'Pablo Rodriguez',
    imagen: 'https://lh3.googleusercontent.com/a-/ALV-UjV-tOBDMUTTGCSVHEnP_ojdNIa8ldtz4kPFtgl3vBWkSxHw3IQI=w36-h36-p-rp-mo-ba12-br100',
    review: 'Excelente servicio, asesoría y calidad. La instalación en edificio fue de primer nivel, recepcionada sin observaciones en la SEC, informando a la comunidad a un precio justo.',
    vehiculo: null,
  },
  {
    nombre: 'Guillermo Flores',
    imagen: 'https://lh3.googleusercontent.com/a-/ALV-UjUjLlKdr2BViYJYZKsIEQsO3L3ErrrwU1RTBxfC0IAb-OapWJKdJg=w36-h36-p-rp-mo-br100',
    review: 'Me asesoraron con todas las dudas que tenía y realizaron un excelente trabajo al momento de instalar cargador para mi Tesla.',
    vehiculo: 'Tesla',
  },
  {
    nombre: 'Francisca Escobar Purcell',
    imagen: 'https://lh3.googleusercontent.com/a-/ALV-UjWMMX_x6GodRzwJH9m6USb8PyRoz25NLIaNpWkqWe2PJmf7efqIqQ=w36-h36-p-rp-mo-br100',
    review: 'Excelente servicio, son muy profesionales y muy amables, los recomiendo al 100%.',
    vehiculo: null,
  },
  {
    nombre: 'Yerman Silva',
    imagen: 'https://lh3.googleusercontent.com/a/ACg8ocLI6fyHqycR7lnNkOTqpqTIzgiwNmpeSGJ7CP-IRv7arYT4fA=w36-h36-p-rp-mo-br100',
    review: 'Servicio rápido y bien realizado, empresa super recomendada.',
    vehiculo: null,
  },
  {
    nombre: 'Daniela Álvarez',
    imagen: 'https://lh3.googleusercontent.com/a/ACg8ocKI_PWL4h0NvobGMkZP---_BEia9liyJW64uPmDzCaudmvE_88=w36-h36-p-rp-mo-br100',
    review: 'Servicio 10/10.',
    vehiculo: null,
  },
  {
    nombre: 'Victor del Solar Stevenson',
    imagen: 'https://lh3.googleusercontent.com/a-/ALV-UjVAP6Enz5F5ZJvewqDq8n-MWEqa4gy06c_WSWmt3IgtG58WuJSE=w36-h36-p-rp-mo-br100',
    review: 'Excelente servicio y atención.',
    vehiculo: null,
  },
  {
    nombre: 'nahtalia araya',
    imagen: 'https://lh3.googleusercontent.com/a/ACg8ocK1I6BtMODlmE5RQEdxIBQQDHPvcHnXkvRLKhQq_uf_llfmaQ=w36-h36-p-rp-mo-br100',
    review: 'Excelente servicio.',
    vehiculo: null,
  },
  {
    nombre: 'Oscar Gonzalez',
    imagen: 'https://lh3.googleusercontent.com/a-/ALV-UjVjLNgiASNqrIUYr908mOBsPSVdSqiK9-ZAW68JFYzwU5VLonFGjg=w36-h36-p-rp-mo-br100',
    review: 'Excelente servicio.',
    vehiculo: null,
  },
];

const STARS = <span style={{ color: '#F5A623', fontSize: 18, letterSpacing: 1 }}>★★★★★</span>;

const GOOGLE_LOGO = (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-label="Google">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

export default function HomeReviewsSection() {
  return (
    <Box
      component="section"
      aria-label="Opiniones de clientes"
      sx={{ bgcolor: '#ffffff', py: { xs: 7, md: 10 } }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={{ xs: 5, md: 7 }}>
          <Typography
            component="p"
            sx={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#0898b9',
              textTransform: 'uppercase',
              mb: '12px',
            }}
          >
            Clientes satisfechos
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '22px', md: '32px' },
              fontWeight: 700,
              color: '#0D1A14',
              lineHeight: 1.2,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Descubre por qué tantos clientes, comunidades de edificios y empresas confían en nuestras plataformas e instalaciones de cargadores para sus vehículos eléctricos.
          </Typography>
        </Box>

        {/* Cards grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
            '& .review-card': {
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            },
            '& .review-card:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.10)',
            },
          }}
        >
          {REVIEWS.map((r) => (
            <Box
              key={r.nombre}
              className="review-card"
              sx={{
                bgcolor: '#fff',
                borderRadius: '16px',
                p: '28px',
                border: '1px solid #E8EDE9',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Top accent */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #0898b9, #4dbfd9)',
                }}
              />

              {/* Stars + Google logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '16px' }}>
                {STARS}
                {GOOGLE_LOGO}
              </Box>

              {/* Quote */}
              <Typography
                sx={{
                  fontSize: '15px',
                  lineHeight: 1.65,
                  color: '#3D4D42',
                  fontStyle: 'italic',
                  mb: '20px',
                  flexGrow: 1,
                }}
              >
                &ldquo;{r.review}&rdquo;
              </Typography>

              {/* Author */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.imagen}
                  alt={r.nombre}
                  width={36}
                  height={36}
                  style={{ borderRadius: '50%', flexShrink: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#0D1A14', lineHeight: 1.2 }}>
                    {r.nombre}
                  </Typography>
                  {r.vehiculo && (
                    <Typography sx={{ fontSize: '12px', color: '#0898b9', fontWeight: 500 }}>
                      {r.vehiculo}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Trust bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: { xs: 3, md: 0 },
            mt: { xs: 5, md: 7 },
            pt: { xs: 4, md: 5 },
            borderTop: '1px solid #E8EDE9',
          }}
        >
          {[
            { value: '4.3 ★', label: 'Valoración Google' },
            { value: '17+', label: 'Reseñas verificadas' },
            { value: '100%', label: 'Instaladores SEC' },
          ].map((s, i, arr) => (
            <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, md: 4 } }}>
              <Box textAlign="center" sx={{ px: { xs: 0, md: 4 } }}>
                <Typography sx={{ fontSize: { xs: '28px', md: '34px' }, fontWeight: 800, color: '#0898b9', lineHeight: 1 }}>
                  {s.value}
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#7A8F80', mt: '4px' }}>
                  {s.label}
                </Typography>
              </Box>
              {i < arr.length - 1 && (
                <Box sx={{ display: { xs: 'none', md: 'block' }, width: '1px', height: '40px', bgcolor: '#E8EDE9' }} />
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

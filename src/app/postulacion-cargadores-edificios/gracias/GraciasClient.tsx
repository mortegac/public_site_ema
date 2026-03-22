'use client';
import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function GraciasElectrolinerasPage() {
  return (
    <Box
      id="FORMULARIO-ELECTROLINERA"
      sx={{
        backgroundColor: '#f8fafc',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        py: 10,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '24px',
            border: '1px solid rgba(0, 17, 51, 0.15)',
            padding: { xs: '32px 24px', md: '56px 48px' },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ fontSize: { xs: '24px', md: '32px' }, mb: 3 }}
          >
            ¡Gracias por dar el primer paso hacia la electromovilidad! 🎉
          </Typography>

          <Typography
            sx={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: 'text.secondary',
              mb: 4,
            }}
          >
            Hemos recibido tu postulación. Nuestro equipo evaluará la
            factibilidad técnica y la coordinación con la administración o
            entidad responsable.
            <br />
            <br />
            Recibirás una respuesta de nuestros consultores lo antes posible.
          </Typography>

          <Link href="/" prefetch>
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: '24px',
                paddingX: 4,
                paddingY: 1.5,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              Volver al inicio
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

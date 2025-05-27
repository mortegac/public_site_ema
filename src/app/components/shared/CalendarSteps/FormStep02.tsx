"use client";

// components/OrderConfirmation.tsx
import React from 'react';
import { Box, Container, Typography, Button, Paper, Divider, useTheme } from '@mui/material';

export default function FormStep02() {
  const theme = useTheme(); // Acceder al tema para los colores

  // Datos de ejemplo, en una app real vendrían de props o un estado global
  const orderDetails = {
    email: 'email@hotmail.com',
    productName: 'Visita Técnica 02 de Junio',
    time: '09:00 Hrs',
    price: 10000,
  };

  // Formato para el dinero (ej. para Chile, sin decimales y con separador de miles)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box bgcolor="#ffffff" pt={4} pb={4} width={"90%"} mt={4}
      sx={{
        boxSizing: 'border-box',
        border: '1px solid #EAEFF4',
        borderRadius: '12px',
      }}>
        <Container
          sx={{
            maxWidth: "1400px !important",
            position: "relative",
          }}
        >
    {/* Cabecera superior con texto blanco */}
        <Box
          sx={{
            p: 3,
            backgroundColor: 'transparent', // Fondo transparente, el Paper ya tiene el color
            color: theme.palette.text.primary, // Texto oscuro en esta sección
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Realice el pago para reservar su visista
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Email: {orderDetails.email}
          </Typography> */}
        </Box>

        <Divider sx={{ mx: 3 }} /> {/* Separador con margen horizontal */}

        {/* Detalles del pedido */}
        <Box sx={{ p: 3, flexGrow: 1 }}> {/* flexGrow para que ocupe el espacio disponible */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="body1" sx={{ flexGrow: 1, pr: 2 }}>
              {orderDetails.productName}
              <br />
              {orderDetails.time}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {formatCurrency(orderDetails.price)}
            </Typography>
          </Box>
        </Box>

        {/* Sección del total y botón de pago */}
        <Box
          sx={{
            p: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.05)', // Un fondo ligeramente más oscuro para el total (ajusta si quieres un color sólido)
            borderTop: `1px solid ${theme.palette.divider}`, // Borde superior para separar
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Total a pagar:
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="primary">
              {formatCurrency(orderDetails.price)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo de Webpay */}
            <img
              src="/images/svgs/webpay-logo.svg" // Asegúrate de tener este logo en tu carpeta public/
              // src="/images/logos/dark-logo.svg" // Asegúrate de tener este logo en tu carpeta public/
              alt="Webpay by Transbank"
              style={{ height: '60px', objectFit: 'contain' }}
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Estilo para la flecha, puedes usar un icono de MUI si lo prefieres
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    '&::after': {
                      content: '"\\276F"', // Carácter de flecha derecha
                      fontSize: '16px',
                      lineHeight: 1,
                    },
                  }}
                />
              }
              sx={{
                paddingX: 4,
                paddingY: 1.5,
                borderRadius: '24px', // Ya definido en el tema, pero se puede sobrescribir aquí
                boxShadow: theme.shadows[3],
                '&:hover': {
                  boxShadow: theme.shadows[6],
                },
              }}
              onClick={() => alert('Continuar con el pago')}
            >
              Continuar
            </Button>
          </Box>
        </Box>
        </Container>
        </Box>
  );
}
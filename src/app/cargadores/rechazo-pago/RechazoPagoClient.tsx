'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import InfoIcon from '@mui/icons-material/Info';
import PageContainer from '@/app/components/container/PageContainer';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';
import { useAnalytics } from '@/hooks/useAnalytics';
import { fetchWebpayStart } from '@/store/Webpay/services';

const RechazoPago = () => {
  const theme = useTheme();
  const { trackEvent } = useAnalytics();
  trackEvent('rechazo_pago', 'CARGADORES', 'pago rechazado desde webpay');

  const [paymentData, setPaymentData] = useState({
    glosa: '',
    total: '',
    order: '',
    email: '',
    shoppingCartId: '',
    hasData: false,
  });

  const hasReadData = useRef(false);

  useEffect(() => {
    if (hasReadData.current) return;
    const storedData = sessionStorage.getItem('paymentData');
    if (storedData) {
      hasReadData.current = true;
      const data = JSON.parse(storedData);
      setPaymentData({
        glosa: data.glosa || '',
        total: data.total || '',
        order: data.order || '',
        email: data.email || '',
        shoppingCartId: data.shoppingCartId || '',
        hasData: true,
      });
      sessionStorage.removeItem('paymentData');
    } else {
      hasReadData.current = true;
      setPaymentData(prev => ({ ...prev, hasData: false }));
    }
  }, []);

  const handleRetry = async () => {
    try {
      const response = await fetchWebpayStart({
        shoppingCartId: String(paymentData.shoppingCartId),
        glosa: String(paymentData.glosa),
      });
      if (response?.url) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = response.url;
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'token_ws';
        input.value = response.token;
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error('Error al reintentar el pago:', error);
    }
  };

  return (
    <PageContainer title="Pago rechazado" description="Hubo un problema con tu pago">
      <HpHeaderNew />
      <Box id="VENTA-CARGADOR-RECHAZO" sx={{ backgroundColor: '#f8fafc', minHeight: '70vh', py: 4 }}>
        <Container maxWidth="md">
          {paymentData.hasData ? (
            <>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <svg width="80" height="80" viewBox="0 0 143 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="71.5" cy="71.5" r="65.5" fill="white" stroke="#F4706E" strokeWidth="8"/>
                  <path d="M46 46L97 97M97 46L46 97" stroke="#F4706E" strokeWidth="8" strokeLinecap="round"/>
                </svg>
                <Typography variant="h4" fontWeight={700} mt={2} color="text.primary">
                  Pago rechazado
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  La transacción no pudo completarse
                </Typography>
              </Box>

              <Paper elevation={0} sx={{ backgroundColor: '#fff', borderRadius: '0.5rem', p: 4, maxWidth: 570, mx: 'auto' }}>
                <Typography sx={{ color: '#37373c', fontSize: '14px', lineHeight: '24px', fontWeight: 300, textAlign: 'center', mb: 2 }}>
                  Lamentamos informarte que hubo un problema con tu transacción y el pago fue rechazado.
                </Typography>
                <Typography sx={{ color: '#37373c', fontSize: '14px', lineHeight: '24px', fontWeight: 300, textAlign: 'center' }}>
                  Puedes reintentar el pago o contactar a soporte si el problema persiste.
                </Typography>
              </Paper>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 6, flexDirection: { xs: 'column', md: 'row' } }}>
                {paymentData.shoppingCartId && (
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ paddingX: 4, paddingY: 1.5, borderRadius: '24px', background: '#E81A68', color: '#FFFFFF', border: '1px solid #E81A68', width: { xs: '100%', md: 'auto' } }}
                    onClick={() => {
                      handleRetry();
                      trackEvent('reintentar_pago', 'CARGADORES', 'reintentar pago cargador');
                    }}
                  >
                    Reintentar el pago
                  </Button>
                )}
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/cargadores-vehiculos-electricos-sin-instalacion"
                  sx={{ paddingX: 4, paddingY: 1.5, borderRadius: '24px', background: '#FFFFFF', color: '#E81A68', border: '1px solid #E81A68', width: { xs: '100%', md: 'auto' } }}
                  onClick={() => trackEvent('volver_tienda', 'CARGADORES', 'volver a la tienda')}
                >
                  Volver a la tienda
                </Button>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                <Button
                  variant="text"
                  size="large"
                  component={Link}
                  href={`/soporte?glosa=${paymentData.glosa}&total=${paymentData.total}&order=${paymentData.order}&email=${paymentData.email}`}
                  startIcon={<InfoIcon />}
                  sx={{ color: '#E81A68', width: { xs: '100%', md: 'auto' } }}
                  onClick={() => trackEvent('crear_ticket_soporte', 'CARGADORES', 'ir a soporte por pago rechazado')}
                >
                  Crear un ticket de soporte
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column' }}>
              <Typography sx={{ color: '#37373c', fontSize: '16px', lineHeight: '24px', fontWeight: 300, textAlign: 'center' }}>
                No se encontraron datos de la transacción
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/cargadores-vehiculos-electricos-sin-instalacion"
                sx={{ paddingX: 4, paddingY: 1.5, borderRadius: '24px', background: '#FFFFFF', color: '#E81A68', border: '1px solid #E81A68', width: { xs: '80%', md: 'auto' }, mt: 3 }}
              >
                Ver cargadores
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </PageContainer>
  );
};

export default RechazoPago;

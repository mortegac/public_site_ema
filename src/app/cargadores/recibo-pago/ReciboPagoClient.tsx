'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import PageContainer from '@/app/components/container/PageContainer';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';
import { formatCurrency } from '@/utils/currency';
import { useAnalytics } from '@/hooks/useAnalytics';
import { fetchWebpayStart } from '@/store/Webpay/services';

const ReciboPago = () => {
  const theme = useTheme();
  const { trackEvent } = useAnalytics();
  trackEvent('exito_pago', 'CARGADORES', 'pago exitoso desde webpay');

  const [paymentData, setPaymentData] = useState({
    glosa: '',
    total: '',
    order: '',
    card: '',
    typePay: '',
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
        card: data.card || '',
        typePay: data.typePay || '',
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

  return (
    <PageContainer title="Compra exitosa" description="Tu compra fue procesada exitosamente">
      <HpHeaderNew />
      <Box id="VENTA-CARGADOR-PAGADO" sx={{ backgroundColor: '#f8fafc', minHeight: '70vh', py: 4 }}>
        <Container maxWidth="md">
          {paymentData.hasData ? (
            <>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <svg width="80" height="80" viewBox="0 0 143 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="71.5" cy="71.5" r="65.5" fill="white" stroke="#4CAF50" strokeWidth="8"/>
                  <path d="M40 72L62 94L103 50" stroke="#4CAF50" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Typography variant="h4" fontWeight={700} mt={2} color="text.primary">
                  ¡Compra exitosa!
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  Tu pago fue procesado correctamente
                </Typography>
              </Box>

              <Paper elevation={0} sx={{ backgroundColor: '#fff', borderRadius: '0.5rem', p: 4, maxWidth: 570, mx: 'auto' }}>
                <Typography sx={{ color: '#37373c', fontSize: '14px', lineHeight: '24px', fontWeight: 300, textAlign: 'center', mb: 4 }}>
                  A continuación encontrarás el detalle de tu compra:
                </Typography>

                <TableContainer>
                  <Table size="small" sx={{ mb: 3 }}>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: 'rgb(247, 245, 255)', borderRadius: '8px 0 0 8px', color: 'rgb(33,33,33)', py: 1, px: 2 }}>
                          <Typography fontWeight="bold">Producto:</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: 'rgb(247, 245, 255)', borderRadius: '0 8px 8px 0', color: 'rgb(33,33,33)', py: 1, px: 2 }}>
                          {paymentData.glosa}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Table size="small" sx={{ mb: 3 }}>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#44BDF2', borderRadius: '8px 0 0 8px', color: '#212121', py: 1, px: 2 }}>
                          <Typography fontWeight="bold" fontSize="1.5rem">Total</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#44BDF2', borderRadius: '0 8px 8px 0', color: '#212121', py: 1, px: 2 }}>
                          <Typography fontSize="1.5rem">{formatCurrency(Number(paymentData.total))}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: 'rgb(247, 245, 255)', borderRadius: '8px 0 0 8px', color: 'rgb(33,33,33)', py: 1, px: 2 }}>
                          <Typography fontWeight="bold">ORDEN</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: 'rgb(247, 245, 255)', borderRadius: '0 8px 8px 0', color: 'rgb(33,33,33)', py: 1, px: 2 }}>
                          <Typography fontWeight="bold">{paymentData.order}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ py: 1, px: 2 }}><Typography fontWeight="bold">Tarjeta</Typography></TableCell>
                        <TableCell sx={{ py: 1, px: 2 }}>{paymentData.card}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: 'rgb(247, 245, 255)', borderRadius: '8px 0 0 8px', color: 'rgb(33,33,33)', py: 1, px: 2 }}>
                          <Typography fontWeight="bold">Tipo de pago</Typography>
                        </TableCell>
                        <TableCell sx={{ backgroundColor: 'rgb(247, 245, 255)', borderRadius: '0 8px 8px 0', color: 'rgb(33,33,33)', py: 1, px: 2 }}>
                          {paymentData.typePay}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 6, flexDirection: { xs: 'column', md: 'row' } }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/cargadores-vehiculos-electricos-sin-instalacion"
                  sx={{ paddingX: 4, paddingY: 1.5, borderRadius: '24px', background: '#FFFFFF', color: '#E81A68', border: '1px solid #E81A68', width: { xs: '100%', md: 'auto' } }}
                  onClick={() => trackEvent('seguir_comprando', 'CARGADORES', 'volver a la tienda')}
                >
                  Seguir comprando
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/cotizador"
                  sx={{ paddingX: 4, paddingY: 1.5, borderRadius: '24px', boxShadow: theme.shadows[3], width: { xs: '100%', md: 'auto' } }}
                  onClick={() => trackEvent('simular_instalacion', 'CARGADORES', 'ir al cotizador')}
                >
                  Simular costo de instalación
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

export default ReciboPago;

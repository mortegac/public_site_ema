'use client';
import React, {useEffect} from 'react';
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

import { useAnalytics } from '@/hooks/useAnalytics';


import {SvgSuccess} from "./SvgSuccess";
import { formatCurrency } from "@/utils/currency";

interface InvoiceProps {
  glosa: string;
  total: string;
  order: string;
  card: string;
  typePay: string;
  email: string;
}

const Invoice: React.FC<InvoiceProps> = ({ glosa, total, order, card, typePay, email }) => {
    const theme = useTheme(); // Acceder al tema para los colores
    const { trackEvent } = useAnalytics();
    trackEvent('exito_pago', 'AGENDA_EMA', 'pago existoso desde webpay')

  return (
    <Box
      sx={{
        backgroundColor: '#f8fafc',
        color: '#74787e',
        height: '100%',
        lineHeight: 1.4,
        width: '100%',
        wordBreak: 'keep-all',
        p:0,
      }}
    >
     <Container 
        maxWidth="md" 
        sx={{ 
          p: { xs: 0, md: 4 } // 0 en móviles, 4 en desktop
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <SvgSuccess email={email} />
        </Box>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
            p: 4,
            maxWidth: 570,
            mx: 'auto',
          }}
        >
          <Typography
            sx={{
              color: '#37373c',
              fontSize: '14px',
              lineHeight: '24px',
              fontWeight: 300,
              textAlign: 'center',
              mb: 4,
            }}
          >
            A continuación encontrarás el detalle de tu compra:
          </Typography>

          <TableContainer>
            <Table size="small" sx={{ mb: 3 }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '8px 0 0 8px',
                      color: 'rgb(33, 33, 33)',
                      width: '16%',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontWeight="bold">Servicio:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '0 8px 8px 0',
                      color: 'rgb(33, 33, 33)',
                      width: '84%',
                      py: 1,
                      px: 2,
                    }}
                  >
                    {glosa}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table size="small" sx={{ mb: 3 }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: '#44BDF2',
                      borderRadius: '8px 0 0 8px',
                      color: '#212121',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontWeight="bold" fontSize="1.5rem">Total</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: '#44BDF2',
                      borderRadius: '0 8px 8px 0',
                      color: '#212121',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontSize="1.5rem">{formatCurrency(Number(total))}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '8px 0 0 8px',
                      color: 'rgb(33, 33, 33)',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontWeight="bold">ORDEN</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '0 8px 8px 0',
                      color: 'rgb(33, 33, 33)',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontWeight="bold">{order}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ py: 1, px: 2 }}>
                    <Typography fontWeight="bold">Tarjeta</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1, px: 2 }}>{card}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '8px 0 0 8px',
                      color: 'rgb(33, 33, 33)',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography fontWeight="bold">Tipo de pago</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: 'rgb(247, 245, 255)',
                      borderRadius: '0 8px 8px 0',
                      color: 'rgb(33, 33, 33)',
                      py: 1,
                      px: 2,
                    }}
                  >
                    {typePay}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          <Typography
            sx={{
              color: '#37373c',
              fontSize: '14px',
              lineHeight: '24px',
              fontWeight: 300,
              textAlign: 'center',
              mb: 4,
              mt: 8,
            }}
          >
            En caso de instalar con nosotros, este monto será descontado de la cotización
          </Typography>
          
        </Paper>
      
      <Box bgcolor="#f8fafc" width={"100%"} mt={10} 
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 0 }
        }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: '24px',
            background:"#FFFFFF",
            color:"#E81A68",
            border: "1px solid #E81A68",
            width: { xs: '100%', md: 'auto' }
          }}
          href="/agenda"
        //   onClick={() => dispatch(setStep(0))}
        >
          Agendar otra visita
        </Button>
        
        <Button
          variant="contained"
          type="submit"
          color="primary"
          size="large"
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: '24px',
            boxShadow: theme.shadows[3],
            '&:hover': {
              boxShadow: theme.shadows[6],
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
              color: 'rgba(0, 0, 0, 0.26)',
            },
            width: { xs: '100%', md: 'auto' }
          }}
          href="https://docs.google.com/forms/d/e/1FAIpQLSfMaGlC8UlSWZxTZgpTmD1sCftJJFv2EvAD_v5W0eIWzgwrkQ/viewform"
          target='_blank'
        >
          Simular costo de instalación
        </Button>
            
      </Box>
      </Container>
    </Box>
  );
};

export default Invoice;
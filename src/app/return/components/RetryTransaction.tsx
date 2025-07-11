"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InfoIcon from '@mui/icons-material/Info';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

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
  
import Image from 'next/image';

import {SvgFailed} from "./SvgFailed";
import { formatCurrency } from "@/utils/currency";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectWebpay, getWebpayStart} from "@/store/Webpay/slice";
import {fetchWebpayStart, WebpayStartResponse} from '@/store/Webpay/services';
import { useAnalytics } from '@/hooks/useAnalytics';

interface RetryTransactionProps {
  glosa: string;
  total: string;
  order: string;
  // card: string;
  // typePay: string;
  email: string;
  shoppingCartId: string | null;
}


const RetryTransaction: React.FC<RetryTransactionProps> = ({ glosa, total, order, email, shoppingCartId }) => {
// const RetryTransaction: React.FC = () => {
    const theme = useTheme(); // Acceder al tema para los colores
    const router = useRouter();
    
    const dispatch = useAppDispatch();

    const { trackEvent } = useAnalytics();
    trackEvent('rechazo_pago', 'AGENDA_EMA', 'pago existoso desde webpay')


    const getRetry = async () => {
      try {
        const response = await (fetchWebpayStart({ 
          shoppingCartId: String(shoppingCartId),
          glosa: String(glosa),
        }));

        if (response?.url) {
          // Crear un formulario dinámico para hacer el POST
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = response.url;

          // Agregar los campos necesarios
          const fields = {
            token_ws: response.token,
            order: response.order
          };

          Object.entries(fields).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
          });

          // Agregar el formulario al documento y enviarlo
          document.body.appendChild(form);
          form.submit();
        }
      } catch (error) {
        console.error('Error al procesar el pago:', error);
      }
    };
    
    
    // await dispatch(getWebpayStart({ 
    //   shoppingCartId: String(shoppingCartId),
    //   glosa: String(glosa),
    // }))
    
  return (
    <>
    {/* <pre>shoppingCartId = {JSON.stringify(shoppingCartId)}</pre> */}
      <Box
        sx={{
          backgroundColor: '#f8fafc',
          color: '#74787e',
          height: '100%',
          lineHeight: 1.4,
          width: '100%',
          wordBreak: 'keep-all',
        }}
      >
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              fontWeight={700}
              lineHeight="1.2"
              sx={{
                fontSize: {
                  xs: "32px",
                  sm: "40px",
                },
                mb: 4
              }}
            >
              Lamentamos informarte que hubo un problema con tu transacción
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <SvgFailed/>
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
            {/* <Typography
              sx={{
                color: '#37373c',
                fontSize: '18px',
                lineHeight: '24px',
                fontWeight: 300,
                textAlign: 'center',
                mb: 4,
              }}
            >
              ¡Tu pago ha sido rechazado!
            </Typography> */}
            <Typography
              sx={{
                color: '#37373c',
                fontSize: '14px',
                lineHeight: '24px',
                fontWeight: 300,
                textAlign: 'center',
                mb: 4,
              }}
            >Lamentamos informarte que hubo un problema con tu transacción y tu pago ha sido rechazado. Pero no te preocupes, ¡aún puedes asegurar tu hora!
            </Typography>
            <Typography
              sx={{
                color: '#37373c',
                fontSize: '14px',
                lineHeight: '24px',
                fontWeight: 300,
                textAlign: 'center',
                mb: 4,
              }}
            >Hemos pre-reservado tu hora por 30 minutos. Esto significa que solo tú puedes agendarla en este período. Para confirmarla, simplemente necesitas <b>reintentar el pago de tu reserva.</b> Si no se completa la transacción en 30 minutos, la hora se liberará automáticamente y estará disponible para otros usuarios.
            </Typography>
            {/* <Typography
              sx={{
                color: '#37373c',
                fontSize: '14px',
                lineHeight: '24px',
                fontWeight: 300,
                textAlign: 'center',
                mb: 4,
              }}
            >¿Qué puedes hacer?

            </Typography>
            <ul>
              <li>Reintentar tu transacción: Haz clic en el botón de abajo para intentar tu pago nuevamente.</li><br/>
              <li>Agendar una nueva fecha: Si lo prefieres, puedes seleccionar otra fecha y hora para tu reserva.</li>
            </ul> */}
          </Paper>
        <Box bgcolor="#f8fafc" width={"100%"} mt={10} 
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 0 }
            }}>
              
              {shoppingCartId && <Button
            variant="contained"
            size="large"
            startIcon={
              <Box
                component="span"
                sx={{
                  mr: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(232, 26, 104, 0.1)',
                  color: '#E81A68',
                  '&::after': {
                    content: '"\\276E"', // Carácter de flecha izquierda
                    fontSize: '16px',
                    lineHeight: 1,
                  },
                }}
              />
            }
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              borderRadius: '24px',
              background:"#FFFFFF",
              color:"#E81A68",
              border: "1px solid #E81A68",
              width: { xs: '100%', md: 'auto' }
            }}
            // href="/agenda"
            onClick={() => {
              getRetry();              
              trackEvent('reintentar_pago', 'AGENDA_EMA', 'volver a la pagina de reintento de pago')
          
            
            }}
          >
            Reintentar el pago de tu reserva
          </Button>
          
          }
          <Button
            variant="contained"
            size="large"
            // startIcon={
            //   <Box
            //     component="span"
            //     sx={{
            //       mr: 1,
            //       display: 'flex',
            //       alignItems: 'center',
            //       justifyContent: 'center',
            //       width: '20px',
            //       height: '20px',
            //       borderRadius: '50%',
            //       backgroundColor: 'rgba(232, 26, 104, 0.1)',
            //       color: '#E81A68',
            //       '&::after': {
            //         content: '"\\276E"', // Carácter de flecha izquierda
            //         fontSize: '16px',
            //         lineHeight: 1,
            //       },
            //     }}
            //   />
            // }
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
            onClick={() => trackEvent('agendar_otra_visita', 'AGENDA_EMA', 'ir a la pagina agenda') }
          >
            Agendar otra visita
          </Button>
        </Box>
        <Box bgcolor="#f8fafc" width={"100%"} mt={8} 
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
            component={Link}
            startIcon={
              <InfoIcon/>
            }
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              background:"#f8fafc",
              color:"#E81A68",
              width: { xs: '100%', md: 'auto' }
            }}
            href={`/soporte?glosa=${glosa}&total=${total}&order=${order}&email=${email}`}
            onClick={() => trackEvent('crear_ticket_soporte', 'AGENDA_EMA', 'ir a la pagina de crear ticket de soporte') }
          >
            Crear un ticket de soporte
          </Button>
          
          <Button
            variant="contained"
            size="large"
            component={Link}
            startIcon={
              <PriceChangeIcon/>
            }
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              background:"#f8fafc",
              color:"#E81A68",
              width: { xs: '100%', md: 'auto' }
            }}
            href={`https://docs.google.com/forms/d/e/1FAIpQLSfMaGlC8UlSWZxTZgpTmD1sCftJJFv2EvAD_v5W0eIWzgwrkQ/viewform`}
            target='_blank'
            onClick={() => trackEvent('simular_costo_instalacion', 'AGENDA_EMA', 'ir a la pagina de google Form para evaluar instalacion') }
          >
            Simular costo de instalación
          </Button>
          
        </Box>
        </Container>
      </Box>
    </>
  );
};

export default RetryTransaction;
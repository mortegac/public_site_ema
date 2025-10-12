"use client";
// components/OrderConfirmation.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el idioma español
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Link from 'next/link';
import InfoIcon from '@mui/icons-material/Info';
import PriceChangeIcon from '@mui/icons-material/PriceChange';



// Configurar los plugins de dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("es"); // Configurar el idioma español

import PageContainer from "@/app/components/container/PageContainer";


import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  useTheme,
} from "@mui/material";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCustomer } from "@/store/Customer/slice";
import { selectCalendarVisits, setStep } from "@/store/CalendarVisits/slice";
import {
  selectShoppingCart,
  getShoppingCart,
} from "@/store/ShoppingCart/slice";
import { selectWebpay } from "@/store/Webpay/slice";

import { useAnalytics } from "@/hooks/useAnalytics";
import {fetchWebpayStart, WebpayStartResponse} from '@/store/Webpay/services';


import { formatCurrency } from "@/utils/currency";

export const SvgFailed = () => <div className="flex justify-center items-center flex-col">
    <svg width="143" height="143" viewBox="0 0 143 143" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M71.4987 137.042C107.696 137.042 137.04 107.698 137.04 71.5006C137.04 35.303 107.696 5.95898 71.4987 5.95898C35.301 5.95898 5.95703 35.303 5.95703 71.5006C5.95703 107.698 35.301 137.042 71.4987 137.042Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7.44922 71.4994C7.44922 36.1244 36.1263 7.44727 71.5013 7.44727C106.876 7.44727 135.554 36.1244 135.554 71.4994C135.554 106.874 106.876 135.552 71.5013 135.552C36.1263 135.552 7.44922 106.874 7.44922 71.4994ZM71.5013 16.3848C41.0624 16.3848 16.3868 41.0604 16.3868 71.4994C16.3868 101.938 41.0624 126.614 71.5013 126.614C101.94 126.614 126.616 101.938 126.616 71.4994C126.616 41.0604 101.94 16.3848 71.5013 16.3848Z" fill="#F4706E" />
    <path fillRule="evenodd" clipRule="evenodd" d="M91.5134 51.4866C93.2591 53.2318 93.2591 56.0612 91.5134 57.8064L57.8083 91.5118C56.0632 93.2568 53.2337 93.2568 51.4886 91.5118C49.7434 89.7668 49.7434 86.9372 51.4886 85.1922L85.1938 51.4866C86.9388 49.7414 89.7684 49.7414 91.5134 51.4866Z" fill="#F4706E" />
    <path fillRule="evenodd" clipRule="evenodd" d="M51.4886 51.4866C53.2337 49.7414 56.0632 49.7414 57.8083 51.4866L91.5134 85.1922C93.2591 86.9372 93.2591 89.7668 91.5134 91.5118C89.7684 93.2568 86.9388 93.2568 85.1938 91.5118L51.4886 57.8064C49.7434 56.0612 49.7434 53.2318 51.4886 51.4866Z" fill="#F4706E" />
    </svg>
    <h2 className="text-4xl mt-8">Error en el pago</h2>
    <span className="text-lg mt-4">La transacción fue rechazada</span>
</div>


interface RetryTransactionProps {
  glosa: string;
  total: string;
  order: string;
  // card: string;
  // typePay: string;
  email: string;
  shoppingCartId: string | null;
}

const RetryTransaction: React.FC<RetryTransactionProps> = () => {
  // { glosa, total, order, email, shoppingCartId }
  const theme = useTheme(); // Acceder al tema para los colores
  const router = useRouter();
  
  const dispatch = useAppDispatch();

  const { trackEvent } = useAnalytics();
  trackEvent('rechazo_pago', 'AGENDA_EMA', 'pago existoso desde webpay')


  const getRetry = async () => {
    try {
      const response = await (fetchWebpayStart({ 
        shoppingCartId: String(paymentData?.shoppingCartId),
        glosa: String(paymentData?.glosa),
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

  
  // AGREGAR ESTO AL INICIO DEL COMPONENTE (después de las líneas existentes)
  const [paymentData, setPaymentData] = useState({ 
    glosa:"", 
    total:"", 
    order:"", 
    email:"", 
    shoppingCartId:"" });
  
  useEffect(() => {
    // Recuperar datos de sessionStorage si existen
    const storedData = sessionStorage.getItem('paymentData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setPaymentData({
        glosa: data.glosa || "",
        total: data.total || "",
        order: data.order || "",
        email: data.email || "",
        shoppingCartId: data.shoppingCartId || "",
      });
      // Limpiar sessionStorage después de leer
      sessionStorage.removeItem('paymentData');
    }
  }, []);

  
  
  return (
    <>
      {/* <pre>paymentData = {JSON.stringify(paymentData, null, 2 )}</pre> */}
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
          </Paper>
          <Box bgcolor="#f8fafc" width={"100%"} mt={10} 
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, md: 0 }
              }}>
                
                {paymentData?.shoppingCartId && <Button
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
              href={`/soporte?glosa=${paymentData?.glosa}&total=${paymentData?.total}&order=${paymentData.order}&email=${paymentData.email}`}
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
}
export default RetryTransaction;

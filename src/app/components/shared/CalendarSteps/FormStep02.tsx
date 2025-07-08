"use client";

// components/OrderConfirmation.tsx
import React, { useEffect } from 'react';
import { Box, Container, Typography, Button, Paper, Divider, useTheme } from '@mui/material';
import LoadingIcon from "@/app/components/shared/LoadingIcon";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectCustomer } from "@/store/Customer/slice";
import { selectCalendarVisits, setStep,  } from "@/store/CalendarVisits/slice";
import { selectShoppingCart, getShoppingCart} from "@/store/ShoppingCart/slice";
import { selectWebpay} from "@/store/Webpay/slice";

import { formatCurrency } from "@/utils/currency";

export default function FormStep02() {
  const theme = useTheme(); // Acceder al tema para los colores

  const dispatch = useAppDispatch();
  
  const { customer } = useAppSelector(selectCustomer);
  const { calendarVisits } = useAppSelector(selectCalendarVisits);
  const { shoppingCart } = useAppSelector(selectShoppingCart);
  const { webpay, status } = useAppSelector(selectWebpay);
  
  const PRODUCT_NAME = "Visita Técnica "
  const PRODUCT_TIME = "09:00 Hrs"
  // Datos de ejemplo, en una app real vendrían de props o un estado global
  // const orderDetails = {
  //   email: 'email@hotmail.com',
  //   productName: 'Visita Técnica 02 de Junio',
  //   time: '09:00 Hrs',
  //   price: 10000,
  // };

  // Formato para el dinero (ej. para Chile, sin decimales y con separador de miles)
  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat('es-CL', {
  //     style: 'currency',
  //     currency: 'CLP',
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0,
  //   }).format(amount);
  // };
  

  useEffect(() => {
    const fetchData = async () => {
      if (!calendarVisits?.calendarId) return;
      
      await dispatch(getShoppingCart({
        shoppingCartId: calendarVisits?.calendarId,
      }));
    };
    
    fetchData();
  }, [calendarVisits?.calendarId, dispatch]);

  
  return (
    <>
      {/* <pre>{JSON.stringify(webpay, null, 2)}</pre>
      <pre>{JSON.stringify(shoppingCart, null, 2)}</pre> */}
      <Box sx={{ p: 2 }}>
        <Typography
          align="left"
          sx={{
            display: "block",
            paddingBottom: "10px",
            fontSize: "18px",
            lineHeight: "2",
            marginTop: "0",
            color: (theme) => theme.palette.text.primary
          }}
          component="span"
        >
          Para finalizar con la reserva de su visita técnica realice el pago
        </Typography>
        <Typography
          align="left"
          sx={{
            display: "block",
            paddingBottom: "30px",
            fontSize: "18px",
            lineHeight: "2",
            marginTop: "0",
            color: (theme) => theme.palette.text.primary
          }}
          component="span"
        >
          Email: {shoppingCart?.customerId} 
          {/* {customer?.customerId} */}
        </Typography>
        
        <pre>
          {/* { JSON.stringify(calendarVisits, null, 2) } */}
        {/* message = action?.payload?.message
        state.cartId */}
        </pre>
        
        <Box bgcolor="#ffffff" pt={4} pb={4} width={"100%"} mt={0}
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
      

          <Divider sx={{ mx: 3 }} /> {/* Separador con margen horizontal */}

          <form className="form flex flex-wrap w-full"
            action={webpay?.url || ""}
            method="POST"
        >
          <input id="token_ws" type="hidden" name="token_ws" value={webpay?.token || ""} />
        
          {/* Detalles del pedido */}
          <Box sx={{ p: 3, flexGrow: 1 }}> {/* flexGrow para que ocupe el espacio disponible */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="body1" sx={{ flexGrow: 1, pr: 2 }}>
                {PRODUCT_NAME}
                <br />
                {/* {PRODUCT_TIME} */}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {formatCurrency(Number(shoppingCart?.total || 0))}
              </Typography>
            </Box>
          </Box>

          {/* Sección del total y botón de pago */}
          <Box
            sx={{
              p: 3,
              mt:20,
              backgroundColor: 'rgba(0, 0, 0, 0.05)', // Un fondo ligeramente más oscuro para el total (ajusta si quieres un color sólido)
              borderTop: `1px solid ${theme.palette.divider}`, // Borde superior para separar
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Total a pagar:
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
              {formatCurrency(Number(shoppingCart?.total || 0))}
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' }, // Columna en móviles, fila en desktop
              gap: { xs: 2, md: 0 } // Espacio entre elementos en móviles
            }}>
              

              {/* <Box
                component="img"
                src="/images/svgs/webpay-logo.svg"
                alt="Webpay by Transbank"
                sx={{
                  height: '60px',
                  objectFit: 'contain',
                  mt: { xs: 3, md: 0 } // 24px en móviles (3 * 8px), 0 en desktop
                }}
              /> */}
              <Button
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
            minWidth: { xs: '100%', md: '170px' }, // 100% en móviles, 170px en desktop
            width: { xs: '100%', md: '170px' },
            marginRight: { md: '10px' } 
          }}
          onClick={() => dispatch(setStep(1))}
        >
          Volver
        </Button>
              <Button
                variant="contained"
                type='submit'
                color="primary"
                size="large"
                disabled={webpay?.token ? false : true} 
                endIcon={
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      color: '#fff',
                      '&::after': {
                        content: '"\\276F"',
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
                  boxShadow: theme.shadows[3],
                  '&:hover': {
                    boxShadow: theme.shadows[6],
                  },
                  minWidth: { xs: '100%', md: '170px' }, // 100% en móviles, 170px en desktop
                  width: { xs: '100%', md: '170px' } // 100% en móviles, 170px en desktop
                }}
              >
                { status === "loading" && <>
                    <LoadingIcon icon="puff" color="#E81A68" style={{width:"40px", height:"40px"}}/>
                </>
                }
                { status === "idle" && <>
                <span>
                  Continuar
                </span>
                </>
                }
              </Button>
              
             
              
            </Box>
            <Box
                component="img"
                src="/images/svgs/webpay-logo.svg"
                alt="Webpay by Transbank"
                sx={{
                  height: '60px',
                  objectFit: 'contain',
                  mt: { xs: 4.5, md: 0 } // 36px en móviles (4.5 * 8px), 0 en desktop
                }}
              />
          </Box>
          </form>
          
          </Container>
        </Box>
      </Box>
    </>
  );
}
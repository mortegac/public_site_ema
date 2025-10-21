'use client';
import React, {useEffect, useState} from 'react';
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

// interface InvoiceProps {
//   glosa: string;
//   total: string;
//   order: string;
//   card: string;
//   typePay: string;
//   email: string;
// }

// const Invoice: React.FC<InvoiceProps> = ({ glosa, total, order, card, typePay, email, shoppingCartId }) => {
const Invoice = () => {
  
    const theme = useTheme(); // Acceder al tema para los colores
    const { trackEvent } = useAnalytics();
    trackEvent('exito_pago', 'AGENDA_EMA', 'pago existoso desde webpay')

  // AGREGAR ESTO AL INICIO DEL COMPONENTE
  const [paymentData, setPaymentData] = useState({ 
    glosa:"", 
    total:"", 
    order:"", 
    card:"", 
    typePay:"", 
    email:"", 
    shoppingCartId:"",
    hasData:false,
  });
  
  useEffect(() => {
    // Recuperar datos de sessionStorage si existen
    const storedData = sessionStorage.getItem('paymentData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setPaymentData({
        glosa: data.glosa || "",
        total: data.total || "",
        order: data.order || "",
        card: data.card || "",
        typePay: data.typePay ||"",
        email: data.email || "",
        shoppingCartId: data.shoppingCartId || "",
        hasData: true
      });
      // Limpiar sessionStorage después de leer
      sessionStorage.removeItem('paymentData');
    }else{
      setPaymentData({
        ...paymentData,
        hasData: false
      });
    }
  }, []);
  
  


  

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
        
        {paymentData?.hasData === true ?
        <>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <SvgSuccess email={paymentData?.email} />
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
                      {paymentData.glosa}
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
                      <Typography fontSize="1.5rem">{formatCurrency(Number(paymentData.total))}</Typography>
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
                      <Typography fontWeight="bold">{paymentData.order}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ py: 1, px: 2 }}>
                      <Typography fontWeight="bold">Tarjeta</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1, px: 2 }}>{paymentData.card}</TableCell>
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
                      {paymentData.typePay}
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
                
                {paymentData.shoppingCartId && <Button
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
                // getRetry();              
                trackEvent('reintentar_pago', 'AGENDA_EMA', 'volver a la pagina de reintento de pago')
            
              
              }}
            >
              Reintentar el pago de tu reserva
            </Button>
            
            }
          
          </Box>
          
          <Box bgcolor="#f8fafc" width={"100%"} mt={10} 
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 0 }
            }}>
            {/* <Button
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
            </Button> */}
            
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
              href="/cotizador"
              // target='_blank'
            >
              Simular costo de instalación
            </Button>
                
          </Box>
        </>
        :<>
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column' }}>
        <svg width="160" height="158" viewBox="0 0 160 158" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M118.088 6.6185C118.013 6.6185 117.937 6.6113 117.86 6.59731C116.673 6.37501 115.459 6.21348 114.248 6.11712C113.572 6.06355 113.068 5.47181 113.121 4.79532C113.175 4.11882 113.759 3.61025 114.443 3.66863C115.739 3.77178 117.041 3.9445 118.313 4.18239C118.979 4.30754 119.419 4.94925 119.294 5.61575C119.184 6.20628 118.668 6.6185 118.088 6.6185Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M85.775 16.8425C85.4663 16.8425 85.1569 16.727 84.9186 16.4947C84.4323 16.0217 84.4219 15.244 84.8946 14.7579C90.7988 8.68939 98.7014 4.80954 107.146 3.83278C107.804 3.75321 108.429 4.23739 108.507 4.91189C108.585 5.58559 108.102 6.19531 107.428 6.27328C99.5435 7.18487 92.1662 10.8064 86.6555 16.4707C86.4148 16.7182 86.0949 16.8425 85.775 16.8425Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M44.6408 101.068C44.636 101.068 44.6304 101.068 44.6248 101.068L38.4016 100.986C24.3207 100.986 12.8516 89.5183 12.8516 75.4225C12.8516 68.7148 15.4362 62.3677 20.1287 57.5508C20.6022 57.065 21.3795 57.055 21.8657 57.5276C22.3511 58.001 22.3615 58.7786 21.8881 59.2644C17.6449 63.6204 15.3082 69.3589 15.3082 75.4225C15.3082 88.1637 25.6754 98.5297 38.4176 98.5297L44.6568 98.6117C45.335 98.6209 45.8779 99.1778 45.8691 99.8559C45.8604 100.529 45.3118 101.068 44.6408 101.068Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M130.782 102.164L126.902 102.114C126.223 102.106 125.68 101.549 125.689 100.871C125.698 100.198 126.246 99.658 126.918 99.658H126.934L130.798 99.7072C144.807 99.7072 156.217 88.2762 156.217 74.2256C156.217 63.4247 149.374 53.7756 139.189 50.2149C138.573 49.9994 138.233 49.3401 138.415 48.7136C139.186 46.052 139.577 43.3517 139.577 40.6869C139.577 25.1918 126.97 12.5854 111.474 12.5854C97.6659 12.5854 86.0256 22.4555 83.7961 36.0547C83.7177 36.5333 83.3651 36.9207 82.8957 37.0439C82.4279 37.1674 81.9281 37.0031 81.6258 36.6245C77.3698 31.3173 71.0331 28.2736 64.2406 28.2736C62.375 28.2736 60.5045 28.5091 58.6804 28.9728C58.0231 29.1416 57.3537 28.7426 57.1866 28.0853C57.0195 27.428 57.4169 26.7595 58.0742 26.5924C60.0967 26.0778 62.171 25.8171 64.2406 25.8171C70.9404 25.8171 77.2395 28.4831 81.8745 33.2085C85.2244 19.6952 97.2988 10.1289 111.474 10.1289C128.325 10.1289 142.034 23.8373 142.034 40.6869C142.034 43.215 141.711 45.7694 141.073 48.2962C151.648 52.487 158.674 62.765 158.674 74.2256C158.674 89.6307 146.162 102.164 130.782 102.164Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M133.915 61.154C133.639 61.154 133.363 61.0616 133.133 60.8725C132.61 60.4403 132.537 59.6659 132.969 59.1433C135.519 56.0583 137.343 52.5459 138.388 48.7036C138.566 48.0487 139.243 47.6613 139.895 47.8408C140.55 48.0187 140.937 48.6936 140.758 49.3481C139.621 53.5302 137.638 57.3521 134.863 60.7082C134.62 61.0021 134.269 61.154 133.915 61.154Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M86.3237 45.7609C85.7535 45.7609 85.2417 45.3611 85.1225 44.7802C84.5315 41.9139 83.3888 39.2355 81.7246 36.8194C81.3399 36.2608 81.4807 35.496 82.0397 35.1113C82.5979 34.7271 83.3632 34.8666 83.7478 35.4264C85.5991 38.1144 86.8707 41.0946 87.528 44.2844C87.6656 44.9489 87.2377 45.5982 86.5732 45.7354C86.4892 45.7526 86.406 45.7609 86.3237 45.7609Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M149.823 20.3684C149.126 20.3684 148.54 19.887 148.397 19.1982C148.017 17.325 147.098 15.6242 145.738 14.2748C144.38 12.9074 142.683 11.9882 140.824 11.6112C140.129 11.4656 139.648 10.8795 139.648 10.1842C139.648 9.48893 140.129 8.90279 140.817 8.75885C142.68 8.38102 144.382 7.46064 145.746 6.09645C147.101 4.74146 148.017 3.03983 148.396 1.17507C148.54 0.481383 149.126 0 149.823 0C150.52 0 151.107 0.481383 151.249 1.17067C151.629 3.03983 152.545 4.74146 153.9 6.09645C155.264 7.46064 156.966 8.38102 158.822 8.75726C159.517 8.90279 159.998 9.48893 159.998 10.1842C159.998 10.8795 159.517 11.4656 158.829 11.6096C158.828 11.61 158.827 11.61 158.826 11.6104C155.011 12.3956 152.037 15.3735 151.249 19.197C151.107 19.887 150.52 20.3684 149.823 20.3684ZM144.2 10.1838C145.404 10.7735 146.511 11.566 147.475 12.538C148.444 13.4991 149.234 14.6054 149.824 15.8141C151.016 13.3616 152.999 11.3781 155.447 10.185C154.244 9.59608 153.134 8.80443 152.163 7.83327C151.198 6.86851 150.41 5.7626 149.823 4.55795C149.236 5.7618 148.448 6.86811 147.483 7.83327C146.513 8.80403 145.404 9.59488 144.2 10.1838Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M118.562 157.429H53.0119C47.7196 157.429 43.4141 153.123 43.4141 147.831V63.6444C43.4141 58.3525 47.7196 54.0469 53.0119 54.0469H105.896C106.222 54.0469 106.535 54.1764 106.765 54.4071L127.801 75.466C128.03 75.6963 128.16 76.0086 128.16 76.334V147.831C128.16 153.123 123.854 157.429 118.562 157.429ZM53.0119 56.5033C49.0742 56.5033 45.8707 59.7066 45.8707 63.6444V147.831C45.8707 151.769 49.0742 154.973 53.0119 154.973H118.562C122.5 154.973 125.703 151.769 125.703 147.831V76.8422L105.386 56.5033H53.0119Z" fill="#E81A68"/>
            <path d="M126.936 77.5629H110.401C107.242 77.5629 104.672 74.9932 104.672 71.8346V55.2753C104.672 54.7783 104.971 54.3305 105.431 54.1406C105.89 53.9499 106.418 54.0558 106.769 54.4073L127.806 75.4666C128.157 75.818 128.261 76.3462 128.071 76.8048C127.881 77.2638 127.433 77.5629 126.936 77.5629ZM107.129 58.2432V71.8346C107.129 73.6386 108.597 75.1064 110.401 75.1064H123.973L107.129 58.2432Z" fill="#E81A68"/>
            <path d="M76.0273 71.7573H53.4549C52.7768 71.7573 52.2266 71.2075 52.2266 70.529C52.2266 69.8505 52.7768 69.3008 53.4549 69.3008H76.0273C76.7054 69.3008 77.2556 69.8505 77.2556 70.529C77.2556 71.2075 76.7054 71.7573 76.0273 71.7573Z" fill="#E81A68"/>
            <path d="M99.2467 81.5736H53.4549C52.7767 81.5736 52.2266 81.0239 52.2266 80.3454C52.2266 79.6669 52.7767 79.1172 53.4549 79.1172H99.2467C99.9248 79.1172 100.475 79.6669 100.475 80.3454C100.475 81.0239 99.9248 81.5736 99.2467 81.5736Z" fill="#E81A68"/>
            <path d="M118.069 91.4017H53.4549C52.7767 91.4017 52.2266 90.852 52.2266 90.1735C52.2266 89.4951 52.7767 88.9453 53.4549 88.9453H118.069C118.747 88.9453 119.297 89.4951 119.297 90.1735C119.297 90.852 118.747 91.4017 118.069 91.4017Z" fill="#E81A68"/>
            <path d="M29.9654 64.3403C29.2017 64.3403 28.4396 64.1608 27.7487 63.8018C-0.743176 49.2891 -0.874323 26.282 0.392372 17.064C0.682656 14.8203 2.46834 13.0999 4.73384 12.8888C12.9802 12.1072 20.358 8.78753 26.6611 3.02227C28.5044 1.31028 31.416 1.30988 33.2849 3.02347C39.5919 8.78953 46.9706 12.1092 55.2145 12.8892C57.4424 13.0991 59.2681 14.8586 59.5544 17.0736C60.8203 26.2848 60.6899 49.2983 32.1885 63.8066C31.4896 64.162 30.7259 64.3403 29.9654 64.3403ZM29.9654 4.18052C29.3768 4.18052 28.7914 4.39642 28.3268 4.82861C21.6135 10.9685 13.755 14.5012 4.96335 15.3344C3.84779 15.4384 2.97054 16.2832 2.8274 17.3886C1.63108 26.0961 1.77662 47.8158 28.8722 61.6176C29.5479 61.9683 30.3884 61.9671 31.0737 61.6172C58.1701 47.8246 58.3149 26.0989 57.1194 17.3982C56.9778 16.302 56.0798 15.438 54.9834 15.3344C46.1957 14.5032 38.3372 10.9709 31.6263 4.83501C31.1497 4.39882 30.5563 4.18052 29.9654 4.18052Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M29.9952 54.7946C29.7897 54.7946 29.5842 54.743 29.3986 54.6399C10.977 44.4042 8.73146 29.8422 9.03215 22.073C9.05454 21.4925 9.48077 21.0071 10.0542 20.9096C17.0794 19.7161 23.5321 16.8259 29.2315 12.3192C29.6777 11.9665 30.3087 11.9665 30.7549 12.3192C36.4599 16.8283 42.911 19.7185 49.9291 20.91C50.5024 21.0075 50.9287 21.4933 50.9511 22.0742C51.2469 29.859 48.9958 44.441 30.591 54.6407C30.4054 54.7434 30.1999 54.7946 29.9952 54.7946ZM11.4656 23.1501C11.4224 30.4607 14.0102 43.0061 29.996 52.1566C45.9634 43.0381 48.556 30.4751 48.5176 23.1505C41.7842 21.8515 35.5618 19.0584 29.9936 14.836C24.4294 19.0564 18.2054 21.8491 11.4656 23.1501Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M29.9877 41.8273C27.8925 41.8273 26.1884 40.1233 26.1884 38.0286V35.2243C24.9248 34.1476 24.1875 32.5567 24.1875 30.8471C24.1875 27.6489 26.7897 25.0469 29.9877 25.0469C33.1857 25.0469 35.788 27.6489 35.788 30.8471C35.788 32.5567 35.0506 34.1476 33.7863 35.2247V38.0286C33.7863 40.1233 32.0822 41.8273 29.9877 41.8273ZM29.9877 27.5034C28.1444 27.5034 26.6442 29.0035 26.6442 30.8471C26.6442 31.9646 27.1864 32.9897 28.094 33.5894C28.4379 33.8169 28.645 34.2016 28.645 34.6142V38.0286C28.645 38.7687 29.2472 39.3708 29.9877 39.3708C30.7275 39.3708 31.3296 38.7687 31.3296 38.0286V34.6142C31.3296 34.2016 31.5368 33.8165 31.8814 33.589C32.7891 32.9897 33.3313 31.9646 33.3313 30.8471C33.3313 29.0035 31.831 27.5034 29.9877 27.5034Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M12.0066 143.934C7.53548 143.934 3.89844 140.296 3.89844 135.826C3.89844 131.362 7.53548 127.73 12.0066 127.73C16.4705 127.73 20.1028 131.362 20.1028 135.826C20.1028 140.296 16.4705 143.934 12.0066 143.934ZM12.0066 130.187C8.89017 130.187 6.35512 132.717 6.35512 135.826C6.35512 138.942 8.89017 141.477 12.0066 141.477C15.1158 141.477 17.6461 138.942 17.6461 135.826C17.6461 132.717 15.1158 130.187 12.0066 130.187Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M37.6971 145.948C37.0189 145.948 36.4688 145.398 36.4688 144.719V126.978C36.4688 126.3 37.0189 125.75 37.6971 125.75C38.3752 125.75 38.9254 126.3 38.9254 126.978V144.719C38.9254 145.398 38.3752 145.948 37.6971 145.948Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M37.6971 122.886C37.0189 122.886 36.4688 122.336 36.4688 121.658V119.381C36.4688 118.702 37.0189 118.152 37.6971 118.152C38.3752 118.152 38.9254 118.702 38.9254 119.381V121.658C38.9254 122.336 38.3752 122.886 37.6971 122.886Z" fill="#2A3547" fillOpacity="0.6"/>
            <path d="M58.4778 145.775C58.0495 145.25 59.1876 143.613 61.021 142.119L108.962 103.067C110.796 101.573 112.629 100.79 113.057 101.316C113.485 101.841 112.347 103.478 110.514 104.972L62.5726 144.024C60.7391 145.518 58.9061 146.301 58.4778 145.775Z" fill="#E81A68"/>
            <path d="M113.912 144.699C113.504 145.241 111.642 144.529 109.752 143.108L60.3353 105.94C58.4454 104.519 57.2448 102.927 57.6524 102.386C58.06 101.844 59.922 102.556 61.8119 103.977L111.229 141.144C113.119 142.566 114.319 144.157 113.912 144.699Z" fill="#E81A68"/>
        </svg>



          <Typography 
          sx={{
            marginTop:'42px', 
            color: '#37373c',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 300,
            textAlign: 'center',
                       
          }}>No se encontraron datos de la transacción</Typography>
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
                    width: { xs: '80%', md: 'auto' },
                    marginTop: '20px',
                  }}
                  href="/agenda"
                >
                  Agendar otra visita
                </Button>
        </Box>
        </>
      }
        
        
      </Container>
    </Box>
  );
};

export default Invoice;
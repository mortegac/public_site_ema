"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

interface RetryTransactionProps {
  glosa: string;
  total: string;
  order: string;
  // card: string;
  // typePay: string;
  email: string;
}


const RetryTransaction: React.FC<RetryTransactionProps> = ({ glosa, total, order, email }) => {
// const RetryTransaction: React.FC = () => {
    const theme = useTheme(); // Acceder al tema para los colores
    const router = useRouter();
    
  return (
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
          >
            Hubieron problemas con tu compra, puedes volver a instentar la transacción o crear un ticket de soporte para que nuestro equipo te ayude:
          </Typography>
        </Paper>
      <Box bgcolor="#f8fafc" width={"100%"} mt={10} 
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            // marginTop:"48px"
          }}>
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
          }}
          href="/agenda"
        //   onClick={() => dispatch(setStep(0))}
        >
          Reintentar la transacción
        </Button>
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
          }}
          href="/agenda"
        //   onClick={() => dispatch(setStep(0))}
        >
          Agendar otra visita
        </Button>
        
        {/* <Button
          variant="contained"
          type="submit"
          color="primary"
          size="large"
          // disabled={!formik.isValid || formik.isSubmitting}
        //   endIcon={
        //     <Box
        //       component="span"
        //       sx={{
        //         ml: 1,
        //         display: 'flex',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         width: '20px',
        //         height: '20px',
        //         borderRadius: '50%',
        //         backgroundColor: 'rgba(255, 255, 255, 0.3)',
        //         color: '#fff',
        //         '&::after': {
        //           content: '"\\276F"',
        //           fontSize: '16px',
        //           lineHeight: 1,
        //         },
        //       }}
        //     />
        //   }
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
            }
          }}
          href="/cotizador"
        >
          Simular instalación
        </Button> */}
            
            
        {/* <Button type="submit" variant="contained" color="primary"
          sx={{
            width: "50%",
            padding: "10px",
          }}
        >
          Siguiente
        </Button> */}
      </Box>
      <Box bgcolor="#f8fafc" width={"100%"} mt={10} 
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            // marginTop:"48px"
          }}>
        
        <Button
          variant="contained"
          size="large"
          component={Link}
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            background:"#f8fafc",
            color:"#E81A68",
          }}
          href={`/soporte?glosa=${glosa}&total=${total}&order=${order}&email=${email}`}
        >
          Crear un ticket de soporte
        </Button>
        
      </Box>
      </Container>
    </Box>
  );
};

export default RetryTransaction;
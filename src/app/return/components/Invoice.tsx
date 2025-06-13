import React from 'react';
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
        <SvgSuccess email={email} />
        {/* <Typography
              variant="h2"
              fontWeight={700}
              lineHeight="1.2"
              sx={{
                fontSize: {
                  xs: "32px",
                  sm: "40px",
                },
              }}
            >
              {email}
            </Typography> */}
        </Box>
        {/* <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Image
            src="https://images.prismic.io/greta/cd66aa9d-58e6-4054-a475-3f0b164ce3db_energica.png"
            alt="Energica Logo"
            width={250}
            height={100}
            style={{ marginBottom: '3rem' }}
          />
        </Box> */}

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
        //   startIcon={
        //     <Box
        //       component="span"
        //       sx={{
        //         mr: 1,
        //         display: 'flex',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         width: '20px',
        //         height: '20px',
        //         borderRadius: '50%',
        //         backgroundColor: 'rgba(232, 26, 104, 0.1)',
        //         color: '#E81A68',
        //         '&::after': {
        //           content: '"\\276E"', // Carácter de flecha izquierda
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
            background:"#FFFFFF",
            color:"#E81A68",
            border: "1px solid #E81A68",
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
        </Button>
            
            
        {/* <Button type="submit" variant="contained" color="primary"
          sx={{
            width: "50%",
            padding: "10px",
          }}
        >
          Siguiente
        </Button> */}
      </Box>
      </Container>
    </Box>
  );
};

export default Invoice;
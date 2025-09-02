"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";
import { alpha, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectEstimate } from "@/store/Estimate/slice";
import { setStep, cleanData, selectClientForms } from "@/store/ClientForms/slice";

export const FormStep04 = (props:any) => {
  const [submitButton, setSubmitButton] = useState('');
  const { 
    estimate,
    estimateData
  } = useAppSelector(selectEstimate);
  const { currentForm } = useAppSelector(selectClientForms);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const borderColor = theme.palette.divider;
  
  
  function sendEmail(){
    
  }
  // useEffect(() => {
  //   if (estimate?.estimateId === "") {
  //     Promise.all([
  //       dispatch(cleanData()),
  //       dispatch(setStep(0)),
  //     ]);
  //   }
  // }, [estimate?.estimateId, dispatch]);
  
  {/* <pre>{JSON.stringify(estimate, null, 2 )}</pre> */}
  return (
    <> 
      <Box bgcolor="#ffffff" pt={7} pb={7}>
        <Container
          sx={{
            maxWidth: "1400px !important",
            position: "relative",
          }}
        >
          
          <Typography
                variant="h1"
                fontWeight={700}
                lineHeight="1.2"
                sx={{
                  fontSize: {
                    xs: "32px",
                    sm: "32px",
                  },
                }}
              >
              Resultado de la Simulación
              </Typography>
          <Typography
              align="left"
                          sx={{
                            display: "block",
                            padding: "30px 0",
                            fontSize: "18px",
                            lineHeight: '2',
                            color: (theme) => theme.palette.text.primary
                          }}
                          component="span"
              >
                Basado en la información que has proporcionado, hemos elaborado un presupuesto personalizado para la instalación de tu cargador de vehículo eléctrico domiciliario. 
                <br /><br />A continuación encontrarás el desglose detallado de los valores referenciales para tu instalación. Este presupuesto ha sido diseñado específicamente según los datos que ingresaste en nuestro formulario.
              </Typography>
              
              <Paper variant="outlined" sx={{ border: `1px solid ${borderColor}` }}>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 150 }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                  >                  
                    <TableHead>
                      <TableRow>
                          <TableCell        
                            align={'left'}
                            padding={'normal'}
                          >Descripción      
                          </TableCell>
                          <TableCell        
                            align={'left'}
                            padding={'normal'}
                          >3,5 kW      
                          </TableCell>
                          <TableCell        
                            align={'left'}
                            padding={'normal'}
                          >7 kW      
                          </TableCell>
                      
                      </TableRow>
                    </TableHead>
                  
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        Materiales
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        {/* $ {estimate?.materialsCost?.toLocaleString()} */}
                        $ {estimateData?.materialsCost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimateData?.materialsCost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        Instalación
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        {/* $ {estimate?.manpowerCost?.toLocaleString()} */}
                        $ {estimateData?.installationCost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        {/* $ {estimate?.manpowerCost?.toLocaleString()} */}
                        $ {estimateData?.installationCost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        Trámites SEC	
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        {/* $ {estimate?.TE6Cost?.toLocaleString()} */}
                        $ {estimateData?.SECCost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimateData?.SECCost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        Cargador referencial 7kW
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        {/* $ {estimate?.TE6Cost?.toLocaleString()} */}
                        $ 0
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        $ 0
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        Total neto
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        {/* $ {estimate?.netCost?.toLocaleString()} */}
                        $ {estimateData?.netPrice?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimateData?.netPrice?.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        {/* IVA {estimate?.vatPercentage}% */}
                        IVA $ 19%
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        {/* $ {estimate?.vat?.toLocaleString()} */}
                        $ {estimateData?.VAT?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimateData?.VAT?.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        Total bruto
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        {/* $ {estimate?.totalInstallationGross?.toLocaleString()} */}
                        $ {estimateData?.grossPrice?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        {/* $ {estimate?.totalInstallationGross?.toLocaleString()} */}
                        $ {estimateData?.grossPrice?.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  
                  <TableBody>
                  </TableBody>
                  </Table>
                </TableContainer>
                
              </Paper>

              <div className="mt-6 space-y-4">
                <p className="text-gray-700">
                  Incluye tablero, canalización sobrepuesta y cableado para cargador de acuerdo con la potencia escogida.
                </p>
                <p className="text-gray-700">
                  Se estima para una distancia de <b>{estimate?.distanceExposed?.toLocaleString()} mts </b> de cableado entre el tablero eléctrico y el estacionamiento.
                </p>
                <p className="text-gray-700">
                  Considera declaración TE6 y medición de puesta a tierra. (Ítem trámites SEC).
                </p>
                <p className="text-gray-700">
                  Garantiza que todos los elementos están bajo cumplimiento de la normativa RIC N°15 de electromovilidad.
                </p>
                <p className="text-gray-700">
                  Tipo de residencia: <b>{currentForm?.isHouse && "Casa"}{currentForm?.isBuilding && "Edificio"}</b>
                </p>
              </div>
        </Container>
      </Box>
      <Box id="buttons" width={"100%"} mt={3} 
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 0 },
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
            background: `${status === "loading" ? "#bfbfbf": "#FFFFFF"}`,
            color:"#E81A68",
            border: "1px solid #E81A68",
            width: { xs: '100%', md: 'auto' },
          }}
          disabled={status === "loading"}
          onClick={() =>  dispatch(setStep(0))}
        >
          Realizar otra simulación
        </Button>
        
        <Button
          id="scheduleNotPay"
          variant="contained"
          type="submit"
          size="large"
          onClick={() => sendEmail()}
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: '24px',
            background:`${status === "loading" ? "#bfbfbf": "#FFFFFF"}`,
            color:"#E81A68",
            border: "1px solid #E81A68",
            width: { xs: '100%', md: 'auto' },
          }}
          disabled={status === "loading"}
        >
          Enviar presupuesto por email
        </Button>
        
        <Button
          id="scheduleNotPay"
          variant="contained"
          type="submit"
          size="large"
          onClick={() => {
            // TODO: Implementar lógica para agendar visita
            console.log('Agendar visita');
          }}
          // disabled={!formik.isValid || formik.isSubmitting}
          endIcon={
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
                // backgroundColor: 'rgba(232, 26, 104, 0.1)',
                color: '#ffffff',
                '&::after': {
                  content: '"\\276F"', // Carácter de flecha izquierda
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
            background:"#E81A68",
            color:"#ffffff",
            border: "1px solid #E81A68",
            width: { xs: '100%', md: 'auto' },
          }}
          disabled={status === "loading"}
        >
          Agenda tu visita
        </Button>
      </Box>
    </>
  );
};


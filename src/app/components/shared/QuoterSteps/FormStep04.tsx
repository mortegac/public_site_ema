"use client";
import React, { useEffect } from "react";
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
import { setStep, cleanData } from "@/store/ClientForms/slice";


export const FormStep04 = (props:any) => {
  const { 
    estimate
  } = useAppSelector(selectEstimate);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const borderColor = theme.palette.divider;
  
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
                    xs: "3px",
                    sm: "32px",
                  },
                }}
              >
              Presupuesto estimado
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
                Gracias por confiar en nuestro cotizador, basado en la información que has proporcionado, hemos elaborado un presupuesto personalizado para la instalación de tu cargador de vehículo eléctrico domiciliario. 
                <br /><br />A continuación encontrarás el desglose detallado de los valores referenciales para tu instalación. Este presupuesto ha sido diseñado específicamente según los datos que ingresaste en nuestro formulario.
              </Typography>
              
              <Paper variant="outlined" sx={{ border: `1px solid ${borderColor}` }}>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
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
                        $ {estimate?.materialsCost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimate?.materialsCost?.toLocaleString()}
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
                        $ {estimate?.manpowerCost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimate?.manpowerCost?.toLocaleString()}
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
                        $ {estimate?.TE6Cost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimate?.TE6Cost?.toLocaleString()}
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
                        $ {estimate?.netCost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimate?.netCost?.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        IVA {estimate?.vatPercentage}%
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimate?.vat?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimate?.vat?.toLocaleString()}
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
                        $ {estimate?.totalInstallationGross?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f3f3f3' }}>
                        <Typography fontWeight={400} variant="h6">
                        $ {estimate?.totalInstallationGross?.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  
                  <TableBody>
                  </TableBody>
                  </Table>
                </TableContainer>
                
              </Paper>
                
                
{/*               
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Descripción</th>
                    <th className="border p-2 text-right">3,5 kW</th>
                    <th className="border p-2 text-right">7 kW</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Materiales</td>
                    <td className="border p-2 text-right">$ {estimate?.materialsCost?.toLocaleString()}</td>
                    <td className="border p-2 text-right">$ {estimate?.materialsCost?.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Instalación</td>
                    <td className="border p-2 text-right">$ {estimate?.manpowerCost?.toLocaleString()}</td>
                    <td className="border p-2 text-right">$ {estimate?.manpowerCost?.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Trámites SEC</td>
                    <td className="border p-2 text-right">$ {estimate?.TE6Cost?.toLocaleString()}</td>
                    <td className="border p-2 text-right">$ {estimate?.TE6Cost?.toLocaleString()}</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="border p-2">Total neto</td>
                    <td className="border p-2 text-right">$ {estimate?.netCost?.toLocaleString()}</td>
                    <td className="border p-2 text-right">$ {estimate?.netCost?.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">IVA {estimate?.vatPercentage}%</td>
                    <td className="border p-2 text-right">$ {estimate?.vat?.toLocaleString()}</td>
                    <td className="border p-2 text-right">$ {estimate?.vat?.toLocaleString()}</td>
                  </tr>
                  <tr className="font-bold bg-gray-50">
                    <td className="border p-2">Total bruto</td>
                    <td className="border p-2 text-right">$ {estimate?.totalInstallationGross?.toLocaleString()}</td>
                    <td className="border p-2 text-right">$ {estimate?.totalInstallationGross?.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table> */}

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
                  Tipo de residencia: Casa
                </p>
              </div>
        </Container>
      </Box>
      <Box bgcolor="#ffffff" width={"100%"} mt={1} 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {/* 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning', */}
        <Button type="submit" variant="contained" 
        sx={{
          width: "50%",
          padding: "10px",
          // background: "white",
          // border: "primary"
        }}>
              Enviar presupuesto por email
        </Button>
        
      </Box>
    </>
  );
};


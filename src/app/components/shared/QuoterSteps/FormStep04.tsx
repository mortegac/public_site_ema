"use client";
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";


export const FormStep04 = (props:any) => {


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


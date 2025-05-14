"use client";
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  CardContent,
  Button,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

const content = `<iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2wZ2FrzoX4XzOkckf8fex8qvCcw9OI5iO6nHQmyCvgqA21Unw4zOnR0uLhJDzw5ZtIWvWExqBx?gv=true" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none;" width="100%" height="600" frameborder="0"></iframe>`


const Calendar = (props:any) => {


  return (
    <Box
          sx={{
            py: {
                xs: 5,
                lg: 11,
            },
        }}
      >
      <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center" justifyContent="center">
              <Grid item xs={12} lg={7}>
                  <Typography textAlign="center"
                      variant="h4" lineHeight={1.4}
                      mb={6} fontWeight={700}
                      sx={{
                          fontSize: {
                              lg: '40px',
                              xs: '35px',
                          },
                      }}
                  >
                    Nuestros Servicios & Paquetes
                  </Typography>
                  <Typography textAlign="center"
                      variant="h4" lineHeight={1.4}
                      mb={6} 
                      fontWeight={300}
                      sx={{
                          fontSize: {
                              lg: '18px',
                              xs: '20px',
                          },
                      }}
                  >
                    En Enérgica City, realizamos visitas técnicas para evaluar tu espacio y brindarte la mejor solución. Un instalador especializado irá a terreno para analizar las condiciones del lugar, resolver todas tus dudas y proporcionarte una cotización a medida sin compromiso. Así, podrás conocer el costo real y los requerimientos exactos antes de tomar una decisión. ¡Asegura una instalación eficiente, segura y adaptada a tus necesidades! Agenda tu visita ahora y da el primer paso hacia la movilidad eléctrica sin complicaciones.
                  </Typography>
                  <Typography>
                  VALOR VISITA TÉCNICA: $10.000* (Valor se reembolsa si se acepta propuesta de instalación generada por visita)
                  </Typography>
              </Grid>
          </Grid>
          <CardContent sx={{ position: 'relative', width:"100%", height:"500px"}}>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </CardContent>
          
          {/* <PaymentMethods /> */}
      </Container>
    </Box>
  );
};

export default Calendar;

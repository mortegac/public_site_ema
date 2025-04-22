"use client";
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Button
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Notice = () => {
  //   sidebar
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <Box
      // bgcolor="#4BBFD9"
      sx={{
        background: 'linear-gradient(rgb(75, 191, 217) 10%, rgb(4 193 236) 84%, rgb(0 171 209) 100%)'
      }}
      borderRadius={0}
      textAlign="center"
      py="14px"
      mt={5}
      position="relative"
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "column" }}
          spacing="16px"
          justifyContent="center"
          alignItems="center"
          padding={"64px"}
        >
          <Typography variant="body1" color="white" fontSize="18px">
          Vives en edificio
          </Typography>
          <Typography variant="h2" color="white" fontSize="36px" mb={"16px"} lineHeight={"42px"}
            // sx={{
            //   marginBottom: '22px'
            // }}
          >
          ¿No sabes cómo instalar un cargador en tu estacionamiento?
          </Typography>
          <Box
              sx={{
                paddingTop: "22px",
              }}>
            <Button
              sx={{
                padding: "12px 32px",
              }}
            
                  color="primary"
                  variant="contained"
                  href="/contactanos"
                >
                  Agenda tu visita
            </Button>
            
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Notice;

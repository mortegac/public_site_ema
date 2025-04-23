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
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

const Banner = (props:any) => {
  const { titleOne, titleTwo, buttonText, buttonTextTwo, description} = props;
  //   sidebar
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box bgcolor="#ffffff" pt={7} pb={7}>
      <Container
        sx={{
          maxWidth: "1400px !important",
          position: "relative",
        }}
      >
        <Grid container spacing={3} justifyContent="center" mb={4}>
          <Grid item xs={12} lg={6} textAlign="left">
            <Typography
              variant="h1"
              fontWeight={700}
              lineHeight="1.2"
              sx={{
                fontSize: {
                  xs: "40px",
                  sm: "56px",
                },
              }}
            >
             {/* Instalación de {" "} */}
             {titleOne} {" "} <br/>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "40px",
                    sm: "56px",
                  },
                }}
                align="left"
                fontWeight={700}
                component="span"
                color="primary.main"
              >
                  {titleTwo} {" "} <br/>
                {/* Cargadores para <br/>vehículos eléctricos */}
              </Typography>{" "}
            </Typography>
            <Typography
            align="left"
                        sx={{
                          display: "block",
                          padding: "30px 0",
                          fontSize: "18px",
                          color: (theme) => theme.palette.text.primary
                        }}
                        component="span"
            >
              {description}
              
            {/* Valorizamos tus proyectos de instalación de manera ágil e instalamos el cargador directamente en tu hogar, u oficina, sea casa o edificio. */}
            </Typography>
            <Stack
              my={3}
              direction={{ xs: "column", sm: "row" }}
              spacing="20px"
              alignItems="center"
              justifyContent="left"
            >
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="left"
              spacing={3}
              mb={4}
              justifyContent="left"
            >
              
             { buttonText && <Button
                color="primary"
                size="large"
                variant="contained"
                href="/auth/auth1/login"
              >
                {buttonText}
                
                {/* Agenda tu visita */}
              </Button>}
              
              <Button
                color="primary"
                size="large"
                variant="outlined"
                href="/auth/auth1/login"
              >
                 {buttonTextTwo}
                {/* Simula el costo de la instalación */}
              </Button>
            
            </Stack>
            <Stack
              direction="row"
              flexWrap="wrap"
              alignItems="center"
              spacing={3}
              mb={8}
              justifyContent="center"
            >
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                position: 'relative',
                '& img': {
                  width: '100%',
                  height: 'auto',
                  // borderRadius: '16px',
                  // boxShadow: '0px 6px 12px rgba(127, 145, 156, 0.12)',
                }
              }}
            >
              <Image
                src="/images/headers/cargador-electrico.png"
                alt="Cargador eléctrico"
                width={500}
                height={300}
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;

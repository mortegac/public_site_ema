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
  const { titleOne, titleTwo, buttonText, buttonURI, buttonTextTwo, buttonURITwo, description, imageSrc} = props;
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
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          <Box sx={{ textAlign: 'left' }}>
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
                href={buttonURI}
              >
                {buttonText}
              </Button>}
              
              {buttonTextTwo && <Button
                color="primary"
                size="large"
                variant="outlined"
                href={buttonURITwo}
              >
                 {buttonTextTwo}
              </Button>}
            
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
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                position: 'relative',
                '& img': {
                  width: '100%',
                  height: 'auto',
                }
              }}
            >
              <Image
                src={imageSrc}
                alt="Cargador eléctrico"
                width={500}
                height={300}
                priority
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { defaultComponents } from "@/app/components/PrismicRichText";

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
import { HeroProps } from "../types"

export const Default: FC<HeroProps> = ({ slice }) => {
  const {primary} = slice;
  
    return(
      <Box bgcolor="#ffffff" pt={7} pb={7}
      data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
    >
      <Container
        sx={{
          maxWidth: "1200px !important",
          position: "relative",
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          <Box sx={{ textAlign: 'left', display:'flex', flexDirection:'col', alignItems:'center' }}>
            <Stack
              my={3}
              direction={{ xs: "column", sm: "column", xl:"column" }}
              spacing="20px"
              alignItems="center"
              justifyContent="left"
            >

              <Typography
                id="title-hero"
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
                <PrismicRichText
                  field={slice.primary.title} 
                  components={defaultComponents}
                />                
              </Typography>
              <br/>
              
                
                <Typography
                  id="title-description"
                  variant="body1"
                  fontWeight={200}
                  lineHeight="1.5"
                  sx={{
                    fontSize: {
                      xs: "18px",
                      sm: "18px",
                    },
                  }}
                >
                  <PrismicRichText
                    field={(slice?.primary as any)?.description} 
                    components={defaultComponents}
                  />                
                </Typography>
             

            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="left"
              spacing={3}
              mb={4}
              justifyContent="left"
            >
              
             {primary?.buttononetext && <Button
                color="primary"
                size="large"
                variant="contained"
                href={(primary?.buttononelink as any)?.url || "#"}
              >
                {primary.buttononetext}
              </Button>}
              
              {primary?.buttontwotext && <Button
                color="primary"
                size="large"
                variant="outlined"
                href={(primary?.buttontwolink as any)?.url || "#"}
              >
                 {primary.buttontwotext}
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
                src={primary?.image?.url || "/images/headers/contacto-energica.png"}
                alt={primary?.image?.alt || "Cargador eléctrico"}
                width={500}
                height={300}
                priority
                unoptimized
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
    )
  }
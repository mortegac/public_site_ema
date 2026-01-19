"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { defaultComponents } from "@/app/components/PrismicRichText";


import { Text } from "@/app/components/shared/text";

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

// Type guard function para verificar que primary tiene la propiedad image
function hasImageProperty(primary: any): primary is { image: { url?: string; alt?: string } } {
  return primary && typeof primary === 'object' && 'image' in primary;
}

export const Default: FC<HeroProps> = ({ slice }) => {
  const {primary} = slice;
  // Verificar que primary tiene la propiedad image usando type guard
  const imageUrl = hasImageProperty(primary) ? primary.image?.url : undefined;
  const imageAlt = hasImageProperty(primary) ? primary.image?.alt : undefined;
  
    return(
      <Box id="container" bgcolor="#ffffff" pt={7} pb={{ xs: 0, md: 7 }}
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
          <Box 
            id="box-header" 
            sx={{ 
              textAlign: 'left', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start',
              justifyContent: "center",
              gap: 3
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Text textObject={slice?.primary?.title} /> 
              <Text textObject={(slice?.primary as any)?.description}/> 

            </Stack>
            
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="flex-start"
              spacing={3}
              justifyContent="flex-start"
              marginTop={6}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              {primary?.buttononetext && <Button
                color="primary"
                size="large"
                variant="contained"
                href={(primary?.buttononelink as any)?.url || "#"}
                sx={{ 
                  width: { xs: "100%", sm: "auto" }, 
                  paddingY: 2,
                  fontSize: "1.2rem",
                  fontWeight: 500
                }}
              >
                {primary.buttononetext}
              </Button>}
              
              {primary?.buttontwotext && <Button
                color="primary"
                size="large"
                variant="outlined"
                href={(primary?.buttontwolink as any)?.url || "#"}
                sx={{ 
                  width: { xs: "100%", sm: "auto" }, 
                  paddingY: 2,
                  fontSize: "1.2rem",
                  fontWeight: 500
                }}
              >
                 {primary.buttontwotext}
              </Button>}
            </Stack>
          </Box>
          
          {/* image */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
              id="boxImage"
              sx={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                position: 'relative',
                display: { xs: 'none', sm: 'block' },
                '& img': {
                  width: '100%',
                  height: 'auto',
                }
              }}
            >
              <Image
                src={imageUrl || "/images/headers/contacto-energica.png"}
                alt={imageAlt || "Cargador eléctrico"}
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
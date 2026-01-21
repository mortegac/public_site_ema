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

export const WithVideo: FC<HeroProps> = ({ slice }) => {
  // Type guard para asegurar que es la variación withVideo
  if (slice.variation !== "withVideo") {
    return null;
  }
  
  const primary = slice.primary as Content.HeroSliceWithVideoPrimary;
  
    return(
      <Box id="hero" bgcolor="#f1f1f1"
      sx={{ 
        width: '100%',
        minHeight: "800px",
        margin: 0,
        padding: 0,
        paddingY: "22px",
        position: "relative",
        borderRadius: 0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        overflow: 'hidden',
      }}
      
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
    >
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src={primary?.videourl || undefined} type="video/webm" />
        <source src={primary?.videourl || undefined} type="video/mp4" />
        <source src={primary?.videourl || undefined} type="video/ogg" />
      </Box>
      <Container
        sx={{
          maxWidth: "1200px !important",
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3, width: '100%' }}>
          
          <Box 
            id="box-header" 
            sx={{ 
              textAlign: 'left', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start',
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              alignItems="flex-start"
              justifyContent="flex-start"
              sx={{ 
                background: 'rgb(0,0,0,0.6)',
                paddingX: '24px',
                paddingY: '16px',
              }}
            >
              <Text textObject={slice?.primary?.title} color="#FFFFFF" /> 
              <Text textObject={(slice?.primary as any)?.description} color="#FFFFFF"/> 

            </Stack>
          
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="flex-start"
              justifyContent="flex-start"
              sx={{ 
                paddingY: '12px',
                width: '100%',
              }}
            >
              {primary?.buttononetext && <Button
                color="primary"
                size="large"
                variant="contained"
                href={(primary?.buttononelink as any)?.url || "#"}
                sx={{ 
                  width: { xs: "100%", sm: "auto" }, 
                  paddingY: 2,
                  fontSize: "1.1rem",
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
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  background: '#FFFFFF',
                }}
              >
                 {primary.buttontwotext}
              </Button>}
            </Stack>
          </Box>
          
        </Box>
       
          {/* <pre>{JSON.stringify(primary?.videourl, null,2 )}</pre> */}
      </Container> 
    </Box>
    )
  }
"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";
import { defaultComponents } from "@/app/components/PrismicRichText";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";

import { Text } from "@/app/components/shared/text";

import { OptionsContentProps } from "../types"

export const TwoColumns: FC<OptionsContentProps> = ({ slice }) => {
  const { primary } = slice;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return(
    <Box bgcolor="#ffffff" pt={7} pb={7}
    data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
  >
    <Container
      sx={{
        maxWidth: "1400px !important",
        position: "relative",
      }}
    >
      <Box id="boxOPtions" sx={{ 
        textAlign: 'left', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%' 
      }}>
       
        
        <Box
          id="listOptions"
          sx={{
            my: 3,
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: 'wrap',
            gap: '36px',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {primary?.options?.map((option: any, index: number) => (
            <Card 
              key={index}
              sx={{ 
                width: { xs: '100%', md: 'calc(38% - 10px)' },
                maxWidth: { xs: '100%', md: 'none' },
                position: 'relative',
                boxShadow: 3,
                backgroundColor: '#ffffff',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                  backgroundColor: '#f5f5f5',
                  transition: 'all 0.3s ease-in-out'
                }
              }}
            >
             
              {/* <Typography
                id="title-options"
                variant="h2"
                fontWeight={200}
                lineHeight="1.5"
                align="center"
                sx={{
                  fontSize: {
                    xs: "32px",
                    sm: "32px",
                  },
                }}
              >
                <PrismicRichText
                  field={option.title} 
                  components={defaultComponents}
                />                
              </Typography> */}
              
              <Text textObject={option.title} /> 


              {/* <Typography
                id="subtitle-options"
                variant="body1"
                fontWeight={200}
                lineHeight="1.5"
                align="center"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "16px",
                  },
                }}
              >
                <PrismicRichText
                  field={option.subtitle} 
                  components={defaultComponents}
                />                
              </Typography> */}
              <Text textObject={option.subtitle} /> 
              
                
              {/* Imagen de la card */}
              <CardMedia
                component="div"
                sx={{
                  height: 288,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...(option.texttopbanner && { marginTop: '32px' })
                }}
              >
                {option.image?.url && (
                  <Image
                    src={option.image.url}
                    alt={option.image.alt || `Option ${index + 1}`}
                    width={288}
                    height={252}
                    style={{
                      objectFit: 'contain',
                      borderRadius: '8px'
                    }}
                    unoptimized
                  />
                )}
                
                {/* {option.buttontext && <Button
                color="primary"
                size="large"
                variant="contained"
                href={(primary?.buttononelink as any)?.url || "#"}
              >
                {primary.buttononetext}
              </Button>} */}
              
              {option.buttontext &&    <Button
              variant="contained"
              size="large"
              sx={{
                paddingX: 4,
                paddingY: 1.5,
                borderRadius: '24px',
                background:"#E81A68",
                color:"#FFFFFF",
                border: "1px solid #E81A68",
                width: { xs: '100%', md: 'auto' }
              }}
              href={(option?.buttonlink as any)?.url || "#"}
              // onClick={() => trackEvent('agendar_otra_visita', 'AGENDA_EMA', 'ir a la pagina agenda') }
            >
             {option.buttontext}``
            </Button>
}
              </CardMedia>

              {/* Contenido de la card */}
              {/* <CardContent sx={{ padding: '16px' }}>
                
                </CardContent> */}
                {/* <pre>{JSON.stringify(option, null, 2 )}</pre> */}
            </Card>
          ))}
        </Box>
      </Box>
          {/* <pre>{JSON.stringify(slice?.primary?.options, null, 2 )}</pre> */}
        
    </Container>
    </Box>
  )
};
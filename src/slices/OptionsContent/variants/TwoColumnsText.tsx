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

export const TwoColumnsText: FC<OptionsContentProps> = ({ slice }) => {
  const { primary } = slice;
  const primaryDefault = primary as any;
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
        <Box 
          id="boxText"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            flex: { xs: '1 1 100%', md: '1 1 50%' }
          }}
        >
          <Text textObject={primaryDefault?.title} /> 
          <Text textObject={primaryDefault?.description} /> 
        </Box>
        
      <Box 
        id="boxColumn"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 4 },
          width: '100%'
        }}
      >
           <Box 
          id="boxOPtions" 
          sx={{ 
            textAlign: 'left', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flex: { xs: '1 1 100%', md: '1 1 50%' }
          }}
        >
        
          
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
                {/* Imagen de la card */}
                <CardMedia
                  component="div"
                  sx={{
                    height: 288,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...(option.texttopbanner && { marginTop: '32px' })
                  }}
                >
                  {option.image?.url && (
                    <Image
                      src={option.image.url}
                      alt={option.image.alt || `Option ${index + 1}`}
                      width={80}
                      height={80}
                      style={{
                        objectFit: 'contain',
                        borderRadius: '8px',
                        marginBottom: '22px',
                      }}
                      unoptimized
                    />
                  )}
                  
                  <Text textObject={option.title} />
                  <Text textObject={option.subtitle} /> 
                
                </CardMedia>
              

                
                  
              </Card>
            ))}
          </Box>
          
        </Box>
        
        
      
     
      </Box>
          {/* <pre>{JSON.stringify(slice?.primary, null, 2 )}</pre> */}
        
    </Container>
    </Box>
  )
};
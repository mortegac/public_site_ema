"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { defaultComponents } from "@/app/components/PrismicRichText";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

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
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

import { OptionsContentProps } from "../types"

export const Team: FC<OptionsContentProps> = ({ slice }) => {
  const {primary} = slice;
  const primaryDefault = primary as any;
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    align: 'start',
    dragFree: false,
  }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  
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
          <Stack
            my={3}
            direction={{ xs: "column", sm: "column", xl:"column" }}
            spacing="20px"
            alignItems="center"
            justifyContent="center"
          >
            <Text textObject={primaryDefault?.title}/>        
            <Text textObject={primaryDefault?.description}/>        
          </Stack>
          
          {/* Contenedor del carrusel */}
          <Box id='container-carrousel' sx={{ 
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            marginTop: 3
          }}>
            {/* Carrusel */}
            <Box className="embla" ref={emblaRef} sx={{ 
              overflow: 'hidden',
              padding: '0 10px',
            }}>
              <Box className="embla__container" sx={{ 
                display: 'flex',
                justifyContent: 'flex-start',
                transition: 'transform 0.5s ease-in-out',
                gap: '20px',
                alignItems: 'stretch',
              }}>
                {primaryDefault?.options?.map((option: any, index: number) => (
                  <Box 
                    key={index}
                    className="embla__slide" 
                    sx={{ 
                      flex: '0 0 calc(25% - 15px)',
                      minWidth: 0,
                      padding: '0 5px',
                      display: 'flex',
                      '@media (max-width: 1200px)': {
                        flex: '0 0 calc(33.333% - 14px)'
                      },
                      '@media (max-width: 900px)': {
                        flex: '0 0 calc(50% - 10px)'
                      },
                      '@media (max-width: 600px)': {
                        flex: '0 0 100%'
                      }
                    }}
                  >
                    <Box 
                      id="cardPerson"
                      sx={{ 
                        maxWidth: 345, 
                        width: '100%',
                        position: 'relative',
                        padding: '56px 0 56px 0',
                      }}
                    >
                      
                      {/* Imagen de la card */}
                      <CardMedia
                        component="div"
                        sx={{
                          height: 220,
                          position: 'relative',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {option.image?.url && (
                          <Image
                            src={option.image.url}
                            alt={option.image.alt || `Option ${index + 1}`}
                            width={179}
                            height={172}
                            style={{
                              objectFit: 'contain',
                              borderRadius: '8px'
                            }}
                            unoptimized
                          />
                        )}
                      </CardMedia>
        
                      <Stack
                        id="listOptions"
                        my={3}
                        direction={{ xs: "column", sm: "column" }}
                        spacing="0px"
                        alignItems="center"
                        justifyContent="start"
                        sx={{ width: '100%', minHeight: '148px', }}
                      >
                        <Text textObject={option.name}/>  
                        <Text textObject={option.position} fontSize="14px"/>
                        {option.buttonimage?.url && (
                          <Image
                            src={option.buttonimage.url}
                            alt={option.buttonimage.alt || `Option ${index + 1}`}
                            width={40}
                            height={40}
                            style={{
                              objectFit: 'contain',
                              borderRadius: '8px',
                              marginTop: '20px',
                            }}
                            unoptimized
                          />
                        )}
                      </Stack>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
          
         {/* <pre>{JSON.stringify(slice?.primary?.options, null, 2 )}</pre> */}
      </Container>
      </Box>
    )
  }
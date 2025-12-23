"use client"
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
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";


import { CarrouselOptionsProps } from "../types"

export const LogoList: FC<CarrouselOptionsProps> = ({ slice }) => {
  // Type guard to ensure we're dealing with logoList variation
  if (slice.variation !== "logoList") {
    return null;
  }
  // After the type guard, TypeScript knows slice has logoList variation
  const primary = (slice as Extract<typeof slice, { variation: "logoList" }>).primary;
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    align: 'start',
    dragFree: false,
  }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

    
    return(
      // <Box bgcolor="#ffffff" pt={7} pb={7}
      <Box bgcolor="#ffffff" 
    data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
  >
    <Container
      sx={{
        maxWidth: "1200px !important",
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
        
       
        
        {/* Contenedor del carrusel */}
        <Box id='container-carrousel' sx={{ 
          width: '100%', // Cambiar de 90% a 100%
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Botones de navegación */}
          <IconButton
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            sx={{
              position: 'absolute',
              left: 10, // Cambiar de -15 a 10
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: 'white',
              boxShadow: 2,
              width: 40,
              height: 40,
              '&:hover': {
                backgroundColor: 'grey.100',
              },
              '&:disabled': {
                opacity: 0.3,
              }
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            sx={{
              position: 'absolute',
              right: 10, // Cambiar de -15 a 10
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: 'white',
              boxShadow: 2,
              width: 40,
              height: 40,
              '&:hover': {
                backgroundColor: 'grey.100',
              },
              '&:disabled': {
                opacity: 0.3,
              }
            }}
          >
            <ChevronRight />
          </IconButton>
          {/* Carrusel */}
          <Box className="embla" ref={emblaRef} sx={{ 
            overflow: 'hidden',
            padding: '0 10px', // Aumentar padding para los botones
          }}>
            <Box className="embla__container" sx={{ 
              display: 'flex',
              justifyContent:'flex-start',
              transition: 'transform 0.5s ease-in-out',
              gap: '26px',
              // padding: '16px 56px',
              alignItems: 'stretch',
              
              
            }}>
              {primary.options?.map((option:any, index:number) => (
                <Box 
                  key={index}
                  className="embla__slide" 
                  sx={{ 
                    flex: '0 0 32%', // Cambiar a 32% para 3 cards
                    minWidth: 0,
                    padding: '0 5px',
                    display: 'flex',
                    '@media (max-width: 600px)': {
                      flex: '0 0 100%'
                    }
                  }}
                >
                      <Stack
                        id="listOptions"
                        my={3}
                        direction={{ xs: "column", sm: "row" }}
                        spacing="20px"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ width: '100%' }}
                      >
                      
                        {(option as any).image?.url && (
                          <Image
                            src={(option as any).image.url}
                            alt={(option as any).image.alt || `Option ${index + 1}`}
                            width={220} // Aumentar de 200 a 300
                            height={220} // Aumentar de 200 a 300
                            style={{
                              objectFit: 'contain',
                              borderRadius: '8px'
                            }}
                            unoptimized
                          />
                        )}
                    
                      </Stack>
                  {/* </Card> */}
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
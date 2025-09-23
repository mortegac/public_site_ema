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

export const Default: FC<CarrouselOptionsProps> = ({ slice }) => {
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
      <Box id="boxOPtions" sx={{ 
        textAlign: 'left', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%' 
      }}>
        
        {/* Title and description */}
        <Stack
          my={3}
          direction={{ xs: "column", sm: "row", xl:"column" }}
          spacing="20px"
          alignItems="center"
          justifyContent="center"
          width= '100%' 
        >
              
          <Typography
                  id="title-options"
                  variant="h3"
                  fontWeight={400}
                  lineHeight="1.2"
                  width="100%"
                  sx={{
                    background:"pink",
                    width: '100%',
                    fontSize: {
                      xs: "22px",
                      sm: "22px",
                    },
                  }}
                >
            <PrismicRichText
              field={slice?.primary?.title} 
              components={defaultComponents}
            />                
          </Typography>
        
          <Typography
            id="description-options"
            variant="body1"
            fontWeight={200}
            lineHeight="1.5"
            align="left"
            width= '100%'
            sx={{
              fontSize: {
                xs: "18px",
                sm: "18px",
              },
            }}
          >
            <PrismicRichText
              field={slice?.primary?.description} 
              components={defaultComponents}
            />                
          </Typography>
        </Stack>
        
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
          </IconButton>250
          {/* Carrusel */}
          <Box className="embla" ref={emblaRef} sx={{ 
            overflow: 'hidden',
            background: "blue",
            padding: '0 10px', // Aumentar padding para los botones
            margin: '0 80px', 
          }}>
            <Box className="embla__container" sx={{ 
              display: 'flex',
              justifyContent:'flex-start',
              transition: 'transform 0.5s ease-in-out',
              gap: '26px',
              padding: '16px 56px',
              alignItems: 'stretch',
              
              
            }}>
              {slice?.primary?.options?.map((option, index) => (
                <Box 
                  key={index}
                  className="embla__slide" 
                  sx={{ 
                    flex: '0 0 45%', // Cambiar a 45% para 2 cards
                    minWidth: 0,
                    padding: '0 5px',
                    display: 'flex',
                    '@media (max-width: 600px)': {
                      flex: '0 0 100%'
                    }
                  }}
                >
                  <Card 
                    sx={{ 
                      background: option?.hastopbanner ? '#ECF2FF' :'#FFF',
                      maxWidth: '100%',
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      boxShadow: 3,
                      transition: 'all 0.3s ease-in-out',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-4px)',
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
                      {/* texttopbanner */}
                      {option.texttopbanner && option.texttopbanner.length > 0 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: option?.hastopbanner ? '#929292' : 'transparent',
                            padding: '12px 16px',
                            zIndex: 1,
                            borderTopLeftRadius: '4px',
                            borderTopRightRadius: '4px',
                            textAlign: 'center'
                          }}
                        >
                          <PrismicRichText
                            field={option.texttopbanner}
                            components={{
                              paragraph: ({ children }) => (
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    color: option?.hastopbanner ? '#fff': '#3a3a3a',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}
                                  
                                  
                                >
                                  {children}
                                </Typography>
                              ),
                            }}
                          />
                        </Box>
                      )}
                      
                      {/* pricetoptext */}                      
                      {option.pricetoptext && option.pricetoptext.length > 0 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: option?.hastopbanner ? '#929292' : 'transparent',
                            padding: '12px 16px',
                            zIndex: 1,
                            borderTopLeftRadius: '4px',
                            borderTopRightRadius: '4px',
                            textAlign: 'center'
                          }}
                        >
                          <PrismicRichText
                            field={option.texttopbanner}
                            components={{
                              paragraph: ({ children }) => (
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    color: option?.hastopbanner ? '#fff': '#3a3a3a',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}
                                  
                                  
                                >
                                  {children}
                                </Typography>
                              ),
                            }}
                          />
                        </Box>
                      )}
                      
                    

                      {/* Imagen de la card - MÁS GRANDE */}
                      <CardMedia
                        component="div"
                        sx={{
                          height: '100%', // Aumentar de 160 a 250
                          position: 'relative',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          ...(option.texttopbanner && { marginTop: '32px' })
                        }}
                      >
                        {(option as any).image?.url && (
                          <Image
                            src={(option as any).image.url}
                            alt={(option as any).image.alt || `Option ${index + 1}`}
                            width={300} // Aumentar de 200 a 300
                            height={300} // Aumentar de 200 a 300
                            style={{
                              objectFit: 'contain',
                              borderRadius: '8px'
                            }}
                            unoptimized
                          />
                        )}
                      </CardMedia>

                      {/* Contenido de la card */}
                      <CardContent sx={{ padding: '16px'}}>
                        
                        {/* brand */}
                        <Typography
                          id="brand-options"
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
                          {/* <PrismicRichText
                            field={option?.brand || ""} 
                            components={defaultComponents}
                          />   */}
                          {option?.brand || ""}               
                        </Typography>
                        
                        <Typography
                          id="description-options"
                          variant="body1"
                          fontWeight={200}
                          lineHeight="1.5"
                          align="center"
                          sx={{
                            fontSize: {
                              xs: "12px",
                              sm: "12px",
                            },
                          }}
                        >Potencia de salida             
                        </Typography>
                        
                        {/* capacity */}
                        <Typography
                          id="description-options"
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
                        >{option.capacity} 
                        </Typography>
                        
                        {/* pricetoptext */}
                        <Typography
                          id="description-options"
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
                            field={option.pricetoptext} 
                            components={defaultComponents}
                          />                
                        </Typography>
                        
                        {/* pricetopvalue */}
                        <Typography
                          id="description-options"
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
                        >{option.pricetopvalue} 
                        </Typography>
                        
                         {/* pricebottomtext */}
                         <Typography
                          id="description-options"
                          variant="body1"
                          fontWeight={200}
                          lineHeight="1.5"
                          align="center"
                          sx={{
                            fontSize: {
                              xs: "12px",
                              sm: "12px",
                            },
                          }}
                        >
                          <PrismicRichText
                            field={option.pricebottomtext} 
                            components={defaultComponents}
                          />                
                        </Typography>
                        
                         {/* Botón de compra */}
                         {option.buttontext && (
                          <Box sx={{ textAlign: 'center' }}>
                            <Button
                              variant="contained"
                              href={(option.buttonlink as any)?.url || '#'}
                              sx={{
                                backgroundColor: '#E91E63', // Color magenta/rosa como en la imagen
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontSize: '16px',
                                fontWeight: 600,
                                '&:hover': {
                                  backgroundColor: '#C2185B',
                                }
                              }}
                            >
                              {option.buttontext}
                            </Button>
                          </Box>
                        )}
                        
                        
                      </CardContent>
                      
                      </Stack>
                  </Card>
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
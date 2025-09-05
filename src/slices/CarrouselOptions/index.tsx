// import { FC } from "react";
// import { Content } from "@prismicio/client";
// import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CarrouselOptions`.
 */

/**
 * Component for "CarrouselOptions" Slices.
 */
"use client"
import { FC, useCallback, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { defaultComponents } from "@/app/components/PrismicRichText";
import useEmblaCarousel from 'embla-carousel-react';

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

/**
 * Props for `OptionsContent`.
 */

export type CarrouselOptionsProps =
  SliceComponentProps<Content.CarrouselOptionsSlice>;


/**
 * Component for "OptionsContent" Slices.
 */
const CarrouselOptions: FC<CarrouselOptionsProps> = ({ slice }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });
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
  }, [emblaApi, onSelect]);

  return (
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
          direction={{ xs: "column", sm: "row", xl:"column" }}
          spacing="20px"
          alignItems="center"
          justifyContent="center"
        >
              
          <Typography
                  id="title-options"
                  variant="h3"
                  fontWeight={400}
                  lineHeight="1.2"
                  sx={{
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
            align="center"
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
          width: '90%', 
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Botones de navegación */}
          <IconButton
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            sx={{
              position: 'absolute',
              left: -15,
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
              right: -15,
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
          <Box className="embla" ref={emblaRef}>
            <Box className="embla__container" sx={{ 
              display: 'flex',
              gap: '20px'
            }}>
              {slice?.primary?.options?.map((option, index) => (
                <>
                {/* <pre>{JSON.stringify(option, null, 2 )}</pre> */}
                  <Box 
                    key={index}
                    className="embla__slide" 
                    sx={{ 
                      flex: '0 0 30%', // 40% del ancho
                      justifyContent: 'center',
                      minWidth: 0,
                      '@media (max-width: 600px)': {
                        flex: '0 0 100%' // 1 slide en móvil
                      }
                    }}
                  >
                    <Card 
                      sx={{ 
                        background: option?.hastopbanner ? '#ECF2FF' :'#FFF',
                        maxWidth: '100%',
                        width: '100%',
                        position: 'relative',
                        boxShadow: 3,
                        '&:hover': {
                          boxShadow: 6,
                          transform: 'translateY(-4px)',
                          transition: 'all 0.3s ease-in-out'
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
                      
                    

                      {/* Imagen de la card */}
                      <CardMedia
                        component="div"
                        sx={{
                          height: 160,
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
                            width={200}
                            height={200}
                            style={{
                              objectFit: 'contain',
                              borderRadius: '8px'
                            }}
                            unoptimized
                          />
                        )}
                      </CardMedia>

                      {/* Contenido de la card */}
                      <CardContent sx={{ padding: '16px', background: 'pink' }}>
                        
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
                </>
              ))}
            </Box>
          </Box>
          
        </Box>
      </Box>
        
       {/* <pre>{JSON.stringify(slice?.primary?.options, null, 2 )}</pre> */}
    </Container>
    </Box>
  );
};


// const CarrouselOptions: FC<CarrouselOptionsProps> = ({ slice }) => {
//   return (
//     <section
//       data-slice-type={slice.slice_type}
//       data-slice-variation={slice.variation}
//     >
//       Placeholder component for carrousel_options (variation: {slice.variation})
//       slices.
//       <br />
//       <strong>You can edit this slice directly in your code editor.</strong>
//       {/**
//        * 💡 Use Prismic MCP with your code editor
//        *
//        * Get AI-powered help to build your slice components — based on your actual model.
//        *
//        * ▶️ Setup:
//        * 1. Add a new MCP Server in your code editor:
//        *
//        * {
//        *   "mcpServers": {
//        *     "Prismic MCP": {
//        *       "command": "npx",
//        *       "args": ["-y", "@prismicio/mcp-server@latest"]
//        *     }
//        *   }
//        * }
//        *
//        * 2. Select a model optimized for coding (e.g. Claude 3.7 Sonnet or similar)
//        *
//        * ✅ Then open your slice file and ask your code editor:
//        *    "Code this slice"
//        *
//        * Your code editor reads your slice model and helps you code faster ⚡
//        * 🎙️ Give your feedback: https://community.prismic.io/t/help-us-shape-the-future-of-slice-creation/19505
//        * 📚 Documentation: https://prismic.io/docs/ai#code-with-prismics-mcp-server
//        */}
//     </section>
//   );
// };

export default CarrouselOptions;

"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
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
  IconButton,
} from "@mui/material";
import { formatCurrency } from "@/utils/currency";

import { CarrouselOptionsProps } from "../types"

export const ExtendedOptions: FC<CarrouselOptionsProps> = ({ slice }) => {
  // Type guard to ensure we're dealing with extendedOptions variation
  if (slice.variation !== "extendedOptions") {
    return null;
  }
  // After the type guard, TypeScript knows slice has extendedOptions variation
  const primary = (slice as Extract<typeof slice, { variation: "extendedOptions" }>).primary;
  const imageIsRight = (primary as any)?.imageisright;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return(
    <>
        <Box bgcolor="#ffffff" pt={0} pb={7}
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
        <Container
          sx={{
            maxWidth: "1200px !important",
            position: "relative",
          }}
        >
          <Box id="boxTitle" sx={{ 
            textAlign: 'left', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'flex-start', 
            width: '100%',
            padding:'0px',
          }}>
              <Typography
                      id="title-options"
                      variant="h3"
                      fontWeight={400}
                      lineHeight="1.2"
                      width='100%'
                      sx={{
                        mb: '22px',
                        fontSize: {
                          xs: "32px",
                          sm: "32px",
                        },
                      }}
                    >
                <PrismicRichText
                  field={primary.title} 
                  components={defaultComponents}
                />                
              </Typography>
            
              <Typography
                id="description-options"
                variant="body1"
                fontWeight={200}
                lineHeight="1.5"
                align="left"
                width='100%'
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "18px",
                  },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                <PrismicRichText
                  field={primary.description} 
                  components={defaultComponents}
                />                
              </Typography>
            {/* </Stack> */}
            
          
          </Box>

          <Box 
          id="chargerList"
          // sx={{ 
          //   mt: "48px",
          // }}
          >
            <Grid 
              container 
              spacing={4}
              sx={{ 
                // padding: '16px 56px',
                // alignItems: 'stretch',
              }}
            >
              
              {primary.options?.map((option:any, index) => (
                <Grid 
                size={{ xs: 12, sm: 6 }}
                key={index}
                sx={{ 
                  display: 'flex',
                  padding: '0 5px',
                }}
              >
                {/* <pre>{JSON.stringify(option, null, 2 )}</pre> */}
                  <Card 
                    sx={{ 
                      background: option?.hastopbanner ? '#ECF2FF' :'#FFF',
                      maxWidth: '100%',
                      width: '100%',
                      // height: '100%',
                      position: 'relative',
                      boxShadow: 3,
                      transition: 'all 0.3s ease-in-out',
                      display: 'flex',
                      flexDirection: 'column',
                      // height: { xs: "500px", sm: "500px" },
                      height: "500px",
                      overflowY: { xs: 'auto', sm: 'visible' },
                      overflowX: 'hidden',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                      <Stack
                        id="listOptions"
                        my={3}
                        direction={{ xs: "column", sm: "column" }}
                        spacing="20px"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ width: '100%' }}
                      >
                        {/* <pre>{JSON.stringify(option.hastopbanner, null,2 )}</pre> */}
                        {/* <pre>{JSON.stringify(option.texttopbanner, null,2 )}</pre> */}
                      
                      {/* texttopbanner */}
                      {!option.hastopbanner && option.texttopbanner.length > 0 && (
                        <Box
                        id="banner"
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
                            borderBottomLeftRadius: '0',
                            borderBottomRightRadius: '0',
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
                      {option.hastopbanner && option.pricetoptext.length > 0 && (
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
                      
                    
                    
                    
                    {/* ORDEN LAYOUT */}
                      <Box
                        id="order"
                          sx={{
                            padding: "0",
                            pt: "24px",
                            width: "100%",
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                            // height: { xs: "400px", sm: "300px" },
                            // overflowY: { xs: 'auto', sm: 'visible' },
                            // overflowX: 'hidden',
                          }}
                        >                          
                          <Box
                            id="imageBox"
                            sx={{
                              width: { xs: "100%", sm: "50%" },
                              display:'flex',
                              flexDirection: 'row',
                              justifyContent: { xs: 'flex-start', sm: 'space-between' },
                              alignItems: 'center',
                              gap: 2,
                              position: 'relative'
                            }}
                          >
                            {/* Imagen - Parte izquierda */}
                            <Box sx={{ 
                              flex: 1,
                              backgroundImage: { xs: `url(${(option as any)?.image?.url || ''})`, sm: 'none' },
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: { xs: 'left -30px center', sm: 'left center' },
                              minHeight: { xs: '200px', sm: 'auto' }
                            }}>
                              {(option as any).image?.url && (
                                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                  <Image
                                    id="imageBox"
                                    src={(option as any).image.url}
                                    alt={(option as any).image.alt || `Option ${index + 1}`}
                                    width={250}
                                    height={250}
                                    style={{
                                      objectFit: 'contain',
                                    }}
                                    unoptimized
                                  />
                                </Box>
                              )}
                            </Box>

                            {/* Botones RESPONSIVE- Parte derecha */}
                              <Box 
                                id="buttonBox"
                                sx={{ 
                                  position: { xs: 'absolute', sm: 'static' },
                                  top: { xs: '50%', sm: 'auto' },
                                  right: { xs: '20px', sm: 'auto' },
                                  transform: { xs: 'translateY(-50%)', sm: 'none' },
                                  display: { xs: 'flex', sm: 'none' }, 
                                  flexDirection: 'column', 
                                  gap: 1,
                                  zIndex: { xs: 10, sm: 'auto' },
                                  width: "100px",
                                }}>
                              <Button
                                variant='contained'
                                sx={{
                                  minWidth: 'auto',
                                  width: '100%',
                                  fontSize: '14px',
                                }}
                              >
                                Comprar
                              </Button>
                              
                              <PrismicNextLink
                                field={option?.buttontwolink}
                                style={{ textDecoration: 'none', width: '100%' }}
                              >
                                <Button
                                  id="ficha-tecnica"
                                  variant='outlined'
                                  sx={{
                                    background: "white",
                                    minWidth: 'auto',
                                    width: '100%',
                                    fontSize: '14px',
                                  }}
                                >
                                  Ver Ficha
                                </Button>
                              </PrismicNextLink>
                            </Box>
                            
                          </Box>
                          <Box
                            id="orderB"
                            sx={{
                              width: { xs: "100%", sm: "50%" },
                              display:'flex',
                              flexDirection: 'column',
                              justifyContent:'flex-end',
                              alignItems:'flex-start',
                            }}
                          >
                          {/* brand */}
                          <Typography
                            id="brand-options"
                            variant="body1"
                            fontWeight={200}
                            lineHeight="1.5"
                            align="left"
                            sx={{
                              fontSize: {
                                xs: "16px",
                                sm: "16px",
                              },
                            }}
                          >
                            {option?.brand || ""}               
                          </Typography>
                          
                          <Box
                            id="potencia-box"
                            sx={{
                              width: "100%",
                              display:'flex',
                              flexDirection: { xs: 'row', sm: 'column' },
                              justifyContent:'flex-start',
                              alignItems:'flex-start',
                            }}
                          >
                            <Typography
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
                            id="capacity-options"
                            variant="body1"
                            fontWeight={200}
                            lineHeight="1.5"
                            align="center"
                            sx={{
                              fontSize: {
                                xs: "16px",
                                sm: "16px",
                              },
                              marginLeft: { xs: '16px', sm: 0 }
                            }}
                          >{option.capacity} 
                          </Typography>
                          </Box>
                          
                          
                          
                          
                          <Box
                            id="orderB"
                            sx={{
                              // width: { xs: "100%", sm: "60%" },
                              width: "100%",
                              
                              display:'flex',
                              flexDirection: 'column',
                              justifyContent:'flex-start',
                              alignItems:'center',
                            }}
                          >
                            
                            <Box
                            id="potencia-box"
                            sx={{
                              width: "100%",
                              display:'flex',
                              flexDirection: { xs: 'row', sm: 'column' },
                              justifyContent:'flex-start',
                              alignItems:'flex-start',
                            }}
                          ></Box>
                            {/* pricetoptext */}
                            <Typography
                              id="pricetoptext-options"
                              variant="body1"
                              fontWeight={200}
                              lineHeight="1.5"
                              align="center"
                              sx={{
                                width:'100%',
                                textAlign: 'left',
                                fontSize: {
                                  xs: "12px",
                                  sm: "12px",
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
                              id="pricetovalue-options"
                              variant="body1"
                              fontWeight={600}
                              lineHeight="1.5"
                              align="center"
                              sx={{
                                width:'100%',
                                textAlign: 'left',
                                fontSize: {
                                  xs: "26px",
                                  sm: "26px",
                                },
                              }}
                            >{formatCurrency(Number(option?.pricetopvalue || 0))}
                            </Typography>
                            
                            
                            {/* pricebottomtext */}
                            <Typography
                              id="pricebottomtext-options"
                              variant="body1"
                              fontWeight={200}
                              lineHeight="1.5"
                              align="left"
                              sx={{
                                // width:'100%',
                                color:'#68AD00',
                                paddingBottom: '12px',
                                // textAlign: 'center',
                                display:'flex',
                                flexDirection: 'column',
                                justifyContent:'center',
                                alignItems:'center',
                                
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

                              {/* Botones DESKTOP- Parte derecha */}
                              <Box 
                              id="buttonBoxDesktop"
                              sx={{ 
                                display: { xs: 'none', sm: 'none', md: 'flex' }, 
                                flexDirection: 'column', 
                                gap: 1,
                                width: '100%'
                              }}>
                              <Button
                                variant='contained'
                                sx={{
                                  minWidth: 'auto',
                                  width: '100%',
                                  fontSize: '14px',
                                }}
                              >
                                Comprar
                              </Button>
                              
                              <PrismicNextLink
                                field={option?.buttontwolink}
                                style={{ textDecoration: 'none', width: '100%' }}
                              >
                                <Button
                                  id="ficha-tecnica"
                                  variant='outlined'
                                  sx={{
                                    minWidth: 'auto',
                                    width: '100%',
                                    fontSize: '14px',
                                  }}
                                >
                                  Ficha
                                </Button>
                              </PrismicNextLink>
                            </Box>
                          </Box>
                          
                          </Box>
                      </Box>
                      
                      <Box
                        id="orderHTML"
                          sx={{
                            padding: "0",
                            pt: "8px",
                            width: "100%",
                            height: "80px",
                            display:'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'flex-start',
                            
                            gap: 2,
                            '& ul, & ol': {
                              listStyle: 'none',
                              padding: 0,
                              margin: 0,
                            },
                            '& li': {
                              listStyle: 'none',
                              padding: 0,
                              margin: 0,
                            }
                          }}
                          // dangerouslySetInnerHTML={{ __html: (option as any)?.htmlfeatures || '' }}
                        >                          
                          <Box
                            id="boxHTML"
                            sx={{
                              width: { xs: "100%", sm: "100%" },
                              // display: { xs: 'none', sm: 'flex',  },                          
                              paddingX:'22px',
                              paddingY:'12px',
                              
                            }}
                            dangerouslySetInnerHTML={{ __html: (option as any)?.htmlfeatures || '' }}
                          />
                        
                      </Box>
                      {/* FIN: ORDEN LAYOUT */}

                      
                      
                      </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
              
            {/* </Box>   */}
          {/* <pre>{JSON.stringify(primary.options, null, 2 )}</pre> */}
        </Container>
    </Box>
    
    
    </>
  );
};
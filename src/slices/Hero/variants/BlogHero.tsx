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

export const BlogHero: FC<HeroProps> = ({ slice }) => {
  const {primary} = slice;
  
    return(
      <Box id="hero" bgcolor="#4dbfd9"
      sx={{ 
        width: '100%',
        maxHeight: "463px",
        margin: 0,
        padding: 0,
        position: "relative",
        borderRadius: 0,
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
      }}
      data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
    >
      <Container
        sx={{
          maxWidth: "1200px !important",
          width: '100%',
          padding: 0,
          margin: 0,
          position: "relative",
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            width: '100%',
            height: '100%',
            maxHeight: '463px',
            margin: 0,
            padding: 0,
          }}>
          {/* Contenido de texto */}
          <Box sx={{ 
            flex: 1, 
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {/* Tu contenido existente aquí */}
             <Typography
                    id="title-hero"
                    variant="h1"
                    fontWeight={700}
                    lineHeight="1.2"
                    sx={{
                      fontSize: {
                        xs: "48px",
                        sm: "48px",
                      },
                    }}
                  >
                    {/* <PrismicRichText
                      field={slice.primary.title} 
                      components={defaultComponents}
                    />                 */}
                     <PrismicRichText
                      field={slice.primary.title} 
                      components={{
                        ...defaultComponents,
                        em: ({ children }) => (
                          <em style={{ 
                            color: '#ffffff',
                            fontStyle:'normal',
                          }}>{children}</em>
                        ),
                      }}
                    />  
            </Typography>
                
            {/* </Stack> */}
            <Stack
              sx={{
                flexDirection:{ xs: "column", sm: "row" },
                mt:'24px',
              }}
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
              
          </Box>
          
          {/* Imagen  */}
          <Box sx={{ 
            flex: 1,
            position: 'relative',
            height: '250px',
            margin: 0,
            padding: 0,
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }
          }}>
            <Image
              src={primary?.image?.url || "/images/headers/contacto-energica.png"}
              alt={primary?.image?.alt || "Cargador eléctrico"}
              fill
              priority
              unoptimized
              style={{
                objectFit: 'cover',
              }}
            />
          </Box>
          
        </Box>
       
      </Container>
    </Box>
    )
  }
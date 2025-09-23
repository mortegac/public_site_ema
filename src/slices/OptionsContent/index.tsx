"use client"
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
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

/**
 * Props for `OptionsContent`.
 */
export type OptionsContentProps =
  SliceComponentProps<Content.OptionsContentSlice>;

/**
 * Component for "OptionsContent" Slices.
 */
const OptionsContent: FC<OptionsContentProps> = ({ slice }) => {
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
        
        <Stack
          id="listOptions"
          my={3}
          direction={{ xs: "column", sm: "row" }}
          spacing="20px"
          alignItems="center"
          justifyContent="center"
          sx={{ width: '100%' }}
        >
          {slice?.primary?.options?.map((option, index) => (
            <Card 
              key={index}
              sx={{ 
                maxWidth: 345, 
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
              {/* Banner superior gris si existe texttopbanner */}
              {option.texttopbanner && option.texttopbanner.length > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#929292',
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
                            color: '#fff',
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
                {option.image?.url && (
                  <Image
                    src={option.image.url}
                    alt={option.image.alt || `Option ${index + 1}`}
                    width={100}
                    height={100}
                    style={{
                      objectFit: 'contain',
                      borderRadius: '8px'
                    }}
                    unoptimized
                  />
                )}
              </CardMedia>

              {/* Contenido de la card */}
              <CardContent sx={{ padding: '16px' }}>
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
                    field={option.title} 
                    components={defaultComponents}
                  />                
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
        
       {/* <pre>{JSON.stringify(slice?.primary?.options, null, 2 )}</pre> */}
    </Container>
    </Box>
  );
};

export default OptionsContent;

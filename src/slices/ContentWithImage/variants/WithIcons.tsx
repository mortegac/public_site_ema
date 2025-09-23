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
} from "@mui/material";

import { ContentWithImageProps } from "../types"

export const WithIcons: FC<ContentWithImageProps> = ({ slice }) => {
  const { primary } = slice;
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
      <Box bgcolor="#ffffff" pt={7} pb={7}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          
        }}
      >
        <Container
          sx={{
            maxWidth: "1200px !important",
            position: "relative",
          }}
        >
          <Box
          id="boxContainer"
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, 
            gap: 3, 
            mb: 4 
          }}>
            {/* Contenido de texto */}
            <Box 
              id="boxText"
              sx={{ 
                textAlign: 'left', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'start', 
                justifyContent: 'start',
                order: imageIsRight ? 1 : 2
              }}>
              <Stack
                my={3}
                direction={{ xs: "column", sm: "column", xl: "column" }}
                alignItems="start"
                justifyContent="start"
              >
                <Typography
                  id="title-hero"
                  variant="h2"
                  fontWeight={700}
                  lineHeight="1.2"
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "20px",
                    },
                  }}
                >
                  <PrismicRichText
                    field={slice.primary.title} 
                    components={defaultComponents}
                  />                
                </Typography>
                
                <Typography
                  id="title-description"
                  variant="body1"
                  fontWeight={200}
                  lineHeight="1.5"
                  sx={{
                    mt:"24px",
                    fontSize: {
                      xs: "18px",
                      sm: "18px",
                    },
                  }}
                >
                  <PrismicRichText
                    field={(slice?.primary as any)?.description} 
                    components={defaultComponents}
                  />                
                </Typography>
                
                <Box 
                  id="boxListFeatures" 
                  sx={{

                  }}
                >
                  {(primary as any)?.list?.map((item: any, index: number) => (
                    <Box key={`list-item-${index}`} sx={{ display: 'flex', alignItems: 'start', justifyContent:'start', mt:'20px', gap: 2 }}>
                    {item.ico?.url && (
                      <Image
                        src={item.ico.url}
                      alt={item.ico.alt || ""}
                      width={26}
                      height={26}
                      unoptimized
                      />
                    )}
                    <Box>
                      <Typography
                        id="title-description"
                        variant="body1"
                        fontWeight={200}
                        lineHeight="1.5"
                        sx={{
                        fontSize: {
                        xs: "16px",
                        sm: "16px",
                        },
                        }}
                      >
                      <PrismicRichText
                        field={item.title} 
                        components={defaultComponents}
                      />                
                      </Typography>
                      <Typography
                      id="title-description"
                      variant="body1"
                      fontWeight={200}
                      lineHeight="1.5"
                      sx={{
                      fontSize: {
                      xs: "16px",
                      sm: "16px",
                      },
                      }}
                      >
                      <PrismicRichText
                      field={item.description} 
                      components={defaultComponents}
                      />                
                      </Typography>
                    </Box>
                    </Box>
                  ))}
                </Box>
                
              </Stack>
            </Box>

            {/* Imagen */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              order: imageIsRight ? 2 : 1
            }}>
              <Box
                id="imageSlice"
                sx={{
                  width: '100%',
                  maxWidth: '500px',
                  height: 'auto',
                  position: 'relative',
                  '& img': {
                    width: '100%',
                    height: 'auto',
                  }
                }}
              >
                { (primary as any)?.image?.url &&
                  <Image
                    src={(primary as any)?.image?.url || ""}
                    alt={(primary as any)?.image?.alt || ""}
                    width={500}
                    height={380}
                    priority
                    unoptimized
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                }
              </Box>
            </Box>
        
          </Box>
          
        </Container>
      </Box>
    </>
  );
};
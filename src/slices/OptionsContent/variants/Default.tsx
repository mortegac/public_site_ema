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
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";


import { Text } from "@/app/components/shared/text";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

import { OptionsContentProps } from "../types"

export const Default: FC<OptionsContentProps> = ({ slice }) => {
  const {primary} = slice;
  const primaryDefault = primary as any;
  
    return(
      <Box bgcolor="#ffffff" pt={2} pb={7}
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
          
          <Stack
            id="listOptions"
            my={3}
            direction={{ xs: "column", sm: "row" }}
            spacing="20px"
            alignItems="start"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            {primaryDefault?.options?.map((option: any, index: number) => (
              <Card 
                key={index}
                sx={{ 
                  // maxWidth: 345,
                  minHeight: '460px', 
                  padding:'22px',
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
                      textAlign: 'center'
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
                        borderRadius: '8px',
                        marginBottom: '22px',
                      }}
                      sizes="100px"
                    />
                  )}
                   <Box
                    sx={{
                     marginBottom: '22px',
                      textAlign: 'center'
                    }}
                  >
                    <Text textObject={option.title}/>  
                  </Box>
                    <Text textObject={option.texttopbanner} fontSize="16px"/>  
                  </Box>
                )}
  
              </Card>
            ))}
          </Stack>
        </Box>
          
         {/* <pre>{JSON.stringify(slice?.primary?.options, null, 2 )}</pre> */}
      </Container>
      </Box>
    )
  }
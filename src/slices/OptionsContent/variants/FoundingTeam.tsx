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

export const FoundingTeam: FC<OptionsContentProps> = ({ slice }) => {
  const {primary} = slice;
  const primaryDefault = primary as any;
  
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
          
          <Stack
            id="listOptions"
            // my={3}
            direction={{ xs: "column", sm: "row" }}
            spacing="20px"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            {primaryDefault?.options?.map((option: any, index: number) => (
              <Box 
                key={index}
                sx={{ 
                  maxWidth: 345, 
                  width: '100%',
                  position: 'relative',
                  padding: '56px 0 56px 0',
                  // boxShadow: 3,
                  // '&:hover': {
                  //   boxShadow: 6,
                  //   transform: 'translateY(-4px)',
                  //   transition: 'all 0.3s ease-in-out'
                  // }
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
                   <Text textObject={option.position}/>
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
                   
                {/* </CardContent> */}
              </Box>
            ))}
          </Stack>
        </Box>
          
         {/* <pre>{JSON.stringify(slice?.primary?.options, null, 2 )}</pre> */}
      </Container>
      </Box>
    )
  }
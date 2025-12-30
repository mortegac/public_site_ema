// import { FC } from "react";
// import { ContentWithImageProps } from "../types"

// export const Default: FC<ContentWithImageProps> = ({ slice }) => {
    
//     return(
//       <h1>default</h1>
//     )
//   }

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
import { Text } from "@/app/components/shared/text";



export const SmallImagesWithTitle: FC<ContentWithImageProps> = ({ slice }) => {
  const { primary } = slice;
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
           {/* <Box 
            id="boxText"
            sx={{ 
                textAlign: 'center',
                paddingBottom: '36px',
            }}>
              <Text textObject={slice?.primary?.title} /> 
                
              <Text textObject={(slice?.primary as any)?.description} /> 
              
            </Box> */}
               
            <Stack
            my={3}
            direction={{ xs: "column", sm: "column", xl:"column" }}
            spacing="20px"
            alignItems="center"
            justifyContent="center"
          >
            <Text textObject={slice?.primary?.title}/>        
            <Text textObject={slice?.primary?.description}/>        
          </Stack>
          
          
          
          {(primary as any)?.items?.map((item: any, index: number) => {
            const itemImageIsRight = item?.imageisright;
            
            return (
              <Box
                key={index}
                id="boxContainer"
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, 
                  gap: 3, 
                  mb: 4,
                  paddingTop:'56px', 
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
                      order: itemImageIsRight ? 1 : 2
                    }}>
                    <Stack
                      my={3}
                      direction={{ xs: "column", sm: "column", xl: "column" }}
                      alignItems="start"
                      justifyContent="start"
                    >
                      <Box 
                    id="boxText"
                    sx={{ 
                       paddingBottom: '22px',
                    }}>
                      <Text textObject={item?.title} /> 
                      
                    </Box>
                     
                      <Text textObject={item?.description} /> 
                      
                     
                      
                    </Stack>
                  </Box>

                  {/* Imagen */}
                  <Box id="card" sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    order: itemImageIsRight ? 2 : 1
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
                      { item?.image?.url &&
                        <Image
                          src={item?.image?.url || ""}
                          alt={item?.image?.alt || ""}
                          width={525}
                          height={500}
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
            );
          })}
          
          {/* <pre>{JSON.stringify(primary, null, 2 )}</pre> */}
        </Container>
      </Box>
    </>
  );
};
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
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";

import { Text } from "@/app/components/shared/text";

import { OptionsContentProps } from "../types"

export const TwoColumns: FC<OptionsContentProps> = ({ slice }) => {
  const { primary } = slice;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
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
       
        
        <Box
          id="listOptions"
          sx={{
            my: 3,
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: 'wrap',
            gap: '36px',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {primary?.options?.map((option: any, index: number) => {
            const isFirstTwo = index < 2;
            const cardBackground = isFirstTwo ? '#FFFFFF' : '#F8F8F8';
            
            return (
           <Card 
           key={index}
           sx={{ 
             width: { xs: '100%', md: 'calc(38% - 10px)' },
             maxWidth: { xs: '100%', md: 'none' },
             minHeight: '510px',
             position: 'relative',
             boxShadow: 3,
             backgroundColor: cardBackground,
             display: 'flex',
             flexDirection: 'column',
             transition: 'all 0.3s ease-in-out',
             borderRadius: '20px',
             padding: 0,
             overflow: 'hidden',
             '&:hover': {
               boxShadow: 6,
               transform: 'translateY(-4px)',
               backgroundColor: isFirstTwo ? '#f5f5f5' : '#e8e8e8',
               transition: 'all 0.3s ease-in-out'
             }
           }}
         >
            
             {/* Imagen de la card */}
             <CardMedia
               component="div"
               sx={{
                 height: 288,
                 padding: 0,
                 margin: 0,
                 position: 'relative',
                 overflow: 'hidden',
                 display: 'flex',
                 alignItems: 'flex-start',
                 justifyContent: 'center',
                 width: '100%',
                 ...(option.texttopbanner && { marginTop: '32px' })
               }}
             >
               {option.image?.url && (
                 <Image
                   src={option.image.url}
                   alt={option.image.alt || `Option ${index + 1}`}
                   width={503}
                   height={295}
                   style={{
                     objectFit: 'contain',
                     width: '100%',
                     height: 'auto',
                     display: 'block'
                   }}
                   unoptimized
                 />
               )}
               
               
             </CardMedia>
             
             <Box
               sx={{
                 marginTop: 'auto',
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
                 justifyContent: 'center',
                 width: '100%',
                 
                 paddingX: 6,
                 paddingY: 2,
                 gap: 1
               }}
             >
               <Text textObject={option.title} /> 

               <Text textObject={option.subtitle} /> 
             </Box>
             
             <Box
               sx={{
                 marginTop: 'auto',
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
                 justifyContent: 'center',
                 width: '100%',
                 padding: 2,
                 gap: 1
               }}
             >
               
               {option.buttontext && (
                 <Button
                   variant="contained"
                   size="large"
                   sx={{
                     paddingX: 4,
                     paddingY: 1.5,
                     borderRadius: '24px',
                     background: isFirstTwo ? "#E81A68" : "transparent",
                     color: isFirstTwo ? "#FFFFFF" : "#E81A68",
                     fontSize: '18px',
                    //  color:"#FFFFFF",
                     border: isFirstTwo ? "1px solid #E81A68" : "1px solid #E81A68",
                     width: '90%',
                     '&:hover': {
                       background: isFirstTwo ? "#C2185B" : "#6A6A6A",
                       border: isFirstTwo ? "1px solid #C2185B" : "1px solid #6A6A6A",
                     }
                   }}
                   href={(option?.buttonlink as any)?.url || "#"}
                   // onClick={() => trackEvent('agendar_otra_visita', 'AGENDA_EMA', 'ir a la pagina agenda') }
                 >
                   {option.buttontext}
                 </Button>
               )}
             </Box>

            
           </Card>
            );
          })}
        </Box>
      </Box>
          {/* <pre>{JSON.stringify(slice?.primary?.options, null, 2 )}</pre> */}
        
    </Container>
    </Box>
  )
};
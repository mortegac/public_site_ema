// "use client";
// import { FC, useEffect, useState } from "react";
// import Image from "next/image";
// import { PrismicRichText } from "@prismicio/react";
// import { defaultComponents } from "@/app/components/PrismicRichText";
// import {
//   Box,
//   Stack,
//   Typography,
//   Container,
//   Grid,
//   Button,
// } from "@mui/material";

// import { ContentWithImageProps } from "../types"
// import { Text } from "@/app/components/shared/text";



// export const HorizontalImage: FC<ContentWithImageProps> = ({ slice }) => {
//   const { primary } = slice;
//   const imageIsRight = (primary as any)?.imageisright;
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }
  
//   return(
//     <>
//       <Box bgcolor="#ffffff" pt={7} pb={7}
//         data-slice-type={slice.slice_type}
//         data-slice-variation={slice.variation}
//         sx={{
//           display: 'flex', 
//           flexDirection: 'column', 
          
//         }}
//       >
//         <Container
//           sx={{
//             maxWidth: "1200px !important",
//             position: "relative",
//           }}
//         >
//           <Box
//           id="boxContainer"
//           sx={{ 
//             display: 'grid', 
//             gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, 
//             gap: 3, 
//             mb: 4 
//           }}>
//             {/* Contenido de texto */}
//             <Box 
//               id="boxText"
//               sx={{ 
//                 textAlign: 'left', 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'start', 
//                 justifyContent: 'start',
//                 order: imageIsRight ? 1 : 2
//               }}>
//               <Stack
//                 my={3}
//                 direction={{ xs: "column", sm: "column", xl: "column" }}
//                 alignItems="start"
//                 justifyContent="start"
//               >
               
//                 <Text textObject={slice?.primary?.title} /> 
                
              
//                 <Text textObject={(slice?.primary as any)?.description} /> 
                
//                 <Box 
//                   id="boxListFeatures" 
//                   sx={{

//                   }}
//                 >
//                   {(primary as any)?.list?.map((item: any, index: number) => (
//                     <Box key={`list-item-${index}`} sx={{ display: 'flex', alignItems: 'start', justifyContent:'start', mt:'20px', gap: 2 }}>
//                     {item.ico?.url && (
//                       <Box
//                         sx={{
//                           transition: 'transform 0.3s ease-in-out',
//                           '&:hover': {
//                             transform: 'scale(1.1)',
//                           },
//                           cursor: 'pointer',
//                         }}
//                       >
//                         <Image
//                           src={item.ico.url}
//                           alt={item.ico.alt || ""}
//                           width={26}
//                           height={26}
//                           unoptimized
//                         />
//                       </Box>
//                     )}
//                     <Box>
                     
//                       <Text textObject={item?.title} /> 
                     
//                       <Text textObject={item?.description} /> 
//                     </Box>
//                     </Box>
//                   ))}
//                 </Box>
                
//               </Stack>
//             </Box>

//             {/* Imagen */}
//             <Box sx={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               alignItems: 'center',
//               order: imageIsRight ? 2 : 1
//             }}>
//               <Box
//                 id="imageSlice"
//                 sx={{
//                   width: '100%',
//                   maxWidth: '500px',
//                   height: 'auto',
//                   position: 'relative',
//                   '& img': {
//                     width: '100%',
//                     height: 'auto',
//                   }
//                 }}
//               >
//                 { (primary as any)?.image?.url &&
//                   <Image
//                     src={(primary as any)?.image?.url || ""}
//                     alt={(primary as any)?.image?.alt || ""}
//                     width={500}
//                     height={380}
//                     priority
//                     unoptimized
//                     style={{
//                       maxWidth: '100%',
//                       height: 'auto',
//                     }}
//                   />
//                 }
//               </Box>
//             </Box>
        
//           </Box>
          
//         </Container>
//       </Box>
//     </>
//   );
// };

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

import { ContentWithImageProps } from "../types"

export const HorizontalImage: FC<ContentWithImageProps> = ({ slice }) => {
  const { primary } = slice;
  const primaryDefault = primary as any;
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
        <Box 
          id="boxText"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            flex: { xs: '1 1 100%', md: '1 1 50%' }
          }}
        >
          <Text textObject={primaryDefault?.title} /> 
          <Text textObject={primaryDefault?.description} /> 
        
        </Box>
        
      <Box 
        id="boxColumn"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 4 },
          width: '100%'
        }}
      >
           <Box 
          id="boxOPtions" 
          sx={{ 
            textAlign: 'left', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flex: { xs: '1 1 100%', md: '1 1 50%' }
          }}
        >
        
          
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
         
         { (primary as any)?.image?.url &&
                  <Image
                    src={(primary as any)?.image?.url || ""}
                    alt={(primary as any)?.image?.alt || ""}
                    width={1200}
                    height={406}
                    priority
                    unoptimized
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '20px',
                    }}
                  />
                }
         
          </Box>
          
        </Box>
        
        
      
     
      </Box>
      
      <Text textObject={primaryDefault?.text01} /> 
      <Text textObject={primaryDefault?.text02} /> 
          {/* <pre>{JSON.stringify(slice?.primary, null, 2 )}</pre> */}
        
    </Container>
    </Box>
  )
};
"use client";
import { FC } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

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

import { StepWizardProps } from "../types"
import { JsonPath } from "aws-cdk-lib/aws-stepfunctions";


const currentStep = 1;

export const Default: FC<StepWizardProps> = ({ slice }) => {
  const {primary} = slice;
  const primaryDefault = primary as any;
  
    // return(
    //   <Box bgcolor="#ffffff" pt={2} pb={7}
    //   data-slice-type={slice.slice_type}
    //     data-slice-variation={slice.variation}
    // >
    //   <Container
    //     sx={{
    //       maxWidth: "1400px !important",
    //       position: "relative",
    //     }}
    //   >
    //     <Box id="boxOPtions" sx={{ 
    //       textAlign: 'left', 
    //       display: 'flex', 
    //       flexDirection: 'column', 
    //       alignItems: 'center', 
    //       justifyContent: 'center', 
    //       width: '100%' 
    //     }}>
    //       <Stack
    //         my={3}
    //         direction={{ xs: "column", sm: "column", xl:"column" }}
    //         spacing="20px"
    //         alignItems="center"
    //         justifyContent="center"
    //       >
    //         <Text textObject={primaryDefault?.title}/>
    //         <Text textObject={primaryDefault?.description}/>        
    //       </Stack>
          
    //       <Stack
    //         id="listOptions"
    //         my={3}
    //         direction={{ xs: "column", sm: "row" }}
    //         spacing="20px"
    //         alignItems="start"
    //         justifyContent="center"
    //         sx={{ width: '100%' }}
    //       >
    //         {primaryDefault?.items?.map((option: any, index: number) => (
    //           <Card 
    //             key={index}
    //             sx={{ 
    //               // maxWidth: 345,
    //               minHeight: '460px', 
    //               padding:'22px',
    //               width: '100%',
    //               position: 'relative',
    //               boxShadow: 3,
    //               '&:hover': {
    //                 boxShadow: 6,
    //                 transform: 'translateY(-4px)',
    //                 transition: 'all 0.3s ease-in-out'
    //               }
    //             }}
    //           >
    //             {/* Banner superior gris si existe texttopbanner */}
    //             {option.texttopbanner && option.texttopbanner.length > 0 && (
    //               <Box
    //                 sx={{
    //                   textAlign: 'center'
    //                 }}
    //               >
    //                  {option.image?.url && (
    //                 <Image
    //                   src={option.image.url}
    //                   alt={option.image.alt || `Option ${index + 1}`}
    //                   width={100}
    //                   height={100}
    //                   style={{
    //                     objectFit: 'contain',
    //                     borderRadius: '8px',
    //                     marginBottom: '22px',
    //                   }}
    //                   unoptimized
    //                 />
    //               )}
    //                <Box
    //                 sx={{
    //                  marginBottom: '22px',
    //                   textAlign: 'center'
    //                 }}
    //               >
    //                 <Text textObject={option.title}/>  
    //               </Box>
    //                 <Text textObject={option.texttopbanner} fontSize="16px"/>  
    //               </Box>
    //             )}
  
    //           </Card>
    //         ))}
    //       </Stack>
    //     </Box>
          
    //      {/* <pre>{JSON.stringify(slice?.primary?.options, null, 2 )}</pre> */}
    //   </Container>
    //   </Box>
    return (
      <Box bgcolor="#ffffff" pt={4} pb={2}>
        <Container
          sx={{
            maxWidth: "1200px !important",
            position: "relative",
            paddingBottom:'56px',
          }}
        >
        <Stepper 
          activeStep={currentStep}
          sx={{
            '& .MuiStepLabel-root': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiStepLabel-labelContainer': {
                marginTop: 1,
                textAlign: 'center',
                '& .MuiStepLabel-label': {
                  fontSize: '16px',
                  marginTop: '4px'
                }
              },
              '& .MuiStepLabel-iconContainer': {
                padding: 0,
                '& .MuiStepIcon-root': {
                  width: 34,
                  height: 34,
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  // '&:hover': {
                  //   color: Number(currentStep) === 3 ? 'inherit' : 'primary.main'
                  // }
                },
                '& .MuiStepIcon-completed': {
                  color: '#b9b9b9 !important'
                }
              }
            }
          }}
        >
          {primary?.steps?.map((label:any, index:number) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
              onClick?: () => void;
            } = {
              // onClick: () => handleStepClick(index, label)
            };
            return (
              <Step key={label?.title?.text} {...stepProps}>
                <StepLabel 
                  {...labelProps}
                  className={label === "Resumen cotización" ? "no-hover" : ""}
                  sx={{
                    '& .MuiStepIcon-root': {
                      color: Number(currentStep) === Number(label?.number) ? '#E81A68' : '#b9b9b9'
                    },
                    '&.no-hover .MuiStepIcon-root:hover': {
                      color: 'inherit'
                    }
                  }}
                >
                  {/* {label?.title?.text} */}
                  <Text textObject={label?.title} fontSize="16px"/>  
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        </Container>
        {/* <pre>{JSON.stringify(slice, null, 2 )}</pre> */}
      </Box>
    );
  }
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

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setStep, selectWizard } from "@/store/Wizard/wizardSlice";


import { Text } from "@/app/components/shared/text";

import { StepWizardProps } from "../types"
import { Step01 } from "../components/Step01"
import { Step02 } from "../components/Step02"
import { Step03 } from "../components/Step03"
import { Step04 } from "../components/Step04"
import { Step05 } from "../components/Step05"


const typeOfForm: any = {
  ["0"]: Step01,
  ["1"]: Step01,
  ["2"]: Step02,
  ["3"]: Step03, 
  ["4"]: Step04,
  ["5"]: Step05,
};

// const currentStep = 1;

export const Default: FC<StepWizardProps> = ({ slice }) => {
  const {primary} = slice;
  const primaryDefault = primary as any;
  
  const dispatch = useAppDispatch();
  const handleStepClick = (stepIndex: number, stepName: string) => {
    
    dispatch(setStep(stepIndex));
  };
  
  const { 
    currentStep,
  } = useAppSelector(selectWizard);
  
  const FormStep = typeOfForm[String(currentStep)] || typeOfForm[0];
  
  
    return (
      <Box bgcolor="#ffffff" pt={4} pb={2}>
        <Container
          sx={{
            maxWidth: "1200px !important",
            position: "relative",
            paddingBottom:'56px',
          }}
        >
          <span>currentStep={currentStep}</span>
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
            } = { onClick: () => handleStepClick(label?.stepcomponent, label) };
            return (
              <Step key={label?.title?.text} {...stepProps}>
                  
                  <pre>{JSON.stringify(label?.stepcomponent, null, 2 )}</pre>
                  
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
        
        <Container
        sx={{
          maxWidth: "1400px !important",
          position: "relative",
          height: { xs: '100%', md: 'auto' },
          // minHeight: { xs: 'calc(100vh - 140px)', md: 'auto' }, // 140px para padding top/bottom
        }}
      >
        <FormStep 
          installationincluded={slice?.primary?.installationincluded || false}
              // onChangeSetStore={onChangeSetStore}
            />
      </Container>
      
      </Box>
    );
  }
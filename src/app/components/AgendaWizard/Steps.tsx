'use client';

import * as React from 'react';
// import { Box, Container} from '@mui/material/Box';
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCalendarVisits, setStep } from "@/store/CalendarVisits/slice";
import { useAnalytics } from '@/hooks/useAnalytics';

const steps = [
  "Selección de la fecha", 
  "Información de contacto", 
  "Paga tu reserva"
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const dispatch = useAppDispatch();
  const { 
    currentStep
  } = useAppSelector(selectCalendarVisits);
  const { trackEvent } = useAnalytics();
  
  
  // const isStepOptional = (step: number) => {
  //   return step === 1;
  // };


  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  // Función para manejar el click en un paso
  const handleStepClick = (stepIndex: number, stepName: string) => {
    
    
    trackEvent('cambio_de_paso_agenda', 'navigation', `${stepName}_step_${stepIndex + 1}`);
    Number(stepIndex) !== 2 && dispatch(setStep(stepIndex));
    // console.log("--currentStep--", currentStep)
  };

  return (
    <Box bgcolor="#ffffff" pt={4} pb={2}>
      <Container
        sx={{
          maxWidth: "1400px !important",
          position: "relative",
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
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
            onClick?: () => void;
          } = { onClick: () => handleStepClick(index, label) };
          return (
            <Step key={label} {...stepProps}>
              <StepLabel 
                {...labelProps}
                className={label === "Resumen cotización" ? "no-hover" : ""}
                sx={{
                  '& .MuiStepIcon-root': {
                    color: Number(currentStep) === Number(index+1) ? '#E81A68' : '#b9b9b9'
                  },
                  '&.no-hover .MuiStepIcon-root:hover': {
                    color: 'inherit'
                  }
                }}
              >
                
                <Typography
            align="left"
            sx={{
              fontSize: "14px",
              color: Number(currentStep) === Number(index) ? '#E81A68' : '#b9b9b9'
            }}
            component="span"
            >
              {label}
            </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      </Container>
    </Box>
  );
}
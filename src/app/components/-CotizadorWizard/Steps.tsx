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
import { setStep, selectClientForms } from "@/store/ClientForms/slice";
import { selectEstimate } from "@/store/Estimate/slice";

const steps = [
  "Información de contacto", 
  "Tipo de cargador", 
  "Información  técnica", 
  "Resumen cotización"
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const dispatch = useAppDispatch();
  const { 
    estimate
  } = useAppSelector(selectEstimate);
  const { 
    currentStep,
    currentForm,
  } = useAppSelector(selectClientForms);
  
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    // <Box sx={{ width: '100%' }}>
    <Box bgcolor="#ffffff" pt={7} pb={7}>
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
          } = {
            // onClick:() => dispatch(setStep(index))
            onClick: label === "Resumen cotización" && estimate?.estimateId === "" ? undefined : () => dispatch(setStep(index))
          };
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
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      </Container>
    </Box>
  );
}
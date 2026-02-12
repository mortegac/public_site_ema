"use client";
import { FC } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import type { StepIconProps } from '@mui/material/StepIcon';

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
import { setStep, selectWizard } from "@/store/Wizard/slice";
import { addProduct, selectShoppingCart } from "@/store/ShoppingCart/slice";


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

const STEP_COLOR_ACTIVE = '#E81A68';
const STEP_COLOR_INACTIVE = '#b9b9b9';

interface StepIconNumberProps extends StepIconProps {
  isActiveStep?: boolean;
}

const StepIconNumber: FC<StepIconNumberProps> = ({ icon, isActiveStep }) => {
  const color = isActiveStep ? STEP_COLOR_ACTIVE : STEP_COLOR_INACTIVE;
  return (
    <Box
      component="span"
      sx={{
        width: 34,
        height: 34,
        borderRadius: '50%',
        border: '2px solid',
        borderColor: color,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      {icon}
    </Box>
  );
};

export const Default: FC<StepWizardProps> = ({ slice }) => {
  const {primary} = slice;
  const primaryDefault = primary as any;
  
  const dispatch = useAppDispatch();
  const handleStepClick = (stepIndex: number, stepName: string) => {
    
    dispatch(setStep(stepIndex));
  };
  
  const { currentStep, } = useAppSelector(selectWizard);
  const { shoppingCart, } = useAppSelector(selectShoppingCart);
  
  const FormStep = typeOfForm[String(currentStep)] || typeOfForm[0];
  
  
    return (
      <Box bgcolor="#ffffff" pt={{ xs: 0, md: 4 }} pb={2}>
        <Container
          sx={{
            maxWidth: "1200px !important",
            position: "relative",
            paddingBottom:'56px',
          }}
        >
          {/* <span>currentStep={currentStep}</span> */}
        <Stepper 
          activeStep={currentStep - 1}
          sx={{
            '& .MuiStepLabel-root': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiStepLabel-labelContainer': {
                marginTop: 1,
                textAlign: 'center',
                height: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                '& .MuiStepLabel-label': {
                  fontSize: '16px',
                  marginTop: '4px'
                }
              },
              '& .MuiStepLabel-iconContainer': {
                padding: 0,
              }
            }
          }}
        >
          {primary?.steps?.map((label: any, index: number) => {
            const stepNumber = index + 1;
            const stepProps: { completed?: boolean; icon?: number } = { icon: stepNumber };
            const isActiveStep = Number(currentStep) === Number(label?.stepcomponent);
            const labelProps: {
              optional?: React.ReactNode;
              onClick?: () => void;
              StepIconComponent?: React.ComponentType<StepIconProps>;
            } = {
              onClick: () => handleStepClick(label?.stepcomponent, label),
              StepIconComponent: (props: StepIconProps) => (
                <StepIconNumber {...props} isActiveStep={isActiveStep} />
              ),
            };

            return (
              <Step key={label?.title?.text} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  className={label === "Resumen cotización" ? "no-hover" : ""}
                  sx={{
                    minHeight: '32px',
                    '& .MuiStepLabel-labelContainer': {
                      visibility: isActiveStep ? 'visible' : 'hidden',
                    }
                  }}
                >
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
      
      {/* <pre>{JSON.stringify(shoppingCart, null, 2 )}</pre> */}
      </Box>
    );
  }
'use client';

import React from 'react';

import {
    Box,
    Stack,
    Typography,
    Container,
    Grid,
    Button,
  } from "@mui/material";
  
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
// import { incrementByAmount } from '@/store/features/counter/counterSlice';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  marginTop: theme.spacing(5),
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(20, 0),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    // width: '69%',
    height: '3px',
    top: 0,
    bottom: 0,
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
}));

const StepContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '15%',
      right: '30%',
      height: '2px',
      backgroundColor: theme.palette.grey[200],
      transform: 'translateY(-50%)',
      zIndex: 1
    }
  },
  justifyContent: 'center',
  padding: theme.spacing(0, 5),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 20),
  },
  marginBottom: theme.spacing(6),
  position: 'relative',
}));

const StepItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginTop: theme.spacing(5),
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    marginTop: 0,
    textAlign: 'center',
  },
  zIndex: 10,
}));

const StepButton = styled(Button)<{ active?: boolean; isEdition?: boolean }>(
  ({ theme, active, isEdition }) => ({
    width: 40,
    height: 40,
    borderRadius: '50%',
    minWidth: 40,
    position: 'relative',
    zIndex: 2,
    ...(active
      ? isEdition
        ? {
            backgroundColor: theme.palette.warning.light,
            borderColor: theme.palette.grey[200],
            color: theme.palette.grey[600],
          }
        : {
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          }
      : {
          backgroundColor: theme.palette.grey[100],
          color: theme.palette.grey[600],
        }),
  })
);

const StepTitle = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(3),
  fontSize: '1rem',
  fontWeight: 500,
  [theme.breakpoints.up('lg')]: {
    // width: 128,
    marginTop: theme.spacing(10),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const StepSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  maxWidth: '50px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'block'
}));

const CotizadorWizard = () => {
  const dispatch = useDispatch();
  const vehicle = useSelector((state: any) => state.vehicle);
  const hasEdition = useSelector((state: any) => state.hasEdition);

  const steps = [
    { number: 1, title: 'Información de contacto', subtitle: '', step: 1 },
    { number: 2, title: 'Paso 2', subtitle: 'Tipo de cargador', step: 3 },
    { number: 3, title: 'Paso 3', subtitle: 'Información  técnica', step: 5 },
    { number: 4, title: 'Paso 4', subtitle: 'Resumen cotización', step: 7 },
    // { number: 5, title: 'Paso 5', subtitle: 'Test con cargadores eléctricos', step: 9 },
  ];

  return (
    <Box bgcolor="#ffffff" pt={7} pb={7}>
      <Container
        sx={{
          maxWidth: "1400px !important",
          position: "relative",
        }}
      >
        <StyledBox sx={{ '&::before': { bgcolor: hasEdition ? 'warning.light' : 'grey.100' } }}>
        <StepContainer>
            {steps.map((step) => (
            <StepItem key={step.number}>
                <StepButton
                //   onClick={() => dispatch(incrementByAmount(step.step))}
                //   active={vehicle.currentStep === step.step || vehicle.currentStep === step.step + 1}
                isEdition={hasEdition}
                >
                {step.number}
                </StepButton>
                <Box>
                <StepTitle>{step.title}</StepTitle>
                <StepSubtitle>{step.subtitle}</StepSubtitle>
                </Box>
            </StepItem>
            ))}
        </StepContainer>
        
        </StyledBox>
      </Container>
    </Box>
  );
};

export default CotizadorWizard;
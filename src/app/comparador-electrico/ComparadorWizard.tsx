'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '@/store/hooks';
import { selectComparador } from '@/store/Comparador/slice';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';
import Footer from '@/app/components/shared/footer';
import StepIndicator from './components/StepIndicator';
import Step1VehicleForm from './components/Step1VehicleForm';
import Step2Profile from './components/Step2Profile';
import Step3Results from './components/Step3Results';
import Step4CTAs from './components/Step4CTAs';

export default function ComparadorWizard() {
  const { step } = useAppSelector(selectComparador);
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const MU = '#64748B';

  return (
    <>
      <HpHeaderNew />
      <Box sx={{ background: '#F5F7FA', minHeight: '100vh', py: 4, pb: 10 }}>
        <Container maxWidth={false} sx={{ maxWidth: '720px !important', px: { xs: 2.5, sm: 3 } }}>

          {/* Page hero */}
          <Box sx={{ textAlign: 'center', pb: 4.5 }}>
            <Typography
              component="h1"
              sx={{ fontSize: { xs: 26, sm: 30 }, fontWeight: 800, color: '#2A3547', letterSpacing: '-0.6px', lineHeight: 1.15, mb: 1.25 }}
            >
              ¿Te conviene pasarte a{' '}
              <Box component="em" sx={{ fontStyle: 'normal', color: primary }}>
                eléctrico
              </Box>
              ?
            </Typography>
            <Typography fontSize={16} color={MU} lineHeight={1.6} maxWidth={440} mx="auto">
              Compara tu auto actual con alternativas eléctricas y descubre cuánto podrías ahorrar
            </Typography>
          </Box>

          {/* Step indicator */}
          <StepIndicator currentStep={step} />

          {/* Step content */}
          {step === 0 && <Step1VehicleForm />}
          {step === 1 && <Step2Profile />}
          {step === 2 && <Step3Results />}
          {step === 3 && <Step4CTAs />}
        </Container>
      </Box>
      <Footer />
    </>
  );
}

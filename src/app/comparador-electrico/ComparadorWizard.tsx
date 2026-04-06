'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { selectComparador } from '@/store/Comparador/slice';
import StepIndicator from './components/StepIndicator';
import Step1VehicleForm from './components/Step1VehicleForm';
import Step2Profile from './components/Step2Profile';
import Step3Results from './components/Step3Results';
import Step4CTAs from './components/Step4CTAs';

const PR = '#0B1F3A';
const AC = '#00C47C';
const MU = '#64748B';

export default function ComparadorWizard() {
  const { step } = useAppSelector(selectComparador);

  return (
    <Box sx={{ background: '#F5F7FA', minHeight: '100vh', py: 4, pb: 10 }}>
      <Container maxWidth={false} sx={{ maxWidth: '720px !important', px: { xs: 2.5, sm: 3 } }}>

        {/* Header */}
        <Box sx={{ textAlign: 'center', pb: 4.5 }}>
          <Box
            component="a"
            href="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              mb: 2.5,
              textDecoration: 'none',
            }}
          >
            <Box sx={{ width: 34, height: 34, background: PR, borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>
              ⚡
            </Box>
            <Typography fontSize={17} fontWeight={700} color={PR}>
              energica.city
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{ fontSize: { xs: 26, sm: 30 }, fontWeight: 800, color: PR, letterSpacing: '-0.6px', lineHeight: 1.15, mb: 1.25 }}
          >
            ¿Te conviene<br />pasarte a{' '}
            <Box component="em" sx={{ fontStyle: 'normal', color: AC }}>
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
  );
}

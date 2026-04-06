'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const STEPS = [
  { label: 'Tu auto' },
  { label: 'Tu uso' },
  { label: 'Comparación' },
  { label: 'Siguiente paso' },
];

const BD = '#E2E8F0';
const MU = '#64748B';

interface StepIndicatorProps {
  currentStep: number; // 0-based
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
      {STEPS.map((step, idx) => {
        const isDone = idx < currentStep;
        const isActive = idx === currentStep;

        return (
          <React.Fragment key={idx}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: isActive || isDone ? primary : BD,
                  color: isActive || isDone ? '#fff' : MU,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  transition: 'all 0.3s',
                  boxShadow: isActive ? `0 0 0 4px ${primaryLight}` : 'none',
                }}
              >
                {isDone ? '✓' : idx + 1}
              </Box>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: isActive || isDone ? primary : MU,
                  whiteSpace: 'nowrap',
                }}
              >
                {step.label}
              </Typography>
            </Box>

            {idx < STEPS.length - 1 && (
              <Box
                sx={{
                  width: 56,
                  height: 2,
                  background: isDone ? primary : BD,
                  mb: '18px',
                  transition: 'background 0.3s',
                  mx: 0.5,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
}

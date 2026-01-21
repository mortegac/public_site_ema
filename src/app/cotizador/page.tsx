"use client";
import {useEffect} from "react"
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";

import dynamic from 'next/dynamic';
import PageContainer from '@/app/components/container/PageContainer';
import { isProduction } from '@/utils/amplify-config';
import { useAnalytics } from '@/hooks/useAnalytics';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';
import HeaderENV from '@/app/components/shared/header/HeaderENV';
import ScrollToTop from '@/app/components/shared/scroll-to-top';

// Dynamic imports para componentes pesados
const QuoterSteps = dynamic(() => import('@/app/components/shared/QuoterSteps'), {
  loading: () => <Box sx={{ minHeight: '400px' }} />,
  ssr: true,
});
const Steps = dynamic(() => import('@/app/components/CotizadorWizard/Steps'), {
  loading: () => <Box sx={{ minHeight: '200px' }} />,
  ssr: true,
});
const C2a = dynamic(() => import('@/app/components/shared/c2a'), {
  ssr: true,
});

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increment, setStep, decrement, selectClientForms, setDataForm } from "@/store/ClientForms/slice";




const QuoterPage = () => {
  const { 
    currentStep,
    currentForm,
  } = useAppSelector(selectClientForms);
  const dispatch = useAppDispatch();

  
  useEffect(()=>{
    dispatch(setStep(0))
  },[])
  
  return (
    <PageContainer title="Cotiza tú Instalación" description="Ingresa tus datos y en pocos pasos calcularemos un valor estimado de tu instalación">
      {!isProduction() && <HeaderENV />}
      <HpHeaderNew /> 
      { currentStep !== 3 &&
        <>
        <Box bgcolor="#ffffff" pt={4} pb={0}>
          <Container
            sx={{
              maxWidth: "1400px !important",
              position: "relative",
            }}
          >
            <Typography
                variant="h2"
                fontWeight={700}
                lineHeight="1.2"
                sx={{
                  fontSize: {
                    xs: "32px",
                    sm: "40px",
                    textAlign:"center",
                  },
                }}
              >
                Simula el costo de tu instalación
              </Typography>
          </Container>
        </Box>
        
        <Steps/>
        
      </>
      }
      
      <QuoterSteps/>
      
      <C2a/>
      
      {/* <Footer /> */}
      <ScrollToTop />
    </PageContainer>
  );
};

export default QuoterPage;

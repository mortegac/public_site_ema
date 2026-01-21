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
import Banner from '@/app/components/shared/banner/Banner';
import HeaderENV from '@/app/components/shared/header/HeaderENV';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';
import ScrollToTop from '@/app/components/shared/scroll-to-top';

// Dynamic imports para componentes pesados
const CalendarSteps = dynamic(() => import('@/app/components/shared/CalendarSteps'), {
  loading: () => <Box sx={{ minHeight: '400px' }} />,
  ssr: true,
});
const Steps = dynamic(() => import('@/app/components/AgendaWizard/Steps'), {
  loading: () => <Box sx={{ minHeight: '200px' }} />,
  ssr: true,
});
const C2a = dynamic(() => import('@/app/components/shared/c2a'), {
  ssr: true,
});
import { isProduction } from '@/utils/amplify-config';
import { useAnalytics } from '@/hooks/useAnalytics';

import { useAppSelector } from '@/store/hooks';
import { selectCalendarVisits } from "@/store/CalendarVisits/slice";

const HomePage = () => {
  const { trackEvent } = useAnalytics();
  const { 
    currentStep
  } = useAppSelector(selectCalendarVisits);
  
  // Track page load
useEffect(() => {
    trackEvent('page_view', 'AGENDA_EMA', 'agenda_page');
  }, [trackEvent]);


  return (
    <PageContainer title="Agenda" description="Agenda tú Visita técnica">
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
                Agenda aquí tu visita.
              </Typography>
          </Container>
        </Box>
        
        <Steps/>
        
      </>
      }
      <CalendarSteps/>
      
      <C2a/>
      
      {/* <Footer /> */}
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;

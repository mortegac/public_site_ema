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


import PageContainer from '@/app/components/container/PageContainer';
import Banner from '@/app/components/shared/banner/Banner';
import HeaderENV from '@/app/components/shared/header/HeaderENV';
import HpHeader from '@/app/components/shared/header/HpHeader';
import CalendarSteps from '@/app/components/shared/CalendarSteps';
import Steps from '@/app/components/AgendaWizard/Steps';
import C2a from '@/app/components/shared/c2a';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';
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
      <HpHeader /> 
     
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

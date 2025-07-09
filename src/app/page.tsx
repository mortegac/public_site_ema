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

const HomePage = () => {
  const { trackEvent } = useAnalytics();

  // Track page load
useEffect(() => {
    trackEvent('page_view', 'navigation', 'agenda_page');
  }, [trackEvent]);

  const handleStepClick = (step: string) => {
    trackEvent('step_click', 'navigation', step);
  };

  const handleCalendarInteraction = (action: string) => {
    trackEvent('calendar_interaction', 'user_action', action);
  };

  return (
    <PageContainer title="Agenda" description="Agenda tú Visita técnica">
      {/* Mostrar HeaderENV solo si NO estamos en producción */}
      {!isProduction() && <HeaderENV />}
      <HpHeader /> 
     
      
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
      <CalendarSteps/>
      
      <C2a/>
      
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;

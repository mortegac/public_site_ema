"use client";
import { useEffect } from 'react';
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
import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
import HpHeader from '@/app/components/shared/header/HpHeader';
import CalendarSteps from '@/app/components/shared/CalendarSteps';
import Steps from '@/app/components/AgendaWizard/Steps';
import C2a from '@/app/components/shared/c2a';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';
import { usePageLoadEvent } from '@/hooks/usePageLoadEvent';
import { useClientIP } from '@/hooks/useClientIP';

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCalendarVisits, setStep } from "@/store/CalendarVisits/slice";

const HomePage = () => {
  // Obtener la IP del cliente
  const ipAddress = useClientIP();

const { 
  currentStep
} = useAppSelector(selectCalendarVisits);

  // Hook personalizado para el evento de carga
  usePageLoadEvent({
    eventName: 'carga_agenda',
    ipAddress
  });

  return (
    <PageContainer title="Agenda" description="Agenda tú Visita técnica">
      <HpHeader /> 
     
     {/* <pre>currentStep = {JSON.stringify(currentStep)}</pre> */}
      { currentStep !== 3 &&
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
      }
      <Steps/>
      <CalendarSteps/>
      
      <C2a/>
      
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;

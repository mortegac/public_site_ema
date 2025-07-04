"use client";
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
// import Calendar from "@/app/components/calendar";
import CalendarSteps from '@/app/components/shared/CalendarSteps';
import Steps from '@/app/components/AgendaWizard/Steps';
import C2a from '@/app/components/shared/c2a';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';

const HomePage = () => {
  return (
    <PageContainer title="Agenda" description="Agenda tú Visita técnica">
      {/* <HeaderAlert /> */}
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
      {/* <Calendar/> */}
      
      
      <C2a/>
      
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;

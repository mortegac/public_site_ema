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
      <HeaderAlert />
      <HpHeader /> 
     
     
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          <Box sx={{ textAlign: 'left', marginTop: '48px' }}>
            <Typography
              variant="h2"
              fontWeight={700}
              lineHeight="1.2"
              sx={{
                fontSize: {
                  xs: "32px",
                  sm: "40px",
                },
              }}
            >
              Agenda tú aquí visita técnica
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Steps/>
      <CalendarSteps/>
      {/* <Calendar/> */}
      
      
      <C2a/>
      {/* <Banner 
        titleOne="Agenda tú " 
        titleTwo="Visita técnica" 
        description="Agenda tu visita con uno de nuestros instaladores de cargadores para vehículos eléctricos certificados."
        
        buttonText="Simula aquí, el costo de la instalación" 
        buttonURI="/cotizador" 
        
        buttonTextTwo="" 
        buttonURITwo="/" 
        
        imageSrc="/images/headers/agenda-tu-visita.png" 
        /> */}
      {/*
      <Notice />
      <Features />
      <Pricing /> */}
     
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;

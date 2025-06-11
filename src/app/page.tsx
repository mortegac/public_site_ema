// import PageContainer from '@/app/components/container/PageContainer';
// import Banner from '@/app/components/shared/banner/Banner';
// import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
// import HpHeader from '@/app/components/shared/header/HpHeader';
// import Features from '@/app/components/shared/features/Features';
// import Notice from '@/app/components/shared/notice/Notice';
// import Pricing from '@/app/components/shared/pricing';

// import Footer from '@/app/components/shared/footer';
// import ScrollToTop from '@/app/components/shared/scroll-to-top';
// const HomePage = async () => {

//   return (
//     <PageContainer title="Instalación de Cargadores para vehículos eléctricos" description="Instalación de Cargadores para vehículos eléctricos">
//       <HeaderAlert />
//       <HpHeader />
//       <Banner
//         titleOne="Instalación de "
//         titleTwo="Cargadores para vehículos eléctricos"
//         description="Valorizamos tus proyectos de instalación de manera ágil e instalamos el cargador directamente en tu hogar, u oficina, sea casa o edificio."

//         buttonText="Agenda tu visita"
//         buttonURI="/agenda"

//         buttonTextTwo="Simula el costo de la instalación"
//         buttonURITwo="/cotizador"

//         imageSrc="/images/headers/cargador-electrico.png"
//       />

//       <Notice />

//       <Features />

//       <Pricing />

//       <Footer />

//       <ScrollToTop />

//     </PageContainer>
//   );
// };

// export default HomePage;



import {
  Box,
  Typography,
} from "@mui/material";

import PageContainer from '@/app/components/container/PageContainer';
import HpHeader from '@/app/components/shared/header/HpHeader';
import CalendarSteps from '@/app/components/shared/CalendarSteps';
import Steps from '@/app/components/AgendaWizard/Steps';
import C2a from '@/app/components/shared/c2a';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';

const HomePage = () => {
  return (
    <PageContainer title="Agenda" description="Agenda tú Visita técnica">
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
      <C2a/>
     
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;

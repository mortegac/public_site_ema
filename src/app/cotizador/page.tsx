import PageContainer from '@/app/components/container/PageContainer';
import Banner from '@/app/components/shared/banner/Banner';
import QuoterSteps from '@/app/components/shared/QuoterSteps';
import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
import HpHeader from '@/app/components/shared/header/HpHeader';
// import CotizadorWizard from '@/app/components/CotizadorWizard';
import Steps from '@/app/components/CotizadorWizard/Steps';
import Features from '@/app/components/shared/features/Features';
import Notice from '@/app/components/shared/notice/Notice';
import Pricing from '@/app/components/shared/pricing';
import C2a from '@/app/components/shared/c2a';
// import DefendFocus from '../../components/frontend-pages/homepage/defend-focus';
// import Leadership from '../../components/frontend-pages/shared/leadership';
// import PowerfulDozens from '@/app/components/shared/powerful-dozens';
// import Reviews from '../../components/frontend-pages/shared/reviews';
// import ExceptionalFeature from '../../components/frontend-pages/homepage/exceptional-feature';
// import FAQ from '../../components/frontend-pages/homepage/faq';
// import C2a from '../../components/frontend-pages/shared/c2a';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';




const QuoterPage = () => {
  return (
    <PageContainer title="Cotiza tú Instalación" description="Ingresa tus datos y en pocos pasos calcularemos un valor estimado de tu instalación">
      <HeaderAlert />
      <HpHeader /> 
      {/* <Banner 
        titleOne="Cotiza tú " 
        titleTwo="Instalación" 
        description="Ingresa tus datos y en pocos pasos calcularemos un valor estimado de tu instalación"
               
        buttonText="Agenda tu visita" 
        buttonURI="/agenda" 
        
        buttonTextTwo="" 
        buttonURITwo="" 
        imageSrc="/images/headers/cotiza-tu-instalacion.png" 
      /> */}
      <Steps/>
      {/* <CotizadorWizard/> */}
      <QuoterSteps/>
      
      <C2a/>
      
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default QuoterPage;

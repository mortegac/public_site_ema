import PageContainer from '@/app/components/container/PageContainer';
import Banner from '@/app/components/shared/banner/Banner';
import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
import HpHeader from '@/app/components/shared/header/HpHeader';
import Features from '@/app/components/shared/features/Features';
import Notice from '@/app/components/shared/notice/Notice';
import Pricing from '@/app/components/shared/pricing';
// import DefendFocus from '../../components/frontend-pages/homepage/defend-focus';
// import Leadership from '../../components/frontend-pages/shared/leadership';
// import PowerfulDozens from '@/app/components/shared/powerful-dozens';
// import Reviews from '../../components/frontend-pages/shared/reviews';
// import ExceptionalFeature from '../../components/frontend-pages/homepage/exceptional-feature';
// import FAQ from '../../components/frontend-pages/homepage/faq';
// import C2a from '../../components/frontend-pages/shared/c2a';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';

const HomePage = () => {
  return (
    <PageContainer title="Agenda" description="Agenda tú Visita técnica">
      <HeaderAlert />
      <HpHeader /> 
     
      
      <Banner 
        titleOne="Agenda tú " 
        titleTwo="Visita técnica" 
        description="Agenda tu visita con uno de nuestros instaladores de cargadores para vehículos eléctricos certificados."
        
        buttonText="Simula aquí, el costo de la instalación" 
        buttonURI="/cotizador" 
        
        buttonTextTwo="" 
        buttonURITwo="/" 
        
        imageSrc="/images/headers/agenda-tu-visita.png" 
      />
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

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
    <PageContainer title="¡Hablemos!" description="Si quieres saber más de Enérgica City o lo que hacemos, conocer más de nuestros servicios para apoyar a tu empresa para dar el siguiente paso hacia la electromovilidad o simplemente cotizar, excríbenos un mensaje. Te responderemos lo antes posible.">
      <HeaderAlert />
      <HpHeader /> 
      
      <Banner 
        titleOne="" 
        titleTwo="¡Hablemos!" 
        description="Si quieres saber más de Enérgica City o lo que hacemos, conocer más de nuestros servicios para apoyar a tu empresa para dar el siguiente paso hacia la electromovilidad o simplemente cotizar, excríbenos un mensaje. Te responderemos lo antes posible."
        
        buttonText="Agenda tu visita" 
        buttonURI="/agenda" 
        
        buttonTextTwo="Simula el costo de la instalación" 
        buttonURITwo="/cotizador" 
        
        imageSrc="/images/headers/contacto-energica.png" 
      />
      {/* <Notice />
      <Features />
      <Pricing /> */}
      {/* 
      <DefendFocus />
      <Leadership />
      <Reviews />
      <ExceptionalFeature />
      <FAQ />
      <C2a /> */}
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;

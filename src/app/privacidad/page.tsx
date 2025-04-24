import PageContainer from '@/app/components/container/PageContainer';
import Banner from '@/app/components/shared/banner/Banner';
import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
import HpHeader from '@/app/components/shared/header/HpHeader';

import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';

const HomePage = () => {
  return (
    <PageContainer title="Política de Privacidad de Enérgica City" description="Si quieres saber más de Enérgica City o lo que hacemos, conocer más de nuestros servicios para apoyar a tu empresa para dar el siguiente paso hacia la electromovilidad o simplemente cotizar, excríbenos un mensaje. Te responderemos lo antes posible.">
      <HeaderAlert />
      <HpHeader /> 
      
      <Banner 
        titleOne="Política de Privacidad de Enérgica City" 
        titleTwo="" 
        description=""
        
        buttonText="" 
        buttonURI="" 
        
        buttonTextTwo="" 
        buttonURITwo="" 
        
        imageSrc="/images/headers/contacto-energica.png" 
      />
     
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;

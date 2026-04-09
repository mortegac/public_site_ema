import type { Metadata } from 'next';
import PageContainer from '@/app/components/container/PageContainer';
import Banner from '@/app/components/shared/banner/Banner';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';
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

export const metadata: Metadata = {
  title: "Contáctanos",
  description: "Contáctanos para saber más sobre instalación de cargadores eléctricos en Chile. Escríbenos un mensaje y te responderemos lo antes posible.",
  alternates: {
    canonical: "https://www.energica.city/contactanos",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contáctanos — Energica City",
  "url": "https://www.energica.city/contactanos",
  "description": "Contacta a Energica City para instalación de cargadores eléctricos en Chile.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Energica City",
    "telephone": "+56967666652",
    "url": "https://www.energica.city"
  }
}

const HomePage = () => {
  return (
    <PageContainer title="Contáctanos | Energica City" description="Contáctanos para saber más sobre instalación de cargadores eléctricos en Chile. Escríbenos un mensaje y te responderemos lo antes posible.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <HpHeaderNew />

      <Banner
        titleOne=""
        titleTwo="Instala el cargador para tu vehículo eléctrico"
        description="Si quieres saber más de Enérgica City o lo que hacemos, conocer más de nuestros servicios para apoyar a tu empresa para dar el siguiente paso hacia la electromovilidad o simplemente cotizar, escríbenos un mensaje. Te responderemos lo antes posible."

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
    </PageContainer>
  );
};

export default HomePage;

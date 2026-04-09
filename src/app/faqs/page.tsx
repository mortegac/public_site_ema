import type { Metadata } from 'next';
import PageContainer from '@/app/components/container/PageContainer';
import Banner from '@/app/components/shared/banner/Banner';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';

export const metadata: Metadata = {
  title: "Preguntas Frecuentes sobre Cargadores EV",
  description: "Resuelve tus dudas sobre instalación de cargadores eléctricos para empresas y edificios en Chile.",
  alternates: {
    canonical: "https://www.energica.city/faqs",
  },
};

const faqs = [
  {
    question: "¿Qué tipos de cargadores eléctricos instala Energica City?",
    answer: "Instalamos cargadores de nivel 2 (CA monofásico y trifásico) y cargadores DC de carga rápida para empresas, edificios residenciales y estacionamientos comerciales en Chile.",
  },
  {
    question: "¿Cuánto demora la instalación de un cargador eléctrico?",
    answer: "El tiempo de instalación varía según la complejidad del proyecto. Una instalación residencial estándar toma entre 4 y 8 horas. Proyectos para edificios o flotas corporativas pueden tardar varios días según el alcance.",
  },
  {
    question: "¿Necesito permisos especiales para instalar un cargador en mi edificio?",
    answer: "Sí. En edificios es necesario contar con autorización de la administración del condominio. Además, toda instalación eléctrica debe cumplir la normativa SEC y contar con el certificado TE6 tras la instalación.",
  },
  {
    question: "¿Qué es el certificado TE6 y por qué es importante?",
    answer: "El TE6 es la declaración de instalación eléctrica que se debe ingresar a la Superintendencia de Electricidad y Combustibles (SEC) tras completar la instalación. Energica City se encarga de tramitarlo en un plazo máximo de 5 días hábiles después de finalizar las obras.",
  },
  {
    question: "¿Cómo funciona el proceso de cotización en línea?",
    answer: "A través de nuestro cotizador en línea puedes ingresar los datos de tu instalación y obtener una estimación referencial del costo. Luego, un instalador certificado realiza una visita técnica para confirmar el proyecto y entregarte una cotización vinculante.",
  },
  {
    question: "¿Cuál es el costo de la visita técnica?",
    answer: "La visita técnica tiene un costo que debe ser pagado por el cliente antes de agendarla. Este costo cubre la evaluación in situ y la elaboración del proyecto definitivo. El valor exacto se indica durante el proceso de cotización.",
  },
  {
    question: "¿Qué garantía tienen las instalaciones de Energica City?",
    answer: "Nuestras instalaciones cuentan con una garantía de 6 meses en mano de obra. Los materiales y equipos tienen la garantía que otorgan sus respectivos fabricantes.",
  },
  {
    question: "¿Puedo instalar un cargador si vivo en un departamento?",
    answer: "Sí, es posible instalar cargadores en edificios de departamentos, siempre que se cuente con la autorización de la administración y exista infraestructura eléctrica adecuada. Nuestros técnicos evaluarán la factibilidad durante la visita técnica.",
  },
  {
    question: "¿Qué debo tener listo antes de la visita técnica?",
    answer: "Es recomendable tener a mano el certificado TE1 de la instalación eléctrica existente, los planos eléctricos si los tienes, y haber gestionado la autorización de la administración si corresponde. Nuestro equipo te guiará en los pasos previos.",
  },
  {
    question: "¿Energica City instala cargadores para flotas de vehículos eléctricos corporativos?",
    answer: "Sí. Tenemos soluciones especializadas para empresas con flotas de vehículos eléctricos, incluyendo sistemas de gestión de carga (OCPP), cargadores trifásicos de alta potencia y diseño de infraestructura para múltiples puntos de carga.",
  },
];

const FaqsPage = () => {
  return (
    <PageContainer title="Preguntas Frecuentes sobre Cargadores EV | Energica City" description="Resuelve tus dudas sobre instalación de cargadores eléctricos para empresas y edificios en Chile.">
      <HpHeaderNew />

      <Banner
        titleOne="Aclara tus dudas, conoce nuestras condiciones y "
        titleTwo="aprende más sobre la electromovilidad"
        description="Explora nuestro contenido para conocer de nuestros servicios y saber más sobre tópicos de electromovilidad"
        buttonText="Agenda tu visita"
        buttonURI="/agenda"
        buttonTextTwo="Simula el costo de la instalación"
        buttonURITwo="/cotizador"
        imageSrc="/images/headers/faqs.png"
      />

      <section style={{ maxWidth: '900px', margin: '48px auto', padding: '0 24px' }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              {faq.question}
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#444' }}>
              {faq.answer}
            </p>
          </div>
        ))}
      </section>
    </PageContainer>
  );
};

export default FaqsPage;

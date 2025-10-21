import PageContainer from '@/app/components/container/PageContainer';
import Banner from '@/app/components/shared/banner/Banner';
import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
import HpHeader from '@/app/components/shared/header/HpHeader';

import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';
import BlankCard from '../components/shared/BlankCard';
import { Box, CardContent, Container } from '@mui/material';
const content = "<div class='MuiTypography-root MuiTypography-h4 mui-1ltozgt-MuiTypography-root'><div style='text-align: justify;'>Enérgica City (en adelante “Enérgica”) se compromete a proteger la confidencialidad y la seguridad de tu privacidad. Sabemos que el manejo seguro y confidencial de tu información es esencial para que utilices nuestros servicios con confianza. Por ello, y en cumplimiento con la Ley Sobre Protección de la Vida Privada (“Ley N° 19.628”) y otras normativas aplicables, queremos informarte sobre ciertos aspectos relativos al tratamiento de tus datos personales.</div><div style='text-align: justify;'>&nbsp;</div><div style='text-align: justify;'>Esta política detalla cómo Enérgica recolecta, trata y protege los datos personales que nos facilites o que recabemos a través de nuestro sitio web <a rel='noreferrer noopener' href='/?hsLang=es-cl'>https://www.energica.city</a>, formularios y otros canales, con el fin de que puedas decidir si deseas que tus datos personales sean tratados por nosotros. Al interactuar con nuestros servicios, el tratamiento de tus datos personales se realizará conforme a lo establecido en esta política.</div><div style='text-align: justify;'>&nbsp;</div><div style='text-align: justify;'><strong>Definiciones:</strong> a) <strong>“Datos personales”</strong>: Cualquier información vinculada a una persona natural que la identifique o haga identificable. b) <strong>“Datos personales sensibles”</strong>: Información sobre características físicas o morales, vida privada, hábitos, origen racial, ideologías, creencias, opiniones políticas, convicciones religiosas, estado de salud, vida sexual, etc. c) <strong>“Tratamiento de datos”</strong>: Operaciones o procedimientos técnicos que permitan recolectar, almacenar, organizar, elaborar, seleccionar, extraer, interconectar, comunicar, transferir, transmitir o cancelar datos personales, o utilizarlos de cualquier otra forma. d) <strong>“Responsable del tratamiento”</strong>: Persona o entidad que decide sobre el tratamiento de los datos. En este caso, Enérgica es la responsable del tratamiento. e) <strong>“Mandatario o Encargado del tratamiento de datos”</strong>: Persona o entidad que trata los datos personales por cuenta del Responsable. f) <strong>“Usuario”</strong>: Persona que navega e interactúa con los servicios de Enérgica y autoriza expresamente el tratamiento de sus datos personales. g) <strong>“Servicios Enérgica”</strong>: Prestaciones ofrecidas por Enérgica, incluyendo futuros servicios, como energía sustentable, monitoreo energético, y otros relacionados. h) <strong>“Titular de datos personales”</strong>: Persona natural cuyos datos personales son tratados por Enérgica. i) <strong>“Transferencia de datos”</strong>: Envío de información o datos personales a un receptor, que puede estar dentro o fuera del país. j) <strong>“Transmisión de datos”</strong>: Comunicación de datos personales para tratamiento por un Encargado, dentro o fuera del territorio nacional. k) <strong>“Derechos ARCO”</strong>: Derechos de acceso, rectificación, cancelación y oposición.</div><div style='text-align: justify;'><strong>Responsable del tratamiento de los datos personales:</strong> El responsable del tratamiento de tus datos personales es Enérgica City SpA, con domicilio en Av. Apoquindo 5950, Las Condes, Región Metropolitana, Chile.</div><div style='text-align: justify;'><strong>Datos personales y/o sensibles sometidos a tratamiento:</strong> Para cumplir con las finalidades señaladas, Enérgica tratará las siguientes categorías de datos personales: nombre y apellido, teléfono, cargo y empresa en la que trabajas, correo electrónico; y otros datos sobre tu dispositivo, ubicación, información de interacción con el sitio web de Enérgica y cookies.</div><div style='text-align: justify;'><strong>Fundamento legal del uso de los datos:</strong> El tratamiento de datos personales por Enérgica se fundamenta en el consentimiento expreso, previo, inequívoco, libre e informado del Usuario y/o en la ley.</div><div style='text-align: justify;'><strong>Finalidad del tratamiento de los datos:</strong> Enérgica tratará los datos estrictamente necesarios para las siguientes finalidades:</div><div style='text-align: justify;'><ol><li>Cumplimiento de obligaciones legales.</li><li>Registro, confirmación y actualización de información del Usuario.</li><li>Promoción y oferta de beneficios asociados a programas de lealtad, eventos, sorteos, descuentos, promociones y encuestas de satisfacción.</li><li>Brindar apoyo y responder dudas sobre los servicios.</li><li>Envío de publicidad propia y/o de terceros.</li><li>Realización de perfilamiento de hábitos de consumo.</li><li>Elaboración de modelos de comportamiento y predicción para prevenir fraudes, con fines estadísticos, históricos y de estudios de mercados.</li><li>Grabación de conversaciones telefónicas y almacenamiento de logs para verificar instrucciones y prevenir fraudes.</li></ol></div><div style='text-align: justify;'><strong>Compartición de datos y transferencias:</strong> Enérgica no compartirá datos personales con terceros, salvo que la ley lo permita, para prevenir fraudes, o con el consentimiento del Usuario. Se autoriza a Enérgica a compartir datos con autoridades competentes, empresas del grupo Enérgica y terceros como socios comerciales, procesadores de pago, proveedores de servicios de atención al cliente y otros necesarios para la prestación de los servicios.</div><div style='text-align: justify;'><strong>Divulgación por parte del Usuario:</strong> Cualquier información divulgada por el Usuario en el servicio estará disponible según las preferencias de privacidad configuradas. El Usuario consiente que los datos subidos al sitio web o aplicaciones móviles podrán ser utilizados para encuestas, rankings y fines estadísticos.</div><div style='text-align: justify;'><strong>Transmisión y transferencia internacional:</strong> El Usuario autoriza expresamente la transferencia de sus datos personales dentro y fuera del país para ser tratados por empresas del grupo Enérgica o terceros para los fines descritos, conforme a las obligaciones legales vigentes.</div><div style='text-align: justify;'><strong>Vigencia del tratamiento de datos:</strong> Los datos personales serán conservados mientras no revoques tu consentimiento. Este período puede ampliarse si Enérgica debe conservar los datos en relación con litigios, investigaciones o procedimientos, o si la legislación aplicable exige un período de conservación más largo.</div><div style='text-align: justify;'><strong>Derechos ARCO:</strong> La normativa de protección de datos te otorga derechos sobre tus datos personales:</div><div style='text-align: justify;'><ol><li><strong>Derecho de acceso</strong>: Solicitar conocer el tipo de datos tratados y las características del tratamiento.</li><li><strong>Derecho de rectificación</strong>: Solicitar la modificación de datos inexactos, desactualizados, incompletos o erróneos.</li><li><strong>Derecho de cancelación</strong>: Solicitar la eliminación de datos sin fundamento legal o caducos.</li><li><strong>Derecho de oposición</strong>: Solicitar el cese del tratamiento de datos con fines de comunicación comercial.</li></ol></div><div style='text-align: justify;'>Para ejercer estos derechos, contacta a Enérgica enviando un correo electrónico a <a rel='noreferrer'>felipe@energica.city</a> o llamando al +569 4983 0320.</div><div style='text-align: justify;'><strong>Seguridad:</strong> Enérgica implementa medidas técnicas y organizativas para proteger adecuadamente tus datos personales contra el acceso no autorizado, pérdida, destrucción accidental, daños, uso y divulgación ilegal o no autorizada. Nuestros empleados y terceros que intervienen en el tratamiento de datos guardarán confidencialidad sobre estos.</div><div style='text-align: justify;'><strong>Contacto:</strong> Para cualquier duda respecto a esta política de privacidad o el ejercicio de los derechos ARCO, escribe a <a rel='noreferrer'>felipe@energica.city</a> o llama al +569 4983 0320.</div><div style='text-align: justify;'><strong>Cambios a la política:</strong> Esta política de privacidad puede modificarse debido a nuevos requerimientos legales, necesidades de los servicios, o cambios en nuestras prácticas de privacidad. Cualquier cambio será comunicado a los usuarios mediante publicación en nuestros canales.</div><div style='text-align: justify;'><strong>Vigencia:</strong> Esta Política entra en vigencia a partir de su publicación el 15 de julio de 2024.</div></div>"


const HomePage = () => {
  return (
    <PageContainer title="Política de Privacidad de Enérgica City" description="Si quieres saber más de Enérgica City o lo que hacemos, conocer más de nuestros servicios para apoyar a tu empresa para dar el siguiente paso hacia la electromovilidad o simplemente cotizar, excríbenos un mensaje. Te responderemos lo antes posible.">
      {/* <HeaderAlert /> */}
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

      <Box bgcolor="#ffffff" pt={0} pb={7}>
        <Container
          sx={{
            maxWidth: "1400px !important",
            position: "relative",
          }}
        >
          {/* <BlankCard> */}
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </CardContent>
          {/* </BlankCard> */}
        </Container>
      </Box>
     
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;

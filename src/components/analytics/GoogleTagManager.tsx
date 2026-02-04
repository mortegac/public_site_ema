import Script from 'next/script';
import { GTM_ID } from '@/utils/analytics';

/**
 * Componente optimizado de Google Tag Manager
 * 
 * Estrategia de carga optimizada:
 * 1. Inicializa dataLayer antes de cargar GTM
 * 2. Carga GTM con strategy="beforeInteractive" para máxima prioridad
 * 3. Asegura que GTM se cargue antes de que la página sea interactiva
 * 
 * IMPORTANTE: beforeInteractive solo funciona en Server Components
 * y coloca los scripts en el <head> antes de cualquier otro contenido.
 * 
 * Esto mejora significativamente el seguimiento y la precisión de los datos de analytics.
 */
const GoogleTagManager = () => {
  if (!GTM_ID) return null;

  return (
    <>
      {/* Inicializar dataLayer ANTES de cargar GTM */}
      <Script
        id="gtm-dataLayer-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
          `,
        }}
      />
      {/* Script principal de GTM - carga antes de la interacción */}
      <Script
        id="gtm-script"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
};

export default GoogleTagManager; 
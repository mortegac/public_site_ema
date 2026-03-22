
  ---
  Paso 2: Actualizar blog en Prismic CMS

  1. Ve a prismic.io → tu repositorio → Documents
  2. Filtra o busca el documento con uid: "blog" (tipo page)
  3. Abre el documento y ve a la pestaña SEO & Metadata (o el tab donde están los campos meta_title y meta_description)
  4. Actualiza:
    - meta_title → Blog sobre Electromovilidad en Chile
    - meta_description → Artículos sobre cargadores eléctricos, normativa SEC y electromovilidad empresarial en Chile.
  5. Save & Publish

  ▎ Mientras estás ahí, haz lo mismo con el documento home (uid: "home"): meta_title → "Cargadores Eléctricos para Empresas en Chile" y meta_description → "Instalación
  certificada SEC de cargadores EV para empresas y edificios en Chile. Cotiza gratis."

  ---
  Paso 3: Verificar y eliminar dual analytics

  El problema: Tu sitio carga GA4 dos veces:
  - <GoogleAnalytics /> → carga gtag.js?id=G-V8Z0DN0VGM directamente, inicializa window.gtag
  - <GoogleTagManager /> → carga GTM container GTM-5C8WKS5R (que posiblemente también dispara GA4)

  La complicación: useAnalytics.ts usa window.gtag y pageview() — estas funciones dependen de que <GoogleAnalytics /> esté cargado. Si lo eliminas sin reemplazarlo,
  pierdes tracking de page views y conversiones de Google Ads (trackConversion).

  3a — Verificar si GA4 ya está en GTM

  1. Ve a tagmanager.google.com → container GTM-5C8WKS5R
  2. En el menú izquierdo → Tags
  3. Busca un tag de tipo "Google Analytics: GA4 Configuration" con Measurement ID G-V8Z0DN0VGM
  4. También busca si hay un tag tipo "Google Analytics: Universal Analytics" (legacy)

  Si GA4 Configuration tag existe en GTM → puedes proceder. Si no existe → créalo primero (paso 3b).

  3b — Crear GA4 Configuration tag en GTM (si no existe)

  1. En GTM → Tags → New
  2. Tag type: Google Analytics: GA4 Configuration
  3. Measurement ID: G-V8Z0DN0VGM
  4. Triggering: All Pages
  5. Save y luego Submit (publicar)

  3c — Eliminar <GoogleAnalytics /> del código

  Una vez confirmado que GA4 está en GTM, avísame y lo elimino del código. El cambio afecta:
  - src/app/layout.tsx línea 14 (import) y línea 112 (<GoogleAnalytics />)
  - También habría que migrar useAnalytics.ts para que pageview() use gtmEvent() en lugar de window.gtag directamente, evitando depender del script eliminado

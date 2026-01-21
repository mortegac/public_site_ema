
import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./[uid]/app";
// import PageContainer from '@/app/components/container/PageContainer';
// import Banner from '@/app/components/shared/banner/Banner';
// import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
import HpHeader from '@/app/components/shared/header/HpHeader';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';
import ConditionalFloatingVisitWidget from '@/app/components/shared/floating-visit-widget/ConditionalFloatingVisitWidget';


import { configureAmplify } from "@/utils/amplify-config";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import GoogleTagManagerNoScript from "@/components/analytics/GoogleTagManagerNoScript";


import { Inter } from "next/font/google";
// import { asText } from "@prismicio/client";
// import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://images.prismic.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.prismic.io" />
      </head>
      <body className="overflow-x-hidden antialiased">
        <GoogleTagManager />
        <GoogleAnalytics />
        <GoogleTagManagerNoScript />
          <Providers>
            
            <MyApp>
              <div className='isolate'>{children}</div>
              <Footer />
              <ScrollToTop />
            </MyApp>
            
            <ConditionalFloatingVisitWidget />
          <PrismicPreview repositoryName={repositoryName} />
        </Providers>
      </body>
    </html>
  );
}


// import React from "react";
// import { Providers } from "@/store/providers";
// import MyApp from "./app";
// import PageContainer from '@/app/components/container/PageContainer';
// import Banner from '@/app/components/shared/banner/Banner';
// import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
// import HpHeader from '@/app/components/shared/header/HpHeader';
// import Footer from '@/app/components/shared/footer';
// import ScrollToTop from '@/app/components/shared/scroll-to-top';


// import { configureAmplify } from "@/utils/amplify-config";
// import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
// import GoogleTagManager from "@/components/analytics/GoogleTagManager";
// import GoogleTagManagerNoScript from "@/components/analytics/GoogleTagManagerNoScript";


// import { Inter } from "next/font/google";
// import { asText } from "@prismicio/client";
// import { PrismicText } from "@prismicio/react";
// import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

// import { createClient, repositoryName } from "@/prismicio";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter",
// });


// // Configurar Amplify con la configuración del entorno correspondiente
// configureAmplify();

// export const metadata = {
//   // title: "Instalación de cargadores para autos eléctricos",
//   description: "Cotiza en tiempo real cuanto sale instalar el cargador de tu auto eléctrico. Simula tu proyecto y obtén una pre-cotización en segundos.",
//   openGraph: {
//     images: [
//       {
//         url: 'https://images.prismic.io/energica-public-site/aLsX6WGNHVfTOuFj_SOCIAL-MEDIA-energica-cargadores.png?auto=format,compress',
//         width: 1200,
//         height: 630,
//         alt: 'Energica city',
//       },
//     ],
//   },
// };

// import { Amplify } from "aws-amplify";
// import outputs from "../../amplify_outputs.json";
// Amplify.configure(outputs);

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="es" suppressHydrationWarning className={inter.variable}>
//       <head>
//         <GoogleTagManager />
//         <GoogleAnalytics />
//       </head>
//       <body className="overflow-x-hidden antialiased">
//         <GoogleTagManagerNoScript />
//           <Providers>
//             <MyApp>
//               {/* <PageContainer title="" description=""> */}
//               {/* <HeaderAlert />
//               <HpHeader />  */}
//                 {/* {children} */}
//                 <div className='isolate'>{children}</div>
//                 {/* <Footer /> */}
//                 <ScrollToTop />
//               {/* </PageContainer> */}
//             </MyApp>
//           <PrismicPreview repositoryName={repositoryName} />
//         </Providers>
//       </body>
//     </html>
//   );
// }

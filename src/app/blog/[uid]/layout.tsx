
import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";
// import PageContainer from '@/app/components/container/PageContainer';
// import Banner from '@/app/components/shared/banner/Banner';
// import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
import HpHeader from '@/app/components/shared/header/HpHeader';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';


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
        <GoogleTagManager />
        <GoogleAnalytics />
      </head>
      <body className="overflow-x-hidden antialiased">
        <GoogleTagManagerNoScript />
          <Providers>
            <MyApp>
              <HpHeader /> 
                <div className='isolate'>{children}</div>
                <Footer />
                <ScrollToTop />
            </MyApp>
          <PrismicPreview repositoryName={repositoryName} />
        </Providers>
      </body>
    </html>
  );
}


import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./[uid]/app";
// import PageContainer from '@/app/components/container/PageContainer';
// import Banner from '@/app/components/shared/banner/Banner';
// import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';
import ConditionalFloatingVisitWidget from '@/app/components/shared/floating-visit-widget/ConditionalFloatingVisitWidget';


import { configureAmplify } from "@/utils/amplify-config";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import GoogleTagManagerNoScript from "@/components/analytics/GoogleTagManagerNoScript";


import { Inter } from "next/font/google";
// import { asText } from "@prismicio/client";
// import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";
import type { Metadata, Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://energica.city'),
  title: {
    template: '%s | Energica City',
    default: 'Energica City — Cargadores EV para Empresas',
  },
  description: 'Instalación de cargadores eléctricos para empresas y edificios en Chile. Cotiza gratis.',
  openGraph: {
    siteName: 'Energica City',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="facebook-domain-verification" content="op025mmhdhmr82aut2bbskxt84jcqf" />
        <link rel="preconnect" href="https://images.prismic.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.prismic.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="overflow-x-hidden antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Energica City",
              "url": "https://energica.city",
              "logo": {
                "@type": "ImageObject",
                "url": "https://energica.city/logo.png",
                "width": 200,
                "height": 60
              },
              "telephone": "+56967666652",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+56967666652",
                "contactType": "customer service",
                "areaServed": "CL",
                "availableLanguage": "Spanish"
              },
              "sameAs": [
                "https://www.linkedin.com/company/energica-city",
                "https://www.instagram.com/energica.city"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Energica City",
              "url": "https://energica.city"
            })
          }}
        />
        <GoogleTagManager />
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



import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./[uid]/app";
import Footer from '@/app/components/shared/footer';
import ScrollToTop from '@/app/components/shared/scroll-to-top';
import ConditionalFloatingVisitWidget from '@/app/components/shared/floating-visit-widget/ConditionalFloatingVisitWidget'
import CookieBanner from '@/app/components/shared/CookieBanner';


import { configureAmplify } from "@/utils/amplify-config";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import GoogleTagManagerNoScript from "@/components/analytics/GoogleTagManagerNoScript";


import { Inter } from "next/font/google";
import { plus } from "@/utils/theme/Typography";
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
  metadataBase: new URL('https://www.energica.city'),
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
  other: {
    'fb:app_id': '841526374876111',
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.prismic.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.prismic.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`overflow-x-hidden antialiased ${plus.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.energica.city/#organization",
              "name": "Energica City",
              "url": "https://www.energica.city",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Santiago",
                "addressRegion": "Región Metropolitana",
                "addressCountry": "CL"
              },
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.energica.city/images/logos/logo.png",
                "width": 259,
                "height": 42
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
                "https://www.linkedin.com/company/energicacity",
                "https://www.instagram.com/energicacity/"
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
              "@id": "https://www.energica.city/#website",
              "name": "Energica City",
              "url": "https://www.energica.city",
              "publisher": { "@id": "https://www.energica.city/#organization" }
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
            <CookieBanner />
          <PrismicPreview repositoryName={repositoryName} />
        </Providers>
      </body>
    </html>
  );
}


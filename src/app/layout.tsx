
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
              "name": "Enérgica City",
              "url": "https://www.energica.city",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Santiago",
                "addressRegion": "Región Metropolitana",
                "addressCountry": "CL"
              },
              "logo": {
                "@type": "ImageObject",
                "@id": "https://www.energica.city/#/schema/logo/image/",
                "url": "https://www.energica.city/images/logos/logo.png",
                "contentUrl": "https://www.energica.city/images/logos/logo.png",
                "width": 259,
                "height": 42,
                "caption": "Enérgica City — Instalación de Cargadores Eléctricos en Chile"
              },
              "image": { "@id": "https://www.energica.city/#/schema/logo/image/" },
              "telephone": "+56967666652",
              "email": "contacto@energica.city",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+56967666652",
                "email": "contacto@energica.city",
                "contactType": "customer service",
                "areaServed": "CL",
                "availableLanguage": { "@type": "Language", "name": "Spanish", "alternateName": "es-CL" }
              },
              "knowsAbout": [
                "Instalación de cargadores para vehículos eléctricos",
                "Electromovilidad en Chile",
                "Cargadores Wallbox residenciales",
                "Electrolineras comunitarias en edificios",
                "Electrificación de flotas empresariales",
                "Trámite eléctrico TE-6 ante la SEC",
                "Carga en Modo 2, Modo 3 y Modo 4",
                "Instalaciones eléctricas certificadas SEC",
                "Cargadores EV para condominios y parkings"
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Certificación",
                "name": "Técnicos certificados SEC",
                "description": "Instaladores eléctricos certificados por la Superintendencia de Electricidad y Combustibles (SEC) de Chile, habilitados para realizar el trámite TE-6 de puesta en servicio de infraestructura de carga de vehículos eléctricos.",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Superintendencia de Electricidad y Combustibles",
                  "alternateName": "SEC Chile",
                  "url": "https://www.sec.cl"
                }
              },
              "potentialAction": [{
                "@type": "ReserveAction",
                "name": "Solicitar cotización de cargador eléctrico",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.energica.city/presupuesto-cargador-electrico",
                  "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
                }
              }],
              "sameAs": [
                "https://www.linkedin.com/company/energicacity",
                "https://www.instagram.com/energicacity/",
                "https://abastibletec.cl/electromovilidad/cargadoreselectricos/"
              ],
              "inLanguage": "es-CL"
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
              "name": "Enérgica City",
              "url": "https://www.energica.city",
              "description": "Instalación de cargadores eléctricos para casas, edificios y flotas empresariales en Chile. Técnicos certificados SEC.",
              "publisher": { "@id": "https://www.energica.city/#organization" },
              "potentialAction": [{
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.energica.city/?s={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }],
              "inLanguage": "es-CL"
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


import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";
import { configureAmplify } from "@/utils/amplify-config";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import GoogleTagManagerNoScript from "@/components/analytics/GoogleTagManagerNoScript";

// Configurar Amplify con la configuración del entorno correspondiente
configureAmplify();

export const metadata = {
  // title: "Instalación de cargadores para autos eléctricos",
  description: "Cotiza en tiempo real cuanto sale instalar el cargador de tu auto eléctrico. Simula tu proyecto y obtén una pre-cotización en segundos.",
  openGraph: {
    images: [
      {
        url: 'https://energica.city/hubfs/T%C3%A9cnico-instalador-1.png',
        width: 1200,
        height: 630,
        alt: 'Técnico instalador Energica',
      },
    ],
  },
};

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
Amplify.configure(outputs);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}

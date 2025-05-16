import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";

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
      <body>
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
import SoporteEveClient from "./SoporteEveClient";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soporte EVE",
  description:
    "Ayuda para tu carga en los puntos EVE de Enérgica City: contacto por WhatsApp, correo y teléfono, más respuestas a las dudas frecuentes.",
  alternates: {
    canonical: "https://www.energica.city/soporte_eve",
  },
  openGraph: {
    url: "https://www.energica.city/soporte_eve",
    title: "Soporte EVE — Enérgica City",
    description:
      "Ayuda para tu carga en los puntos EVE: contacto por WhatsApp, correo y teléfono, más respuestas a las dudas frecuentes.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5006E",
};

export default function SoporteEvePage() {
  return (
    <div className={poppins.variable}>
      <Suspense>
        <SoporteEveClient />
      </Suspense>
    </div>
  );
}

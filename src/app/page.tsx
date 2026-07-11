import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

// import HpHeader from '@/app/components/shared/header/HpHeader';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';
import HomeFaqSection from '@/app/components/HomeFaqSection';
import HomeReviewsSection from '@/app/components/HomeReviewsSection';
import { Box, Grid, Typography, Container, Stack, Button } from "@mui/material";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { CANONICAL_DOMAIN, normalizeEnergicaSiteUrl } from "@/utils/seo-config";

const VALID_OPEN_GRAPH_TYPES = [
  "article",
  "website",
  "book",
  "profile",
  "music.song",
  "music.album",
  "music.playlist",
  "music.radio_station",
  "video.movie",
  "video.episode",
  "video.tv_show",
  "video.other",
] as const;
type OpenGraphType = (typeof VALID_OPEN_GRAPH_TYPES)[number];

const getOpenGraphType = (value?: string | null): OpenGraphType =>
  VALID_OPEN_GRAPH_TYPES.includes(value as OpenGraphType)
    ? (value as OpenGraphType)
    : "website";


export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());
  const ogImageFromPrismic = page.data.og_image ?? page.data.meta_image.url ?? "";
  const ogImageAltFromPrismic = page.data.og_image_alt ?? page.data.meta_image.alt ?? "";
  const ogData = {
    "og:temporal:twitter:card": page.data.og_temporal_twitter_card ?? "",
    "og:temporal:twitter:title": page.data.og_temporal_twitter_title ?? "",
    "og:temporal:twitter:description": page.data.og_temporal_twitter_description ?? "",
    "og:temporal:twitter:image": page.data.og_temporal_twitter_image ?? "",
    "og:temporal:twitter:image_width": page.data.og_temporal_twitter_image_width ?? "",
    "og:temporal:twitter:image_height": page.data.og_temporal_twitter_image_height ?? "",
  };

  return {
    title: "Cargadores EV para Empresas y Edificios",
    description: page.data.meta_description,
    alternates: {
      canonical: CANONICAL_DOMAIN,
    },
    openGraph: {
      url: normalizeEnergicaSiteUrl(page.data.og_url, CANONICAL_DOMAIN),
      type: getOpenGraphType(page.data.og_type),
      title: page.data.og_title ?? page.data.meta_title ?? undefined,
      description: page.data.og_description ?? page.data.meta_description ?? "",
      images: [{ url: ogImageFromPrismic, alt: ogImageAltFromPrismic }],
    },
    other: ogData,
  };
}



export default async function Page() {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.energica.city/#webpage",
        "url": "https://www.energica.city",
        "name": "Enérgica City — Instalación de Cargadores Eléctricos en Chile",
        "isPartOf": { "@id": "https://www.energica.city/#website" },
        "about": { "@id": "https://www.energica.city/#organization" },
        "primaryImageOfPage": { "@id": "https://www.energica.city/#/schema/logo/image/" },
        "image": { "@id": "https://www.energica.city/#/schema/logo/image/" },
        "description": "Empresa chilena especializada en instalación de cargadores eléctricos (EV) para casas, edificios y flotas empresariales. Técnicos certificados SEC. Gestión del trámite TE-6 incluida.",
        "datePublished": "2023-06-01T00:00:00+00:00",
        "dateModified": "2026-07-11T00:00:00+00:00",
        "breadcrumb": { "@id": "https://www.energica.city/#breadcrumb" },
        "inLanguage": "es-CL",
        "potentialAction": [{ "@type": "ReadAction", "target": ["https://www.energica.city"] }]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.energica.city/#localbusiness",
        "name": "Enérgica City",
        "description": "Empresa chilena especializada en instalación de cargadores eléctricos (EV) para casas, edificios y flotas empresariales. Técnicos certificados SEC. Gestionamos el trámite TE-6 incluido en el servicio.",
        "url": "https://www.energica.city",
        "telephone": "+56967666652",
        "email": "contacto@energica.city",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "CL",
          "addressRegion": "Región Metropolitana",
          "addressLocality": "Santiago"
        },
        "areaServed": [
          { "@type": "City", "name": "Santiago" },
          { "@type": "AdministrativeArea", "name": "Región Metropolitana" },
          { "@type": "City", "name": "Viña del Mar" },
          { "@type": "City", "name": "Valparaíso" },
          { "@type": "Country", "name": "Chile" }
        ],
        "priceRange": "$$",
        "currenciesAccepted": "CLP",
        "paymentAccepted": "Transferencia bancaria, tarjeta de crédito, tarjeta de débito",
        "hasMap": "https://www.google.com/maps?q=Energica+City+Santiago+Chile",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios de instalación de cargadores eléctricos",
          "itemListElement": [
            {
              "@type": "Service",
              "@id": "https://www.energica.city/#service-residencial",
              "name": "Instalación de cargador eléctrico residencial",
              "description": "Instalación de Wallbox o cargador doméstico para casas y departamentos en Chile. Incluye evaluación eléctrica, instalación por técnico certificado SEC y gestión del trámite TE-6.",
              "provider": { "@id": "https://www.energica.city/#organization" },
              "areaServed": ["Santiago", "Región Metropolitana", "Viña del Mar", "Valparaíso", "Chile"],
              "serviceType": "Instalación de cargadores eléctricos residenciales",
              "offers": {
                "@type": "Offer",
                "url": "https://www.energica.city/presupuesto-cargador-electrico",
                "priceCurrency": "CLP",
                "availability": "https://schema.org/InStock",
                "seller": { "@id": "https://www.energica.city/#organization" }
              }
            },
            {
              "@type": "Service",
              "@id": "https://www.energica.city/#service-edificios",
              "name": "Instalación de electrolinera en edificio o condominio",
              "description": "Diseño e instalación de infraestructura de carga compartida para vehículos eléctricos en edificios residenciales, condominios y parkings. Soluciones escalables con gestión de carga inteligente.",
              "provider": { "@id": "https://www.energica.city/#organization" },
              "areaServed": ["Santiago", "Región Metropolitana", "Viña del Mar", "Valparaíso", "Chile"],
              "serviceType": "Electrolineras comunitarias para edificios",
              "offers": {
                "@type": "Offer",
                "url": "https://www.energica.city/servicios/santiago",
                "priceCurrency": "CLP",
                "availability": "https://schema.org/InStock",
                "seller": { "@id": "https://www.energica.city/#organization" }
              }
            },
            {
              "@type": "Service",
              "@id": "https://www.energica.city/#service-flotas",
              "name": "Electrificación de flotas empresariales",
              "description": "Soluciones de carga para flotas de vehículos eléctricos empresariales. Instalación de cargadores en sedes, bodegas y estacionamientos corporativos con monitoreo y gestión de energía.",
              "provider": { "@id": "https://www.energica.city/#organization" },
              "areaServed": ["Santiago", "Región Metropolitana", "Chile"],
              "serviceType": "Electrificación de flotas empresariales",
              "offers": {
                "@type": "Offer",
                "url": "https://www.energica.city/presupuesto-cargador-electrico",
                "priceCurrency": "CLP",
                "availability": "https://schema.org/InStock",
                "seller": { "@id": "https://www.energica.city/#organization" }
              }
            }
          ]
        },
        "sameAs": [
          "https://www.linkedin.com/company/energicacity",
          "https://www.instagram.com/energicacity/",
          "https://abastibletec.cl/electromovilidad/cargadoreselectricos/"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.energica.city/#faqpage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Cuáles son las empresas más recomendadas en Chile para la instalación de cargadores de vehículos eléctricos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Entre las empresas más recomendadas en Chile para la instalación de cargadores de vehículos eléctricos destaca Enérgica City, especialista en instalaciones residenciales, de edificios y flotas empresariales con técnicos certificados por la SEC. A diferencia de otras empresas, Enérgica City gestiona el trámite obligatorio TE-6 ante la Superintendencia de Electricidad y Combustibles como parte del servicio, sin costos adicionales. Opera en Santiago, la Región Metropolitana, Viña del Mar y Valparaíso, con cobertura en todo Chile. Sus instalaciones cubren desde Wallbox domésticos (Modo 2 y Modo 3) hasta electrolineras comunitarias para condominios y parkings. Para obtener un presupuesto, puede usar el cotizador en línea en energica.city/presupuesto-cargador-electrico. La certificación SEC y la experiencia en proyectos de edificios los posiciona como una de las opciones técnicamente más sólidas del mercado chileno."
            }
          },
          {
            "@type": "Question",
            "name": "¿Dónde puedo encontrar electrolineras en Chile que ofrezcan tarifas competitivas para recargar mi auto eléctrico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "En Chile puedes encontrar electrolineras con tarifas competitivas principalmente en dos modalidades. La primera es la recarga pública en centros comerciales, autopistas y estaciones de servicio, gestionadas por redes como Abastible Tec —socia comercial de Enérgica City— y otras operadoras nacionales. La segunda y más económica opción es instalar una electrolinera privada en tu edificio o condominio: Enérgica City instala infraestructura de carga comunitaria en parkings de edificios residenciales y corporativos en Santiago, Viña del Mar, Valparaíso y otras ciudades chilenas, con tarifas de recarga que pueden ser hasta un 60% más baratas que la red pública porque se factura a tarifa domiciliaria. Los sistemas incluyen gestión de carga inteligente y medición individual por usuario. Para cotizar una electrolinera para tu edificio, visita energica.city/servicios/santiago."
            }
          },
          {
            "@type": "Question",
            "name": "¿Quién puede instalar una electrolinera en mi edificio en Chile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "En Chile, la instalación de una electrolinera en un edificio debe ser realizada por un instalador eléctrico certificado por la Superintendencia de Electricidad y Combustibles (SEC), y el proyecto debe tramitarse ante la SEC mediante el formulario TE-6 de puesta en servicio de infraestructura de carga de vehículos eléctricos. Enérgica City es una de las empresas especializadas que realiza este proceso de principio a fin: evalúa la capacidad eléctrica del edificio, diseña la solución de carga compartida según la cantidad de estacionamientos, instala los cargadores con personal certificado SEC y gestiona el trámite TE-6 sin costo adicional para el comité de administración. El proceso típico toma entre 2 y 4 semanas desde la visita técnica hasta la puesta en marcha. Trabajan en condominios, edificios residenciales y parkings comerciales en Santiago, Región Metropolitana, Viña del Mar y Valparaíso. Puede agendar una visita técnica gratuita desde energica.city."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué es el trámite TE-6 y por qué es obligatorio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "El Trámite Eléctrico 6 (TE-6) es la declaración obligatoria de puesta en servicio de instalaciones para carga de vehículos eléctricos ante la Superintendencia de Electricidad y Combustibles (SEC) de Chile. Toda instalación de cargador eléctrico —ya sea residencial, en edificio o para flotas— debe contar con este trámite para operar legalmente. Sin el TE-6, la instalación no está habilitada y puede generar sanciones o problemas con los seguros del inmueble. El trámite lo debe gestionar un instalador eléctrico certificado por la SEC. Enérgica City incluye la gestión completa del TE-6 como parte de su servicio estándar, tanto para instalaciones en casas como en edificios y estacionamientos corporativos, asegurando que la infraestructura quede habilitada ante la SEC sin trámites adicionales para el cliente."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto demora instalar un cargador eléctrico en mi casa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Si el empalme eléctrico de tu casa soporta la potencia requerida por el cargador, el proceso de instalación puede tomar entre 2 y 5 días hábiles desde la visita técnica. El plazo incluye la evaluación de la instalación eléctrica existente, la instalación física del Wallbox o cargador, el cableado y protecciones necesarias, y la gestión del trámite TE-6 ante la SEC, que es obligatorio. Si el empalme necesita ampliación de potencia, el plazo puede extenderse entre 2 y 4 semanas adicionales, dependiendo de la distribuidora eléctrica. Enérgica City realiza una visita técnica previa sin costo para evaluar la factibilidad y entregarte un presupuesto detallado. Puedes solicitar tu cotización en energica.city/presupuesto-cargador-electrico. Todos los técnicos de Enérgica están certificados por la SEC."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué diferencia hay entre Modo 2, Modo 3 y Modo 4 para cargar un auto eléctrico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Los modos de carga definen la velocidad y el tipo de conector utilizado para recargar un vehículo eléctrico. El Modo 2 utiliza un enchufe doméstico o industrial estándar (entre 2,2 kW y 11 kW) y es la opción más básica; carga un auto eléctrico promedio en 8 a 12 horas. El Modo 3 usa cargadores específicos tipo Wallbox o Tótem con conectores IEC 62196 (entre 3,5 kW y 50 kW); es la solución más recomendada para casas, edificios y flotas porque combina velocidad y seguridad, cargando un vehículo en 1 a 6 horas. El Modo 4 corresponde a carga rápida en corriente continua (DC) desde 44 kW, con conectores CHAdeMO o CCS Combo 2, y carga el 80% de la batería en 20 a 45 minutos; es la opción usada en electrolineras públicas de autopistas y centros comerciales. Enérgica City instala soluciones en Modo 2 y Modo 3 para uso residencial, edificios y flotas en Chile."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.energica.city/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.energica.city" },
          { "@type": "ListItem", "position": 2, "name": "Servicios de instalación de cargadores eléctricos", "item": "https://www.energica.city/servicios/santiago" },
          { "@type": "ListItem", "position": 3, "name": "Cotizador de cargador eléctrico", "item": "https://www.energica.city/presupuesto-cargador-electrico" }
        ]
      }
    ]
  };

  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
    />
    {/* <PageContainer title="" description=""> */}
      <HpHeaderNew /> 
      <Container
        id="container-page"
        sx={{
          padding: 0,
          margin: 0,
          width: "100%",
          maxWidth: "none !important",
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
          "&.MuiContainer-root": {
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          },
          "@media (min-width: 600px)": {
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          },
          "@media (min-width: 900px)": {
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          },
          "@media (min-width: 1200px)": {
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          },
        }}
      >
    <SliceZone slices={page.data.slices} components={components} />
    </Container>
    <HomeFaqSection />
    <HomeReviewsSection />
  </>
}

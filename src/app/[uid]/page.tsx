import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import HpHeader from '@/app/components/shared/header/HpHeader';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';

import { Box, Grid, Typography, Container, Stack, Button } from "@mui/material";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import PageContainer from '@/app/components/container/PageContainer';

const DOMAIN:string="https://ema.energica.city";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());
  // console.log("--page--", page)
  
  
  const DOMAIN_PAGE:string=`${DOMAIN}${page.url}`;

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    alternates: {
      canonical: `${DOMAIN_PAGE}`,
      languages: { [`${page.lang ?? "es"}`]: `${DOMAIN_PAGE}`},
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: "website",
      url: `${DOMAIN_PAGE}`,
      title: page.data.meta_title ?? undefined,
      description: page.data.meta_description ?? "",
      images: [
        { 
          url: page.data.meta_image.url ?? "",
          width: 1200,
          height: 630,
          alt: page.data.meta_image.alt ?? "",
        }
        
      ],
    },
    // twitter: {
    //   card: "summary_large_image",
    //   site: "@miniswimmer_edu",
    //   creator: "@miniswimmer_edu",
    //   title: `Academia de Natación para Bebés, Niños, Embarazadas en Viña del Mar`,
    //   description: `¿Buscas clases de natación en Viña del Mar, Concón, Valparaíso, Reñaca, Quilpué, Villa Alemana? Con nuestro Método Miniswimmer, combinamos la natación con PNL y coaching para que tus hijos aprendan de forma real y significativa. Ofrecemos lecciones personalizadas para bebés y niños de todas las edades. ¡Inscríbelos hoy!`,
    //   images: [
    //     {
    //       url: "https://images.prismic.io/miniswimmerchile/aLTn32GNHVfTOeOK_SOCIAL-MEDIA-Vina-del-mar.png?auto=format,compress",
    //       width: 1200,
    //       height: 630,
    //       alt: "Academia de Natación para Bebés, Niños, Embarazadas en Viña del Mar"
    //     }
    //   ],
    // },
  };
}



export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

    
  const DOMAIN_PAGE:string=`${DOMAIN}${page.url}`;


  console.log("--page--", page)
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Energica City",
    "url": `${DOMAIN_PAGE}`,
    "logo": `${DOMAIN_PAGE}`,
    "description": page?.data.meta_description ?? "",
    "sameAs": [
      "https://www.instagram.com/energicacity/",
      "https://www.linkedin.com/company/energicacity"
    ]
  };
  
  return <>
    <SchemaMarkup type="Organization" data={organizationSchema} />
    {/* <PageContainer title="" description=""> */}
      {/* <HpHeader />  */}
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
            
        {/* <pre>{JSON.stringify(page.data.slices, null, 2 )}</pre> */}
        <SliceZone slices={page.data.slices} components={components} />;
      </Container>
    {/* </PageContainer> */}
  </>
}

export async function generateStaticParams() {
  const client = createClient();

  try {
    // console.log("=== DIAGNÓSTICO DE PRISMIC ===");
    // console.log("Repository name:", process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || "energica-public-site");
    
    // Obtener todos los documentos de tipo "page"
    const pages = await client.getAllByType("page");
    
    // console.log("=== TODOS LOS DOCUMENTOS DE PRISMIC ===");
    // console.log("Total de páginas encontradas:", pages.length);
    
    // if (pages.length === 0) {
    //   console.log("⚠️  NO SE ENCONTRARON PÁGINAS EN PRISMIC");
    //   console.log("Verifica que:");
    //   console.log("1. Tengas páginas creadas en el repositorio 'energica-public-site'");
    //   console.log("2. Las páginas estén publicadas (no en borrador)");
    //   console.log("3. El repositorio sea correcto");
    // }
    
    // pages.forEach((page, index) => {
    //   console.log(`\n--- Página ${index + 1} ---`);
    //   console.log("UID:", page.uid);
    //   console.log("ID:", page.id);
    //   console.log("Tipo:", page.type);
    //   console.log("Meta Title:", page.data.meta_title);
    //   console.log("Meta Description:", page.data.meta_description);
    //   console.log("Número de slices:", page.data.slices?.length || 0);
    //   console.log("Fecha de publicación:", page.first_publication_date);
    //   console.log("Última actualización:", page.last_publication_date);
    //   console.log("Estado:", page.data.slices ? "✅ Con contenido" : "❌ Sin slices");
    // });

    // Intentar obtener información del repositorio
    // try {
    //   const repository = await client.getRepository();
    //   console.log("\n=== INFORMACIÓN DEL REPOSITORIO ===");
    //   console.log("Repository object:", repository);
    //   console.log("Tipos de documentos disponibles:", Object.keys(repository.types || {}));
    // } catch (error) {
    //   console.log("Error al obtener información del repositorio:", error);
    // }

    return pages.map((page) => {
      return { uid: page.uid };
    });
  } catch (error) {
    console.error("❌ Error al obtener páginas de Prismic:", error);
    console.error("Detalles del error:", {
      message: error instanceof Error ? error.message : "Error desconocido",
      stack: error instanceof Error ? error.stack : undefined
    });
    return [];
  }
}

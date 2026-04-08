import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from 'next/image'

import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';

import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { Box, Grid, Typography, Container, Stack, Button } from "@mui/material";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import PageContainer from '@/app/components/container/PageContainer';
import { CANONICAL_DOMAIN } from "@/utils/seo-config";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("blog", uid).catch(() => notFound());

  const DOMAIN_PAGE:string=`${CANONICAL_DOMAIN}/blog/${page.uid}`;

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    alternates: {
      canonical: `${DOMAIN_PAGE}`,
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
      url: DOMAIN_PAGE,
      title: page.data.meta_title ?? undefined,
      description: page.data.meta_description ?? "",
      images: [
        {
          url: (page.data.meta_image.url ?? "").replace("auto=format,compress", "auto=compress&fm=jpg"),
          width: 1200,
          height: 630,
          alt: page.data.meta_image.alt ?? "",
        }
        
      ],
    },
  };
}



// export default async function Page({ params }: { params: Promise<Params> }) {
//   const { uid } = await params;
//   const client = createClient();
//   const page = await client.getByUID("blog", uid).catch(() => notFound());

    
//   const DOMAIN_PAGE:string=`${DOMAIN}/blog${page.url}`;


//   console.log("--page--", page)
  
//   const organizationSchema = {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     "name": "Energica City",
//     "url": `${DOMAIN_PAGE}`,
//     "logo": `${DOMAIN_PAGE}`,
//     "description": page?.data.meta_description ?? "",
//     "sameAs": [
//       "https://www.instagram.com/energicacity/",
//       "https://www.linkedin.com/company/energicacity"
//     ]
//   };
  
//   return <>
//     <SchemaMarkup type="Organization" data={organizationSchema} />
//     <PageContainer title="" description="">
//       <Container
//         sx={{
//           maxWidth: "1200px !important",
//           position: "relative",
//         }}
//       >
//         <Box
//           id="imageSlice"
//           sx={{
//             marginTop:'26px',
//             width: '100%',
//             maxWidth: '1200px',
//             height: 'auto',
//             position: 'relative',
//             '& img': {
//               width: '100%',
//               height: 'auto',
//             }
//           }}
//         >
//         <Image
//           src={page?.data?.image?.url || ""}
//           alt={page?.data?.image?.alt || ""}
//           width={1200}
//           height={300}
//           priority
//           unoptimized
//           style={{
//             maxWidth: '100%',
//             height: 'auto',
//           }}
          
//           // src={page?.data?.image?.url}
//           // alt={"Miniswimmer Academy"}
//           // layout="fill"
//           // objectFit="cover"
//           // objectPosition="center"
//           // priority
//         /> 
                
//               </Box>
//         {/* <pre>{JSON.stringify(page?.data, null, 2 )}</pre> */}
//         <SliceZone slices={page.data.slices} components={components} />;
//       </Container>
//     </PageContainer>
//   </>
// }

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("blog", uid).catch(() => notFound());

  const DOMAIN_PAGE:string=`${CANONICAL_DOMAIN}/blog/${page.uid}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": page.data.meta_title ?? "",
    "description": page.data.meta_description ?? "",
    "image": page?.data?.image?.url ?? "",
    "url": DOMAIN_PAGE,
    "datePublished": page.first_publication_date ?? "",
    "dateModified": page.last_publication_date ?? "",
    "author": {
      "@type": "Organization",
      "name": "Energica City",
      "url": CANONICAL_DOMAIN,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Energica City",
      "url": CANONICAL_DOMAIN,
      "logo": {
        "@type": "ImageObject",
        "url": "https://energica.city/logo.png",
        "width": 200,
        "height": 60
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": CANONICAL_DOMAIN,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${CANONICAL_DOMAIN}/blog`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.data.meta_title ?? uid,
        "item": DOMAIN_PAGE,
      },
    ],
  };

  return <>
    <SchemaMarkup type="BlogPosting" data={blogPostingSchema} />
    <SchemaMarkup type="BreadcrumbList" data={breadcrumbSchema} />
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
             <Box
          id="imageSlice"
          sx={{
            marginTop:'26px',
            width: '100%',
            maxWidth: '1200px',
            height: 'auto',
            position: 'relative',
            '& img': {
              width: '100%',
              height: 'auto',
            }
          }}
        >
        <Image
          src={page?.data?.image?.url || ""}
          alt={page?.data?.image?.alt || ""}
          width={1200}
          height={300}
          priority
          sizes="(max-width: 600px) 100vw, 50vw"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
          
          // src={page?.data?.image?.url}
          // alt={"Miniswimmer Academy"}
          // layout="fill"
          // objectFit="cover"
          // objectPosition="center"
          // priority
        /> 
                
              </Box>
        {/* <pre>{JSON.stringify(page?.data?.slices[1], null, 2 )}</pre> */}
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
    
    // Obtener todos los documentos de tipo "blog"
    const pages = await client.getAllByType("blog");
    
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

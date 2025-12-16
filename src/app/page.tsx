import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";

import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

// import HpHeader from '@/app/components/shared/header/HpHeader';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';
import { Box, Grid, Typography, Container, Stack, Button } from "@mui/material";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
const DOMAIN:string="https://ema.energica.city";


export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}



export default async function Page() {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());
  const DOMAIN_PAGE:string=`${DOMAIN}${page.url}`;
  
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
  </>
}

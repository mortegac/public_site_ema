import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

// import HpHeader from '@/app/components/shared/header/HpHeader';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';
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
    title: page.data.meta_title,
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

  return <>
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

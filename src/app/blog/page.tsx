import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", "blog").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export default async function BlogPage() {
  const client = createClient();
  const page = await client.getByUID("page", "blog").catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />
}

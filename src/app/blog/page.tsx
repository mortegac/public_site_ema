import type { Metadata } from "next";
import HpHeaderNew from "@/app/components/shared/header/HpHeaderNew";
import { createClient } from "@/prismicio";
import { CANONICAL_DOMAIN } from "@/utils/seo-config";
import { BLOG_ARTICLES } from "@/data/blog-articles";
import BlogClientContent from "./BlogClientContent";

export const metadata: Metadata = {
  title: "Blog sobre Electromovilidad en Chile",
  description: "Artículos sobre cargadores eléctricos, normativa SEC y electromovilidad empresarial en Chile.",
  alternates: {
    canonical: `${CANONICAL_DOMAIN}/blog`,
  },
  openGraph: {
    url: `${CANONICAL_DOMAIN}/blog`,
    title: "Blog sobre Electromovilidad | Energica City",
    description: "Artículos sobre cargadores eléctricos, normativa SEC y electromovilidad empresarial en Chile.",
  },
};

const STATIC_THUMB_OVERRIDES: Record<string, string> = {
  'conoce-nuestra-metodologia-propia': '/images/post/01_370x246.png',
}

export default async function BlogPage() {
  const client = createClient();
  const posts = await client.getAllByType("blog", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: CANONICAL_DOMAIN },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${CANONICAL_DOMAIN}/blog` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blog Enérgica City — Electromovilidad y Cargadores EV en Chile",
    url: `${CANONICAL_DOMAIN}/blog`,
    numberOfItems: BLOG_ARTICLES.length,
    itemListElement: BLOG_ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${CANONICAL_DOMAIN}/blog/${a.uid}`,
      name: a.title,
    })),
  };

  const prismicPosts = posts.map((post) => ({
    uid: post.uid,
    title: String(post.data.meta_title ?? post.uid),
    description: String(post.data.meta_description ?? ''),
    date: post.first_publication_date ?? '',
    imageUrl:
      (post.data.meta_image as { url?: string })?.url ??
      (post.data.image as { url?: string })?.url ??
      STATIC_THUMB_OVERRIDES[post.uid] ??
      '',
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <HpHeaderNew />
      <BlogClientContent prismicPosts={prismicPosts} staticArticles={BLOG_ARTICLES} />
    </>
  );
}

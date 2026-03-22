import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container, Box, Typography, Card, CardContent, CardActionArea } from "@mui/material";
import HpHeaderNew from "@/app/components/shared/header/HpHeaderNew";
import { createClient } from "@/prismicio";
import { CANONICAL_DOMAIN } from "@/utils/seo-config";

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

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HpHeaderNew />
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, fontWeight: 700, mb: 1 }}>
            Blog
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: "1.1rem" }}>
            Artículos sobre electromovilidad, normativa SEC y cargadores eléctricos en Chile.
          </Typography>

          {posts.length === 0 ? (
            <Typography color="text.secondary">No hay artículos publicados aún.</Typography>
          ) : (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 4 }}>
              {posts.map((post) => {
                const title = post.data.meta_title ?? post.uid;
                const description = post.data.meta_description ?? "";
                const imageUrl = (post.data.meta_image as { url?: string })?.url ?? (post.data.image as { url?: string })?.url ?? "";
                const imageAlt = (post.data.meta_image as { alt?: string })?.alt ?? (post.data.image as { alt?: string })?.alt ?? title ?? "";
                const date = formatDate(post.first_publication_date);

                return (
                  <Card
                    key={post.uid}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      transition: "box-shadow 0.2s",
                      "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.14)" },
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      href={`/blog/${post.uid}`}
                      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                    >
                        {imageUrl && (
                          <Box sx={{ width: "100%", aspectRatio: "16/9", position: "relative", overflow: "hidden", borderRadius: "8px 8px 0 0" }}>
                            <Image
                              src={imageUrl}
                              alt={imageAlt}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                            />
                          </Box>
                        )}
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          {date && (
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                              {date}
                            </Typography>
                          )}
                          <Typography
                            variant="h2"
                            component="h2"
                            sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1.5, lineHeight: 1.4 }}
                          >
                            {title}
                          </Typography>
                          {description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {description}
                            </Typography>
                          )}
                        </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}

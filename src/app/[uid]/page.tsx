import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();

  try {
    console.log("=== DIAGNÓSTICO DE PRISMIC ===");
    console.log("Repository name:", process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || "energica-public-site");
    
    // Obtener todos los documentos de tipo "page"
    const pages = await client.getAllByType("page");
    
    console.log("=== TODOS LOS DOCUMENTOS DE PRISMIC ===");
    console.log("Total de páginas encontradas:", pages.length);
    
    if (pages.length === 0) {
      console.log("⚠️  NO SE ENCONTRARON PÁGINAS EN PRISMIC");
      console.log("Verifica que:");
      console.log("1. Tengas páginas creadas en el repositorio 'energica-public-site'");
      console.log("2. Las páginas estén publicadas (no en borrador)");
      console.log("3. El repositorio sea correcto");
    }
    
    pages.forEach((page, index) => {
      console.log(`\n--- Página ${index + 1} ---`);
      console.log("UID:", page.uid);
      console.log("ID:", page.id);
      console.log("Tipo:", page.type);
      console.log("Meta Title:", page.data.meta_title);
      console.log("Meta Description:", page.data.meta_description);
      console.log("Número de slices:", page.data.slices?.length || 0);
      console.log("Fecha de publicación:", page.first_publication_date);
      console.log("Última actualización:", page.last_publication_date);
      console.log("Estado:", page.data.slices ? "✅ Con contenido" : "❌ Sin slices");
    });

    // Intentar obtener información del repositorio
    try {
      const repository = await client.getRepository();
      console.log("\n=== INFORMACIÓN DEL REPOSITORIO ===");
      console.log("Repository object:", repository);
      console.log("Tipos de documentos disponibles:", Object.keys(repository.types || {}));
    } catch (error) {
      console.log("Error al obtener información del repositorio:", error);
    }

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

import { NextResponse } from "next/server";
import { createClient } from "@prismicio/client";

export async function GET() {
  try {
    const client = createClient("energica-public-site");
    
    // Intentar obtener el documento de diferentes maneras
    let productsPage = null;
    let errorDetails = null;

    // Primera opción: tipo "products" con UID "products"
    try {
      productsPage = await client.getByUID("products", "products");
    } catch (error1: any) {
      errorDetails = error1?.message || String(error1);
      
      // Segunda opción: tipo "page" con UID "products"
      try {
        productsPage = await client.getByUID("page", "products");
      } catch (error2: any) {
        errorDetails = `${errorDetails}; Error 2: ${error2?.message || String(error2)}`;
        
        // Tercera opción: obtener todos los documentos de tipo "products"
        try {
          const allProducts = await client.getAllByType("products");
          if (allProducts && allProducts.length > 0) {
            productsPage = allProducts[0];
          }
        } catch (error3: any) {
          errorDetails = `${errorDetails}; Error 3: ${error3?.message || String(error3)}`;
        }
      }
    }
    
    if (!productsPage) {
      return NextResponse.json(
        { 
          error: "Products page not found",
          details: errorDetails,
          suggestions: [
            "Verifica que el documento existe en Prismic",
            "Verifica que el tipo de documento es 'products' o 'page'",
            "Verifica que el UID del documento es 'products'"
          ]
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: productsPage.data,
      slices: productsPage.data.slices || [],
      uid: productsPage.uid,
      type: productsPage.type,
    });
  } catch (error: any) {
    console.error("Error fetching products from Prismic:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch products",
        details: error?.message || String(error),
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}

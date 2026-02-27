import { Product } from "./index";

/**
 * Fetches product stock from the database using the Product repository.
 * Returns stock value or null if product not found or error occurs.
 * This allows graceful fallback to Prismic CMS data in the UI.
 */
export const fetchProductStock = async (
  productId: string
): Promise<{ stock: number | null }> => {
  try {
    const product = await Product.get({ input: { productId } });
    return { stock: product.stock ?? null };
  } catch {
    // Return null so UI can fallback to Prismic data
    return { stock: null };
  }
};

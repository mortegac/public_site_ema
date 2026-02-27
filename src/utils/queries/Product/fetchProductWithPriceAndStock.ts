import { configureAmplify } from "@/utils/amplify-config";
import { fetchLastPrice } from "../Price/fetchLastPrice";
import { fetchProductStock } from "./fetchProductStock";

configureAmplify();

export type ProductWithPriceAndStock = {
  cost: number | null;
  stock: number | null;
  priceId: string | null;
};

/**
 * Fetches a product by id and returns its latest price (cost) and stock.
 * Uses fetchLastPrice for the current price and fetchProductStock (Product repository) for stock.
 */
export const fetchProductWithPriceAndStock = async (
  productId: string
): Promise<ProductWithPriceAndStock> => {
  const result: ProductWithPriceAndStock = { cost: null, stock: null, priceId: null };

  try {
    const [stockRes, priceRes] = await Promise.all([
      fetchProductStock(productId).catch(() => ({ stock: null })),
      fetchLastPrice({ productId, type: "P" }).catch(() => null),
    ]);

    result.stock = stockRes.stock;
    result.cost = priceRes?.cost != null ? priceRes.cost : null;
    result.priceId = priceRes?.priceId ?? null;
  } catch {
    // Return nulls so UI can fallback to Prismic data
  }

  return result;
};

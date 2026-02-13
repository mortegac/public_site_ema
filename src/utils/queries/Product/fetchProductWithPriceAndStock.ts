import { MainTypes } from "@types";
import { generateClient } from "aws-amplify/data";
import { configureAmplify } from "@/utils/amplify-config";
import { fetchLastPrice } from "../Price/fetchLastPrice";

configureAmplify();
const client = generateClient<MainTypes>();

export type ProductWithPriceAndStock = {
  cost: number | null;
  stock: number | null;
  priceId: string | null;
};

/**
 * Fetches a product by id and returns its latest price (cost) and stock.
 * Uses fetchLastPrice for the current price and Product.get for stock.
 */
export const fetchProductWithPriceAndStock = async (
  productId: string
): Promise<ProductWithPriceAndStock> => {
  const result: ProductWithPriceAndStock = { cost: null, stock: null, priceId: null };

  try {
    const [productRes, priceRes] = await Promise.all([
      client.models.Product.get({ productId }, { selectionSet: ["stock"] }),
      fetchLastPrice({ productId, type: "P" }).catch(() => null),
    ]);

    result.stock =
      productRes.data?.stock != null ? productRes.data.stock : null;
    result.cost = priceRes?.cost != null ? priceRes.cost : null;
    result.priceId = priceRes?.priceId ?? null;
  } catch {
    // Return nulls so UI can fallback to Prismic data
  }

  return result;
};

import { QueryFactory } from "../QueryFactory";
import { fetchProductStock } from "./fetchProductStock";

export const Product = QueryFactory<"Product">({ name: "Product" });
export { fetchProductStock };
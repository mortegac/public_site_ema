import { QueryFactory } from "../QueryFactory";
export { fetchLastPrice } from "./fetchLastPrice";

export const Price = QueryFactory<"Price">({ name: "Price" });
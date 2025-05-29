import { MainTypes } from "../../../../amplify/data/main.schema";
import { QueryFactory } from "../QueryFactory";
export { fetchLastPrice } from "./fetchLastPrice";

export const Price = QueryFactory<"Price">({ name: "Price" });
export type PriceType = MainTypes["Price"]["type"];
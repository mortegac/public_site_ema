import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const Product = QueryFactory<"Product">({ name: "Product" });
export type ProductType = MainTypes["Product"]["type"];
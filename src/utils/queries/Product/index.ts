import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const Product = QueryFactory<"Product">({ name: "Product" });
export type ProductType = MainTypes["Product"]["type"];
import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const ShoppingCart = QueryFactory<"ShoppingCart">({ name: "ShoppingCart" });
export type ShoppingCartType = MainTypes["ShoppingCart"]["type"];
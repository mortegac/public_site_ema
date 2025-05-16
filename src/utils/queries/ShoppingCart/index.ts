import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const ShoppingCart = QueryFactory<"ShoppingCart">({ name: "ShoppingCart" });
export type ShoppingCartType = MainTypes["ShoppingCart"]["type"];
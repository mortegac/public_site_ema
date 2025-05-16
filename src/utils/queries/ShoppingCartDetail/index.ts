import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const ShoppingCartDetail = QueryFactory<"ShoppingCartDetail">({ name: "ShoppingCartDetail" });
export type ShoppingCartDetailType = MainTypes["ShoppingCartDetail"]["type"];
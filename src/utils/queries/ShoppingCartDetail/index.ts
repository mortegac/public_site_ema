import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const ShoppingCartDetail = QueryFactory<"ShoppingCartDetail">({ name: "ShoppingCartDetail" });
export type ShoppingCartDetailType = MainTypes["ShoppingCartDetail"]["type"];
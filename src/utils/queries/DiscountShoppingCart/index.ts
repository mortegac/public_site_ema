import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const DiscountShoppingCart = QueryFactory<"DiscountShoppingCart">({ name: "DiscountShoppingCart" });
export type DiscountShoppingCartType = MainTypes["DiscountShoppingCart"]["type"];
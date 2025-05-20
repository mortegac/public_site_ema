import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const DiscountShoppingCart = QueryFactory<"DiscountShoppingCart">({ name: "DiscountShoppingCart" });
export type DiscountShoppingCartType = MainTypes["DiscountShoppingCart"]["type"];
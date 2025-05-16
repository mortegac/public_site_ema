import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const Discount = QueryFactory<"Discount">({ name: "Discount" });
export type DiscountType = MainTypes["Discount"]["type"];

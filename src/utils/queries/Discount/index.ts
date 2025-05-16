import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const Discount = QueryFactory<"Discount">({ name: "Discount" });
export type DiscountType = MainTypes["Discount"]["type"];

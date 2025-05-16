import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const Customer = QueryFactory<"Customer">({ name: "Customer" });
export type CustomerType = MainTypes["Customer"]["type"];


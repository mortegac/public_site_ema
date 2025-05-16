import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const Estimate = QueryFactory<"Estimate">({ name: "Estimate" });
export type EstimateType = MainTypes["Estimate"]["type"];





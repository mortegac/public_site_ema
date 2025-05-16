import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const Estimate = QueryFactory<"Estimate">({ name: "Estimate" });
export type EstimateType = MainTypes["Estimate"]["type"];





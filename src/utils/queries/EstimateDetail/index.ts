import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const EstimateDetail = QueryFactory<"EstimateDetail">({ name: "EstimateDetail" });
export type EstimateDetailType = MainTypes["EstimateDetail"]["type"];
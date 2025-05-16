import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const EstimateDetail = QueryFactory<"EstimateDetail">({ name: "EstimateDetail" });
export type EstimateDetailType = MainTypes["EstimateDetail"]["type"];
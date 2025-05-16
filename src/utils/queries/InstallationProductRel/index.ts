import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const InstallationProductRel = QueryFactory<"InstallationProductRel">({ name: "InstallationProductRel" });
export type InstallationProductRelType = MainTypes["InstallationProductRel"]["type"];
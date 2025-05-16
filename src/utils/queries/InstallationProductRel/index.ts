import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const InstallationProductRel = QueryFactory<"InstallationProductRel">({ name: "InstallationProductRel" });
export type InstallationProductRelType = MainTypes["InstallationProductRel"]["type"];
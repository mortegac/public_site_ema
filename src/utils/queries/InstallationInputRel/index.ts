import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const InstallationInputRel = QueryFactory<"InstallationInputRel">({ name: "InstallationInputRel" });
export type InstallationInputRelType = MainTypes["InstallationInputRel"]["type"];


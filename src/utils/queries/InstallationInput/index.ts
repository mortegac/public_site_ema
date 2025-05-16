import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const InstallationInput = QueryFactory<"InstallationInput">({ name: "InstallationInput" });
export type InstallationInputType = MainTypes["InstallationInput"]["type"];
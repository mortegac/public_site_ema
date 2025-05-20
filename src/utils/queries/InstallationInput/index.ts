import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const InstallationInput = QueryFactory<"InstallationInput">({ name: "InstallationInput" });
export type InstallationInputType = MainTypes["InstallationInput"]["type"];
import { MainTypes } from "../../../../amplify/data/resource";
import { QueryFactory } from "../QueryFactory";

export const InstallationRecipe = QueryFactory<"InstallationRecipe">({ name: "InstallationRecipe" });
export type InstallationRecipeType = MainTypes["InstallationRecipe"]["type"];


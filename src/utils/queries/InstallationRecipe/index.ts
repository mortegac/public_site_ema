import { MainTypes } from "../../../data/main.schema";
import { QueryFactory } from "../QueryFactory";

export const InstallationRecipe = QueryFactory<"InstallationRecipe">({ name: "InstallationRecipe" });
export type InstallationRecipeType = MainTypes["InstallationRecipe"]["type"];


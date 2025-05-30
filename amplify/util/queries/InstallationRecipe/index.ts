import { QueryFactory } from "../QueryFactory";

export const InstallationRecipe = QueryFactory<"InstallationRecipe">({ name: "InstallationRecipe" });
export { getFullRecipe, ReturnTypeGetFullRecipe } from "./getFullRecipe";

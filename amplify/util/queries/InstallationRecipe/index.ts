import { QueryFactory } from "../QueryFactory";

export const InstallationRecipe = QueryFactory<"InstallationRecipe">({ name: "InstallationRecipe" });
export { getFullRecipe,  } from "./getFullRecipe";
export type { ReturnTypeGetFullRecipe } from "./getFullRecipe";
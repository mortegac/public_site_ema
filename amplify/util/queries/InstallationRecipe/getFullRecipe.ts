import { MainTypes } from "@types";
import type { SelectionSet } from "aws-amplify/data";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../../error";

const client = generateClient<MainTypes>();

const selectionSet = [
    "installationRecipeId",
    "InstallationInputs.*",
    "InstallationInputs.InstallationInput.*",
    "InstallationProducts.*",
    "InstallationProducts.Product.*",
] as const;

export type ReturnTypeGetFullRecipe = SelectionSet<
    MainTypes["InstallationRecipe"]["type"],
    typeof selectionSet
>;

export const getFullRecipe = async (
    props: {
        input: {
            installationRecipeId: string;
        };
    }): Promise<ReturnTypeGetFullRecipe> => {

    const { installationRecipeId } = props.input;

    const { data, errors } = await client.models.InstallationRecipe.get({ installationRecipeId }, {
        selectionSet,
    });

    if (data === null) throw throwError(`InstallationRecipe was not found`);

    if (errors !== undefined) throw throwError(`Error fetching InstallationRecipe: ${JSON.stringify(errors)}`);

    return data;
};
import { MainTypes } from "@types";
import type { SelectionSet } from "aws-amplify/data";
import { generateClient } from "aws-amplify/data";

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
    try {
        const { installationRecipeId } = props.input;

        const { data, errors } = await client.models.InstallationRecipe.get({ installationRecipeId }, {
            selectionSet,
        });

        if (data === null) throw (`InstallationRecipe was not found`);

        if (errors !== undefined) throw (`Error fetching InstallationRecipe: ${JSON.stringify(errors)}`);

        return data as ReturnTypeGetFullRecipe;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
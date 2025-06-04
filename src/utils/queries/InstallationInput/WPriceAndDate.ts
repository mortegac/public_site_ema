import { MainTypes } from "@types";
import type { SelectionSet } from "aws-amplify/data";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../../error";
import { fetchLastPrice } from "../Price/fetchLastPrice";
const client = generateClient<MainTypes>();

const selectionSet = [
    "installationInputId",
    "quantity",
    "amountPerInstallationMeter",
    "usagePercentage",
    "InstallationInput.*"
] as const;

export type FetchInstallationInputRel = SelectionSet<
    MainTypes["InstallationInputRel"]["type"],
    typeof selectionSet
>;

const selectionSetReturnType = [
    "installationInputId",
    "quantity",
    "amountPerInstallationMeter",
    "usagePercentage",
    "InstallationInput.*",
    "InstallationInput.Prices.priceId",
    "InstallationInput.Prices.cost"
] as const;

export type IIRWPrices = SelectionSet<
    MainTypes["InstallationInputRel"]["type"],
    typeof selectionSetReturnType
>;

export const fetchIIPricesOfRecipe = async (
    props: {
        installationRecipeId: string,
    }): Promise<IIRWPrices[]> => {
    try {

        const { data, errors } = await client.models.InstallationInputRel.list({
            selectionSet,
            filter: {
                installationRecipeId: {
                    eq: props.installationRecipeId
                }
            }
        });

        if (errors) {
            throw throwError(errors);
        }

        const prices = await Promise.all(data.map(async (e) => {
            const res = await fetchLastPrice({ installationInputId: e.installationInputId, type: "II" });
            return {
                ...e, InstallationInput: {
                    ...e.InstallationInput,
                    Prices: [{ ...res }]
                }
            };
        }));

        return prices;
    } catch (error) {
        throw throwError(error);
    }
};
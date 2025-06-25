import { MainTypes } from "@types";
import type { SelectionSet } from "aws-amplify/data";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../../error";

const client = generateClient<MainTypes>();

const selectionSet = [
    "formId",
    "isWallbox",
    "isPortable",
    "isHouse",
    "distance",
    "numberOfChargers",
    "customerId",
    "Customer.*",
    "Estimates.*",
    "Estimates.EstimateDetails.*",
] as const;

export type FetchedClientForm = SelectionSet<
    MainTypes["ClientForm"]["type"],
    typeof selectionSet
>;

export const fetchClientFormAndEstimates = async (
    props: {
        formId: string;
    }): Promise<FetchedClientForm> => {

    const { formId } = props;

    const { data, errors } = await client.models.ClientForm.get({ formId }, {
        selectionSet,
    });

    if (data === null) throw throwError(`ClientForm was not found`);

    if (errors !== undefined) throw throwError(`Error fetching ClientForm: ${JSON.stringify(errors)}`);

    return data;
};

import { MainTypes } from "../../../../amplify/data/resource";
import { generateClient, type SelectionSet } from "aws-amplify/data";
import { throwError } from "../../error";

const client = generateClient<MainTypes>();

const selectionSet = [
    "priceId",
    "cost"
] as const;

export type FetchedPricesType = SelectionSet<
    MainTypes["Price"]["type"],
    typeof selectionSet
>;

type fetchLastPriceType = {
    installationInputId: string;
    type: "II";
} | {
    productId: string;
    type: "P";
};

export const fetchLastPrice = async (props: fetchLastPriceType,): Promise<FetchedPricesType> => {
    if (props.type == "II") {
        const { installationInputId } = props;
        const { data, errors } = await client.models.Price.listPriceByInstallationInputIdAndStartDate({
            installationInputId: installationInputId
        }, {
            selectionSet,
            sortDirection: "DESC",
            limit: 1
        });

        if (data === null || errors !== undefined) {
            throwError(`Price with id: '${installationInputId}' not found`);
        }

        return data[0];
    }
    else {
        const { productId } = props;

        const { data, errors } = await client.models.Price.listPriceByProductIdAndStartDate({
            productId: productId
        }, {
            selectionSet,
            sortDirection: "DESC",
            limit: 1
        });

        if (data === null || errors !== undefined) {
            throwError(`Price with id: '${productId}' was not found`);
        }

        return data[0];
    }

};
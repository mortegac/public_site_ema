import { ParameterTypes } from "@types";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../../error";

const client = generateClient<ParameterTypes>();


export const increaseParameterBuyOrder: () => Promise<string> = async () => {
    const { data: oldValue, errors } = (
        await client.models.Parameter.get({ parameterId: "curr-buy-order-number" })
    );

    if (errors !== undefined || oldValue === null) {
        throwError("error fetching old buyOrder value");
    }

    const newValue: number = parseInt(oldValue?.value || "0") + 1;

    const { errors: newErrors } = await client.models.Parameter.update({
        parameterId: "curr-buy-order-number",
        value: newValue.toString(),
    }, {
        selectionSet: ["value", "parameterId"],
    });

    if (newErrors !== undefined || oldValue === null) {
        throwError("error updating new old buyOrder value");
    }

    return newValue.toString();

};
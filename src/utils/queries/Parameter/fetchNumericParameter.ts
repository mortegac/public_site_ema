import { ParameterTypes } from "@types";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../../error";

const client = generateClient<ParameterTypes>();

export const fetchNumericParameter = async (props: { parameterEncId: string; default?: string; }) => {

    const { parameterEncId } = props;

    const def = props.default || "0";

    const { data, errors } = await client.models.ParameterEnc.get({ parameterEncId }, {
        selectionSet: ["Parameters.*", "updatedAt", "parameterEncId", "description", "createdAt"],
    });

    if (data === null || errors !== undefined) {
        throwError(`Parameter fetch of ${parameterEncId} was unsuccessfull`);
    }

    return parseFloat(data?.Parameters[0]?.value || def);
};
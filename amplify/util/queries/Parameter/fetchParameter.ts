import { ParameterTypes } from "@types";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../../error";

const client = generateClient<ParameterTypes>();

export const fetchParameter = async (props: { parameterEncId: string; }) => {

    const { parameterEncId } = props;

    const { data, errors } = await client.models.ParameterEnc.get({ parameterEncId }, {
        selectionSet: ["Parameters.*", "updatedAt", "parameterEncId", "description", "createdAt",]
    });

    if (data === null || errors !== undefined) {
        throwError(`Parameter fetch of ${parameterEncId} was unsuccessfull`);
    }
    return data;
};
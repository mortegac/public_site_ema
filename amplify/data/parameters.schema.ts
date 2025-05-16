import { type ClientSchema, a } from "@aws-amplify/backend";
import { processEstimate } from "../resolvers/ProcessEstimate/resource";

export const ParameterSchema = a
    .schema({
        ParameterEnc: a
            .model({
                parameterEncId: a.id().required(),
                description: a.string().required(),
                Parameters: a.hasMany("Parameter", "parameterEncId"),
            })
            .identifier(["parameterEncId"]),
        Metadata: a
            .model({
                metadataId: a.id().required(),
                key: a.string().default(""),
                value: a.string().default(""),
                parameterId: a.string(),
                Parameter: a.belongsTo("Parameter", "parameterId"),
            })
            .identifier(["metadataId"]),
        Parameter: a
            .model({
                parameterId: a.id().required(),
                label: a.string().required(),
                value: a.string().required(),
                parameterEncId: a.id(),
                ParameterEnc: a.belongsTo("ParameterEnc", "parameterEncId"),
                Metadata: a.hasMany("Metadata", "parameterId"),
            })
            .identifier(["parameterId"]),
    })
    .authorization((allow) => [
        allow.guest(),
        allow.authenticated(),
        allow.publicApiKey(),
        allow.resource(processEstimate),

    ]);

export type ParameterTypes = ClientSchema<typeof ParameterSchema>;

import { throwError } from "@error";
import { logger } from "@log";
import { MainTypes } from "@types";
import { client } from "@client";

type MainTypesModels = Omit<MainTypes, "TimeSlot">;

export const validateResponse = <R>(
    response: { data: R | null; errors?: any; },
    operation: string,
    input?: any
): R => {
    const { data, errors } = response;

    if (errors) {
        logger.error(`${name} ${operation} failed with errors:`, errors, input);
        throw errors;
    }

    if (data === null || data === undefined) {
        const errorMsg = `No data returned for ${name} ${operation}`;
        logger.error(errorMsg, input);
        throw new Error(errorMsg);
    }

    return data;
};


export const QueryFactory = function <T extends keyof MainTypesModels>(props: {
    name: T;
}) {
    type CreateInput = MainTypes[T]["createType"];
    type UpdateInput = MainTypes[T]["updateType"];
    type DeleteInput = MainTypes[T]["deleteType"];
    type Identifier = MainTypes[T]["identifier"];
    type ModelType = MainTypes[T]["type"];

    const { name } = props;
    const model = client.models[name] as any;



    const create = async (props: { input: CreateInput; }): Promise<ModelType> => {
        try {
            const { input } = props;

            // @ts-ignore
            logger.info(`Creating ${name}`, JSON.stringify(input));
            // @ts-ignore
            const response = await model.create(input);
            // @ts-ignore
            const data = validateResponse(response, "create", input);

            logger.info(`${name} created successfully`);
            return data as ModelType;
        } catch (error) {
            throw throwError(`${name} could not be created`, error);
        }
    };

    const update = async (props: { input: UpdateInput; }): Promise<ModelType> => {
        try {
            const { input } = props;
            // @ts-ignore
            logger.info(`Updating ${name}`, JSON.stringify(input));
            // @ts-ignore
            const response = await model.update(input);
            // @ts-ignore
            const data = validateResponse(response, "update", input);

            logger.info(`${name} updated successfully`);
            return data as ModelType;
        } catch (error) {
            throw throwError(`${name} could not be updated`, error);
        }
    };

    const deleteItem = async (props: { input: DeleteInput; }): Promise<ModelType> => {
        try {
            const { input } = props;

            logger.info(`Deleting ${name}`, JSON.stringify(input));
            const response = await model.delete(input);
            const data = validateResponse(response, "delete", input);

            logger.info(`${name} deleted successfully`);
            return data as ModelType;
        } catch (error) {
            throw throwError(`${name} could not be deleted`, error);
        }
    };

    const get = async (props: { input: Identifier; }): Promise<ModelType> => {
        try {
            const { input } = props;

            logger.info(`Getting ${name}`, JSON.stringify(input));
            const response = await model.get(input);
            const data = validateResponse(response, "get", input);

            return data as ModelType;
        } catch (error) {
            throw throwError(`${name} could not be found`, error);
        }
    };

    const list = async (props: { filter?: any; limit?: number; } = {}): Promise<ModelType[]> => {
        try {
            const { filter, limit } = props;

            logger.info(`Listing ${name}`, { filter, limit });
            const response = await model.list({ filter, limit });

            const { data, errors } = response;

            if (errors) {
                logger.error(`${name} list failed with errors:`, errors);
                throw errors;
            }

            const result = data || [];
            logger.info(`Found ${result.length} ${name} items`);

            return result as ModelType[];
        } catch (error) {
            throw throwError(`${name} list could not be retrieved`, error);
        }
    };

    return {
        create,
        update,
        delete: deleteItem,
        get,
        list,
    };
};
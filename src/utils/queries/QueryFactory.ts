import { logger } from "../log";
import { MainTypes } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../error";

const client = generateClient<MainTypes>();

export const QueryFactory = function <T extends keyof MainTypes>(props: {
    name: keyof MainTypes;
}) {
    type createItemType = (props: {
        input: MainTypes[T]["createType"];
    }) => Promise<MainTypes[T]["type"]>;

    type updateItemType = (props: {
        input: MainTypes[T]["updateType"];
    }) => Promise<MainTypes[T]["type"]>;

    type deleteItemType = (props: {
        input: MainTypes[T]["deleteType"];
    }) => Promise<MainTypes[T]["type"]>;

    type getItem = (props: {
        input: MainTypes[T]["identifier"];
    }) => Promise<MainTypes[T]["type"]>;

    type listItem = (props: { filter?: any, limit?: number; }) => Promise<MainTypes[T]["type"][]>;

    const { name } = props;

    const model = client.models[name] as any;

    const create: createItemType = async (props) => {
        try {
            // @ts-ignore
            const input: unknown = props.input;

            logger.info(`creating ${name}`);
            // @ts-ignore
            const { data, errors } = await model.create(input);

            if (data === null) {
                throw `data was not returned in ${JSON.stringify(input)}`;
            }

            if (data === null || errors !== undefined) {
                throw errors;
            }

            logger.info(`${name} created successfully`);

            return data as MainTypes[T]["type"];
        } catch (error) {
            throw throwError(`${name} could not be created, ${JSON.stringify(error)}`);
        }
    };

    const update: updateItemType = async (props) => {
        try {
            // @ts-ignore
            const input: unknown = props.input;
            logger.info(`updating ${name}`);
            // @ts-ignore
            const { data, errors } = await model.update(input);

            if (data === null) {
                throw `data was not returned in ${JSON.stringify(input)}`;
            }

            if (errors !== undefined) {
                throw errors;
            }

            logger.info(`${name} updated successfully`);

            return data as MainTypes[T]["type"];
        } catch (error) {
            throw throwError(`${name} could not be updated; ${JSON.stringify(error)}`);
        }
    };

    const deleteItem: deleteItemType = async (props) => {
        try {
            const input = props.input;

            logger.info(`deleting ${name}`);

            const { data, errors } = await model.delete(input);

            if (data === null) {
                throw `data was not returned in ${JSON.stringify(input)}`;
            }

            if (errors !== undefined) {
                throw errors;
            }

            logger.info(`${name} deleted successfully`);

            return data as MainTypes[T]["type"];
        } catch (error) {
            throw throwError(`${name} could not be deleted; ${JSON.stringify(error)}`);

        }
    };

    const get: getItem = async (props) => {
        try {
            const input = props.input;

            const { data, errors } = await model.get(input);

            if (data === null) {
                throw `data was not returned in ${JSON.stringify(input)}`;
            }

            if (errors !== undefined) {
                throw errors;
            }

            return data as MainTypes[T]["type"];
        } catch (error) {
            throw throwError(`${name} could not be found; ${JSON.stringify(error)}`);
        }
    };

    const list: listItem = async ({ filter, limit }) => {
        try {
            const { data, errors } = await model.list({ filter, limit });


            if (data === null) {
                throw `data was not found`;
            }

            if (errors !== undefined) {
                throw errors;
            }

            return data as MainTypes[T]["type"][];
        } catch (error) {
            throw throwError(`${name} could not be found; ${JSON.stringify(error)}`);
        }
    };

    return {
        create,
        update,
        delete: deleteItem,
        get,
        list
    };
};



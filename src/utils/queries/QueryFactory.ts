import { logger } from "../log";
import { MainTypes } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../error";
import { json } from "stream/consumers";

const client = generateClient<MainTypes>();

export function QueryFactory<T extends keyof MainTypes>(props: {
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

    type listItem = (filter: any) => Promise<MainTypes[T]["type"][]>;

    const { name } = props;

    const model = client.models[name] as any;

    const create: createItemType = async (props) => {
        const { input } = props;

        logger.info(`creating ${name} ${JSON.stringify(input)}`);

        const { data, errors } = await model.create(input);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be created; ${errors !== undefined ? `Errors: ${JSON.stringify(errors)}` : ""}`);
        }

        logger.info(`${name} created successfully`);

        return data;
    };

    const update: updateItemType = async (props) => {
        const { input } = props;

        logger.info(`updating ${name}  ${JSON.stringify(props.input)}`);

        const { data, errors } = await model.update(input);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be updated; ${errors !== undefined ? `Errors: ${JSON.stringify(errors)}` : ""}`);
        }

        logger.info(`${name} updated successfully`);

        return data;
    };

    const deleteItem: deleteItemType = async (props) => {
        const { input } = props;

        logger.info(`deleting ${name}  ${JSON.stringify(props.input)}`);

        const { data, errors } = await model.delete(input);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be deleted; ${errors !== undefined ? `Errors: ${JSON.stringify(errors)}` : ""}`);
        }

        logger.info(`${name} deleted successfully`);

        return data;
    };

    const get: getItem = async (props) => {
        const { input } = props;

        const { data, errors } = await model.get(input);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be found; ${errors !== undefined ? `Errors: ${JSON.stringify(errors)}` : ""}`);
        }

        return data;
    };

    const list: listItem = async ({ filter }) => {
        const { data, errors } = await model.list({ filter });

        if (data === null || errors !== undefined) {
            throwError(`${name} were not found; ${errors !== undefined ? `Errors: ${JSON.stringify(errors)}` : ""}`);
        }

        return data;
    };

    return {
        create,
        update,
        delete: deleteItem,
        get,
        list
    };
}



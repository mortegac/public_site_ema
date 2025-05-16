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

    const create: createItemType = async (props) => {
        const { input } = props;

        logger.info(`creating ${name} ${JSON.stringify(input)}`);

        const model = await client.models[name] as any;

        const { data, errors } = model.create(input);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be created, ${errors !== undefined ? JSON.stringify(errors) : ""}`);
        }

        logger.info(`${name} created successfully`);

        return data;
    };

    const update: updateItemType = async (props) => {
        const { input } = props;

        logger.info(`updating ${name}  ${JSON.stringify(props.input)}`);

        const model = await client.models[name] as any;

        const { data, errors } = await model.update(input as MainTypes[T]["updateType"]);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be updated ${errors !== undefined ? JSON.stringify(errors) : ""}`);
        }

        logger.info(`${name} updated successfully`);

        return data;
    };

    const deleteItem: deleteItemType = async (props) => {
        const { input } = props;

        logger.info(`deleting ${name}  ${JSON.stringify(props.input)}`);

        const model = await client.models[name] as any;

        const { data, errors } = await model.delete(input);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be deleted ${errors !== undefined ? JSON.stringify(errors) : ""}`);
        }

        logger.info(`${name} deleted successfully`);

        return data;
    };

    const get: getItem = async (props) => {
        const { input } = props;

        const model = await client.models[name] as any;

        const { data, errors } = await model.get(input);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be found ${errors !== undefined ? JSON.stringify(errors) : ""}`);
        }

        return data;
    };

    const list: listItem = async ({ filter }) => {
        const model = await client.models[name] as any;

        console.log(filter);

        const { data, errors } = await model.list({ filter });

        if (data === null || errors !== undefined) {
            throwError(`${name} were not found; ${errors !== undefined ? JSON.stringify(errors) : ""}`);
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



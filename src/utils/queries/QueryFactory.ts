import { logger } from "../log";
import { MainTypes } from "@/data-schema";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../error";

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

    const createItem: createItemType = async (props) => {
        const { input } = props;

        logger.info(`creating ${name} ${JSON.stringify(input)}`);

        const model = await client.models[name] as any;

        const { data, errors } = model.create(input);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be created, ${JSON.stringify(input)}`);
        }

        logger.info(`${name} created successfully`);

        return data;
    };

    const updateItem: updateItemType = async (props) => {
        const { input } = props;

        logger.info(`updating ${name}  ${JSON.stringify(props.input)}`);

        const model = await client.models[name] as any;

        const { data, errors } = await model.update(input);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be updated`);
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
            throwError(`${name} could not be deleted`);
        }

        logger.info(`${name} deleted successfully`);

        return data;
    };

    const getItem: getItem = async (props) => {
        const { input } = props;

        const model = await client.models[name] as any;

        const { data, errors } = await model.get(input);

        if (data === null || errors !== undefined) {
            throwError(`${name} could not be found`);
        }

        return data;
    };

    const listItem: listItem = async (filter) => {
        const model = await client.models[name] as any;

        const { data, errors } = await model.list({ filter });

        if (data === null || errors !== undefined) {
            throwError(`${name} were not found`);
        }

        return data;
    };

    return {
        createItem,
        updateItem,
        deleteItem,
        getItem,
        listItem
    };
}



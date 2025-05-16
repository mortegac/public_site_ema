import { logger } from "./log";

export const throwError = (msg: string): never => {
    logger.error(msg);
    throw new Error(msg);
};
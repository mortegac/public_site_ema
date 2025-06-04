import { logger } from "./log";

export const throwError = (...args: any[]): never => {
    logger.error(args);
    throw new Error(JSON.stringify(args));
};
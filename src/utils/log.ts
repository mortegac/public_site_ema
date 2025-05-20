
export enum LogLevel {
    NONE = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
}

class Logger {
    private static instance: Logger;
    private level: LogLevel = LogLevel.INFO; // Default level
    // Make constructor private to enforce singleton pattern
    private constructor() {
    }

    // Get the singleton instance
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    // Set the current log level
    public setLevel(level: LogLevel): void {
        this.level = level;
    }

    // Get current log level
    public getLevel(): LogLevel {
        return this.level;
    }

    // Get level name from enum
    public getLevelName(): string {
        return LogLevel[this.level];
    }

    // Log methods for different levels
    public error(message: any, ...optionalParams: any[]): void {
        if (this.level >= LogLevel.ERROR) {
            console.error(JSON.stringify(`[ERROR] ${message}`, ...optionalParams));
        }
    }

    public warn(message: any, ...optionalParams: any[]): void {
        if (this.level >= LogLevel.WARN) {
            console.warn(JSON.stringify(`[WARN] ${message}`, ...optionalParams));
        }
    }

    public info(message: any, ...optionalParams: any[]): void {
        if (this.level >= LogLevel.INFO) {
            console.info(JSON.stringify(`[INFO] ${message}`, ...optionalParams));
        }
    }

    // Raw log without level checking (always outputs)
    public log(message: any, ...optionalParams: any[]): void {
        console.log(message, ...optionalParams);
    }
}

// Export a singleton instance
export const logger = Logger.getInstance();
const logLevel = parseInt(process.env.LOG_LEVEL?.toString() || "3");
logger.setLevel(logLevel as LogLevel);

// Example usage:
// import { logger, LogLevel } from './logger';
//
// // Set verbosity level
// logger.setLevel(LogLevel.DEBUG);
//
// // Use the logger
// logger.error('This is an error message');
// logger.warn('This is a warning message');
// logger.info('This is an info message');

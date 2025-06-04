export enum LogLevel {
    NONE = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
}

class Logger {
    private static instance: Logger;
    private level: LogLevel = LogLevel.INFO;

    private constructor() {
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public setLevel(level: LogLevel): void {
        this.level = level;
    }

    public getLevel(): LogLevel {
        return this.level;
    }

    public getLevelName(): string {
        return LogLevel[this.level];
    }

    private stringifyArgs(...args: any[]): string[] {
        return args.map(arg => {
            try {
                return typeof arg === 'string' ? arg : JSON.stringify(arg);
            } catch (error) {
                return String(arg);
            }
        });
    }

    public error(...args: any[]): void {
        if (this.level >= LogLevel.ERROR) {
            const stringifiedArgs = this.stringifyArgs(`[ERROR]`, ...args);
            console.error(...stringifiedArgs);
        }
    }

    public warn(...args: any[]): void {
        if (this.level >= LogLevel.WARN) {
            const stringifiedArgs = this.stringifyArgs(`[WARN]`, ...args);
            console.log(...stringifiedArgs);
        }
    }

    public info(...args: any[]): void {
        if (this.level >= LogLevel.INFO) {
            const stringifiedArgs = this.stringifyArgs(`[INFO]`, ...args);
            console.log(...stringifiedArgs);
        }
    }

    public log(...args: any[]): void {
        const stringifiedArgs = this.stringifyArgs(...args);
        console.log(...stringifiedArgs);
    }
}

export const logger = Logger.getInstance();
let logLevel;
try {
    console.log(process);
    logLevel = parseInt(process?.env?.LOG_LEVEL || "3");
} catch (error) {
    logLevel = 3;
}
logger.setLevel(logLevel as LogLevel);
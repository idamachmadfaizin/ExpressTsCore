import { LeveledLogMethod } from 'winston';
export declare class LogHelper {
    private logger;
    private dir;
    private responseLogFormat;
    constructor();
    /**
     * Create winston logger config
     * @returns Logger
     */
    private createLogger;
    /**
     * Add transport to console while not production
     */
    private addTransport;
    /**
     * Create global log level function
     * @param level log level. 'debug' | 'info' | 'warn' | 'error'
     * @param args LeveledLogMethod
     * @returns Logger
     */
    private globalLog;
    /**
     * Create log level debug
     * @param args LeveledLogMethod
     * @returns Logger
     */
    debug: LeveledLogMethod;
    /**
     * Create log level info
     * @param args LeveledLogMethod
     * @returns Logger
     */
    info: LeveledLogMethod;
    /**
     * Create log level warn
     * @param args LeveledLogMethod
     * @returns Logger
     */
    warn: LeveledLogMethod;
    /**
     * Create log level error
     * @param args LeveledLogMethod
     * @returns Logger
     */
    error: LeveledLogMethod;
}

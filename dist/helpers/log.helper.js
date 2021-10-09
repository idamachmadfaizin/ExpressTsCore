"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogHelper = void 0;
const index_1 = require("@models/index");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
class LogHelper {
    constructor() {
        this.responseLogFormat = '[{0}] {1} >> StatusCode:: {2}, Message:: {3}';
        /**
         * Create log level debug
         * @param args LeveledLogMethod
         * @returns Logger
         */
        this.debug = (args) => {
            return this.globalLog('debug', args);
        };
        /**
         * Create log level info
         * @param args LeveledLogMethod
         * @returns Logger
         */
        this.info = (args) => {
            return this.globalLog('info', args);
        };
        /**
         * Create log level warn
         * @param args LeveledLogMethod
         * @returns Logger
         */
        this.warn = (args) => {
            return this.globalLog('warn', args);
        };
        /**
         * Create log level error
         * @param args LeveledLogMethod
         * @returns Logger
         */
        this.error = (args) => {
            return this.globalLog('error', args);
        };
        /** Base directory and every date directory */
        const prod = 'production';
        const debug = 'debug';
        const root = path_1.default.join(__dirname, '../../../../logs');
        this.dir = {
            prod, debug, root,
            base: path_1.default.join(root, (process.env.NODE_ENV ? prod : debug)),
        };
        /**
         * Check exist and create logs directory
         */
        if (!fs_1.default.existsSync(this.dir.root)) {
            fs_1.default.mkdirSync(this.dir.root);
        }
        if (fs_1.default.existsSync(this.dir.root) && !fs_1.default.existsSync(this.dir.base)) {
            fs_1.default.mkdirSync(this.dir.base);
        }
        this.logger = this.createLogger();
        this.addTransport();
    }
    /**
     * Create winston logger config
     * @returns Logger
     */
    createLogger() {
        /**
         * Log Format
         */
        const logFormat = winston_1.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);
        return (0, winston_1.createLogger)({
            format: winston_1.format.combine(winston_1.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), logFormat),
            transports: [
                new winston_daily_rotate_file_1.default({
                    level: process.env.NODE_ENV ? 'info' : 'debug',
                    datePattern: 'YYYY-MM-DD',
                    dirname: this.dir.base,
                    filename: `%DATE%.log`,
                    maxFiles: 30,
                    handleExceptions: true,
                    json: false,
                    zippedArchive: true,
                }),
            ],
        });
    }
    /**
     * Add transport to console while not production
     */
    addTransport() {
        if (!process.env.NODE_ENV) {
            this.logger.add(new winston_1.transports.Console({
                level: 'debug',
                format: winston_1.format.combine(winston_1.format.splat(), winston_1.format.colorize()),
            }));
        }
    }
    /**
     * Create global log level function
     * @param level log level. 'debug' | 'info' | 'warn' | 'error'
     * @param args LeveledLogMethod
     * @returns Logger
     */
    globalLog(level, args) {
        let logFunc;
        switch (level) {
            case 'debug':
                logFunc = this.logger.debug;
                break;
            case 'info':
                logFunc = this.logger.info;
                break;
            case 'warn':
                logFunc = this.logger.warn;
                break;
            case 'error':
                logFunc = this.logger.error;
                break;
            default:
                logFunc = this.logger.debug;
                break;
        }
        if (args instanceof index_1.ResponseLog) {
            const { method, pathname, statusCode, message } = args;
            return logFunc(String.format(this.responseLogFormat, method, pathname, statusCode, message));
        }
        return logFunc(args);
    }
}
exports.LogHelper = LogHelper;
//# sourceMappingURL=log.helper.js.map
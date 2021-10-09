import { ResponseLog } from '@models/index';
import fs from 'fs';
import path from 'path';
import { createLogger, format, LeveledLogMethod, Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export class LogHelper {
  private logger: Logger;
  private dir: { prod: string, debug: string, root: string, base: string };
  private responseLogFormat = '[{0}] {1} >> StatusCode:: {2}, Message:: {3}';

  constructor() {
    /** Base directory and every date directory */
    const prod = 'production';
    const debug = 'debug';
    const root = path.join(__dirname, '../../../../logs');
    this.dir = {
      prod, debug, root,
      base: path.join(root, (process.env.NODE_ENV ? prod : debug)),
    };

    /**
     * Check exist and create logs directory
     */
    if (!fs.existsSync(this.dir.root)) {
      fs.mkdirSync(this.dir.root);
    }
    if (fs.existsSync(this.dir.root) && !fs.existsSync(this.dir.base)) {
      fs.mkdirSync(this.dir.base);
    }

    this.logger = this.createLogger();
    this.addTransport();
  }

  /**
   * Create winston logger config
   * @returns Logger
   */
  private createLogger(): Logger {
    /**
     * Log Format
     */
    const logFormat = format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

    return createLogger({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      ),
      transports: [
        new DailyRotateFile({
          level: process.env.NODE_ENV ? 'info' : 'debug',
          datePattern: 'YYYY-MM-DD',
          dirname: this.dir.base, // log file /logs/error/*.log in save
          filename: `%DATE%.log`,
          maxFiles: 30, // 30 Days saved
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
  private addTransport() {
    if (!process.env.NODE_ENV) {
      this.logger.add(
        new transports.Console({
          level: 'debug',
          format: format.combine(format.splat(), format.colorize()),
        }),
      );
    }
  }

  /**
   * Create global log level function
   * @param level log level. 'debug' | 'info' | 'warn' | 'error'
   * @param args LeveledLogMethod
   * @returns Logger
   */
  private globalLog(level: 'debug' | 'info' | 'warn' | 'error', args: any): Logger {
    let logFunc: LeveledLogMethod;
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

    if (args instanceof ResponseLog) {
      const { method, pathname, statusCode, message } = args;
      return logFunc(
        String.format(this.responseLogFormat, method, pathname, statusCode, message),
      );
    }
    return logFunc(args);
  }
  /**
   * Create log level debug
   * @param args LeveledLogMethod
   * @returns Logger
   */
  debug: LeveledLogMethod = (args): Logger => {
    return this.globalLog('debug', args);
  }

  /**
   * Create log level info
   * @param args LeveledLogMethod
   * @returns Logger
   */
  info: LeveledLogMethod = (args): Logger => {
    return this.globalLog('info', args);
  }

  /**
   * Create log level warn
   * @param args LeveledLogMethod
   * @returns Logger
   */
  warn: LeveledLogMethod = (args): Logger => {
    return this.globalLog('warn', args);
  }

  /**
   * Create log level error
   * @param args LeveledLogMethod
   * @returns Logger
   */
  error: LeveledLogMethod = (args): Logger => {
    return this.globalLog('error', args);
  }
}

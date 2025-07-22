export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
  ALL = 99,
}

/**
 * Singleton logger utility.
 *
 * Allows enabling or disabling specific log levels (`ERROR`, `WARN`, `INFO`, `DEBUG`)
 * at runtime. Supports logging with tags and message arguments.
 *
 * Usage:
 * ```ts
 * const logger = Logger.getInstance();
 * logger.setLogLevels(LogLevel.ERROR, LogLevel.INFO);
 * logger.error('MyTag', 'An error occurred');
 * ```
 */
export class Logger {
  private static instance: Logger;
  private currentLogLevels: Set<LogLevel> = new Set([ LogLevel.INFO, LogLevel.ERROR ]);

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Sets the active log levels.
   * Call with LogLevel.NONE or no arguments to turn off all logging.
   * Otherwise, specify one or more log levels to be active.
   * Use LogLevel.ALL to enable all log levels.
   */
  public setLogLevels(...levels: LogLevel[]): void {
    if (levels.length === 0 || levels.includes(LogLevel.NONE)) {
      this.currentLogLevels = new Set(); // Turn off logging
    } else if (levels.includes(LogLevel.ALL)) {
      this.currentLogLevels = new Set([
        LogLevel.ERROR,
        LogLevel.WARN,
        LogLevel.INFO,
        LogLevel.DEBUG
      ]);
    } else {
      this.currentLogLevels = new Set(levels.filter((level) => level !== LogLevel.NONE && level !== LogLevel.ALL));
    }
  }

  /**
   * Gets the current set of active log levels.
   * @returns A new Set containing the active LogLevel enums.
   */
  public getLogLevels(): Set<LogLevel> {
    return new Set(this.currentLogLevels);
  }

  private log(level: LogLevel, tag: string, ...messages: any[]): void {
    if (level !== LogLevel.NONE && this.currentLogLevels.has(level)) {
      const prefix = `[${LogLevel[level]}] [${tag}]`;
      switch (level) {
        case LogLevel.ERROR:
          console.error(prefix, ...messages);
          break;
        case LogLevel.WARN:
          console.warn(prefix, ...messages);
          break;
        case LogLevel.INFO:
          console.info(prefix, ...messages);
          break;
        case LogLevel.DEBUG:
          console.debug(prefix, ...messages);
          break;
      }
    }
  }

  public error(tag: string, ...messages: any[]): void {
    this.log(LogLevel.ERROR, tag, ...messages);
  }

  public warn(tag: string, ...messages: any[]): void {
    this.log(LogLevel.WARN, tag, ...messages);
  }

  public info(tag: string, ...messages: any[]): void {
    this.log(LogLevel.INFO, tag, ...messages);
  }

  public debug(tag: string, ...messages: any[]): void {
    this.log(LogLevel.DEBUG, tag, ...messages);
  }
}
import { ILogger } from './logger.interface';

export class ConsoleLogger implements ILogger {
  error = console.error;
  info = console.info;
  success = console.log;
  log = console.log;
  warn = console.warn;
}

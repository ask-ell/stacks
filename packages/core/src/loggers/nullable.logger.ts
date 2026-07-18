import { type ILogger } from './logger.interface'


export class NullableLogger implements ILogger {
  error (_data: any[]): void {}
  info (_data: any[]): void {}
  success(_data: any[]): void { }
  log (_data: any[]): void {}
  warn (_data: any[]): void {}
}

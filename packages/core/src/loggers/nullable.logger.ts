import { type ILogger } from './logger.interface'


export class NullableLogger implements ILogger {
  error (): void {}
  info (): void {}
  success(): void { }
  log (): void {}
  warn (): void {}
}

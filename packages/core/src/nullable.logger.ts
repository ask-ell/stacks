import { type ILogger } from '@ask-ell/core'

export class NullableLogger implements ILogger {
  error (_data: any[]): void {}
  info (_data: any[]): void {}
  log (_data: any[]): void {}
  warn (_data: any[]): void {}
}

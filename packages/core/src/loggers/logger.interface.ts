export interface ILogger {
  log(...data: unknown[]): void;
  info(...data: unknown[]): void;
  success(...data: unknown[]): void;
  warn(...data: unknown[]): void;
  error(...data: unknown[]): void;
}

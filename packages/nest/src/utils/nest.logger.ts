import { Logger } from "@nestjs/common";
import { type ILogger } from "@ask-ell/core";


export class NestLogger extends Logger implements ILogger {
  constructor(name: string) {
    super(name, { timestamp: true })
  }

  static fromClass(classType: Function): ILogger {
    return new NestLogger(classType.name);
  }

  info(...data: any[]): void {
    for (const line of data) {
      this.log(line);
    }
  }

  success(...data: any[]): void {
    this.info(...data);
  }
}
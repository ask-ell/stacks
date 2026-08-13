export class ApplicationError extends Error {
  readonly originalMessage: string;

  constructor(message: string) {
    super(`Application error : ${message}`);
    this.originalMessage = message;
  }
}

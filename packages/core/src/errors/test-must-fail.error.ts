export class TestMustFailError extends Error {
  constructor() {
    super('Test must fail');
  }
}

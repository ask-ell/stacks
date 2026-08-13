export interface IUseCase<Input, Output> {
  run: (input: Input) => Output;
}

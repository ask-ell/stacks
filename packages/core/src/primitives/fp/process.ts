import { Either, left, right, matchEither } from "./either";
import { pipe } from "./function";

export type ProcessResultOrError<ResultType = void> = Either<ResultType, Error>;

export type AsyncProcessResultOrError<ResultType = void> = Promise<
  ProcessResultOrError<ResultType>
>;

export type Process<ResultType = void, Args extends any[] = []> = (
  ...args: Args
) => ProcessResultOrError<ResultType>;

export type AsyncProcess<ResultType = void, Args extends any[] = []> = (
  ...args: Args
) => AsyncProcessResultOrError<ResultType>;

export function success<Result>(result: Result): ProcessResultOrError<Result> {
  return left(result);
}

export const emptySuccess = () => success<void>(void 0);

export function fail<Result>(error: Error): ProcessResultOrError<Result> {
  return right(error);
}

export function matchProcess<ResultTypeA, ResultTypeB>(
  onSuccessCallback: (result: ResultTypeA) => ProcessResultOrError<ResultTypeB>
): (
  ma: ProcessResultOrError<ResultTypeA>
) => ProcessResultOrError<ResultTypeB> {
  return matchEither(onSuccessCallback, (error: Error) => right(error));
}

export function runProcess<ResultType>(
  process: () => ProcessResultOrError<ResultType>
): ResultType {
  return pipe(
    process(),
    matchEither(
      (result: ResultType) => result,
      (err: Error) => {
        throw err;
      }
    )
  );
}

export async function runAsyncProcess<ResultType = void>(
  process: AsyncProcess<ResultType>
): Promise<ResultType> {
  return pipe(
    await process(),
    matchEither(
      (result: ResultType) => Promise.resolve(result),
      (err: Error) => Promise.reject(err)
    )
  );
}

export function runProcessOnEachElement<ElementType, ResultType>(
  process: (element: ElementType) => ProcessResultOrError<ResultType>
) {
  return function (
    entities: Array<ElementType>
  ): ProcessResultOrError<Array<ResultType>> {
    const entitiesBuffer = [...entities];
    const firstElement = entitiesBuffer.shift();
    if (!firstElement) {
      return success(new Array<ResultType>());
    }
    return pipe(
      process(firstElement),
      matchProcess((json) =>
        pipe(
          runProcessOnEachElement(process)(entitiesBuffer),
          matchProcess((exercicesAsJson) => success([json, ...exercicesAsJson]))
        )
      )
    );
  };
}

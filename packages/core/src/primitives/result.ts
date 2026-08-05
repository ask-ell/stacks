import { MaybeNullOrUndefined } from "./nullable";


interface ISuccessResult<Data> {
  getError(): undefined
  getData(): Data
}

interface IFailResult {
  getError(): Error
  getData(): undefined
}

interface FoldParams<Data> {
  onSuccess?: (data: Data) => void
  onFail?: (error: Error) => void
}

export type IResult<Data = unknown> = (ISuccessResult<Data> | IFailResult) & {
  isAFail(): this is IFailResult
  isASuccess(): this is ISuccessResult<Data>
  fold(params: FoldParams<Data>): void
}

class Result<Data> {
  constructor(
    private readonly successValue: MaybeNullOrUndefined<Data>,
    private readonly failValue: MaybeNullOrUndefined<Error>
  ) {
    if (successValue === null && failValue === null) {
      throw new Error('Result must always be a success or a fail')
    }
  }

  isAFail(): this is IFailResult {
    return this.failValue !== null
  }

  getError(): MaybeNullOrUndefined<Error> {
    return this.failValue
  }

  isASuccess(): this is ISuccessResult<Data> {
    return this.successValue !== null
  }

  getData(): MaybeNullOrUndefined<Data> {
    return this.successValue
  }

  fold({ onSuccess, onFail }: FoldParams<Data>): void {
    if (this.isAFail() && !(onFail == null)) {
      onFail((this as IFailResult).getError());
      return;
    }
    if (onSuccess != null) {
      onSuccess((this as ISuccessResult<Data>).getData())
    }
  }
}

export const success = <T>(data: T): IResult<T> => new Result(data, null) as IResult<T>

export const ok = (): IResult<void> => success(undefined)

export const fail = <T = never>(error: unknown): IResult<T> => {
  let finalError: Error
  if (error instanceof Error) {
    finalError = error
  } else if (typeof error === 'string') {
    finalError = new Error(error)
  } else {
    finalError = new Error(JSON.stringify(error))
  }
  return new Result(null, finalError) as unknown as IResult<T>
}

export function mergeResults<MergedResultData extends unknown[], MergedResultDataRange extends IResult[]>(results: MergedResultDataRange): IResult<[...MergedResultData]> {
  const successData: unknown[] = []
  for (const result of results) {
    if (result.isAFail()) {
      return result as unknown as IResult<[...MergedResultData]>
    }
    successData.push(result.getData())
  }
  return success(successData as [...MergedResultData])
}

export interface ResultSnapshot<Data> {
  successValue: MaybeNullOrUndefined<Data>
  failValue: MaybeNullOrUndefined<Error>
}

export const resultFromSnapshot = <T>({ successValue, failValue }: ResultSnapshot<T>): IResult<T> => new Result(successValue, failValue) as IResult<T>

export const throwResultError = <T>(result: IResult<T>): T => {
  if (result.isAFail()) {
    throw result.getError()
  }
  return result.getData()
}

export const fromPromiseToResult = async <T>(promise: () => Promise<T>): Promise<IResult<T>> => {
  try {
    const data: T = await promise()
    return success(data)
  } catch (error: unknown) {
    return fail(error) as IResult<T>
  }
}

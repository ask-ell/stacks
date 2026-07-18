import { type MaybeNullOrUndefined } from './fp/maybe';


export type StringOrNullOrUndefined = MaybeNullOrUndefined<string>

export type NumberOrNullOrUndefined = MaybeNullOrUndefined<number>

export function isDefinedAndNotNull<T> (obj: MaybeNullOrUndefined<T>): obj is T {
  return !isUndefinedOrNull(obj)
}

export function isUndefinedOrNull<T> (
  obj: MaybeNullOrUndefined<T>
): obj is undefined | null {
  return obj === undefined || obj === null
}

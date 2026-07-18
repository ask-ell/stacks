import type { Maybe } from './maybe';


export type MaybeUndefined<T> = Maybe<T, undefined>;

export type MaybeNullOrUndefined<T> = Maybe<null, MaybeUndefined<T>>;

export function isDefinedAndNotNull<T> (obj: MaybeNullOrUndefined<T>): obj is T {
  return !isUndefinedOrNull(obj)
}

export function isUndefinedOrNull<T> (
  obj: MaybeNullOrUndefined<T>
): obj is undefined | null {
  return obj === undefined || obj === null
}

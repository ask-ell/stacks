import * as nativeModule from "fp-ts/lib/Either";
import { pipe } from "./function";

export type Either<A, B> = nativeModule.Either<A, B>;
export const left = nativeModule.left;
export const right = nativeModule.right;
export const matchEither = nativeModule.match;

export function loopOnEithers<A, B>(eithers: Either<A, B>[]): Either<A, B> {
  if (eithers.length === 1) {
    return eithers[0];
  }
  const eithersCopy = [...eithers];
  const firstEither = eithersCopy.shift()!;
  return pipe(
    loopOnEithers(eithersCopy),
    matchEither(
      () => firstEither,
      (b) => right(b)
    )
  );
}

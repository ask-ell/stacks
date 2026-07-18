export type Maybe<A, B> = A | B;

export type MaybeUndefined<T> = Maybe<T, undefined>;

export type MaybeNullOrUndefined<T> = Maybe<null, MaybeUndefined<T>>;

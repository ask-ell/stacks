import type * as _Option from 'fp-ts/lib/Option'
import type * as _IO from 'fp-ts/lib/IO'
import { type MaybeNullOrUndefined } from './primitives/fp/maybe'

export type IO<T> = _IO.IO<T>

export type Option<T> = _Option.Option<T>

export type StringOrNotDefined = MaybeNullOrUndefined<string>

export type NumberOrNotDefined = MaybeNullOrUndefined<number>

export type OnChangesDetectedCallback<Change> = (change: Change) => void

export interface PercentageIncrementorState {
  achivmentOnPercent: number
}

export type OnIncrementCallback = (state: PercentageIncrementorState) => void

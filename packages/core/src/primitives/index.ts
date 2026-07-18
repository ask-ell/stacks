import type { Maybe, MaybeNullOrUndefined, MaybeUndefined } from './fp/maybe'
import type { IEqualizable } from './oop/equalizable'
import type { IStringable } from './oop/stringable'
import type { IEntity } from './oop/entity/entity.interface'
import type { ISnapshotable } from './oop/snapshotable.interface'

// TODO: rework module

import { Entity } from './oop/entity/entity'
import { append, find } from './fp/array'
import { _if } from './fp/boolean'
import { log } from './fp/console'
import { left, matchEither, right } from './fp/either'
import { identity, pipe } from './fp/function'
import { io } from './fp/io'
import { fromNullableOption, matchOption, none, some } from './fp/options'
import { isEmptyString, length, string, stringToNumber } from './fp/string'

export type {
  Maybe,
  MaybeNullOrUndefined,
  MaybeUndefined,
  IEqualizable,
  IStringable,
  IEntity,
  ISnapshotable
}

export {
  Entity,
  append,
  find,
  _if,
  log,
  left,
  matchEither,
  right,
  identity,
  pipe,
  io,
  fromNullableOption,
  matchOption,
  some,
  isEmptyString,
  length,
  string,
  stringToNumber,
  none
}

import {
  type IO,
  type NumberOrNotDefined,
  type Option,
  type StringOrNotDefined,
  type OnChangesDetectedCallback,
  type OnIncrementCallback,
  type PercentageIncrementorState
} from './types'
import type { ILogger } from './logger.interface'
import { ChangeDetectionQueue } from './change-detection-queue'
import { isDefinedAndNotNull, isUndefinedOrNull } from './nullables'
import { PercentageIncrementor } from './percentage-incrementor'
import { wait } from './wait'

export * from './errors'
export * from './http'
export * from './primitives'
export * from './resources'
export * from './result'
export * from './microservice.interface'

export * from './nullable.logger'

export * from './filters'

export type {
  IO,
  NumberOrNotDefined,
  Option,
  StringOrNotDefined,
  OnChangesDetectedCallback,
  OnIncrementCallback,
  PercentageIncrementorState,
  ILogger
}

export {
  PercentageIncrementor,
  ChangeDetectionQueue,
  wait,
  isDefinedAndNotNull,
  isUndefinedOrNull
}

export * from './event-listeners/event.listener'
export * from './event-listeners/event.listener.interface'
export * from './strings'
export * from './promises'
export * from './durations'
export * from './changes'
export * from './reduce'
export * from './urls'
export * from './server.provider.interface'

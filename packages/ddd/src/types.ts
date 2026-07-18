export type Id = string

export type AggregateRootState<EntityState = unknown> = EntityState & {
  readonly id: Id
}

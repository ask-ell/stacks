export type Id = string

export type AggregateRootState<EntityState> = EntityState & {
  readonly id: Id
}

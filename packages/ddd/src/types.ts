export type Id = string

export type AggregateRootState<EntityState> = EntityState & {
  id: Id
}

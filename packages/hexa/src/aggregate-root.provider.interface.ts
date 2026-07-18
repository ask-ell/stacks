import { MaybeUndefined } from "@ask-ell/core";
import { AggregateRootState, Id } from "@ask-ell/ddd";


export interface IAggregateRootProvider<
  EntityState extends AggregateRootState<unknown>
> {
  findAll(): Promise<EntityState[]>;
  findOneById(
    id: Id
  ): Promise<MaybeUndefined<EntityState>>;
}

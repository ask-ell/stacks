import { MaybeUndefined } from "@ask-ell/core";
import { AggregateRootState, Id } from "@ask-ell/ddd";


export interface IAggregateRootProvider<
  EntityState,
  ProvidingResultDrivenSideAdapter extends AggregateRootState<EntityState>
> {
  findAll(): Promise<ProvidingResultDrivenSideAdapter[]>;
  findOneById(
    id: Id
  ): Promise<MaybeUndefined<ProvidingResultDrivenSideAdapter>>;
}

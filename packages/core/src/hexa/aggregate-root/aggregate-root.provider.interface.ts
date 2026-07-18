import { AggregateRootState, Id } from "../../../../ddd/src";
import { MaybeUndefined } from "../../primitives";

export interface IAggregateRootProvider<
  EntityState,
  ProvidingResultDrivenSideAdapter extends AggregateRootState<EntityState>
> {
  findAll(): Promise<ProvidingResultDrivenSideAdapter[]>;
  findOneById(
    id: Id
  ): Promise<MaybeUndefined<ProvidingResultDrivenSideAdapter>>;
}

import { Observable } from 'rxjs';
import { AggregateRootState, Id } from "@ask-ell/ddd";


export interface IAggregateRootRepository<
  EntityState,
  PersistanceResultDrivenSideAdapter extends AggregateRootState<EntityState>
> {
  save(entityState: EntityState): Promise<PersistanceResultDrivenSideAdapter>;
  lastSavedEntity$(): Observable<PersistanceResultDrivenSideAdapter>;
  updateOne(
    aggregateRootState: PersistanceResultDrivenSideAdapter
  ): Promise<boolean>;
  lastUpdatedEntity$(): Observable<PersistanceResultDrivenSideAdapter>;
  removeOne(id: Id): Promise<boolean>;
  lastDeletedEntity$(): Observable<PersistanceResultDrivenSideAdapter>;
}

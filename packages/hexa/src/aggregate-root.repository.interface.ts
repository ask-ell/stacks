import { Observable } from 'rxjs';
import { AggregateRootState, Id } from "@ask-ell/ddd";


export interface IAggregateRootRepository<
  EntityState extends AggregateRootState<unknown>
> {
  save(entityState: EntityState): Promise<EntityState>;
  lastSavedEntity$(): Observable<EntityState>;
  updateOne(
    aggregateRootState: EntityState
  ): Promise<boolean>;
  lastUpdatedEntity$(): Observable<EntityState>;
  removeOne(id: Id): Promise<boolean>;
  lastDeletedEntity$(): Observable<EntityState>;
}

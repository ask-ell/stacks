import { Observable } from 'rxjs';
import { AggregateRootState } from "@ask-ell/ddd";


export interface IAggregateRootRepository<EntityState extends AggregateRootState> {
  lastSavedEntity$(): Observable<EntityState>;
  save(entityState: EntityState): Promise<void>;
  lastUpdatedEntity$(): Observable<EntityState>;
  updateOne(entityState: EntityState): Promise<boolean>;
  lastDeletedEntity$(): Observable<EntityState>;
  deleteOne(entityState: EntityState): Promise<boolean>;
}

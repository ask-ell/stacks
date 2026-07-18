import { AggregateRootState } from '@ask-ell/ddd';
import { IAggregateRootRepository } from "@ask-ell/hexa";
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { KeyvClient } from "./keyv.client";


export abstract class KeyvAggregateRootRepository<EntityState extends AggregateRootState> extends KeyvClient<EntityState> implements IAggregateRootRepository<EntityState> {
    protected _lastSavedEntity$: Subject<EntityState> = new ReplaySubject(1);
    protected _lastUpdatedEntity$: Subject<EntityState> = new ReplaySubject(1);
    protected _lastDeletedEntity$: Subject<EntityState> = new ReplaySubject(1);

    lastSavedEntity$(): Observable<EntityState> {
        return this._lastSavedEntity$.asObservable();
    }

    async save(entityState: EntityState): Promise<boolean> {
        const isSaved: boolean = await this.persist(entityState);
        if(isSaved){
            this._lastSavedEntity$.next(entityState);
        }
        return isSaved;
    }

    lastUpdatedEntity$(): Observable<EntityState> {
        return this._lastUpdatedEntity$.asObservable();
    }

    async updateOne(entityState: EntityState): Promise<boolean> {
        const isUpdated: boolean = await this.persist(entityState);
        if(isUpdated){
            this._lastUpdatedEntity$.next(entityState);
        }
        return isUpdated;
    }

    lastDeletedEntity$(): Observable<EntityState> {
        return this._lastDeletedEntity$;
    }

    async deleteOne(entityState: EntityState): Promise<boolean> {
        const isDeleted: boolean = await this.instance.delete(entityState.id);
        if(isDeleted){
            this._lastDeletedEntity$.next(entityState);
        }
        return isDeleted;
    }

    private persist({
        id,
        ...dto
    }: EntityState): Promise<boolean> {
        return this.instance.set(id, { ...this.purgeData(dto), id });
    }

    protected abstract purgeData(dto: Omit<EntityState, 'id'>): EntityState;
}
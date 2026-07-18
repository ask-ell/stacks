import { AggregateRootState } from '@ask-ell/ddd';
import { IAggregateRootRepository } from "@ask-ell/hexa";
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { KeyvClient } from "./keyv.client";


export type KeyvRowData<EntityState extends AggregateRootState> = Omit<EntityState, 'id'>;

export abstract class KeyvAggregateRootRepository<EntityState extends AggregateRootState> extends KeyvClient<EntityState> implements IAggregateRootRepository<EntityState> {
    protected _lastSavedEntity$: Subject<EntityState> = new ReplaySubject(1);
    protected _lastUpdatedEntity$: Subject<EntityState> = new ReplaySubject(1);
    protected _lastDeletedEntity$: Subject<EntityState> = new ReplaySubject(1);

    lastSavedEntity$(): Observable<EntityState> {
        return this._lastSavedEntity$.asObservable();
    }

    async save(entityState: EntityState): Promise<void> {
        if(await this.isAlreadySaved(entityState)){
            throw new Error('Entity ID already saved');
        }
        await this.persist(entityState);
        this._lastSavedEntity$.next(entityState);
    }

    lastUpdatedEntity$(): Observable<EntityState> {
        return this._lastUpdatedEntity$.asObservable();
    }

    async updateOne(entityState: EntityState): Promise<boolean> {
        if(!(await this.isAlreadySaved(entityState))){
            return false;
        }
        await this.persist(entityState);
        this._lastUpdatedEntity$.next(entityState);
        return true;
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

    protected abstract purgeData(dto: KeyvRowData<EntityState>): KeyvRowData<EntityState>;

    private isAlreadySaved(entityState: EntityState): Promise<boolean> {
        return this.instance.has(entityState.id);
    }

    private persist({
        id,
        ...dto
    }: EntityState): Promise<boolean> {
        return this.instance.set(id, { ...this.purgeData(dto), id });
    }
}

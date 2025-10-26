import { randomUUID } from "node:crypto";
import { AggregateRootState, Id } from '@ask-ell/core/dist/src/ddd';
import { IAggregateRootRepository } from "@ask-ell/core/dist/src/hexa";
import { Keyv } from "keyv";
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { KeyvClient } from "./keyv.client";
import { IdFactory } from "./types";

export abstract class KeyvAggregateRootRepository<EntityState, PersistanceResultDrivenSideAdapter extends AggregateRootState<EntityState>> extends KeyvClient<PersistanceResultDrivenSideAdapter> implements IAggregateRootRepository<EntityState, PersistanceResultDrivenSideAdapter> {
    protected _lastSavedEntity$: Subject<PersistanceResultDrivenSideAdapter> = new ReplaySubject(1);
    protected _lastUpdatedEntity$: Subject<PersistanceResultDrivenSideAdapter> = new ReplaySubject(1);
    protected _lastDeletedEntity$: Subject<PersistanceResultDrivenSideAdapter> = new ReplaySubject(1);

    constructor(
        instance: Keyv<PersistanceResultDrivenSideAdapter>,
        private idFactory: IdFactory<EntityState> = () => randomUUID()
    ) {
        super(instance)
    }

    async save(entityState: EntityState) {
        const id: Id = this.idFactory(entityState);
        const aggregateRootState: PersistanceResultDrivenSideAdapter = {
            ...this.purgeData(entityState),
            id
        } as PersistanceResultDrivenSideAdapter;
        await this.instance.set(id, aggregateRootState);
        this._lastSavedEntity$.next(aggregateRootState);
        return aggregateRootState;
    }

    lastSavedEntity$(): Observable<PersistanceResultDrivenSideAdapter> {
        return this._lastSavedEntity$.asObservable();
    }

    async updateOne(aggregateRootState: PersistanceResultDrivenSideAdapter): Promise<boolean> {
        const id: Id = this.extractId(aggregateRootState);
        if (!(await this.instance.has(id))) {
            return false;
        }
        await this.instance.set(id, { ...this.purgeData(aggregateRootState), id });
        this._lastUpdatedEntity$.next(aggregateRootState);
        return true;
    }

    lastUpdatedEntity$(): Observable<PersistanceResultDrivenSideAdapter> {
        return this._lastUpdatedEntity$.asObservable();
    }

    async removeOne(id: Id): Promise<boolean> {
        if (!(await this.instance.has(id))) {
            return false;
        }
        return this.instance.delete(id);
    }

    lastDeletedEntity$(): Observable<PersistanceResultDrivenSideAdapter> {
        return this._lastDeletedEntity$;
    }

    protected abstract purgeData(data: EntityState): EntityState;

    private extractId(aggregateRootState: PersistanceResultDrivenSideAdapter): Id {
        const { id } = aggregateRootState;
        if (!id) {
            throw new Error('Aggregate root state id must be defined here');
        }
        return id;
    }
}
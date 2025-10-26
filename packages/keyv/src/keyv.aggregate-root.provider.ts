import { Keyv } from 'keyv';
import { MaybeUndefined } from '@ask-ell/core';
import { IAggregateRootProvider } from '@ask-ell/core/dist/src/hexa';
import { AggregateRootState, Id } from '@ask-ell/core/dist/src/ddd';

import { KeyvClient } from './keyv.client';

export class KeyvAggregateRootProvider<EntityState, ProvidingResultDrivenSideAdapter extends AggregateRootState<EntityState>> extends KeyvClient<ProvidingResultDrivenSideAdapter> implements IAggregateRootProvider<EntityState, ProvidingResultDrivenSideAdapter> {
    constructor(
        instance: Keyv<ProvidingResultDrivenSideAdapter>
    ) {
        super(instance);
    }

    async findAll(): Promise<ProvidingResultDrivenSideAdapter[]> {
        const data: ProvidingResultDrivenSideAdapter[] = []
        for await (const value of this.getAllDataGenerator()) {
            data.push(value);
        };
        return data;
    }

    findOneById(id: Id): Promise<MaybeUndefined<ProvidingResultDrivenSideAdapter>> {
        return this.instance.get(id);
    }
}
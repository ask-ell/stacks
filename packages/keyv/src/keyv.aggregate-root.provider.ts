import { Keyv } from 'keyv';
import { MaybeUndefined } from '@ask-ell/core';
import { IAggregateRootProvider } from '@ask-ell/hexa';
import { AggregateRootState, Id } from '@ask-ell/ddd';

import { KeyvClient } from './keyv.client';


export class KeyvAggregateRootProvider<EntityState extends AggregateRootState> extends KeyvClient<EntityState> implements IAggregateRootProvider<EntityState> {
    constructor(
        instance: Keyv<EntityState>
    ) {
        super(instance);
    }

    async findAll(): Promise<EntityState[]> {
        const data: EntityState[] = []
        for await (const value of this.getAllDataGenerator()) {
            data.push(value);
        };
        return data;
    }

    findOneById(id: Id): Promise<MaybeUndefined<EntityState>> {
        return this.instance.get(id);
    }
}

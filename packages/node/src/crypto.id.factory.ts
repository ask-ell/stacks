import { Id, IIdFactory } from '@ask-ell/ddd';
import { randomUUID } from 'node:crypto';


export class CryptoIdFactory implements IIdFactory {
    async create(): Promise<Id> {
        return Promise.resolve(randomUUID());
    }
}

import { KeyvStoreAdapter } from 'keyv';

export type CreateKeyvStoreAdapterOptions = {
  postgresUri?: string;
};

export interface IKeyvStoreAdapterFactory {
  create(options?: CreateKeyvStoreAdapterOptions): KeyvStoreAdapter;
}

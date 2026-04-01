import KeyvSqlite from '@keyv/sqlite';
import KeyvPostgres from '@keyv/postgres';
import { ILogger } from "@ask-ell/core";
import { createTmpFolder } from '@ask-ell/ask';
import { KeyvStoreAdapter } from "keyv";


type CreateKeyvStoreAdapterOptions = {
    postgresUri: string;
    databaseRelativePath: string;
}

export class KeyvStoreAdapterFactory {
    constructor(private logger: ILogger){ }

    create(options: CreateKeyvStoreAdapterOptions): KeyvStoreAdapter {
        const adapter: KeyvStoreAdapter = this.getKeyvStoreAdapter(options);
        this.logger.log(`Connected to database with adapter "${adapter.constructor.name}"`);
        return adapter;
    }

    private getKeyvStoreAdapter({ postgresUri, databaseRelativePath }: CreateKeyvStoreAdapterOptions): KeyvStoreAdapter {
        if (!postgresUri) {
            createTmpFolder(this.logger);
            return new KeyvSqlite(databaseRelativePath);
        }
        return new KeyvPostgres({
            uri: postgresUri,
        });
    }
}
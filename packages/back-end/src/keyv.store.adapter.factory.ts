import { Injectable } from "@nestjs/common";
import { KeyvStoreAdapter } from "keyv";
import KeyvSqlite from '@keyv/sqlite';
import KeyvPostgres from '@keyv/postgres';
import { ILogger } from "@ask-ell/core";
import { NestLogger } from '@ask-ell/nest';
import { createTmpFolder } from '@ask-ell/ask';


type CreateKeyvStoreAdapterOptions = {
    postgresUri: string;
    databaseRelativePath: string;
}

@Injectable()
export class KeyvStoreAdapterFactory {
    private logger: ILogger = NestLogger.fromClass(KeyvStoreAdapterFactory);

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
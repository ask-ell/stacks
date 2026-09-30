import { KeyvStoreAdapter } from 'keyv';
import KeyvSqlite from '@keyv/sqlite';
import KeyvPostgres from '@keyv/postgres';
import { ILogger } from '@ask-ell/core';
import { NestLogger } from '@ask-ell/nest';
import { join } from 'node:path';

import { createTmpFolder, TMP_FOLDER_PATH } from '../tmp';
import {
  CreateKeyvStoreAdapterOptions,
  IKeyvStoreAdapterFactory,
} from './keyv.store.adapter.factory.interface';

export class KeyvStoreAdapterFactory implements IKeyvStoreAdapterFactory {
  private logger: ILogger = NestLogger.fromClass(KeyvStoreAdapterFactory);

  create(options?: CreateKeyvStoreAdapterOptions): KeyvStoreAdapter {
    const adapter: KeyvStoreAdapter = this.getKeyvStoreAdapter(options);
    this.logger.log(
      `Connected to database with adapter "${adapter.constructor.name}"`
    );
    return adapter;
  }

  private getKeyvStoreAdapter(
    options?: CreateKeyvStoreAdapterOptions
  ): KeyvStoreAdapter {
    const { postgresUri } = options ?? { postgresUri: null };
    if (postgresUri) {
      return new KeyvPostgres({
        uri: postgresUri,
      });
    }

    createTmpFolder(this.logger);
    const localDatabaseFilePath: string = join(
      TMP_FOLDER_PATH,
      'database.sqlite'
    );
    return new KeyvSqlite(localDatabaseFilePath);
  }
}

import { Injectable } from '@nestjs/common';
import { KeyvStoreAdapter } from 'keyv';
import KeyvSqlite from '@keyv/sqlite';
import KeyvPostgres from '@keyv/postgres';
import { ILogger, MaybeUndefined } from '@ask-ell/core';
import { NestLogger } from '@ask-ell/nest';
import { join } from 'node:path';

import { createTmpFolder, TMP_FOLDER_PATH } from './tmp';

type CreateKeyvStoreAdapterOptions = {
  postgresUri: MaybeUndefined<string>;
};

@Injectable()
export class KeyvStoreAdapterFactory {
  private logger: ILogger = NestLogger.fromClass(KeyvStoreAdapterFactory);

  create(options: CreateKeyvStoreAdapterOptions): KeyvStoreAdapter {
    const adapter: KeyvStoreAdapter = this.getKeyvStoreAdapter(options);
    this.logger.log(
      `Connected to database with adapter "${adapter.constructor.name}"`
    );
    return adapter;
  }

  private getKeyvStoreAdapter({
    postgresUri,
  }: CreateKeyvStoreAdapterOptions): KeyvStoreAdapter {
    if (!postgresUri) {
      createTmpFolder(this.logger);
      const localDatabaseFilePath: string = join(
        TMP_FOLDER_PATH,
        'database.sqlite'
      );
      return new KeyvSqlite(localDatabaseFilePath);
    }

    return new KeyvPostgres({
      uri: postgresUri,
    });
  }
}

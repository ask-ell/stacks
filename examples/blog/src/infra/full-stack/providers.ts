import { CryptoIdFactory } from '@ask-ell/node';
import { IIdFactory } from '@ask-ell/ddd';
import { Provider } from '@nestjs/common';
import Keyv, { KeyvStoreAdapter } from 'keyv';
import { KeyvStoreAdapterFactory } from '@ask-ell/back-end';

import {
  CreateArticleUseCase,
  IArticleProvider,
  IArticleRepository,
  UpdateArticleUseCase,
} from '../../application';

import {
  ARTICLE_PROVIDER_PROVIDER,
  CREATE_ARTICLE_USE_CASE_PROVIDER,
  UPDATE_ARTICLE_USE_CASE_PROVIDER,
} from '../nest';
import { KeyvArticleProvider, KeyvArticleRepository } from '../keyv';

export const providers: Provider[] = [
  {
    provide: Keyv,
    useFactory: (keyvStoreAdapterFactory: KeyvStoreAdapterFactory): Keyv => {
      const keyvStoreAdapter: KeyvStoreAdapter =
        keyvStoreAdapterFactory.create();
      return new Keyv({
        store: keyvStoreAdapter,
      });
    },
    inject: [KeyvStoreAdapterFactory],
  },
  {
    provide: ARTICLE_PROVIDER_PROVIDER,
    useFactory: (keyvInstance: Keyv) => new KeyvArticleProvider(keyvInstance),
    inject: [Keyv],
  },
  {
    provide: CryptoIdFactory,
    useClass: CryptoIdFactory,
  },
  {
    provide: KeyvArticleRepository,
    useFactory: (keyvInstance: Keyv) => new KeyvArticleRepository(keyvInstance),
    inject: [Keyv],
  },
  {
    provide: CREATE_ARTICLE_USE_CASE_PROVIDER,
    useFactory: (
      idFactory: IIdFactory,
      articleRepository: IArticleRepository
    ) => new CreateArticleUseCase(idFactory, articleRepository),
    inject: [CryptoIdFactory, KeyvArticleRepository],
  },
  {
    provide: UPDATE_ARTICLE_USE_CASE_PROVIDER,
    useFactory: (
      articleProvider: IArticleProvider,
      articleRepository: IArticleRepository
    ) => new UpdateArticleUseCase(articleProvider, articleRepository),
    inject: [ARTICLE_PROVIDER_PROVIDER, KeyvArticleRepository],
  },
];

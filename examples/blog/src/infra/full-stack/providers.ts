import { CryptoIdFactory } from '@ask-ell/node';
import { IIdFactory } from '@ask-ell/ddd';
import { Provider } from '@nestjs/common';
import Keyv from 'keyv';

import {
  CreateArticleUseCase,
  IArticleProvider,
  IArticleRepository,
  ICreateArticleUseCase,
  IUpdateArticleUseCase,
  UpdateArticleUseCase,
} from '../../application';

import {
  ARTICLE_PROVIDER_PROVIDER,
  CREATE_ARTICLE_USE_CASE_PROVIDER,
  UPDATE_ARTICLE_USE_CASE_PROVIDER,
} from '../nest';
import { KeyvArticleProvider, KeyvArticleRepository } from '../keyv';

const keyvInstance: Keyv = new Keyv();

const articleProvider: IArticleProvider = new KeyvArticleProvider(keyvInstance);

const articleRepository: IArticleRepository = new KeyvArticleRepository(
  keyvInstance
);

const idFactory: IIdFactory = new CryptoIdFactory();

const createArticleUseCase: ICreateArticleUseCase = new CreateArticleUseCase(
  idFactory,
  articleRepository
);

const updateArticleUseCase: IUpdateArticleUseCase = new UpdateArticleUseCase(
  articleProvider,
  articleRepository
);

export const providers: Provider[] = [
  {
    provide: ARTICLE_PROVIDER_PROVIDER,
    useValue: articleProvider,
  },
  {
    provide: CREATE_ARTICLE_USE_CASE_PROVIDER,
    useValue: createArticleUseCase,
  },
  {
    provide: UPDATE_ARTICLE_USE_CASE_PROVIDER,
    useValue: updateArticleUseCase,
  },
];

import Keyv from 'keyv';
import { IIdFactory } from '@ask-ell/ddd';
import { CryptoIdFactory } from '@ask-ell/node';

import type {
  IArticleProvider,
  IArticleRepository,
  IUnitOfWork,
} from '../../application';

import { KeyvArticleProvider, KeyvArticleRepository } from '../keyv';

export class FullStackUnitOfWork implements IUnitOfWork {
  private keyvInstance: Keyv = new Keyv();
  private articleProvider: IArticleProvider = new KeyvArticleProvider(
    this.keyvInstance
  );
  private articleRepository: IArticleRepository = new KeyvArticleRepository(
    this.keyvInstance
  );
  private idFactory: IIdFactory = new CryptoIdFactory();

  getArticleProvider(): IArticleProvider {
    return this.articleProvider;
  }

  getArticleRepository(): IArticleRepository {
    return this.articleRepository;
  }

  getIdFactory(): IIdFactory {
    return this.idFactory;
  }
}

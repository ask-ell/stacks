import Keyv from 'keyv';

import type {
  IArticleProvider,
  IArticleRepository,
  IUnitOfWork
} from '../../application';

import { KeyvArticleProvider } from './keyv.article.provider';
import { KeyvArticleRepository } from './keyv.article.repository';


export class KeyvUnitOfWork implements IUnitOfWork {
  private keyvInstance: Keyv = new Keyv();
  private articleProvider: IArticleProvider = new KeyvArticleProvider(this.keyvInstance);
  private articleRepository: IArticleRepository = new KeyvArticleRepository(this.keyvInstance);

  getArticleProvider(): IArticleProvider {
    return this.articleProvider
  }

  getArticleRepository(): IArticleRepository {
    return this.articleRepository
  }
}

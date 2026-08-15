import Keyv from 'keyv';
import { type MaybeUndefined, TestMustFailError } from '@ask-ell/core';
import { IIdFactory } from '@ask-ell/ddd';
import { CryptoIdFactory } from '@ask-ell/node';

import {
  type ICreateArticleUseCaseInput,
  type IUpdateArticleUseCaseInput,
  type ICreateArticleUseCase,
  type IUpdateArticleUseCase,
  type ArticleState,
  CreateArticleUseCase,
  UpdateArticleUseCase,
  WrongArticleTitleSizeError,
  IArticleProvider,
  IArticleRepository,
} from './application';

import { KeyvArticleProvider, KeyvArticleRepository } from './infra';

const keyvInstance: Keyv = new Keyv();
const idFactory: IIdFactory = new CryptoIdFactory();
const articleProvider: IArticleProvider = new KeyvArticleProvider(keyvInstance);
const articleRepository: IArticleRepository = new KeyvArticleRepository(
  keyvInstance
);
const createArticleUseCase: ICreateArticleUseCase = new CreateArticleUseCase(
  idFactory,
  articleRepository
);
const updateArticleUseCase: IUpdateArticleUseCase = new UpdateArticleUseCase(
  articleProvider,
  articleRepository
);

describe('Blog', (): void => {
  async function createArticle(): Promise<IUpdateArticleUseCaseInput> {
    const dto: ICreateArticleUseCaseInput = {
      title: "My article's title",
      description: "My article's description",
    };
    const createdArticle: ArticleState = await createArticleUseCase.run(dto);

    expect(createdArticle.title).toEqual(dto.title);
    expect(createdArticle.description).toEqual(dto.description);

    return createdArticle;
  }

  beforeEach(async (): Promise<void> => {
    await keyvInstance.clear();
  });

  it('A user cannot create an article with an empty title', async () => {
    try {
      const dto: ICreateArticleUseCaseInput = {
        title: '',
        description: "My article's description",
      };
      await createArticleUseCase.run(dto);
      throw new TestMustFailError();
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(WrongArticleTitleSizeError);
    }
  });

  it('A user can create an article', createArticle);

  it('A user cannot update an article with an empty title', async () => {
    try {
      const dto: IUpdateArticleUseCaseInput = await createArticle();
      dto.title = '';
      await updateArticleUseCase.run(dto);
      throw new TestMustFailError();
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(WrongArticleTitleSizeError);
    }
  });

  it('A user can update an article', async (): Promise<void> => {
    const dto: IUpdateArticleUseCaseInput = await createArticle();
    dto.title = "My article's new title";
    dto.description = "My article's new description";

    const updatedArticle: MaybeUndefined<ArticleState> =
      await updateArticleUseCase.run(dto);

    expect(updatedArticle).toBeDefined();
    expect(updatedArticle?.title).toEqual(dto.title);
    expect(updatedArticle?.description).toEqual(dto.description);
  });
});

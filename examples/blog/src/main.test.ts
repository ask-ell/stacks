import { type MaybeUndefined, TestMustFailError } from '@ask-ell/core';

import {
  type ICreateArticleUseCaseInput,
  type IUpdateArticleUseCaseInput,
  type ICreateArticleUseCase,
  type IUpdateArticleUseCase,
  type IUnitOfWork,
  type ArticleState,
  CreateArticleUseCase,
  UpdateArticleUseCase,
  WrongArticleTitleSizeError,
} from './application';

import { FullStackUnitOfWork } from './infra';

describe('Blog', (): void => {
  let createArticleUseCase: ICreateArticleUseCase;
  let updateArticleUseCase: IUpdateArticleUseCase;

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

  beforeEach((): void => {
    const unitOfWork: IUnitOfWork = new FullStackUnitOfWork();
    createArticleUseCase = new CreateArticleUseCase(unitOfWork);
    updateArticleUseCase = new UpdateArticleUseCase(unitOfWork);
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

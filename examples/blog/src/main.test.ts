import { type MaybeUndefined, TestMustFailError } from '@ask-ell/core'

import {
  type ICreateArticleUseCaseInput,
  type IUpdateArticleUseCaseInput,
  type ICreateArticleUseCase,
  type IUpdateArticleUseCase,
  type IUnitOfWork,
  type ArticleAggregateRootState,
  CreateArticleUseCase,
  UpdateArticleUseCase,
  WrongArticleTitleSizeError
} from './application'

import { InMemoryUnitOfWork } from './infra/in-memory'


describe('Blog', (): void => {
  let createArticleUseCase: ICreateArticleUseCase
  let updateArticleUseCase: IUpdateArticleUseCase

  async function createArticle(): Promise<ArticleAggregateRootState> {
    const dto: ICreateArticleUseCaseInput = {
      title: "My article's title",
      description: "My article's description"
    }
    const createdArticle: ArticleAggregateRootState =
      await createArticleUseCase.run(dto)
    expect(createdArticle.title).toEqual(dto.title)
    expect(createdArticle.description).toEqual(dto.description)
    return createdArticle
  }

  beforeEach((): void => {
    const unitOfWork: IUnitOfWork = new InMemoryUnitOfWork()
    createArticleUseCase = new CreateArticleUseCase(unitOfWork)
    updateArticleUseCase = new UpdateArticleUseCase(unitOfWork)
  })

  it('A user cannot create an article with an empty title', async () => {
    try {
      const dto: ICreateArticleUseCaseInput = {
        title: '',
        description: "My article's description"
      }
      await createArticleUseCase.run(dto)
      throw new TestMustFailError()
    } catch (error: any) {
      expect(error).toBeInstanceOf(WrongArticleTitleSizeError)
    }
  })

  it('A user can create an article', createArticle)

  it('A user cannot update an article with an empty title', async () => {
    try {
      const dto: ArticleAggregateRootState = await createArticle()
      dto.title = ''
      await updateArticleUseCase.run(dto as IUpdateArticleUseCaseInput)
      throw new TestMustFailError()
    } catch (error: any) {
      expect(error).toBeInstanceOf(WrongArticleTitleSizeError)
    }
  })

  it('A user can update an article', async (): Promise<void> => {
    const dto: ICreateArticleUseCaseInput = await createArticle()
    dto.title = "My article's new title"
    dto.description = "My article's new description"

    const updatedArticle: MaybeUndefined<ArticleAggregateRootState> = await updateArticleUseCase.run(dto as IUpdateArticleUseCaseInput)

    expect(updatedArticle).toBeDefined()
    expect(updatedArticle?.title).toEqual(dto.title)
    expect(updatedArticle?.description).toEqual(dto.description)
  })
})

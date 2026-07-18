import type { IArticle } from '../domain'
import { Article } from '../domain'

import type { ICreateArticleUseCaseInput } from '../ports/driving/types'
import type { ICreateArticleUseCase } from '../ports/driving/create-article.use-case.interface'
import type { IUnitOfWork } from '../unit-of-work.interface'
import type { ArticleAggregateRootState } from '../ports/driven/types'

export class CreateArticleUseCase implements ICreateArticleUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) { }

  async run({
    title,
    description
  }: ICreateArticleUseCaseInput): Promise<ArticleAggregateRootState> {
    const newArticle: IArticle = new Article({
      title,
      description
    })
    return this.unitOfWork
      .getArticleRepository()
      .save(newArticle.getSnapshot())
  }
}

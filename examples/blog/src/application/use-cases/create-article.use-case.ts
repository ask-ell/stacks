import type { ArticleState, IArticle } from '../domain'
import { Article } from '../domain'

import type { ICreateArticleUseCaseInput } from '../ports/driving/types'
import type { ICreateArticleUseCase } from '../ports/driving/create-article.use-case.interface'
import type { IUnitOfWork } from '../unit-of-work.interface'


export class CreateArticleUseCase implements ICreateArticleUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) { }

  async run({
    title,
    description
  }: ICreateArticleUseCaseInput): Promise<ArticleState> {
    const newArticle: IArticle = new Article({
      id: new Date().getTime().toString(), // TODO: call id factory
      title,
      description
    });

    return this.unitOfWork
      .getArticleRepository()
      .save(newArticle.getSnapshot())
  }
}

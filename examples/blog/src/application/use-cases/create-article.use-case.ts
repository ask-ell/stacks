import { Id } from '@ask-ell/ddd'

import type { ArticleState, IArticle } from '../domain'
import { Article } from '../domain'

import type { ICreateArticleUseCaseInput } from '../ports/driving/types'
import type { ICreateArticleUseCase } from '../ports/driving/create-article.use-case.interface'
import type { IUnitOfWork } from '../unit-of-work.interface'


export class CreateArticleUseCase implements ICreateArticleUseCase {
  constructor(
    private unitOfWork: IUnitOfWork
  ) { }

  async run({
    title,
    description
  }: ICreateArticleUseCaseInput): Promise<ArticleState> {
    const id: Id = await this.unitOfWork.getIdFactory().create();

    const newArticle: IArticle = new Article({
      id,
      title,
      description
    });

    const newArticleSnapshot: ArticleState = newArticle.getSnapshot();

    await this.unitOfWork
      .getArticleRepository()
      .save(newArticleSnapshot);

    return newArticleSnapshot;
  }
}

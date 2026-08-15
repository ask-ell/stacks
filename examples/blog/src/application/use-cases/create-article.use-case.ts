import { Id, IIdFactory } from '@ask-ell/ddd';

import type { ArticleState, IArticle } from '../domain';
import { Article } from '../domain';

import type { ICreateArticleUseCaseInput } from '../ports/driving/types';
import type { ICreateArticleUseCase } from '../ports/driving/create-article.use-case.interface';
import { IArticleRepository } from '../ports/driven/article.repository.interface';

export class CreateArticleUseCase implements ICreateArticleUseCase {
  constructor(
    private idFactory: IIdFactory,
    private articleRepository: IArticleRepository
  ) {}

  async run({
    title,
    description,
  }: ICreateArticleUseCaseInput): Promise<ArticleState> {
    const id: Id = await this.idFactory.create();

    const newArticle: IArticle = new Article({
      id,
      title,
      description,
    });

    const newArticleSnapshot: ArticleState = newArticle.getSnapshot();

    await this.articleRepository.save(newArticleSnapshot);

    return newArticleSnapshot;
  }
}

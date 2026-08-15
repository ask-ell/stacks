import type { MaybeUndefined } from '@ask-ell/core';

import type { ArticleState, IArticle } from '../domain';
import { Article } from '../domain';

import type { IUpdateArticleUseCase } from '../ports/driving/update-article.use-case.interface';
import type { IUpdateArticleUseCaseInput } from '../ports/driving/types';
import { IArticleRepository } from '../ports/driven/article.repository.interface';
import { IArticleProvider } from '../ports/driven/article.provider.interface';

export class UpdateArticleUseCase implements IUpdateArticleUseCase {
  constructor(
    private articleProvider: IArticleProvider,
    private articleRepository: IArticleRepository
  ) {}

  async run({
    id,
    title,
    description,
  }: IUpdateArticleUseCaseInput): Promise<MaybeUndefined<ArticleState>> {
    const articleToUpdateState: MaybeUndefined<ArticleState> =
      await this.articleProvider.findOneById(id);

    if (!articleToUpdateState) {
      return undefined;
    }

    const articleToUpdate: IArticle = new Article(articleToUpdateState);

    articleToUpdate.updateAndCheckStateValidity(
      (): Partial<ArticleState> => ({
        title,
        description,
      })
    );

    const updatedArticleSnapshot: ArticleState = articleToUpdate.getSnapshot();
    const hasBeenUpdated: boolean = await this.articleRepository.updateOne(
      updatedArticleSnapshot
    );

    return hasBeenUpdated ? updatedArticleSnapshot : undefined;
  }
}

import type { MaybeUndefined } from '@ask-ell/core';

import type { ArticleState, IArticle } from '../domain';
import { Article } from '../domain';

import type { IUpdateArticleUseCase } from '../ports/driving/update-article.use-case.interface';
import type { IUpdateArticleUseCaseInput } from '../ports/driving/types';
import type { IUnitOfWork } from '../unit-of-work.interface';

export class UpdateArticleUseCase implements IUpdateArticleUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async run({
    id,
    title,
    description,
  }: IUpdateArticleUseCaseInput): Promise<MaybeUndefined<ArticleState>> {
    const articleToUpdateState: MaybeUndefined<ArticleState> =
      await this.unitOfWork.getArticleProvider().findOneById(id);

    if (!articleToUpdateState) {
      return undefined;
    }

    const articleToUpdate: IArticle = new Article(articleToUpdateState);

    articleToUpdate.updateAndCheckStateValidity(() => ({
      title,
      description,
    }));

    const updatedArticleSnapshot: ArticleState = articleToUpdate.getSnapshot();
    const hasBeenUpdated: boolean = await this.unitOfWork
      .getArticleRepository()
      .updateOne(updatedArticleSnapshot);

    return hasBeenUpdated ? updatedArticleSnapshot : undefined;
  }
}

import { KeyvAggregateRootRepository, KeyvRowData } from '@ask-ell/keyv';

import { ArticleState, IArticleRepository } from '../../application';

export class KeyvArticleRepository
  extends KeyvAggregateRootRepository<ArticleState>
  implements IArticleRepository
{
  protected override purgeData({
    title,
    description,
  }: KeyvRowData<ArticleState>): KeyvRowData<ArticleState> {
    return {
      title,
      description,
    };
  }
}

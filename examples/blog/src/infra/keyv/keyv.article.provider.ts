import { KeyvAggregateRootProvider } from '@ask-ell/keyv';

import { IArticleProvider, ArticleState } from '../../application';

export class KeyvArticleProvider
  extends KeyvAggregateRootProvider<ArticleState>
  implements IArticleProvider {}

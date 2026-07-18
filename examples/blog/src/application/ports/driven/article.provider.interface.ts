import type { IAggregateRootProvider } from '@ask-ell/hexa'

import type { ArticleState } from '../../domain'


export interface IArticleProvider
  extends IAggregateRootProvider<ArticleState> {}

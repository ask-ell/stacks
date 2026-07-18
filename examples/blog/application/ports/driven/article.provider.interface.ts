import type { IAggregateRootProvider } from '@ask-ell/core/hexa'

import type { IArticleState } from '../../domain'
import type { ArticleAggregateRootState } from './types'

export interface IArticleProvider
  extends IAggregateRootProvider<IArticleState, ArticleAggregateRootState> {}

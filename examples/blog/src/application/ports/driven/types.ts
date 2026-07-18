import type { AggregateRootState } from '@ask-ell/core/ddd'

import type { IArticleState } from '../../domain'

export type ArticleAggregateRootState = AggregateRootState<IArticleState>

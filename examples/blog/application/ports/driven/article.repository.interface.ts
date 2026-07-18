import type { IAggregateRootRepository } from '@ask-ell/core/hexa'

import type { ArticleAggregateRootState } from './types'
import type { IArticleState } from '../../domain'

export interface IArticleRepository extends IAggregateRootRepository<IArticleState, ArticleAggregateRootState> { }

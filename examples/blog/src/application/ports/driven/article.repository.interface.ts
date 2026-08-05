import type { IAggregateRootRepository } from '@ask-ell/hexa'

import type { ArticleState } from '../../domain'


export type IArticleRepository = IAggregateRootRepository<ArticleState>

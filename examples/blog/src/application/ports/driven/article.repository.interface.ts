import type { IAggregateRootRepository } from '@ask-ell/hexa'

import type { ArticleState } from '../../domain'


export interface IArticleRepository extends IAggregateRootRepository<ArticleState> { }

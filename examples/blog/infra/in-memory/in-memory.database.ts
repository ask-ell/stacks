import type { Id } from '@ask-ell/core/ddd'

import { breakReference } from './utils'
import type { ArticleAggregateRootState } from '../../application'

interface InMemoryDatabaseConstructor {
  articles?: ArticleAggregateRootState[]
}

export class InMemoryDatabase {
  readonly articles = new Map<Id, ArticleAggregateRootState>()

  constructor(data?: InMemoryDatabaseConstructor) {
    data?.articles?.forEach((article: ArticleAggregateRootState): void => {
      if (article.id) {
        this.articles.set(article.id, breakReference(article))
      }
    })
  }
}

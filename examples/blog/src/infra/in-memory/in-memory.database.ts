import type { Id } from '@ask-ell/ddd'

import { breakReference } from './utils'
import type { ArticleState } from '../../application'


// TODO: remove
interface InMemoryDatabaseConstructor {
  articles?: ArticleState[]
}

export class InMemoryDatabase {
  readonly articles = new Map<Id, ArticleState>()

  constructor(data?: InMemoryDatabaseConstructor) {
    data?.articles?.forEach((article: ArticleState): void => {
      if (article.id) {
        this.articles.set(article.id, breakReference(article))
      }
    })
  }
}

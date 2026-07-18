import type { Id } from '@ask-ell/core/ddd'
import type { Observable } from 'rxjs'

import type {
  IArticleRepository,
  ArticleAggregateRootState,
  IArticleState
} from '../../application'

import type { InMemoryDatabase } from './in-memory.database'
import { fakeWait, generateRandomId, breakReference } from './utils'

export class InMemoryArticleRepository implements IArticleRepository {
  constructor(private readonly database: InMemoryDatabase) { }

  async save(
    entityState: IArticleState
  ): Promise<ArticleAggregateRootState> {
    await fakeWait()

    const id: Id = generateRandomId()

    const newArticle: ArticleAggregateRootState = {
      id,
      ...entityState
    }

    this.database.articles.set(id, newArticle)

    return breakReference(newArticle)
  }

  async updateOne(
    aggregateRootState: ArticleAggregateRootState
  ): Promise<boolean> {
    await fakeWait()

    if (!aggregateRootState.id) {
      return false
    }

    if (!this.database.articles.get(aggregateRootState.id)) {
      return false
    }

    this.database.articles.set(aggregateRootState.id, aggregateRootState)

    return true
  }

  async removeOne(id: Id): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  lastSavedEntity$(): Observable<ArticleAggregateRootState> {
    throw new Error('Method not implemented.')
  }

  lastUpdatedEntity$(): Observable<ArticleAggregateRootState> {
    throw new Error('Method not implemented.')
  }

  lastDeletedEntity$(): Observable<ArticleAggregateRootState> {
    throw new Error('Method not implemented.')
  }
}

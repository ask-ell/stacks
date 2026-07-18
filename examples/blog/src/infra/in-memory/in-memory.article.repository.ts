import type { Id } from '@ask-ell/ddd'
import type { Observable } from 'rxjs'

import type {
  IArticleRepository,
  ArticleState,
} from '../../application'

import type { InMemoryDatabase } from './in-memory.database'
import { fakeWait, breakReference } from './utils'


export class InMemoryArticleRepository implements IArticleRepository {
  constructor(private readonly database: InMemoryDatabase) { }

  async save(
    entityState: ArticleState
  ): Promise<ArticleState> {
    await fakeWait()

    const newArticle: ArticleState = {
      ...entityState
    }

    this.database.articles.set(entityState.id, newArticle)

    return breakReference(newArticle)
  }

  async updateOne(
    aggregateRootState: ArticleState
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

  lastSavedEntity$(): Observable<ArticleState> {
    throw new Error('Method not implemented.')
  }

  lastUpdatedEntity$(): Observable<ArticleState> {
    throw new Error('Method not implemented.')
  }

  lastDeletedEntity$(): Observable<ArticleState> {
    throw new Error('Method not implemented.')
  }
}

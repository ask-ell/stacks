import type { Observable } from 'rxjs'
import type { MaybeUndefined } from '@ask-ell/core'
import type { Id } from '@ask-ell/core/ddd'

import type { ArticleAggregateRootState, IArticleProvider } from '../../application'

import type { InMemoryDatabase } from './in-memory.database'
import { breakReference, fakeWait } from './utils'

export class InMemoryArticleProvider implements IArticleProvider {
  constructor(private readonly database: InMemoryDatabase) { }

  async findAll(): Promise<ArticleAggregateRootState[]> {
    throw new Error('Method not implemented.')
  }

  async findOneById(
    id: Id
  ): Promise<MaybeUndefined<ArticleAggregateRootState>> {
    await fakeWait()
    const findedArticle: MaybeUndefined<ArticleAggregateRootState> =
      this.database.articles.get(id)
    if (!findedArticle) {
      return undefined
    }
    return breakReference(findedArticle)
  }

  lastSavedEntity$(): Observable<ArticleAggregateRootState> {
    throw new Error('Method not implemented.')
  }
}

import type { Observable } from 'rxjs'
import type { MaybeUndefined } from '@ask-ell/core'
import type { Id } from '@ask-ell/ddd'

import type { ArticleState, IArticleProvider } from '../../application'

import type { InMemoryDatabase } from './in-memory.database'
import { breakReference, fakeWait } from './utils'


export class InMemoryArticleProvider implements IArticleProvider {
  constructor(private readonly database: InMemoryDatabase) { }

  async findAll(): Promise<ArticleState[]> {
    throw new Error('Method not implemented.')
  }

  async findOneById(
    id: Id
  ): Promise<MaybeUndefined<ArticleState>> {
    await fakeWait()
    const findedArticle: MaybeUndefined<ArticleState> =
      this.database.articles.get(id)
    if (!findedArticle) {
      return undefined
    }
    return breakReference(findedArticle)
  }

  lastSavedEntity$(): Observable<ArticleState> {
    throw new Error('Method not implemented.')
  }
}

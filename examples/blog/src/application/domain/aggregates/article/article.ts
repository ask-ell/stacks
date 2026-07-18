import { ok, type IResult, fail } from '@ask-ell/core'
import { AggregateRoot } from '@ask-ell/ddd'

import { WrongArticleTitleSizeError } from '../../../errors'
import { MINIMUM_CHARACTERS_REQUIRED_FOR_ARTICLE_TITLE } from './constants'
import type { IArticle } from './article.interface'
import type { ArticleState } from './article.state'


export class Article extends AggregateRoot<ArticleState> implements IArticle {
  checkStateValidity(newState: ArticleState): IResult<void> {
    if (newState.title.length < MINIMUM_CHARACTERS_REQUIRED_FOR_ARTICLE_TITLE) {
      return fail(new WrongArticleTitleSizeError())
    }
    return ok()
  }
}

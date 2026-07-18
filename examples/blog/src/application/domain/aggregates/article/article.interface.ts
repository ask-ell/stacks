import type { IAggregateRoot } from '@ask-ell/core/ddd'

import type { IArticleState } from './article.state.interface'

export interface IArticle extends IAggregateRoot<IArticleState> {}

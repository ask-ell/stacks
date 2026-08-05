import type { IAggregateRoot } from '@ask-ell/ddd'

import type { ArticleState } from './article.state'


export type IArticle = IAggregateRoot<ArticleState>

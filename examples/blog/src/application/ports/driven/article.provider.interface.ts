import type { IAggregateRootProvider } from '@ask-ell/hexa'

import type { ArticleState } from '../../domain'


export type IArticleProvider = IAggregateRootProvider<ArticleState>

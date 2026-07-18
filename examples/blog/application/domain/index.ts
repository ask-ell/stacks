import type { IArticleState } from './aggregates/article/article.state.interface'
import type { IArticle } from './aggregates/article/article.interface'

import { Article } from './aggregates/article/article'
import { WrongArticleTitleSizeError } from '../errors/wrong-article-title-size.error'

export type { IArticle, IArticleState }

export { Article, WrongArticleTitleSizeError }

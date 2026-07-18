import type { IUseCase } from '@ask-ell/core/hexa'

import type { ICreateArticleUseCaseInput } from './types'
import type { ArticleAggregateRootState } from '../driven/types'

export interface ICreateArticleUseCase extends IUseCase<ICreateArticleUseCaseInput, Promise<ArticleAggregateRootState>> { }

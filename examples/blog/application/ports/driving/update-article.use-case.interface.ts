import type { IUseCase } from '@ask-ell/core/hexa'
import type { MaybeUndefined } from '@ask-ell/core'

import type { IUpdateArticleUseCaseInput } from './types'
import type { ArticleAggregateRootState } from '../driven/types'

export interface IUpdateArticleUseCase extends IUseCase<IUpdateArticleUseCaseInput, Promise<MaybeUndefined<ArticleAggregateRootState>>> { }

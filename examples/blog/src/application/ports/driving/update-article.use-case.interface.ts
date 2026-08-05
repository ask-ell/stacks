import type { MaybeUndefined } from '@ask-ell/core'
import type { IUseCase } from '@ask-ell/hexa'

import { ArticleState } from '../../domain'
import type { IUpdateArticleUseCaseInput } from './types'


export type IUpdateArticleUseCase = IUseCase<IUpdateArticleUseCaseInput, Promise<MaybeUndefined<ArticleState>>>

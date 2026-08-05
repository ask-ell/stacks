import { MaybeUndefined } from '@ask-ell/core'
import type { IUseCase } from '@ask-ell/hexa'

import { ArticleState } from '../../domain'
import type { ICreateArticleUseCaseInput } from './types'


export type ICreateArticleUseCase = IUseCase<ICreateArticleUseCaseInput, Promise<MaybeUndefined<ArticleState>>>

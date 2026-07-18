import type { MaybeUndefined } from '@ask-ell/core'
import type { IUseCase } from '@ask-ell/hexa'

import { ArticleState } from '../../domain'
import type { IUpdateArticleUseCaseInput } from './types'


export interface IUpdateArticleUseCase extends IUseCase<IUpdateArticleUseCaseInput, Promise<MaybeUndefined<ArticleState>>> { }

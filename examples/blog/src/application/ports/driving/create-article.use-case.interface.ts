import type { IUseCase } from '@ask-ell/hexa'

import { ArticleState } from '../../domain'
import type { ICreateArticleUseCaseInput } from './types'


export interface ICreateArticleUseCase extends IUseCase<ICreateArticleUseCaseInput, Promise<ArticleState>> { }

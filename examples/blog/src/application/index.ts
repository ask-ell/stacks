import type { IArticleProvider } from './ports/driven/article.provider.interface'
import type { IArticleRepository } from './ports/driven/article.repository.interface'
import type { ICreateArticleUseCase } from './ports/driving/create-article.use-case.interface'
import type { IUpdateArticleUseCase } from './ports/driving/update-article.use-case.interface'
import type { ICreateArticleUseCaseInput, IUpdateArticleUseCaseInput } from './ports/driving/types'
import type { ArticleAggregateRootState } from './ports/driven/types'
import type { IUnitOfWork } from './unit-of-work.interface'
import type { IArticleState } from './domain/aggregates/article/article.state.interface'

import { CreateArticleUseCase } from './use-cases/create-article.use-case'
import { UpdateArticleUseCase } from './use-cases/update-article.use-case'

export type {
  IUnitOfWork,
  IArticleProvider,
  IArticleRepository,
  ICreateArticleUseCase,
  IUpdateArticleUseCase,
  ICreateArticleUseCaseInput,
  ArticleAggregateRootState,
  IArticleState,
  IUpdateArticleUseCaseInput
}

export { CreateArticleUseCase, UpdateArticleUseCase }
export * from './errors'

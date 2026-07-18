import type { Id } from '@ask-ell/core/ddd'

export interface ICreateArticleUseCaseInput {
  title: string
  description: string
}

export interface IUpdateArticleUseCaseInput {
  id: Id
  title: string
  description: string
}

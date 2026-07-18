import { AggregateRootState } from "@ask-ell/ddd"

export type ArticleState = AggregateRootState<{
  title: string
  description: string
}>;

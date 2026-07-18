import { ApplicationError } from '@ask-ell/hexa';

import { MINIMUM_CHARACTERS_REQUIRED_FOR_ARTICLE_TITLE } from '../domain'


export class WrongArticleTitleSizeError extends ApplicationError {
  constructor() {
    super(
      `article title must contain less than ${MINIMUM_CHARACTERS_REQUIRED_FOR_ARTICLE_TITLE}`
    )
  }
}

import {
  Injectable,
  NestInterceptor,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ErrorInterceptor } from '@ask-ell/back-end';

import { WrongArticleTitleSizeError } from '../../../application';

@Injectable()
export class ApplicationErrorInterceptor
  extends ErrorInterceptor
  implements NestInterceptor
{
  constructor() {
    super({
      errorConvertor: (error: unknown): unknown => {
        if (error instanceof WrongArticleTitleSizeError) {
          return new UnprocessableEntityException(error.originalMessage);
        }

        return error;
      },
    });
  }
}

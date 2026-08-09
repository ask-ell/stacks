import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnprocessableEntityException } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

import { WrongArticleTitleSizeError } from '../../../application';


function convertApplicationError(error: unknown): unknown {
  if (
    error instanceof WrongArticleTitleSizeError
  ) {
    return new UnprocessableEntityException(error.originalMessage);
  }

  return error;
}

// TODO: move in @ask-ell/nest as base class
@Injectable()
export class ApplicationErrorInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error: unknown): Observable<never> => {
        return throwError(() => convertApplicationError(error));
      }),
    );
  }
}

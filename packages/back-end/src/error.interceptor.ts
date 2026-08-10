import { Entity, IResult, ok } from '@ask-ell/core';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';


type ErrorInterceptorProps = {
  errorConvertor: (error: unknown) => unknown
}

export class ErrorInterceptor extends Entity<ErrorInterceptorProps> implements NestInterceptor {
  override checkStateValidity(): IResult {
    return ok()
  }

  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    const { errorConvertor } = this.getSnapshot()
    return next.handle().pipe(
      catchError((error: unknown): Observable<never> => {
        return throwError((): unknown => errorConvertor(error));
      }),
    );
  }
}

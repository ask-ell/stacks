import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpResponseBody } from '../types';


@Injectable()
export class ResponseFormatInterceptor<T> implements NestInterceptor<T, HttpResponseBody<T>> {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<HttpResponseBody<T>> {
    return next
      .handle()
      .pipe(
        map(
          (data: T): HttpResponseBody<T> => ({
            data,
            message: 'ok'
          })
        ),
      );
  }
}
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import type { Response } from 'express';

import { HttpResponseBody } from '../types';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse<Response>();
    const status: number = exception.getStatus();

    response.status(status).json({
      message: exception.message,
    } as HttpResponseBody);
  }
}

import {
  type ExceptionFilter,
  type ArgumentsHost,
  Catch,
  HttpException,
} from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import type { Response } from 'express';

import type { HttpResponseBody } from '../../http';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse<Response>();
    const status: number = exception.getStatus();
    const responseData: HttpResponseBody = {
      message: exception.message,
    };
    response.status(status).json(responseData);
  }
}

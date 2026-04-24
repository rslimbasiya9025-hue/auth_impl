import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const exceptionStatus = exception.getStatus();
    const res = exception.getResponse();

    const responseBody =
      typeof res === 'string'
        ? { message: res } // ✅ convert string → object
        : res;

    response.status(exceptionStatus).json({
      ...responseBody,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

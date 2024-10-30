import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { format } from 'date-fns';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_METADATA } from '../';

export type Response<T> = {
  status: boolean;
  statusCode: number;
  path: string;
  message: string;
  data: T;
  timestamp: string;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log({ exception });
    const exceptionResponse: any = exception.getResponse();

    response.status(status).json({
      status: false,
      statusCode: status,
      path: request.url,
      timestamp: format(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss OOOO'),
      message: exceptionResponse?.error,
      errors: exceptionResponse?.message,
    });

    return exception.message;
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = response.statusCode;
    const message =
      this.reflector.get<string>(
        RESPONSE_MESSAGE_METADATA,
        context.getHandler(),
      ) || 'success';

    return {
      status: true,
      statusCode,
      path: request.url,
      timestamp: format(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss OOOO'),
      message: message,
      data: res,
    };
  }
}

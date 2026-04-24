import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// interface ApiResponse<T> {
//   success: boolean;
//   message?: string;
//   data?: T;
// }

class ApiResponse<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data: T,
  ) {}
}

type ResponseWithMeta<T> = {
  message?: string;
  data?: T;
};

export class ResponseInterceptors<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: T): ApiResponse<T> => {
        if (data == 'object' && data != null) {
          const mayBeData = data as ResponseWithMeta<T>;
          return new ApiResponse(
            true,
            mayBeData?.message || 'Request Successful',
            mayBeData?.data ?? data,
          );
        }

        return new ApiResponse(true, 'Request Successfull', data);
      }),
    );
  }
}

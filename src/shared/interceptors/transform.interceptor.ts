import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import {
  CallHandler,
  NestInterceptor,
} from "@nestjs/common/interfaces/features/nest-interceptor.interface";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";

export interface ApiResponse<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponse<T>> {
    const responseStatusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => ({
        data: data,
        error: false,
        message: "Success",
        code: responseStatusCode,
      }))
    );
  }
}

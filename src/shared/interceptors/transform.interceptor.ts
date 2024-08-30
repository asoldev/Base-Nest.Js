import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

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
        const responseStatusCode = context
            .switchToHttp()
            .getResponse().statusCode;

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

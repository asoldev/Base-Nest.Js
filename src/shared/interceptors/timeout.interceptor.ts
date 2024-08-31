import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from "@nestjs/common";
import { Observable, throwError, TimeoutError } from "rxjs";
import { catchError, timeout } from "rxjs/operators";

const SECONDS_MS = 1000;
const MINUTES_MS = SECONDS_MS * 60;
const HOURS_MS = MINUTES_MS * 60;
const DAYS_MS = HOURS_MS * 24;
const TIMEOUT_MS = 5 * SECONDS_MS;

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(TIMEOUT_MS),
            catchError((err) => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => err);
            })
        );
    }
}

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { CallHandler, NestInterceptor } from "@nestjs/common/interfaces/features/nest-interceptor.interface";
import { Logger } from "@nestjs/common/services/logger.service";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs/internal/operators/tap";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const now = Date.now();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const method = request.method;
        const url = request.url;

        this.logger.log(`[${method}] ${url} - Bắt đầu`);

        return next.handle().pipe(
            tap((response) => {
                const responseTimeMs = Date.now() - now;
                const minutes = Math.floor(responseTimeMs / 60000);
                const seconds = ((responseTimeMs % 60000) / 1000).toFixed(2);

                let timeFormatted = "";
                if (minutes > 0) {
                    timeFormatted = `${minutes} phút ${seconds} giây`;
                } else {
                    timeFormatted = `${seconds} giây`;
                }

                let jsonResponse;
                try {
                    jsonResponse = JSON.stringify(response || "");
                } catch (error) {
                    jsonResponse = String(response);
                }

                const responseSizeBytes = Buffer.byteLength(jsonResponse, "utf-8");
                let responseSizeFormatted: string;

                if (responseSizeBytes > 1024 * 1024) {
                    // Greater than 1 MB
                    responseSizeFormatted = (responseSizeBytes / (1024 * 1024)).toFixed(2) + " MB";
                } else {
                    const responseSizeKB = (responseSizeBytes / 1024).toFixed(2); // Size in KB
                    responseSizeFormatted = responseSizeKB + " KB";
                }

                if (responseTimeMs < 2000) {
                    this.logger.log(`[${method}] ${url} - Kết thúc (${timeFormatted}, ${responseSizeFormatted})`);
                } else if (responseTimeMs >= 2000 && responseTimeMs < 5000) {
                    this.logger.warn(
                        `[${method}] ${url} - Cảnh báo: Thời gian phản hồi chậm (${timeFormatted}, ${responseSizeFormatted})`
                    );
                } else {
                    this.logger.error(
                        `[${method}] ${url} - Lỗi: Thời gian phản hồi rất chậm (${timeFormatted}, ${responseSizeFormatted})`
                    );
                }
            })
        );
    }
}

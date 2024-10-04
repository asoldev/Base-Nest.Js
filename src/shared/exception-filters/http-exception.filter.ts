import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpErrorExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.error(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const responseStatusCode = exception.getStatus();

        response.status(responseStatusCode).json({
            error: true,
            code: responseStatusCode,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}

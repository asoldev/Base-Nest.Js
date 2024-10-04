import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class MongoErrorExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();

        const status = HttpStatus.UNPROCESSABLE_ENTITY;

        const codeError = exception.code;
        const result = {
            error: true,
            code: codeError,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        };
        switch (codeError) {
            default:
                result.code = status;
                break;
        }
        response.status(status).json(result);
    }
}

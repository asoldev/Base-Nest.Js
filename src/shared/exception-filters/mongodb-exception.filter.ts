import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoErrorExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();

        const status = HttpStatus.UNPROCESSABLE_ENTITY;

        const codeError = exception.code;
        const result = {
            code: codeError,
            timestamp: new Date().toISOString(),
            message: exception.message,
            error: true,
        };
        switch (codeError) {
            default:
                result.code = status;
                break;
        }
        response.status(status).json(result);
    }
}

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception instanceof HttpException ? exception.getStatus() : 500;

        console.error('Unhandled exception:', exception); // Log the error

        response.status(status).json({
            statusCode: status,
            message: exception instanceof HttpException ? exception.getResponse() : 'Internal server error',
        });
    }
}

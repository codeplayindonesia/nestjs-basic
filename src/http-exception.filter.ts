import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    // log error request
    console.error(`Error Exception: ${exception.message}`)

    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    response
      .status(statusCode)
      .json({
        statusCode,
        message: exception.message,
        timestamp: new Date(),
        path: request.url,
      })
  }

}

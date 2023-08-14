import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class RegistrationFailedExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    response.status(400).json({
      statusCode: 400,
      message: 'Registration Failed! try again later',
      error: 'Bad Request',
    });
  }
}
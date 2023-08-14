import { ArgumentsHost, Catch, ConflictException } from '@nestjs/common';

@Catch(ConflictException)
export class EmailExistsExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    response.status(409).json({
      statusCode: 409,
      message: 'Email already exists! try again later',
      error: 'Conflict',
    });
  }
}
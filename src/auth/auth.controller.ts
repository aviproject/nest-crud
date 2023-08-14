import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { signUpDTO, singInDTO } from './auth.dto';
import { RegistrationFailedExceptionFilter } from 'src/exception/exceptionFilters/registration-failed.exception';
import { EmailExistsExceptionFilter } from 'src/exception/exceptionFilters/email-exists.exception';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() signInDto: singInDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @UseFilters(RegistrationFailedExceptionFilter, EmailExistsExceptionFilter)
  async signUp(@Body() signUpDto: signUpDTO) {
    try {
      const registerUsers = await this.authService.signUp(signUpDto);
      let responseBody = {
        message: 'Registration successful',
        id: registerUsers,
      };
      return responseBody;
    } catch (error) {
      throw error;
    }
  }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { signUpDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() signUpDto: Record<string, any>) {

      const registerUsers = await this.authService.register(signUpDto.username, signUpDto.password, signUpDto.email);
      console.log(registerUsers,"HHhki")
      let responseBody = {
          code : HttpStatus.OK,
          message : "User registered successfully",
          data : registerUsers
      }
      return responseBody
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() signUpDto:signUpDTO){
    const registerUsers = await this.authService.signUp(signUpDto);
      let responseBody = {
          message : "User registered successfully",
          data : registerUsers
      }
      return responseBody
  }
}
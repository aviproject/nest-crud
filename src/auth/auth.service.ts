import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { signUpDTO } from './auth.dto';
import { comparePassword } from 'src/utils/encryption';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    const is_password_match = await comparePassword(pass,user.password)
    if (!is_password_match) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      message: `Welcom, ${user.first_name}`,
      id: user.id
    };
  }

  async signUp(signUpDto: signUpDTO) {
    const registeredUser = this.usersService.userRegistration(signUpDto);

    return registeredUser;
  }
}

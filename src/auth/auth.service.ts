import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { signUpDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(userName: string, password: any, email: string) {
    const allUsers = await this.usersService.allUsers();

    let data = {
      userId: allUsers.length + 1,
      username: userName,
      password: password,
      email: email,
    };
    const user = await this.usersService.RegisterUser(data);
    console.log(user, 'User');

    return user;
  }

  async signUp(signUpDto: signUpDTO) {
    const registeredUser = this.usersService.userRegistration(signUpDto);

    return registeredUser;
  }
}

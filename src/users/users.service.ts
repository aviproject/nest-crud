import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signUpDTO } from 'src/auth/auth.dto';

export type Users = any;
export type RegisterUser = {
  userId: number;
  username: string;
  password: any;
  email: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
    {
      userId: 3,
      username: 'Avaneesh',
      password: 'avi1850',
    },
  ];

  async findOne(username: string): Promise<Users | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async allUsers(): Promise<Users | undefined> {
    return this.users;
  }

  async RegisterUser(user: RegisterUser) {
    this.users.push(user);
    return this.users;
  }

  async userRegistration(signUpDto: signUpDTO) {
    const user = new User();

    user.first_name = signUpDto.first_name;
    user.last_name = signUpDto.last_name;
    user.email = signUpDto.email;
    user.password = signUpDto.password;

    try {
      let userData = await this.userRepository.save(user);
      return userData;
    } catch {
      throw 'Registration failed! try again later';
    }
  }
}

import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signUpDTO } from 'src/auth/auth.dto';
import { encryptPassword } from 'src/utils/encryption';

export type Users = any;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({
      where: {email : email}
    });
    return user
  }

  async userRegistration(signUpDto: signUpDTO) {
    const is_user_matched = await this.userRepository.findOne({
      where: { email: signUpDto.email },
    });

    if (is_user_matched) {
      throw new ConflictException();
    } else {
      try {
        const password = await encryptPassword(signUpDto.password);
        const user = new User();

        user.first_name = signUpDto.first_name;
        user.last_name = signUpDto.last_name;
        user.email = signUpDto.email;
        user.password = password;
        user.isActive = true;
        let userData = await this.userRepository.save(user);

        return userData.id;
      } catch (error) {
        throw new NotFoundException(); // Throw RegistrationFailedException
      }
    }
  }
}

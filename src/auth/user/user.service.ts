import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByUserName(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        user_name: username,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(this.userRepository.create(user));
  }

}

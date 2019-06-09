import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../user.entity';
import {FindOneOptions, Repository} from 'typeorm';
import { createHmac } from 'crypto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async login(user: Partial<User>): Promise<User> {
    const nUser = user.email ? await this.findByEmail(user.email) : await this.findByUserName(user.user_name);

    if (!nUser) {
      throw new HttpException('用户名或密码错误', 406);
    }

    if (nUser.password !== createHmac('sha256', user.password).digest('hex')) {
      throw new HttpException('用户名或密码错误', 406);
    }

    return nUser;
  }

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

  async findById(id: number, select?: Array<keyof User>, cache?: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: {
        id,
      },
    };
    if (select) {
      options.select = select;
    }
    if (cache) {
      options.cache = cache;
    }
    return this.userRepository.findOne(options);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(this.userRepository.create(user));
  }

}

import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user.entity';
import {FindOneOptions, Repository} from 'typeorm';
import { createHmac } from 'crypto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async login(user: Partial<UserEntity>): Promise<UserEntity> {
    const nUser = user.email ? await this.findByEmail(user.email) : await this.findByUserName(user.user_name);

    if (!nUser) {
      throw new HttpException('用户名或密码错误', 406);
    }

    if (nUser.password !== createHmac('sha256', user.password).digest('hex')) {
      throw new HttpException('用户名或密码错误', 406);
    }

    return nUser;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByUserName(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        user_name: username,
      },
    });
  }

  async findById(id: number, select?: Array<keyof UserEntity>, cache?: number): Promise<UserEntity> {
    const options: FindOneOptions<UserEntity> = {
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

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(this.userRepository.create(user));
  }

}

import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../../../entity/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  public constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }
}

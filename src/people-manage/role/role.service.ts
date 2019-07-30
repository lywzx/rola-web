import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {RolesEntity} from '../../entity/roles.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class RoleService extends TypeOrmCrudService<RolesEntity> {
  constructor(@InjectRepository(RolesEntity) repo) {
    super(repo);
  }
}

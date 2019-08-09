import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {PermissionsEntity} from '../../../entity/permissions.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class PermissionService extends TypeOrmCrudService<PermissionsEntity> {
  public constructor(@InjectRepository(PermissionsEntity) repo) {
    super(repo);
  }
}

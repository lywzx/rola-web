import { Injectable } from '@nestjs/common';
import {EnvironmentsEntity} from '../../../entity/environments.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class EnvironmentService extends TypeOrmCrudService<EnvironmentsEntity> {
  public constructor(@InjectRepository(EnvironmentsEntity) repo) {
    super(repo);
  }
}

import { Injectable } from '@nestjs/common';
import {EnvironmentsEntity} from '../../../entity/environments.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class EnvironmentService extends TypeOrmCrudService<EnvironmentsEntity> {
  public constructor(@InjectRepository(EnvironmentsEntity) protected readonly repo: Repository<EnvironmentsEntity>) {
    super(repo);
  }

  public getEnvironmentsByIds(ids: number[], fields = null): Promise<EnvironmentsEntity[]> {
    return this.repo.findByIds(ids);
  }
}

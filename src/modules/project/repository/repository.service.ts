import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {ProjectRepositoryEntity} from '../../../entity/project-repository.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ProjectRepositoryService extends TypeOrmCrudService<ProjectRepositoryEntity> {
  public constructor(@InjectRepository(ProjectRepositoryEntity) repo) {
    super(repo);
  }

}

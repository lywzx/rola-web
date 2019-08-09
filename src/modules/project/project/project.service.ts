import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {ProjectsEntity} from '../../../entity/projects.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ProjectService extends TypeOrmCrudService<ProjectsEntity> {
  public constructor(@InjectRepository(ProjectsEntity) repo) {
    super(repo);
  }
}

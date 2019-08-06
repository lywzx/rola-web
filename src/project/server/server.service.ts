import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {ProjectServerEntity} from '../../entity/project-server.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ProjectServerService extends TypeOrmCrudService<ProjectServerEntity> {
  public constructor(@InjectRepository(ProjectServerEntity) repo) {
    super(repo);
  }

}

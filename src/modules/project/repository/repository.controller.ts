import {Controller, Param, ParseIntPipe, Req, UseGuards} from '@nestjs/common';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from '@nestjsx/crud';
import {ProjectRepositoryEntity} from '../../../entity/project-repository.entity';
import {ProjectRepositoryService} from './repository.service';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import { Request } from 'express';
import {UserEntity} from '../../../entity/user.entity';
import {ProjectsEntity} from '../../../entity/projects.entity';
import {RouterEntity} from '../../../decorator/RouterEntity';
import {getConnection} from 'typeorm';

@ApiUseTags('project/:projectId/repository')
@Crud({
  model: {
    type: ProjectRepositoryEntity,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase'],
  },
  params: {
    projectId: {
      primary: false,
      field: 'projects.id',
      type: 'number',
    },
  },
  query: {
    join: {
      projects: {
        eager: true,
      },
    },
  },
})
@UseGuards(AuthGuard())
@Controller('api/project/:projectId/repository')
export class ProjectRepositoryController implements CrudController<ProjectRepositoryEntity> {

  get base(): CrudController<ProjectRepositoryEntity> {
    return this;
  }

  public constructor(public service: ProjectRepositoryService) {}

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ProjectRepositoryEntity,
    @Req() request: Request,
    @RouterEntity(ProjectsEntity, 'projectId') project: ProjectsEntity,
  ) {
    const user = request.user as UserEntity;
    dto.user_id = user.id;
    dto.project_id = project.id;
    const repository = await getConnection()
      .createQueryBuilder()
      .relation(ProjectsEntity, 'repository')
      .of(project)
      .loadOne<ProjectRepositoryEntity>();
    if (repository) {
      dto.id = repository.id;
    }
    return this.base.createOneBase(req, dto);
  }
}

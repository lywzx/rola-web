import {Controller, Req, UseGuards} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from '@nestjsx/crud';
import {ProjectsEntity} from '../../../entity/projects.entity';
import {ProjectService} from './project.service';
import {Request} from 'express';
import {UserEntity} from '../../../entity/user.entity';

@ApiUseTags('project')
@Crud({
  model: {
    type: ProjectsEntity,
  },
  routes: {
    exclude: ['createManyBase'],
  },
})
@UseGuards(AuthGuard())
@Controller('api/project')
export class ProjectController implements CrudController<ProjectsEntity> {
  public constructor(public service: ProjectService) {}

  get base(): CrudController<ProjectsEntity> {
    return this;
  }

  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: ProjectsEntity, @Req() request: Request): Promise<ProjectsEntity> {
    const user = request.user as UserEntity;
    dto.user_id = user.id;
    return this.base.createOneBase(req, dto);
  }
}

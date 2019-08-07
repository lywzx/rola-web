import {Controller, UseGuards} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {Crud, CrudController} from '@nestjsx/crud';
import {ProjectsEntity} from '../../entity/projects.entity';
import {ProjectService} from './project.service';

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
}

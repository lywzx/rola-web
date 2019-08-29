import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {ProjectRepositoryEntity} from '../../../entity/project-repository.entity';
import {ProjectRepositoryService} from './repository.service';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@ApiUseTags('project/:projectId/repository')
@Crud({
  model: {
    type: ProjectRepositoryEntity,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
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
  public constructor(public service: ProjectRepositoryService) {}
}

import {Controller, UseGuards} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {Crud, CrudController} from '@nestjsx/crud';
import {ProjectServerEntity} from '../../../entity/project-server.entity';
// import {ProjectServerService} from './server.service';
import {ServersEntity} from '../../../entity/servers.entity';
import {ServerService} from '../../server/server/server.service';

@ApiUseTags('project/:projectId/server')
@Crud({
  model: {
    type: ProjectServerEntity,
  },
  routes: {
    only: ['getManyBase'],
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
@Controller('api/project/:projectId/server')
export class ProjectServerController implements CrudController<ServersEntity> {
  public constructor(public service: ServerService) {}
}

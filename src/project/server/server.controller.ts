import {Controller, UseGuards} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {Crud, CrudController} from '@nestjsx/crud';
import {ProjectServerEntity} from '../../entity/project-server.entity';
import {ProjectServerService} from './server.service';

@ApiUseTags('project/server')
@Crud({
  model: {
    type: ProjectServerEntity,
  },
})
@UseGuards(AuthGuard())
@Controller('api/project/server')
export class ProjectServerController implements CrudController<ProjectServerEntity> {
  public constructor(public service: ProjectServerService) {}
}

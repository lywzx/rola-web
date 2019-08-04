import { Controller } from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {ServersEntity} from '../../entity/servers.entity';
import {ServerService} from './server.service';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('server')
@Crud({
  model: {
    type: ServersEntity,
  },
})
@Controller('api/server')
export class ServerController implements CrudController<ServersEntity> {
  public constructor(public service: ServerService) {}
}

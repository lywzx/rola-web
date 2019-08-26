import {Controller, Req, UseGuards} from '@nestjs/common';
import {Crud, CrudController, ParsedBody, Override, ParsedRequest, CrudRequest} from '@nestjsx/crud';
import {ServersEntity} from '../../../entity/servers.entity';
import {ServerService} from './server.service';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {UserEntity} from '../../../entity/user.entity';

@ApiUseTags('server')
@Crud({
  model: {
    type: ServersEntity,
  },
  query: {
    exclude: ['password', 'user_id'],
    join: {
      creator: {
        exclude: ['password', 'created_at', 'updated_at'],
        eager: false,
      },
      tags: {
        eager: true,
      },
      spaces: {
        eager: false,
      },
      projects: {
        eager: false,
      },
    },
  },
})
@Controller('api/server')
@UseGuards(AuthGuard())
export class ServerController implements CrudController<ServersEntity> {
  public constructor(public service: ServerService) {}

  get base(): CrudController<ServersEntity> {
    return this;
  }

  @Override()
  createOne(
    @Req() request: Request,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ServersEntity,
  ) {
    const user = request.user as UserEntity;
    dto.user_id = user.id;
    return this.base.createOneBase(req, dto);
  }
}

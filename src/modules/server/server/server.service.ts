import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {ServersEntity} from '../../../entity/servers.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ServerService extends TypeOrmCrudService<ServersEntity> {
  public constructor(@InjectRepository(ServersEntity) repo) {
    super(repo);
  }
}

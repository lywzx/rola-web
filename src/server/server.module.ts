import { Module } from '@nestjs/common';
import { ServerController } from './server/server.controller';
import { ServerService } from './server/server.service';
import {ServersEntity} from '../entity/servers.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([ServersEntity])],
  controllers: [ServerController],
  providers: [ServerService ],
})
export class ServerModule {}

import { Module } from '@nestjs/common';
import { ServerController } from './server/server.controller';
import { ServerService } from './server/server.service';
import {ServersEntity} from '../../entity/servers.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';
import {TagsEntity} from '../../entity/tags.entity';
import {PassportModule} from '../../passport.module';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([ServersEntity, TagsEntity]),
  ],
  controllers: [ServerController, TagController],
  providers: [ServerService, TagService ],
})
export class ServerModule {}

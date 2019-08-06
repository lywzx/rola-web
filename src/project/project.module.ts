import { Module } from '@nestjs/common';
import { ProjectController } from './project/project.controller';
import { ServerController } from './server/server.controller';
import { ServerService } from './server/server.service';
import {PassportModule} from '../passport.module';
import { ProjectService } from './project/project.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectsEntity} from '../entity/projects.entity';
import {ProjectServerEntity} from '../entity/project-server.entity';

@Module({
  imports: [ PassportModule, TypeOrmModule.forFeature([ProjectsEntity, ProjectServerEntity]) ],
  controllers: [ProjectController, ServerController],
  providers: [ServerService, ProjectService],
})
export class ProjectModule {}

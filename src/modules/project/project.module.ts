import { Module } from '@nestjs/common';
import { ProjectController } from './project/project.controller';
import { ProjectServerController } from './server/server.controller';
import { ProjectServerService } from './server/server.service';
import {PassportModule} from '../../passport.module';
import { ProjectService } from './project/project.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectsEntity} from '../../entity/projects.entity';
import {ProjectServerEntity} from '../../entity/project-server.entity';
import {ProjectDeployEntity} from '../../entity/project-deploy.entity';
import {ProjectEnvironmentEntity} from '../../entity/project-environment.entity';
import {ProjectEnvironmentVariableEntity} from '../../entity/project-environment-variable.entity';
import {ProjectEnvironmentDeployEntity} from '../../entity/project-environment-deploy.entity';
import {ProjectEnvironmentSettingFileEntity} from '../../entity/project-environment-setting-file.entity';
import {ProjectRepositoryEntity} from '../../entity/project-repository.entity';
import {SpacesEntity} from '../../entity/spaces.entity';
import {UserEntity} from '../../entity/user.entity';
import {EnvironmentsEntity} from '../../entity/environments.entity';
import {EnvironmentService} from '../environment/environment/environment.service';
import { ProjectRepositoryController } from './repository/repository.controller';
import { ProjectRepositoryService } from './repository/repository.service';
import {ServerService} from '../server/server/server.service';
import {ServersEntity} from '../../entity/servers.entity';

@Module({
  imports: [ PassportModule,
    TypeOrmModule.forFeature([
      ProjectsEntity,
      ProjectServerEntity,
      ProjectDeployEntity,
      ProjectEnvironmentEntity,
      ProjectEnvironmentVariableEntity,
      ProjectEnvironmentDeployEntity,
      ProjectEnvironmentSettingFileEntity,
      ProjectRepositoryEntity,
      EnvironmentsEntity,
      SpacesEntity,
      ServersEntity,
      UserEntity,
    ]),
  ],
  controllers: [ProjectController, ProjectServerController, ProjectRepositoryController],
  providers: [ProjectServerService, ProjectService, EnvironmentService, ProjectRepositoryService, ServerService],
})
export class ProjectModule {}

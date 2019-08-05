import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { SpaceModule } from './space/space.module';
import { EnvironmentModule } from './environment/environment.module';
import { ProjectModule } from './project/project.module';
import { PeopleManageModule } from './people-manage/people-manage.module';
import {UserService} from './auth/user/user.service';
import { ServerModule } from './server/server.module';
import { ConfigModule } from './config/config.module';
import {config} from './util/config';


@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(config(`database.connections.${config('database.default')}`)),
    SpaceModule,
    EnvironmentModule,
    ProjectModule,
    PeopleManageModule,
    ServerModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
  exports: [AuthModule],
})
export class AppModule {}

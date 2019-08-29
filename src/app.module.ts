import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { SpaceModule } from './modules/space/space.module';
import { EnvironmentModule } from './modules/environment/environment.module';
import { ProjectModule } from './modules/project/project.module';
import { PeopleManageModule } from './modules/people-manage/people-manage.module';
import { ServerModule } from './modules/server/server.module';
import {config} from './util/helper';
import { ShareModule } from './modules/share/share.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(config(`database.connections.${config('database.default')}`)),
    SpaceModule,
    EnvironmentModule,
    ProjectModule,
    PeopleManageModule,
    ServerModule,
    ShareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AuthModule],
})
export class AppModule {}

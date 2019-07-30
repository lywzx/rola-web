import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { SpaceModule } from './space/space.module';
import { EnvironmentModule } from './environment/environment.module';
import { ProjectModule } from './project/project.module';
import { PeopleManageModule } from './people-manage/people-manage.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(), SpaceModule, EnvironmentModule, ProjectModule, PeopleManageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

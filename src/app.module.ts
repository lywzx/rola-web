import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { SpaceModule } from './space/space.module';
import { EnvironmentModule } from './environment/environment.module';
import { ProjectModule } from './project/project.module';
import { PeopleManageModule } from './people-manage/people-manage.module';
import {JwtModule} from '@nestjs/jwt';
import {UserService} from './auth/user/user.service';
import {JwtStrategy} from './auth/jwt.strategy';
import { ServerModule } from './server/server.module';
import { CrudConfigService } from '@nestjsx/crud';
import { ConfigModule } from './config/config.module';
import {config} from './util/config';
import {PassportModule} from './passport/passport.module';

CrudConfigService.load({
  query: {
    limit: 25,
    cache: 2000,
  },
});
@Module({
  imports: [
    JwtModule.register(config('jwt')),
    PassportModule,
    AuthModule, TypeOrmModule.forRoot(config(`database.${config('database.default')}`)),
    SpaceModule,
    EnvironmentModule,
    ProjectModule,
    PeopleManageModule,
    ServerModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, JwtStrategy],
})
export class AppModule {}

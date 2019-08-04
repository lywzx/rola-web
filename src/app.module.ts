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
import {PassportModule} from '@nestjs/passport';
import {UserService} from './auth/user/user.service';
import {JwtStrategy} from './auth/jwt.strategy';
import { ServerModule } from './server/server.module';
import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
  query: {
    limit: 25,
    cache: 2000,
  },
});
@Module({
  imports: [
    JwtModule.register({
      secret: 'secret1234567',
      signOptions: {
        expiresIn: 360000,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule, TypeOrmModule.forRoot(), SpaceModule, EnvironmentModule, ProjectModule, PeopleManageModule, ServerModule],
  controllers: [AppController],
  providers: [AppService, UserService, JwtStrategy],
})
export class AppModule {}

import {Module} from '@nestjs/common';
import {UserEntity} from '../entity/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';
import {AuthController} from './auth/auth.controller';
import {JwtStrategy} from './jwt.strategy';
import {JwtModule} from '@nestjs/jwt';
import {config} from '../util/config';
import {PassportModule} from '../passport.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register(config('jwt')),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService, AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, AuthService, UserService, JwtStrategy],
})
export class AuthModule {
}

import { Module } from '@nestjs/common';
import {User} from './user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import {JwtModule} from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret1234567',
    }),
  ],
  providers: [UserService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

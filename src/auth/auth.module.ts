import { Module } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import {JwtModule} from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import {JwtStrategy} from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'secret1234567',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [  ],
})
export class AuthModule {}

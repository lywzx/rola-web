import { Module } from '@nestjs/common';
import {User} from './user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import {JwtModule} from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import {JwtStrategy} from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import {RolesEntity} from '../entity/roles.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, RolesEntity]),
    JwtModule.register({
      secret: 'secret1234567',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy, RoleService],
  controllers: [AuthController, RoleController],
  exports: [  ],
})
export class AuthModule {}

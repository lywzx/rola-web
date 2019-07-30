import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { RoleController } from './role/role.controller';
import { PermissionController } from './permission/permission.controller';
import {RoleService} from './role/role.service';
import {PermissionService} from './permission/permission.service';
import {RolesEntity} from '../entity/roles.entity';
import {PermissionsEntity} from '../entity/permissions.entity';
import {UserEntity} from '../entity/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([RolesEntity, PermissionsEntity, UserEntity])],
  controllers: [UserController, RoleController, PermissionController],
  providers: [UserService, RoleService, PermissionService],
})
export class PeopleManageModule {}

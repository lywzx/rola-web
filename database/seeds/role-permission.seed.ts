import {Seeder} from 'typeorm-seeding';
import {Connection, ObjectType} from 'typeorm';
import {EntityFactory} from 'typeorm-seeding/dist/entity-factory';
import {
  each,
  keyBy,
  filter,
  map,
} from 'lodash';
import {
  plainToClassFromExist,
} from 'class-transformer';
import {RolesEntity} from '../../src/entity/roles.entity';
import {PermissionsEntity} from '../../src/entity/permissions.entity';
import {PermissionRoleEntity} from '../../src/entity/permission-role.entity';

export default class RolePermissionSeed implements Seeder {

  private readonly roles = [
    {
      name: 'administrator',
      display_name: '系统超级管理员',
    },
    {
      name: 'owner',
      display_name: '工作区所有者',
    },
    {
      name: 'developer',
      display_name: '开发者',
    },
  ];

  private readonly permissions = [
    {
      name: 'space_create',
      display_name: '创建工作区',
      roles: ['owner'],
    },
    {
      name: 'space_update',
      display_name: '更改工作区',
      roles: ['owner'],
    },
  ];

  async run(
    factory: <Entity, Settings>(entity: ObjectType<Entity>) => (settings?: Settings) => EntityFactory<Entity, Settings>,
    connection: Connection,
  ): Promise<any> {

    const cm = connection.createEntityManager();

    // 处理角色
    const roles = await cm.find<RolesEntity>(RolesEntity);
    const roleExists = keyBy(roles, 'name');
    for (const role of this.roles) {
      if (!roleExists[role.name]) {
        const newRole = await cm.save<RolesEntity>(plainToClassFromExist(new RolesEntity(), role));
        roles.push(newRole);
        roleExists[newRole.name] = newRole;
      }
    }

    const permissionExists = await cm.find<PermissionsEntity>(PermissionsEntity);
    const permissionKey = keyBy(permissionExists, 'name');
    // 处理权限
    for (const permission of this.permissions) {
      let currentPermission = permissionKey[permission.name];
      let currentPermissionRoles = [];
      if (!currentPermission) {
        currentPermission = await cm.save<PermissionsEntity>(plainToClassFromExist(new PermissionsEntity(), {
          name: permission.name,
          display_name: permission.display_name,
        }));
      } else {
        currentPermissionRoles = await connection
          .createQueryBuilder()
          .relation(PermissionsEntity, 'roles')
          .of(currentPermission)
          .loadMany<RolesEntity>();
        currentPermissionRoles = map(currentPermissionRoles, 'name');
      }

      const newConnectRole = filter(permission.roles, (it) => {
        return currentPermissionRoles.indexOf(it) === -1;
      }).map(it => {
        return roleExists[it].id;
      });

      if (newConnectRole.length) {
        await cm.insert<PermissionRoleEntity>(PermissionRoleEntity, map(newConnectRole, (roleId: number) => {
          return {
            role_id: roleId,
            permission_id: currentPermission.id,
          };
        }));
      }
    }
  }

}

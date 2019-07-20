import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
  name: 'permission_role',
})
export class PermissionRoleEntity {

  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  'permission_id': number;

  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  'role_id': number;
}

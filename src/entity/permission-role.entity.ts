import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
  name: 'permission_role',
})
export class PermissionRoleEntity {

  @PrimaryColumn({
    unsigned: true,
  })
  'permission_id': number;

  @PrimaryColumn({
    unsigned: true,
  })
  'role_id': number;
}

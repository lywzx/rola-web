import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
  name: 'permission_role',
})
export class PermissionRoleEntity {

  @PrimaryColumn('int')
  'permission_id': number;

  @PrimaryColumn('int')
  'role_id': number;
}

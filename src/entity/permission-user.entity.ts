import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity({
  name: 'permission_user',
})
export class PermissionUserEntity {

  @PrimaryColumn('int')
  'permission_id': number;

  @PrimaryColumn('int')
  'user_id': number;

  @Column({
    type: 'varchar',
    comment: 'user type',
    default: '',
  })
  'user_type': string;
}

import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity({
  name: 'permission_user',
})
export class PermissionUserEntity {

  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  'permission_id': number;

  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  'user_id': number;

  @Column({
    type: 'varchar',
    comment: 'user type',
    default: '',
  })
  'user_type': string;
}

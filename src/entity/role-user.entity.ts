import {Entity, PrimaryColumn} from 'typeorm';

@Entity({
  name: 'role_user',
})
export class RoleUserEntity {

  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  'role_id': number;

  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  'user_id': number;
}

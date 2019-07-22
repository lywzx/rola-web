import {Entity, PrimaryColumn} from 'typeorm';

@Entity({
  name: 'role_user',
})
export class RoleUserEntity {

  @PrimaryColumn({
    unsigned: true,
  })
  'role_id': number;

  @PrimaryColumn({
    unsigned: true,
  })
  'user_id': number;
}

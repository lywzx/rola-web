import {Entity, PrimaryColumn} from 'typeorm';

@Entity({
  name: 'role_user',
})
export class RoleUserEntity {

  @PrimaryColumn('int')
  'role_id': number;

  @PrimaryColumn({
    type: 'int',
  })
  'user_id': number;
}

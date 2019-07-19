import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RolesEntity} from './roles.entity';
import {User} from '../auth/user.entity';
import {BaseEntity} from './base.entity';

@Entity({
  name: 'permission',
})
export class PermissionsEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    length: 100,
  })
  'display_name': string;

  @Column({
    length: 300,
  })
  description: string;

  @ManyToMany(type => RolesEntity, role => role.permissions)
  roles: RolesEntity[];

  @ManyToMany(type => User)
  @JoinTable({
    name: 'permission_user',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}

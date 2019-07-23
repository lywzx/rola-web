import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RolesEntity} from './roles.entity';
import {User} from '../auth/user.entity';
import {BaseEntity} from './base.entity';

@Entity({
  name: 'permission',
})
export class PermissionsEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    unique: true,
    length: 60,
  })
  name: string;

  @Column({
    length: 100,
    charset: 'utf8mb4',
  })
  'display_name': string;

  @Column({
    length: 300,
    charset: 'utf8mb4',
    default: '',
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

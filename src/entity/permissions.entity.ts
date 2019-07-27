import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RolesEntity} from './roles.entity';
import {User} from '../auth/user.entity';
import {BaseEntity} from './base.entity';
import {IsNotEmpty, IsOptional, IsString, Matches, MaxLength, ValidationOptions} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const [CREATE, UPDATE] = CrudValidationGroups;

@Entity({
  name: 'permission',
})
export class PermissionsEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @IsOptional({ groups: [UPDATE]})
  @IsNotEmpty()
  @IsString({ always: true})
  @MaxLength(60, {always: true})
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,59}$/)
  @Column({
    unique: true,
    length: 60,
  })
  name: string;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty()
  @IsString({ always: true })
  @MaxLength(100)
  @Column({
    length: 100,
    charset: 'utf8mb4',
  })
  'display_name': string;

  @IsOptional()
  @IsNotEmpty()
  @IsString({ always: true})
  @MaxLength(300)
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

import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../auth/user.entity';
import {PermissionsEntity} from './permissions.entity';
import {BaseEntity} from './base.entity';
import {IsNotEmpty, IsOptional, IsString, Matches, MaxLength, ValidationOptions, IsByteLength} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;
const validateWithCreateAndUpdateGroup = {
  groups: [CREATE, UPDATE],
} as ValidationOptions;

@Entity({
  name: 'role',
})
export class RolesEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty(validateWithCreateAndUpdateGroup)
  @IsString({
    ...validateWithCreateAndUpdateGroup,
    always: true,
  })
  @MaxLength(60, {
    ...validateWithCreateAndUpdateGroup,
    always: true,
  })
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,59}$/, validateWithCreateAndUpdateGroup)
  @Column({
    unique: true,
    length: 60,
    comment: 'role name',
  })
  name: string;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty(validateWithCreateAndUpdateGroup)
  @IsString({
    ...validateWithCreateAndUpdateGroup,
    always: true,
  })
  @MaxLength(100, validateWithCreateAndUpdateGroup)
  @Column({
    length: 100,
    comment: 'role display name',
    charset: 'utf8mb4',
    default: '',
  })
  'display_name': string;

  @IsOptional(validateWithCreateAndUpdateGroup)
  @IsNotEmpty(validateWithCreateAndUpdateGroup)
  @IsString({
    ...validateWithCreateAndUpdateGroup,
    always: true,
  })
  @MaxLength(300, validateWithCreateAndUpdateGroup)
  @Column({
    length: 300,
    comment: 'role description',
    charset: 'utf8mb4',
    default: '',
  })
  description: string;

  @ManyToMany(type => User, user => user.roles, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'role_user',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @ManyToMany( type => PermissionsEntity, permission => permission.roles, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'permission_role',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionsEntity[];
}

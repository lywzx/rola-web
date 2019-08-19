import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RolesEntity} from './roles.entity';
import {UserEntity} from './user.entity';
import {BaseEntity} from './base.entity';
import {IsArray, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, ValidateNested, ValidationOptions} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import {UniqueEntity} from '../validator/UniqueEntityConstraint';
import {Type} from 'class-transformer';
import {RoleIdOnlyDto} from '../dto/role-id-only.dto';
import {UserIdOnlyDto} from '../dto/user-id-only.dto';

const {CREATE, UPDATE} = CrudValidationGroups;
const validateWithCreateAndUpdateGroup = {
  groups: [CREATE, UPDATE],
} as ValidationOptions;

@Entity({
  name: 'permission',
})
export class PermissionsEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty(validateWithCreateAndUpdateGroup)
  @IsString(validateWithCreateAndUpdateGroup)
  @MaxLength(60, validateWithCreateAndUpdateGroup)
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,59}$/, validateWithCreateAndUpdateGroup)
  @UniqueEntity({
    table: 'permission',
  }, validateWithCreateAndUpdateGroup)
  @Column({
    unique: true,
    length: 60,
  })
  name: string;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty(validateWithCreateAndUpdateGroup)
  @IsString(validateWithCreateAndUpdateGroup)
  @MaxLength(100)
  @Column({
    length: 100,
    charset: 'utf8mb4',
  })
  'display_name': string;

  @IsOptional({always: true})
  @IsString(validateWithCreateAndUpdateGroup)
  @MaxLength(300, validateWithCreateAndUpdateGroup)
  @Column({
    length: 300,
    charset: 'utf8mb4',
    default: '',
  })
  description: string;

  @Type(type => RoleIdOnlyDto)
  @IsOptional({
    always: true,
  })
  @IsArray({
    always: true,
  })
  @ValidateNested({
    always: true,
    each: true,
  })
  @ManyToMany(type => RolesEntity, role => role.permissions)
  roles: RolesEntity[];

  @Type(type => UserIdOnlyDto)
  @IsOptional({
    always: true,
  })
  @IsArray({
    always: true,
  })
  @ValidateNested({
    always: true,
    each: true,
  })
  @ManyToMany(type => UserEntity)
  @JoinTable({
    name: 'permission_user',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];
}

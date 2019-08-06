import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './user.entity';
import {PermissionsEntity} from './permissions.entity';
import {BaseEntity} from './base.entity';
import {IsNotEmpty, IsOptional, IsString, Matches, MaxLength, ValidationOptions, IsByteLength, ValidateNested, IsArray} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { UniqueEntity } from '../validator/UniqueEntityConstraint';
import {Type} from 'class-transformer';
import {PermissionIdOnlyDto} from '../dto/permission-id-only.dto';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {UserIdOnlyDto} from '../dto/user-id-only.dto';

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
  @UniqueEntity({
    table: 'role',
  }, {
    groups: [CREATE],
  })
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,59}$/, validateWithCreateAndUpdateGroup)
  @ApiModelProperty()
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
  @ApiModelProperty()
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
  @ApiModelProperty()
  @Column({
    length: 300,
    comment: 'role description',
    charset: 'utf8mb4',
    default: '',
  })
  description: string;

  @Type(type => UserIdOnlyDto)
  @IsOptional({always: true})
  @IsArray({always: true})
  @ValidateNested({always: true, each: true})
  @ApiModelPropertyOptional()
  @ManyToMany(type => UserEntity, user => user.roles, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'role_user',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];

  @Type(type => PermissionIdOnlyDto)
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
  @ApiModelPropertyOptional()
  @ManyToMany( type => PermissionsEntity, permission => permission.roles, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'permission_role',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionsEntity[];
}

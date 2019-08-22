import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {SpacesEntity} from './spaces.entity';
import {UserEntity} from './user.entity';
import {YesOrNo} from './options';
import {
  IsArray,
  IsIn, IsInt, IsIP, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, Min, ValidateNested,
  ValidationOptions,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import {ApiModelProperty} from '@nestjs/swagger';
import {TagsEntity} from './tags.entity';
import {NumericIp} from '../util/numericIp';
import {
  isString,
  isNumber,
} from 'lodash';
import {Type} from 'class-transformer';
import {TagIdOnlyDto} from '../dto/tag-id-only.dto';

const {CREATE, UPDATE} = CrudValidationGroups;
@Entity({
  name: 'server',
})
export class ServersEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    unsigned: true,
  })
  'user_id': number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty({always: true})
  @IsString({ always: true})
  @MaxLength(60, {always: true})
  @ApiModelProperty()
  @Column({
    length: 60,
    charset: 'utf8mb4',
  })
  name: string;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty({always: true})
  @IsIP(undefined, {always: true})
  @Column({
    name: 'ip_address',
    type: 'bigint',
    unsigned: true,
    transformer: {
      to(value: any) {
        if (isString(value) && /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)) {
          return NumericIp.inet_aton(value);
        } else if (isNumber(value)) {
          return value;
        }
        return 0;
      },
      from(value: any) {
        if (isNumber(value) || /\d+/.test(value)) {
          return NumericIp.inet_ntoa(value);
        }
        return '';
      },
    },
  })
  @ApiModelProperty()
  'ip_address': string|number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty({always: true})
  @IsInt({always: true})
  @Min(1, {always: true})
  @ApiModelProperty()
  @Column({
    type: 'smallint',
    unsigned: true,
  })
  'ssh_port': number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsString({always: true})
  @IsNotEmpty({always: true})
  @Matches(/^[-a-zA-Z0-9_]{2,60}$/, {always: true})
  @ApiModelProperty()
  @Column({
    length: 60,
    nullable: true,
  })
  'ssh_user': string;

  @IsOptional({always: true})
  @IsString({always: true})
  @MaxLength(62, {always: true})
  @ApiModelProperty()
  @Column({
    length: 62,
    nullable: true,
  })
  'password': string;

  @IsOptional({always: true})
  @IsString({ always: true})
  @MaxLength(300, {always: true})
  @ApiModelProperty()
  @Column({
    length: 300,
    default: '',
    charset: 'utf8mb4',
  })
  description: string;

  @IsOptional()
  @IsIn([YesOrNo.yes, YesOrNo.no])
  @ApiModelProperty()
  @Column({
    type: 'enum',
    enum: YesOrNo,
    default: YesOrNo.yes,
  })
  lock: YesOrNo;

  @ManyToMany( type => SpacesEntity)
  @JoinTable({
    name: 'space_server',
    joinColumn: {
      name: 'server_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'space_id',
      referencedColumnName: 'id',
    },
  })
  spaces: SpacesEntity[];

  @ManyToOne( type => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  creator: UserEntity;

  @Type(type => TagIdOnlyDto)
  @IsOptional({always: true})
  @IsArray({always: true})
  @ValidateNested({always: true})
  @ManyToMany(type => TagsEntity)
  @JoinTable({
    name: 'server_tag',
    joinColumn: {
      name: 'server_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: TagsEntity[];
}

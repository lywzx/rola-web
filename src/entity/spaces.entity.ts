import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './user.entity';
import {BaseEntity} from './base.entity';
import {ProjectsEntity} from './projects.entity';
import {EnvironmentsEntity} from './environments.entity';
import {IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested, ValidationOptions} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {CrudValidationGroups} from '@nestjsx/crud';
import {Type} from 'class-transformer';
import {UserIdOnlyDto} from '../dto/user-id-only.dto';

const {CREATE, UPDATE} = CrudValidationGroups;
@Entity({
  name: 'space',
})
export class SpacesEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'user_id',
    type: 'int',
    unsigned: true,
    comment: 'creator id',
  })
  'user_id': number;

  @Column({
    name: 'owner_id',
    unsigned: true,
    nullable: true,
    comment: 'space owner',
  })
  'owner_id': number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsString({always: true})
  @IsNotEmpty({always: true})
  @MaxLength(60, {always: true})
  @ApiModelProperty()
  @Column({
    length: 60,
    comment: 'space name',
    charset: 'utf8mb4',
  })
  name: string;

  @ManyToOne( type => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  creator: UserEntity;

  @Type(() => UserIdOnlyDto)
  @ValidateNested({always: true})
  @ApiModelPropertyOptional({ type: UserIdOnlyDto, isArray: false})
  @ManyToOne( type => UserEntity, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner?: UserEntity;

  @OneToMany(type => EnvironmentsEntity, environment => environment.space)
  environments: EnvironmentsEntity[];

  projects: ProjectsEntity[];
}

import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SpacesEntity} from './spaces.entity';
import {BaseEntity} from './base.entity';
import {UserEntity} from './user.entity';
import {YesOrNo, ProjectStatusOptions} from './options';
import {ServersEntity} from './servers.entity';
import {ProjectRepositoryEntity} from './project-repository.entity';
import {ProjectEnvironmentEntity} from './project-environment.entity';
import {ProjectDeployEntity} from './project-deploy.entity';
import {
  IsIn, IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import {Exclude, Type} from 'class-transformer';
import {ApiModelProperty} from '@nestjs/swagger';
import {EnvironmentIdOnlyDto} from '../dto/environment-id-only.dto';
import {ExistsEntity} from '../validator/ExistsEntityConstraint';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({
  name: 'project',
})
export class ProjectsEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty({always: true})
  @IsInt({always: true})
  @ExistsEntity({
    table: 'space',
    columnName: 'id',
  }, {
    always: true,
  })
  @ApiModelProperty()
  @Column({
    unsigned: true,
  })
  'space_id': number;

  @Column({
    name: 'user_id',
    unsigned: true,
    comment: 'creator id',
  })
  'user_id': number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty({always: true})
  @IsString({ always: true})
  @MaxLength(191, {
    always: true,
  })
  @ApiModelProperty()
  @Column({
    type: 'varchar',
    length: 191,
    charset: 'utf8mb4',
  })
  name: string;

  @IsOptional({always: true})
  @IsString({ always: true})
  @MaxLength(300, {
    always: true,
  })
  @ApiModelProperty()
  @Column({
    default: '',
    length: 300,
    comment: 'project description',
    charset: 'utf8mb4',
  })
  description: string;

  @IsOptional({
    always: true,
  })
  @IsIn([ProjectStatusOptions.lock, ProjectStatusOptions.ok], {
    always: true,
  })
  @ApiModelProperty()
  @Column({
    type: 'enum',
    enum: ProjectStatusOptions,
    comment: 'project status',
    default: ProjectStatusOptions.lock,
  })
  status: ProjectStatusOptions;

  @IsOptional({always: true})
  @IsIn([YesOrNo.yes, YesOrNo.no], {always: true})
  @Column({
    type: 'enum',
    enum: YesOrNo,
    comment: 'Need to be reviewed before going online',
    default: YesOrNo.yes,
  })
  'require_review': YesOrNo;

  @ManyToOne(type => SpacesEntity, space => space.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'space_id',
    referencedColumnName: 'id',
  })
  space?: SpacesEntity;

  @Exclude({
    toClassOnly: true,
  })
  @ManyToOne( type => UserEntity, user => user.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  creator?: UserEntity;

  @OneToMany(type => ProjectEnvironmentEntity, projectEnvironment => projectEnvironment.project, {cascade: true})
  environments?: ProjectEnvironmentEntity[];

  @ManyToMany( type => ServersEntity, server => server.projects)
  @JoinTable({
    name: 'project_server',
    joinColumn: {
      name: 'server_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
  })
  servers?: ServersEntity[];

  @OneToOne(type => ProjectRepositoryEntity, repository => repository.project)
  repository?: ProjectRepositoryEntity;

  @OneToMany(type => ProjectDeployEntity, deploy => deploy.project)
  deploy?: ProjectDeployEntity;
}

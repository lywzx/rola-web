import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SpacesEntity} from './spaces.entity';
import {BaseEntity} from './base.entity';
import {User} from '../auth/user.entity';
import {YesOrNo, ProjectStatusOptions} from './options';
import {ServersEntity} from './servers.entity';
import {ProjectRepositoryEntity} from './project-repository.entity';
import {ProjectEnvironmentEntity} from './project-environment.entity';
import {ProjectDeployEntity} from './project-deploy.entity';
import {IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const [ CREATE, UPDATE ] = CrudValidationGroups;

@Entity({
  name: 'project',
})
export class ProjectsEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @IsOptional({ groups: [ UPDATE ]})
  @IsInt()
  @Min(0)
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

  @IsOptional({ groups: [UPDATE]})
  @IsNotEmpty()
  @IsString({ always: true})
  @MaxLength(191)
  @Column({
    type: 'varchar',
    length: 191,
    charset: 'utf8mb4',
  })
  name: string;

  @IsOptional()
  @IsString({ always: true})
  @MaxLength(300)
  @Column({
    default: '',
    length: 300,
    comment: 'project description',
    charset: 'utf8mb4',
  })
  description: string;

  @IsOptional()
  @IsIn([ProjectStatusOptions.lock, ProjectStatusOptions.ok])
  @Column({
    type: 'enum',
    enum: ProjectStatusOptions,
    comment: 'project status',
    default: ProjectStatusOptions.lock,
  })
  status: ProjectStatusOptions;

  @IsOptional()
  @IsIn([YesOrNo.yes, YesOrNo.no])
  @Column({
    type: 'enum',
    enum: YesOrNo,
    comment: 'Need to be reviewed before going online',
    default: YesOrNo.yes,
  })
  'require_review': YesOrNo;

  @ManyToOne(type => SpacesEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'space_id',
    referencedColumnName: 'id',
  })
  space: SpacesEntity;

  @ManyToOne( type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  creator: User;

  @OneToMany(type => ProjectEnvironmentEntity, projectEnvironment => projectEnvironment.display_name)
  /*@JoinTable({
    name: 'project_environment',
    joinColumn: {
      name: 'environment_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
  })*/
  environments: ProjectEnvironmentEntity[];

  // @ManyToMany( type => ServersEntity)
  /*@JoinTable({
    name: 'project_server',
    joinColumn: {
      name: 'server_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
  })*/
  servers: ServersEntity[];

  @OneToOne(type => ProjectRepositoryEntity, {
    nullable: true,
  })
  repository: ProjectRepositoryEntity;

  @OneToMany(type => ProjectDeployEntity, deploy => deploy.project)
  deploy: ProjectDeployEntity;
}

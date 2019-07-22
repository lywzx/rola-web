import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SpacesEntity} from './spaces.entity';
import {BaseEntity} from './base.entity';
import {User} from '../auth/user.entity';
import {YesOrNo, ProjectStatusOptions} from './options';
import {EnvironmentsEntity} from './environments.entity';
import {ServersEntity} from './servers.entity';
import {ProjectRepositoryEntity} from './project-repository.entity';
import {ProjectEnvironmentEntity} from './project-environment.entity';
import {ProjectDeployEntity} from './project-deploy.entity';

@Entity({
  name: 'project',
})
export class ProjectsEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

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

  @Column({
    type: 'varchar',
    length: 60,
  })
  name: string;

  @Column({
    default: '',
    length: 300,
    comment: 'project description',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatusOptions,
    comment: 'project status',
  })
  status: ProjectStatusOptions;

  @Column({
    type: 'enum',
    enum: YesOrNo,
    comment: 'Need to be reviewed before going online',
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

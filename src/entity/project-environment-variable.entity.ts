import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {ProjectEnvironmentEntity} from './project-environment.entity';
import {ProjectVariableEntity} from './project-variable.entity';
import {ProjectsEntity} from './projects.entity';

@Entity({
  name: 'project_environment_variable',
})
// @Unique(['project_environment_id', 'project_variable_id'])
export class ProjectEnvironmentVariableEntity {
  /*@PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;*/

  @Column({
    unsigned: true,
  })
  'project_id': number;

  @PrimaryColumn({
    unsigned: true,
  })
  'project_environment_id': number;

  @PrimaryColumn({
    unsigned: true,
  })
  'project_variable_id': number;

  @Column({
    length: 2000,
    default: '',
  })
  'value': string;

  @ManyToOne(type => ProjectEnvironmentEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'project_environment_id',
    referencedColumnName: 'id',
  })
  projectEnvironment: ProjectEnvironmentEntity;

  @ManyToOne(type => ProjectVariableEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'project_variable_id',
    referencedColumnName: 'id',
  })
  projectVariable: ProjectVariableEntity;

  @ManyToOne(type => ProjectsEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: ProjectsEntity;
}

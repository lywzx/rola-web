import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {ProjectsEntity} from './projects.entity';
import {ProjectEnvironmentVariableEntity} from './project-environment-variable.entity';

@Entity({
  name: 'project_variable',
})
@Unique(['project_id', 'name'])
export class ProjectVariableEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    unsigned: true,
  })
  'project_id': number;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    length: 100,
  })
  'display_name': string;

  @Column({
    length: 2000,
    default: '',
  })
  'value': string;

  @ManyToOne(type => ProjectsEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: ProjectsEntity;

  @OneToMany(type => ProjectEnvironmentVariableEntity, projectEnvironmentVariable => projectEnvironmentVariable.projectVariable)
  variables: ProjectEnvironmentVariableEntity;
}

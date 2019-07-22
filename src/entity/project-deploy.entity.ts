import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {ProjectsEntity} from './projects.entity';
import {ProjectDeployOptions, ProjectDeployShellTypeOptions} from './options';

@Entity({
  name: 'project_deploy',
})
@Unique(['step_id', 'step_type', 'project_id'])
export class ProjectDeployEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    unsigned: true,
  })
  'project_id': number;

  @Column({
    unsigned: true,
    type: 'tinyint',
    comment: 'step id',
  })
  'step_id': number;

  @Column({
    type: 'enum',
    enum: ProjectDeployOptions,
    default: ProjectDeployOptions.before,
    comment: 'deploy type , before or after',
  })
  'step_type': ProjectDeployOptions;

  @Column({
    length: 60,
    comment: 'shell bash name',
  })
  'name': string;

  @Column({
    length: 30,
    comment: 'The user of the script execution, null will dependency project',
    nullable: true,
  })
  'run_user': string;

  @Column({
    type: 'text',
    comment: 'shell content',
  })
  'shell_content': string;

  @Column({
    type: 'enum',
    enum: ProjectDeployShellTypeOptions,
    default: ProjectDeployShellTypeOptions.up,
  })
  'shell_type': ProjectDeployShellTypeOptions;

  @Column({
    type: 'boolean',
    comment: 'is optional shell',
    default: true,
  })
  'is_optional': boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  'checked': boolean;

  @ManyToOne(type => ProjectsEntity)
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: ProjectsEntity;
}

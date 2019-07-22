import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {ProjectsEntity} from './projects.entity';
import {ProjectEnvironmentEntity} from './project-environment.entity';
import {BaseEntity} from './base.entity';

@Entity({
  name: 'project_setting_file',
})
@Unique(['project_id', 'name'])
export class ProjectSettingFilesEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    unsigned: true,
  })
  'project_id': number;

  @Column({
    length: 191,
    comment: 'file comment name',
  })
  name: string;

  @Column({
    name: 'file_path',
    comment: 'file path',
  })
  filePath: string;

  @Column({
    type: 'text',
    comment: 'file content',
  })
  content: string;

  @ManyToOne( type => ProjectsEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: ProjectsEntity;

  @ManyToMany(type => ProjectEnvironmentEntity, projectEnvironment => projectEnvironment.projectSettingFiles)
  @JoinTable({
    name: 'project_environment_setting_file',
    joinColumn: {
      name: 'project_environment_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_setting_file_id',
      referencedColumnName: 'id',
    },
  })
  projectEnvironments: ProjectEnvironmentEntity[];
}

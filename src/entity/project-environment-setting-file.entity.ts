import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {ProjectsEntity} from './projects.entity';

@Entity({
  name: 'project_environment_setting_file',
})
export class ProjectEnvironmentSettingFileEntity {

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
  'project_setting_file_id': number;

  @ManyToOne( type => ProjectsEntity)
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: ProjectsEntity;

  /*@ManyToOne(type => ProjectEnvironmentEntity)
  @JoinColumn({
    name: 'project_environment_id',
    referencedColumnName: 'id',
  })
  projectEnvironment: ProjectEnvironmentEntity;*/
}

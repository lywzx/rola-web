import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {YesOrNo} from './options';
import {ProjectsEntity} from './projects.entity';
import {ProjectSettingFilesEntity} from './project-setting-files.entity';
import {BaseEntity} from './base.entity';
import {ProjectDeployEntity} from './project-deploy.entity';

@Entity({
  name: 'project_environment',
})
@Unique(['project_id', 'environment_id'])
export class ProjectEnvironmentEntity extends BaseEntity {

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
  })
  'environment_id': number;

  @Column({
    type: 'varchar',
    length: 60,
  })
  name: string;

  @Column({
    length: 200,
    default: '',
    charset: 'utf8mb4',
  })
  'display_name': string;

  @Column({
    type: 'enum',
    enum: YesOrNo,
    default: YesOrNo.no,
  })
  lock: YesOrNo;

  @ManyToOne(type => ProjectsEntity)
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: ProjectsEntity;

  @ManyToMany(type => ProjectSettingFilesEntity, settingFiles => settingFiles.projectEnvironments)
  projectSettingFiles: ProjectSettingFilesEntity[];

  @ManyToMany(type => ProjectDeployEntity)
  @JoinTable({
    name: 'project_environment_deploy',
    joinColumn: {
      name: 'project_environment_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_deploy_id',
      referencedColumnName: 'id',
    },
  })
  projectDeploys: ProjectDeployEntity[];
}

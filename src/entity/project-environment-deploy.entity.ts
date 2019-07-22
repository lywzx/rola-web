import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {ProjectsEntity} from './projects.entity';

@Entity({
  name: 'project_environment_deploy',
})
export class ProjectEnvironmentDeployEntity {

  @PrimaryColumn({
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
  'project_deploy_id': number;

  @ManyToOne(type => ProjectsEntity)
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: ProjectsEntity;
}

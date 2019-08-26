import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {ProjectsEntity} from './projects.entity';
import {EnvironmentsEntity} from './environments.entity';
import {ServersEntity} from './servers.entity';

@Entity({
  name: 'project_server',
})
@Unique(['project_id', 'server_id'/*, 'environment_id'*/])
export class ProjectServerEntity {
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
  'server_id': number;

  /*@Column({
    unsigned: true,
    nullable: true,
  })
  'environment_id': number;*/

  @ManyToOne(type => ProjectsEntity)
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: ProjectsEntity;

  @ManyToOne(type => ServersEntity)
  @JoinColumn({
    name: 'server_id',
    referencedColumnName: 'id',
  })
  server: ServersEntity;

  /*@ManyToOne(type => EnvironmentsEntity, {
    nullable: true,
  })
  @JoinColumn({
    name: 'environment_id',
    referencedColumnName: 'id',
  })
  environment: EnvironmentsEntity;*/
}

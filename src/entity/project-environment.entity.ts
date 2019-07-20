import {Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {YesOrNo} from './options';
import {ProjectsEntity} from './projects.entity';

@Entity({
  name: 'project_environment',
})
@Unique(['project_id', 'environment_id'])
export class ProjectEnvironmentEntity {

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
    type: 'varchar',
    length: 200,
    default: '',
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
}

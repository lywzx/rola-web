import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProjectRepositoryOnlineLogo, ProjectRepositoryType} from './options';
import {BaseEntity} from './base.entity';
import {ProjectsEntity} from './projects.entity';
import {User} from '../auth/user.entity';

@Entity({
  name: 'project_repository',
})
export class ProjectRepositoryEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    unsigned: true,
  })
  'user_id': number;

  @Column({
    unsigned: true,
  })
  'project_id': number;

  @Column({
    type: 'enum',
    enum: ProjectRepositoryType,
    default: ProjectRepositoryType.git,
    comment: 'project repository type, e.g: svn, git',
  })
  type: ProjectRepositoryType;

  @Column({
    length: 300,
    default: '',
    comment: 'git or svn url',
    charset: 'utf8mb4',
  })
  url: string;

  @Column({
    type: 'enum',
    enum: ProjectRepositoryOnlineLogo,
    comment: 'online mode',
  })
  'online_logo': ProjectRepositoryOnlineLogo;

  @Column({
    length: 30,
    name: 'default_branch',
    comment: 'default branch name',
    default: 'master',
  })
  defaultBranch: string;

  @Column({
    length: 400,
    default: '',
    charset: 'utf8mb4',
  })
  destination: string;

  @OneToOne(type => ProjectsEntity)
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: ProjectsEntity;

  @ManyToOne( type1 => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}

import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProjectRepositoryOnlineLogo, ProjectRepositoryType} from './options';
import {BaseEntity} from './base.entity';
import {ProjectsEntity} from './projects.entity';
import {UserEntity} from './user.entity';
import {IsIn, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, ValidateIf} from 'class-validator';
import {CrudValidationGroups} from '@nestjsx/crud';

const {CREATE, UPDATE} = CrudValidationGroups;

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
    unique: true,
    unsigned: true,
  })
  'project_id': number;

  @IsOptional({always: true})
  @IsNotEmpty({always: true})
  @IsIn([ProjectRepositoryType.git, ProjectRepositoryType.svn], {always: true})
  @Column({
    type: 'enum',
    enum: ProjectRepositoryType,
    default: ProjectRepositoryType.git,
    comment: 'project repository type, e.g: svn, git',
  })
  type: ProjectRepositoryType;

  @IsOptional({groups: [UPDATE]})
  @IsNotEmpty({always: true})
  @IsString({always: true})
  @Matches(/((^git@|^http(s)?:\/\/)([\w\.@]+)(\/|:))([\w,\-,\_]+)\/([\w,\-,\_]+)(.git){0,1}((\/){0,1})/, {
    always: true,
  })
  @Column({
    length: 300,
    default: '',
    comment: 'git or svn url',
    charset: 'utf8mb4',
    transformer: {
      to(value: any): any {
        return value;
      },
      from(value: any): any {
        // 需要隐藏用户名及密码
        return value;
      },
    },
  })
  url: string;

  @ValidateIf((data: ProjectRepositoryEntity, value: string|undefined) => !!data.password, {always: true})
  @IsString({always: true})
  @MaxLength(80, {always: true})
  @Column({
    length: 80,
    default: '',
    comment: 'git http or https user name',
  })
  'user_name'?: string;

  @ValidateIf((data: ProjectRepositoryEntity, value: string|undefined) => !!data.user_name, {always: true})
  @IsString({always: true})
  @MaxLength(80, {always: true})
  @Column({
    length: 80,
    default: '',
    comment: 'git http or https password',
  })
  'password'?: string;

  @IsOptional({always: true})
  @IsIn([ProjectRepositoryOnlineLogo.branch, ProjectRepositoryOnlineLogo.tag], {always: true})
  @Column({
    type: 'enum',
    enum: ProjectRepositoryOnlineLogo,
    comment: 'online mode',
  })
  'online_logo': ProjectRepositoryOnlineLogo;

  @IsOptional({always: true})
  @IsString({always: true})
  @IsNotEmpty({always: true})
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,30}$/, {
    always: true,
  })
  @Column({
    length: 30,
    name: 'default_branch',
    comment: 'default branch name',
    default: 'master',
  })
  'default_branch': string;

  @IsOptional({always: true})
  @IsString({always: true})
  @Column({
    length: 400,
    default: '',
    charset: 'utf8mb4',
  })
  destination: string;

  @OneToOne(type => ProjectsEntity, project => project.repository)
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: ProjectsEntity;

  @ManyToOne( type1 => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;
}

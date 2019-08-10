import {BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {createHmac} from 'crypto';
import {RolesEntity} from './roles.entity';
import {BaseEntity} from './base.entity';
import {Exclude} from 'class-transformer';
import {ProjectsEntity} from './projects.entity';
import {YesOrNo} from './options';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    length: 30,
    default: '',
    comment: '用户姓名',
    charset: 'utf8mb4',
  })
  name: string;

  @Column({length: 400, default: '', comment: '用户头像'})
  avatar: string;

  @Column({unique: true, nullable: true, length: 80, comment: '登录用户名，可以为null'})
  'user_name': string;

  @Column({unique: true, nullable: true, length: 191, comment: '用户邮箱，可以处理登录'})
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @Column({comment: '登录密码'})
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = createHmac('sha256', this.password.toString()).digest('hex');
  }

  @Column({
    type: 'enum',
    enum: [YesOrNo.yes, YesOrNo.no],
    comment: 'user is lock',
    default: YesOrNo.yes,
  })
  lock: YesOrNo;

  @ManyToMany(type => RolesEntity)
  @JoinTable({
    name: 'role_user',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RolesEntity[];

  projects: ProjectsEntity[];
}

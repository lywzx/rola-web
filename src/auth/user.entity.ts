import {BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import { createHmac } from 'crypto';
import {RolesEntity} from '../entity/roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({default: '', comment: '用户姓名'})
  name: string;

  @Column({default: '', comment: '用户头像'})
  avatar: string;

  @Column({unique: true, nullable: true, length: 191, comment: '登录用户名，可以为null'})
  'user_name': string;

  @Column({default: '', nullable: true, length: 191, comment: '用户邮箱，可以处理登录'})
  email: string;

  @Column({comment: '登录密码'})
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = createHmac('sha256', this.password).digest('hex');
  }

  @Column({type: 'timestamp'})
  'created_at': Date;

  @Column({type: 'timestamp', nullable: true})
  'updated_at': Date;

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updated_at = new Date();
  }

  @BeforeInsert()
  updateCreatedAt() {
    this.created_at = new Date();
  }

  @ManyToMany(type => RolesEntity)
  roles: RolesEntity[];
}

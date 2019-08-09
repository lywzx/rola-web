import {AfterLoad, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, ViewColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {UserEntity} from './user.entity';
import {url} from '../util/helper';
import {Exclude, Expose} from 'class-transformer';

@Entity('file')
export class FilesEntity extends BaseEntity {

  @Expose()
  get file_url(): string {
    return url(this.path || '');
  }

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Exclude()
  @Column({
    unsigned: true,
    nullable: true,
  })
  'user_id': number;

  @Column({
    length: 191,
    charset: 'utf8mb4',
    comment: 'file full name',
  })
  name: string;

  @Column({
    length: 15,
    comment: 'file extension',
  })
  ext: string;

  @Column({
    length: 40,
    comment: 'file mime type',
  })
  'mime_type': string;

  @Column({
    default: 0,
    comment: 'file size',
  })
  size: number;

  @Column({
    length: 2000,
    comment: 'file save full path',
  })
  path: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  'deleted_at': Date;

  @ManyToOne(type => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;
}

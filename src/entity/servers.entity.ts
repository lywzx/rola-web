import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {SpacesEntity} from './spaces.entity';
import {User} from '../auth/user.entity';
import {YesOrNo} from './options';

@Entity({
  name: 'server',
})
export class ServersEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    unsigned: true,
  })
  'user_id': number;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    type: 'int',
    unsigned: true,
  })
  'ip_address': number;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  'ssh_port': number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  'ssh_user': string;

  @Column({
    length: 62,
    nullable: true,
  })
  'password': string;

  @Column({
    length: 300,
    default: '',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: YesOrNo,
  })
  lock: YesOrNo;

  @ManyToMany( type => SpacesEntity)
  @JoinTable({
    name: 'space_server',
    joinColumn: {
      name: 'space_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'server_id',
      referencedColumnName: 'id',
    },
  })
  spaces: SpacesEntity[];

  @ManyToOne( type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  creator: User;
}

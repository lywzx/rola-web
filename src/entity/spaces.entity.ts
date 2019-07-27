import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../auth/user.entity';
import {BaseEntity} from './base.entity';
import {IsOptional} from 'class-validator';

@Entity({
  name: 'space',
})
export class SpacesEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'user_id',
    type: 'int',
    unsigned: true,
    comment: 'creator id',
  })
  'user_id': number;

  @IsOptional()
  @Column({
    name: 'owner_id',
    unsigned: true,
    nullable: true,
    comment: 'space owner',
  })
  'owner_id': number;

  @Column({
    length: 60,
    comment: 'space name',
    charset: 'utf8mb4',
  })
  name: string;

  @ManyToOne( type => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  creator: User;

  @ManyToOne( type => User, {
    nullable: true,
  })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner: number;
}

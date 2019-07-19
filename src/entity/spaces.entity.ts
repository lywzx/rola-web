import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../auth/user.entity';
import {BaseEntity} from './base.entity';

@Entity({
  name: 'space',
})
export class SpacesEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'int',
    comment: 'creator id',
  })
  @ManyToOne( type => User)
  creator: User;

  @Column({
    name: 'owner_id',
    type: 'int',
    comment: 'space owner',
    nullable: true,
  })
  @ManyToOne( type => User, {
    nullable: true,
  })
  owner: number;

  @Column({
    length: 60,
    comment: 'space name',
  })
  name: string;

}

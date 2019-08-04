import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';

@Entity('tag')
export class TagsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    unique: true,
    length: 60,
  })
  name: string;

  @Column({
    length: 200,
    charset: 'utf8mb4',
  })
  'display_name': string;
}

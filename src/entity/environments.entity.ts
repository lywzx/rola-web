import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {SpacesEntity} from './spaces.entity';
import {BaseEntity} from './base.entity';

@Entity({
  name: 'environment',
})
@Unique(['space_id', 'name'])
export class EnvironmentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    unsigned: true,
  })
  'space_id': number;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    length: 200,
    charset: 'utf8mb4',
    default: '',
  })
  'display_name': string;

  @ManyToOne(type => SpacesEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'space_id',
    referencedColumnName: 'id',
  })
  space: SpacesEntity;
}

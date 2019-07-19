import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SpacesEntity} from './spaces.entity';

@Entity({
  name: 'project',
})
export class ProjectsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  'space_id': number;

  @Column({
    type: 'varchar',
    length: 60,
  })
  name: string;

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

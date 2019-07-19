import {Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';

@Entity({
  name: 'serve',
})
export class ServersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

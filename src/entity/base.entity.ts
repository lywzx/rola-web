import {Column} from 'typeorm';

export class BaseEntity {
  @Column({
    type: 'timestamp',
  })
  'created_at': Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  'updated_at': Date;
}

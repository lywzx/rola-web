import {BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Timestamp, UpdateDateColumn} from 'typeorm';

export class BaseEntity {

  @CreateDateColumn({
    type: 'timestamp',
  })
  'created_at': Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  'updated_at': Date;
}

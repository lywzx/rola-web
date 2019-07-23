import {BeforeInsert, BeforeUpdate, Column} from 'typeorm';

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

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updated_at = new Date();
  }

  @BeforeInsert()
  updateCreatedAt() {
    this.created_at = new Date();
  }
}

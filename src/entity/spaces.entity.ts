import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './user.entity';
import {BaseEntity} from './base.entity';
import {IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, ValidationOptions} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const {CREATE, UPDATE} = CrudValidationGroups;
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
  @IsInt()
  @Min(1)
  @Column({
    name: 'owner_id',
    unsigned: true,
    nullable: true,
    comment: 'space owner',
  })
  'owner_id': number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @Column({
    length: 60,
    comment: 'space name',
    charset: 'utf8mb4',
  })
  name: string;

  @ManyToOne( type => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  creator: UserEntity;

  @ManyToOne( type => UserEntity, {
    nullable: true,
  })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner: UserEntity;
}

import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {IsNotEmpty, IsOptional, IsString, Matches, MaxLength} from 'class-validator';
import {CrudValidationGroups} from '@nestjsx/crud';
import {UniqueEntity} from '../validator/UniqueEntityConstraint';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('tag')
export class TagsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @IsOptional({groups: [UPDATE]})
  @IsString({always: true})
  @IsNotEmpty({always: true})
  @MaxLength(60, {always: true})
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,59}$/, {always: true})
  @UniqueEntity({
    table: 'tag',
  }, {
    always: true,
  })
  @Column({
    unique: true,
    length: 60,
  })
  name: string;

  @IsOptional({groups: [UPDATE]})
  @IsString({always: true})
  @IsNotEmpty({always: true})
  @MaxLength(200, {
    always: true,
  })
  @Column({
    length: 200,
    charset: 'utf8mb4',
  })
  'display_name': string;

  @Column({
    length: 400,
    charset: 'utf8mb4',
    default: '',
  })
  description: string;
}

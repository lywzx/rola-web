import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {SpacesEntity} from './spaces.entity';
import {BaseEntity} from './base.entity';
import {IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, Min} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const [ CREATE, UPDATE ] = CrudValidationGroups;

@Entity({
  name: 'environment',
})
@Unique(['space_id', 'name'])
export class EnvironmentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @IsOptional({ groups: [UPDATE] })
  @IsInt()
  @Min(0)
  @Column({
    unsigned: true,
  })
  'space_id': number;

  @IsOptional({ groups: [UPDATE]})
  @IsNotEmpty()
  @IsString({ always: true})
  @MaxLength(60)
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,59}$/)
  @Column({
    length: 60,
  })
  name: string;

  @IsOptional({ groups: [UPDATE]})
  @IsNotEmpty()
  @IsString({ always: true})
  @MaxLength(200)
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

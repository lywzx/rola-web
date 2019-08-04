import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {SpacesEntity} from './spaces.entity';
import {BaseEntity} from './base.entity';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import {Type} from 'class-transformer';
import {SpaceIdOnlyDto} from '../dto/space-id-only.dto';
import {ApiModelProperty} from '@nestjs/swagger';

const { CREATE, UPDATE } = CrudValidationGroups;

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

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty({always: true})
  @IsString({ always: true})
  @MaxLength(60, {always: true})
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,59}$/, {always: true})
  @ApiModelProperty()
  @Column({
    length: 60,
  })
  name: string;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty({always: true})
  @IsString({ always: true})
  @MaxLength(200, {always: true})
  @ApiModelProperty()
  @Column({
    length: 200,
    charset: 'utf8mb4',
    default: '',
  })
  'display_name': string;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @Type(type => SpaceIdOnlyDto)
  @ValidateNested({groups: [UPDATE]}  as ValidationOptions)
  @ApiModelProperty()
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

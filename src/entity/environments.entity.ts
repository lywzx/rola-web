import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {SpacesEntity} from './spaces.entity';
import {BaseEntity} from './base.entity';
import {
  IsDefined, IsInstance,
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
import {UniqueEntity} from '../validator/UniqueEntityConstraint';

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
  // TODO 验证需要判断空间ID
  @UniqueEntity({
    table: 'environment',
  }, {
    always: true,
  })
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

  @IsDefined({groups: [CREATE]} as ValidationOptions)
  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsInstance(Object, {
    always: true,
  })
  @ValidateNested({always: true})
  @Type(type => SpaceIdOnlyDto)
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

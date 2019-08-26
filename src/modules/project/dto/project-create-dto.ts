import {IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, ValidationOptions} from 'class-validator';
import {ExistsEntity} from '../../../validator/ExistsEntityConstraint';
import {ApiModelProperty} from '@nestjs/swagger';
import {CrudValidationGroups} from '@nestjsx/crud';
import {ProjectStatusOptions, YesOrNo} from '../../../entity/options';
import {Column} from 'typeorm';

const { CREATE, UPDATE } = CrudValidationGroups;

export class ProjectCreateDto {

  'user_id'?: number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty({always: true})
  @IsString({ always: true})
  @MaxLength(191, {
    always: true,
  })
  @ApiModelProperty()
  'name': string;

  @IsOptional({always: true})
  @IsString({ always: true})
  @MaxLength(300, {
    always: true,
  })
  @ApiModelProperty()
  'description': string;

  @IsOptional({
    always: true,
  })
  @IsIn([ProjectStatusOptions.lock, ProjectStatusOptions.ok], {
    always: true,
  })
  @ApiModelProperty()
  status: ProjectStatusOptions;

  @IsOptional({always: true})
  @IsIn([YesOrNo.yes, YesOrNo.no], {always: true})
  'require_review': YesOrNo;

  @IsOptional({
    always: true,
  })
  @ApiModelProperty()
  'environment_ids': number[];
}

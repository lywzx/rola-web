import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {CrudValidationGroups} from '@nestjsx/crud';
import {UserEntity} from '../../entity/user.entity';
import {Type} from 'class-transformer';
import {UserIdOnlyDto} from '../../dto/user-id-only.dto';

const {CREATE, UPDATE} = CrudValidationGroups;

export class SpaceDto {

  'user_id'?: number;

  @Type(() => UserIdOnlyDto)
  @ValidateNested({always: true})
  @ApiModelPropertyOptional({ type: UserIdOnlyDto, isArray: false})
  owner: UserIdOnlyDto;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsString({always: true})
  @IsNotEmpty({always: true})
  @MaxLength(60, {always: true})
  @ApiModelProperty()
  name: string;
}

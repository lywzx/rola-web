import {
  IsArray,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {UniqueEntity} from '../../../validator/UniqueEntityConstraint';
import {CrudValidationGroups} from '@nestjsx/crud';
import {Type} from 'class-transformer';
import {RoleIdOnlyDto} from '../../../dto/role-id-only.dto';
import {YesOrNo} from '../../../entity/options';

const {CREATE, UPDATE} = CrudValidationGroups;
const groupsCreateAndUpdate = {
  groups: [CREATE, UPDATE],
} as ValidationOptions;

export class UserDto {
  id?: number;

  @IsOptional({always: true})
  @IsString({always: true})
  @MaxLength(30, {always: true})
  @ApiModelProperty()
  name: string;

  @IsOptional({always: true})
  @IsNotEmpty({always: true})
  @IsUrl({protocols: ['http', 'https']}, {always: true})
  @MaxLength(400, {always: true})
  @ApiModelProperty()
  avatar: string;

  @IsOptional({groups: [UPDATE]})
  @IsNotEmpty({always: true})
  @IsString({always: true})
  @MaxLength(80, {always: true})
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,79}$/, {always: true})
  @UniqueEntity({
    table: 'user',
  }, {
    groups: [CREATE],
  })
  @UniqueEntity({
    table: 'user',
    ignoreDepColumn: {id: 'id'},
  }, {
    groups: [UPDATE],
  })
  @ApiModelProperty()
  'user_name': string;

  @IsOptional({always: true})
  @IsNotEmpty({always: true})
  @IsEmail({}, {always: true})
  @MaxLength(191, {always: true})
  @UniqueEntity({
    table: 'user',
  }, {
    groups: [CREATE],
  })
  @UniqueEntity({
    table: 'user',
    ignoreDepColumn: {
      id: 'id',
    },
  }, {
    groups: [UPDATE],
  })
  @ApiModelProperty()
  email?: string;

  @IsOptional({groups: [UPDATE]})
  @IsNotEmpty({always: true})
  @IsString({always: true})
  @MinLength(6, {always: true})
  @ApiModelProperty()
  password?: string;

  @IsOptional({groups: [UPDATE]})
  @IsIn([YesOrNo.yes, YesOrNo.no], {always: true})
  @ApiModelProperty()
  lock?: YesOrNo;

  @IsOptional({always: true})
  @IsArray({always: true})
  @ValidateNested({always: true})
  @Type(type => RoleIdOnlyDto)
  roles?: Array<{id: number}>;
}

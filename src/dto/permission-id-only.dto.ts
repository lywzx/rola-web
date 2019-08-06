import {IsNumber, IsPositive} from 'class-validator';
import {ExistsEntity} from '../validator/ExistsEntityConstraint';
import {ApiModelProperty} from '@nestjs/swagger';

export class PermissionIdOnlyDto {
  @IsNumber({allowNaN: false, allowInfinity: false})
  @IsPositive({always: true})
  @ExistsEntity({
    table: 'permission',
  }, {always: true})
  @ApiModelProperty()
  id: number;
}

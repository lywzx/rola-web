import {IsNumber, IsPositive} from 'class-validator';
import {ExistsEntity} from '../validator/ExistsEntityConstraint';
import {ApiModelProperty} from '@nestjs/swagger';

export class RoleIdOnlyDto {
  @IsNumber({allowNaN: false, allowInfinity: false})
  @IsPositive({always: true})
  @ExistsEntity({
    table: 'role',
  }, {always: true})
  @ApiModelProperty()
  id: number;
}

import {IsNumber, IsPositive} from 'class-validator';
import {ExistsEntity} from '../validator/ExistsEntityConstraint';
import {ApiModelProperty} from '@nestjs/swagger';

export class UserIdOnlyDto {
  @IsNumber({allowNaN: false, allowInfinity: false})
  @IsPositive({always: true})
  @ExistsEntity({
    table: 'user',
  }, {always: true})
  @ApiModelProperty()
  id: number;
}

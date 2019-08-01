import { Controller } from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {EnvironmentsEntity} from '../../entity/environments.entity';
import {EnvironmentService} from './environment.service';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('environment')
@Crud({
  model: {
    type: EnvironmentsEntity,
  },
})
@Controller('api/environment')
export class EnvironmentController implements CrudController<EnvironmentsEntity> {
  public constructor(public service: EnvironmentService) {}
}

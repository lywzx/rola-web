import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {EnvironmentsEntity} from '../../entity/environments.entity';
import {EnvironmentService} from './environment.service';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@ApiUseTags('environment')
@UseGuards(AuthGuard())
@Crud({
  model: {
    type: EnvironmentsEntity,
  },
  query: {
    join: {
      space: {
        eager: false,
      },
    },
    exclude: ['space_id'],
  },
})
@Controller('api/environment')
export class EnvironmentController implements CrudController<EnvironmentsEntity> {
  public constructor(public service: EnvironmentService) {}
}

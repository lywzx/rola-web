import { Controller } from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {SpacesEntity} from '../../entity/spaces.entity';
import {SpaceService} from './space.service';

@Crud({
  model: {
    type: SpacesEntity,
  },
})
@Controller('space')
export class SpaceController implements CrudController<SpacesEntity> {
  constructor(public service: SpaceService) { }
}

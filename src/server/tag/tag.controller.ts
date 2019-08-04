import { Controller } from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {TagsEntity} from '../../entity/tags.entity';
import {TagService} from './tag.service';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('tags')
@Crud({
  model: {
    type: TagsEntity,
  },
  routes: {
    only: ['getManyBase'],
  },
})
@Controller('api/tag')
export class TagController implements CrudController<TagsEntity> {
  public constructor(public service: TagService) {}
}

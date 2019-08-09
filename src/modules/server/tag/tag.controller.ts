import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {TagsEntity} from '../../../entity/tags.entity';
import {TagService} from './tag.service';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@ApiUseTags('tags')
@UseGuards(AuthGuard())
@Crud({
  model: {
    type: TagsEntity,
  },
  routes: {
    only: ['getManyBase'],
  },
  query: {
    join: {

    },
  },
})
@Controller('api/tag')
export class TagController implements CrudController<TagsEntity> {
  public constructor(public service: TagService) {}
}

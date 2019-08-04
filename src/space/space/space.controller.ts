import {Controller, Req, SetMetadata, UseGuards} from '@nestjs/common';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest, JoinOption} from '@nestjsx/crud';
import {SpacesEntity} from '../../entity/spaces.entity';
import {SpaceService} from './space.service';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import {SpaceDto} from '../dto/space.dto';

@ApiUseTags('space')
@ApiBearerAuth()
@Crud({
  model: {
    type: SpacesEntity,
  },
  query: {
    exclude: ['owner_id', 'user_id'],
    limit: 20,
    sort: [
      {
        field: 'updated_at',
        order: 'DESC',
      },
    ],
    join: {
      owner: {
        exclude: ['password'],
        eager: false,
      },
    },
  },
})
@Controller('api/space')
@UseGuards(AuthGuard())
export class SpaceController implements CrudController<SpaceDto> {
  constructor(public service: SpaceService) { }

  get base(): CrudController<SpaceDto> {
    return this;
  }

  @Override()
  public createOne(@Req() request: Request, @ParsedRequest() req: CrudRequest,
                   @ParsedBody() dto: SpaceDto) {
    const user = request.user;
    dto.user_id = user.id;
    return this.base.createOneBase(req, dto);
  }
}

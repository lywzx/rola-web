import {Controller, Req, SetMetadata, UseGuards} from '@nestjs/common';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest, JoinOption} from '@nestjsx/crud';
import {SpacesEntity} from '../../../entity/spaces.entity';
import {SpaceService} from './space.service';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import {UserEntity} from '../../../entity/user.entity';

@ApiUseTags('space')
@ApiBearerAuth()
@Crud({
  model: {
    type: SpacesEntity,
  },
  routes: {
    exclude: ['createManyBase'],
  },
  query: {
    exclude: ['owner_id', 'user_id'],
    limit: 20,
    /*sort: [
      {
        field: 'updated_at',
        order: 'DESC',
      },
    ],*/
    join: {
      owner: {
        exclude: ['password'],
        eager: false,
      },
      environments: {
        eager: false,
      },
    },
  },
})
@Controller('api/space')
@UseGuards(AuthGuard())
export class SpaceController implements CrudController<SpacesEntity> {
  constructor(public service: SpaceService) { }

  get base(): CrudController<SpacesEntity> {
    return this;
  }

  @Override()
  public createOne(@Req() request: Request, @ParsedRequest() req: CrudRequest,
                   @ParsedBody() dto: SpacesEntity) {
    const user = request.user as UserEntity;
    dto.user_id = user.id;
    return this.base.createOneBase(req, dto);
  }
}

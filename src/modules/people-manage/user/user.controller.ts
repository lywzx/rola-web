import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from '@nestjsx/crud';
import {UserService} from './user.service';
import {UserEntity} from '../../../entity/user.entity';
import {ApiUseTags} from '@nestjs/swagger';
import {UserDto} from '../dto/user.dto';
import {AuthGuard} from '@nestjs/passport';

@ApiUseTags('people-manage/user')
@Crud({
  model: {
    type: UserEntity,
  },
  query: {
    exclude: ['password'],
    join: {
      roles: {
        eager: false,
      },
      permissions: {
        eager: false,
      },
    },
  },
})
@UseGuards(AuthGuard())
@Controller('api/user')
export class UserController implements CrudController<UserDto> {
  public constructor(public service: UserService) {}

  get base(): CrudController<UserDto> {
    return this;
  }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserDto,
  ) {
    return this.base.createOneBase(req, dto);
  }

  @Override()
  replaceOnBase(@ParsedRequest() req: CrudRequest,
                @ParsedBody() dto: UserDto) {
    return this.base.replaceOneBase(req, dto);
  }
}

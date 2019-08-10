import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {UserService} from './user.service';
import {UserEntity} from '../../../entity/user.entity';
import {ApiUseTags} from '@nestjs/swagger';
import {UserDto} from '../dto/user.dto';
import {AuthGuard} from '@nestjs/passport';

@ApiUseTags('people-manage/user')
@Crud({
  model: {
    type: UserDto,
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
export class UserController implements CrudController<UserEntity> {
  public constructor(public service: UserService) {}
}

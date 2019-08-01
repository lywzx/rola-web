import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {UserService} from './user.service';
import {UserEntity} from '../../entity/user.entity';
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
  },
})
@UseGuards(AuthGuard())
@Controller('api/user')
export class UserController implements CrudController<UserDto> {
  public constructor(public service: UserService) {}
}

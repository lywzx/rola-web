import { Controller } from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {UserService} from './user.service';
import {UserEntity} from '../../entity/user.entity';

@Crud({
  model: {
    type: UserEntity,
  },
})
@Controller('user')
export class UserController implements CrudController<UserEntity> {
  public constructor(public service: UserService) {}
}

import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {RolesEntity} from '../../../entity/roles.entity';
import {RoleService} from './role.service';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@ApiUseTags('people-manage/role')
@UseGuards(AuthGuard())
@Crud({
  model: {
    type: RolesEntity,
  },
  validation: {
    transform: true,
  },
  query: {
    join: {
      permissions: {
        persist: ['id'],
        exclude: ['created_at', 'updated_at'],
        eager: false,
      },
      users: {
        persist: ['id'],
        exclude: ['created_at', 'updated_at', 'password'],
        eager: false,
      },
    },
  },
})
@Controller('api/role')
export class RoleController implements CrudController<RolesEntity> {

  constructor(public service: RoleService) {}

}

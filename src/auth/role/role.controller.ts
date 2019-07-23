import {Controller, Get, Post, Req} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {RolesEntity} from '../../entity/roles.entity';
import {RoleService} from './role.service';

@Crud({
  model: {
    type: RolesEntity,
  },
})
@Controller('role')
export class RoleController implements CrudController<RolesEntity> {

  constructor(public service: RoleService) {}

}

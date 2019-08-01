import {ArgumentMetadata, Controller, Get, Post, Req} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {RolesEntity} from '../../entity/roles.entity';
import {RoleService} from './role.service';
import { CrudValidationGroups } from '@nestjsx/crud';
import {ApiUseTags} from '@nestjs/swagger';

const {CREATE, UPDATE} = CrudValidationGroups;

@ApiUseTags('people-manage/role')
@Crud({
  model: {
    type: RolesEntity,
  },
  validation: {
    transform: true,
  },
})
@Controller('api/role')
export class RoleController implements CrudController<RolesEntity> {

  constructor(public service: RoleService) {}

}

import { Controller } from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {PermissionsEntity} from '../../entity/permissions.entity';
import {PermissionService} from './permission.service';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('people-manage/permission')
@Crud({
  model: {
    type: PermissionsEntity,
  },
})
@Controller('api/permission')
export class PermissionController implements CrudController<PermissionsEntity> {
  constructor(public service: PermissionService) {}
}

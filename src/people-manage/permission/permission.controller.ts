import { Controller } from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {PermissionsEntity} from '../../entity/permissions.entity';
import {PermissionService} from './permission.service';

@Crud({
  model: {
    type: PermissionsEntity,
  },
})
@Controller('permission')
export class PermissionController implements CrudController<PermissionsEntity> {
  constructor(public service: PermissionService) {}
}

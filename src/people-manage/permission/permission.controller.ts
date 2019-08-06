import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {PermissionsEntity} from '../../entity/permissions.entity';
import {PermissionService} from './permission.service';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@ApiUseTags('people-manage/permission')
@UseGuards(AuthGuard())
@Crud({
  model: {
    type: PermissionsEntity,
  },
  query: {
    join: {
      roles: {
        eager: false,
      },
      users: {
        exclude: ['password', 'created_at', 'updated_at'],
        eager: false,
      },
    },
  },
})
@Controller('api/permission')
export class PermissionController implements CrudController<PermissionsEntity> {
  constructor(public service: PermissionService) {}
}

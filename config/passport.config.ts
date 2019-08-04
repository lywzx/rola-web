import {IAuthModuleOptions} from '@nestjs/passport';

export default {
  defaultStrategy: 'jwt',
  session: false,
} as IAuthModuleOptions;

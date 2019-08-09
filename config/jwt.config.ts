import { env } from '../src/util/helper';
import {JwtModuleOptions} from '@nestjs/jwt';

export default {
  secret: env('JWT_SECRET_KEY', ''),
  signOptions: {
    expiresIn: env('JWT_EXPIRATION_DELTA', '7 days'),
  },
} as JwtModuleOptions;

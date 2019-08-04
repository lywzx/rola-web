import { IJwtConfig } from '../src/interfaces/jwt-config.interface';
import { env } from '../src/util/config';
import {JwtModuleOptions} from '@nestjs/jwt';

export default {
  secret: env('JWT_SECRET_KEY', ''),
  signOptions: {
    expiresIn: env('JWT_EXPIRATION_DELTA', '7 days'),
  },
} as JwtModuleOptions;

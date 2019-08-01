import {
  PassportModule as PM,
} from '@nestjs/passport';

export const PassportModule = PM.register({ defaultStrategy: 'jwt', session: false});

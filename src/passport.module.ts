import {PassportModule as PM} from '@nestjs/passport';
import {config} from './util/config';

export const PassportModule = PM.register(config('passport'));

import {PassportModule as PM} from '@nestjs/passport';
import {config} from './util/helper';

export const PassportModule = PM.register(config('passport'));

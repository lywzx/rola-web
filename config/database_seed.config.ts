import {config} from '../src/util/config';
import {ConnectionOptions} from 'typeorm';

export = config(`database.connections.${config('database.default')}`) as ConnectionOptions;

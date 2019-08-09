import {config} from './src/util/helper';
import {ConnectionOptions} from 'typeorm';

export = config(`database.connections.${config('database.default')}`) as ConnectionOptions;

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { get } from 'lodash';

let configCache = null;
export function env(key: string, df?: any) {
  if (configCache === null) {
    configCache = dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV || 'development'}.env`));
  }
  let ret = get(configCache, key, df);

  if (ret !== df) {
    if (['True', 'False', 'true', 'false'].indexOf(ret) !== -1) {
      ret = ret === 'True' || ret === 'true';
    }
  }

  return ret;
}

const configMap = {};
export function config<T>(key: string): T {
  const [file] = key.split('.');

  if (!configMap[file]) {
    configMap[file] = require('../../config/' + file + '.config.ts').default;
  }

  return get(configMap, key) as T;
}

/**
 * get table full name
 * @param tableName
 */
export function getTableNameWithPrefix(tableName: string): string {
  return config(`database.connections.${config('database.default')}.entityPrefix`) + tableName;
}

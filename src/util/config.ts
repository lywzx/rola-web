import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { get } from 'lodash';

let configCache = null;
export function env(key: string, df?: any) {
  if (config === null) {
    configCache = dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV}.env`));
  }
  return get(config, key, df);
}

export function config(key: string): any {
  return '';
}

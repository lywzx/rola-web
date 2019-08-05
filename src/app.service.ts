import { Injectable } from '@nestjs/common';
import {CrudConfigService, CrudGlobalConfig} from '@nestjsx/crud';
import {config} from './util/config';

@Injectable()
export class AppService {
  public constructor() {
    AppService.initConfig();
  }

  protected static initConfig() {
    // init curd service
    CrudConfigService.load(config<CrudGlobalConfig>('crud'));

  }

}

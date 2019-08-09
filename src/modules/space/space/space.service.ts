import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {SpacesEntity} from '../../../entity/spaces.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class SpaceService extends TypeOrmCrudService<SpacesEntity> {
  public constructor(@InjectRepository(SpacesEntity) repo) {
    super(repo);
  }
}

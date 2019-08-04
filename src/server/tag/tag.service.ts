import { Injectable } from '@nestjs/common';
import {TagsEntity} from '../../entity/tags.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class TagService extends TypeOrmCrudService<TagsEntity> {
  public constructor(@InjectRepository(TagsEntity) repo) {
    super(repo);
  }
}

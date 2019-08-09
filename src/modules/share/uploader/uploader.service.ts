import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {FilesEntity} from '../../../entity/files.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UploaderService {
  public constructor(@InjectRepository(FilesEntity) private readonly fileRepository: Repository<FilesEntity>) {
  }

  async createMany(files: FilesEntity[]): Promise<FilesEntity[]> {
    return this.fileRepository.save(files);
  }
}

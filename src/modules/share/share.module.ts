import { Module } from '@nestjs/common';
import { UploaderController } from './uploader/uploader.controller';
import { AccountController } from './account/account.controller';
import {MulterModule} from '@nestjs/platform-express';
import {config} from '../../util/helper';
import {PassportModule} from '../../passport.module';
import { UploaderService } from './uploader/uploader.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FilesEntity} from '../../entity/files.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilesEntity]),
    PassportModule,
    MulterModule.register(config('multer')),
  ],
  controllers: [UploaderController, AccountController],
  providers: [UploaderService],
})
export class ShareModule {}

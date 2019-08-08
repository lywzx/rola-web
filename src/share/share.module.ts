import { Module } from '@nestjs/common';
import { UploaderController } from './uploader/uploader.controller';
import { AccountController } from './account/account.controller';
import {MulterModule} from '@nestjs/platform-express';
import {config} from '../util/config';
import {PassportModule} from '../passport.module';

@Module({
  imports: [
    PassportModule,
    MulterModule.register(config('multer')),
  ],
  controllers: [UploaderController, AccountController],
})
export class ShareModule {}

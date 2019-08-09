import {Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {FilesInterceptor} from '@nestjs/platform-express';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';

@UseGuards(AuthGuard())
@Controller('api/upload')
export class UploaderController {

  @Post('common')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadFile(@UploadedFiles() files, @Req() request: Request) {

    return files;
  }

}

import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('api/upload')
export class UploaderController {

  @Post('common')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file, @Body() body: any) {
    return file;
  }

}

import {Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {FilesInterceptor} from '@nestjs/platform-express';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {UploaderService} from './uploader.service';
import {FilesEntity} from '../../../entity/files.entity';
import {UserEntity} from '../../../entity/user.entity';
import {extname} from 'path';
import {ApiBearerAuth, ApiConsumes, ApiImplicitFile, ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('share/uploader')
@UseGuards(AuthGuard())
@Controller('api/upload')
export class UploaderController {

  public constructor(private readonly uploaderService: UploaderService) {
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'files', required: true, description: 'List of cats' })
  @Post('common')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadFile(@UploadedFiles() files, @Req() request: Request) {
    const user = request.user as UserEntity;
    return await this.uploaderService.createMany(files.map(it => {
      const entity = new FilesEntity();
      entity.user_id = user.id;
      entity.name = it.filename;
      entity.ext = extname(it.filename).replace(/^\./, '');
      entity.mime_type = it.mimetype;
      entity.size = it.size;
      entity.path = it.path.replace(/\\/g, '/').replace(/^\/?(?:public\/)?/, '');
      return entity;
    }));
  }

}

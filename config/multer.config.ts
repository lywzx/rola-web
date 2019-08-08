import {MulterModuleOptions} from '@nestjs/platform-express';
import {diskStorage, DiskStorageOptions} from 'multer';
import {extname} from 'path';
import * as mkdirp from 'mkdirp';

export default {
  dest: './public',
  storage: diskStorage({
    destination(req, file, cb) {
      const now = new Date();
      const dir = `./public/upload/${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}`
        + `/${now.getDate().toString().padStart(2, '0')}`;

      mkdirp(dir, (err) => {
        cb(err, dir);
      });
    },
    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  } as DiskStorageOptions),
  limits: {
  },
} as MulterModuleOptions;

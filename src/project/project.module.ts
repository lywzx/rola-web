import { Module } from '@nestjs/common';
import { ProjectController } from './project/project.controller';
import { ServerController } from './server/server.controller';
import { ServerService } from './server/server.service';
import {PassportModule} from '../passport/passport.module';

@Module({
  imports: [PassportModule],
  controllers: [ProjectController, ServerController],
  providers: [ServerService],
})
export class ProjectModule {}

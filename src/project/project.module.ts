import { Module } from '@nestjs/common';
import { ProjectController } from './project/project.controller';

@Module({
  controllers: [ProjectController]
})
export class ProjectModule {}

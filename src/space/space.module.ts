import { Module } from '@nestjs/common';
import { SpaceController } from './space/space.controller';
import { SpaceService } from './space/space.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SpacesEntity} from '../entity/spaces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpacesEntity])],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}

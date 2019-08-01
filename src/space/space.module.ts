import { Module } from '@nestjs/common';
import { SpaceController } from './space/space.controller';
import { SpaceService } from './space/space.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SpacesEntity} from '../entity/spaces.entity';
import {PassportModule} from '../passport/passport.module';

@Module({
  imports: [TypeOrmModule.forFeature([SpacesEntity]), PassportModule],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}

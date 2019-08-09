import { Module } from '@nestjs/common';
import { SpaceController } from './space/space.controller';
import { SpaceService } from './space/space.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SpacesEntity} from '../../entity/spaces.entity';
import {PassportModule} from '../../passport.module';
import {EnvironmentsEntity} from '../../entity/environments.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([SpacesEntity, EnvironmentsEntity]),
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}

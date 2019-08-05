import { Module } from '@nestjs/common';
import { EnvironmentController } from './environment/environment.controller';
import { EnvironmentService } from './environment/environment.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EnvironmentsEntity} from '../entity/environments.entity';
import {PassportModule} from '../passport.module';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([EnvironmentsEntity]),
  ],
  controllers: [EnvironmentController],
  providers: [EnvironmentService],
})
export class EnvironmentModule {}

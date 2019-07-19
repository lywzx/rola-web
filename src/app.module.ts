import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { SpaceModule } from './space/space.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(), SpaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

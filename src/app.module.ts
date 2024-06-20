import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscoveryModule } from '@nestjs/core';
import { IntervalScheduler } from './interval-sheduler';

@Module({
  imports: [DiscoveryModule],
  controllers: [AppController],
  providers: [AppService, IntervalScheduler],
})
export class AppModule {}

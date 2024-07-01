import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscoveryModule } from '@nestjs/core';
import { IntervalScheduler } from './interval-sheduler';
import { FibonnaciModule } from './fibonnaci/fibonnaci.module';
import { HttpClientModule } from './http-client/http-client.module';

@Module({
  imports: [
    DiscoveryModule,
    FibonnaciModule,

    HttpClientModule.register({
      baseUrl: 'ASDASDA',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, IntervalScheduler],
})
export class AppModule {}

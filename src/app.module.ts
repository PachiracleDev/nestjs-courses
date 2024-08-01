import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { FibonnaciModule } from './fibonnaci/fibonnaci.module';
import { HttpClientModule } from './http-client/http-client.module';
import { IntervalScheduler } from './interval-sheduler';

@Module({
  imports: [
    DiscoveryModule,
    FibonnaciModule,
    HttpClientModule.register({
      baseUrl: 'ASDASDA',
    }),
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, IntervalScheduler],
})
export class AppModule {}

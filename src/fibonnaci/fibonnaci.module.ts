import { Module } from '@nestjs/common';
import { FibonnaciService } from './fibonnaci.service';
import { FibonnaciController } from './fibonnaci.controller';
import { FibonacciWorkerHost } from './fibonnaci-worker.host';

@Module({
  providers: [FibonnaciService, FibonacciWorkerHost],
  controllers: [FibonnaciController],
})
export class FibonnaciModule {}

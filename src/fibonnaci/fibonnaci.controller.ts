import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { FibonnaciService } from './fibonnaci.service';
import { FibonacciWorkerHost } from './fibonnaci-worker.host';
import Piscina from 'piscina';
import { resolve } from 'path';

@Controller('fibonnaci')
export class FibonnaciController {
  constructor(
    private readonly fibonnaciService: FibonnaciService,
    private readonly fibonacciWorkerHost: FibonacciWorkerHost,
  ) {}

  fibonnaciWorker = new Piscina({
    filename: resolve(__dirname, 'fibonacci.worker.piscina.js'),
  });

  @Get('/')
  getFibonnaci(@Query('num', ParseIntPipe) num: number = 10) {
    return this.fibonacciWorkerHost.run(num);
  }

  @Get('/piscina')
  async getPiscinaFibonnaci(@Query('num', ParseIntPipe) num: number = 10) {
    return this.fibonnaciWorker.run(num);
  }
}

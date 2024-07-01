import {
  Controller,
  Get,
  RequestTimeoutException,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CircuitBreakerInterceptor } from './common/interceptors/circuit-breaker/circuit-breaker.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(CircuitBreakerInterceptor)
  @Get('/health')
  getHealth(): string {
    throw new RequestTimeoutException('💥 Error!'); // 👈
  }
}

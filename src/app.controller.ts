import {
  Controller,
  Get,
  Param,
  Patch,
  RequestTimeoutException,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CircuitBreakerInterceptor } from './common/interceptors/circuit-breaker/circuit-breaker.interceptor';
import { EntityExistsPipe } from './common/mixins/pipes/entity-exist.pipe';
import { CoffeEntity } from './common/mixins/with-uuid.mixin/with-uuid.mixin';

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

  @Patch(':id')
  async update(@Param('id', EntityExistsPipe(CoffeEntity)) id: number) {
    return id;
  }
}

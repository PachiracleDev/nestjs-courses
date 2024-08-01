import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/shared/infrastructure/infra.module';

@Module({
  imports: [InfrastructureModule],
  exports: [InfrastructureModule],
})
export class CoreModule {}

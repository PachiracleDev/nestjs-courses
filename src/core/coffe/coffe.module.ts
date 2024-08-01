import { Module } from '@nestjs/common';
import { CreateCoffeCommandHandler } from './app/commands/create-coffe.command-handler';

@Module({
  controllers: [],
  providers: [CreateCoffeCommandHandler],
})
export class CoffeModule {}

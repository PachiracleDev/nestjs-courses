import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCoffeCommand } from '../../app/commands/create-coffe.command';
import { CreateCoffeDto } from '../dtos/create-coffe.dto';

@Controller('coffe')
export class CoffeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/create')
  createCoffe(@Body() body: CreateCoffeDto) {
    return this.commandBus.execute(
      new CreateCoffeCommand(body.name, body.type, body.price),
    );
  }

  @Get('/list')
  listCoffe() {}
}

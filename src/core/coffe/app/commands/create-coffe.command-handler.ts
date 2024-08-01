import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CoffeFactory } from '../../domain/factories/coffe.factory';
import { CreateCoffeCommand } from './create-coffe.command';

@CommandHandler(CreateCoffeCommand)
export class CreateCoffeCommandHandler
  implements ICommandHandler<CreateCoffeCommand>
{
  private readonly logger = new Logger(CreateCoffeCommandHandler.name);

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly coffeFactory: CoffeFactory,
  ) {}

  async execute(command: CreateCoffeCommand) {
    this.logger.debug(
      `Processing "CreateCoffeCommandHandler": ${JSON.stringify(command)}`,
    );
    const coffe = this.coffeFactory.create(
      command.name,
      command.type,
      command.price,
    );

    this.eventPublisher.mergeObjectContext(coffe);
    coffe.commit();
    return coffe;
  }
}

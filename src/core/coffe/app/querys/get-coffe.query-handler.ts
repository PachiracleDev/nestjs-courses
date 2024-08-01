import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCoffesQuery } from './get-coffes.query';

@QueryHandler(GetCoffesQuery)
export class GetCoffesQueryHandler implements IQueryHandler<GetCoffesQuery> {
  constructor() {}

  async execute() {
    return 'GetCoffesQueryHandler';
  }
}
